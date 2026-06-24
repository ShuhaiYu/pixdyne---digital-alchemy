import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/data/blog';
import { generateCollectionPageSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Notes on web development, technical SEO, and building digital products — from the Melbourne team that has shipped them since 2018.',
  openGraph: {
    title: 'Journal | Pixdyne',
    description:
      'Notes on web development, technical SEO, and digital products from the Pixdyne team.',
    url: 'https://pixdyne.com/blog',
    images: [{ url: '/og-image.png', width: 1080, height: 1080, alt: 'Pixdyne Journal' }]
  },
  twitter: {
    card: 'summary',
    title: 'Journal | Pixdyne',
    description: 'Notes on web development, SEO, and digital products.'
  },
  alternates: {
    canonical: 'https://pixdyne.com/blog'
  }
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  const collectionSchema = generateCollectionPageSchema({
    url: 'https://pixdyne.com/blog',
    name: 'Journal — Pixdyne',
    description:
      'Notes on web development, technical SEO, and building digital products from the Pixdyne team in Melbourne.',
    items: posts.map((post) => ({
      name: post.title,
      url: `https://pixdyne.com/blog/${post.slug}`
    }))
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pixdyne.com' },
    { name: 'Journal', url: 'https://pixdyne.com/blog' }
  ]);

  return (
    <>
      <script
        id="blog-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        id="blog-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-brand-white text-brand-black pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm text-brand-muted hover:text-brand-yellow-hover mb-12 transition-colors w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-16">
          <span className="text-brand-yellow font-mono text-xs uppercase tracking-wider mb-2 block">
            Blog
          </span>
          <h1 className="text-5xl md:text-7xl font-serif italic">Journal</h1>
          <p className="mt-4 text-lg text-brand-black/70 max-w-2xl">
            Thoughts on web development, technical SEO, and building digital products that matter.
          </p>
        </div>

        {/* Blog Posts List */}
        <div className="flex flex-col border-t border-brand-black/20">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col md:flex-row md:items-center gap-5 md:gap-8 py-8 border-b border-brand-black/20 cursor-pointer hover:bg-brand-black/[0.03] transition-colors -mx-4 px-4"
            >
              {/* Generated brand cover thumbnail (same PNG as the post hero +
                  social card). Lazy below the fold; explicit ratio avoids CLS. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/blog/${post.slug}/opengraph-image`}
                width={1200}
                height={630}
                alt={`${post.title} — Pixdyne, Melbourne`}
                loading="lazy"
                className="w-full md:w-64 md:shrink-0 h-auto aspect-[1200/630] object-cover rounded-lg border border-brand-black/10"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-brand-muted">{post.date}</span>
                  <span className="font-mono text-xs text-brand-yellow border border-brand-yellow/30 px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif group-hover:text-brand-yellow-hover transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="mt-2 text-brand-muted text-sm line-clamp-2 max-w-2xl">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 text-brand-muted">
                  <span className="text-xs font-sans uppercase tracking-wider">{post.readTime}</span>
                  <ArrowRight
                    size={16}
                    className="text-brand-yellow group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-brand-black/10 text-center">
          <p className="text-sm italic font-serif text-brand-muted">
            More articles coming soon.
          </p>
        </div>
      </div>
      </div>
    </>
  );
}
