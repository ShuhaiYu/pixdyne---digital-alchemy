'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/data/blog';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const BlogSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const posts = getAllBlogPosts();

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.blog-row', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="h-full w-full flex flex-col p-4 pt-20 sm:p-6 sm:pt-24 md:p-8 md:pt-24 lg:p-12 lg:pt-28 bg-white text-black">
      <div className="flex justify-between items-end mb-8 sm:mb-12 md:mb-16">
        <div>
          <span className="text-yellow-600 font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-1 sm:mb-2 block">/// Insights_Log</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif italic">Journal</h2>
        </div>
        <Link href="/blog" className="hidden md:flex items-center gap-2 text-sm font-bold border-b border-black pb-1 hover:text-yellow-600 hover:border-yellow-600 transition-colors">
          VIEW ALL ARTICLES <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="flex flex-col border-t border-black/20">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="blog-row group flex flex-col lg:flex-row lg:items-baseline py-6 sm:py-8 md:py-10 lg:py-12 border-b border-black/20 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="w-full lg:w-1/4 mb-3 sm:mb-4 lg:mb-0">
              <span className="font-mono text-[10px] sm:text-xs text-gray-500 block mb-1">{post.date}</span>
              <span className="font-mono text-[10px] text-yellow-600 border border-yellow-600/30 px-2 py-0.5 rounded">{post.category}</span>
            </div>

            <div className="w-full lg:w-1/2 mb-3 sm:mb-4 lg:mb-0">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif group-hover:text-yellow-600 transition-colors duration-300">
                {post.title}
              </h3>
            </div>

            <div className="w-full lg:w-1/4 flex justify-between lg:justify-end items-center gap-4">
              <span className="text-[10px] sm:text-xs font-sans text-gray-400">{post.readTime}</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-yellow-500 group-hover:border-yellow-500 group-hover:text-white transition-all transform group-hover:-rotate-45">
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="md:hidden mt-8 text-center">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold border-b border-black pb-1">
          VIEW ALL ARTICLES <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
};
