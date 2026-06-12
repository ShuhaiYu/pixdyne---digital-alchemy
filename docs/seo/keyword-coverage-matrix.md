# Keyword Coverage Matrix

> Maps the §14.7 keyword framework (CLAUDE.md) to the live landing pages that carry
> each cluster, grades coverage strength, and ranks the content gaps. This is the
> source-of-truth worklist for content production (blog) and on-page fixes.
>
> Last audited: 2026-06-12 (live production + `lib/data/services.ts` + `lib/data/blog.ts`).

## Legend

| Grade | Meaning |
|---|---|
| **Strong** | Cluster keyword present in title **and** (H1 or first paragraph); page is the unambiguous owner. |
| **Partial** | Present in title or body, but H1 misses it, or multiple intents share one page (dilution). |
| **Tag-only** | Keyword appears only as a service `tag` / feature chip — no prose, no dedicated page. |
| **Missing** | No page or content carries the term. |

---

## Primary Clusters (Melbourne + service intent)

| # | Primary cluster | Owning page | Title | H1 | Body | Grade |
|---|---|---|---|---|---|---|
| 1 | Melbourne web development · web development Melbourne · Melbourne web designer | `/services/web-development` | "Web Development Services Melbourne" ✅ | "Web Development" ❌ no Melbourne | "Web development from a Melbourne team… since 2018" ✅ | **Partial** (H1 fix) — "Melbourne web designer" Missing |
| 2 | Melbourne IT services · Melbourne technology partner · long-term technology partner | `/` (home) + `/services` | home title "Melbourne Technology Partner" ✅ | home H1 "Upgrade your workflow. Grow with a team that stays." ❌ zero keyword | home desc has "technology partner" ✅ but **no "Melbourne IT services" anywhere** | **Partial** — "Melbourne IT services" (highest-volume head term) anchored to nothing |
| 3 | custom software Melbourne · custom system Melbourne · bespoke software Australia | `/services/system-development` | "Custom System Development Melbourne — ERP & CRM" ✅ | "System Development" ❌ no Melbourne | "custom software… Melbourne team" ✅ | **Partial** — "bespoke software Australia" Missing |
| 4 | ERP implementation Melbourne · CRM development Melbourne | `/services/system-development` (shared) | "…— ERP & CRM" partial | — | "ERP and CRM rollouts" ✅ | **Partial** — two distinct buyer intents compressed into one page |
| 5 | managed IT Melbourne · ongoing SEO Melbourne | `/services/managed-it` + `/services/seo-content` | "Managed IT Melbourne…" ✅ / "SEO & Content Melbourne — Ongoing Technical SEO" ✅ | (verify) | strong on both | **Strong** |

---

## Long-tail (platform + location) — ALL Tag-only

Every platform long-tail below appears **only** as a service tag/feature. No dedicated
landing page, no blog content. These are high-intent, low-competition terms — the single
largest agent-fillable opportunity. Each is one blog post (or future sub-page) seed.

| Long-tail keyword | Current carrier | Grade | Suggested asset |
|---|---|---|---|
| Shopify partner Melbourne · Shopify developer Melbourne | web-dev tag "Shopify" | **Tag-only** | Blog: "Shopify development for Melbourne brands" |
| WordPress developer Melbourne | web-dev tag | **Tag-only** | Blog: "Choosing (and running) WordPress in Melbourne" |
| Webflow developer Melbourne | web-dev tag | **Tag-only** | Blog or web-dev section expansion |
| NetSuite consultant Australia · NetSuite implementation Melbourne | system-dev body | **Tag-only** | Blog: "What a NetSuite implementation actually involves" |
| Salesforce consultant Melbourne | system-dev tag | **Tag-only** | Blog or system-dev section |
| HubSpot Melbourne | system-dev tag | **Tag-only** | Blog or system-dev section |
| iOS app developer Melbourne · Android app developer Melbourne | system-dev tag/feature | **Tag-only** | Blog: "Building a mobile app in Melbourne: iOS, Android, or both" |

---

## Blog reinforcement map

3 posts live. Each post should reinforce ≥1 primary cluster (§14.11).

| Post | Reinforces | Cluster |
|---|---|---|
| `death-of-keywords-semantic-search` | SEO & Content | 5 (ongoing SEO) ✅ |
| `why-your-website-is-slow` | Web Development | 1 ✅ |
| `autonomous-support-agents-llms` | System Development / AI | 3 (loose) ~ |

**Clusters with ZERO blog support:** Cluster 2 (Melbourne IT services), Cluster 4
(ERP / CRM — both intents), and **all 9 platform long-tails**.

---

## Gap worklist (ranked by impact, not effort)

### P1 — Head term with no landing page — ✅ DONE (2026-06-12)
- **"Melbourne IT services"** was the highest-volume head term in the framework and was
  anchored to nothing. `/services` was the natural hub but its title was just "Services"
  and its H1 "What we deliver." — zero keyword. **Fixed:** `/services` now carries the term
  in title (`Melbourne IT Services`), description, OG/Twitter, H1 (`Melbourne IT services,
  in full.`), and an answer-first first paragraph (`Pixdyne delivers IT services for
  businesses in Melbourne and across Australia…`). Build verified.

### P1 — H1 review — NO ACTION NEEDED (resolved after code inspection)
Re-graded against the actual §14.7 mandate ("primary cluster keyword in title **and**
[H1 **or** first paragraph]") — these already comply; forcing keywords into brand hero
H1s would cost more (§8 brand) than it gains:
- **Home H1** "Upgrade your workflow. Grow with a team that stays." — keeps the brand
  hero. Keyword load is carried by the visible kicker ("Melbourne Technology Partner",
  first paint) + the sr-only GEO prose immediately after the H1. Acceptable brand trade-off.
- **`/services/[slug]` H1** = `{service.title}` (e.g. "Web Development") — carries the
  canonical service name (mandate ✅). The primary cluster keyword lives in the page title
  + `fullDescription` first paragraph ("…from a Melbourne team… since 2018"). Compliant.

### P2 — Long-tail content series (9 tag-only terms)
- One blog post per platform cluster (Shopify / WordPress / NetSuite / mobile apps first —
  highest commercial intent). Each: answer-first lede, Melbourne anchor in H1/first para,
  one internal link to the parent service page (§14.11).

### P2 — Split compressed intents (Cluster 4)
- "ERP implementation Melbourne" and "CRM development Melbourne" share one page. Capture
  each with a dedicated blog post linking back to `/services/system-development`.

### P3 — Variant phrasing
- "Melbourne web designer" (Cluster 1), "bespoke software Australia" (Cluster 3) — weave
  into existing page copy where natural; do not stuff.

---

## Verify-next (before acting)
- [x] Pull `/services` index current title / H1 / first paragraph — was "Services" / "What we deliver." (no keyword). **Fixed.**
- [x] Confirm home eyebrow "Melbourne Technology Partner" — it is a `<span>` kicker above the `<h1>`, plus an sr-only GEO `<p>` right after the H1. Brand H1 kept by design.
- [x] Confirm `/services/[slug]` H1 — renders `{service.title}`; keyword carried by title + first paragraph (`fullDescription`). Compliant, no change.
- [x] Doc drift: CLAUDE.md §10 "no /services index page yet" — corrected to reflect the live, now keyword-anchored `/services` hub.

## Remaining agent-fillable work (next)
- **P2 long-tail blog series** — 9 tag-only platform terms (Shopify / WordPress / NetSuite /
  Salesforce / HubSpot / iOS / Android Melbourne). Highest commercial intent first.
- **P2 Cluster 4 split** — dedicated posts for "ERP implementation Melbourne" and
  "CRM development Melbourne".
