'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/animation/reduced-motion';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { getHomepageHighlights } from '@/lib/data/case-studies';
import { WorkCard } from '@/components/work/WorkCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Bento layout span for each of the eight curated highlight cards.
// Four rows of two with alternating widths (7+5 / 5+7 / 6+6 / 7+5) so the
// rail stays editorial rather than a uniform grid. Tweak the array to
// reshuffle without touching the rendering loop.
const BENTO_SPANS = [
  'md:col-span-7',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-7',
  'md:col-span-6',
  'md:col-span-6',
  'md:col-span-7',
  'md:col-span-5'
];

// Homepage "Selected work" rail. Renders the owner-curated set of
// highlight projects exposed by getHomepageHighlights() — currently
// the eight flagship cases — using the same WorkCard component the
// /work index uses, so the visual vocabulary on home and /work stays
// in lock-step.
export const CaseStudySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const highlights = getHomepageHighlights();
  const isEmpty = highlights.length === 0;

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (prefersReducedMotion()) return; // CLAUDE.md §8

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.home-work-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }
      });

      const cards = gsap.utils.toArray<HTMLElement>('.home-work-card');
      if (cards.length) {
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          stagger: 0.07,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 70%' }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-brand-black text-brand-text overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12 pt-20 md:pt-24 pb-20 md:pb-28">
        {/* Header — kicker + italic serif h2 + lede + "View all" link */}
        <div className="home-work-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16 border-b border-white/10 pb-8 md:pb-10">
          <div>
            <span className="text-brand-yellow text-xs font-mono tracking-[0.25em] uppercase mb-3 block">
              Selected work
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic leading-[1.05]">
              Work we&apos;re proud of
            </h2>
            <p className="text-brand-muted text-base md:text-lg max-w-2xl leading-relaxed mt-5">
              A handful of flagship engagements — the ones where Pixdyne built
              the customer-facing surface, the internal operating system, and
              kept both running together over years.
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 self-start md:self-auto text-xs font-mono uppercase tracking-[0.2em] text-brand-text hover:text-brand-yellow transition-colors"
          >
            View all work
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {/* Bento layout for the eight curated highlights. 12-col grid
            with asymmetric col-spans so cards vary in width row by row,
            keeping the rail visually alive (the /work index uses a
            uniform 3-col grid; this surface is the deliberate counter-
            point). Mobile collapses to a single column. */}
        {isEmpty ? (
          <div className="mx-auto max-w-md text-center border border-white/10 bg-white/[0.02] rounded-2xl p-8 text-brand-muted text-sm">
            Highlight case studies are still being put together.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {highlights.map((project, i) => (
              <div key={project.id} className={`home-work-card ${BENTO_SPANS[i] ?? 'md:col-span-4'}`}>
                <WorkCard caseStudy={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
