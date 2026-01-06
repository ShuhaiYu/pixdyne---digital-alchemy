import { ServiceItem } from '@/types';

export const services: ServiceItem[] = [
  {
    id: '01',
    slug: 'web-dev',
    number: '01',
    title: 'Web Dev',
    description: 'High-performance React & Next.js architectures built for scale and speed.',
    fullDescription: 'We specialize in building bespoke web applications using the latest modern stacks. From high-conversion marketing sites to complex SaaS dashboards, our code is clean, semantic, and performant.',
    tags: ['React', 'Next.js', 'WebGL', 'Shopify'],
    features: ['Headless CMS Integration', 'Performance Optimization', 'Accessibility (WCAG)', 'Interactive WebGL'],
    price: 'From $2,000',
    seoTitle: 'Web Development Services',
    seoDescription: 'High-performance React & Next.js web development. Custom web applications, e-commerce solutions, and enterprise platforms built for scale.',
    stats: {
      projects: 150,
      satisfaction: 98,
      support: '24/7'
    }
  },
  {
    id: '02',
    slug: 'app-dev',
    number: '02',
    title: 'App Dev',
    description: 'Native and cross-platform mobile experiences that feel like magic.',
    fullDescription: 'Our mobile development team crafts fluid, native-feeling applications for iOS and Android. Whether you need a React Native cross-platform solution or pure Swift/Kotlin, we deliver.',
    tags: ['iOS', 'Android', 'React Native', 'Flutter'],
    features: ['Offline First Architecture', 'Biometric Auth', 'Real-time Sync', 'App Store Optimization'],
    price: 'From $3,500',
    seoTitle: 'Mobile App Development Services',
    seoDescription: 'Native iOS and Android app development. Cross-platform solutions with React Native and Flutter for seamless mobile experiences.',
    stats: {
      projects: 80,
      satisfaction: 96,
      support: '24/7'
    }
  },
  {
    id: '03',
    slug: 'technical-seo',
    number: '03',
    title: 'Technical SEO',
    description: 'Data-driven optimization to dominate search rankings organically.',
    fullDescription: 'Forget keyword stuffing. We focus on technical excellence—improving core web vitals, implementing semantic schema markup, and building high-authority backlink profiles.',
    tags: ['Audit', 'Content Strategy', 'Backlinking'],
    features: ['Site Speed Audit', 'Competitor Analysis', 'Schema Implementation', 'Local SEO'],
    price: 'From $1,200/mo',
    seoTitle: 'Technical SEO Services',
    seoDescription: 'Expert technical SEO optimization. Core Web Vitals, schema markup, site audits, and content strategy to dominate search rankings.',
    stats: {
      projects: 200,
      satisfaction: 94,
      support: 'Mon-Fri'
    }
  },
  {
    id: '04',
    slug: 'it-support',
    number: '04',
    title: 'IT Support',
    description: '24/7 infrastructure monitoring and enterprise-grade security.',
    fullDescription: 'Your digital infrastructure needs to be bulletproof. We provide round-the-clock monitoring, automated backups, and rapid incident response to ensure 99.99% uptime.',
    tags: ['Cloud', 'Cybersecurity', 'Maintenance'],
    features: ['24/7 Monitoring', 'Cloud Migration', 'Security Hardening', 'Disaster Recovery'],
    price: 'From $800/mo',
    seoTitle: 'IT Support & Infrastructure Services',
    seoDescription: '24/7 IT infrastructure monitoring and support. Cloud migration, cybersecurity, and enterprise-grade maintenance solutions.',
    stats: {
      projects: 500,
      satisfaction: 99,
      support: '24/7'
    }
  }
];

export function getAllServices(): ServiceItem[] {
  return services;
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find(s => s.slug === slug);
}

export function getServiceSlugs(): string[] {
  return services.map(s => s.slug);
}
