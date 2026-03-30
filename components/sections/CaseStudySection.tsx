'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { getAllCaseStudies } from '@/lib/data/case-studies';
import BentoCard from '@/components/BentoCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const CaseStudySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const allCases = getAllCaseStudies();
  const [isMobile, setIsMobile] = useState(false);

  // Select 6 projects for bento layout
  const featuredCase = allCases.find(c => c.slug === 'jusn-design')!;
  const smallCases = allCases.filter(c => c.slug !== 'jusn-design').slice(0, 5);

  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const grid = gridRef.current;
    const spotlight = spotlightRef.current;
    if (!grid || !spotlight) return;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!gridRef.current || !spotlightRef.current) return;
        const rect = gridRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spotlightRef.current.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(200, 150, 42, 0.06), transparent 40%)`;
      });
    };

    const handleEnter = () => { spotlight.style.opacity = '1'; };
    const handleLeave = () => { spotlight.style.opacity = '0'; };

    grid.addEventListener('mousemove', handleMouseMove);
    grid.addEventListener('mouseenter', handleEnter);
    grid.addEventListener('mouseleave', handleLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      grid.removeEventListener('mousemove', handleMouseMove);
      grid.removeEventListener('mouseenter', handleEnter);
      grid.removeEventListener('mouseleave', handleLeave);
    };
  }, [isMobile]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    if (isMobile) {
      // On mobile, use IntersectionObserver for reliable animation triggering
      const cards = container.querySelectorAll('.bento-card');
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            gsap.from(cards, {
              y: 40,
              opacity: 0,
              stagger: 0.08,
              duration: 0.6,
              ease: 'power3.out',
            });
            observer.unobserve(container);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(container);
      return () => observer.disconnect();
    }

    // Desktop: use ScrollTrigger
    const ctx = gsap.context(() => {
      gsap.from('.bento-card', {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div ref={containerRef} className="min-h-screen md:h-screen w-full p-3 pt-20 sm:p-4 sm:pt-16 md:p-6 md:pt-20 flex flex-col bg-brand-black overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-end mb-3 sm:mb-4 border-b border-white/20 pb-2 sm:pb-3 flex-shrink-0">
        <div>
          <span className="text-brand-yellow text-xs font-mono font-bold tracking-wider mb-1 block">
            Work
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-white leading-tight">Selected Works</h2>
        </div>
        <Link
          href="/work"
          className="text-xs font-mono uppercase hover:text-brand-yellow-hover transition-colors text-white/70 flex items-center gap-2 group"
        >
          View All
          <svg
            className="w-3 h-3 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Bento Grid */}
      <div
        ref={gridRef}
        className="relative flex-1 grid grid-cols-12 gap-2 sm:gap-3 md:gap-4 auto-rows-fr"
        style={{ gridTemplateRows: 'repeat(3, minmax(100px, 1fr))' }}
      >
        {/* Global Spotlight Effect — updated via ref, no re-renders */}
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{ opacity: 0 }}
        />

        {/* Left column - small cards */}
        <div className="bento-card col-span-6 md:col-span-4 row-span-1">
          <BentoCard caseStudy={{...smallCases[0], cardSize: 'small'}} className="h-full" />
        </div>
        <div className="bento-card col-span-6 md:col-span-4 row-span-1">
          <BentoCard caseStudy={{...smallCases[1], cardSize: 'small'}} className="h-full" />
        </div>

        {/* Right - featured, spans 2 rows */}
        <div className="bento-card col-span-12 md:col-span-4 row-span-2 md:row-start-1">
          <BentoCard caseStudy={{...featuredCase, cardSize: 'featured'}} className="h-full" />
        </div>

        {/* Middle row */}
        <div className="bento-card col-span-6 md:col-span-4 row-span-1">
          <BentoCard caseStudy={{...smallCases[2], cardSize: 'small'}} className="h-full" />
        </div>
        <div className="bento-card col-span-6 md:col-span-4 row-span-1">
          <BentoCard caseStudy={{...smallCases[3], cardSize: 'small'}} className="h-full" />
        </div>

        {/* Bottom row */}
        <div className="bento-card col-span-12 md:col-span-8 row-span-1">
          <BentoCard caseStudy={{...smallCases[4], cardSize: 'wide'}} className="h-full" />
        </div>
        <div className="bento-card col-span-12 md:col-span-4 row-span-1 hidden md:block">
          <div className="h-full rounded-2xl bg-neutral-900/50 border border-white/10 flex items-center justify-center">
            <Link
              href="/work"
              className="flex flex-col items-center gap-3 text-white/60 hover:text-brand-yellow-hover transition-colors group"
            >
              <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center group-hover:bg-brand-yellow-hover group-hover:border-brand-yellow-hover group-hover:text-black transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <span className="text-xs font-mono uppercase">View All</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom link - Mobile */}
      <div className="text-center pt-3 pb-1 flex-shrink-0 md:hidden">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-white/60 hover:text-brand-yellow-hover transition-colors text-xs font-mono"
        >
          Explore all projects →
        </Link>
      </div>
    </div>
  );
};
