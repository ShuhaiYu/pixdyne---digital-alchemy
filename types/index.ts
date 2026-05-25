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
  // When a sub-service also has its own standalone detail page, this is the
  // route to it (e.g. '/services/managed-it'). The Operations bundle page
  // renders a "View full service" link from this. Omit for sub-services that
  // only live inside the bundle page (e.g. DevOps).
  detailHref?: string;
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
  // Optional FAQ block surfaced on the service detail page. Drives both
  // the visible accordion UI and the FAQPage schema. Keep questions plain
  // and answers truthful — fabricated answers are a truth-auditor block.
  faqs?: { question: string; answer: string }[];
}

// Lightweight view-model for the homepage Capabilities rail. It is derived
// from ServiceItem data (see getCapabilityCards) rather than rendered from
// the raw service list, because the rail shows a curated set of capabilities
// — not every ServiceItem. Managed IT and SEO & Content are now standalone
// service detail pages, so each card's `href` points straight at its own
// route (no deep-link anchor into the Operations bundle page).
export interface CapabilityCard {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  client: string;
  challenge: string;
  solution: string;
  stack: string[];
  // Optional fields. Owner-provided assets (hero img, year) land here
  // when they're ready. liveUrl and services drive the "Visit live
  // site" button and the related-service back-link on the detail page.
  img?: string;
  year?: string;
  liveUrl?: string;
  services?: string[];
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
  cardSize?: 'small' | 'wide' | 'featured';
  accentColor?: string;
  shortDescription?: string;
  // Fields used by the dedicated "Integrated Platform" detail template
  // (5 flagship projects that pair a customer-facing storefront with
  // a custom internal system). All optional — empty values are simply
  // not rendered, so projects without filled detail still ship safely.
  storefront?: string; // e.g. 'Shopify', 'WordPress', 'React'
  highlights?: string[]; // key capabilities, surfaced as a bulleted list
  metrics?: { value: string; label: string }[]; // headline numbers
  // Inline-gallery screenshots surfaced inside the body of the detail
  // page (not used as a hero). For Zeta-era projects where the public
  // record is the smartmockup screenshot suite rather than a Pixdyne-
  // shot hero photo, this lets us show the actual work without
  // pretending the screenshots are full-bleed hero art.
  gallery?: { src: string; caption?: string; alt?: string }[];
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
  /** Human-readable display date, e.g. "MAY 18, 2026". */
  date: string;
  /** ISO 8601 date (YYYY-MM-DD) used for schema.org datePublished/dateModified. */
  datePublished?: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  content?: string;
  seoTitle?: string;
  seoDescription?: string;
}
