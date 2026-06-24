# stats.md — Blog writing reference

> A working reference for using numbers, data, and claims in Pixdyne blog posts.
> The humour article warns against jokes that "miss the mark"; statistics carry
> the same risk, with higher stakes — a wrong or invented number is not a missed
> laugh, it is a **truthfulness breach** (CLAUDE.md §6 rule 3, the strictest rule
> on this site). This file is mostly about what you may *not* do. See
> [voice.md](./voice.md) and [opinions.md](./opinions.md).

---

## 1. The hard rule first

**Never invent a delivery metric.** Banned outright (§6 rule 3): "150+ projects",
"99% satisfaction", "24/7 support", "millions of users", "trusted by industry
leaders", and every cousin of these.

When a post wants one of our own numbers and we do not have a verified one, leave
a **visible placeholder**, never a guess:

```
<!-- TBD: real metric from owner -->
```

A placeholder is a feature — it tells the owner exactly what to supply. A
fabricated stat erodes the E-E-A-T the whole site is built to earn.

---

## 2. The two-bucket model

Before using any number, sort it:

| Bucket | Examples | Rule |
|---|---|---|
| **External, verifiable** | Google launched BERT (2019), MUM (2021); Core Web Vitals thresholds (LCP < 2.5s); WordPress' share of the web; a platform's pricing model | **Allowed — with a source.** |
| **Pixdyne's own performance** | projects delivered, clients served, satisfaction %, uptime %, years-of-X counts | **Forbidden until the owner verifies it.** Use a TBD placeholder. |

The first bucket is where Pixdyne stats power *should* come from — industry facts
that make us look informed without claiming anything about ourselves we cannot
prove.

---

## 3. How to source a number well

Discipline here is not the same as dullness — a real, well-placed stat is one of the
liveliest, most quotable things a post can carry. The "death of keyword stuffing"
post models the *sourcing*, even if its prose was flat: every number is external and
sourced.

> "Google introduced its BERT language model in 2019 and the MUM model in 2021,
> both built to understand the intent behind a search…"

…with a real outbound link to Google's own helpful-content documentation. That is
the template:

- A specific, checkable fact (year, model name, threshold).
- A reputable primary source, linked with `rel="noopener noreferrer"`.
- Stated plainly, in service of the reader's understanding — not to impress.

---

## 4. Sourcing standard

- **Primary sources only** for non-obvious claims (§14.11): Google's own docs,
  the platform vendor's docs, official standards bodies, government registers
  (e.g. the ABR for our ABN). Not a random blog citing a blog.
- **Link it** when the claim is non-obvious or could be challenged.
- **Date-stamp volatile facts.** Pricing, market share, and "as of" figures rot.
  If you cite one, say when it was true, or prefer a durable framing.
- **If you cannot source it, do not state it as fact** — soften to a defensible
  opinion ([opinions.md](./opinions.md)) or cut it.

---

## 5. Numbers as a GEO asset

AI engines (Perplexity, ChatGPT search, Gemini) preferentially quote **clear,
attributable factual statements** (§14.10). A well-sourced number is one of the
most quotable things a post can contain. So when you *do* have a legitimate
external stat:

- Put it in a short, self-contained declarative sentence (no context-dependent
  pronouns).
- Keep the figure and its meaning in the same sentence.
- Place at least one such statement early, where crawlers read.

This is the upside of discipline: the *only* numbers we publish are ones that are
true and sourced, which is exactly the profile AI engines reward.

---

## 6. Genuine numbers we already have (safe to use)

These are verified and live in the data layer / governance — use freely:

- Founded **2018** (company-history anchor — never imply earlier; §6 rule 4).
- **Melbourne · Victoria · Australia**; office **294 Clayton Rd, Clayton VIC 3169**.
- **ABN 96 690 116 584** (verifiable on the Australian Business Register).
- Pull NAP/identity facts from `lib/data/business.ts` — **never** retype the
  address, phone, email, or ABN as an inline literal (§14.1; truth-auditor block).

Everything beyond this about *our* track record needs owner sign-off first.

---

## 7. Quick check

- [ ] Is every number about *us* verified by the owner? If not → TBD placeholder.
- [ ] Is every external stat from a primary source, and linked if non-obvious?
- [ ] Are volatile figures date-stamped or reframed durably?
- [ ] No banned metric patterns (`\d+\+ projects`, `\d+% satisfaction`, "24/7")?
- [ ] At least one legitimate stat phrased as a quotable, self-contained sentence?
- [ ] NAP/ABN read from `lib/data/business.ts`, not retyped?
