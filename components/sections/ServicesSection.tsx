'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { getAllServices } from '@/lib/data/services';
import { brandRGB } from '@/lib/brand';
import CountUp from '@/components/CountUp';
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
  const services = getAllServices();
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    // Skip horizontal scroll animation on mobile
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const list = listRef.current;
      if (!section || !container || !list) return;

      // Calculate horizontal scroll distance
      const scrollWidth = list.scrollWidth - container.offsetWidth;

      // Pin section and horizontally scroll the service list with snap
      const numServices = services.length;

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
      className={`relative w-full bg-brand-black text-white ${isMobile ? 'min-h-screen h-auto overflow-visible' : 'h-screen overflow-hidden'}`}
      style={{ zIndex: 20 }}
    >
      <div className={`w-full ${isMobile ? 'flex flex-col' : 'h-full flex flex-row'}`}>
        {/* Left - heading area */}
        <div className={`w-full ${isMobile ? 'p-6 pt-24 pb-8' : 'md:w-1/3 h-full pt-28 p-12'} border-b md:border-b-0 md:border-r border-white/20 flex flex-col justify-between flex-shrink-0`}>
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic leading-tight mb-4 md:mb-6">Capabilities</h2>
            <p className="font-sans text-sm text-brand-muted max-w-xs leading-relaxed">
              We bridge the gap between aesthetic excellence and technical robustness.
              Our toolkit is vast, our precision is absolute.
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
            {services.map((service, index) => (
              <SpotlightCard
                key={service.id}
                spotlightColor={`rgba(${brandRGB.yellow}, 0.15)`}
                className={`service-item group flex-shrink-0 flex flex-col justify-center p-6 sm:p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/20 hover:bg-white/5 transition-colors cursor-pointer ${isMobile ? 'w-full min-h-[70vh]' : 'h-full'}`}
                style={isMobile ? undefined : { width: 'calc(66.67vw)' }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="absolute inset-0 z-20"
                  aria-label={`View ${service.title} service`}
                />
                {/* Gradient glow decoration */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-yellow/3 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-yellow/5 transition-colors duration-700" />

                {/* Content area */}
                <div className="relative z-10">
                  {/* Title row */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-4">
                    <div className="flex items-baseline gap-3 sm:gap-6">
                      <span className="text-xs font-mono text-brand-yellow">({service.number})</span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold uppercase tracking-tight text-white group-hover:text-brand-yellow-hover transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs sm:text-sm text-white/50 border border-white/20 px-2 sm:px-3 py-1.5 rounded group-hover:bg-brand-yellow-hover group-hover:text-black group-hover:border-brand-yellow-hover transition-all w-fit">
                      {service.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base md:text-lg text-brand-muted max-w-lg mb-6 sm:mb-8 ml-0 sm:ml-8 md:ml-12 group-hover:text-white transition-colors">
                    {service.description}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-12 ml-0 sm:ml-8 md:ml-12 mb-6 sm:mb-8">
                    <div>
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-baseline">
                        <CountUp to={service.stats.projects} duration={2} className="tabular-nums" />
                        <span className="text-brand-yellow">+</span>
                      </div>
                      <div className="text-xs text-brand-muted uppercase tracking-wider mt-1">Projects Delivered</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-baseline">
                        <CountUp to={service.stats.satisfaction} duration={2} className="tabular-nums" />
                        <span className="text-brand-yellow">%</span>
                      </div>
                      <div className="text-xs text-brand-muted uppercase tracking-wider mt-1">Client Satisfaction</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                        {service.stats.support}
                      </div>
                      <div className="text-xs text-brand-muted uppercase tracking-wider mt-1">Support Available</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 ml-0 sm:ml-8 md:ml-12 mb-4">
                    {service.tags.map(tag => (
                      <span key={tag} className="text-xs uppercase border border-white/20 px-2 sm:px-3 py-1.5 rounded-full hover:border-brand-yellow/50 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Progress indicator */}
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 flex items-center gap-2">
                  <span className="text-xs font-mono text-white/30">
                    {String(index + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                  </span>
                  <div className="w-16 h-[1px] bg-white/20">
                    <div
                      className="h-full bg-brand-yellow"
                      style={{ width: `${((index + 1) / services.length) * 100}%` }}
                    />
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
