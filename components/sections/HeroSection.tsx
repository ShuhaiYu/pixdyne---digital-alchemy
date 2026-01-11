'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const chars = titleRef.current?.querySelectorAll('.char');

      if (chars && chars.length > 0) {
        tl.from(chars, {
          y: 200,
          opacity: 0,
          stagger: 0.05,
          duration: 1,
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
      <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
    ));
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between p-4 sm:p-6 md:p-12 relative">
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="flex justify-between items-start pt-20">
        <div ref={subRef} className="text-black font-sans uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs md:text-sm font-bold flex flex-col gap-1 sm:gap-2">
          <span className="block w-16 sm:w-24 h-[1px] bg-black mb-1 sm:mb-2"></span>
          <span>Digital Alchemy</span>
          <span>Est. 2024</span>
        </div>
        <div className="hidden md:block text-black font-sans text-right text-xs uppercase tracking-widest font-bold">
          Scroll to Explore <br /> ↓
        </div>
      </div>

      <div className="relative z-10 pb-8 sm:pb-12">
        <h1 ref={titleRef} className="text-[clamp(2.5rem,14vw,12rem)] leading-[0.85] sm:leading-[0.8] font-serif italic text-black mix-blend-multiply">
          <div className="overflow-hidden">{splitText('PIXDYNE')}</div>
          <div className="overflow-hidden ml-[5vw] sm:ml-[10vw]">{splitText('WORKS')}</div>
        </h1>
      </div>

      {/* 旋转圆形徽章 - 移动端缩小并调整位置 */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-black flex items-center justify-center animate-spin-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-yellow-500 p-1 sm:p-2">
          <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
          <text>
            <textPath xlinkHref="#curve" className="text-[12px] uppercase tracking-[0.1em]">
              • Web Development • App Development • SEO • Support
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};
