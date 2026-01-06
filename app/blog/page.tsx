import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/data/blog';

export const metadata: Metadata = {
  title: 'Journal | Pixdyne',
  description: 'Insights on web development, SEO, and digital strategy from the Pixdyne team.',
  openGraph: {
    title: 'Journal | Pixdyne',
    description: 'Insights on web development, SEO, and digital strategy from the Pixdyne team.',
    url: 'https://pixdyne.com/blog',
  },
  alternates: {
    canonical: 'https://pixdyne.com/blog'
  }
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-white text-black pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-yellow-600 mb-12 transition-colors w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          BACK_TO_HOME
        </Link>

        {/* Header */}
        <div className="mb-16">
          <span className="text-yellow-600 font-mono text-xs uppercase tracking-widest mb-2 block">
            /// Insights_Log
          </span>
          <h1 className="text-5xl md:text-7xl font-serif italic">Journal</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Thoughts on web development, technical SEO, and building digital products that matter.
          </p>
        </div>

        {/* Blog Posts List */}
        <div className="flex flex-col border-t border-black/20">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col md:flex-row items-baseline py-8 md:py-12 border-b border-black/20 cursor-pointer hover:bg-gray-50 transition-colors -mx-4 px-4"
            >
              <div className="w-full md:w-1/4 mb-4 md:mb-0">
                <span className="font-mono text-xs text-gray-500 block mb-1">{post.date}</span>
                <span className="font-mono text-[10px] text-yellow-600 border border-yellow-600/30 px-2 py-0.5 rounded">
                  {post.category}
                </span>
              </div>

              <div className="w-full md:w-1/2 mb-4 md:mb-0">
                <h2 className="text-2xl md:text-4xl font-serif group-hover:text-yellow-600 transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="mt-2 text-gray-500 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              <div className="w-full md:w-1/4 flex justify-between md:justify-end items-center gap-4">
                <span className="text-xs font-sans text-gray-400">{post.readTime}</span>
                <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-yellow-500 group-hover:border-yellow-500 group-hover:text-white transition-all transform group-hover:-rotate-45">
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-black/10 text-center">
          <p className="text-sm text-gray-500 font-mono">
            More articles coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
