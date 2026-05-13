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
      'Websites built and launched end-to-end — design, development, deployment, and the handover that lets your team take it from there.',
    fullDescription:
      'Web development from a Melbourne team that has built and shipped sites since 2018. From WordPress and Shopify storefronts to Webflow marketing sites and fully bespoke product builds, we deliver websites that work for the business behind them. We pick the platform that fits how your team will run it after launch — not whatever was easiest to build.',
    tags: [
      'WordPress',
      'Shopify',
      'Webflow',
      'Squarespace',
      'Headless commerce',
      'Custom build'
    ],
    features: [
      'Design and UI',
      'Frontend build',
      'Headless CMS integration',
      'WordPress and Shopify',
      'Performance and Core Web Vitals',
      'Accessibility'
    ],
    seoTitle: 'Web Development Services Melbourne',
    seoDescription:
      'Pixdyne builds and deploys websites in Melbourne — WordPress, Shopify, Webflow, and fully custom builds. Design through launch and beyond.',
    faqs: [
      {
        question: 'What platforms do you build websites on?',
        answer:
          'We pick the platform that fits how your team will run the site after launch. In practice that means WordPress, Shopify, Webflow, or Squarespace when those fit; a fully custom build when they do not. We do not push everyone onto the same stack.'
      },
      {
        question: 'Can you take over an existing website, or do you only build new ones?',
        answer:
          'Both. A meaningful share of our work has been picking up sites built by someone else — cleaning up, modernising, and operating them from there. We will audit what is there before quoting.'
      },
      {
        question: 'How long does a typical website project take?',
        answer:
          'A small marketing site is usually 4 to 6 weeks. A larger custom build with integrations is 2 to 4 months. We give you a concrete timeline after scoping; we do not promise a number before we have looked at the work.'
      },
      {
        question: 'What happens after the site goes live?',
        answer:
          'Hand-off, plus the option to keep us on under Operations: hosting, monitoring, ongoing SEO and content, and continuous development. Most clients stay with us, but you are not locked in.'
      },
      {
        question: 'Do you handle design as well as development?',
        answer:
          'Yes. Design and development sit on the same team. If you already have brand guidelines or a design system, we work to those; if you do not, we produce the design as part of the project.'
      }
    ]
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
      'System development from a Melbourne team — custom software, ERP and CRM rollouts, internal tools, dashboards, and mobile apps. We design systems that fit the workflow, rather than asking the business to bend around the software. Working ground includes NetSuite, Salesforce, HubSpot, custom backends on Node.js, and native iOS and Android apps.',
    tags: [
      'NetSuite',
      'Salesforce',
      'HubSpot',
      'ERP',
      'CRM',
      'iOS apps',
      'Android apps'
    ],
    features: [
      'ERP and CRM implementation',
      'Custom internal tooling',
      'API and integration work',
      'Mobile apps (iOS / Android)',
      'Database design',
      'Authentication and access control'
    ],
    seoTitle: 'Custom System Development Melbourne — ERP & CRM',
    seoDescription:
      'NetSuite, Salesforce, bespoke CRMs, internal tools, and mobile apps from a Melbourne team. Pixdyne builds systems that fit how your team actually works.',
    faqs: [
      {
        question: 'Do you only build custom systems, or do you also work with NetSuite, Salesforce, and HubSpot?',
        answer:
          'Both. We implement NetSuite, Salesforce, and HubSpot when they fit, and we build custom systems when an off-the-shelf platform would force the business to bend around the software. The right call depends on your workflow, not on what we want to sell.'
      },
      {
        question: 'Can you build a mobile app for iOS and Android?',
        answer:
          'Yes — native iOS, native Android, and cross-platform builds when that is the right trade-off. Mobile apps are usually paired with a backend that we also build and operate.'
      },
      {
        question: 'Will we own the source code and the data?',
        answer:
          'Yes. Custom builds are delivered under a written services agreement that puts the code, the data, and the integrations under your ownership. Off-the-shelf platforms (NetSuite, Salesforce, HubSpot) follow their vendor terms.'
      },
      {
        question: 'How do you handle integrations with the tools we already use?',
        answer:
          'API-first. Most modern tools expose APIs; for the ones that do not, we work with their data exports or build the connector ourselves. Integration scope is part of every quote — there is no "integrations are extra" surprise after the project starts.'
      },
      {
        question: 'What if our needs change after the system is live?',
        answer:
          'That is what Operations is for — ongoing development on the systems we have already shipped. Many of our clients have been on continuous-development retainers since 2018.'
      }
    ]
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
      "Most projects don't end at launch. Operations is the post-launch bundle — managed IT (hosting, monitoring, backups), ongoing SEO and content, and continuous development on the systems we have already shipped. Delivered from Melbourne. Take it as a single retainer, or pick the individual services you need.",
    tags: [
      'Hosting',
      'SSL',
      'Backups',
      'Monitoring',
      'SEO',
      'Analytics',
      'Search Console'
    ],
    features: [
      'Hosting, SSL, backups',
      'Uptime and security monitoring',
      'Incident response',
      'Technical SEO maintenance',
      'Content production',
      'Analytics and Search Console reporting',
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
          'Ongoing technical SEO and content production for steady, defensible growth. We maintain rankings rather than promising them.',
        features: [
          'Technical SEO maintenance',
          'On-page optimisation',
          'Content production',
          'Local SEO and Google Business Profile',
          'Analytics and Search Console reporting'
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
          'Release management'
        ]
      }
    ],
    seoTitle: 'Managed IT, SEO & Ongoing Development Melbourne',
    seoDescription:
      'Operations from Pixdyne in Melbourne: managed IT, ongoing SEO and content, and continuous development. Pick a single service or take the lot as a retainer.',
    faqs: [
      {
        question: 'Can we hire you for Operations even if we did not build the site or system with you?',
        answer:
          'Yes. A good portion of Operations work starts with an audit of a site or system built by someone else. We do not require you to have used us for the original build.'
      },
      {
        question: 'What is included in Managed IT?',
        answer:
          'Hosting, SSL and domain management, uptime and security monitoring, automated backups, and incident response. We do not run a 24/7 NOC — for anything time-critical we agree response targets in writing first.'
      },
      {
        question: 'How does ongoing SEO work?',
        answer:
          'Technical SEO maintenance (Core Web Vitals, schema, internal linking), on-page optimisation, content production where you want it, and a monthly Search Console plus analytics report. We do not promise rankings; we maintain them and improve them over time.'
      },
      {
        question: 'Do you offer 24/7 support?',
        answer:
          'Not by default. Response targets are written into the retainer — usually next-business-day for routine work and around two-hour response for production-down incidents during AEST business hours. We do not advertise round-the-clock cover we cannot deliver.'
      },
      {
        question: 'Can we pick individual services, or do we have to take the full bundle?',
        answer:
          'Pick what you need. Managed IT, SEO and content, and DevOps each have their own scope. Some clients take only Managed IT, others take all three as a single retainer with a discount.'
      }
    ]
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
      "OnlyPixAI is a Pixdyne product, not a service — a unified AI gateway giving teams access to 100+ LLMs through one billed-once pipeline. It is also our public demonstration of how we approach AI: we don't sell AI as an internal productivity tool — we build AI products and capabilities that real people actually use. Visit OnlyPixAI to see what that looks like in production.",
    tags: ['Product', 'AI Gateway', 'Live'],
    features: [
      'Live, production AI product',
      'Built and operated by Pixdyne',
      'Visit to see our approach to AI delivery'
    ],
    seoTitle: 'OnlyPixAI — Unified AI Gateway',
    seoDescription:
      'OnlyPixAI is a Pixdyne product — a unified AI gateway with 100+ LLMs through one billed-once pipeline. Live at onlypixai.com.',
    faqs: [
      {
        question: 'What is OnlyPixAI?',
        answer:
          'OnlyPixAI is a Pixdyne product — a unified AI gateway that gives teams access to 100+ large language models (OpenAI, Claude, Gemini, open-source models, and more) through one API, billed once.'
      },
      {
        question: 'How is it different from using ChatGPT or Claude directly?',
        answer:
          'You stop maintaining a separate account, key, bill, and SDK for every AI vendor. You switch models with a config change, not a code rewrite. And you get a single, properly authorised supply chain instead of a tangle of unofficial wrappers.'
      },
      {
        question: 'Is OnlyPixAI a Pixdyne service, or a product I can sign up for?',
        answer:
          'It is a Pixdyne-built product, live at onlypixai.com. You sign up there directly. It is not a service we deliver on your behalf.'
      },
      {
        question: 'Can Pixdyne build something similar for our business?',
        answer:
          'Yes — AI capability tailored to your workflow is part of what we build under System Development. OnlyPixAI is the public demonstration that we know how to do this end-to-end.'
      },
      {
        question: 'Where do I sign up?',
        answer:
          'onlypixai.com — sign in, add a key, start sending requests.'
      }
    ]
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
