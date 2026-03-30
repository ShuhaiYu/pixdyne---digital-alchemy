'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from '@/components/SplitText';
import AnimatedContent from '@/components/AnimatedContent';
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Process step data
const processSteps = [
  { label: 'Discovery', time: 'Wk 01', desc: 'Research & Analysis' },
  { label: 'Architect', time: 'Wk 02', desc: 'System Design' },
  { label: 'Development', time: 'Wk 03-05', desc: 'Agile Iteration' },
  { label: 'Launch', time: 'Wk 06', desc: 'Deploy & Optimize' },
];

// Chaos transforms - rotation and offset per card
const chaosTransforms = [
  { rotate: -6, x: 15, y: -10 },
  { rotate: 4, x: -12, y: 12 },
  { rotate: -3, x: 8, y: -15 },
  { rotate: 5, x: -10, y: 8 },
];

export const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const path = pathRef.current;
    if (!section || cards.length === 0) return;

    if (isMobile) {
      // On mobile, use IntersectionObserver for reliable triggering
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Animate cards
            cards.forEach((card, i) => {
              const transform = chaosTransforms[i];
              gsap.fromTo(card,
                { y: 60, opacity: 0, scale: 0.9 },
                {
                  y: transform.y,
                  opacity: 1,
                  scale: 1,
                  duration: 0.8,
                  delay: i * 0.12,
                  ease: 'power3.out',
                }
              );
            });

            // SVG path
            if (path) {
              const pathLength = path.getTotalLength();
              gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
              gsap.to(path, { strokeDashoffset: 0, duration: 2, delay: 0.5, ease: 'power2.inOut' });
            }

            observer.unobserve(section);
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(section);
      return () => observer.disconnect();
    }

    // Desktop: use ScrollTrigger
    const ctx = gsap.context(() => {
      // Card entrance - fly in from random direction to chaos position
      cards.forEach((card, i) => {
        const transform = chaosTransforms[i];
        const startX = (Math.random() - 0.5) * 40;
        const startY = 30 + Math.random() * 20;
        const startRotate = (Math.random() - 0.5) * 6;

        gsap.fromTo(card,
          {
            x: startX,
            y: startY,
            rotation: startRotate,
            opacity: 0,
            scale: 0.8
          },
          {
            x: transform.x,
            y: transform.y,
            rotation: transform.rotate,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              once: true,
            }
          }
        );
      });

      // SVG path stroke animation
      if (path) {
        const pathLength = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          delay: 0.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            once: true,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div
      ref={sectionRef}
      className="w-full flex items-center justify-center p-4 sm:p-6 md:p-8 py-16 sm:py-20 md:py-24 relative overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 w-full max-w-6xl my-8 sm:my-12 relative z-10">
        {/* Left - heading area */}
        <div className="flex flex-col justify-center">
          <AnimatedContent distance={30} duration={0.6}>
            <span className="text-brand-yellow font-mono text-sm font-bold uppercase tracking-wider mb-4 block">Process</span>
          </AnimatedContent>

          <div className="mb-6 sm:mb-8">
            <SplitText
              text="Calculated"
              tag="h2"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-black leading-none"
              textAlign="left"
              splitType="chars"
              delay={30}
              duration={0.8}
              from={{ opacity: 0, y: 50, rotation: -10 }}
              to={{ opacity: 1, y: 0, rotation: 0 }}
            />
            <SplitText
              text="Chaos."
              tag="h2"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-brand-yellow leading-none"
              textAlign="left"
              splitType="chars"
              delay={40}
              duration={0.8}
              from={{ opacity: 0, y: 50, rotation: 10 }}
              to={{ opacity: 1, y: 0, rotation: 0 }}
            />
          </div>

          <AnimatedContent distance={40} duration={0.8} delay={0.3}>
            <p className="text-black/70 font-sans text-lg leading-relaxed max-w-md">
              Our process isn&apos;t linear; it&apos;s exponential. We iterate rapidly, test rigorously, and deploy flawlessly.
              We treat every line of code as a structural component of your brand&apos;s digital skyscraper.
            </p>
          </AnimatedContent>

          {/* Process indicator */}
          <AnimatedContent distance={30} duration={0.6} delay={0.5}>
            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-black/40">
              <span>01</span>
              <div className="w-8 h-[1px] bg-black/20" />
              <span>02</span>
              <div className="w-8 h-[1px] bg-black/20" />
              <span>03</span>
              <div className="w-8 h-[1px] bg-black/20" />
              <span>04</span>
            </div>
          </AnimatedContent>
        </div>

        {/* Right - chaos card grid */}
        <div className="relative h-[320px] sm:h-[380px] md:h-[450px] lg:h-[500px]">
          {/* SVG connecting line */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 400 500"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              ref={pathRef}
              d="M 80 100
                 Q 120 180, 200 150
                 Q 280 120, 320 200
                 Q 360 280, 280 320
                 Q 200 360, 120 380"
              fill="none"
              stroke="rgba(200, 150, 42, 0.3)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Chaos cards */}
          {processSteps.map((step, i) => {
            // Card base positions (2x2 grid)
            const basePositions = [
              { top: '5%', left: '5%' },
              { top: '5%', left: '50%' },
              { top: '50%', left: '5%' },
              { top: '50%', left: '50%' },
            ];
            const pos = basePositions[i];

            return (
              <div
                key={i}
                ref={(node) => { cardsRef.current[i] = node; }}
                className="absolute w-[44%] sm:w-[43%] md:w-[42%] aspect-square bg-brand-black text-white p-3 sm:p-4 md:p-6 flex flex-col justify-between cursor-pointer transition-all duration-500 ease-out group hover:z-20"
                style={{
                  top: pos.top,
                  left: pos.left,
                  transform: `rotate(${chaosTransforms[i].rotate}deg) translate(${chaosTransforms[i].x}px, ${chaosTransforms[i].y}px)`,
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    rotation: 0,
                    x: 0,
                    y: 0,
                    scale: 1.02,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                    duration: 0.4,
                    ease: 'power2.out'
                  });
                }}
                onMouseLeave={(e) => {
                  const transform = chaosTransforms[i];
                  gsap.to(e.currentTarget, {
                    rotation: transform.rotate,
                    x: transform.x,
                    y: transform.y,
                    scale: 1,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    duration: 0.4,
                    ease: 'power2.out'
                  });
                }}
              >
                {/* Number */}
                <div className="flex items-start justify-between">
                  <span className="text-[10px] sm:text-xs font-mono text-brand-yellow border border-brand-yellow/30 px-1.5 sm:px-2 py-1">
                    {step.time}
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/10 group-hover:text-brand-yellow/30 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold block mb-1 group-hover:text-brand-yellow-hover transition-colors">
                    {step.label}
                  </span>
                  <span className="text-xs text-white/50 font-mono">
                    {step.desc}
                  </span>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
};
