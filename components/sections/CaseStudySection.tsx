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

  // 选择6个项目用于 Bento 布局
  const featuredCase = allCases.find(c => c.slug === 'jusn-design')!;
  const smallCases = allCases.filter(c => c.slug !== 'jusn-design').slice(0, 5);

  // Spotlight state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const rect = gridRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener('mousemove', handleMouseMove);
      grid.addEventListener('mouseenter', () => setIsHovering(true));
      grid.addEventListener('mouseleave', () => setIsHovering(false));
    }

    return () => {
      if (grid) {
        grid.removeEventListener('mousemove', handleMouseMove);
        grid.removeEventListener('mouseenter', () => setIsHovering(true));
        grid.removeEventListener('mouseleave', () => setIsHovering(false));
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

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
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full p-4 pt-16 md:p-6 md:pt-20 flex flex-col bg-black overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-end mb-4 border-b border-white/20 pb-3 flex-shrink-0">
        <div>
          <span className="text-yellow-500 text-xs font-mono tracking-wider mb-1 block">
            PORTFOLIO
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-white">Selected Works</h2>
        </div>
        <Link
          href="/work"
          className="text-xs font-mono uppercase hover:text-yellow-500 transition-colors text-white/70 flex items-center gap-2 group"
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

      {/* Bento Grid - 经典不对称布局 */}
      <div
        ref={gridRef}
        className="relative flex-1 grid grid-cols-12 gap-3 md:gap-4"
        style={{ gridTemplateRows: 'repeat(3, 1fr)' }}
      >
        {/* Global Spotlight Effect */}
        {isHovering && (
          <div
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
            style={{
              background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(234, 179, 8, 0.06), transparent 40%)`,
            }}
          />
        )}

        {/* 左列 - 3个小卡片 */}
        <div className="bento-card col-span-6 md:col-span-4 row-span-1">
          <BentoCard caseStudy={{...smallCases[0], cardSize: 'small'}} className="h-full" />
        </div>
        <div className="bento-card col-span-6 md:col-span-4 row-span-1">
          <BentoCard caseStudy={{...smallCases[1], cardSize: 'small'}} className="h-full" />
        </div>

        {/* 右侧 Featured - 跨2行 */}
        <div className="bento-card col-span-12 md:col-span-4 row-span-2 md:row-start-1">
          <BentoCard caseStudy={{...featuredCase, cardSize: 'featured'}} className="h-full" />
        </div>

        {/* 中间行 */}
        <div className="bento-card col-span-6 md:col-span-4 row-span-1">
          <BentoCard caseStudy={{...smallCases[2], cardSize: 'small'}} className="h-full" />
        </div>
        <div className="bento-card col-span-6 md:col-span-4 row-span-1">
          <BentoCard caseStudy={{...smallCases[3], cardSize: 'small'}} className="h-full" />
        </div>

        {/* 底部行 */}
        <div className="bento-card col-span-12 md:col-span-8 row-span-1">
          <BentoCard caseStudy={{...smallCases[4], cardSize: 'wide'}} className="h-full" />
        </div>
        <div className="bento-card col-span-12 md:col-span-4 row-span-1 hidden md:block">
          <div className="h-full rounded-2xl bg-neutral-900/50 border border-white/10 flex items-center justify-center">
            <Link
              href="/work"
              className="flex flex-col items-center gap-3 text-white/60 hover:text-yellow-500 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center group-hover:bg-yellow-500 group-hover:border-yellow-500 group-hover:text-black transition-all">
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
          className="inline-flex items-center gap-2 text-white/60 hover:text-yellow-500 transition-colors text-xs font-mono"
        >
          Explore all projects →
        </Link>
      </div>
    </div>
  );
};
