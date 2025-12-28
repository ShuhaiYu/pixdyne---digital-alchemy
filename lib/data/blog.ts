import { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'death-of-keywords-semantic-search',
    date: 'OCT 12, 2024',
    category: 'TECHNICAL SEO',
    title: 'The Death of Keywords: Semantic Search Dominance',
    excerpt: 'How Google\'s understanding of search intent is revolutionizing SEO strategy and why traditional keyword stuffing is officially dead.',
    readTime: '5 MIN READ',
    content: `
      <h2>The Evolution of Search</h2>
      <p>For years, SEO professionals have obsessed over keyword density, exact-match phrases, and meta tag optimization. But Google's algorithms have evolved far beyond simple pattern matching.</p>

      <h2>Understanding Semantic Search</h2>
      <p>Semantic search focuses on understanding the intent behind a query, not just the words used. Google's BERT and MUM models can now understand context, synonyms, and even the nuances of natural language.</p>

      <h2>What This Means for Your Strategy</h2>
      <p>Instead of targeting specific keywords, focus on creating comprehensive content that answers user questions thoroughly. Topic clusters and entity-based SEO are the new paradigm.</p>
    `,
    seoTitle: 'The Death of Keywords: Semantic Search Dominance | Pixdyne Blog',
    seoDescription: 'Learn how semantic search is changing SEO strategy and why traditional keyword optimization is becoming obsolete.'
  },
  {
    id: 2,
    slug: 'nextjs-performance-optimization',
    date: 'SEP 28, 2024',
    category: 'WEB DEVELOPMENT',
    title: 'Why Your Next.js App is Slow (And How to Fix It)',
    excerpt: 'Common performance pitfalls in Next.js applications and proven strategies to achieve sub-second load times.',
    readTime: '8 MIN READ',
    content: `
      <h2>The Hidden Costs of Client-Side Rendering</h2>
      <p>Many developers default to client-side rendering without considering the performance implications. Large JavaScript bundles, waterfalls of API calls, and layout shifts can devastate your Core Web Vitals.</p>

      <h2>Server Components: The Game Changer</h2>
      <p>React Server Components in Next.js 13+ allow you to render components on the server, reducing JavaScript sent to the client by up to 70%.</p>

      <h2>Optimization Checklist</h2>
      <ul>
        <li>Use dynamic imports for heavy components</li>
        <li>Implement image optimization with next/image</li>
        <li>Enable ISR for frequently updated content</li>
        <li>Minimize third-party scripts</li>
      </ul>
    `,
    seoTitle: 'Why Your Next.js App is Slow (And How to Fix It) | Pixdyne Blog',
    seoDescription: 'Discover common Next.js performance issues and learn proven optimization strategies for sub-second load times.'
  },
  {
    id: 3,
    slug: 'autonomous-support-agents-llms',
    date: 'SEP 15, 2024',
    category: 'AI INTEGRATION',
    title: 'Building Autonomous Support Agents with LLMs',
    excerpt: 'A practical guide to implementing AI-powered customer support that actually works and scales.',
    readTime: '6 MIN READ',
    content: `
      <h2>Beyond Chatbots</h2>
      <p>Traditional chatbots follow rigid decision trees. Modern LLM-powered agents can understand context, access knowledge bases, and handle complex multi-turn conversations.</p>

      <h2>Architecture for Scale</h2>
      <p>We'll explore a production-ready architecture using RAG (Retrieval Augmented Generation), vector databases, and guardrails to ensure reliable, accurate responses.</p>

      <h2>Implementation Considerations</h2>
      <p>From prompt engineering to fallback strategies, learn the practical techniques that separate toy demos from production systems handling thousands of queries daily.</p>
    `,
    seoTitle: 'Building Autonomous Support Agents with LLMs | Pixdyne Blog',
    seoDescription: 'Learn how to build scalable AI-powered customer support agents using LLMs and RAG architecture.'
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
