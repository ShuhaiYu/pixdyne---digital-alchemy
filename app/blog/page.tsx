import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/data/blog';

export const metadata: Metadata = {
  title: 'Journal | Pixdyne',
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

  return (
    <div className="min-h-screen bg-brand-white text-brand-black pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-mono text-brand-muted hover:text-brand-yellow-hover mb-12 transition-colors w-fit"
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
              className="group flex flex-col md:flex-row items-baseline py-8 md:py-12 border-b border-brand-black/20 cursor-pointer hover:bg-brand-black/[0.03] transition-colors -mx-4 px-4"
            >
              <div className="w-full md:w-1/4 mb-4 md:mb-0">
                <span className="font-mono text-xs text-brand-muted block mb-1">{post.date}</span>
                <span className="font-mono text-xs text-brand-yellow border border-brand-yellow/30 px-2 py-0.5 rounded">
                  {post.category}
                </span>
              </div>

              <div className="w-full md:w-1/2 mb-4 md:mb-0">
                <h2 className="text-2xl md:text-4xl font-serif group-hover:text-brand-yellow-hover transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="mt-2 text-brand-muted text-sm line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              <div className="w-full md:w-1/4 flex justify-between md:justify-end items-center gap-4">
                <span className="text-xs font-sans text-brand-muted">{post.readTime}</span>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-brand-black/20 flex items-center justify-center group-hover:bg-brand-yellow-hover group-hover:border-brand-yellow-hover group-hover:text-brand-black transition-all transform group-hover:-rotate-45">
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-brand-black/10 text-center">
          <p className="text-sm text-brand-muted font-mono">
            More articles coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
