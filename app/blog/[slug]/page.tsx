import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getBlogPostBySlug, getBlogSlugs } from '@/lib/data/blog';
import { generateBlogPostSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found'
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://pixdyne.com/blog/${slug}`,
      publishedTime: post.date,
      authors: ['Pixdyne'],
      images: [{
        url: `/og/blog/${slug}.jpg`,
        width: 1200,
        height: 630
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt
    },
    alternates: {
      canonical: `https://pixdyne.com/blog/${slug}`
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://pixdyne.com' },
    { name: 'Blog', url: 'https://pixdyne.com/blog' },
    { name: post.title, url: `https://pixdyne.com/blog/${slug}` }
  ];

  return (
    <>
      <Script
        id="blogpost-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogPostSchema(post))
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
        }}
      />

      <article className="min-h-screen bg-brand-white text-brand-black pt-24 pb-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-sm text-brand-muted hover:text-brand-yellow-hover mb-12 transition-colors w-fit"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </Link>

          <header className="mb-12 border-b border-brand-black/10 pb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs text-brand-muted">{post.date}</span>
              <span className="font-mono text-xs text-brand-yellow border border-brand-yellow/30 px-2 py-0.5 rounded">
                {post.category}
              </span>
              <span className="text-xs text-brand-muted">{post.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif italic leading-tight">
              {post.title}
            </h1>
            <p className="mt-6 text-xl text-brand-black/70 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          <div
            className="prose prose-lg max-w-[65ch] prose-headings:font-serif prose-headings:italic prose-a:text-brand-yellow prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />

          <footer className="mt-16 pt-8 border-t border-brand-black/10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-brand-muted">Written by</span>
                <p className="text-lg font-bold">Pixdyne Team</p>
              </div>
              <Link
                href="/blog"
                className="text-sm uppercase tracking-wider text-brand-yellow hover:text-brand-black transition-colors"
              >
                More Articles →
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </>
  );
}
