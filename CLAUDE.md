# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Companion file: see [AGENTS.md](./AGENTS.md) for agent roles, brand voice rules, and handoff protocols.

---

## 1. Quick Reference

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Next.js linting
```

Path alias: `@/*` maps to project root (configured in `tsconfig.json`).

Package manager: **npm** (lockfile-pinned). The workspace convention is pnpm; this project predates that and stays on npm.

---

## 2. Project Context

This repository hosts the public marketing site for **Pixdyne** — a Melbourne-based IT services company — served at https://pixdyne.com.

The site exists to:

- Establish credibility for Pixdyne as a long-term technology partner for Melbourne SMBs.
- Surface the three service lines and one product line in a way that reads as honest and grounded, not boastful.
- Drive contact form submissions and inbound enquiries.

This is **not** a generic agency template. Every section serves the brand positioning in Section 3.

---

## 3. Brand Positioning

Pixdyne is a Melbourne-based IT services company that has operated since **2018**. Pixdyne positions itself as a **long-term technology partner**, not a one-off vendor.

**One-line summary** (use as the anchor for all copy):

> Pixdyne is a Melbourne-based long-term technology partner. Since 2018, we have grown alongside our clients — delivering web, custom systems, and ongoing operations, and bringing real AI capability into their businesses.

**Differentiation anchors:**

1. **Long-term partnership over one-off delivery.** We embed in our clients' business lines and grow with them.
2. **Proven evolution.** From WordPress and Shopify projects, to NetSuite deployments, to bespoke CRM systems and beyond.
3. **AI capability for our clients, not just for ourselves.** Our product OnlyPixAI is the public proof — we deliver AI products that end users actually touch.

**AI positioning (CRITICAL — easy to get wrong):**

- ❌ Do **not** write copy that says "we use AI to code faster", "AI-assisted development", "vibe-coding", or anything framing AI as our internal productivity tool.
- ✅ Do write copy that frames AI as a **deliverable for the client**: "We bring AI into your business," "AI capability your team can actually use."
- OnlyPixAI ([onlypixai.com](https://www.onlypixai.com/)) is the public proof of this positioning.

---

## 4. Target Audience

Primary audience: **Melbourne SMB decision-makers** — founders, ops managers, marketing leads at companies with roughly 5–200 staff.

Audience traits:

- Cost-aware but not cheap-seeking. Looking for trustworthy, long-term value.
- Often burned by previous vendors who built and left.
- Prefer a local team they can call, not an offshore agency.
- Sceptical of jargon and inflated metrics.

**Voice implications:**

- Plain, confident English. Not buzzword-heavy.
- Concrete examples and timelines over vague superlatives.
- Local reference points where genuinely useful (Melbourne, Victoria).
- Never inflate scale or claim experience we cannot back up.

---

## 5. Service Architecture

```
Pixdyne services
├── Web Development        Build-and-launch websites: design, develop, deploy.
├── System Development     ERP / CRM / custom internal systems / mobile apps (iOS, Android).
└── Operations             Bundleable post-launch services:
    ├── Managed IT         Hosting, SSL, monitoring, backups, incident response.
    ├── SEO & Content      Technical SEO, content production, GSC/GA4 reporting.
    └── DevOps             Ongoing iteration, bug fixes, integrations, feature work.

Product line
└── OnlyPixAI              https://www.onlypixai.com/ — Pixdyne's own AI product.
                            Demonstrates our capability to deliver AI to end users.
```

**Naming is fixed.** Do not rename services, do not introduce new top-level service lines without explicit owner approval.

**Operations** is sold à la carte (single service) or as a bundled retainer.

---

## 6. Content Constraints (HARD RULES)

These rules override any default agent behaviour. Violating them is a blocking quality issue.

| # | Rule | Rationale |
|---|------|-----------|
| 1 | Never publish team member names, photos, bios, or LinkedIn handles. | Owner has chosen not to expose individual identities; involves client and partner relationships. |
| 2 | Never publish specific client names or logos unless the owner has explicitly approved that client for publication in this session. | Client confidentiality. |
| 3 | Never invent delivery metrics (e.g. "150+ projects", "99% satisfaction", "24/7 support"). Use placeholders such as `<!-- TBD: real metrics from owner -->` instead. | Inflated stats erode trust and breach E-E-A-T. |
| 4 | Company history anchor is **2018**. Never imply earlier founding. | Factual constraint. |
| 5 | Service names are fixed: Web Development / System Development / Operations / OnlyPixAI. Do not paraphrase or split. | Brand consistency. |
| 6 | Geographic anchor is **Melbourne, Victoria, Australia**. Use local context where genuinely relevant. | Local SEO and customer fit. |
| 7 | AI positioning: AI is a capability we deliver to clients, not a tool we use internally for coding. Reject any copy that frames AI as our internal accelerator. | See Section 3. |
| 8 | When real content is missing, leave a visible placeholder (`<!-- TBD: ... -->` in code, "Coming soon" in UI) rather than fabricating. | Truthfulness. |
| 9 | **Audience framing.** Do not segment downward in user-facing copy. Banned: "for SMBs", "small business", "small and medium businesses", "Melbourne SMBs", any phrasing that targets by company size. Audience targeting (Melbourne SMBs) is internal positioning only — see Section 4. Use growth-narrative framing instead: "businesses we partner with", "ambitious teams", "growing companies", "from idea to operating system". Local presence ("Melbourne", "Australian") is fine when it serves proximity / accessibility, never size. | Stating "we serve small businesses" reads as a low-confidence positioning. The brand goal is partnership and growth, not segmentation by client size. |
| 10 | **Technical vocabulary in user-facing copy.** Default to vocabulary a non-technical business owner recognises. Use: WordPress, Shopify, Webflow, Squarespace, NetSuite, Salesforce, HubSpot, ERP, CRM, Node.js, iOS, Android, hosting, monitoring, SEO, analytics. Avoid (in user-facing copy): Next.js, React, Tailwind, GSAP, TypeScript, PostgreSQL, Sentry, Vercel, Cloudflare. Engineer-level vocabulary is fine in CLAUDE.md, code comments, and internal documentation. | Decision-makers shop on names they know. Engineer-only stack names register as noise to the audience. |
| 11 | **Template boilerplate residue.** This codebase started from an agency template that ships pre-populated with US-coded placeholders. Audit and remove every variant of (a)–(f) before any commit, and treat the canonical answer column as the only acceptable replacement. | Boilerplate residue looks plausible and ship-ready, which is exactly why it causes the most damage when wrong. Several variants were only caught after live preview during the May 2026 audit. |

#### Rule 11 detail — canonical replacements

| Pattern (banned) | Canonical replacement |
|------------------|----------------------|
| (a) Fake office / city tags ("SFO · NYC · LND", "Offices in N cities") | "Melbourne · Australia". Pixdyne is single-location. |
| (b) US legal entity suffixes ("Inc.", "LLC") | "Pixdyne · ABN 96 690 116 584". Pixdyne has no US incorporation. |
| (c) Non-Australian governing law in legal pages (e.g. California, Delaware, England & Wales) | State of Victoria, Australia, with non-exclusive jurisdiction in Victorian courts. |
| (d) Hardcoded copyright years (`© 2024`, `© 2025`) | `© {new Date().getFullYear()}`. Auto-updating, never rots. |
| (e) Multiple departmental email addresses (`privacy@`, `legal@`, `hello@`, `support@`) | Only `info@pixdyne.com` is published. Do not invent mailboxes. |
| (f) Fabricated industry coverage ("trusted by industry leaders across finance, tech, and healthcare") | Either omit, or describe what we actually deliver in plain prose. See rule 8 (placeholders preferred over fabrications). |

**Visible placeholders are preferred over fabricated content.** They are a feature, not a bug — they signal to the owner what still needs filling.

---

## 7. Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Next.js 16 (App Router) | React Server Components available. |
| UI runtime | React 19 | Many sections currently `'use client'`. Review before adding more. |
| Language | TypeScript 5.8 | Strict mode in `tsconfig.json`. |
| Styling | Tailwind CSS 4 | Brand tokens defined via `@theme` block in `app/globals.css`. Do not redefine brand tokens elsewhere. |
| Animation | GSAP 3 + `@gsap/react` + ScrollTrigger | Primary engine. `motion` is also installed but should not be expanded — consolidate on GSAP. |
| 3D / WebGL | `ogl` | Currently unused or near-unused — flag for removal if not needed. |
| Icons | `lucide-react` | |
| Component utilities | shadcn/ui (`new-york`), `class-variance-authority`, `clsx`, `tailwind-merge` | |
| Package manager | npm | Workspace convention is pnpm; this project stays on npm. |
| Deployment | Vercel | Region: `syd1`. |

---

## 8. Visual System

**Palette** (defined in `app/globals.css` `@theme` block; JS mirrors in `lib/brand.ts`):

- Brand yellow / dark gold: `#C8962A` — primary accent (warm gold, not generic yellow)
- Brand black: `#0B0A08` — warm near-black
- Brand surface: `#151311`
- Brand white: `#F5F2ED` — warm off-white
- Brand text: `#E8E4DD` — warm cream
- Brand muted: `#8A847B`

**Typography:**

- `Playfair Display` — display / headings (serif, often italic)
- `Space Grotesk` — body / UI (sans-serif)

**Animation language:**

- StickySection layered scroll with explicit z-index ordering (10, 15, 20, 30, 40, 45, 48, 50).
- Transition types: `curtain`, `parallax`, `mask-diagonal`, `pixel-glitch`, `none`.
- Services section uses GSAP horizontal pin + snap (intentional break from the vertical sticky pattern).
- Hero uses character-level GSAP stagger.
- `prefers-reduced-motion` is respected globally. Keep it that way.

**Style direction:**

Warm dark editorial — gold-on-warm-black with serif italic headlines. **Avoid template-y agency styling** (centred hero with gradient blob, three-column "services" grid, generic gradients). Maintain the existing intentional layering and rhythm.

---

## 9. Sticky Scroll System

The homepage uses a stacked sticky section architecture. Each `StickySection` applies `position: sticky; top: 0` with explicit z-index ordering, so sections layer on top of each other as the user scrolls.

- `StickySection` (`components/layout/StickySection.tsx`): wrapper with z-index, transition type, `fitContent` flag, optional peek background.
- Each section component in `components/sections/` is self-contained.
- Z-index values must increment to maintain correct layering (current scheme: 10, 15, 20, 30, 40, 45, 48, 50).
- The `ServicesSection` is **not** wrapped in `StickySection` — it manages its own GSAP `ScrollTrigger` pin.

---

## 10. Information Architecture

Current routes:

```
/                        Homepage (sticky-scroll, 9 sections)
/services/[slug]         Service detail (dynamic; no /services index page yet)
/work                    Case studies index
/work/[slug]             Case study detail
/blog                    Blog index
/blog/[slug]             Blog post
/legal/privacy
/legal/terms
/api/contact             Contact form endpoint
/robots.ts, /sitemap.ts
```

**Component organisation:**

- `components/layout/` — layout primitives (Navigation, StickySection)
- `components/sections/` — full-page sections (Hero, Services, Team, etc.)
- `components/*.tsx` (root) — visual / interactive primitives, several from React Bits registry: Aurora, BlurText, DecryptedText, Masonry, MasonryCard, ProfileCard, SplitText, TiltedCard, BentoCard, SpotlightCard, LogoLoop, CountUp, AnimatedContent. Audit usage before adding more.

**Data layer** in `lib/data/`:

- `services.ts` — service offerings (currently misaligned with Section 5; pending rewrite)
- `case-studies.ts` — portfolio items (placeholder content; pending owner-provided list)
- `team.ts` — team members (must be emptied or replaced with anonymised content per Section 6)
- `blog.ts` — blog posts (placeholder content; pending blog content plan)

Centralised types live in `types/index.ts`.

**Pending decisions** (do not implement until explicitly confirmed):

- `<!-- TBD: top navigation menu items — owner has not finalised -->`
- `<!-- TBD: OnlyPixAI presentation on homepage (section vs. dedicated page) — owner has not finalised -->`
- `<!-- TBD: /about page — owner has not finalised -->`
- `<!-- TBD: Sanity CMS integration — workspace convention is to share Sanity studio at pixdyne-dashboard, currently not wired up here -->`

---

## 11. SEO Baseline

**Currently in place:**

- `metadataBase`, per-page canonical, Open Graph, Twitter card
- `robots.txt` and `sitemap.xml` routes (dynamic + static)
- JSON-LD: `ProfessionalService` (root, covers `LocalBusiness` subtype with full address + ABN + areaServed Melbourne/VIC/AU), `WebSite`, `Service`, `CreativeWork`, `Article`, `BreadcrumbList`
- Skip-to-main-content link, `prefers-reduced-motion`, focus-visible outlines
- Australian English copy, AU locale OG, `en_AU` declared

**Remaining gaps** (these are real, not placeholders):

- Google Search Console verification token is **not** yet wired — `verification.google` is commented out as TBD in `app/layout.tsx`. Set it once the property is verified.
- Per-service 1200×630 landscape OG images are not produced. Service detail pages fall back to the 1080×1080 square. Once landscape variants exist, upgrade Twitter card to `summary_large_image` per service.
- `sameAs` (X / LinkedIn) is intentionally absent. Add only after the handles are verified to exist.
- Google Business Profile is not claimed. Required for Local SEO — see §14.9.
- FAQ content per service is missing. Once written, emit `FAQPage` schema (slot reserved in `lib/seo/schema.ts`).
- `AggregateRating` is intentionally absent. Do not add until at least 5 verifiable reviews exist.

**Phase 2 SEO scope** (active): Melbourne local SEO citations, GEO (generative engine optimisation), Google Business Profile claim, blog content programme. Governance rules in §14.

---

## 12. Workflow

For any non-trivial change, follow this protocol:

1. **Plan first.** Restate the change, identify affected files, surface risks. Defer to the owner before touching code if the change spans multiple sections or is content-heavy.
2. **Respect content constraints.** See Section 6.
3. **Use the right agent.** See [AGENTS.md](./AGENTS.md). Content goes through `content-agent`. SEO and schema work goes through `seo-agent`. Code goes through `frontend-agent`. Every commit must pass `truth-auditor` review.
4. **Conventional Commits.** Follow the format in workspace `CLAUDE.md`.
5. **Build and lint must pass** before any commit.

---

## 13. Decisions Log

> Append decisions here as they are made. Remove obsolete entries when superseded.

- **2026-05-08** — Brand positioning, target audience, service architecture, and content constraints established (this document).
- **2026-05-08** — Truth Auditor agent role accepted.
- **2026-05-08** — Team identities, client names, and partner names: not to be published.
- **2026-05-08** — AI positioning anchored as "capability for clients", not "internal coding tool". OnlyPixAI is the public proof.
- **2026-05-08** — Added Section 6 rules 9 (audience framing — never target downward by size in copy) and 10 (technical vocabulary — business-owner names only in user-facing copy).
- **2026-05-08** — Office address: **294 Clayton Rd, Clayton VIC 3169** (replaces previous Truganina address).
- **2026-05-08** — OnlyPixAI confirmed as a Unified AI API Gateway product. To be presented as the flagship product on the homepage in a dedicated section, placed mid-flow (not above the fold).
- **2026-05-08** — Case study taxonomy direction: e-commerce sites, company / marketing sites, internal systems. Specific cases pending owner list.
- **2026-05-09** — Added Section 6 rule 11 (template boilerplate residue audit) after live preview surfaced six categories of US-coded placeholders (fake offices "SFO · NYC · LND", "Pixdyne Inc." entity suffix, California governing law, hardcoded © 2024, fake departmental emails like privacy@ / legal@, fabricated "trusted by industry leaders" claims). Canonical replacements documented in rule 11 detail table.
- **2026-05-09** — Published business identity: **Pixdyne · ABN 96 690 116 584**. Single contact email: **info@pixdyne.com**. Locality anchor: **Melbourne · Australia**. Governing law: **State of Victoria**. These are the only acceptable values for the corresponding surfaces.
- **2026-05-10** — Canonical brand spellings (recorded after the `pxidyne` typo reached commit c8a0d16 in a directory name, code comment, and commit message before the owner caught it). Verify the exact spelling on every new path, filename, identifier, or copy string before commit: **Pixdyne** (P-I-X-D-Y-N-E, six letters; not "Pxidyne", "Pixdync", "Pixdyn"); **OnlyPixAI** (single word, capital P, capital A, capital I; not "Only Pix AI", "OnlyPixAi", "OnlyPxAI"). When introducing user-supplied terms, repeat them back before persisting if there is any chance of misspelling.
- **TBD** — Top navigation menu structure.
- **TBD** — Owner-provided historical project list per category.
- **TBD** — Verified social handles for `sameAs` schema (@pixdyne, linkedin.com/company/pixdyne).
- **2026-05-13** — SEO governance formalised in Section 14. Section 11 refreshed to current state (most of the previously-listed "known issues" were already resolved between 2026-05-08 and 2026-05-10). Long-term rules now cover NAP consistency, per-page metadata template, mandatory schema coverage by route, URL conventions, heading hierarchy, image SEO, keyword framework (target-customer aligned), performance budgets, local SEO checklist, GEO rules, blog content production, and audit cadence.

---

## 14. SEO Governance

SEO is a brand asset for this site, not a finishing layer. Every public page, schema block, and copy decision must respect these rules. The truth-auditor enforces them; the seo-agent owns them.

### 14.1 NAP Consistency (single source of truth)

These four values are the canonical business identity. They appear in exactly four surfaces and must match byte-for-byte:

- **Name:** Pixdyne
- **Address:** 294 Clayton Rd, Clayton VIC 3169, Australia
- **Email:** info@pixdyne.com
- **ABN:** 96 690 116 584

| Surface | File |
|---|---|
| Organisation schema | `lib/seo/schema.ts` → `generateOrganizationSchema()` |
| Privacy policy | `app/legal/privacy/page.tsx` |
| Terms of service | `app/legal/terms/page.tsx` |
| Footer (when one exists) | TBD |

If any field changes, update **all** surfaces in a single commit. No NAP value may be hardcoded outside these four files.

### 14.2 Per-Page Metadata Template (mandatory)

Every new `page.tsx` (static route or `generateMetadata` for dynamic) must export a `Metadata` object with **all** of:

- `title` — ≤ 60 chars. Pattern: `"{Page intent} | Pixdyne"` or `"{Page intent} — {Qualifier}"`. The page's primary cluster keyword (see §14.7) must appear in the title.
- `description` — ≤ 155 chars. One sentence: value proposition + location anchor + canonical service name where applicable.
- `alternates.canonical` — absolute URL `https://pixdyne.com/...`, no trailing slash except root, lowercase.
- `openGraph` — `title`, `description`, `url`, at least one `images` entry. `locale: 'en_AU'` is inherited from root layout.
- `twitter.card` — `'summary_large_image'` when a 1200×630 landscape OG image exists for the page; `'summary'` when only the 1080×1080 square fallback is in use.

Missing any of the above is a truth-auditor failure.

### 14.3 Required Schema by Route

| Route pattern | Required schema | Optional schema |
|---|---|---|
| `/` (root layout) | `ProfessionalService` (LocalBusiness subtype) + `WebSite` | — |
| `/services/[slug]` | `Service` + `BreadcrumbList` (`Product` when `tier === 'product'`) | `FAQPage` when FAQ block exists |
| `/work/[slug]` | `CreativeWork` + `BreadcrumbList` | — |
| `/blog/[slug]` | `Article` + `BreadcrumbList` | — |
| `/blog`, `/work` | (inherits root) | `CollectionPage` / `ItemList` |
| `/legal/*` | (inherits root) | — |

**Never** invent: `aggregateRating`, `review`, `sameAs` (until handles verified), `priceRange` (until owner confirms), `openingHoursSpecification` (until owner confirms).

### 14.4 URL Structure Rules

- kebab-case only — `/services/web-development`, never `/Services/WebDevelopment`
- No trailing slashes except the root `/`
- No query strings inside canonical URLs (filters belong on client-side state, not in canonicals)
- Lowercase throughout
- Stable slugs — once a slug is published, do not rename without a 301 plan

### 14.5 Heading Hierarchy

- Exactly **one** `<h1>` per page, matching the page intent and containing the primary cluster keyword (§14.7) where natural
- `<h2>` for section heads, `<h3>` for subsections — do not skip levels
- Never use heading tags for visual size — use semantic tags styled with CSS

### 14.6 Image SEO

- Use `next/image` (or hand-rolled `<img>` with explicit `width` + `height`) — every image declares dimensions to prevent CLS
- Informative images: descriptive `alt` text (concrete, not "image of …")
- Decorative images: `alt=""`
- Above-the-fold hero image only: `priority` + `fetchPriority="high"`
- Below-the-fold images: implicit lazy-load via `next/image`
- Prefer AVIF / WebP with fallbacks
- Do not ship source images > 2× rendered size

### 14.7 Keyword Framework

Anchor each page to **one** primary cluster keyword. Stuffing is banned.

**Primary clusters** (Melbourne + service intent — the audience actually types these):

- "Melbourne web development" · "web development Melbourne" · "Melbourne web designer"
- "Melbourne IT services" · "Melbourne technology partner" · "long-term technology partner"
- "custom software Melbourne" · "custom system Melbourne" · "bespoke software Australia"
- "ERP implementation Melbourne" · "CRM development Melbourne"
- "managed IT Melbourne" · "ongoing SEO Melbourne"

**Long-tail (platform + location):**

- "Shopify partner Melbourne" · "Shopify developer Melbourne"
- "WordPress developer Melbourne" · "Webflow developer Melbourne"
- "NetSuite consultant Australia" · "NetSuite implementation Melbourne"
- "Salesforce consultant Melbourne" · "HubSpot Melbourne"
- "iOS app developer Melbourne" · "Android app developer Melbourne"

**GEO anchors** (use sparingly, only where genuine):

- "Melbourne" · "Victoria" · "Australia" · "Clayton" · "southeast Melbourne" · "Australian"

**Per service detail page mandate:** the canonical service name (§5) must appear in title + H1 + first paragraph. The primary cluster keyword for that service must appear in title + at least one H2 or first paragraph.

**Forbidden in user-facing copy** (per §6 rules 9 and 10):

- Any size-based audience targeting: "SMB", "small business", "small and medium businesses", "small to medium"
- Engineer-only stack names: Next.js, React, Tailwind, GSAP, TypeScript, PostgreSQL, Sentry, Vercel, Cloudflare

**Forbidden everywhere (including schema):**

- "best", "premier", "leading", "world-class", "industry-leading", "trusted by industry leaders"
- "cutting-edge", "state-of-the-art", "next-generation", "revolutionary"

### 14.8 Performance Budgets

| Metric | Target | Action when exceeded |
|---|---|---|
| LCP | < 2.5s | Audit hero image weight, preload, font display |
| INP | < 200ms | Profile main thread, defer non-critical JS |
| CLS | < 0.1 | Reserve image / video dimensions, prevent late shifts |
| Total JS (homepage, gz) | < 200 KB | GSAP is heavy — every new animation must justify weight or replace existing JS |
| Total CSS (homepage, gz) | < 40 KB | — |
| FCP | < 1.5s | — |

Slightly relaxed JS budget vs. workspace web/performance.md because this site is animation-led. Animations remain on compositor-friendly properties only (`transform`, `opacity`, `filter`).

### 14.9 Local SEO (Melbourne)

**One-time setup checklist:**

- [ ] Google Business Profile claimed at 294 Clayton Rd, Clayton VIC 3169 (TBD — owner)
- [ ] Apple Business Connect listing claimed (TBD — owner)
- [ ] Bing Places for Business listing claimed (TBD — owner)
- [ ] NAP cited in at least 5 reputable Australian directories. Candidate list: yellowpages.com.au · truelocal.com.au · hotfrog.com.au · startlocal.com.au · localsearch.com.au · auinfo.com
- [ ] Australian Business Register link confirmed (ABN 96 690 116 584)

**Ongoing rules:**

- Schema-level `LocalBusiness` signals are covered by `ProfessionalService` (a subtype). Adding `geo`, `openingHoursSpecification`, `priceRange`, or `currenciesAccepted` requires owner sign-off — do not invent.
- Encourage genuine Google reviews. Never fabricate. Do not emit `aggregateRating` until at least 5 verifiable reviews exist.
- For city-targeted blog posts, mention the relevant Melbourne anchor in the H1 or first paragraph (e.g. "Shopify development for Melbourne brands"), never as keyword stuffing.

### 14.10 GEO (Generative Engine Optimisation)

AI search engines (Perplexity, ChatGPT search, Gemini) and LLM crawlers favour clear factual statements over animations and marketing fluff. Optimise for being **quotable**.

- About / Services / OnlyPixAI surfaces must include one paragraph of plain prose answering: who Pixdyne is, where, since when, what we do.
- Service detail pages must answer "what is X and what is included" in plain language within the first paragraph (no marketing preamble).
- FAQ blocks (when written) must use `FAQPage` schema and remain factually answerable from page text alone.
- First paint must include the answer. Do not hide core facts behind animation entrances or scroll-triggered reveals.
- Sentences should be short, parseable, declarative. Avoid pronouns that depend on context outside the page.

### 14.11 Content Production (Blog)

- Byline is `Pixdyne Team` (per §6 rule 1 — no individual identities).
- Every post must have a clear, opinionated angle. No "X tips for Y" generic listicles.
- Each post must support at least one primary cluster keyword (§14.7) — title, H1, and at least one H2.
- Internal links: every post links to at least one relevant service detail or another related post.
- Frequency: monthly cadence target once the topic plan is approved (TBD).
- Cite sources where claims are non-obvious. Apply workspace data-integrity principles when the post makes safety-critical or factual claims (see workspace `CLAUDE.md`).

### 14.12 Audit Cadence

| Cadence | Action |
|---|---|
| Per commit | seo-agent + truth-auditor checklists (AGENTS.md §2.2, §2.4) |
| Weekly | GSC error sweep, sitemap freshness, broken-link sweep on top routes |
| Monthly | CWV check across top routes, keyword ranking pulse, GBP review (once claimed) |
| Quarterly | Full schema audit via Google Rich Results Test, competitor positioning review, copy audit against §14.7 |

### 14.13 Open SEO Items (TBD)

- `<!-- TBD: Google Search Console verification token — set `verification.google` in app/layout.tsx once issued. Do not ship the placeholder string. -->`
- `<!-- TBD: Verified `sameAs` social handles — confirm @pixdyne (X) and linkedin.com/company/pixdyne exist before adding to schema -->`
- `<!-- TBD: Per-service 1200×630 landscape OG images at /og/services/{slug}.jpg — currently fall back to /og-image.png square -->`
- `<!-- TBD: Per-blog 1200×630 OG images at /og/blog/{slug}.jpg — referenced in blog post metadata but not yet produced -->`
- `<!-- TBD: Google Business Profile listing for 294 Clayton Rd, Clayton VIC 3169 -->`
- `<!-- TBD: FAQ content per service detail page — unlocks FAQPage schema -->`
- `<!-- TBD: Real client review acquisition strategy — minimum 5 verified reviews before any AggregateRating schema -->`
- `<!-- TBD: Blog topic plan and editorial calendar — drives §14.11 cadence -->`
