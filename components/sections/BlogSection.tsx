'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/animation/reduced-motion';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/data/blog';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const BlogSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Homepage Journal teases only the four most recent posts; the fifth row is a
  // "more" entry into /blog rather than a real article (CLAUDE.md §10 IA).
  const posts = getAllBlogPosts().slice(0, 4);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (prefersReducedMotion()) return; // CLAUDE.md §8

    const section = sectionRef.current;
    if (!section) return;

    if (isMobile) {
      // On mobile, use IntersectionObserver
      const rows = section.querySelectorAll('.blog-row');
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            gsap.from(rows, {
              y: 30,
              opacity: 0,
              stagger: 0.08,
              duration: 0.6,
            });
            observer.unobserve(section);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(section);
      return () => observer.disconnect();
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.blog-row', {
        y: 25,
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
  }, [isMobile]);

  return (
    <div ref={sectionRef} className="h-full w-full flex flex-col p-4 pt-20 sm:p-6 sm:pt-24 md:p-8 md:pt-24 lg:p-12 lg:pt-28 bg-brand-white text-black">
      <div className="flex justify-between items-end mb-8 sm:mb-12 md:mb-16">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif italic leading-tight">Journal</h2>
        </div>
        <Link href="/blog" className="hidden md:flex items-center gap-2 text-sm font-bold border-b border-black pb-1 hover:text-brand-yellow-hover hover:border-brand-yellow-hover transition-colors">
          VIEW ALL ARTICLES <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="flex flex-col border-t border-brand-black/20">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            // No aria-label: the row's own text (date, category, title,
            // read time) is the accessible name. A "Read article:" label
            // failed WCAG 2.5.3 label-in-name because it dropped the
            // visible row text.
            className="blog-row group flex flex-col lg:flex-row lg:items-baseline py-6 sm:py-8 md:py-10 lg:py-12 border-b border-brand-black/20 cursor-pointer hover:bg-brand-black/[0.03] transition-colors"
          >
            <div className="w-full lg:w-1/4 mb-3 sm:mb-4 lg:mb-0">
              {/* This section sits on bg-brand-white: brand-muted (3.3:1)
                  and brand-yellow (2.4:1) both fail WCAG here, hence
                  black/70 + the light-surface yellow-deep token. */}
              <span className="font-mono text-xs text-brand-black/70 block mb-1">{post.date}</span>
              <span className="font-mono text-xs text-brand-yellow-deep border border-brand-yellow-deep/40 px-2 py-0.5 rounded">{post.category}</span>
            </div>

            <div className="w-full lg:w-1/2 mb-3 sm:mb-4 lg:mb-0">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif group-hover:text-brand-yellow-hover transition-colors duration-300">
                {post.title}
              </h3>
            </div>

            <div className="w-full lg:w-1/4 flex justify-between lg:justify-end items-center gap-4">
              <span className="text-xs font-sans text-brand-black/70">{post.readTime}</span>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-brand-black/20 flex items-center justify-center group-hover:bg-brand-yellow-hover group-hover:border-brand-yellow-hover group-hover:text-brand-black transition-all transform group-hover:-rotate-45" aria-hidden="true">
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        ))}

        <Link
          href="/blog"
          // No aria-label: "More articles" (the visible text) is the
          // accessible name — WCAG 2.5.3 label-in-name.
          className="blog-row group flex items-center justify-center gap-3 py-6 sm:py-8 md:py-10 border-b border-brand-black/20 cursor-pointer hover:bg-brand-black/[0.03] transition-colors"
        >
          <span className="font-serif text-2xl sm:text-3xl leading-none text-brand-muted group-hover:text-brand-yellow-hover transition-colors duration-300" aria-hidden="true">···</span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest group-hover:text-brand-yellow-hover transition-colors">More articles</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};
