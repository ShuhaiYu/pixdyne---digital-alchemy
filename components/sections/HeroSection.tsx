'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export const HeroSection: React.FC = () => {
  const sloganRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      // Line-level entrance rather than per-character. Per-char inline-block
      // wrapping (the previous approach) broke natural letter-spacing and
      // mid-word wrapping once the title became a full sentence.
      const lines = sloganRef.current?.querySelectorAll('.slogan-line');

      if (lines && lines.length > 0) {
        tl.from(lines, {
          y: 60,
          opacity: 0,
          stagger: 0.18,
          duration: 0.9,
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

      {/* Slogan container. Right padding reserves space for the rotating
          badge but the div still spans full width — give the badge a
          higher z-index so its hit area sits above this div regardless. */}
      <div className="relative z-10 pb-8 sm:pb-12 pr-24 sm:pr-40 md:pr-60 lg:pr-72">
        <h1
          ref={sloganRef}
          className="text-[clamp(2rem,7vw,6rem)] leading-[1.05] font-serif text-black mix-blend-multiply"
        >
          {/* Each line is its own inline-block container that slides up on
              entrance. The text inside flows with its natural typography
              (letter-spacing, kerning, word wrap) instead of being
              fragmented into per-character inline-blocks. overflow-hidden
              keeps the slide-up motion clipped to each line. */}
          <span className="slogan-line block overflow-hidden">
            <span className="inline-block">Upgrade your workflow.</span>
          </span>
          <span className="slogan-line block overflow-hidden italic ml-[3vw] sm:ml-[6vw] mt-1 sm:mt-2">
            <span className="inline-block">Grow with a team that stays.</span>
          </span>
        </h1>
      </div>

      {/* Rotating "start a project" badge.
          - z-20 sits above the slogan container's z-10, so the click
            target is never occluded by the slogan div's padding area.
          - Plain <a href="#contact"> so the browser's native anchor
            scroll fires (next/link's App Router behaviour is unreliable
            for same-page hash navigation).
          - animate-spin-slow lives on the inner <svg> only, so the
            inscription orbits while the centred "Start" wordmark
            stays upright. The centre <span> is pointer-events-none
            so it never steals the click. */}
      <a
        href="#contact"
        aria-label="Start a project — scroll to contact form"
        className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 z-20 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-brand-black flex items-center justify-center group hover:bg-brand-yellow-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow transition-colors cursor-pointer"
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full fill-brand-yellow group-hover:fill-black p-1 sm:p-2 transition-colors animate-spin-slow pointer-events-none"
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
