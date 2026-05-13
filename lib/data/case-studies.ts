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
  },
  {
    id: '12',
    slug: 'cupcake-central',
    name: 'Cupcake Central',
    client: 'Cupcake Central',
    category: 'E-commerce',
    services: ['Web Development'],
    stack: ['WordPress', 'WooCommerce', 'Pickup + delivery scheduling'],
    challenge:
      "Cupcake Central is a Melbourne bakery selling cupcakes, cakes, and cookies through retail counters and delivery. Online ordering for perishables is a scheduling problem more than a catalogue problem — orders have to land at the right store, on the right day, before the kitchen's cut-off, or the experience falls apart at the door.",
    solution:
      "We built the e-commerce site with order-time and pickup-location selection wired into checkout, so the cart enforces same-day cutoff (orders before 12 pm for same-day delivery) and steers customers to their nearest store automatically. The catalogue covers cupcakes, cakes, and cookies under one back office, with customisation options surfaced at the product level rather than after the sale.",
    shortDescription:
      'E-commerce site for a Melbourne bakery with same-day cutoff and pickup-location scheduling baked into checkout.',
    seoTitle: 'Cupcake Central — Melbourne Bakery E-commerce',
    seoDescription:
      'An e-commerce site for a Melbourne bakery with same-day cutoff, pickup-location scheduling, and a full cake / cupcake / cookie catalogue. Built by Pixdyne.',
    img: '',
    cardSize: 'small'
  },
  {
    id: '13',
    slug: 'muscle-city',
    name: 'Muscle City',
    client: 'Muscle City',
    category: 'Marketing Site',
    services: ['Web Development'],
    stack: ['WordPress', 'Membership info', 'Class timetables'],
    challenge:
      "Muscle City runs a 24/7 premium gym in Melbourne, and their previous site was outdated enough to be costing them new members — prospective members would land, fail to find class times or membership info, and bounce. A gym's site has to read like its physical space: clean, modern, motivating, and useful.",
    solution:
      "We rebuilt the site on WordPress as a visually-led, fully responsive surface focused on converting new members. Class timetables, facility information, membership details, and social channels sit on one cohesive layout. The rebuild lifted the digital presence to match the gym itself rather than undercut it.",
    shortDescription:
      'Visually-led WordPress rebuild for a Melbourne 24/7 gym — class timetables and membership info on one cohesive surface.',
    seoTitle: 'Muscle City — Melbourne 24/7 Gym Site Rebuild',
    seoDescription:
      'A WordPress rebuild for a 24/7 premium gym in Melbourne, focused on member conversion: class timetables, facility info, and membership details on one surface. Built by Pixdyne.',
    img: '',
    cardSize: 'small'
  },
  {
    id: '14',
    slug: 'gameology',
    name: 'Gameology',
    client: 'Gameology',
    category: 'E-commerce',
    services: ['Web Development'],
    stack: ['Custom e-commerce', 'Multi-thousand SKU', 'Real-time chat'],
    challenge:
      "Gameology is a gaming retail warehouse selling board games, trading cards, collectibles, and novelties — described as the largest gaming warehouse in Australia. The catalogue is the value, but it is also the navigation problem: a board game customer wants different filters and shelves than a TCG collector, and both want to browse without choking on irrelevant categories.",
    solution:
      "We built a fully responsive e-commerce site with category-segmented navigation per game type, so a board-game shopper and a trading-card collector both land in the right corner of the catalogue. A dynamic customer review system carries the trust signal that matters in a hobbyist market, and real-time chat support handles the long-tail product questions that hobbyists ask. The site scales to thousands of SKUs without the filters degrading.",
    shortDescription:
      'Custom e-commerce for the largest gaming warehouse in Australia — thousands of SKUs across board games, TCG, and collectibles.',
    seoTitle: 'Gameology — Australia\'s Largest Gaming Warehouse E-commerce',
    seoDescription:
      'Custom e-commerce site for Gameology, the largest gaming warehouse in Australia — thousands of SKUs, category-segmented browsing, real-time chat. Built by Pixdyne.',
    img: '',
    cardSize: 'wide'
  },
  {
    id: '15',
    slug: 'mustbuy',
    name: 'Mustbuy',
    client: 'Mustbuy',
    category: 'E-commerce',
    services: ['Web Development'],
    stack: ['E-commerce platform', 'Multi-category catalogue', 'Customer accounts'],
    challenge:
      "Mustbuy needed a conventional online retail surface — multi-category catalogue, customer accounts, cart, and checkout — that worked cleanly across desktop and mobile. Not every retailer needs custom infrastructure; sometimes a well-built standard storefront is exactly what fits the business.",
    solution:
      "We built the e-commerce site end-to-end: home, category browsing, product detail, user login, cart, and checkout, all on a responsive layout. The scope was deliberately conventional — we picked the platform that fits how the team will run it after launch, rather than over-engineering a storefront beyond what the operation needed.",
    shortDescription:
      'A clean, conventional multi-category e-commerce storefront — picked for fit, not for show.',
    seoTitle: 'Mustbuy — Multi-Category E-commerce Storefront',
    seoDescription:
      'A multi-category online retail storefront with customer accounts, cart, and checkout — built for the operation rather than over-engineered. Built by Pixdyne.',
    img: '',
    cardSize: 'small'
  },
  {
    id: '16',
    slug: 'bright-australia',
    name: 'Bright Australia',
    client: 'Bright Australia',
    category: 'Marketing Site',
    services: ['Web Development'],
    stack: ['WordPress', 'Mobile-first', 'Professional services'],
    challenge:
      "Bright Australia is a migration and education agency offering four core services — study programs, visa processing, appeals assistance, and partner visa sponsorship. Migration buyers are heavy researchers and check several agencies before they enquire, so the site has to make scope and credibility obvious in the first few seconds, on the phone.",
    solution:
      "We built the site on WordPress with the four services surfaced through separate dedicated tabs so a prospect lands on what they actually need rather than a generic services page. Mobile optimisation is the default rather than the afterthought — migration research happens on phones at any hour. The site exists to convert research traffic into enquiries cleanly.",
    shortDescription:
      'WordPress site for a migration and education agency — four services surfaced clearly, mobile-first.',
    seoTitle: 'Bright Australia — Migration & Education Agency Site',
    seoDescription:
      'A WordPress marketing site for an Australian migration and education agency — four services surfaced clearly, mobile-first for research-heavy buyers. Built by Pixdyne.',
    img: '',
    cardSize: 'small'
  },
  {
    id: '17',
    slug: 'jinshan-travel',
    name: 'Jinshan Travel',
    client: 'Jinshan Travel',
    category: 'Custom System',
    services: ['System Development'],
    stack: ['Custom travel platform', 'Customer accounts', 'Bookings + customisation'],
    challenge:
      "Jinshan Travel runs an 'I provide, your choice' customised-tour model rather than fixed package travel — every booking is partly bespoke, and customers come back to plan multiple trips over years. That stops being a checkout problem and starts being a long-term relationship problem: customer accounts, booking history, and personalisation matter more than the one-off cart flow off-the-shelf travel sites are built around.",
    solution:
      "We built a custom travel platform with personalised customer accounts so each traveller manages their own bookings and customisations over time. Top-menu information architecture surfaces both group tours and customised offerings clearly without forcing the customer through search. The architecture is built for the long-term relationship the business runs on, not for one-time transactions.",
    shortDescription:
      'Custom travel platform built for a customised-tour model — customer accounts, booking history, ongoing personalisation.',
    seoTitle: 'Jinshan Travel — Custom Booking Platform for Bespoke Tours',
    seoDescription:
      'A custom travel platform built for a customised-tour model. Customer accounts, booking history, and personalisation over years rather than one-off checkouts. Built by Pixdyne.',
    img: '',
    cardSize: 'wide'
  },
  {
    id: '18',
    slug: 'nutsmart',
    name: 'Nutsmart',
    client: 'Nutsmart',
    category: 'E-commerce',
    services: ['Web Development'],
    stack: ['E-commerce platform', 'Specialty foods catalogue', 'Store locator'],
    challenge:
      "Nutsmart sells nuts, dried fruits, beans, and grains out of Clayton, with a large catalogue that is visually similar — most categories look like piles of dried product on a shelf. Clear category architecture and product information have to do the work that hero photography can't.",
    solution:
      "We built the storefront with structured product categories — nuts, dried fruits, beans, grains — each backed by clean product information rather than image-led merchandising. Browsing, cart, and checkout work the way a customer expects, and the store location is surfaced so retail pickup is a real option, not a hidden footer link.",
    shortDescription:
      'E-commerce site for a Melbourne specialty-foods retailer — clear category architecture across nuts, dried fruits, beans, and grains.',
    seoTitle: 'Nutsmart — Specialty Foods E-commerce',
    seoDescription:
      'An e-commerce site for a Clayton specialty-foods retailer selling nuts, dried fruits, beans, and grains with clear category architecture. Built by Pixdyne.',
    img: '',
    cardSize: 'small'
  },
  {
    id: '19',
    slug: 'jkk-solution',
    name: 'JKK Solution',
    client: 'JKK Solution',
    category: 'Marketing Site',
    services: ['Web Development'],
    stack: ['WordPress', 'Loan calculator', 'Mortgage broking'],
    challenge:
      "JKK Solutions is a mortgage broker covering residential and commercial financing. Mortgage prospects calculate before they enquire — they want to know rates, repayments, and feasibility before talking to a broker. A site that makes them email for a quote loses them.",
    solution:
      "We built a WordPress marketing site with an interactive loan calculator wired into lead capture, so prospects can run scenarios themselves and surface qualified enquiries to the broker. Service categorisation with expandable descriptions makes the offer obvious, and a user-review section carries the credibility that mortgage shoppers look for before they commit to a conversation.",
    shortDescription:
      'WordPress marketing site for a mortgage broker with an interactive loan calculator wired into lead capture.',
    seoTitle: 'JKK Solution — Mortgage Broker Site + Loan Calculator',
    seoDescription:
      'WordPress marketing site for a residential and commercial mortgage broker with an interactive loan calculator wired into lead capture. Built by Pixdyne.',
    img: '',
    cardSize: 'small'
  },
  {
    id: '20',
    slug: 'wescape-holiday',
    name: 'WeScape Holiday',
    client: 'WeScape Holiday',
    category: 'Marketing Site',
    services: ['Web Development'],
    stack: ['WordPress', 'Bilingual (EN/中)', 'Lead capture'],
    challenge:
      "WeScape Holiday is a Melbourne travel agency that does planning, consulting, and organising — they don't sell off-the-shelf bookings. The audience is bilingual (English and Chinese), and the conversion event is a qualified consultation request, not a clicked-and-paid cart.",
    solution:
      "We built a bilingual WordPress site with one-click language switching and an online questionnaire that captures the trip context the consultants need to scope a brief. Both languages share the same editorial structure so neither audience feels like a translated afterthought. The questionnaire is the centre of the build — everything else is in service of getting it filled out.",
    shortDescription:
      'Bilingual WordPress site for a Melbourne travel consultancy — questionnaire-led lead capture for consultation requests.',
    seoTitle: 'WeScape Holiday — Bilingual Travel Consultancy Site',
    seoDescription:
      'A bilingual (EN/中) WordPress site for a Melbourne travel consultancy with questionnaire-led lead capture for consultation requests. Built by Pixdyne.',
    img: '',
    cardSize: 'small'
  },
  {
    id: '21',
    slug: 'into-solar',
    name: 'Into Solar',
    client: 'Into Solar',
    category: 'Marketing Site',
    services: ['Web Development'],
    stack: ['WordPress', 'Quote function', 'Lead capture'],
    challenge:
      "Into Solar is an Australian solar installer. Solar buyers research multiple installers and want a quote before they engage. The legacy site couldn't surface enquiries efficiently — qualified prospects bounced to competitors who made the next step obvious.",
    solution:
      "We did a digital refresh on WordPress and added a quote function that lets a prospect lodge a structured enquiry directly. The site explains the offer cleanly, and the quote flow gives the company a structured pipeline of enquiries instead of scattered emails the team has to manually sort.",
    shortDescription:
      'WordPress digital refresh for a solar installer with a structured quote function feeding the sales pipeline.',
    seoTitle: 'Into Solar — Solar Installer Site + Quote Function',
    seoDescription:
      'A WordPress digital refresh for an Australian solar installer with a structured quote function feeding qualified enquiries directly into the sales pipeline. Built by Pixdyne.',
    img: '',
    cardSize: 'small'
  },
  {
    id: '22',
    slug: 'tyee-group',
    name: 'TYEE Group',
    client: 'TYEE Group',
    category: 'Marketing Site',
    services: ['Web Development'],
    stack: ['WordPress', 'Bilingual (EN/中)', 'Project portfolio'],
    challenge:
      "TYEE Group operates in property development and project management, with foreign investors as a key audience. Investment decisions in this segment are made in Chinese as often as English — a single-language site quietly excludes half the audience and makes the company look like it can't address the market it's pitching.",
    solution:
      "We built a bilingual WordPress site (English / Chinese) with the project portfolio as the centrepiece. Foreign-investor positioning shapes the visual register — modern, dynamic, with credibility signals like project review elements surfaced up front rather than buried in the footer.",
    shortDescription:
      'Bilingual WordPress site for an Australian property developer addressing foreign-investor audiences.',
    seoTitle: 'TYEE Group — Bilingual Property Development Site',
    seoDescription:
      'A bilingual (EN/中) WordPress site for an Australian property developer addressing foreign-investor audiences — portfolio-led with credibility signals up front. Built by Pixdyne.',
    img: '',
    cardSize: 'small'
  },
  {
    id: '23',
    slug: 'aier-flowers',
    name: 'Aier Flowers',
    client: 'Aier Flowers',
    category: 'E-commerce',
    services: ['Web Development'],
    stack: ['E-commerce platform', 'Mobile-first', 'Buyer-show gallery'],
    challenge:
      "Aier Flowers is a Melbourne premium florist selling flower boxes, preserved arrangements, DIY kits, and city-wide delivery. Premium florist sales are visual and emotional — buyer-show photos and arrangement variety drive conversion more than feature lists, and the purchase often happens on a phone moments before someone's birthday.",
    solution:
      "We built the storefront with a 'buyer show' gallery so real customer photos sit next to the product range, working as live social proof rather than a static testimonial wall. Mobile optimisation is the default because florist purchases are impulse decisions made on phones. Clean aesthetic matches the premium positioning rather than burying the product under chrome.",
    shortDescription:
      'Mobile-first premium florist storefront with a buyer-show gallery for live social proof.',
    seoTitle: 'Aier Flowers — Melbourne Premium Florist E-commerce',
    seoDescription:
      'A mobile-first e-commerce storefront for a Melbourne premium florist — flower boxes, preserved arrangements, DIY kits, and a buyer-show gallery. Built by Pixdyne.',
    img: '',
    cardSize: 'small'
  },
  // ────────── Historical projects (formerly under Zeta Digital,
  //            attributed to Pixdyne per owner direction 2026-05-13) ──────────
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
