'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudyItem } from '@/types';

interface WorkDetailClientProps {
  work: CaseStudyItem;
}

// Editorial case-study detail surface.
//   - max-w-7xl   for hero text, metadata strip, asymmetric body, closing CTA
//   - max-w-5xl   for bottom-row figures (anything beyond the two body slots)
//   - max-w-3xl   for hero lede + when no figure is paired with a narrative
const CONTAINER_OUTER = 'max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12';
const CONTAINER_GALLERY = 'max-w-5xl mx-auto w-full px-4 md:px-8 lg:px-12';

type GalleryItem = NonNullable<CaseStudyItem['gallery']>[number];

export const WorkDetailClient: React.FC<WorkDetailClientProps> = ({ work }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasHero = Boolean(work.img);

  const liveDisplay = work.liveUrl
    ? work.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : null;

  // Asymmetric placement: pair the first two figures with the two
  // narrative sections (text/image side-by-side), reversed on the
  // second pair so the eye zigzags down the page. Anything past the
  // second figure stacks at the bottom of the body.
  const gallery = work.gallery ?? [];
  const figureForChallenge: GalleryItem | undefined = gallery[0];
  const figureForSolution: GalleryItem | undefined = gallery[1];
  const galleryBottom: GalleryItem[] = gallery.length > 2 ? gallery.slice(2) : [];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      if (hasHero) {
        tl.from('.hero-img', {
          scale: 1.08,
          opacity: 0,
          duration: 1.1,
          ease: 'power2.out'
        });
      }
      tl.from(
        '.reveal',
        { y: 32, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' },
        hasHero ? '-=0.8' : 0
      );
    }, containerRef);
    return () => ctx.revert();
  }, [work, hasHero]);

  return (
    <main ref={containerRef} className="min-h-screen bg-brand-black text-white">
      {/* Optional Pixdyne-shot hero image. Skipped for projects where
          only smartmockup screenshots exist — those land inside the
          body as inline gallery figures instead of pretending to be
          full-bleed hero art. */}
      {hasHero && (
        <div className="h-[60vh] md:h-[75vh] w-full overflow-hidden relative">
          <Image
            src={work.img!}
            alt={`${work.name} — ${work.category} project by Pixdyne`}
            fill
            className="hero-img object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
        </div>
      )}

      {/* Hero / lede. Editorial type-led header. */}
      <header className={`${CONTAINER_OUTER} pt-32 md:pt-36 pb-12 md:pb-16`}>
        <span className="reveal block font-mono text-xs tracking-[0.25em] uppercase text-brand-yellow mb-6">
          {work.category} · Case study
        </span>

        <h1 className="reveal font-serif italic text-white leading-[1.02] text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          {work.name}
        </h1>

        {work.shortDescription && (
          <p className="reveal mt-8 max-w-3xl text-lg md:text-xl text-white/70 leading-relaxed">
            {work.shortDescription}
          </p>
        )}
      </header>

      {/* Metadata strip. */}
      <section className={`${CONTAINER_OUTER} pb-16 md:pb-24`}>
        <dl className="reveal grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-t border-white/10 pt-10">
          <MetaRow label="Client" value={work.client} />

          {work.stack && work.stack.length > 0 && (
            <MetaRow label="Stack" value={work.stack.join(' · ')} />
          )}

          {work.liveUrl && (
            <MetaRow
              label="Visit"
              value={
                <a
                  href={work.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-yellow hover:text-white transition-colors"
                >
                  {liveDisplay}
                  <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                </a>
              }
            />
          )}

          {work.services && work.services.length > 0 && (
            <MetaRow
              label="Capability"
              value={
                <div className="flex flex-wrap gap-2">
                  {work.services.map((svc) => {
                    const slug = svc.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <Link
                        key={svc}
                        href={`/services/${slug}`}
                        className="inline-flex items-center gap-1.5 text-white hover:text-brand-yellow transition-colors"
                      >
                        {svc}
                        <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden="true" />
                      </Link>
                    );
                  })}
                </div>
              }
            />
          )}
        </dl>
      </section>

      {/* Body — asymmetric narrative + figure pairs. Each section uses
          a 12-col grid: 7 cols of text + 5 cols of image, alternating
          left/right between sections to create a zigzag editorial
          rhythm. Falls back to a single-column prose width when no
          figure is supplied for a section. */}
      <div className="bg-brand-black border-t border-white/10">
        {/* (01) Challenge — text left, image right */}
        <section className={`${CONTAINER_OUTER} pt-20 md:pt-28`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className={figureForChallenge ? 'lg:col-span-7' : 'lg:col-span-12 max-w-3xl'}>
              <NarrativeSection number="01" title="The challenge" body={work.challenge} />
            </div>
            {figureForChallenge && (
              <div className="lg:col-span-5 lg:pt-16">
                <GalleryFigure shot={figureForChallenge} />
              </div>
            )}
          </div>
        </section>

        <div className="h-16 md:h-24" aria-hidden="true" />

        {/* (02) Solution — image left, text right (reversed for rhythm) */}
        <section className={`${CONTAINER_OUTER} pb-20 md:pb-28`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {figureForSolution && (
              <div className="lg:col-span-5 lg:pt-16 order-last lg:order-first">
                <GalleryFigure shot={figureForSolution} />
              </div>
            )}
            <div className={figureForSolution ? 'lg:col-span-7' : 'lg:col-span-12 max-w-3xl'}>
              <NarrativeSection number="02" title="What we built" body={work.solution} />
            </div>
          </div>
        </section>
      </div>

      {/* Bottom inline figures — anything left over after top/mid. */}
      {galleryBottom.length > 0 && (
        <section className="border-t border-white/10">
          <div className={`${CONTAINER_GALLERY} py-20 md:py-28`}>
            <div className="flex flex-col gap-12 md:gap-16">
              {galleryBottom.map((shot, i) => (
                <GalleryFigure key={i} shot={shot} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing — large italic CTA to /work. */}
      <footer className="border-t border-white/10">
        <div className={`${CONTAINER_OUTER} py-20 md:py-28`}>
          <span className="reveal block font-mono text-xs tracking-[0.25em] uppercase text-brand-yellow mb-6">
            Keep going
          </span>
          <Link
            href="/work"
            className="reveal group inline-flex items-baseline gap-4 font-serif italic text-white/40 hover:text-brand-yellow transition-colors duration-300"
          >
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none">
              See more of the work
            </span>
            <ArrowUpRight
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 self-center group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              strokeWidth={1.25}
              aria-hidden="true"
            />
          </Link>
        </div>
      </footer>
    </main>
  );
};

// Local sub-components — kept inline because they only make sense in
// this layout. Lifting them out would over-fragment a single editorial
// surface; if a third detail surface ever reaches for them, then is
// the time to extract.

interface GalleryFigureProps {
  shot: GalleryItem;
}

const GalleryFigure: React.FC<GalleryFigureProps> = ({ shot }) => (
  <figure className="reveal">
    <Image
      src={shot.src}
      alt={shot.alt ?? ''}
      width={1600}
      height={900}
      sizes="(max-width: 1280px) 100vw, 1200px"
      className="w-full h-auto"
    />
    {shot.caption && (
      <figcaption className="mt-3 font-mono text-[11px] tracking-[0.25em] uppercase text-white/40">
        {shot.caption}
      </figcaption>
    )}
  </figure>
);

interface MetaRowProps {
  label: string;
  value: React.ReactNode;
}

const MetaRow: React.FC<MetaRowProps> = ({ label, value }) => (
  <div>
    <dt className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/40 mb-2">
      {label}
    </dt>
    <dd className="text-white/85 text-base md:text-lg leading-relaxed">
      {value}
    </dd>
  </div>
);

interface NarrativeSectionProps {
  number: string;
  title: string;
  body: string;
}

const NarrativeSection: React.FC<NarrativeSectionProps> = ({ number, title, body }) => (
  <section className="reveal">
    <span className="block font-mono text-xs tracking-[0.3em] uppercase text-brand-yellow mb-4">
      ({number})
    </span>
    <h2 className="font-serif italic text-white leading-tight text-3xl sm:text-4xl md:text-5xl mb-8">
      {title}
    </h2>
    <p className="text-white/75 text-lg md:text-xl leading-relaxed whitespace-pre-line">
      {body}
    </p>
  </section>
);
