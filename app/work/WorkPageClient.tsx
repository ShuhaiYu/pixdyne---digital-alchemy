'use client';

import { useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CaseStudyItem } from '@/types';
import BentoCard from '@/components/BentoCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface WorkPageClientProps {
  caseStudies: CaseStudyItem[];
}

export default function WorkPageClient({ caseStudies }: WorkPageClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isEmpty = caseStudies.length === 0;

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.work-card, .work-empty', {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-brand-black text-white">
      {/* Header */}
      <div className="pt-32 pb-12 px-4 md:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to Home
        </Link>

        <div className="border-b border-white/20 pb-8">
          <span className="text-brand-yellow text-xs font-mono tracking-wider mb-2 block">
            SELECTED CASE STUDIES
          </span>
          <h1 className="text-5xl md:text-7xl font-serif italic mb-4">Our Work</h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
            Selected projects from Pixdyne — websites, custom systems, and ongoing
            operations. Built and operated alongside our clients since 2018.
          </p>
        </div>
      </div>

      {/* Body — empty state vs. grid */}
      <div ref={containerRef} className="px-4 md:px-12 pb-24">
        {isEmpty ? (
          <div className="work-empty mx-auto max-w-2xl text-center border border-white/10 bg-white/[0.02] rounded-2xl p-10 md:p-16 mt-8">
            <span className="text-brand-yellow text-xs font-mono tracking-widest uppercase block mb-3">
              Coming soon
            </span>
            <h2 className="text-2xl md:text-3xl font-serif italic text-white mb-4 leading-tight">
              Real client work, on the way
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto">
              We are putting together a set of case studies that fairly represent
              the work, the constraints, and the people involved. Until that is
              ready, we would rather show nothing than show filler.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-brand-yellow text-brand-yellow font-mono text-xs uppercase tracking-widest rounded-full hover:bg-brand-yellow hover:text-black transition-colors"
            >
              Talk to us in the meantime
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((project) => (
              <div key={project.id} className="work-card">
                <BentoCard
                  caseStudy={{
                    ...project,
                    cardSize: 'small'
                  }}
                  className="h-[350px]"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact CTA */}
      <div className="border-t border-white/20 px-4 md:px-12 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-serif italic mb-4">Have a project in mind?</h2>
        <p className="text-white/60 mb-8 max-w-xl mx-auto">
          Send us a brief and we will come back with a scope, timeline, and quote.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-yellow text-black font-medium rounded-full hover:bg-brand-yellow-hover transition-colors"
        >
          Start a Conversation
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
