import { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
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
      <p>Good SEO is ongoing work, not a one-off audit. We treat it as a retained service: technical fixes, content that earns its rankings, and monthly reporting from Search Console and analytics so you can see what is actually moving. If that is the kind of partnership you are after, our <a href="/services/operations">Operations</a> service covers SEO and content for the businesses we work with across Melbourne and Australia.</p>
    `,
    seoTitle: 'Keyword Stuffing Is Dead: Modern Technical SEO',
    seoDescription:
      'Search engines reward clear answers, not keyword density. What technical SEO looks like now for businesses in Melbourne.'
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
