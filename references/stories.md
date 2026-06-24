# stories.md — Blog writing reference

> A working reference for storytelling in Pixdyne blog posts. The humour article
> ends on the real prize: wit and craft "can instantly improve your storytelling."
> Stories are what turn a forgettable, explain-y post into one a reader remembers
> and an AI engine quotes. The previous posts *explained*; they rarely *showed*.
> This file is about showing. See [voice.md](./voice.md), [humour.md](./humour.md).

---

## 1. Why stories (and why the old posts felt flat)

A bland post tells you "an ERP gives you one source of truth." A post with a story
puts you in the room: the ops manager reconciling three spreadsheets at 7pm because
a sale in one never reached the other two. Same fact — one is forgettable, one
sticks.

The old blog leaned almost entirely on the first mode: correct, tidy, and lifeless.
The fastest way to make the new style feel alive is to **open with a scene, not a
definition**, and to anchor every abstract claim to a concrete moment.

---

## 2. The kinds of stories we are allowed to tell

We have real constraints (no client names, no team identities — §6 rules 1–2), but
plenty of room inside them.

1. **The anonymised composite.** The most useful tool. A specific, vivid scenario
   that is true to many clients but names none. "A growing Melbourne business
   drowning in spreadsheets" is already on the blog — push it further: give it a
   moment, a frustration, a turning point. Archetypal, not identifying.
2. **The failure story.** "Here is how this goes wrong, and why it is never the
   software's fault." These are gold — concrete, honest, and they pre-empt the
   reader's own fear. The old failure-mode lists were a start; turn the best one
   into a short narrative.
3. **The before/after.** The Friday-night spreadsheet → the single dashboard. The
   plugin-stuffed site that times out on a phone → the fast one. Show the gap.
4. **The approved case study.** When — and only when — the owner has cleared a
   client for publication, we can name it (see §3 below).
5. **The honest origin beat.** Pixdyne since 2018; vendors who built and left; why
   we operate what we build. This is the brand's own story and it is always on the
   table — it is exactly what the audience relates to (CLAUDE.md §4).

---

## 3. Real stories we may name (owner-approved)

Per CLAUDE.md §13 (2026-06-18), the work catalogue in `lib/data/case-studies.ts`
is owner-curated and cleared for publication. These are **safe to reference by
name** in posts:

- **Lexcord Lawyers** — bilingual Melbourne law firm, Web Development
  (`lexcord.com.au`).
- **AS Academy** — bilingual youth-education site, Web Development
  (`asacademy.com.cn`).
- The rest of the published `/work` catalogue (4WD Interiors, Austin Education,
  Gameology, Goodmood Studio, Insight Idea, Open Mat, Cupcake Central, WinCareer,
  To Future, and others currently live).

**Rule:** if a client is not already published in `lib/data/case-studies.ts` or
explicitly approved by the owner *this session*, do not name them. Composite it.

---

## 4. How to make a composite concrete without identifying anyone

The trick the old posts missed: **specific detail that is archetypal, not unique.**

- ✅ "A 20-person firm running quotes in one app, stock in a spreadsheet, and
  invoices in a third — and re-typing the same order into all three."
- ❌ "A Hawthorn dental group with 14 staff and a practice manager named Sarah."
  (Invented, identifying, and a §6 violation.)

Give the scene texture — the time of day, the workaround, the moment it breaks —
but keep every detail one that a *whole category* of readers would recognise as
"that's us." If a real, unapproved client could read it and say "that's clearly
me," it is too specific. Pull back.

---

## 5. The opening scene (lede craft)

The single highest-leverage change from the old style. Compare:

> ❌ (old, flat) "An ERP — enterprise resource planning system — is the single
> system that runs the back office."

> ✅ (scene-first) "By Friday afternoon the numbers never match. Sales says one
> thing, the stock count says another, and someone spends the evening working out
> which spreadsheet to believe. That is the problem an ERP exists to end."

Both deliver the answer in the first breath (GEO still holds — §14.10). One of them
a reader actually feels. Lead with the moment, then name the concept.

---

## 6. Guardrails

- **No client names unless published/approved** (§4 above; §6 rule 2).
- **No team member names, photos, or bios** — ever (§6 rule 1). Stories are about
  the client's world and the work, never about naming our people.
- **No invented outcomes or metrics.** A story can show a *qualitative* change ("the
  evening spreadsheet reconciliation stopped") but must not fabricate a *number*
  ("cut admin time 40%") unless the owner verified it (§6 rule 3 → [stats.md](./stats.md)).
- **No invented quotes.** Never put words in a client's mouth.
- **Keep the AI positioning intact** in any story about AI work — capability we
  deliver to the client, never an internal coding shortcut (§6 rule 7).
- **Stay in Melbourne / Australia** for setting and detail where it adds reality.

---

## 7. Quick check

- [ ] Does the post open with a scene or a moment, not a dictionary definition?
- [ ] Is every abstract claim anchored to one concrete, recognisable detail?
- [ ] Are all named clients published in `case-studies.ts` or approved this session?
- [ ] Are composites archetypal — no unapproved client could say "that's clearly me"?
- [ ] No team identities, invented quotes, or fabricated outcome numbers?
- [ ] Does the first paragraph still answer the title's question (GEO)?
