'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { prefersReducedMotion } from '@/lib/animation/reduced-motion';
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

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    // The layered scroll transitions now run on mobile too. They were
    // previously skipped below 768px for jank reasons, but all three
    // animate only compositor-friendly properties (transform via `scale`,
    // `clipPath`, `opacity`, and a `filter` on the parallax branch), which
    // modern mobile GPUs handle fine. The expensive mobile offender was
    // never this — it was the pinned horizontal rail in ServicesSection,
    // which stays desktop-only.
    //
    // Respect reduced-motion: skip the layered sticky/scroll transitions so the
    // sections fall back to normal vertical flow (CLAUDE.md §8).
    if (prefersReducedMotion()) return;

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
  }, [transitionType, pathname, peekBackground]);

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
        {/* peekBackground sits outside clipPath, revealed as mask-diagonal
            expands. Rendered at every breakpoint — the mask-diagonal
            transition now runs on mobile too, and without this layer the
            expanding clip would reveal blank page instead of the dark
            backdrop. Plain CSS with no isMobile state keeps the first render
            correct with no hydration swap. */}
        <div className="absolute inset-0 z-0">
          {peekBackground}
        </div>

        {/* Inner container - clipPath applied here */}
        <div
          ref={innerRef}
          className={`relative z-10 ${className}`}
        >
          {bgImage && (
            <div className="absolute inset-0 z-0">
              <img
                src={bgImage}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover opacity-40 grayscale"
              />
              <div className="absolute inset-0 bg-brand-black/40" />
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
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-brand-black/40" />
        </div>
      )}

      <div ref={contentRef} className="relative z-10 w-full h-full flex-grow flex flex-col">
        {children}
      </div>
    </section>
  );
};
