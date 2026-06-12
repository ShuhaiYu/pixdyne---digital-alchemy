import { BlogPost } from '@/types';

// Posts are rendered in array order on /blog (no runtime sort), so this
// array is kept in reverse-chronological order. The platform/long-tail
// series (Shopify, NetSuite, mobile, CRM, ERP, WordPress, HubSpot,
// Salesforce, Webflow) targets the §14.7 tag-only long-tail keywords —
// see docs/seo/keyword-coverage-matrix.md. Each post: answer-first lede,
// Melbourne anchor in the first paragraph, business-owner vocabulary only
// (§6 rule 10), no size segmentation (§6 rule 9), and at least one internal
// link to a service page or related post (§14.11). seoTitle never carries
// "| Pixdyne" — the root layout title.template owns branding (§13 2026-05-25).
export const blogPosts: BlogPost[] = [
  {
    id: 4,
    slug: 'shopify-development-melbourne',
    date: 'JUN 10, 2026',
    datePublished: '2026-06-10',
    category: 'WEB DEVELOPMENT',
    title: 'Shopify Development for Melbourne Brands: A Practical Guide',
    excerpt:
      'For most online stores, Shopify is the right call — it handles the expensive, risky plumbing so your work goes into the storefront. Here is where it shines, where it needs a developer, and how we build it for Melbourne brands.',
    readTime: '5 MIN READ',
    content: `
      <h2>Why Shopify suits most online stores</h2>
      <p>If you sell products online and you are not running a complex, high-volume operation, Shopify is usually the right call. It handles hosting, security, payments, and checkout — the parts that are expensive to build and risky to get wrong — so your effort goes into the storefront and the products instead of the plumbing. For most Melbourne brands launching or replatforming a store, that trade is worth it.</p>

      <h2>Where a Shopify developer earns their keep</h2>
      <p>Shopify is easy to start and easy to outgrow badly. The difference between a store that converts and one that frustrates people is rarely the theme you bought — it is the details around it.</p>
      <ul>
        <li>A custom or heavily-tuned theme that matches your brand, not a stock template every other store uses.</li>
        <li>Performance work so the store loads fast on a phone on mobile data, not just on office wifi.</li>
        <li>App discipline — every Shopify app adds weight and a monthly cost; a developer keeps that list short.</li>
        <li>Integrations to your inventory, accounting, or fulfilment so orders are not re-keyed by hand.</li>
      </ul>

      <h2>How we build Shopify stores in Melbourne</h2>
      <p>We build Shopify for Melbourne brands the way we build everything: pick the platform that fits how your team will run it after launch, then make it fast, on-brand, and properly integrated. When a store grows past what Shopify handles cleanly, we are also the team that builds the custom pieces around it. See the full scope on our <a href="/services/web-development">Web Development</a> page.</p>
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
      'A NetSuite implementation is not a software install — it is moving how your business runs onto one system. Here is what it really involves, where rollouts fail, and how we run them for businesses in Melbourne.',
    readTime: '6 MIN READ',
    content: `
      <h2>What a NetSuite implementation actually involves</h2>
      <p>A NetSuite implementation is not a software install — it is moving how your business runs onto one system. The software is the easy part. The work is mapping your real processes — quoting, purchasing, inventory, invoicing — onto NetSuite, migrating clean data, and training the people who will live in it every day. Done properly it takes months, not weeks, and for a growing Melbourne business that is normal, not a warning sign.</p>

      <h2>Where implementations go wrong</h2>
      <p>Most failed rollouts fail for the same handful of reasons, and none of them are the software itself.</p>
      <ul>
        <li>Migrating messy data instead of cleaning it first — garbage in, garbage forever.</li>
        <li>Over-customising before anyone has used the standard system, locking in guesses as expensive code.</li>
        <li>Skipping training, so staff quietly keep their old spreadsheets running alongside the new system.</li>
        <li>No single owner on the business side to make the dozens of process decisions a rollout needs.</li>
      </ul>

      <h2>How we approach NetSuite in Melbourne</h2>
      <p>We treat a NetSuite implementation as a business project that happens to involve software. We map the workflow first, migrate data carefully, customise only where the standard system genuinely does not fit, and stay on afterwards as the team that keeps it running. It is part of our <a href="/services/system-development">System Development</a> work for businesses across Melbourne and Australia.</p>
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
      'Before iOS versus Android, the real question is whether you need a native app at all. How Melbourne businesses should decide what to build — and which platform — before spending on a mobile app.',
    readTime: '5 MIN READ',
    content: `
      <h2>The first question is not which platform</h2>
      <p>Before iOS versus Android, the real question is whether you need a native app at all. If people will open it occasionally, a fast mobile website is often cheaper and easier to maintain. A native app earns its cost when you need what a browser cannot do well: offline use, push notifications people actually act on, camera or location features, or daily-use performance. For Melbourne businesses weighing an app, that is where we start the conversation.</p>

      <h2>iOS, Android, or both</h2>
      <p>Once an app genuinely makes sense, the platform choice follows your users, not your preference.</p>
      <ul>
        <li>Both platforms, one codebase — cross-platform frameworks ship iOS and Android together and suit most business apps.</li>
        <li>Native per platform — worth it when you need peak performance or deep device features.</li>
        <li>One platform first — valid when your audience clearly skews to one, and you want to prove the idea before doubling the build.</li>
      </ul>

      <h2>How we build mobile apps in Melbourne</h2>
      <p>We pick the approach that matches your users and budget, build the backend the app depends on, and operate both after launch. Most apps are paired with a system we also build — see <a href="/services/system-development">System Development</a> for the full picture.</p>
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
      'Search engines no longer rank pages by keyword density. They reward content that answers a real question clearly. Here is what that shift means for any business in Melbourne investing in SEO.',
    readTime: '5 MIN READ',
    content: `
      <h2>What actually changed</h2>
      <p>For years, ranking advice centred on keyword density and exact-match phrases. That era is over. Google introduced its BERT language model in 2019 and the MUM model in 2021, both built to understand the intent behind a search rather than match strings of text. The search engine now reads a page the way a person would.</p>
      <p>The practical result: stuffing a page with repeated phrases no longer helps, and often hurts. Google's own guidance on its <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" rel="noopener noreferrer">helpful content</a> documentation is explicit — write for people, not for a keyword count.</p>

      <h2>What technical SEO rewards instead</h2>
      <p>Three things carry weight now. First, content that answers a question completely, in plain language. Second, a clear structure search engines can parse — proper headings, descriptive links, and structured data. Third, a fast, stable page that works on a phone.</p>
      <ul>
        <li>Answer the question directly in the first paragraph, then expand.</li>
        <li>Group related pages into topic clusters and link them together.</li>
        <li>Mark up pages with structured data so engines understand what each page is.</li>
      </ul>

      <h2>How we approach SEO in Melbourne</h2>
      <p>Good SEO is ongoing work, not a one-off audit. We treat it as a retained service: technical fixes, content that earns its rankings, and monthly reporting from Search Console and analytics so you can see what is actually moving. If that is the kind of partnership you are after, our <a href="/services/seo-content">SEO &amp; Content</a> service is built for exactly this — ongoing search work for the businesses we partner with across Melbourne and Australia.</p>
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
      'For most businesses, an off-the-shelf CRM like Salesforce or HubSpot is the right starting point. A custom build only pays off in specific cases. Here is how to tell which one fits, for a Melbourne business.',
    readTime: '5 MIN READ',
    content: `
      <h2>Start with off-the-shelf — usually</h2>
      <p>For most businesses, an established CRM like Salesforce or HubSpot is the right starting point. The features are mature, the cost is predictable, and you are not paying to rebuild solved problems. A custom CRM only makes sense when your process is genuinely unusual and central to how you compete — and that is rarer than most people think. For a Melbourne business, the honest default is to configure something proven before building something new.</p>

      <h2>When custom is the right call</h2>
      <p>There is a real line where off-the-shelf starts costing more than it saves.</p>
      <ul>
        <li>Your workflow does not fit any standard CRM, and you are paying for it in monthly workarounds.</li>
        <li>Per-seat licensing has grown into a number that would fund a build several times over.</li>
        <li>You need the data and logic in your own systems, integrated with everything else you run.</li>
        <li>The CRM is core to your product, not just internal admin.</li>
      </ul>

      <h2>How we help Melbourne businesses decide</h2>
      <p>We are not selling a build for its own sake — a good share of our work is configuring Salesforce or HubSpot properly so a custom CRM is never needed. When the numbers and the workflow genuinely point to custom, we build it to fit. Both sit inside our <a href="/services/system-development">System Development</a> service.</p>
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
      'An ERP replaces a pile of disconnected spreadsheets with one source of truth for the back office. What the project really involves, where it fails, and how we run ERP rollouts for Melbourne businesses.',
    readTime: '5 MIN READ',
    content: `
      <h2>What an ERP actually does</h2>
      <p>An ERP — enterprise resource planning system — is the single system that runs the back office: finance, inventory, purchasing, orders, and reporting, instead of a pile of disconnected spreadsheets and apps. The point is one source of truth: a sale updates stock, accounting, and reporting at once, with no re-keying. For a growing Melbourne business drowning in spreadsheets, that is the problem an ERP solves.</p>

      <h2>What to expect from the project</h2>
      <p>An ERP implementation is a business change project, and it pays to go in with realistic expectations.</p>
      <ul>
        <li>A timeline in months, not weeks — most of it is process mapping and data work, not software setup.</li>
        <li>One business owner who can make process decisions, not just an IT contact.</li>
        <li>Honest data cleanup before migration, not after.</li>
        <li>Training and a settling-in period where the old way runs down gradually.</li>
      </ul>

      <h2>How we run ERP projects in Melbourne</h2>
      <p>Whether it is NetSuite or another platform, we map the workflow first, keep customisation disciplined, and stay on as the team that operates it afterwards. It is part of our <a href="/services/system-development">System Development</a> work. If you are weighing a specific platform, our piece on <a href="/blog/netsuite-implementation-melbourne">what a NetSuite implementation involves</a> goes deeper.</p>
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
      'Most slow websites are slow for a handful of fixable reasons: oversized images, too many third-party scripts, and cheap hosting. Here is how we diagnose and fix page speed for businesses across Melbourne.',
    readTime: '7 MIN READ',
    content: `
      <h2>What actually makes a website slow</h2>
      <p>A slow website usually comes down to a short list of causes. Photos uploaded straight from a phone or camera, weighing several megabytes each. A pile of marketing and tracking scripts that each block the page. Cheap shared hosting that struggles under load. And pages that build entirely in the browser, leaving visitors staring at a blank screen while code runs.</p>

      <h2>Core Web Vitals, in plain terms</h2>
      <p>Google measures real-world speed with a set of signals called Core Web Vitals, and it uses them as a ranking factor. In plain terms they ask three questions: how quickly does the main content appear, how soon can someone interact with the page, and how much does the layout jump around while loading. A page that scores poorly costs you twice — lower rankings, and visitors who leave before the page is usable.</p>
      <ul>
        <li>Compress and correctly size every image before it ships.</li>
        <li>Remove tracking and widget scripts you do not actively use.</li>
        <li>Reserve space for images and embeds so the page does not shift.</li>
        <li>Choose hosting that matches your traffic, not the cheapest plan.</li>
      </ul>

      <h2>How we approach web development in Melbourne</h2>
      <p>Whether a site runs on WordPress, Shopify, Webflow, or a fully custom build, the speed work is the same discipline: optimise images, cut dead weight, cache aggressively, and host it properly. We build and maintain sites this way from the start. You can see the full scope on our <a href="/services/web-development">Web Development</a> page.</p>
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
      'WordPress runs a huge share of the web for good reasons — but it is easy to end up with a slow, fragile, plugin-stuffed site. How to keep a Melbourne WordPress site fast, secure, and low-maintenance.',
    readTime: '5 MIN READ',
    content: `
      <h2>Why WordPress is still a sensible choice</h2>
      <p>WordPress runs a large share of the web for good reasons: you own it, you can edit it yourself, and almost anything is possible with it. The catch is that "anything is possible" also means it is easy to end up with a slow, fragile, plugin-stuffed site. The platform is not the problem — how it is built and maintained is. For Melbourne businesses on WordPress, that distinction is everything.</p>

      <h2>What keeps a WordPress site healthy</h2>
      <p>A WordPress site that stays fast and secure follows a few rules most cheap builds ignore.</p>
      <ul>
        <li>A lean plugin list — every plugin is code someone else maintains and a potential security hole.</li>
        <li>A quality theme or custom build, not a bloated multipurpose template loaded with features you never use.</li>
        <li>Proper hosting, caching, and image handling so pages load fast on a phone.</li>
        <li>Regular updates and backups — an unpatched WordPress site is the most common way small sites get hacked.</li>
      </ul>

      <h2>How we build and run WordPress in Melbourne</h2>
      <p>We build WordPress sites to be fast and low-maintenance, and we keep them that way under our operations service. If you inherited a slow or neglected site, we audit and fix before quoting anything bigger. See our <a href="/services/web-development">Web Development</a> page, or our piece on <a href="/blog/why-your-website-is-slow">why websites get slow</a>.</p>
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
      'HubSpot is approachable and easy to start — and easy to set up carelessly and abandon. What a good HubSpot setup looks like, and how we configure it so Melbourne teams actually use it.',
    readTime: '5 MIN READ',
    content: `
      <h2>Why teams pick HubSpot</h2>
      <p>HubSpot is popular because it is approachable: CRM, marketing, and sales tools in one place, with a free tier to start. For a Melbourne team that has outgrown spreadsheets but does not want the weight of a heavier platform, it is often the right fit. The risk here is not complexity — it is a setup done carelessly, half-used, and quietly abandoned.</p>

      <h2>What a good HubSpot setup looks like</h2>
      <p>The tool is only as useful as the setup behind it.</p>
      <ul>
        <li>Pipelines and stages that match how your team actually sells, not the demo defaults.</li>
        <li>Clean, deduped data from day one, before bad habits set in.</li>
        <li>Only the automation you will maintain — a few reliable workflows beat dozens nobody trusts.</li>
        <li>Integration with your website and other tools so leads flow in without manual entry.</li>
      </ul>

      <h2>How we set up HubSpot in Melbourne</h2>
      <p>We configure HubSpot around your real sales process, connect it to your site, and keep the setup lean enough that the team actually uses it. It is part of our <a href="/services/system-development">System Development</a> work. Not sure whether HubSpot or a custom CRM fits? Our piece on <a href="/blog/custom-crm-vs-off-the-shelf">custom vs off-the-shelf CRM</a> lays out the choice.</p>
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
      'Salesforce can run almost any sales operation, which is exactly why it is so often over-bought and under-used. How to configure it around your real process and get a Melbourne team to actually adopt it.',
    readTime: '5 MIN READ',
    content: `
      <h2>Salesforce is powerful — and easy to over-buy</h2>
      <p>Salesforce can run the sales and service operations of almost any business, which is exactly why it is so often over-bought and under-used. The platform will do far more than most teams need. The job of a good setup is not to switch everything on — it is to configure the part you actually use, cleanly, and leave the rest off. For Melbourne businesses on Salesforce, that restraint is where the value is.</p>

      <h2>Where Salesforce projects need a steady hand</h2>
      <p>The common failure is not a lack of features — it is too many, badly configured.</p>
      <ul>
        <li>Configuration that matches your sales process instead of a generic template.</li>
        <li>Disciplined customisation — every custom field and automation is something to maintain forever.</li>
        <li>Clean data migration, deduped before it lands, not after.</li>
        <li>Adoption — a Salesforce nobody updates is worse than the spreadsheet it replaced.</li>
      </ul>

      <h2>How we work with Salesforce in Melbourne</h2>
      <p>We configure Salesforce around the way your team actually sells, keep customisation tight, and integrate it with the rest of your systems. It is part of our <a href="/services/system-development">System Development</a> service for businesses across Melbourne and Australia.</p>
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
      'An AI support agent is only useful if it answers from your real information and knows when to escalate. This is how we build customer-facing AI for the businesses we partner with in Melbourne.',
    readTime: '6 MIN READ',
    content: `
      <h2>Beyond scripted chatbots</h2>
      <p>The old chatbot followed a rigid decision tree and frustrated everyone who did not fit the script. Modern AI agents are different: they understand a question in plain language, hold a multi-turn conversation, and pull answers from your own knowledge base instead of a fixed menu. The difference customers feel is simple — it actually helps.</p>

      <h2>Accuracy is the whole game</h2>
      <p>An AI agent is only as trustworthy as the information behind it. We connect the agent to your real documents, policies, and product data so it answers from facts rather than guesses. We set clear limits on what it will and will not say, and we make sure it hands off to a person the moment a question goes beyond what it should answer on its own. An agent that confidently invents an answer is worse than no agent at all.</p>
      <ul>
        <li>Ground every answer in your own verified content.</li>
        <li>Define the boundaries of what the agent is allowed to claim.</li>
        <li>Escalate cleanly to a human when confidence is low.</li>
      </ul>

      <h2>AI capability we build into your business</h2>
      <p>This is the core of how we think about AI: not a tool we keep to ourselves, but a capability your customers actually touch. Our own product, OnlyPixAI, is the public proof that we ship AI to real end users. We bring the same approach to <a href="/services/system-development">custom systems</a> for the businesses we partner with — practical AI that fits how your team and customers already work.</p>
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
    content: `
      <h2>What Webflow is good at</h2>
      <p>Webflow sits between a page builder and hand-coded development: it gives designers real control over layout and animation without writing code, and hosts the result on fast infrastructure. For a marketing site that needs to look distinctive and load quickly — and that your team will update occasionally rather than daily — it is an excellent fit. Many Melbourne brands are well served by exactly this.</p>

      <h2>Where Webflow stops fitting</h2>
      <p>Webflow is a website tool, not an everything tool, and it is worth knowing the edges before you commit.</p>
      <ul>
        <li>Heavy e-commerce — once you need complex catalogues or deep integrations, Shopify or a custom build fits better.</li>
        <li>Custom application logic — Webflow is for sites, not for software with accounts, dashboards, and workflows.</li>
        <li>Large content operations — at high page counts, other platforms manage editorial workflows more comfortably.</li>
      </ul>

      <h2>How we use Webflow in Melbourne</h2>
      <p>We build Webflow sites for Melbourne businesses when it is genuinely the best fit, and we say so plainly when it is not — recommending WordPress, Shopify, or a custom build instead. The platform should fit the job, not the other way around. See our <a href="/services/web-development">Web Development</a> page.</p>
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
