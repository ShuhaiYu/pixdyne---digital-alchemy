# AGENTS.md

> Project-level agent roster, brand voice rules, and handoff protocols for the Pixdyne marketing site.
>
> Companion: [`CLAUDE.md`](./CLAUDE.md) — project context, positioning, content constraints, tech stack.
>
> Workspace counterpart: [`../AGENTS.md`](../AGENTS.md) defines the 5-role pipeline (Analyst / Designer / Developer / QA / Orchestrator) for **building new sites** and **adding features**. This file applies to a **different problem**: optimising an existing live marketing site under strict brand and truthfulness rules. Where the two conflict, this file wins for work in this repository.

---

## 1. Purpose

This site is a credibility surface for an IT services company that targets Melbourne SMBs. Mistakes in voice, content, or facts directly damage the business. This file defines:

- Which agent does what.
- The voice every agent must use when writing user-facing copy.
- The hard boundaries no agent crosses without owner approval.
- The handoff rules between agents (e.g. truth review before commit).

---

## 2. Agent Roster

Four roles are defined for this project. They map to existing skills/agents in `~/.claude/` where applicable; otherwise they are responsibilities to assign to a general-purpose agent.

### 2.1 content-agent

**Owns:** All user-facing English copy.

- Homepage section copy
- Service detail page copy
- Blog posts
- Microcopy (buttons, form labels, error messages, navigation labels)
- SEO meta titles and descriptions

**Must always:**

- Apply Brand Voice Rules (Section 3).
- Honour Content Constraints (`CLAUDE.md` Section 6).
- Leave visible placeholders when real content is missing rather than fabricating.

**Must never:**

- Publish names, photos, or bios of team members.
- Publish specific client or partner names without owner-provided approval in the same session.
- Invent metrics, project counts, or satisfaction percentages.
- Reframe the AI positioning (see `CLAUDE.md` Section 3).

**Ask the owner when:**

- A section needs a real client logo or case study.
- A copy decision contradicts an existing visible placeholder.
- The brand voice or service naming would need to change to fit the surface.

---

### 2.2 seo-agent

**Owns:**

- JSON-LD schema (`lib/seo/schema.ts`)
- Metadata in `app/**/page.tsx` (static + `generateMetadata` for dynamic)
- `robots.ts`, `sitemap.ts`
- Local SEO assets (`LocalBusiness` signals via `ProfessionalService` subtype, area served, Google Business Profile preparation)
- GEO (generative engine optimisation) — making content discoverable and quotable for AI search engines
- Keyword framework adherence (CLAUDE.md §14.7)
- Image SEO (alt text, dimensions, format choice)
- Performance budget enforcement on SEO-critical pages (CLAUDE.md §14.8)

**Must always:**

- Use real content. If schema needs a logo URL, point at an actual file. If it needs an address, use the verified one.
- Anchor location to Melbourne, VIC, AU.
- Match schema descriptions to the live service architecture in `CLAUDE.md` §5.
- Apply the per-page metadata template (CLAUDE.md §14.2): `title` ≤ 60 chars containing primary cluster keyword, `description` ≤ 155 chars, `alternates.canonical` absolute URL, `openGraph` block with at least one image, explicit `twitter.card`.
- Confirm every new public route has a `sitemap.ts` entry with an accurate `lastModified`.
- Confirm every new public route emits the required schema for its route type (CLAUDE.md §14.3).
- Read NAP fields only from `lib/seo/schema.ts` and the legal pages — never duplicate Pixdyne's address, ABN, or email as inline literals elsewhere.
- Anchor every page to one primary cluster keyword from CLAUDE.md §14.7. The keyword appears in `title` + H1 + first paragraph.
- For service detail pages, emit `Service` schema when `tier === 'service'` and `Product` schema when `tier === 'product'` (OnlyPixAI is the only `tier === 'product'` entry).

**Must never:**

- Invent reviews, ratings, `aggregateRating`, or aggregate scores in schema.
- Add `sameAs` links to social handles that have not been verified to exist.
- Use the placeholder Google Search Console verification string in production. Leave `verification.google` commented out until the real token is issued.
- Emit `openingHoursSpecification`, `priceRange`, or `currenciesAccepted` without owner confirmation.
- Use engineer-only tech vocabulary (Next.js, React, Tailwind, GSAP, TypeScript, PostgreSQL, Sentry, Vercel, Cloudflare) in any user-facing string the SEO surfaces touch — page titles, descriptions, schema `description`, OG titles. Use platform names the audience knows (WordPress, Shopify, NetSuite, etc.) per CLAUDE.md §6 rule 10.
- Use downward audience segmentation ("for SMBs", "small business") in any SEO surface. Use growth framing per CLAUDE.md §6 rule 9.
- Skip the heading-hierarchy rule: one `<h1>` per page, no level skips (CLAUDE.md §14.5).
- Ship an image without explicit `width` + `height` and an `alt` value (descriptive for informative images, empty string for decorative).

**SEO-agent per-commit checklist** (block commit if any item fails):

- [ ] Every modified `page.tsx` exports complete metadata (title, description, canonical, openGraph, twitter)
- [ ] Every new route has a `sitemap.ts` entry
- [ ] Primary cluster keyword appears in title + H1 + first paragraph
- [ ] NAP fields read from the single source of truth (no inline duplicates)
- [ ] Required schema for the route type is emitted (CLAUDE.md §14.3)
- [ ] No invented reviews / ratings / unverified `sameAs`
- [ ] No engineer-only tech vocabulary in SEO surfaces
- [ ] No downward audience segmentation in SEO surfaces
- [ ] Exactly one `<h1>` per page
- [ ] All `<img>` and `<Image>` instances have `width`, `height`, and `alt`

**Ask the owner when:**

- A schema field requires data that is not in `CLAUDE.md` or `lib/data/`.
- Multiple `LocalBusiness` types fit the entity (e.g. `ProfessionalService` vs. `LocalBusiness` vs. `Organization`).
- A new page targets a keyword cluster not listed in CLAUDE.md §14.7.
- A page would need to add `aggregateRating`, `priceRange`, `openingHoursSpecification`, or `sameAs`.

---

### 2.3 frontend-agent

**Owns:**

- All `.tsx` / `.ts` / `.css` code outside `lib/data/` and `lib/seo/`.
- Components, layouts, animations, styles.
- Performance optimisation, bundle size, Core Web Vitals.

**Must always:**

- Use brand tokens from `app/globals.css` `@theme` block — do not introduce ad-hoc colours.
- Use `cn()` from `lib/utils.ts` for conditional classes.
- Respect `prefers-reduced-motion`.
- Match the existing visual language (warm dark editorial, gold accent, serif italic headlines).
- Animate compositor-friendly properties (`transform`, `opacity`) — not layout-bound ones.

**Must never:**

- Add a second animation library — consolidate on GSAP.
- Introduce dark mode or theme switching unless the owner explicitly asks.
- Change brand tokens or fonts without owner approval.
- Add a new `'use client'` boundary when a Server Component would suffice.

**Ask the owner when:**

- A change requires removing or reordering homepage sections.
- A new dependency is needed (size > ~5 KB gzipped).
- A new top-level route is being added.

---

### 2.4 truth-auditor

**Owns:**

- Pre-commit review of any diff that touches user-facing strings, schema, metadata, alt text, or `lib/data/*`.

**Auditor checklist (block commit if any item fails):**

Existing rules:

- [ ] No invented metrics in copy or schema (e.g. `\d+\+ projects`, `\d+% satisfaction`, `24/7 support` without source).
- [ ] No personal names introduced in `lib/data/team.ts`, copy, or alt text — except as visible TBD placeholders.
- [ ] No specific client / partner names introduced unless explicitly approved this session.
- [ ] No company-history claim that contradicts the 2018 anchor.
- [ ] No AI positioning that frames AI as Pixdyne's internal coding tool.
- [ ] Service names match the canonical four: Web Development, System Development, Operations, OnlyPixAI.
- [ ] Geographic claims anchor to Melbourne, VIC, AU where applicable.
- [ ] No broken asset references (e.g. `logo.png` when only `logo.jpeg` exists).
- [ ] No live placeholder strings shipped silently (e.g. `google-site-verification-code`, raw `<!-- TBD -->` rendered in HTML).
- [ ] No "for SMBs" / "small business" framing in user-facing copy (CLAUDE.md rule 9).
- [ ] No engineer-only tech names in user-facing copy (Next.js, React, Tailwind, GSAP, TypeScript, PostgreSQL, Sentry, Vercel, Cloudflare) — CLAUDE.md rule 10.

Boilerplate residue (CLAUDE.md rule 11):

- [ ] No fake office / city tags ("SFO · NYC · LND", "Offices in N cities", or any city other than Melbourne).
- [ ] No US legal entity suffixes ("Inc.", "LLC", "Corp."). Identity string is "Pixdyne · ABN 96 690 116 584".
- [ ] Legal pages: governing law is the State of Victoria, Australia. No California, Delaware, England & Wales, or any non-Australian jurisdiction.
- [ ] No hardcoded copyright years (`© 2024`, `© 2025`). Use `{new Date().getFullYear()}`.
- [ ] Single-email policy: only `info@pixdyne.com` appears in user-facing copy. No `privacy@`, `legal@`, `hello@`, `support@`, or any departmental mailbox.
- [ ] No fabricated industry coverage statements ("trusted by industry leaders across finance, tech, and healthcare", "powering digital infrastructure for X across Y").
- [ ] Canonical brand spellings verified: **Pixdyne** (six letters, P-I-X-D-Y-N-E; never "Pxidyne", "Pixdync"). **OnlyPixAI** (one word, P-A-I capitals). Any new directory name, file path, identifier, or copy string containing the brand name has been spell-checked before commit. See CLAUDE.md decisions log entry for 2026-05-10.

SEO surfaces (CLAUDE.md §14):

- [ ] Every modified `page.tsx` has `title` (≤ 60 chars), `description` (≤ 155 chars), `alternates.canonical`, `openGraph`, and explicit `twitter.card`.
- [ ] Primary cluster keyword from §14.7 appears in title + H1 + first paragraph of the page.
- [ ] NAP fields (Pixdyne, 294 Clayton Rd Clayton VIC 3169, info@pixdyne.com, ABN 96 690 116 584) are not duplicated as inline literals — they live in `lib/seo/schema.ts` and the legal pages only.
- [ ] Required schema for the route type is emitted (root: `ProfessionalService` + `WebSite`; service: `Service`/`Product` + `BreadcrumbList`; work: `CreativeWork` + `BreadcrumbList`; blog: `Article` + `BreadcrumbList`).
- [ ] No invented `aggregateRating`, `review`, `priceRange`, `openingHoursSpecification`, or unverified `sameAs`.
- [ ] No placeholder `verification.google` string shipped — leave commented out until real token is issued.
- [ ] Exactly one `<h1>` per page, no skipped heading levels.
- [ ] All `<img>` / `<Image>` have explicit `width`, `height`, and `alt` (descriptive or `alt=""`).
- [ ] New public routes are added to `app/sitemap.ts`.

If the audit fails, do **not** silently fix and commit. Report the violations and let the owner decide how to handle each.

---

## 3. Brand Voice Rules (basic version — open for revision)

### 3.1 Tone

- **Confident, not boastful.** State what we do and what we have done. Do not claim "best", "leading", "premier", "world-class".
- **Plain English over jargon.** Prefer "we host and monitor your site" over "we provide enterprise-grade observability solutions".
- **Specific over vague.** "Since 2018" beats "many years". "WordPress, Shopify, NetSuite, custom CRM" beats "any tech stack".
- **Local without being parochial.** Reference Melbourne / Victoria where it adds trust; do not stuff "Melbourne" into every sentence.

### 3.2 Voice samples

**Good:**

> Pixdyne has built and operated business systems since 2018 — from WordPress storefronts to NetSuite rollouts and bespoke CRMs.

**Good:**

> When the project ships, we don't disappear. Operations covers hosting, monitoring, SEO, and ongoing development — pick what you need.

**Good (audience framing — growth narrative, not size segmentation):**

> The companies we work with usually start with a website and end up running NetSuite, a custom CRM, and a handful of internal tools. We grow into that with them.

**Bad (boastful):**

> Pixdyne is Melbourne's premier digital alchemy studio, transforming visions into world-class experiences.

**Bad (jargon):**

> We leverage cutting-edge AI-driven solutions to synergise cross-functional digital initiatives.

**Bad (AI positioning wrong):**

> Our AI-augmented engineers ship features 5× faster than traditional teams.

**Bad (downward audience segmentation — CLAUDE.md §6 rule 9):**

> Pixdyne is the technology partner for Melbourne small and medium businesses since 2018.

**Bad (engineer-only tech vocabulary — CLAUDE.md §6 rule 10):**

> Our stack: Next.js 16, React Server Components, Tailwind 4, Vercel edge runtime, PostgreSQL with Prisma, Sentry monitoring, GSAP for motion.

**Bad (boilerplate residue — CLAUDE.md §6 rule 11). Six template-shaped patterns to reject on sight:**

> Pixdyne Inc. · SFO · NYC · LND.
> © 2024 Pixdyne. Trusted by industry leaders across finance, tech, and healthcare.
> For privacy enquiries, email privacy@pixdyne.com. These terms are governed by the State of California.

### 3.3 Word lists

**Use:**

- Long-term partner / partnership
- Built and operated / build and operate
- Local team / Melbourne team / Australian
- Since 2018
- Real client outcomes
- AI capability for your business
- Grow with us / grow alongside / from idea to operating system
- Ambitious teams / growing companies / the businesses we partner with
- Tech vocabulary your audience knows: WordPress, Shopify, Webflow, Squarespace, NetSuite, Salesforce, HubSpot, ERP, CRM, Node.js, iOS, Android, hosting, monitoring, SEO, analytics
- Web Development / System Development / Operations / OnlyPixAI (canonical names)

**Avoid:**

- "World-class", "premier", "leading", "best-in-class", "industry-leading"
- "Digital alchemy" leaned on as a value proposition (it is a wordmark, not a benefit)
- "Cutting-edge", "state-of-the-art", "next-generation", "revolutionary"
- "Synergise", "leverage" (verb form), "ideate", "ecosystem"
- "AI-powered coding", "AI-augmented development", "vibe coding"
- "24/7" claims unless we have actual 24/7 support
- "100% satisfaction", "trusted by industry leaders", "millions of users" (unless true and provable)
- "We are passionate about..." (filler)
- **Downward audience segmentation (CLAUDE.md §6 rule 9):** "for SMBs", "small business", "small and medium businesses", "Melbourne SMBs", "small to medium", any size-based targeting language
- **Engineer-only tech names in user-facing copy (CLAUDE.md §6 rule 10):** Next.js, React, Tailwind, GSAP, TypeScript, PostgreSQL, Sentry, Vercel, Cloudflare. (Fine inside CLAUDE.md, code comments, internal docs.)

### 3.4 Punctuation and formatting

- **Australian English** spelling (organise, optimise, colour, behaviour) — site is targeting AU.
- Sentence case for headings; Title Case only for proper nouns and brand names.
- Em dashes for breaks in thought (`—`), Oxford commas in lists.
- No exclamation marks in body copy.

---

## 4. Handoff Rules

- **content-agent → truth-auditor:** Every content diff must be reviewed before commit. The auditor is mandatory, not optional.
- **seo-agent → truth-auditor:** Same — schema and metadata are content.
- **frontend-agent → content-agent:** When code changes a string (button label, alt text, fallback text), the content-agent must review the new string. Do not ship strings invented by frontend-agent.
- **truth-auditor → owner:** When a violation is found, surface it to the owner with the specific lines flagged. Do not auto-correct fabricated content; flag it.

---

## 5. Quality Gates (before commit)

- [ ] `npm run build` passes.
- [ ] `npm run lint` passes (or warnings explicitly acknowledged).
- [ ] truth-auditor checklist passes.
- [ ] No `console.log` introduced.
- [ ] No new placeholder strings shipped to the user-facing surface.
- [ ] Conventional Commit message written.

---

## 6. Open Items (TBD)

These will be filled in as the owner provides direction. Do not act on these until they are settled.

- `<!-- TBD: real case study list (titles, dates, scope) — pending from owner -->`
- `<!-- TBD: blog topic plan and writing cadence -->`
- `<!-- TBD: top navigation structure -->`
- `<!-- TBD: OnlyPixAI presentation on pixdyne.com -->`
- ~~`TBD: contact / address verification`~~ — resolved 2026-05-08, address is 294 Clayton Rd, Clayton VIC 3169.
- `<!-- TBD: social handles — verify @pixdyne on Twitter/X and linkedin.com/company/pixdyne exist -->`
- `<!-- TBD: testimonial / review acquisition strategy -->`
