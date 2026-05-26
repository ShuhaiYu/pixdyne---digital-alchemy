'use client';

import { useRef, useLayoutEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CaseStudyItem } from '@/types';
import { WorkCard } from '@/components/work/WorkCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface WorkPageClientProps {
  caseStudies: CaseStudyItem[];
}

// Capability filter. "All" surfaces every project; the four named tabs
// filter the masonry to projects that carry that capability in their
// `services` field. Tab labels match the canonical capability strings
// (and the four /services detail pages).
type CapabilityFilter = 'All' | 'Web Development' | 'System Development' | 'Managed IT' | 'SEO & Content';

const CAPABILITY_TABS: CapabilityFilter[] = [
  'All',
  'Web Development',
  'System Development',
  'Managed IT',
  'SEO & Content'
];

export default function WorkPageClient({ caseStudies }: WorkPageClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isEmpty = caseStudies.length === 0;

  const [active, setActive] = useState<CapabilityFilter>('All');

  // Visible set = filter by selected capability, then sort so featured
  // projects land at the top of the masonry (the CSS columns engine
  // fills top-to-bottom in DOM order).
  const visible = useMemo(() => {
    const filtered =
      active === 'All'
        ? caseStudies
        : caseStudies.filter((c) => c.services?.includes(active));
    return [...filtered].sort(
      (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
    );
  }, [active, caseStudies]);

  // Count per tab — surfaced in the tab label so a filter that returns
  // nothing is visible before the user clicks.
  const counts = useMemo(() => {
    const result: Record<CapabilityFilter, number> = {
      All: caseStudies.length,
      'Web Development': 0,
      'System Development': 0,
      'Managed IT': 0,
      'SEO & Content': 0
    };
    for (const c of caseStudies) {
      for (const svc of c.services ?? []) {
        if (svc in result) {
          result[svc as CapabilityFilter] += 1;
        }
      }
    }
    return result;
  }, [caseStudies]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.work-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      const cards = gsap.utils.toArray<HTMLElement>('.work-card');
      if (cards.length) {
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          stagger: 0.06,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-brand-black text-brand-text">
      {/* Header */}
      <div className="pt-32 pb-12 px-4 md:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-text transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          Back to Home
        </Link>

        <div className="work-header border-b border-white/20 pb-8">
          <span className="text-brand-yellow text-xs font-mono tracking-wider mb-2 block">
            SELECTED CASE STUDIES
          </span>
          <h1 className="text-5xl md:text-7xl font-serif italic mb-4">Our Work</h1>
          <p className="text-brand-muted text-lg max-w-2xl leading-relaxed">
            Selected projects from Pixdyne — websites, custom systems, and ongoing
            operations. Built and operated alongside our clients since 2018.
          </p>
        </div>
      </div>

      {/* Capability filter — sits between the header and the masonry.
          Five tabs (All + four service lines). Each tab carries its
          count so empty results are visible before the click. */}
      <div className="px-4 md:px-12 pb-10 md:pb-14">
        <div
          className="flex flex-wrap items-center gap-2 md:gap-3 border-b border-white/10 pb-6 md:pb-8"
          role="tablist"
          aria-label="Filter by capability"
        >
          {CAPABILITY_TABS.map((tab) => {
            const isActive = active === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab)}
                className={
                  'group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors ' +
                  (isActive
                    ? 'border-brand-yellow bg-brand-yellow text-brand-black'
                    : 'border-white/15 text-brand-muted hover:border-brand-yellow/50 hover:text-brand-text')
                }
              >
                <span>{tab}</span>
                <span
                  className={
                    'inline-flex items-center justify-center min-w-5 rounded-full px-1.5 text-[10px] ' +
                    (isActive
                      ? 'bg-brand-black/15 text-brand-black'
                      : 'bg-white/5 text-brand-muted group-hover:bg-white/10')
                  }
                >
                  {counts[tab]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty state vs. masonry */}
      <div className="px-4 md:px-12 pb-24">
        {isEmpty ? (
          <div className="mx-auto max-w-2xl text-center border border-white/10 bg-white/[0.02] rounded-2xl p-10 md:p-16 mt-8">
            <span className="text-brand-yellow text-xs font-mono tracking-widest uppercase block mb-3">
              Coming soon
            </span>
            <h2 className="text-2xl md:text-3xl font-serif italic text-brand-text mb-4 leading-tight">
              Real client work, on the way
            </h2>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto">
              We are putting together a set of case studies that fairly represent
              the work, the constraints, and the people involved. Until that is
              ready, we would rather show nothing than show filler.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-brand-yellow text-brand-yellow text-xs uppercase tracking-widest rounded-full hover:bg-brand-yellow hover:text-brand-black transition-colors"
            >
              Talk to us in the meantime
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        ) : visible.length === 0 ? (
          <div className="mx-auto max-w-md text-center border border-white/10 bg-white/[0.02] rounded-2xl p-8 mt-4 text-brand-muted text-sm">
            No projects under <span className="text-brand-text font-medium">{active}</span> yet.
            <button
              type="button"
              onClick={() => setActive('All')}
              className="ml-2 text-brand-yellow hover:underline"
            >
              Show all
            </button>
          </div>
        ) : (
          // Uniform grid — every card lands the same size in its row.
          // `auto-rows-fr` stretches each row to the tallest card so
          // cards in the same row are visually flush. Featured-first
          // sort still applies (DOM order).
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {visible.map((project) => (
              <div key={project.id} className="work-card">
                <WorkCard caseStudy={project} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact CTA */}
      <div className="border-t border-white/20 px-4 md:px-12 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-serif italic mb-4">
          Have a project in mind?
        </h2>
        <p className="text-brand-muted mb-8 max-w-xl mx-auto">
          Send us a brief and we will come back with a scope, timeline, and quote.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-yellow text-brand-black font-medium rounded-full hover:bg-brand-yellow-hover transition-colors"
        >
          Start a Conversation
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </main>
  );
}
