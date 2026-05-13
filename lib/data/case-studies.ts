import { CaseStudyItem } from '@/types';

// Historical project list. All eleven brands below are publishable per
// owner direction (2026-05-13) — the public URLs are surfaced directly
// via `liveUrl`. Some narrative facts are still pending owner verification
// (precise scope: build vs takeover vs ongoing operations); those spots
// are kept conservative rather than fabricated.
//
// CLAUDE.md rules respected:
//   §6 rule 3 — no invented metrics
//   §6 rule 9 — no SMB framing
//   §6 rule 10 — audience-recognised vocabulary in user-facing copy
//   §14.7   — no "world-class / leading / premier" superlatives
//   §14.3   — schema (CreativeWork + BreadcrumbList) emitted via page.tsx
//
// Year fields are intentionally omitted per owner direction; we surface
// the work, not a timeline. Hero images are pending — WorkDetailClient
// and the card components render a gradient fallback until real images
// land.

export const caseStudies: CaseStudyItem[] = [
  // ─── E-commerce ─────────────────────────────────────────────────────
  {
    id: '01',
    slug: 'epm-offroad',
    name: 'EPM Offroad',
    client: 'EPM Offroad',
    category: 'E-commerce',
    liveUrl: 'https://www.epmoffroad.com/',
    services: ['Web Development'],
    stack: ['Shopify', 'Multi-brand catalogue', 'Aftermarket automotive'],
    challenge:
      "EPM Offroad sells aftermarket off-road and overland accessories — heavy, fitment-sensitive parts spread across brands customers search for by name. They needed a storefront that could carry several distinct brand catalogues (aFe Power, Baja Designs, Eibach, KC HiLites among others) without making the site feel like a wholesaler's spreadsheet.",
    solution:
      "We built the storefront on Shopify so the team has one back office for inventory, payments, and shipping across brands. Product taxonomy is structured around vehicle category and component — lift kits, lighting, intakes — so a RAM TRX owner lands on the right shelf without scrolling past everything else first. Promotions, returns, and free-shipping rules are wired into Shopify natively rather than bolted on as add-on apps that drift out of date.",
    shortDescription:
      'Shopify storefront carrying multiple off-road brands under one back office.',
    seoTitle: 'EPM Offroad — Multi-Brand Shopify Storefront',
    seoDescription:
      'A Shopify storefront for off-road and overland accessories carrying aFe Power, Baja Designs, Eibach, KC HiLites and more under one back office. Built by Pixdyne.',
    img: '',
    cardSize: 'small'
  },
  {
    id: '02',
    slug: 'tyre-boys',
    name: 'Tyre Boys',
    client: 'Tyre Boys',
    category: 'E-commerce',
    liveUrl: 'https://www.tyreboys.com/',
    services: ['Web Development'],
    stack: ['Shopify', 'Tyre size finder', 'Multi-brand inventory'],
    challenge:
      "Tyre Boys is a Springvale tyre retailer that sells across multiple brands and dozens of sizes. The challenge in tyre e-commerce is matching — customers don't buy 'a tyre', they buy a specific size and load rating for a specific vehicle. The site had to make finding the right tyre feel obvious rather than overwhelming.",
    solution:
      "We built the storefront on Shopify with a size finder up front, so the visitor narrows by size before they see brands. The catalogue spans seven brands — Dunlop, Goodyear, Kumho, Pirelli and others — under one checkout, with promotional bundles like 'Buy 3, Get 1 Free' wired into Shopify's native discount logic. A back-in-stock notification system handles the long tail of less common sizes without manual customer chasing.",
    shortDescription:
      'Shopify storefront with a size-first tyre finder across seven brands.',
    seoTitle: 'Tyre Boys — Size-First Shopify Tyre Storefront',
    seoDescription:
      'A Shopify tyre storefront built around a size finder so customers narrow by fitment before brand. Multi-brand inventory, native promotions, restock notifications. Built by Pixdyne.',
    img: '',
    cardSize: 'small'
  },
  {
    id: '03',
    slug: 'pet-daddy',
    name: 'Pet Daddy',
    client: 'Pet Daddy',
    category: 'E-commerce',
    liveUrl: 'https://www.petdaddy.com.au/',
    services: ['Web Development'],
    stack: ['Shopify', 'Grooming booking', 'Retail + service'],
    challenge:
      "Pet Daddy runs a Surrey Hills pet boutique with both physical retail and a grooming service. They needed an online store that could carry premium pet supplies across dog and cat categories, while also surfacing the grooming booking flow without making it feel like a bolted-on second business.",
    solution:
      "We built the storefront on Shopify and structured the catalogue across roughly fifteen primary categories — food, treats, health, bedding, accessories — for both dog and cat audiences. Grooming bookings live inside the same Shopify back office, so the team isn't reconciling two systems. Comparison and wishlist tools sit on top for customers who want to research before adding to cart.",
    shortDescription:
      'Shopify storefront for a Melbourne pet boutique with integrated grooming booking.',
    seoTitle: 'Pet Daddy — Shopify Store + Grooming Booking',
    seoDescription:
      "A Shopify storefront for a Surrey Hills pet boutique, with grooming bookings running inside the same back office as retail. Built by Pixdyne.",
    img: '',
    cardSize: 'small'
  },
  {
    id: '04',
    slug: 'peppy-planet',
    name: 'Peppy Planet',
    client: 'Peppy Planet',
    category: 'E-commerce',
    liveUrl: 'https://www.peppyplanet.com.au/',
    services: ['Web Development'],
    stack: ['Shopify', 'Booking flow', 'Venue hire'],
    challenge:
      "Peppy Planet runs an indoor play venue in Bayswater where weekend birthday parties drive most of the revenue. They needed a public site that could sell ticketed entry, party-room bookings, and after-hours venue hire through one checkout — without forcing parents through a separate booking system to pay.",
    solution:
      "We built the storefront on Shopify so the team can run the venue from one back office rather than learning new software for every channel. Entry tickets, party packages, and after-hours hire are each modelled as Shopify products with scheduling, so a parent can compare dates and pay in a single flow. Downloadable party invitations and an email list for booking access sit on top of the same store.",
    shortDescription:
      'Shopify storefront that sells entry, parties, and venue hire through one checkout.',
    seoTitle: 'Peppy Planet — Shopify Party-Booking Storefront',
    seoDescription:
      'A Shopify storefront for a Bayswater indoor play venue that sells entry tickets, party-room bookings, and after-hours hire through one checkout. Built by Pixdyne.',
    img: '',
    cardSize: 'small'
  },
  {
    id: '05',
    slug: '4wd-interiors',
    name: '4WD Interiors',
    client: '4WD Interiors',
    category: 'E-commerce',
    liveUrl: 'https://www.4wdinteriors.com/',
    services: ['Web Development'],
    stack: ['Shopify', 'Vehicle fitment configurator', 'B2B distributor portal', 'ADR compliance docs'],
    challenge:
      "4WD Interiors sells premium cargo organisation systems — drawers, roof consoles, cargo barriers — that have to fit specific 4WD vehicles. Every product is fitment-sensitive, and the catalogue serves both retail customers and a distributor network. The site needed to filter products by vehicle and serve two distinct buyer flows from the same store.",
    solution:
      "We built the storefront on Shopify with a vehicle selector up front, so a customer narrows the catalogue to products that physically fit their 4WD before any other browsing. A B2B distributor portal sits alongside the retail flow, gated by login, so trade pricing and bulk ordering live in the same Shopify back office as direct retail. ADR compliance documentation and measurement guides are surfaced inline on each product, because safety paperwork is part of what 4WD owners need to see before buying.",
    shortDescription:
      'Shopify storefront with vehicle fitment configurator and a B2B distributor portal.',
    seoTitle: '4WD Interiors — Fitment Configurator + B2B Shopify Storefront',
    seoDescription:
      'A Shopify storefront for premium 4WD cargo systems, with a vehicle fitment configurator, ADR compliance docs, and a B2B distributor portal. Built by Pixdyne.',
    img: '',
    cardSize: 'wide'
  },

  // ─── Marketing sites ────────────────────────────────────────────────
  {
    id: '06',
    slug: 'promod-group',
    name: 'Promod Group',
    client: 'Promod Group',
    category: 'Marketing Site',
    liveUrl: 'https://www.promodgroup.com.au/',
    services: ['Web Development'],
    stack: ['Custom CMS', 'B2B marketing site', 'Rebuild in progress'],
    challenge:
      "Promod Group is an Australian modular construction company supplying prefabricated buildings to residential, education, healthcare, and infrastructure clients. The audience is institutional — government agencies, developers, large investors — so the site has to read as a credible long-term partner, not as a marketing brochure.",
    solution:
      "The current site runs on a lightweight custom CMS we built and operate, focused on the company values, capabilities, and the Probotics automation product line rather than a transactional catalogue. We are currently rebuilding the site to better reflect the company's domestic-manufacturing positioning and to integrate the project portfolio more deeply. The rebuild keeps the Pixdyne stack and editorial structure — the team only has to learn one CMS over the lifetime of the engagement.",
    shortDescription:
      'B2B marketing site for an Australian modular construction company — rebuild underway.',
    seoTitle: 'Promod Group — Modular Construction Marketing Site',
    seoDescription:
      'A B2B marketing site for an Australian modular construction company, built and operated by Pixdyne. Rebuild currently in progress.',
    img: '',
    cardSize: 'small'
  },
  {
    id: '07',
    slug: 'good-mood-studio',
    name: 'Goodmood Studio',
    client: 'Goodmood Studio',
    category: 'Marketing Site',
    liveUrl: 'https://www.goodmoodstudio.com.au/en',
    services: ['Web Development'],
    stack: ['Custom web platform', 'Bilingual (EN/中)', 'Image-optimised editorial'],
    challenge:
      "Goodmood Studio is a Melbourne-based marketing agency working in both directions across the China–Australia bridge — helping Chinese brands enter Australia and Australian businesses expand into China. Their site needed to convince two audiences from different markets, in two languages, that the team understands both.",
    solution:
      "We built the site as a fully bilingual marketing surface — every page renders cleanly in English or Chinese, with the same editorial structure on both sides. Six service offerings (Brand Strategy, PR & Events, Data Analytics, Social Media, Digital Marketing, Creative Content) are surfaced consistently across the languages, and a three-step process framework (Analysis, Strategy, Execution) anchors how the agency works. Image-heavy presentation matters in this industry, so the site is built with server-side image optimisation to keep the visual richness from costing speed.",
    shortDescription:
      'Bilingual marketing site for a Melbourne cross-border China–Australia agency.',
    seoTitle: 'Goodmood Studio — Bilingual Cross-Border Marketing Site',
    seoDescription:
      'A bilingual (EN/中) marketing site for a Melbourne marketing agency working the China–Australia bridge. Built by Pixdyne.',
    img: '',
    cardSize: 'small'
  },
  {
    id: '08',
    slug: 'insight-idea',
    name: 'Insight Idea',
    client: 'Insight Idea',
    category: 'Marketing Site',
    liveUrl: 'https://www.insightidea.com.au/en',
    services: ['Web Development'],
    stack: ['Custom web platform', 'Bilingual (EN/中)', 'Credentials + partnerships'],
    challenge:
      "Insight Idea is an Australian immigration consultancy serving visa, education-placement, and Administrative Appeals Tribunal clients. Migration buyers are evaluating trust above all else — credentials, partnerships, and outcomes matter more than design polish. The site had to surface professional credentials and success narratives without descending into testimonial-overload generic agency styling.",
    solution:
      "We built the site as a bilingual marketing surface (English and Chinese) so prospective migrants research in their own language. MARN and QEAC credentials are surfaced prominently in the page chrome rather than buried, and a strategic partnership with Red Bridge recruitment is presented as part of the service architecture rather than a logo wall. Video-led client success narratives carry the social proof.",
    shortDescription:
      'Bilingual marketing site for an Australian immigration consultancy.',
    seoTitle: 'Insight Idea — Bilingual Immigration Consultancy Site',
    seoDescription:
      'A bilingual (EN/中) marketing site for an Australian immigration consultancy. Credentials and success narratives carry the social proof. Built by Pixdyne.',
    img: '',
    cardSize: 'small'
  },
  {
    id: '09',
    slug: 'open-mat',
    name: 'Open Mat',
    client: 'Open Mat',
    category: 'Marketing Site',
    liveUrl: 'https://www.openmat.com.cn/',
    services: ['Web Development'],
    stack: ['Custom web platform', '.cn domain', 'China-market infrastructure'],
    challenge:
      "Open Mat is a brand and agency operation serving Chinese-market clients. The site had to ship on a .cn domain — which carries ICP-filing implications, hosting locality requirements, and platform constraints that differ from a standard Australian build. Decisions that look minor on an Australian site (font sources, CDN providers, embedded fonts) all become structural choices on a Chinese-market site.",
    solution:
      "We built the site on infrastructure that works inside the Chinese market — ICP filing accounted for, asset delivery routed through China-friendly CDNs, and external resources audited so nothing on the page depends on services blocked or slowed inside the mainland. The editorial structure mirrors the bilingual marketing-agency pattern used on our Australian sites, adapted for the Chinese audience.",
    shortDescription:
      'Brand-agency marketing site shipped on a .cn domain with China-market infrastructure.',
    seoTitle: 'Open Mat — Chinese-Market Brand Agency Site',
    seoDescription:
      'A marketing site for a Chinese-market brand agency, shipped on a .cn domain with ICP filing and China-friendly asset delivery. Built by Pixdyne.',
    img: '',
    cardSize: 'small'
  },

  // ─── Custom systems (large projects) ───────────────────────────────
  {
    id: '10',
    slug: 'australian-whisky-auctions',
    name: 'Australian Whisky Auctions',
    client: 'Australian Whisky Auctions',
    category: 'Custom System',
    liveUrl: 'https://www.australianwhiskyauctions.com.au/',
    services: ['System Development'],
    stack: ['Custom auction software', 'Age-verification compliance', 'Spirits logistics', 'Ongoing development'],
    challenge:
      "The secondary whisky market in Australia is significant but fragmented — sellers wanted a real auction surface rather than a fixed-price store, and buyers needed a credible bidding flow with the compliance overhead that liquor sales require. There is no off-the-shelf 'whisky auction' platform; Shopify and other commerce platforms model fixed prices, not time-bound bidding with submission windows. The system had to be built.",
    solution:
      "We built the auction platform from scratch — a bespoke system covering submission windows for sellers, time-bound auctions for buyers, live auction viewing, age-verification compliance with Australian liquor law, and delivery and insurance handling tailored for spirits. Over 70,000 lots have moved through the platform since launch. Pixdyne continues to operate and extend the system as the auction format evolves.",
    shortDescription:
      'Bespoke whisky auction platform — submission windows, age verification, spirits logistics.',
    seoTitle: 'Australian Whisky Auctions — Bespoke Auction Platform',
    seoDescription:
      'A bespoke auction platform built for the Australian secondary whisky market. Submission windows, age verification, spirits logistics, 70,000+ lots. Built and operated by Pixdyne.',
    img: '',
    cardSize: 'featured',
    featured: true
  },
  {
    id: '11',
    slug: 'austin-education',
    name: 'Austin Education',
    client: 'Austin Education',
    category: 'Custom System',
    liveUrl: 'https://www.austineducation.com.au/',
    services: ['System Development'],
    stack: ['Custom web platform', 'Student portal', 'Trial booking', 'ATAR calculator', 'Bilingual (EN/中)'],
    challenge:
      "Austin Education runs K-12 tutoring across VCE, UCAT, and selective school prep — seven campuses across Victoria and Adelaide, with hundreds of concurrent students and a track record going back to 2013. A site at that scale stops being a marketing brochure and starts being an operating system: trial lesson booking, a student portal for homework and webinars, ATAR calculation tooling, a multi-campus catalogue, and bilingual presentation for the Chinese-speaking parent audience.",
    solution:
      "We built the public-facing site and the supporting student portal ('My Austin') as a single custom web platform, so a student logging in to do homework lives in the same system as the parent comparing course schedules. Trial lesson booking is wired into back-office scheduling rather than living as an isolated form. An ATAR calculator helps prospective students assess fit before booking. The site renders fully in English and Chinese, matching the bilingual reality of the parent audience. Pixdyne operates the platform on an ongoing basis as the school adds campuses and courses.",
    shortDescription:
      'Public site + student portal for a multi-campus tutoring business, bilingual and operated end-to-end.',
    seoTitle: 'Austin Education — Custom Student Portal + Bilingual Site',
    seoDescription:
      "A custom web platform combining the public site, a student portal (My Austin), trial booking, an ATAR calculator, and bilingual (EN/中) presentation for a multi-campus VCE / UCAT tutoring business. Built and operated by Pixdyne.",
    img: '',
    cardSize: 'featured',
    featured: true
  }
];

export function getAllCaseStudies(): CaseStudyItem[] {
  return caseStudies;
}

export function getFeaturedCaseStudies(limit: number = 8): CaseStudyItem[] {
  return caseStudies.slice(0, limit);
}

export function getCaseStudyBySlug(slug: string): CaseStudyItem | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map((c) => c.slug);
}
