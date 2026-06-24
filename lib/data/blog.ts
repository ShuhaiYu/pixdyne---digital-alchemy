import { BlogPost } from '@/types';

// Posts render in array order on /blog (no runtime sort), so this array stays in
// reverse-chronological order. Voice: the livelier blog style defined in
// references/ (voice.md, humour.md, opinions.md, stats.md, stories.md) — scene-
// or opinion-led ledes with a real point of view, dry wit, and concrete imagery.
// Non-negotiables still hold per post: answer-first lede (the first paragraph
// answers the title, for GEO §14.10), a Melbourne anchor in the first paragraph,
// business-owner vocabulary only (§6 rule 10 — no engineer-only stack names), no
// size segmentation (§6 rule 9), no fabricated metrics (§6 rule 3), and at least
// one internal link to a service page or related post (§14.11). seoTitle never
// carries "| Pixdyne" — the root layout title.template owns branding.
//
// Imagery: each post gets a generated brand cover (app/blog/[slug]/
// opengraph-image.tsx — hero + social card) plus one in-article pull-quote
// image. `pullQuotes[i]` is rendered by /api/blog-image and embedded in `content`
// as <figure><img src="/api/blog-image?slug=…&i=i"></figure>; keep the figure's
// i in sync with the array, and the <img> alt equal to the quote text.
export const blogPosts: BlogPost[] = [
  {
    id: 4,
    slug: 'shopify-development-melbourne',
    date: 'JUN 10, 2026',
    datePublished: '2026-06-10',
    category: 'WEB DEVELOPMENT',
    title: 'Shopify Development for Melbourne Brands: A Practical Guide',
    excerpt:
      "Someone will offer to build your store from scratch. For most Melbourne brands, don't — Shopify handles the expensive plumbing so your work goes into the storefront. Where it shines, where it needs a developer, and how we build it.",
    readTime: '5 MIN READ',
    pullQuotes: [
      'Reinventing checkout is a wonderful way to spend six figures discovering why Shopify already exists.'
    ],
    content: `
      <h2>Why Shopify wins for most online stores</h2>
      <p>Every so often someone arrives with a quote to build an online store from scratch and a gleam in their eye about "owning the whole stack". Nine times out of ten, the honest answer is: don't. For most Melbourne brands selling online, Shopify is the right call, because it quietly handles the expensive, risky plumbing — hosting, security, payments, checkout — so your money and attention go into the storefront and the products instead.</p>
      <p>That is not a knock on ambition. It is just where the leverage is. The parts of an online store that win customers — how it looks, how fast it feels, how easy it is to find and buy the right thing — are exactly the parts Shopify leaves in your hands. The parts that quietly sink projects are the parts it takes off your plate.</p>

      <h2>The plumbing you do not want to build yourself</h2>
      <p>Picture the week before launch. On a custom build, that week goes on making sure payments do not drop, the site survives a traffic spike, and nobody's card details can leak. On Shopify, that same week goes on product photography and the wording of your returns policy. Same deadline, very different stress.</p>
      <p>Here is what you are quietly buying when you choose Shopify:</p>
      <ul>
        <li>A checkout tested by millions of transactions that stays up when a campaign suddenly works.</li>
        <li>Security and PCI compliance handled for you, instead of an audit you have to pass.</li>
        <li>Payment, shipping, and tax integrations that already speak to the providers Australian stores use.</li>
        <li>Infrastructure and updates that happen in the background, with no developer on call at midnight.</li>
      </ul>

      <figure><img src="/api/blog-image?slug=shopify-development-melbourne&amp;i=0" width="1200" height="630" loading="lazy" alt="Reinventing checkout is a wonderful way to spend six figures discovering why Shopify already exists." /></figure>

      <h2>Where a Shopify developer actually earns their fee</h2>
      <p>Shopify is easy to start and easy to outgrow badly. The gap between a store that sells and one that quietly frustrates people is almost never the theme you bought — it is the details around it. A developer earns their fee in the unglamorous middle: a theme tuned to your brand rather than the stock template a thousand other stores run unchanged, product pages that load before a shopper loses patience, and integrations that stop your team re-typing every order by hand.</p>
      <p>It is also judgement. A good Shopify developer says no a lot: no to the fourth review app, no to the slider nobody scrolls, no to the "small" customisation that quietly breaks every future theme update. Restraint is part of the service.</p>

      <h2>The app trap</h2>
      <p>Shopify's app store is a genuine strength and a genuine trap. Every app solves a real problem — and every app adds weight, a monthly bill, and one more thing that can break when Shopify updates. Stores that feel slow and fragile usually got there one reasonable-sounding app at a time. We keep the list short on purpose and reach for an app only when buying clearly beats building. The test is simple: would you still pay for this in a year, and what happens to the store the day it stops being maintained?</p>

      <h2>Replatforming without losing your rankings</h2>
      <p>If you are moving an existing store onto Shopify, the riskiest part is invisible: your search rankings. Change every URL without a plan and you can wake up to a quiet drop in traffic that takes months to claw back. A careful migration maps old URLs to new ones, redirects them properly, and keeps the content that was already earning visits. It is boring, it is essential, and it is the first thing a cheap rebuild skips. Our piece on <a href="/blog/why-your-website-is-slow">why websites get slow</a> covers the performance half of the same story.</p>

      <h2>How we build Shopify stores in Melbourne</h2>
      <p>We build Shopify the way we build everything: pick the platform that fits how your team will actually run it after launch, then make it fast, on-brand, and properly wired into your other systems. And when a store outgrows what Shopify handles cleanly, we are also the team that builds the custom pieces around it. The full scope is on our <a href="/services/web-development">Web Development</a> page.</p>
    `,
    seoTitle: 'Shopify Development for Melbourne Brands',
    seoDescription:
      'When Shopify is the right call, where it needs a developer, and how we build fast, on-brand, well-integrated Shopify stores for Melbourne brands.'
  },
  {
    id: 5,
    slug: 'netsuite-implementation-melbourne',
    date: 'JUN 03, 2026',
    datePublished: '2026-06-03',
    category: 'SYSTEM DEVELOPMENT',
    title: 'What a NetSuite Implementation Actually Involves',
    excerpt:
      "Nobody selling you the software says it out loud: a NetSuite implementation isn't a software install — it's moving how your business runs onto one system. What it really involves, where rollouts fail, and how we run them in Melbourne.",
    readTime: '6 MIN READ',
    pullQuotes: [
      'A NetSuite implementation is not a software install — it is moving how your business runs onto one system.'
    ],
    content: `
      <h2>What a NetSuite implementation really is</h2>
      <p>Here is the part nobody selling you the software says out loud: a NetSuite implementation is not a software install. It is moving how your entire business runs onto one system, and the software is the easy bit. The real work is mapping your actual processes — quoting, purchasing, inventory, invoicing — onto NetSuite, migrating data clean enough to trust, and training the people who will live in it every day. Done properly, for a growing Melbourne business, that takes months, not weeks.</p>
      <p>That length scares people, so let us be plain about why it is normal. You are not waiting on a download. You are making hundreds of small decisions about how your business should work — and writing those decisions into the system that will run it for the next decade.</p>

      <h2>Why "live in three weeks" is the real red flag</h2>
      <p>When a vendor promises a three-week go-live, they are not being efficient. They are quietly skipping the parts that make it work: the process mapping, the data cleanup, the training. Those corners do not disappear — they reappear three months later as a system nobody trusts and a team that has quietly gone back to spreadsheets. A realistic timeline is not a sign of a slow team. It is a sign of an honest one.</p>

      <figure><img src="/api/blog-image?slug=netsuite-implementation-melbourne&amp;i=0" width="1200" height="630" loading="lazy" alt="A NetSuite implementation is not a software install — it is moving how your business runs onto one system." /></figure>

      <h2>Where implementations go wrong</h2>
      <p>Most failed rollouts fail for the same short list of reasons, and not one of them is the software.</p>
      <ul>
        <li>Migrating messy data instead of cleaning it first — garbage in, garbage forever.</li>
        <li>Over-customising before anyone has used the standard system, freezing today's guesses into expensive code.</li>
        <li>Skipping the training, so half the team quietly keeps the old spreadsheets running on the side — and now you are paying for two systems.</li>
        <li>No single owner on the business side to make the hundred small process decisions a rollout demands.</li>
      </ul>

      <h2>The data migration nobody budgets for</h2>
      <p>Ask anyone who has done it: the data is where projects slip. Years of customer records, products, and open orders have built up small inconsistencies — three spellings of the same supplier, prices that disagree, fields that mean different things to different people. NetSuite will happily import all of it, mess and all. The work that earns its keep is the unglamorous cleanup before migration: deduping, standardising, deciding what to bring across and what to leave behind. Do it first and the new system starts clean. Do it after and you have rebuilt the old mess in a more expensive place.</p>

      <h2>Customise last, not first</h2>
      <p>The temptation is to recreate exactly how you work today, button for button. Resist it. NetSuite already does most of what a business needs, in ways refined across thousands of companies. Use the standard system first, live in it for a while, and only then customise the genuine gaps. Every customisation is something you maintain forever and re-test at every upgrade — so each one should earn its place, not just match an old habit.</p>

      <h2>Who needs to own it on your side</h2>
      <p>The single best predictor of a smooth rollout is one empowered owner inside your business — someone who knows how the work really happens and can make decisions without a committee. Not an IT contact who forwards emails, but a person with the authority to say "yes, that is how we will do quotes now." Without that, every small decision stalls, and a months-long project becomes a years-long one.</p>

      <h2>How we run NetSuite projects in Melbourne</h2>
      <p>We treat a NetSuite implementation as a business project that happens to involve software. We map the workflow first, migrate data carefully, customise only where the standard system genuinely does not fit, and then stay on as the team that keeps it running. It is part of our <a href="/services/system-development">System Development</a> work for businesses across Melbourne and Australia.</p>
    `,
    seoTitle: 'What a NetSuite Implementation Actually Involves',
    seoDescription:
      'A NetSuite implementation moves how your business runs onto one system. What it involves, where rollouts fail, and how we run them in Melbourne.'
  },
  {
    id: 6,
    slug: 'mobile-app-development-melbourne',
    date: 'MAY 27, 2026',
    datePublished: '2026-05-27',
    category: 'SYSTEM DEVELOPMENT',
    title: 'Building a Mobile App in Melbourne: iOS, Android, or Both?',
    excerpt:
      "Everyone asks 'iOS or Android?' first. It's the wrong question — the real one is whether you need a native app at all. How Melbourne businesses should decide what to build before spending a cent on a mobile app.",
    readTime: '5 MIN READ',
    pullQuotes: [
      'Before iOS or Android, the real question is whether you need a native app at all.'
    ],
    content: `
      <h2>The first question isn't which platform</h2>
      <p>Most app conversations open with "iOS or Android?", and that is the wrong place to start. Before either, the real question is whether you need a native app at all. If people will open it once in a while, a fast mobile website is usually cheaper, easier to maintain, and every bit as good. A native app earns its keep when you genuinely need what a browser cannot do well: working offline, push notifications people actually act on, the camera or location, or daily-use performance. For Melbourne businesses weighing an app, that is where we start the conversation — sometimes by talking you out of one.</p>

      <h2>When a mobile website is the smarter spend</h2>
      <p>An app is a commitment, not a one-off build. It needs to be released, updated for every new phone and operating system, and resubmitted to the app stores each time. A mobile website skips all of that — one thing to maintain, instantly updated, found through a normal search. If your honest answer to "how often will someone open this?" is "every few weeks", a well-built mobile site will almost always serve you better than an app that sits forgotten on a home screen.</p>

      <figure><img src="/api/blog-image?slug=mobile-app-development-melbourne&amp;i=0" width="1200" height="630" loading="lazy" alt="Before iOS or Android, the real question is whether you need a native app at all." /></figure>

      <h2>iOS, Android, or both</h2>
      <p>Once an app genuinely makes sense, the platform follows your users — not your preference, and not whichever phone is in your pocket.</p>
      <ul>
        <li>Both platforms from one codebase — cross-platform tools ship iOS and Android together and suit most business apps, at close to the cost of one.</li>
        <li>Native, per platform — worth the extra cost when you need peak performance or deep device features a shared codebase cannot reach.</li>
        <li>One platform first — fair enough when your audience clearly skews one way and you want to prove the idea before paying to build it twice.</li>
      </ul>
      <p>For most businesses, the first option is the sensible default. Building the same app twice, by hand, is rarely worth it unless you have a specific reason that shows up in the user experience.</p>

      <h2>The part you cannot see: the backend</h2>
      <p>The screens are the visible tenth of an app. Underneath sits the part that actually runs it — accounts, data, payments, the logic that syncs a phone with the rest of your business. That backend is where most of the real work and most of the long-term value lives, and it is the piece a cheap app build tends to treat as an afterthought. Get it right and the app is reliable and extensible. Get it wrong and no amount of polish on the screens will save it.</p>

      <h2>What "done" actually means for an app</h2>
      <p>An app is never really finished at launch — that is just the start of its life. Phones change, operating systems update, and the app stores move the goalposts. Budgeting for an app means budgeting for the years after launch, not just the build. The businesses that get the most from an app are the ones that treat it as something they operate, not something they commissioned once and walked away from.</p>

      <h2>How we build mobile apps in Melbourne</h2>
      <p>We pick the approach that fits your users and your budget, build the backend the app quietly depends on, and operate the whole thing after launch. Most apps are really the visible tip of a system we also build — see <a href="/services/system-development">System Development</a> for the full picture.</p>
    `,
    seoTitle: 'Building a Mobile App in Melbourne: iOS, Android, or Both?',
    seoDescription:
      'Native app or mobile site? iOS, Android, or both? How Melbourne businesses should decide what to build before spending on a mobile app.'
  },
  {
    id: 1,
    slug: 'death-of-keywords-semantic-search',
    date: 'MAY 18, 2026',
    datePublished: '2026-05-18',
    category: 'TECHNICAL SEO',
    title: 'The Death of Keyword Stuffing: What Technical SEO Rewards Now',
    excerpt:
      'For years SEO meant repeating a phrase until your copy read like a ransom note. That era is over. What technical SEO rewards now, and what it means for any business in Melbourne investing in search.',
    readTime: '5 MIN READ',
    pullQuotes: [
      'Google now reads a page the way a person does — and a person can tell when they are being keyword-stuffed.'
    ],
    content: `
      <h2>What actually changed</h2>
      <p>For years, SEO advice boiled down to one grim ritual: pick a phrase, then repeat it until your copy read like a ransom note. That era is over. Google rolled out its BERT language model in 2019 and MUM in 2021, both built to understand the intent behind a search rather than match strings of text. The search engine now reads a page much the way a person does — and for any business in Melbourne still being sold "keyword density" by an agency, that is the memo.</p>
      <p>The practical upshot: cramming a page with a repeated phrase no longer helps, and often actively hurts. Google's own guidance on <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" rel="noopener noreferrer">helpful content</a> says it plainly — write for people, not for a keyword counter.</p>

      <h2>Why stuffing backfires now</h2>
      <p>It is not just that repetition stopped helping. It actively works against you. A page written to hit a phrase ten times reads badly, so visitors leave quickly — and how fast people bounce back to the results is something the search engine notices. You end up with copy that is worse for humans and no better for machines. The old trick now fails on both counts.</p>

      <figure><img src="/api/blog-image?slug=death-of-keywords-semantic-search&amp;i=0" width="1200" height="630" loading="lazy" alt="Google now reads a page the way a person does — and a person can tell when they are being keyword-stuffed." /></figure>

      <h2>What technical SEO rewards instead</h2>
      <p>Three things carry the weight now. Content that answers a real question completely, in plain language. A structure search engines can parse — proper headings, descriptive links, structured data. And a fast, stable page that behaves itself on a phone.</p>
      <ul>
        <li>Answer the question directly in the first paragraph, then expand. (Much like this one just did.)</li>
        <li>Group related pages into topic clusters and link them together so the whole site reads as an authority on a subject, not a scatter of one-off posts.</li>
        <li>Mark pages up with structured data so engines know exactly what each one is — an article, a service, a business.</li>
      </ul>

      <h2>Write for the question, not the keyword</h2>
      <p>The mental shift is small but it changes everything. Instead of "how many times do I fit in 'Melbourne web design'", ask "what is the person actually trying to find out, and have I answered it better than the next result?" Real expertise, written plainly, now ranks because it genuinely helps — the very thing the old keyword game was a poor imitation of.</p>

      <h2>The new wrinkle: AI answers</h2>
      <p>There is a second audience now. Tools like ChatGPT and Perplexity increasingly answer questions directly, quoting the pages they trust. The way to be quoted is, conveniently, the same as the way to rank: clear, factual, well-structured writing that states things plainly. Pages built to game a keyword count have nothing for an AI to quote. Pages that answer a question in a clean, declarative sentence get picked up on both fronts.</p>

      <h2>How we approach SEO in Melbourne</h2>
      <p>Good SEO is ongoing work, not a one-off audit you frame and hang on the wall. We treat it as a retained service: technical fixes, content that earns its rankings, and monthly reporting from Search Console and analytics so you can see what is actually moving. If that is the kind of partnership you are after, our <a href="/services/seo-content">SEO &amp; Content</a> service is built for exactly this — ongoing search work for the businesses we partner with across Melbourne and Australia.</p>
    `,
    seoTitle: 'Keyword Stuffing Is Dead: Modern Technical SEO',
    seoDescription:
      'Search engines reward clear answers, not keyword density. What technical SEO looks like now for businesses in Melbourne.'
  },
  {
    id: 7,
    slug: 'custom-crm-vs-off-the-shelf',
    date: 'MAY 09, 2026',
    datePublished: '2026-05-09',
    category: 'SYSTEM DEVELOPMENT',
    title: 'Custom CRM vs Off-the-Shelf: What Melbourne Businesses Should Choose',
    excerpt:
      "Let's spoil the ending: for most businesses, an off-the-shelf CRM like Salesforce or HubSpot is the right starting point, and a custom build is not. How to tell which one actually fits, for a Melbourne business.",
    readTime: '5 MIN READ',
    pullQuotes: [
      'A custom CRM only makes sense when your process is genuinely unusual and central to how you compete.'
    ],
    content: `
      <h2>Start with off-the-shelf — usually</h2>
      <p>Let's spoil the ending: for most businesses, an off-the-shelf CRM like Salesforce or HubSpot is the right starting point, and a custom build is not. The features are mature, the cost is predictable, and you are not paying a developer to rebuild problems that were solved a decade ago. A custom CRM only makes sense when your process is genuinely unusual and central to how you compete — which is rarer than the person pitching you a custom CRM would like you to believe. For a Melbourne business, the honest default is to configure something proven before building something new.</p>

      <h2>What you are really paying for with off-the-shelf</h2>
      <p>An established CRM is not just a contact list. It is years of refinement you get on day one: reporting, email and calendar integration, mobile apps, permissions, a marketplace of add-ons, and a support line when something breaks. Recreating even a fraction of that from scratch is expensive, and you would be maintaining it forever. The value of off-the-shelf is everything you never have to think about.</p>

      <figure><img src="/api/blog-image?slug=custom-crm-vs-off-the-shelf&amp;i=0" width="1200" height="630" loading="lazy" alt="A custom CRM only makes sense when your process is genuinely unusual and central to how you compete." /></figure>

      <h2>When custom is genuinely the right call</h2>
      <p>There is a real line where off-the-shelf starts costing more than it saves. You have crossed it when:</p>
      <ul>
        <li>Your workflow fits no standard CRM, and you are paying for the mismatch every month in workarounds and double entry.</li>
        <li>Per-seat licensing has quietly grown into a number that would fund a custom build several times over.</li>
        <li>You need the data and logic living in your own systems, wired into everything else you run.</li>
        <li>The CRM is part of your product, not just back-office admin.</li>
      </ul>

      <h2>The hidden cost of custom nobody mentions</h2>
      <p>A custom CRM does not stop costing money the day it launches. Someone has to maintain it, fix it, update it, and add to it as your business changes — work that an off-the-shelf vendor spreads across thousands of customers and you would be carrying alone. That is fine when the system is genuinely core to how you compete and worth owning outright. It is a slow, expensive mistake when it was only ever ordinary admin that a configured product would have handled.</p>

      <h2>The middle path most people miss</h2>
      <p>It is rarely all-or-nothing. The setup that fits most businesses is a proven CRM, configured properly around how you actually sell, with a few small custom pieces bolted on where the standard product genuinely falls short — an integration to your own systems, a calculation that is specific to you. You get the maturity of off-the-shelf and the precision of custom, without paying to rebuild the obvious parts.</p>

      <h2>How we help Melbourne businesses decide</h2>
      <p>We are not selling a build for its own sake — a good share of our work is setting up Salesforce or HubSpot properly so a custom CRM never becomes necessary. When the numbers and the workflow genuinely point the other way, we build it to fit. Both live inside our <a href="/services/system-development">System Development</a> service.</p>
    `,
    seoTitle: 'Custom CRM vs Off-the-Shelf for Melbourne Businesses',
    seoDescription:
      'When an off-the-shelf CRM like Salesforce or HubSpot is enough, and when a custom CRM is worth building. A straight guide for Melbourne businesses.'
  },
  {
    id: 8,
    slug: 'erp-implementation-melbourne',
    date: 'APR 29, 2026',
    datePublished: '2026-04-29',
    category: 'SYSTEM DEVELOPMENT',
    title: 'ERP Implementation in Melbourne: What to Expect',
    excerpt:
      "By Friday the numbers never match, and someone loses their evening deciding which spreadsheet to believe. That's the problem an ERP solves. What the project really involves, where it fails, and how we run ERP rollouts in Melbourne.",
    readTime: '5 MIN READ',
    pullQuotes: [
      'One source of truth: a sale updates stock, accounting, and reporting at once — with nobody re-keying anything.'
    ],
    content: `
      <h2>What an ERP actually does</h2>
      <p>By Friday afternoon the numbers do not agree. Sales says one thing, the stock count says another, and someone loses their evening working out which spreadsheet to believe. That is the mess an ERP — enterprise resource planning system — exists to end. It is the single system that runs the back office (finance, inventory, purchasing, orders, reporting) instead of a pile of disconnected apps, so one sale updates stock, accounting, and reporting at once, with nobody re-keying anything. For a growing Melbourne business drowning in spreadsheets, that is the whole point.</p>

      <h2>The spreadsheet tipping point</h2>
      <p>Spreadsheets are not the enemy — they are how almost every business starts, and for a while they work fine. The trouble begins when there are too many of them, each holding a slightly different version of the truth, and a growing share of everyone's week goes on reconciling them by hand. When "let me check which file is current" becomes a daily sentence, you have reached the tipping point an ERP is built for.</p>

      <figure><img src="/api/blog-image?slug=erp-implementation-melbourne&amp;i=0" width="1200" height="630" loading="lazy" alt="One source of truth: a sale updates stock, accounting, and reporting at once — with nobody re-keying anything." /></figure>

      <h2>What to expect from the project</h2>
      <p>An ERP rollout is a business-change project, not a software purchase, and it pays to walk in with clear eyes.</p>
      <ul>
        <li>A timeline in months, not weeks — most of it process mapping and data work, not software setup.</li>
        <li>One business owner who can make process decisions, not just an IT contact who can forward emails.</li>
        <li>Honest data cleanup before migration, not after the bad data has already moved in.</li>
        <li>Training and a settling-in stretch, where the old way winds down gradually instead of all at once.</li>
      </ul>

      <h2>Where ERP rollouts fail</h2>
      <p>The failures rhyme with every other big system project: bad data carried across instead of cleaned, the standard system over-customised before anyone has used it, training treated as an afterthought, and no single owner to make the decisions. None of these is a software fault. They are project faults — which is good news, because they are all avoidable with the right approach and an honest timeline.</p>

      <h2>ERP or a pile of best-of-breed apps?</h2>
      <p>The alternative to an ERP is a stack of separate tools — one for accounting, one for inventory, one for orders — stitched together with integrations. That can work, and for some businesses it is the better fit. But every join between two apps is a place data can drift, and the more tools you add, the more of your week goes on keeping them in sync. An ERP trades some flexibility for one source of truth. Whether that trade is worth it depends on how much the stitching is already costing you.</p>

      <h2>How we run ERP projects in Melbourne</h2>
      <p>Whether it is NetSuite or another platform, we map the workflow first, keep customisation on a tight leash, and stay on as the team that operates it afterwards. It is part of our <a href="/services/system-development">System Development</a> work. If you are weighing a specific platform, our piece on <a href="/blog/netsuite-implementation-melbourne">what a NetSuite implementation involves</a> goes deeper.</p>
    `,
    seoTitle: 'ERP Implementation in Melbourne: What to Expect',
    seoDescription:
      'What an ERP does, what the project really involves, and how to avoid the common failures. A plain-English guide for Melbourne businesses.'
  },
  {
    id: 2,
    slug: 'why-your-website-is-slow',
    date: 'APR 22, 2026',
    datePublished: '2026-04-22',
    category: 'WEB DEVELOPMENT',
    title: 'Why Your Website Is Slow: A Web Development Fix List',
    excerpt:
      'Most slow websites are slow for the same handful of fixable reasons: enormous images, a drawer full of scripts, and cheap hosting. How we diagnose and fix page speed for businesses across Melbourne.',
    readTime: '7 MIN READ',
    pullQuotes: [
      'A page that scores badly costs you twice: lower in search, and abandoned before it is usable.'
    ],
    content: `
      <h2>What actually makes a website slow</h2>
      <p>A slow website almost always comes down to the same short list of culprits, and none of them are mysterious. Photos uploaded straight off a phone, each one weighing several megabytes. A drawer full of marketing and tracking scripts, every one of them blocking the page as it loads. Cheap shared hosting that buckles the moment more than a handful of people show up at once. And pages built entirely in the browser, leaving visitors staring at a blank white screen while code grinds away. If your site is slow, the cause is almost certainly on that list — and for the Melbourne businesses we work with, all of it is fixable.</p>

      <h2>The image problem — your biggest, easiest win</h2>
      <p>Images are the number one cause of slow pages, and the easiest to fix. A photo straight from a modern phone can be 4000 pixels wide and several megabytes — then it gets displayed in a box a few hundred pixels across, with all that extra weight downloaded for nothing. Resize each image to the size it is actually shown, save it in a modern format, and a page can shed most of its weight without losing a shred of quality. It is the single highest-return half-hour in web performance.</p>

      <figure><img src="/api/blog-image?slug=why-your-website-is-slow&amp;i=0" width="1200" height="630" loading="lazy" alt="A page that scores badly costs you twice: lower in search, and abandoned before it is usable." /></figure>

      <h2>Core Web Vitals, in plain terms</h2>
      <p>Google measures real-world speed with a set of signals called Core Web Vitals, and uses them as a ranking factor. Stripped of the jargon, they ask three things: how quickly does the main content show up, how soon can someone actually interact, and how much does the layout jump around while loading. A page that scores badly costs you twice over — lower in search, and abandoned by visitors who gave up before it was usable.</p>
      <ul>
        <li>Compress and correctly size every image before it ships. A hero photo does not need to be 4000 pixels wide.</li>
        <li>Strip out tracking and widget scripts you are not actively using.</li>
        <li>Reserve space for images and embeds so the page does not lurch as things load.</li>
        <li>Choose hosting that matches your traffic, not whatever was cheapest on signup day.</li>
      </ul>

      <h2>The script drawer</h2>
      <p>Open the back of a typical marketing site and you will find a drawer of scripts nobody remembers adding: an old chat widget, two analytics tools doing the same job, a tracking pixel from a campaign that ended last year. Each one loads on every visit and each one slows the page. The fix is unglamorous and effective: audit the list, keep what earns its place, and delete the rest. Most sites can lose a third of their scripts and miss none of them.</p>

      <h2>Hosting you quietly outgrew</h2>
      <p>The cheapest shared hosting plan made sense on day one, when nobody had heard of you. It makes a lot less sense once a campaign lands and a few hundred people arrive at once and the whole site crawls. Hosting is not the place to chase the lowest price — it is the foundation everything else sits on. Matching your hosting to your real traffic is often the difference between a site that stays quick under load and one that falls over at the worst possible moment.</p>

      <h2>The blank-screen problem</h2>
      <p>Some sites are built so that the visitor's own browser has to assemble the whole page before anything appears. On a fast laptop you never notice. On an older phone on patchy data — which is how a lot of your customers actually arrive — it means staring at a blank white screen while the work happens. The fix is to send a page that is already built, so content appears immediately and the clever parts load after. First paint should be fast for everyone, not just for people on the latest hardware.</p>

      <h2>How we approach web development in Melbourne</h2>
      <p>Whether a site runs on WordPress, Shopify, Webflow, or a fully custom build, the speed work is the same discipline: optimise the images, cut the dead weight, cache hard, and host it properly. We build and maintain sites this way from day one, so the speed does not quietly rot six months after launch. The full scope is on our <a href="/services/web-development">Web Development</a> page.</p>
    `,
    seoTitle: 'Why Your Website Is Slow: Web Development Fixes',
    seoDescription:
      'Oversized images, excess scripts, and cheap hosting slow most sites down. A plain-English web development fix list from Melbourne.'
  },
  {
    id: 9,
    slug: 'wordpress-developer-melbourne',
    date: 'APR 14, 2026',
    datePublished: '2026-04-14',
    category: 'WEB DEVELOPMENT',
    title: 'WordPress Development in Melbourne, Without the Headaches',
    excerpt:
      "WordPress runs a huge share of the web for good reasons — but 'anything is possible' is also how you end up with a slow, plugin-stuffed mess. How to keep a Melbourne WordPress site fast, secure, and low-maintenance.",
    readTime: '5 MIN READ',
    pullQuotes: [
      'The platform is not the problem. How it is built and maintained is everything.'
    ],
    content: `
      <h2>Why WordPress is still a sensible choice</h2>
      <p>WordPress runs a huge slice of the web for good reasons: you own it, you can edit it yourself, and very little is impossible with it. The catch hides in that last part — "very little is impossible" is also how you end up with a slow, fragile, plugin-stuffed site held together with optimism. The platform is not the problem. How it is built and maintained is everything. For Melbourne businesses on WordPress, that distinction is the whole story.</p>

      <h2>The plugin graveyard</h2>
      <p>Open the plugins page of a struggling WordPress site and you will usually find the cause right there: thirty-odd plugins, a third of them inactive, several doing jobs that overlap, a couple last updated years ago. Each one is code written by someone else, running on your site, with its own bugs and its own security holes. Plugins are not free real estate — they are dependencies you are trusting with your business. A lean, deliberate list beats a long one every time.</p>

      <figure><img src="/api/blog-image?slug=wordpress-developer-melbourne&amp;i=0" width="1200" height="630" loading="lazy" alt="The platform is not the problem. How it is built and maintained is everything." /></figure>

      <h2>What keeps a WordPress site healthy</h2>
      <p>A WordPress site that stays fast and secure follows a few rules the cheap builds skip.</p>
      <ul>
        <li>A lean plugin list — every plugin is code someone else maintains, a monthly gamble, and a potential way in for attackers.</li>
        <li>A quality theme or custom build, not a bloated multipurpose template carrying a hundred features you will never switch on.</li>
        <li>Proper hosting, caching, and image handling so pages load fast on a phone, not just in the demo.</li>
        <li>Regular updates and backups — an unpatched WordPress site is the single most common way a site gets quietly hacked.</li>
      </ul>

      <h2>Security is mostly just maintenance</h2>
      <p>WordPress has a reputation for getting hacked, and it is half-deserved — not because the platform is weak, but because so many sites are left unpatched. The vast majority of break-ins exploit a known hole in an out-of-date plugin or theme that a five-minute update would have closed. Security here is not exotic. It is boring, regular maintenance: keep things updated, keep backups, and keep the plugin count low. Do that and you have shut the door most attackers walk through.</p>

      <h2>Inherited a mess? Audit before you rebuild</h2>
      <p>A lot of our WordPress work starts with a site someone else built and abandoned — slow, fragile, nobody quite sure what half the plugins do. The instinct is to bin it and start over, but that is often the expensive answer. More often a focused audit and cleanup — cutting dead plugins, fixing the hosting and images, patching what is exposed — brings the site back to health for a fraction of a rebuild. We look before we quote.</p>

      <h2>How we build and run WordPress in Melbourne</h2>
      <p>We build WordPress sites to be fast and low-maintenance, then keep them that way under our operations service so they do not drift back into trouble. Inherited a slow, neglected site from a previous developer? We audit and fix it before quoting anything bigger. See our <a href="/services/web-development">Web Development</a> page, or our piece on <a href="/blog/why-your-website-is-slow">why websites get slow</a>.</p>
    `,
    seoTitle: 'WordPress Development in Melbourne, Without the Headaches',
    seoDescription:
      'WordPress is a sensible choice — if it is built lean and maintained. How to keep a Melbourne WordPress site fast, secure, and low-maintenance.'
  },
  {
    id: 10,
    slug: 'hubspot-setup-melbourne',
    date: 'APR 07, 2026',
    datePublished: '2026-04-07',
    category: 'SYSTEM DEVELOPMENT',
    title: 'HubSpot Setup for Melbourne Teams: CRM Without the Bloat',
    excerpt:
      'HubSpot is approachable and easy to start — which is exactly how it gets set up carelessly and abandoned. What a good HubSpot setup looks like, and how we configure it so Melbourne teams actually use it.',
    readTime: '5 MIN READ',
    pullQuotes: [
      'The tool is only ever as useful as the setup behind it.'
    ],
    content: `
      <h2>Why teams pick HubSpot</h2>
      <p>HubSpot is popular because it is approachable: CRM, marketing, and sales tools in one place, with a free tier to get started. For a Melbourne team that has outgrown spreadsheets but does not want the weight of a heavier platform, it is often the right fit. The risk here is not complexity — it is the opposite. HubSpot is easy enough to set up carelessly, half-use for a month, and quietly abandon, all while the subscription keeps ticking over.</p>

      <h2>The free-tier trap</h2>
      <p>The free tier is genuinely useful and also genuinely a trap. It is easy enough to sign up, import a contact list, click around for an afternoon, and call it "done" — at which point nobody owns it, the data drifts, and within a month the team is back in their inboxes and spreadsheets. A tool you adopt casually gets abandoned casually. HubSpot rewards a deliberate setup and punishes a half-hearted one.</p>

      <figure><img src="/api/blog-image?slug=hubspot-setup-melbourne&amp;i=0" width="1200" height="630" loading="lazy" alt="The tool is only ever as useful as the setup behind it." /></figure>

      <h2>What a good HubSpot setup looks like</h2>
      <p>The tool is only ever as useful as the setup behind it.</p>
      <ul>
        <li>Pipelines and stages that match how your team actually sells, not the demo defaults nobody changed.</li>
        <li>Clean, deduplicated data from day one, before bad habits set like concrete.</li>
        <li>Only the automation you will actually maintain — a few reliable workflows beat dozens nobody trusts.</li>
        <li>Integration with your website and other tools, so leads flow in without anyone copying them across by hand.</li>
      </ul>

      <h2>Automation you will actually maintain</h2>
      <p>HubSpot can automate almost anything, which is exactly why so many setups end up with a tangle of workflows nobody understands and everybody is a little afraid to touch. More automation is not better automation. A handful of reliable, well-understood workflows that the team trusts beats a sprawling web that quietly emails the wrong people. Build the few that earn their keep, document them, and leave the rest off until there is a real reason to add them.</p>

      <h2>Clean data is the whole foundation</h2>
      <p>Every CRM lives or dies on its data, and HubSpot is no exception. Duplicate contacts, half-filled fields, and three spellings of the same company quietly rot a system until nobody believes what it tells them — and a CRM nobody believes is just an expensive address book. Getting the data clean at the start, and keeping it clean with a few simple rules, does more for adoption than any feature. People use a tool they can trust.</p>

      <h2>How we set up HubSpot in Melbourne</h2>
      <p>We configure HubSpot around your real sales process, connect it to your site, and keep the setup lean enough that the team actually uses it — which is the only measure that matters. It is part of our <a href="/services/system-development">System Development</a> work. Not sure whether HubSpot or a custom CRM fits? Our piece on <a href="/blog/custom-crm-vs-off-the-shelf">custom vs off-the-shelf CRM</a> lays out the choice.</p>
    `,
    seoTitle: 'HubSpot Setup for Melbourne Teams',
    seoDescription:
      'How to set up HubSpot so your team actually uses it: real pipelines, clean data, and lean automation. A practical guide for Melbourne teams.'
  },
  {
    id: 11,
    slug: 'salesforce-consultant-melbourne',
    date: 'MAR 24, 2026',
    datePublished: '2026-03-24',
    category: 'SYSTEM DEVELOPMENT',
    title: 'Making Salesforce Work for a Melbourne Business',
    excerpt:
      "Salesforce can run almost any sales operation, which is exactly why it's so often over-bought and under-used. How to configure it around your real process — and get a Melbourne team to actually adopt it.",
    readTime: '5 MIN READ',
    pullQuotes: [
      'A Salesforce nobody updates is worse than the spreadsheet it replaced.'
    ],
    content: `
      <h2>Salesforce is powerful — and easy to over-buy</h2>
      <p>Salesforce can run the sales and service operations of almost any business on earth, which is precisely why it is so often over-bought and under-used. The platform will do far more than your team needs, and it is delighted to sell you all of it. The job of a good setup is not to switch everything on — it is to configure the slice you will actually use, cleanly, and leave the rest dark. For Melbourne businesses on Salesforce, that restraint is where the value hides.</p>

      <h2>Buy the slice you will actually use</h2>
      <p>Salesforce is sold in editions and add-ons, and it is easy to buy a tier well above what you need because a demo made every feature look essential. Most teams use a fraction of what they pay for. The smarter move is to start from your actual process — how leads come in, how deals move, what you genuinely need to report on — and buy to that, not to the brochure. You can always grow into more. You rarely get a refund for less.</p>

      <figure><img src="/api/blog-image?slug=salesforce-consultant-melbourne&amp;i=0" width="1200" height="630" loading="lazy" alt="A Salesforce nobody updates is worse than the spreadsheet it replaced." /></figure>

      <h2>Where Salesforce projects need a steady hand</h2>
      <p>The usual failure is not too few features. It is too many, badly configured.</p>
      <ul>
        <li>Configuration that matches your sales process, not a generic template borrowed from someone else's business.</li>
        <li>Disciplined customisation — every custom field and automation is something you will maintain forever.</li>
        <li>Clean data migration, deduplicated before it lands, not archaeology you do afterwards.</li>
        <li>Adoption — a Salesforce nobody updates is worse than the spreadsheet it replaced, and more expensive.</li>
      </ul>

      <h2>Adoption is the real metric</h2>
      <p>You can configure Salesforce perfectly and still fail, because the only measure that matters is whether your team actually keeps it up to date. If updating a deal feels like a chore that gets in the way of selling, people quietly stop — and a half-updated CRM lies to you, which is worse than no CRM at all. Good setup designs for adoption: fewer required fields, sensible defaults, and a system that helps the salesperson rather than auditing them.</p>

      <h2>Customisation is a debt</h2>
      <p>Every custom field, rule, and automation you add is convenient today and a small debt tomorrow. It has to be maintained, re-tested when Salesforce updates, and explained to whoever inherits it. None of that means avoid customising — it means customise on purpose. Each addition should solve a real problem you can name, not just recreate an old habit because that is how the spreadsheet used to look.</p>

      <h2>How we work with Salesforce in Melbourne</h2>
      <p>We configure Salesforce around the way your team actually sells, keep customisation tight, and integrate it with the rest of your systems so it is not an island. It is part of our <a href="/services/system-development">System Development</a> service for businesses across Melbourne and Australia.</p>
    `,
    seoTitle: 'Making Salesforce Work for a Melbourne Business',
    seoDescription:
      'Salesforce is powerful and easy to over-buy. How to configure it around your real sales process and get a team to actually use it, in Melbourne.'
  },
  {
    id: 3,
    slug: 'autonomous-support-agents-llms',
    date: 'MAR 19, 2026',
    datePublished: '2026-03-19',
    category: 'AI INTEGRATION',
    title: 'AI Support Agents Your Customers Actually Trust',
    excerpt:
      'The old chatbot offered four buttons, none of which matched your problem. A modern AI agent answers from your real information and knows when to escalate. How we build customer-facing AI for the businesses we partner with in Melbourne.',
    readTime: '6 MIN READ',
    pullQuotes: [
      'An agent that confidently invents an answer is worse than no agent at all.'
    ],
    content: `
      <h2>Beyond the scripted chatbot</h2>
      <p>You know the old chatbot. It followed a rigid decision tree, offered you four buttons none of which matched your problem, and cheerfully looped you back to the start. Modern AI agents are a different animal: they understand a question in plain language, hold a real back-and-forth, and pull answers from your own knowledge base instead of a fixed menu. The difference a customer feels is simple — it actually helps. This is the kind of AI we build into businesses we partner with in Melbourne.</p>

      <h2>What changed under the hood, in plain terms</h2>
      <p>The old chatbot could only follow paths someone had drawn in advance, so anything off-script broke it. A modern agent reads the question the way a person would, works out what is being asked, and answers in its own words from the information you have given it. You are no longer trying to predict every way a customer might phrase a problem. You are giving the agent good information and clear limits, and letting it handle the wording.</p>

      <figure><img src="/api/blog-image?slug=autonomous-support-agents-llms&amp;i=0" width="1200" height="630" loading="lazy" alt="An agent that confidently invents an answer is worse than no agent at all." /></figure>

      <h2>Accuracy is the whole game</h2>
      <p>An AI agent is only as trustworthy as the information behind it, so that is where the real work goes. We connect the agent to your actual documents, policies, and product data so it answers from facts rather than confident guesses. We set clear limits on what it will and will not say. And we make sure it hands off to a person the moment a question moves beyond what it should answer alone. An agent that confidently invents an answer is worse than no agent at all — it just fails more politely.</p>
      <ul>
        <li>Ground every answer in your own verified content.</li>
        <li>Define the boundaries of what the agent is allowed to claim.</li>
        <li>Escalate cleanly to a person when confidence drops.</li>
      </ul>

      <h2>Knowing when to hand off</h2>
      <p>A good support agent is measured as much by what it refuses to answer as by what it handles. The dangerous failure is not "I will get a person to help with that" — customers accept that happily. The dangerous failure is a confident, wrong answer about a refund, a policy, or a price. So we build the handoff in from the start: when a question crosses the line of what the agent can safely answer, it passes cleanly to a human with the conversation intact, rather than bluffing.</p>

      <h2>Where the answers come from</h2>
      <p>The reason these agents stay accurate is that they answer from your content, not from the open internet. Your policies, product details, and FAQs become the source the agent draws on, so it speaks for your business rather than guessing on its behalf. Keep that source up to date and the agent stays correct; let it go stale and the answers drift. The agent is a mouthpiece for your information — which is exactly why the information has to be good.</p>

      <h2>AI capability we build into your business</h2>
      <p>This is the heart of how we think about AI: not a tool we keep to ourselves, but a capability your customers actually touch. Our own product, OnlyPixAI, is the public proof that we ship AI to real end users, not slideware. We bring the same approach to <a href="/services/system-development">custom systems</a> for the businesses we partner with — practical AI that fits how your team and your customers already work.</p>
    `,
    seoTitle: 'AI Support Agents Your Customers Actually Trust',
    seoDescription:
      'How to build customer-facing AI that answers from your real information and escalates to a human. Built for businesses in Melbourne.'
  },
  {
    id: 12,
    slug: 'webflow-developer-melbourne',
    date: 'MAR 10, 2026',
    datePublished: '2026-03-10',
    category: 'WEB DEVELOPMENT',
    title: "Webflow for Melbourne Businesses: When It Fits, When It Doesn't",
    excerpt:
      'Webflow is excellent for fast, distinctive marketing sites — and the wrong tool for heavy e-commerce or app logic. How to tell when it fits a Melbourne business, and when to choose something else.',
    readTime: '4 MIN READ',
    pullQuotes: [
      'The platform should fit the job, not the other way around.'
    ],
    content: `
      <h2>What Webflow is good at</h2>
      <p>Webflow sits in the gap between a drag-and-drop page builder and hand-coded development: it gives designers real control over layout and animation without writing code, and serves the result on fast infrastructure. For a marketing site that needs to look distinctive, load quickly, and get updated occasionally rather than rewritten daily, it is an excellent fit. Plenty of Melbourne brands are served perfectly well by exactly this, and need nothing heavier.</p>

      <h2>The designer-control sweet spot</h2>
      <p>What makes Webflow genuinely good is that it does not force the usual trade-off between "easy to edit" and "looks bespoke". A page builder is easy but tends to look like every other page builder; hand-coding looks bespoke but needs a developer for every change. Webflow lets a designer build something distinctive and still hand it over for your team to update. For a brand that lives or dies on looking unlike its competitors, that is the sweet spot.</p>

      <figure><img src="/api/blog-image?slug=webflow-developer-melbourne&amp;i=0" width="1200" height="630" loading="lazy" alt="The platform should fit the job, not the other way around." /></figure>

      <h2>Where Webflow stops fitting</h2>
      <p>Webflow is a website tool, not an everything tool, and it is worth knowing the edges before you commit your whole operation to it.</p>
      <ul>
        <li>Heavy e-commerce — once you need complex catalogues, deep integrations, or serious volume, Shopify or a custom build fits better.</li>
        <li>Custom application logic — Webflow builds sites, not software with accounts, dashboards, and workflows behind a login.</li>
        <li>Large content operations — at high page counts, other platforms handle editorial workflows more comfortably.</li>
      </ul>

      <h2>Webflow, WordPress, or Shopify?</h2>
      <p>A quick way to choose: if it is a distinctive marketing site your team updates now and then, Webflow is a strong pick. If you need to publish a lot of content and want a huge ecosystem of plugins, WordPress earns its place. If you are selling products at any real scale, Shopify is built for it. None of these is the right answer in every case — the point is to match the tool to the job rather than forcing one tool to do everything.</p>

      <h2>How we use Webflow in Melbourne</h2>
      <p>We build Webflow sites for Melbourne businesses when it is genuinely the right fit — and we say so plainly when it is not, pointing you to WordPress, Shopify, or a custom build instead. The platform should fit the job, not the other way around, and we would rather tell you that before the invoice than after. See our <a href="/services/web-development">Web Development</a> page.</p>
    `,
    seoTitle: 'Webflow for Melbourne Businesses: When It Fits',
    seoDescription:
      'Webflow suits fast, distinctive marketing sites — and not heavy e-commerce or app logic. When it fits a Melbourne business, and when it does not.'
  }
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function getBlogSlugs(): string[] {
  return blogPosts.map(p => p.slug);
}
