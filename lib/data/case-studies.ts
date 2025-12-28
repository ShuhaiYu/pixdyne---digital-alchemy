import { CaseStudyItem } from '@/types';

export const caseStudies: CaseStudyItem[] = [
  {
    id: '1',
    slug: 'neon-flux',
    name: 'Neon Flux',
    category: 'Web Development',
    img: 'https://picsum.photos/800/600?random=10',
    client: 'Neon Flux Studios',
    year: '2024',
    challenge: 'Create a high-octane portfolio for a motion design studio that experiences zero lag.',
    solution: 'We re-architected the entire frontend using Next.js for server-side rendering, ensuring instantaneous page loads. We implemented a headless CMS for easy content management and used GSAP for high-end, silky smooth animations that elevate the brand perception.',
    stack: ['Next.js', 'WebGL', 'GLSL'],
    seoTitle: 'Neon Flux - Web Development Case Study',
    seoDescription: 'How we built a high-performance portfolio website for Neon Flux Studios using Next.js and WebGL.'
  },
  {
    id: '2',
    slug: 'apex-financial',
    name: 'Apex Financial',
    category: 'App Design',
    img: 'https://picsum.photos/800/600?random=11',
    client: 'Apex Corp',
    year: '2023',
    challenge: 'Reimagine the mobile banking experience for Gen Z users.',
    solution: 'We designed a modern, intuitive mobile banking app with gamification elements, real-time spending insights, and seamless peer-to-peer payments. The app achieved a 4.9 star rating on both app stores.',
    stack: ['React Native', 'Firebase', 'D3.js'],
    seoTitle: 'Apex Financial - Mobile App Case Study',
    seoDescription: 'Reimagining mobile banking for Gen Z. A React Native app with real-time insights and seamless UX.'
  },
  {
    id: '3',
    slug: 'orbital',
    name: 'Orbital',
    category: 'SEO Campaign',
    img: 'https://picsum.photos/800/600?random=12',
    client: 'Orbital Logistics',
    year: '2023',
    challenge: 'Increase organic traffic by 300% within 6 months.',
    solution: 'We conducted a comprehensive technical SEO audit, fixed critical Core Web Vitals issues, implemented structured data markup, and developed a content strategy that targeted high-intent keywords. Results: 347% increase in organic traffic.',
    stack: ['Ahrefs', 'Semrush', 'Python'],
    seoTitle: 'Orbital Logistics - SEO Campaign Case Study',
    seoDescription: 'How we increased organic traffic by 347% in 6 months through technical SEO and content strategy.'
  }
];

export function getAllCaseStudies(): CaseStudyItem[] {
  return caseStudies;
}

export function getCaseStudyBySlug(slug: string): CaseStudyItem | undefined {
  return caseStudies.find(c => c.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map(c => c.slug);
}
