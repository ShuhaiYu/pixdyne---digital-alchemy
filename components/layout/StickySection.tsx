'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { SectionProps } from '@/types';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const StickySection: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  transitionType = 'curtain',
  zIndex,
  bgImage,
  fitContent = false,
  pinnable = false,
  peekBackground,
  'aria-label': ariaLabel
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    // Skip complex GSAP transitions on mobile - they cause jank and trigger issues
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      if (transitionType === 'parallax') {
        gsap.fromTo(container,
          { filter: 'brightness(0.2) scale(0.9)' },
          {
            filter: 'brightness(1) scale(1)',
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            }
          }
        );
      }

      if (transitionType === 'mask-diagonal') {
        // If peekBackground exists, apply clipPath to innerRef
        const clipTarget = peekBackground ? innerRef.current : container;
        if (clipTarget) {
          gsap.fromTo(clipTarget,
            // Initial state: large diagonal clip revealing peekBackground
            { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 50%)' },
            {
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              ease: 'power1.inOut',
              scrollTrigger: {
                trigger: container,
                start: 'top 80%',  // Start earlier
                end: 'top 10%',    // End later for longer transition
                scrub: 0.8,
              }
            }
          );
        }
      }

      if (transitionType === 'pixel-glitch') {
        gsap.fromTo(contentRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              end: 'top 20%',
              scrub: true
            }
          }
        );
      }
    }, containerRef);

    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [transitionType, pathname, peekBackground, isMobile]);

  // Use special layout when peekBackground is provided
  if (peekBackground) {
    return (
      <section
        id={id}
        ref={containerRef}
        aria-label={ariaLabel}
        className={`${pinnable ? 'relative' : 'sticky top-0'} w-full overflow-hidden ${fitContent ? '' : 'min-h-dvh'}`}
        style={{ zIndex }}
      >
        {/* peekBackground sits outside clipPath, revealed as mask-diagonal expands */}
        {/* On mobile, hide peekBackground since mask-diagonal is disabled */}
        {!isMobile && (
          <div className="absolute inset-0 z-0">
            {peekBackground}
          </div>
        )}

        {/* Inner container - clipPath applied here */}
        <div
          ref={innerRef}
          className={`relative z-10 ${className}`}
        >
          {bgImage && (
            <div className="absolute inset-0 z-0">
              <img
                src={bgImage}
                alt={`${id} section background`}
                className="w-full h-full object-cover opacity-40 grayscale"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          )}

          <div ref={contentRef} className="relative z-10 w-full">
            {children}
          </div>
        </div>
      </section>
    );
  }

  // Default layout (no peekBackground)
  return (
    <section
      id={id}
      ref={containerRef}
      aria-label={ariaLabel}
      className={`${pinnable ? 'relative' : 'sticky top-0'} w-full overflow-hidden flex flex-col ${fitContent ? 'h-auto min-h-0' : 'min-h-dvh'} ${className}`}
      style={{ zIndex }}
    >
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt={`${id} section background`}
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <div ref={contentRef} className="relative z-10 w-full h-full flex-grow flex flex-col">
        {children}
      </div>
    </section>
  );
};
