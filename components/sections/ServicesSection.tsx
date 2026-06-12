'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/animation/reduced-motion';
import { ArrowRight } from 'lucide-react';
import { getCapabilityCards } from '@/lib/data/services';
import { brandRGB } from '@/lib/brand';
import SpotlightCard from '@/components/SpotlightCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom hook to detect mobile viewport
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const cards = getCapabilityCards();
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    // Skip horizontal scroll animation on mobile
    if (isMobile) return;
    // Respect reduced-motion: skip the pinned horizontal-scroll animation so
    // the section falls back to normal vertical flow (CLAUDE.md §8).
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const list = listRef.current;
      if (!section || !container || !list) return;

      // Horizontal travel is one card width per step — deliberately NOT
      // `list.scrollWidth - container.offsetWidth`. Each card hosts an
      // absolutely-positioned glow (`-right-20`, i.e. right: -80px) that
      // bleeds ~80px past its right edge, which inflates list.scrollWidth.
      // Feeding that inflated value into the equal-part snap (1/(n-1)) made
      // every snap stop land slightly left, accumulating until cards 3–4
      // sat left of the divider. Cards are laid out edge-to-edge with no
      // gap/margin, so the true travel is exactly (n-1) × one card width.
      const numServices = cards.length;
      const firstCard = list.firstElementChild as HTMLElement | null;
      const cardWidth = firstCard ? firstCard.offsetWidth : container.offsetWidth;
      const scrollWidth = cardWidth * (numServices - 1);

      gsap.to(list, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollWidth}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          // Snap config: auto-snap to nearest card on scroll stop
          snap: {
            snapTo: 1 / (numServices - 1),  // Divide progress into n equal parts
            duration: { min: 0.2, max: 0.5 },  // Snap animation duration
            ease: 'power2.inOut'  // Smooth ease in/out
          },
          onEnter: () => gsap.set(section, { zIndex: 100 }),
          onLeave: () => gsap.set(section, { zIndex: 20 }),
          onEnterBack: () => gsap.set(section, { zIndex: 100 }),
          onLeaveBack: () => gsap.set(section, { zIndex: 20 }),
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Services"
      className={`relative w-full bg-brand-black text-brand-text ${isMobile ? 'min-h-screen h-auto overflow-visible' : 'h-screen overflow-hidden'}`}
      style={{ zIndex: 20 }}
    >
      <div className={`w-full ${isMobile ? 'flex flex-col' : 'h-full flex flex-row'}`}>
        {/* Left - heading area */}
        <div className={`w-full ${isMobile ? 'p-6 pt-24 pb-8' : 'md:w-1/3 h-full pt-28 p-12'} border-b md:border-b-0 md:border-r border-white/20 flex flex-col justify-between flex-shrink-0`}>
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic leading-tight mb-4 md:mb-6">Capabilities</h2>
            <p className="font-sans text-sm text-brand-muted max-w-xs leading-relaxed">
              From the websites and storefronts your customers see, to the systems
              that run the business behind them — we build what fits how your
              team actually works.
            </p>
          </div>
        </div>

        {/* Right - service list */}
        <div
          ref={containerRef}
          className={`w-full ${isMobile ? 'flex-1' : 'md:w-2/3 h-full overflow-hidden'}`}
        >
          <div
            ref={listRef}
            className={`${isMobile ? 'flex flex-col' : 'flex flex-row h-full'}`}
          >
            {cards.map((card, index) => {
              return (
                <SpotlightCard
                  key={card.id}
                  spotlightColor={`rgba(${brandRGB.yellow}, 0.15)`}
                  className={`service-item group flex-shrink-0 flex flex-col justify-center p-6 sm:p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/20 hover:bg-white/5 transition-colors cursor-pointer ${isMobile ? 'w-full min-h-[70vh]' : 'h-full'}`}
                  style={isMobile ? undefined : { width: 'calc(66.67vw)' }}
                >
                  {/* Card-wide click target sends the visitor to the
                      capability's page. The bottom-right CTA below sits at
                      z-30 above this Link, so clicking the CTA goes to its
                      own href. */}
                  <Link
                    href={card.href}
                    className="absolute inset-0 z-20"
                    aria-label={`View ${card.title}`}
                  />
                  {/* Gradient glow decoration */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-yellow/3 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-yellow/5 transition-colors duration-700" />

                  {/* Content area */}
                  <div className="relative z-10">
                    {/* Title row */}
                    <div className="flex items-baseline gap-3 sm:gap-6 mb-4">
                      <span className="text-xs font-mono text-brand-yellow">({card.number})</span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold uppercase tracking-tight text-brand-text group-hover:text-brand-yellow-hover transition-colors duration-300">
                        {card.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base md:text-lg text-brand-muted max-w-lg mb-6 sm:mb-8 ml-0 sm:ml-8 md:ml-12 group-hover:text-brand-text transition-colors">
                      {card.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 ml-0 sm:ml-8 md:ml-12 mb-4">
                      {card.tags.map(tag => (
                        <span key={tag} className="text-xs uppercase border border-white/20 px-2 sm:px-3 py-1.5 rounded-full hover:border-brand-yellow/50 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Progress indicator (bottom-left) */}
                  <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 flex items-center gap-2">
                    <span className="text-xs font-mono text-brand-text/30">
                      {String(index + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
                    </span>
                    <div className="w-16 h-[1px] bg-white/20">
                      <div
                        className="h-full bg-brand-yellow"
                        style={{ width: `${((index + 1) / cards.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Primary CTA (bottom-right). z-30 sits above the
                      card-wide Link at z-20, so this captures its own
                      click. Wording is unified as "Explore more"; for the
                      Operations sub-services (Managed IT, SEO & Content)
                      the href deep-links into the Operations detail page. */}
                  <Link
                    href={card.href}
                    className="absolute bottom-6 sm:bottom-8 right-6 sm:right-12 z-30 inline-flex items-center gap-2 bg-brand-yellow text-brand-black font-bold text-xs uppercase tracking-widest py-3 px-5 hover:bg-brand-yellow-hover transition-colors pointer-events-auto"
                    aria-label={`Explore ${card.title}`}
                  >
                    Explore more
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
};
