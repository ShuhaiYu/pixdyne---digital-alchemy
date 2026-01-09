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

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.work-card', {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
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
          <span className="text-yellow-500 text-xs font-mono tracking-wider mb-2 block">
            COMPLETE PORTFOLIO
          </span>
          <h1 className="text-5xl md:text-7xl font-serif mb-4">Our Work</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            A collection of projects that showcase our expertise in digital transformation,
            web development, app design, and creative solutions.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div ref={containerRef} className="px-4 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((project) => (
            <div key={project.id} className="work-card">
              <BentoCard
                caseStudy={{
                  ...project,
                  cardSize: 'small', // Uniform size for the grid
                }}
                className="h-[350px]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="border-t border-white/20 px-4 md:px-12 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-4">Have a project in mind?</h2>
        <p className="text-white/60 mb-8 max-w-xl mx-auto">
          Let&apos;s collaborate and create something extraordinary together.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-black font-medium rounded-full hover:bg-yellow-400 transition-colors"
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
