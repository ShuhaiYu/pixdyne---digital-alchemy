'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { CaseStudyItem } from '@/types';

interface WorkDetailClientProps {
  work: CaseStudyItem;
}

// Screenshots are 1440x900 viewport captures (16:10).
const SHOT_W = 1440;
const SHOT_H = 900;

export const WorkDetailClient: React.FC<WorkDetailClientProps> = ({ work }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasHero = Boolean(work.img);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      if (hasHero) {
        tl.from('.hero-img', {
          scale: 1.06,
          opacity: 0,
          duration: 1.1,
          ease: 'power2.out'
        });
      }
      tl.from(
        '.work-content',
        { y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' },
        hasHero ? '-=0.7' : 0
      );
    }, containerRef);
    return () => ctx.revert();
  }, [work, hasHero]);

  return (
    <div ref={containerRef} className="min-h-screen bg-brand-black text-brand-text pb-20 pt-20">
      {/* Sub-navigation. Back link points to the /work index. */}
      <div className="w-full px-6 md:px-12 py-6">
        <Link
          href="/work"
          className="flex w-fit items-center gap-2 text-sm font-mono text-brand-text hover:text-brand-yellow-hover transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Work
        </Link>
      </div>

      {/* Header. Text-first so the project, what it is, and the live link
          are in first paint, never hidden behind the screenshot. */}
      <header className="w-full px-6 md:px-12 pt-6 md:pt-10 pb-10 md:pb-14 border-b border-white/10">
        <span className="work-content block text-brand-yellow font-mono text-xs md:text-sm tracking-widest uppercase mb-3">
          {work.category}
        </span>
        <h1 className="work-content text-5xl md:text-7xl lg:text-8xl font-serif italic leading-[1.05] max-w-5xl">
          {work.name}
        </h1>
        {work.shortDescription && (
          <p className="work-content mt-6 text-lg md:text-xl text-brand-text/70 max-w-3xl leading-relaxed">
            {work.shortDescription}
          </p>
        )}
        {work.liveUrl && (
          <a
            href={work.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="work-content group mt-8 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3 text-sm font-medium text-brand-black transition-colors hover:bg-brand-yellow-hover"
          >
            Visit live site
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        )}
      </header>

      {/* Full screenshot — shown whole at its natural 16:10 ratio, framed
          on the warm surface. No object-cover, so neither side is clipped. */}
      {hasHero && (
        <div className="px-6 md:px-12 pt-10 md:pt-14">
          <figure className="hero-img mx-auto max-w-6xl overflow-hidden rounded-xl border border-white/10 bg-brand-surface shadow-2xl shadow-black/40">
            <Image
              src={work.img!}
              alt={`${work.name} — homepage, captured live`}
              width={SHOT_W}
              height={SHOT_H}
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="h-auto w-full"
              priority
            />
          </figure>
        </div>
      )}

      {/* Content body */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Sidebar — Client, optional Year, working ground */}
        <div className="work-content col-span-1 md:col-span-3">
          <div className="flex flex-col gap-8 text-sm text-brand-muted">
            <div>
              <span className="block text-brand-text font-bold uppercase mb-1">Client</span>
              {work.client}
            </div>

            {work.year && (
              <div>
                <span className="block text-brand-text font-bold uppercase mb-1">Year</span>
                {work.year}
              </div>
            )}

            <div>
              <span className="block text-brand-text font-bold uppercase mb-1">Working ground</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {work.stack.map((tech) => (
                  <span key={tech} className="after:content-[',_'] last:after:content-['']">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main narrative — Challenge + Solution */}
        <div className="col-span-1 md:col-span-9 flex flex-col gap-12">
          <div className="work-content">
            <h2 className="text-3xl font-bold mb-4">The Challenge</h2>
            <p className="text-lg md:text-xl text-brand-text/85 leading-relaxed whitespace-pre-line">
              {work.challenge}
            </p>
          </div>

          <div className="work-content">
            <h2 className="text-3xl font-bold mb-4">The Solution</h2>
            <p className="text-lg md:text-xl text-brand-text/85 leading-relaxed whitespace-pre-line">
              {work.solution}
            </p>
          </div>

          {/* Related service back-link. Built only when work.services
              is populated — links the case study to its parent service
              detail page (CLAUDE.md §14 internal-link strategy). */}
          {work.services && work.services.length > 0 && (
            <div className="work-content mt-4 pt-8 border-t border-white/10">
              <span className="block text-xs font-mono uppercase tracking-widest text-brand-muted mb-3">
                Related capability
              </span>
              <div className="flex flex-wrap gap-3">
                {work.services.map((svc) => {
                  const slug = svc.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <Link
                      key={svc}
                      href={`/services/${slug}`}
                      className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-sm font-mono uppercase tracking-widest hover:border-brand-yellow hover:text-brand-yellow transition-colors"
                    >
                      {svc}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="work-content flex justify-center mt-24">
        <Link
          href="/work"
          className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-brand-text/30 hover:text-brand-text transition-colors duration-300 cursor-pointer"
        >
          See more work →
        </Link>
      </div>
    </div>
  );
};
