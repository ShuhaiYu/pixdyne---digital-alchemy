# voice.md — Blog writing reference

> The anchor reference for writing future Pixdyne blog posts. Built on the humour
> article's first and best principle — **be yourself** — and written to **move the
> blog off its old, too-bland style** toward something with a real voice.
>
> **What stays fixed:** truthfulness and identity rules in
> [`../AGENTS.md`](../AGENTS.md) §3 and [`../CLAUDE.md`](../CLAUDE.md) §6 + §14.
> Those are about honesty, not about being dull — keep them. **What changes:** the
> self-imposed flatness. Companions: [humour.md](./humour.md) ·
> [opinions.md](./opinions.md) · [stats.md](./stats.md) · [stories.md](./stories.md).

---

## 1. The reset

The earlier posts were accurate and well-structured — and forgettable. They read
like a manual: define the term, list four bullets, close politely. Correct, but no
pulse.

This reference set exists to fix that. The thesis in one line:

> **Lively = voice, rhythm, concrete imagery, real opinions, real stories, and
> well-placed wit — and yes, an exclamation mark or a bold line when one genuinely
> earns it.**

The old posts were flat because they were *formulaic and voiceless*, not because
they were missing a punctuation mark. So we add a voice and keep the integrity. The
one thing we still won't do is fake energy with **superlatives or invented metrics**
— that is the language of the vendors our audience already distrusts. Personality is
welcome; dishonesty is not.

---

## 2. Be yourself (the whole game)

The humour article is right that readers can smell inauthentic copy. Pixdyne's
"self" is already real and specific: a Melbourne team that has **built and operated**
business systems since **2018**, sceptical of inflated agency talk because our
audience is too. Write as that person — opinionated, plain-spoken, dryly funny,
allergic to nonsense.

The test for any sentence: *would a sharp, honest operator who knows the work
actually say this?* If it sounds like a brand committee or a press release, rewrite
it until it sounds like a person.

---

## 3. What we keep from the brand voice

From AGENTS.md §3 — these are about *honesty*, and they survive the style change
intact:

1. **Confident, not boastful.** Say what we do and have done. No "best", "leading",
   "premier", "world-class".
2. **Plain English over jargon.** "We host and monitor your site," not
   "enterprise-grade observability solutions".
3. **Specific over vague.** "Since 2018" beats "many years". A named platform beats
   "any tech stack". (Specificity is also what makes voice land — see §4.)
4. **Local without being parochial.** Melbourne / Victoria where it earns trust,
   not in every sentence.
5. **Honest by default.** No real number or client? Leave a visible placeholder,
   never fabricate ([stats.md](./stats.md)).

Note that none of these say "be dull." Confident, plain, specific, and honest is a
*great* foundation for a strong voice — it just was not being used as one.

---

## 4. What we add (the lift)

This is the new part. To get a post off the flat baseline:

- **Open with a moment, not a definition.** Lead with the Friday-night spreadsheet,
  the plugin graveyard, the vendor who vanished — then name the concept. See
  [stories.md](./stories.md).
- **Have an angle.** Every post takes a defensible stance, usually an honest default
  most vendors won't admit. No neutral brochure copy. See [opinions.md](./opinions.md).
- **Vary the rhythm.** Mix a long explanatory sentence with a short, blunt one.
  Short sentences are where the voice bites.
- **Use concrete images over abstractions.** "Three spreadsheets that disagree by
  Friday" beats "data inconsistency across systems".
- **Let a little dry wit through.** A few well-placed lines per post. See
  [humour.md](./humour.md).
- **Write to one reader.** A real owner with a real problem, not "businesses".

---

## 5. Mechanics (AGENTS.md §3.4)

- **Australian English:** organise, optimise, colour, behaviour, humour, prioritise.
- **Sentence case** headings; Title Case only for proper nouns and brand names.
- **Em dashes** (`—`) for breaks in thought. **Oxford commas** in lists.
- **Exclamation marks: allowed, sparingly.** Use one when a line genuinely earns
  it — not as a default or a crutch. Most of the lift still comes from voice and
  rhythm, but the old blanket ban is gone (AGENTS.md §3.4, updated 2026-06-24).
- Short, parseable, declarative sentences for the load-bearing facts (GEO, §14.10).
  Stretch and play with rhythm *around* them.

---

## 6. Use / Avoid (the fast filter)

**Use** — long-term partner · built and operated · since 2018 · local team · the
businesses we partner with · ambitious teams · growing companies · AI capability for
your business · platform names the audience knows (WordPress, Shopify, Webflow,
Squarespace, NetSuite, Salesforce, HubSpot, ERP, CRM, iOS, Android, hosting,
monitoring, SEO, analytics).

**Avoid** —
- **Hype, not because it's loud but because it's dishonest:** best, premier, leading,
  world-class, industry-leading, cutting-edge, state-of-the-art, next-generation,
  revolutionary.
- **Filler:** "we are passionate about…", "leverage" (verb), "synergise", "ideate",
  "ecosystem".
- **Downward audience segmentation** (§6 rule 9): "for SMBs", "small business", any
  size-based targeting. Use growth framing. *(The internal term "SMB" is fine in
  these reference files; never in a published post.)*
- **Engineer-only stack names** in user-facing copy (§6 rule 10): Next.js, React,
  Tailwind, GSAP, TypeScript, PostgreSQL, Sentry, Vercel, Cloudflare. Fine here;
  never in a post.
- **Wrong AI framing** (§6 rule 7): never "we use AI to code faster" / "AI-assisted
  development" / "vibe coding". AI is a capability we deliver **to the client**.

---

## 7. Before you publish

- [ ] Does it open with a moment or angle, not a dictionary definition?
- [ ] Does it have a voice — could you tell a person wrote it?
- [ ] First paragraph answers the title's question (GEO).
- [ ] One primary cluster keyword (§14.7) in title + H1 + first paragraph.
- [ ] Melbourne anchored once, naturally.
- [ ] A real angle, not a generic listicle (§14.11).
- [ ] One internal link to a service or related post.
- [ ] No hype words, no invented metrics, no client/team names. (Exclamation marks fine in moderation.)
- [ ] `truth-auditor` review before commit (AGENTS.md §2.4 — mandatory).
