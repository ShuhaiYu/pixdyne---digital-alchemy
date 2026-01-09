import { CaseStudyItem } from '@/types';

export const caseStudies: CaseStudyItem[] = [
  {
    id: '1',
    slug: 'austin-education',
    name: 'Austin Education',
    category: 'Web Development',
    img: '/projects/Austin_Education.png',
    client: 'Austin Education Group',
    year: '2024',
    challenge: 'Create a modern educational platform with seamless learning experience.',
    solution: 'We built a comprehensive e-learning platform using Next.js with interactive course modules, progress tracking, and real-time collaboration features.',
    stack: ['Next.js', 'React', 'Node.js'],
    seoTitle: 'Austin Education - Web Development Case Study',
    seoDescription: 'How we built a modern educational platform for Austin Education Group.',
    featured: true,
    cardSize: 'featured',
    shortDescription: 'Modern educational platform with interactive learning'
  },
  {
    id: '2',
    slug: 'basr-design',
    name: 'BASR Design',
    category: 'Brand Identity',
    img: '/projects/BASR_Design.png',
    client: 'BASR Studio',
    year: '2024',
    challenge: 'Develop a distinctive brand identity for a creative design studio.',
    solution: 'Created a bold visual identity system including logo, typography, and brand guidelines that reflect the studio\'s innovative approach.',
    stack: ['Figma', 'Illustrator', 'After Effects'],
    cardSize: 'small',
    shortDescription: 'Bold brand identity for creative studio'
  },
  {
    id: '3',
    slug: 'insight-idea',
    name: 'Insight Idea',
    category: 'App Design',
    img: '/projects/Insight_Idea.png',
    client: 'Insight Technologies',
    year: '2024',
    challenge: 'Design an intuitive analytics dashboard for business insights.',
    solution: 'Developed a data visualization platform with real-time analytics, custom reporting, and AI-powered recommendations.',
    stack: ['React', 'D3.js', 'Python'],
    cardSize: 'small',
    shortDescription: 'AI-powered business analytics platform'
  },
  {
    id: '4',
    slug: 'jusn-design',
    name: 'JUSN Design',
    category: 'Web Development',
    img: '/projects/JUSN_Design.png',
    client: 'JUSN Creative',
    year: '2024',
    challenge: 'Build a portfolio website showcasing creative work with stunning visuals.',
    solution: 'Created an immersive portfolio experience with WebGL effects, smooth animations, and optimized performance.',
    stack: ['Next.js', 'Three.js', 'GSAP'],
    featured: true,
    cardSize: 'featured',
    shortDescription: 'Immersive creative portfolio with WebGL'
  },
  {
    id: '5',
    slug: 'petdaddy',
    name: 'Petdaddy',
    category: 'App Design',
    img: '/projects/Petdaddy.png',
    client: 'Petdaddy Inc',
    year: '2024',
    challenge: 'Create a pet care app connecting pet owners with services.',
    solution: 'Built a mobile-first platform with booking system, GPS tracking, and community features for pet lovers.',
    stack: ['React Native', 'Firebase', 'Node.js'],
    cardSize: 'small',
    shortDescription: 'Pet care platform connecting owners and services'
  },
  {
    id: '6',
    slug: 'redbridge',
    name: 'Redbridge',
    category: 'Web Development',
    img: '/projects/Redbridge.jpg',
    client: 'Redbridge Properties',
    year: '2023',
    challenge: 'Develop a real estate platform with advanced property search.',
    solution: 'Created a feature-rich property listing site with 3D tours, mortgage calculator, and neighborhood insights.',
    stack: ['Next.js', 'PostgreSQL', 'Mapbox'],
    cardSize: 'small',
    shortDescription: 'Real estate platform with 3D property tours'
  },
  {
    id: '7',
    slug: 'rjl',
    name: 'RJL',
    category: 'Brand Identity',
    img: '/projects/RJL.png',
    client: 'RJL Group',
    year: '2024',
    challenge: 'Rebrand a consulting firm for the modern digital landscape.',
    solution: 'Delivered complete brand refresh including logo redesign, website overhaul, and digital marketing strategy.',
    stack: ['Figma', 'Webflow', 'After Effects'],
    cardSize: 'small',
    shortDescription: 'Modern rebrand for consulting firm'
  },
  {
    id: '8',
    slug: 'whisky-trade',
    name: 'Whisky Trade',
    category: 'E-Commerce',
    img: '/projects/Whisky_Trade.jpg',
    client: 'Whisky Trade Co',
    year: '2023',
    challenge: 'Build a premium e-commerce platform for rare whisky trading.',
    solution: 'Developed a sophisticated marketplace with authentication system, auction features, and secure payment processing.',
    stack: ['Shopify Plus', 'React', 'Stripe'],
    cardSize: 'small',
    shortDescription: 'Premium marketplace for rare whisky'
  }
];

export function getAllCaseStudies(): CaseStudyItem[] {
  return caseStudies;
}

export function getFeaturedCaseStudies(limit: number = 8): CaseStudyItem[] {
  return caseStudies.slice(0, limit);
}

export function getCaseStudyBySlug(slug: string): CaseStudyItem | undefined {
  return caseStudies.find(c => c.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map(c => c.slug);
}
