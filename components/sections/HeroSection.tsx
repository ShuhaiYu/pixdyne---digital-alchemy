'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export const HeroSection: React.FC = () => {
  const sloganRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const chars = sloganRef.current?.querySelectorAll('.char');

      if (chars && chars.length > 0) {
        // Shorter per-char stagger than the previous PIXDYNE/WORKS
        // word-style title; this is a full sentence, so sweeping in
        // every glyph at 0.05s each took too long.
        tl.from(chars, {
          y: 80,
          opacity: 0,
          stagger: 0.02,
          duration: 0.7,
          ease: 'power4.out',
          delay: 0.2
        });
      }

      if (subRef.current) {
        tl.from(subRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8
        }, '-=0.5');
      }
    });
    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block">{char === ' ' ? ' ' : char}</span>
    ));
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between p-4 sm:p-6 md:p-12 relative">
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="flex justify-between items-start pt-20">
        <div ref={subRef} className="text-black font-sans uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm font-bold flex flex-col gap-1 sm:gap-2">
          <span className="block w-16 sm:w-24 h-[1px] bg-black mb-1 sm:mb-2"></span>
          <span>Digital Alchemy</span>
          <span>Est. 2018</span>
        </div>
      </div>

      {/* Slogan — replaces the previous PIXDYNE / WORKS display title.
          The brand name is omitted here because the navigation already
          carries it; the slogan does the work of stating why visitors
          should keep reading. Anchored in growth narrative per CLAUDE.md
          rule 9 (no downward audience segmentation). */}
      <div className="relative z-10 pb-8 sm:pb-12">
        <h1
          ref={sloganRef}
          className="text-[clamp(2rem,7vw,6rem)] leading-[1.05] font-serif text-black mix-blend-multiply max-w-[18ch] sm:max-w-none"
        >
          <div className="overflow-hidden">{splitText('Upgrade your workflow.')}</div>
          <div className="overflow-hidden italic ml-[3vw] sm:ml-[6vw] mt-1 sm:mt-2">
            {splitText('Grow with a team that stays.')}
          </div>
        </h1>
      </div>

      {/* Rotating badge — now a real link to the Contact form.
          Owner direction: make it a button that takes the visitor to
          the form instead of being decorative-only. The clip-path
          ensures the entire circular area is the click target rather
          than just the bounding box of the inscribed text. */}
      <Link
        href="#contact"
        aria-label="Start a project — scroll to contact form"
        className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-brand-black flex items-center justify-center animate-spin-slow group hover:bg-brand-yellow-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow transition-colors"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-brand-yellow group-hover:fill-black p-1 sm:p-2 transition-colors" aria-hidden="true">
          <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
          <text>
            <textPath xlinkHref="#curve" className="text-[12px] uppercase tracking-[0.1em]">
              • Start a project • Talk to Pixdyne • Start a project • Talk to Pixdyne
            </textPath>
          </text>
        </svg>
      </Link>
    </div>
  );
};
