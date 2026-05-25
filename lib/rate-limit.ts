interface RateLimitOptions {
  windowMs: number;
  max: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
}

const hits = new Map<string, number[]>();
const MAX_KEYS = 10_000;

function prune(now: number, windowMs: number): void {
  if (hits.size <= MAX_KEYS) return;
  for (const [key, timestamps] of hits) {
    const fresh = timestamps.filter((t) => now - t < windowMs);
    if (fresh.length === 0) {
      hits.delete(key);
    } else {
      hits.set(key, fresh);
    }
  }
}

export function rateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const { windowMs, max } = options;

  const existing = hits.get(key) ?? [];
  const recent = existing.filter((t) => now - t < windowMs);

  if (recent.length >= max) {
    const oldest = recent[0];
    const resetAt = oldest + windowMs;
    return {
      allowed: false,
      remaining: 0,
      resetAt,
      retryAfterSeconds: Math.max(1, Math.ceil((resetAt - now) / 1000))
    };
  }

  recent.push(now);
  hits.set(key, recent);
  prune(now, windowMs);

  return {
    allowed: true,
    remaining: max - recent.length,
    resetAt: now + windowMs,
    retryAfterSeconds: 0
  };
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}
