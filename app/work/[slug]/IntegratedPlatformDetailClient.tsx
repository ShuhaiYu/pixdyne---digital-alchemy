'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudyItem } from '@/types';

interface IntegratedPlatformDetailClientProps {
  work: CaseStudyItem;
}

const CONTAINER_OUTER = 'max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12';
const CONTAINER_GALLERY = 'max-w-5xl mx-auto w-full px-4 md:px-8 lg:px-12';
const CONTAINER_PROSE = 'max-w-3xl mx-auto w-full px-4 md:px-8 lg:px-12';

type GalleryItem = NonNullable<CaseStudyItem['gallery']>[number];

export const IntegratedPlatformDetailClient: React.FC<IntegratedPlatformDetailClientProps> = ({ work }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasHero = Boolean(work.img);

  const liveDisplay = work.liveUrl
    ? work.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : null;

  const hasMetrics = Boolean(work.metrics && work.metrics.length > 0);
  const hasHighlights = Boolean(work.highlights && work.highlights.length > 0);

  const storefrontTech = work.storefront;
  const systemStack = work.stack.filter((s) => s !== work.storefront);

  // Asymmetric placement: pair the first two figures with the two
  // narrative sections (challenge + solution), zigzag left/right.
  // Anything past the second figure stacks at the bottom of the body,
  // before the closing CTA.
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
        { y: 32, opacity: 0, stagger: 0.07, duration: 0.7, ease: 'power3.out' },
        hasHero ? '-=0.8' : 0
      );
    }, containerRef);
    return () => ctx.revert();
  }, [work, hasHero]);

  return (
    <main ref={containerRef} className="min-h-screen bg-brand-black text-white">
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

      {/* Flagship banner + hero. */}
      <header className={`${CONTAINER_OUTER} pt-32 md:pt-36 pb-12 md:pb-16`}>
        <div className="reveal flex items-center gap-4 mb-10">
          <span className="h-px w-12 bg-brand-yellow" aria-hidden="true" />
          <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-brand-yellow">
            Flagship · Integrated Platform
          </span>
        </div>

        <h1 className="reveal font-serif italic text-white leading-[1.02] text-5xl sm:text-6xl md:text-7xl lg:text-[8.5rem]">
          {work.name}
        </h1>

        {work.shortDescription && (
          <p className="reveal mt-10 max-w-3xl text-xl md:text-2xl text-white/75 leading-relaxed font-serif italic">
            {work.shortDescription}
          </p>
        )}
      </header>

      {/* Dual-engine reveal. */}
      <section className={`${CONTAINER_OUTER} pb-16 md:pb-24`}>
        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <DualEngineCard
            kicker="Storefront"
            heading={storefrontTech ?? 'Customer-facing front end'}
            body={
              storefrontTech
                ? 'The customer surface — where visitors browse, decide, and buy.'
                : 'The customer-facing surface. Specifics filled in per project.'
            }
          />
          <DualEngineCard
            kicker="Internal system"
            heading="Custom-built operating layer"
            body={
              systemStack.length > 0
                ? systemStack.join(' · ')
                : 'The bespoke system the team uses to actually run the business.'
            }
          />
        </div>
      </section>

      {/* Metadata strip. */}
      <section className={`${CONTAINER_OUTER} pb-16 md:pb-24`}>
        <dl className="reveal grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-t border-white/10 pt-10">
          <MetaRow label="Client" value={work.client} />

          {work.stack && work.stack.length > 0 && (
            <MetaRow label="Full stack" value={work.stack.join(' · ')} />
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

      {/* Numbers strip (optional). */}
      {hasMetrics && (
        <section className="border-t border-b border-white/10 bg-brand-surface/40">
          <div className={`${CONTAINER_OUTER} py-16 md:py-24`}>
            <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
              {work.metrics!.map((m, i) => (
                <div key={i}>
                  <div className="font-serif italic text-white text-5xl md:text-6xl lg:text-7xl leading-none">
                    {m.value}
                  </div>
                  <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-brand-yellow mt-3">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Narrative body — asymmetric, zigzag pairs. */}
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
        <section className={`${CONTAINER_OUTER} ${hasHighlights ? 'pb-16 md:pb-24' : 'pb-20 md:pb-28'}`}>
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

        {hasHighlights && (
          <section className={`${CONTAINER_PROSE} pb-20 md:pb-28`}>
            <div className="reveal">
              <span className="block font-mono text-xs tracking-[0.3em] uppercase text-brand-yellow mb-4">
                (03)
              </span>
              <h2 className="font-serif italic text-white leading-tight text-3xl sm:text-4xl md:text-5xl mb-8">
                Key capabilities
              </h2>
              <ul className="space-y-4">
                {work.highlights!.map((h, i) => (
                  <li
                    key={i}
                    className="flex gap-4 text-white/75 text-lg md:text-xl leading-relaxed"
                  >
                    <span className="text-brand-yellow font-mono text-sm pt-1 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
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

      {/* Closing CTA. */}
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

interface DualEngineCardProps {
  kicker: string;
  heading: string;
  body: string;
}

const DualEngineCard: React.FC<DualEngineCardProps> = ({ kicker, heading, body }) => (
  <div className="border border-white/10 bg-white/[0.02] rounded-2xl p-8 md:p-10 h-full">
    <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-brand-yellow mb-4 block">
      {kicker}
    </span>
    <h3 className="font-serif italic text-white text-2xl md:text-3xl leading-tight mb-3">
      {heading}
    </h3>
    <p className="text-white/65 text-sm md:text-base leading-relaxed">
      {body}
    </p>
  </div>
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
