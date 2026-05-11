'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export const HeroSection: React.FC = () => {
  const sloganRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const chars = sloganRef.current?.querySelectorAll('.char');

      if (chars && chars.length > 0) {
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
      <span key={i} className="char inline-block">{char === ' ' ? ' ' : char}</span>
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

      {/* Slogan. Right padding reserves space for the rotating badge in
          the bottom-right corner so the two never collide. Values are
          tuned to the badge widths declared below (w-20 / w-28 / w-40
          / w-48) plus the margin gap from the viewport edge. */}
      <div className="relative z-10 pb-8 sm:pb-12 pr-24 sm:pr-40 md:pr-60 lg:pr-72">
        <h1
          ref={sloganRef}
          className="text-[clamp(2rem,7vw,6rem)] leading-[1.05] font-serif text-black mix-blend-multiply"
        >
          <div className="overflow-hidden">{splitText('Upgrade your workflow.')}</div>
          <div className="overflow-hidden italic ml-[3vw] sm:ml-[6vw] mt-1 sm:mt-2">
            {splitText('Grow with a team that stays.')}
          </div>
        </h1>
      </div>

      {/* Rotating "start a project" badge.
          - Plain <a href="#contact"> rather than next/link Link: the
            App Router can intercept same-page hash navigation and
            leave the browser's native anchor scroll unfired (the same
            issue we hit on the service card CTAs). <a> is bulletproof.
          - animate-spin-slow lives on the inner <svg> only, so the
            rotating inscription orbits the badge while the centred
            "Start" wordmark stays upright.
          - The centre <span> uses pointer-events-none so it never
            steals the click from the surrounding anchor. */}
      <a
        href="#contact"
        aria-label="Start a project — scroll to contact form"
        className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-brand-black flex items-center justify-center group hover:bg-brand-yellow-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow transition-colors cursor-pointer"
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full fill-brand-yellow group-hover:fill-black p-1 sm:p-2 transition-colors animate-spin-slow"
          aria-hidden="true"
        >
          <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
          <text>
            <textPath xlinkHref="#curve" className="text-[12px] uppercase tracking-[0.1em]">
              • Start a project • Talk to Pixdyne • Start a project • Talk to Pixdyne
            </textPath>
          </text>
        </svg>
        <span
          className="relative z-10 font-bold uppercase tracking-widest text-brand-yellow group-hover:text-black transition-colors text-[10px] sm:text-xs md:text-sm pointer-events-none"
          aria-hidden="true"
        >
          Start
        </span>
      </a>
    </div>
  );
};
