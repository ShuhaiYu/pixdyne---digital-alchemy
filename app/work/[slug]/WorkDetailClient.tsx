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

export const WorkDetailClient: React.FC<WorkDetailClientProps> = ({ work }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasHero = Boolean(work.img);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      if (hasHero) {
        tl.from('.hero-img', {
          scale: 1.1,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out'
        });
      }
      tl.from(
        '.work-content',
        { y: 50, opacity: 0, stagger: 0.1, duration: 0.8 },
        hasHero ? '-=0.8' : 0
      );
    }, containerRef);
    return () => ctx.revert();
  }, [work, hasHero]);

  return (
    <div ref={containerRef} className="min-h-screen bg-brand-black text-white pb-20 pt-20">
      {/* Sub-navigation. Back link points to the /work index (the new
          dedicated route) rather than a homepage hash anchor that no
          longer exists after the contact-route refactor (08b7c9e). */}
      <div className="w-full px-6 md:px-12 py-6 flex justify-between items-center z-40 relative">
        <Link
          href="/work"
          className="flex items-center gap-2 text-sm font-mono text-white hover:text-brand-yellow-hover transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Work
        </Link>
      </div>

      {/* Hero. Renders an image hero when work.img is set; otherwise a
          text-led editorial hero on the warm-black surface. Owner is
          adding real hero images later — until then we ship a clean
          text-only header rather than a placeholder. */}
      {hasHero ? (
        <div className="h-[60vh] md:h-[80vh] w-full overflow-hidden relative">
          <Image
            src={work.img!}
            alt={`${work.name} — ${work.category} project by Pixdyne`}
            fill
            className="hero-img object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <span className="work-content block text-brand-yellow font-mono text-sm mb-2">{work.category}</span>
            <h1 className="work-content text-5xl md:text-8xl font-serif italic">{work.name}</h1>
          </div>
        </div>
      ) : (
        <div className="w-full px-6 md:px-12 pt-8 md:pt-16 pb-12 md:pb-20 border-b border-white/10">
          <span className="work-content block text-brand-yellow font-mono text-xs md:text-sm tracking-widest uppercase mb-3">
            {work.category}
          </span>
          <h1 className="work-content text-5xl md:text-7xl lg:text-8xl font-serif italic leading-[1.05] max-w-5xl">
            {work.name}
          </h1>
          {work.shortDescription && (
            <p className="work-content mt-6 text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed">
              {work.shortDescription}
            </p>
          )}
        </div>
      )}

      {/* Content body */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Sidebar — Client, optional Year, Stack, live link */}
        <div className="work-content col-span-1 md:col-span-3">
          <div className="flex flex-col gap-8 text-sm font-mono text-gray-400">
            <div>
              <span className="block text-white font-bold uppercase mb-1">Client</span>
              {work.client}
            </div>

            {work.year && (
              <div>
                <span className="block text-white font-bold uppercase mb-1">Year</span>
                {work.year}
              </div>
            )}

            <div>
              <span className="block text-white font-bold uppercase mb-1">Working ground</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {work.stack.map((tech) => (
                  <span key={tech} className="after:content-[',_'] last:after:content-['']">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {work.liveUrl && (
              <a
                href={work.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-yellow hover:text-white transition-colors mt-4 uppercase tracking-widest"
              >
                Visit live site <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Main narrative — Challenge + Solution */}
        <div className="col-span-1 md:col-span-9 flex flex-col gap-12">
          <div className="work-content">
            <h2 className="text-3xl font-bold mb-4">The Challenge</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed whitespace-pre-line">
              {work.challenge}
            </p>
          </div>

          <div className="work-content">
            <h2 className="text-3xl font-bold mb-4">The Solution</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed whitespace-pre-line">
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
          className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-gray-700 hover:text-white transition-colors duration-300 cursor-pointer"
        >
          See more work →
        </Link>
      </div>
    </div>
  );
};
