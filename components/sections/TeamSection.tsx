'use client';

// This section was previously the "Team" surface (individual profile cards).
// It has been repurposed as "How we work" — a company-level statement of
// approach — because individual identities are not published. See CLAUDE.md
// §6 (rule 1) and the brand voice rules in AGENTS.md §3.
// File and export name retained for minimal diff; rename when convenient.

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SpotlightCard from '@/components/SpotlightCard';
import Aurora from '@/components/Aurora';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ApproachPillar {
  number: string;
  title: string;
  body: string;
}

const pillars: ApproachPillar[] = [
  {
    number: '01',
    title: 'We stick around',
    body: 'Most of our work has been built and operated with the same clients for years, not delivered and walked away from. The relationship is the project.'
  },
  {
    number: '02',
    title: 'Plain-English engineering',
    body: 'No jargon, no theatre. We explain what we are doing, why it costs what it costs, and what happens if things go wrong. You always know where things stand.'
  },
  {
    number: '03',
    title: 'Built around your workflow',
    body: 'We design systems that fit how your team actually works, rather than asking the business to bend around the software. WordPress, NetSuite, custom CRMs — we pick what fits, not what is fashionable.'
  },
  {
    number: '04',
    title: 'AI you can actually use',
    body: 'AI capability for your business and your customers, not a buzzword on our pitch deck. OnlyPixAI is the public proof of how we approach AI delivery.'
  }
];

export const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    if (!section) return;

    if (isMobile) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const header = section.querySelector('.approach-header');
            const cards = section.querySelectorAll('.approach-pillar');
            if (header) gsap.from(header, { y: 30, opacity: 0, duration: 0.7 });
            if (cards.length) {
              gsap.from(cards, {
                y: 30,
                opacity: 0,
                stagger: 0.08,
                duration: 0.6,
                delay: 0.15,
                ease: 'power3.out'
              });
            }
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
      gsap.from('.approach-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: section, start: 'top 70%' }
      });
      gsap.from('.approach-pillar', {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 60%' }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col justify-center relative bg-brand-surface text-white overflow-x-hidden overflow-y-visible"
    >
      {!isMobile && (
        <div className="absolute inset-0 z-0 opacity-10">
          <Aurora
            colorStops={['#C8962A', '#9B6B3E', '#E8E4DD']}
            speed={0.3}
            amplitude={0.8}
            blend={0.4}
          />
        </div>
      )}

      <div className="relative z-10 px-4 pt-20 pb-12 sm:pt-16 sm:pb-16 md:px-8 md:py-20 lg:px-12 lg:py-24 max-w-7xl mx-auto w-full">
        <div className="approach-header flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 border-b border-white/10 pb-4 sm:pb-6">
          <div>
            <span className="font-mono text-xs font-bold text-brand-yellow tracking-widest uppercase">
              Approach
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif italic leading-tight mt-2">
              How we work
            </h2>
          </div>
          <div className="hidden md:block text-right mt-4 md:mt-0">
            <p className="font-sans text-sm max-w-xs text-white/60 leading-relaxed">
              A way of working that has carried Pixdyne since 2018.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {pillars.map((pillar) => (
            <div key={pillar.number} className="approach-pillar">
              <SpotlightCard
                className="rounded-2xl h-full"
                spotlightColor="rgba(200, 150, 42, 0.10)"
              >
                <div className="p-6 md:p-8 lg:p-10">
                  <span className="font-mono text-xs text-brand-yellow tracking-widest block mb-4">
                    ({pillar.number})
                  </span>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-serif italic text-white mb-3 md:mb-4 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
