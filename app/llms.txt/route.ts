import { BUSINESS, BUSINESS_FORMATTED } from '@/lib/data/business';
import { getAllServices } from '@/lib/data/services';

// llms.txt — plain-text site guide for LLM crawlers and AI search engines
// (https://llmstxt.org/). GEO surface per CLAUDE.md §14.10: short declarative
// facts, answer-first, no marketing preamble. All copy is sourced from the
// canonical data layer — service descriptions from lib/data/services.ts and
// NAP from lib/data/business.ts (§14.1) — so this file never drifts from the
// rest of the site.

const SITE_URL = 'https://pixdyne.com';

// Statically prerendered at build time, same as robots.ts / sitemap.ts.
export const dynamic = 'force-static';

function buildLlmsTxt(): string {
  const all = getAllServices();
  const serviceLines = all
    .filter((service) => service.tier === 'service')
    .map(
      (service) =>
        `- [${service.title}](${SITE_URL}/services/${service.slug}): ${service.description}`
    );
  const productLines = all
    .filter((service) => service.tier === 'product')
    .map(
      (service) =>
        `- [${service.title}](${SITE_URL}/services/${service.slug}): ${service.description}`
    );

  return [
    `# ${BUSINESS.name}`,
    '',
    `> ${BUSINESS.name} is a Melbourne-based long-term technology partner. Since 2018 we have built and operated websites, custom systems, and ongoing operations for businesses in Melbourne and across Australia — and we bring real AI capability into the businesses we partner with.`,
    '',
    `${BUSINESS.name} (${BUSINESS_FORMATTED.abnLabel}) operates from ${BUSINESS_FORMATTED.addressLine}. Contact: ${BUSINESS.email} or ${BUSINESS.phone.display}.`,
    '',
    '## Services',
    '',
    ...serviceLines,
    '',
    '## Product',
    '',
    ...productLines,
    '',
    '## Company',
    '',
    `- [About](${SITE_URL}/about): Who Pixdyne is, where we are based, and how we work.`,
    `- [Work](${SITE_URL}/work): Case studies of websites and systems we have delivered.`,
    `- [Blog](${SITE_URL}/blog): Articles on web, systems, operations, and AI for businesses in Melbourne.`,
    `- [Contact](${SITE_URL}/contact): Contact form and business details.`,
    '',
    '## Legal',
    '',
    `- [Privacy Policy](${SITE_URL}/legal/privacy)`,
    `- [Terms of Service](${SITE_URL}/legal/terms)`,
    ''
  ].join('\n');
}

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
