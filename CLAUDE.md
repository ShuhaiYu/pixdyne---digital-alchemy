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

- `metadataBase`, canonical, Open Graph, Twitter card
- `robots.txt` and `sitemap.xml` routes
- JSON-LD: `ProfessionalService`, `Service`, `CreativeWork`, `Article`, `BreadcrumbList`
- Skip-to-main-content link, `prefers-reduced-motion`, focus-visible outlines

**Known issues to fix as part of optimisation:**

- `verification.google` is still a placeholder string — owner has not connected Google Search Console.
- `lib/seo/schema.ts` references `https://pixdyne.com/logo.png`; the actual asset is `logo.jpeg` — broken reference.
- Schema description still reads "IT Services: Web, App, SEO, Support" — does not match the service architecture in Section 5.
- `areaServed` is currently `Country: Australia`; for Melbourne local SEO it should be more specific (`LocalBusiness` with `addressLocality: Melbourne` or a city array including Melbourne suburbs).
- No `LocalBusiness` schema — required for local SEO.
- Twitter / LinkedIn handles in schema (`@pixdyne`, `linkedin.com/company/pixdyne`) are unverified — confirm before publishing.

**Phase 2 SEO scope** (not yet started): Melbourne local SEO, GEO (generative engine optimisation), Google Business Profile, blog content programme.

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
- **TBD** — Top navigation menu structure.
- **TBD** — Owner-provided historical project list per category.
- **TBD** — Verified social handles for `sameAs` schema (@pixdyne, linkedin.com/company/pixdyne).
