export type TransitionType =
  | 'none'
  | 'curtain'
  | 'parallax'
  | 'mask-diagonal'
  | 'pixel-glitch';

export interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
  transitionType?: TransitionType;
  zIndex: number;
  bgImage?: string;
  fitContent?: boolean;
  pinnable?: boolean;
  peekBackground?: React.ReactNode;
  'aria-label'?: string;
}

export type ServiceTier = 'service' | 'product';

export interface SubService {
  slug: string;
  title: string;
  description: string;
  features: string[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  description: string;
  fullDescription: string;
  tier: ServiceTier;
  externalUrl?: string;
  tags: string[];
  features: string[];
  subServices?: SubService[];
  // price and stats are optional. Until owner-confirmed real numbers
  // are available, leave them undefined; UI renders neutral placeholders
  // ("—" for stats, "Get a quote" for price). See CLAUDE.md §6.
  price?: string;
  stats?: {
    projects?: number;
    satisfaction?: number;
    support?: string;
  };
  seoTitle?: string;
  seoDescription?: string;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  img: string;
  client: string;
  year: string;
  challenge: string;
  solution: string;
  stack: string[];
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
  cardSize?: 'small' | 'wide' | 'featured';
  accentColor?: string;
  shortDescription?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  img: string;
  bio?: string;
  linkedin?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  content?: string;
  seoTitle?: string;
  seoDescription?: string;
}
