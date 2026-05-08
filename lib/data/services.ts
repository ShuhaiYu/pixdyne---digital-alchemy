import { ServiceItem } from '@/types';

// Service architecture canonicalised in CLAUDE.md §5.
// Three service lines (Web Development, System Development, Operations) plus
// one product line (OnlyPixAI). Stats and prices are intentionally omitted
// until the owner confirms real numbers — see CLAUDE.md §6 (Content Constraints).

export const services: ServiceItem[] = [
  {
    id: '01',
    slug: 'web-development',
    number: '01',
    title: 'Web Development',
    tier: 'service',
    description:
      'Websites built and launched for Melbourne SMBs — designed, developed, and deployed end-to-end.',
    fullDescription:
      'From WordPress and Shopify storefronts to bespoke React and Next.js builds, we deliver websites that work for the business behind them. Design, development, deployment, and the handover that lets your team take it from there.',
    tags: ['Next.js', 'React', 'WordPress', 'Shopify', 'Tailwind'],
    features: [
      'Design and UI',
      'Frontend build (React / Next.js)',
      'Headless CMS integration',
      'WordPress and Shopify',
      'Performance and Core Web Vitals',
      'Accessibility'
    ],
    seoTitle: 'Web Development Services Melbourne',
    seoDescription:
      'Pixdyne builds and deploys websites for Melbourne SMBs — WordPress, Shopify, and bespoke Next.js builds. Design through launch and beyond.'
  },
  {
    id: '02',
    slug: 'system-development',
    number: '02',
    title: 'System Development',
    tier: 'service',
    description:
      'Custom internal systems and apps built around how your business actually works.',
    fullDescription:
      'ERP and CRM rollouts, internal tooling, dashboards, and mobile apps. We design systems that fit the workflow, rather than asking the business to bend around the software. Working ground includes NetSuite, Salesforce, custom Node and Postgres backends, React Native, and native iOS / Android.',
    tags: [
      'NetSuite',
      'CRM',
      'Node.js',
      'PostgreSQL',
      'React Native',
      'iOS',
      'Android'
    ],
    features: [
      'ERP and CRM implementation',
      'Custom internal tooling',
      'API and integration work',
      'Mobile apps (iOS / Android)',
      'Database design',
      'Authentication and access control'
    ],
    seoTitle: 'Custom System Development Melbourne — ERP, CRM, Apps',
    seoDescription:
      'NetSuite implementations, bespoke CRMs, internal tools, and mobile apps for Melbourne SMBs. Pixdyne builds systems that fit the way your team actually works.'
  },
  {
    id: '03',
    slug: 'operations',
    number: '03',
    title: 'Operations',
    tier: 'service',
    description:
      'Post-launch services that keep your site, system, and search presence working — pick what you need.',
    fullDescription:
      "Most projects don't end at launch. Operations is the bundle of services that keep things running afterwards: hosting and uptime monitoring, ongoing SEO and content, and continuous development on what we've already built. Take it as a single retainer, or pick the individual services you need.",
    tags: ['Vercel', 'Cloudflare', 'GA4', 'Search Console', 'Sentry'],
    features: [
      'Hosting, SSL, backups',
      'Uptime and security monitoring',
      'Incident response',
      'Technical SEO maintenance',
      'Content production',
      'GA4 and Search Console reporting',
      'Bug fixes and feature work',
      'Third-party integration upkeep'
    ],
    subServices: [
      {
        slug: 'managed-it',
        title: 'Managed IT',
        description:
          'Hosting, SSL, monitoring, backups, and incident response for the sites and systems we have shipped — or for ones you have inherited.',
        features: [
          'Hosting and DNS',
          'SSL and domain management',
          'Uptime and security monitoring',
          'Automated backups',
          'Incident response'
        ]
      },
      {
        slug: 'seo-content',
        title: 'SEO & Content',
        description:
          'Ongoing technical SEO and content production for Melbourne-focused growth. We maintain rankings rather than promising them.',
        features: [
          'Technical SEO maintenance',
          'On-page optimisation',
          'Content production',
          'Local SEO and Google Business Profile',
          'GA4 and Search Console reporting'
        ]
      },
      {
        slug: 'devops',
        title: 'DevOps',
        description:
          "The technical team you don't have to hire. Bug fixes, new features, integrations, and the steady iteration that keeps a system useful.",
        features: [
          'Bug fixes and patching',
          'New feature work',
          'Third-party integration maintenance',
          'Database and migration upkeep',
          'CI/CD and release management'
        ]
      }
    ],
    seoTitle: 'Managed IT, SEO & DevOps for Melbourne SMBs',
    seoDescription:
      'Operations from Pixdyne: managed IT, ongoing SEO and content, and continuous development. Pick a single service or take the lot as a retainer.'
  },
  {
    id: 'PX',
    slug: 'onlypixai',
    number: 'PX',
    title: 'OnlyPixAI',
    tier: 'product',
    externalUrl: 'https://www.onlypixai.com/',
    description:
      "Pixdyne's own AI product — proof we can deliver AI to end users, not just code with it.",
    fullDescription:
      "OnlyPixAI is a Pixdyne product, not a service. It is a public demonstration of how we approach AI: we don't sell AI as an internal productivity tool — we build AI products and capabilities that real people actually use. Visit OnlyPixAI to see what that looks like in production.",
    tags: ['Product', 'AI', 'Live'],
    features: [
      'Live, production AI product',
      'Built and operated by Pixdyne',
      'Visit to see our approach to AI delivery'
    ],
    seoTitle: 'OnlyPixAI — Pixdyne AI Product',
    seoDescription:
      'OnlyPixAI is a Pixdyne product showcasing how we deliver AI to end users. Visit onlypixai.com to see our approach to AI in production.'
  }
];

export function getAllServices(): ServiceItem[] {
  return services;
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
