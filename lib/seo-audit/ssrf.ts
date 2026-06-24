// SSRF guard for the audit crawler. The tool fetches arbitrary user-supplied
// URLs server-side and follows redirects, so without this an attacker could
// make the server hit localhost / private / cloud-metadata addresses, probe the
// internal network, or use our egress IP as an anonymising proxy against third
// parties. We resolve the host and reject anything that is not a public
// (globally-routable unicast) address. Applied inside fetchRaw so every request
// — including each redirect hop and sub-resource — is re-checked, plus an
// explicit pre-check on the submitted domain.
//
// Residual risk: DNS rebinding (a host that resolves public here but private at
// connection time) is not fully closed — that needs connection-time IP pinning
// (a custom undici dispatcher). Set ALLOW_PRIVATE_AUDIT_TARGETS=1 to disable the
// guard for local development against private hosts.

import { promises as dns } from 'node:dns';
import ipaddr from 'ipaddr.js';

const ALLOW_PRIVATE = process.env.ALLOW_PRIVATE_AUDIT_TARGETS === '1';

// Negative cache only (blocked hosts). Public hosts are intentionally NOT cached
// so a rebinding host is re-resolved on each call rather than trusted forever.
const blockedHosts = new Map<string, true>();
const MAX_CACHE = 5000;

interface IPv6Like {
  isIPv4MappedAddress(): boolean;
  toIPv4Address(): { toString(): string };
}

function isPublicIp(ip: string): boolean {
  let addr: ReturnType<typeof ipaddr.parse>;
  try {
    addr = ipaddr.parse(ip);
  } catch {
    return false;
  }
  // Unwrap IPv4-mapped IPv6 (e.g. ::ffff:127.0.0.1) so it can't smuggle a
  // private IPv4 past the range check.
  if (addr.kind() === 'ipv6') {
    const v6 = addr as unknown as IPv6Like;
    if (v6.isIPv4MappedAddress()) return isPublicIp(v6.toIPv4Address().toString());
  }
  // Only globally-routable unicast is allowed; loopback, private, linkLocal,
  // uniqueLocal, reserved, broadcast, carrierGradeNat → blocked.
  return addr.range() === 'unicast';
}

function remember(host: string): void {
  if (blockedHosts.size >= MAX_CACHE) blockedHosts.clear();
  blockedHosts.set(host, true);
}

export class BlockedTargetError extends Error {
  constructor(reason: string) {
    super(`blocked: ${reason}`);
    this.name = 'BlockedTargetError';
  }
}

export async function assertPublicHost(rawUrl: string): Promise<void> {
  if (ALLOW_PRIVATE) return;

  let host: string;
  let protocol: string;
  try {
    const u = new URL(rawUrl);
    host = u.hostname.replace(/^\[|\]$/g, '').toLowerCase(); // strip IPv6 [...] brackets
    protocol = u.protocol;
  } catch {
    throw new BlockedTargetError('invalid url');
  }

  if (protocol !== 'http:' && protocol !== 'https:') throw new BlockedTargetError('scheme');
  if (
    host === '' ||
    host === 'localhost' ||
    host.endsWith('.localhost') ||
    host.endsWith('.local') ||
    host.endsWith('.internal') ||
    host === 'metadata.google.internal'
  ) {
    throw new BlockedTargetError('internal host');
  }

  if (blockedHosts.has(host)) throw new BlockedTargetError('private address');

  // IP literal — classify directly.
  if (ipaddr.isValid(host)) {
    if (!isPublicIp(host)) {
      remember(host);
      throw new BlockedTargetError('private address');
    }
    return;
  }

  // Hostname — resolve every A/AAAA record; require ALL to be public so a
  // split-horizon / partially-private resolution can't slip through.
  let addresses: { address: string }[];
  try {
    addresses = await dns.lookup(host, { all: true });
  } catch {
    // Unresolvable host: let the fetch fail naturally — not an SSRF concern.
    return;
  }
  if (addresses.length === 0 || !addresses.every((a) => isPublicIp(a.address))) {
    remember(host);
    throw new BlockedTargetError('private address');
  }
}
