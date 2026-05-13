'use client';

// OnlyPixAI flagship-product section. Editorial layout on dark warm
// background with a subtle Aurora glow, plus an orbit visual showing the
// AI providers OnlyPixAI gates onto. Reinforces CLAUDE.md section 3 AI
// positioning: capability we deliver to clients, not a tool we use to code.
//
// Placement on the homepage: between "How we work" (z-index 45) and
// "Insights" (z-index 48), at z-index 47. Designed to land mid-flow,
// not above the fold.

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Aurora from '@/components/Aurora';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface OrbitLogo {
  src: string;
  alt: string;
  // Short consumer-facing model name shown in the legend below the
  // orbit. The owner asked for names a non-technical decision-maker
  // would recognise (e.g. "Claude" rather than "Anthropic").
  label: string;
}

// Mainstream AI model providers OnlyPixAI gates onto. Curated to AI
// models specifically (per owner direction) — cloud infrastructure
// providers were removed because OnlyPixAI is sold as a model
// gateway, not an infrastructure middleware.
const orbitLogos: OrbitLogo[] = [
  { src: '/logos/openai.svg', alt: 'OpenAI', label: 'ChatGPT' },
  { src: '/logos/claude.svg', alt: 'Claude', label: 'Claude' },
  { src: '/logos/googlegemini.svg', alt: 'Google Gemini', label: 'Gemini' },
  { src: '/logos/grok.svg', alt: 'xAI', label: 'Grok' },
  { src: '/logos/deepseek.svg', alt: 'DeepSeek', label: 'DeepSeek' },
  { src: '/logos/mistral.svg', alt: 'Mistral AI', label: 'Mistral' }
];

export const OnlyPixAISection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  // Synchronises hover highlight between an orbit tile and its name
  // in the legend below. Setting an index from either surface lights
  // up both. Keyboard focus on the legend buttons also sets it.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    if (!section) return;

    if (isMobile) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const targets = section.querySelectorAll('.opx-anim');
            gsap.from(targets, {
              y: 30,
              opacity: 0,
              stagger: 0.08,
              duration: 0.7,
              ease: 'power3.out'
            });
            observer.unobserve(section);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(section);
      return () => observer.disconnect();
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.opx-anim', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%' }
      });
      // Orbit rotation is now driven by CSS animations declared in
      // globals.css (.opx-orbit-container + .opx-orbit-counter), so
      // each logo's image stays upright while the position moves
      // around the circle.
    }, sectionRef);
    return () => ctx.revert();
  }, [isMobile]);

  // Tiles enlarged to roughly 2x of the previous footprint per owner
  // direction so the brand marks read clearly. Orbit radius and the
  // decorative concentric rings are scaled up proportionally to keep
  // the composition balanced and avoid tile crowding.
  const orbitRadius = isMobile ? 135 : 180;
  const orbitTileSize = isMobile ? 96 : 120;

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center bg-brand-black text-brand-text overflow-hidden"
    >
      {/* Aurora glow — gold + indigo + steel, evoking multi-model AI without
          looking like a generic gradient. Hidden on mobile to save GPU. */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <Aurora
            colorStops={['#C8962A', '#5C4DDD', '#1B71B5']}
            speed={0.3}
            amplitude={0.9}
            blend={0.5}
          />
        </div>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
        {/* Left — editorial copy */}
        <div className="space-y-6">
          <span className="opx-anim font-mono text-xs font-bold text-brand-yellow tracking-widest uppercase block">
            From the Pixdyne workshop
          </span>
          <h2 className="opx-anim text-5xl md:text-6xl lg:text-7xl font-serif italic leading-none">
            OnlyPixAI
          </h2>
          <p className="opx-anim text-2xl md:text-3xl font-serif italic text-brand-yellow leading-tight">
            One gateway.
            <br />
            Every AI model.
          </p>
          <div className="opx-anim space-y-4 text-brand-text/75 text-base md:text-lg leading-relaxed max-w-xl">
            <p>
              Most teams want to put AI inside their business but stall at the
              integration tax: separate accounts, separate keys, separate
              bills, and a different SDK for every vendor. OnlyPixAI is one
              API for OpenAI, Claude, Gemini, and the open models — billed
              once, switchable any time.
            </p>
            <p>
              We ship and operate it ourselves. It is the proof — not the
              promise — that we can put AI capability into your business in a
              way your team can actually use.
            </p>
          </div>
          <div className="opx-anim flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="https://www.onlypixai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-brand-black font-bold py-4 px-8 uppercase tracking-widest text-xs hover:bg-brand-yellow-hover transition-colors"
            >
              Visit OnlyPixAI
              <ArrowUpRight size={18} />
            </a>
            <Link
              href="/services/onlypixai"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-brand-text text-xs uppercase tracking-widest py-4 px-8 hover:border-brand-yellow hover:text-brand-yellow transition-colors"
            >
              How we use it for clients
            </Link>
          </div>
        </div>

        {/* Right — orbit visual + model legend */}
        <div className="space-y-6 md:space-y-8">
          <div className="opx-anim relative h-[420px] md:h-[540px] flex items-center justify-center">
            {/* Decorative concentric rings (static). Sized to sit
                comfortably inside / outside the enlarged tile orbit. */}
            <div className="absolute w-[320px] h-[320px] md:w-[440px] md:h-[440px] rounded-full border border-white/10" />
            <div className="absolute w-[210px] h-[210px] md:w-[280px] md:h-[280px] rounded-full border border-brand-yellow/20" />

            {/* Centre wordmark — derived from the OnlyPixAI service.number = 'PX' */}
            <div className="relative z-10 text-center pointer-events-none">
              <div className="text-3xl md:text-4xl font-serif italic text-brand-yellow leading-none">
                PX
              </div>
              <div className="text-[0.625rem] md:text-xs text-brand-muted tracking-widest mt-1 uppercase">
                Gateway
              </div>
            </div>

            {/* Rotating orbit container. The CSS class .opx-orbit-container
                spins the wrapper clockwise; each logo's inner
                .opx-orbit-counter spins anticlockwise at the same rate so
                the brand mark stays upright as it travels around the
                circle. On hover (or when the matching legend name is
                hovered/focused), `is-active` is added and the tile
                background fades to near-white while the logo image
                reveals its source brand colour. */}
            <div
              className="opx-orbit-container absolute inset-0 flex items-center justify-center"
              aria-hidden="true"
            >
              {orbitLogos.map((logo, i) => {
                const angle = (i / orbitLogos.length) * 360;
                const active = activeIndex === i;
                return (
                  <div
                    key={logo.alt}
                    className={`opx-orbit-logo absolute rounded-full backdrop-blur-sm flex items-center justify-center transition-colors border cursor-pointer ${active ? 'is-active bg-white/95 border-brand-yellow/60' : 'bg-brand-surface/80 border-white/10'}`}
                    style={{
                      width: orbitTileSize,
                      height: orbitTileSize,
                      transform: `rotate(${angle}deg) translateX(${orbitRadius}px) rotate(-${angle}deg)`
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                    title={logo.label}
                  >
                    {/* Inner counter-rotator. Same duration and easing as
                        the parent .opx-orbit-container; net visual
                        rotation on the image is zero. */}
                    <div className="opx-orbit-counter w-2/3 h-2/3 flex items-center justify-center">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend. Names every provider in the orbit so a non-technical
              visitor does not have to recognise each brand mark by
              sight. Each name is a button that synchronises hover/focus
              state with the orbit tile of the same index. */}
          <div className="opx-anim text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-yellow block mb-3">
              Routes to
            </span>
            <p className="text-sm text-brand-text/75 leading-relaxed mb-3 max-w-md md:max-w-none mx-auto md:mx-0">
              <span className="text-brand-yellow font-semibold">100+ LLMs</span>{' '}
              through one billed-once pipeline — every mainstream model,
              open source or closed, accessed through official, properly
              authorised channels.
            </p>
            <p className="text-sm leading-relaxed">
              {orbitLogos.map((logo, i) => {
                const active = activeIndex === i;
                return (
                  <React.Fragment key={logo.alt}>
                    {i > 0 && <span className="text-brand-muted/50 px-2" aria-hidden="true">·</span>}
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(i)}
                      onMouseLeave={() => setActiveIndex(null)}
                      onFocus={() => setActiveIndex(i)}
                      onBlur={() => setActiveIndex(null)}
                      className={`transition-colors cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow ${active ? 'text-brand-yellow' : 'text-brand-text/90 hover:text-brand-text'}`}
                      aria-label={`${logo.label} (${logo.alt})`}
                    >
                      {logo.label}
                    </button>
                  </React.Fragment>
                );
              })}
              <span className="text-brand-muted/50 px-2" aria-hidden="true">·</span>
              <span className="italic text-brand-muted">and more</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
