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
    <div className="h-screen w-full flex flex-col p-4 sm:p-6 md:p-12 relative">
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

      {/* Slogan container. flex-1 + items-center vertically centres the
          slogan in the space between the top kicker and the badge that
          sits absolutely at the bottom-right corner. Right padding
          reserves horizontal space so the slogan text never crosses
          into the badge's column. */}
      <div className="flex-1 flex items-center pr-24 sm:pr-40 md:pr-60 lg:pr-72 relative z-10">
        <h1
          ref={sloganRef}
          className="text-[clamp(2rem,7vw,6rem)] leading-[1.25] font-serif text-black mix-blend-multiply"
        >
          {/* Each line is its own overflow-hidden box so the entrance
              animation reads as a clean slide-up reveal. pb-2/pb-3 adds
              just enough room for the italic descenders (p, g, y) to
              fit inside the line box without being clipped by
              overflow-hidden. The wider leading-[1.25] on the h1 also
              gives each glyph its full natural height. */}
          <span className="slogan-line block overflow-hidden pb-2 sm:pb-3">
            <span className="inline-block">Upgrade your workflow.</span>
          </span>
          <span className="slogan-line block overflow-hidden italic pb-2 sm:pb-3 ml-[3vw] sm:ml-[6vw] mt-1 sm:mt-2">
            <span className="inline-block">Grow with a team that stays.</span>
          </span>
        </h1>

        {/* GEO / accessibility prose. Visually hidden via sr-only but
            present in the DOM, so AI search engines, LLM crawlers, and
            screen readers see a plain-English statement of who/where/
            since/what immediately after the H1 — exactly where generative
            engines weight context most heavily. Not cloaking: same
            content is served to every user agent and it matches the
            facts elsewhere on the page. See CLAUDE.md §14.10. */}
        <p className="sr-only">
          Pixdyne is a Melbourne-based technology partner. Since 2018 we have built and operated websites, custom systems, and ongoing operations for businesses across Australia. We also build AI products — see OnlyPixAI, our live demonstration of AI delivered as something teams actually use.
        </p>
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
        className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 z-20 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-brand-black flex items-center justify-center group border-2 border-transparent hover:border-black hover:bg-brand-yellow-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow transition-colors cursor-pointer"
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
