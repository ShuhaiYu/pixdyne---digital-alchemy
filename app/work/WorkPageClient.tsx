'use client';

import { useRef, useLayoutEffect, useMemo } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CaseStudyItem } from '@/types';
import BentoCard from '@/components/BentoCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface WorkPageClientProps {
  caseStudies: CaseStudyItem[];
}

// Category display order. Integrated Platform sits first as the
// flagship surface — it is where the "front-end storefront + internal
// operating system" double-engine projects live. Then E-commerce,
// Marketing Site, Custom System.
//
// Each group carries one short line of prose that frames what the
// reader is about to see, so the page does not feel like a flat dump
// of cards.
interface CategoryGroup {
  category: string;
  label: string;
  prose: string;
  flagship?: boolean;
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    category: 'Integrated Platform',
    label: 'Integrated Platforms',
    prose:
      'The flagship builds — a customer-facing storefront paired with the internal operating system that runs it. Two engines designed and built as one.',
    flagship: true
  },
  {
    category: 'E-commerce',
    label: 'E-commerce',
    prose:
      'Online retail storefronts built to run cleanly day-to-day — payments, inventory, fulfilment, all in one back office.'
  },
  {
    category: 'Marketing Site',
    label: 'Marketing Sites',
    prose:
      'Marketing surfaces designed to convert research traffic into qualified enquiries — credibility, structure, and lead capture done with care.'
  },
  {
    category: 'Custom System',
    label: 'Custom Systems',
    prose:
      'Bespoke systems built for one specific operation, where the off-the-shelf option would have forced the business to bend around the software.'
  }
];

export default function WorkPageClient({ caseStudies }: WorkPageClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isEmpty = caseStudies.length === 0;

  // Group + sort: featured items first within each category, then the
  // rest in natural array order. Memoised because the case-study list
  // does not change on the client and recomputing on every render is
  // wasteful.
  const grouped = useMemo(() => {
    return CATEGORY_GROUPS.map((group) => {
      const items = caseStudies
        .filter((c) => c.category === group.category)
        .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
      return { ...group, items };
    }).filter((group) => group.items.length > 0);
  }, [caseStudies]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveals first.
      gsap.from('.work-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Each category section reveals when it scrolls into view, so
      // the page doesn't try to animate 30 cards at the same moment.
      gsap.utils.toArray<HTMLElement>('.work-group').forEach((group) => {
        const heading = group.querySelector('.work-group-heading');
        const cards = group.querySelectorAll('.work-card');

        if (heading) {
          gsap.from(heading, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: group, start: 'top 80%' }
          });
        }

        if (cards.length) {
          gsap.from(cards, {
            y: 40,
            opacity: 0,
            stagger: 0.06,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: group, start: 'top 75%' }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-brand-black text-white">
      {/* Header. Container width and horizontal padding scale match
          TeamSection ("How we work") so every interior page shares
          the same editorial gutter on wide displays. */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12 pt-32 pb-12 md:pb-16">
        <div className="work-header border-b border-white/10 pb-10 md:pb-12">
          <span className="text-brand-yellow text-xs font-mono tracking-[0.25em] uppercase mb-3 block">
            Selected case studies
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic leading-[1.02]">
            Our Work
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl leading-relaxed mt-6">
            Selected projects from Pixdyne. Websites, online stores, custom systems,
            and the integrated platforms that combine them — built and operated
            alongside our clients since 2018.
          </p>
        </div>
      </div>

      {/* Empty state vs. grouped grid */}
      {isEmpty ? (
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12 pb-24">
          <div className="mx-auto max-w-2xl text-center border border-white/10 bg-white/[0.02] rounded-2xl p-10 md:p-16 mt-8">
            <span className="text-brand-yellow text-xs font-mono tracking-widest uppercase block mb-3">
              Coming soon
            </span>
            <h2 className="text-2xl md:text-3xl font-serif italic text-white mb-4 leading-tight">
              Real client work, on the way
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto">
              We are putting together a set of case studies that fairly represent
              the work, the constraints, and the people involved. Until that is
              ready, we would rather show nothing than show filler.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-brand-yellow text-brand-yellow font-mono text-xs uppercase tracking-widest rounded-full hover:bg-brand-yellow hover:text-black transition-colors"
            >
              Talk to us in the meantime
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {grouped.map((group, index) => (
            <CategorySection
              key={group.category}
              label={group.label}
              prose={group.prose}
              items={group.items}
              flagship={group.flagship}
              isFirst={index === 0}
              isLast={index === grouped.length - 1}
            />
          ))}
        </>
      )}

      {/* Closing CTA. Same container so the divider line and inner
          content all align on the same 7xl rail. */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-5xl font-serif italic mb-4">
            Have a project in mind?
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto leading-relaxed">
            Send us a brief and we will come back with a scope, timeline, and quote.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-yellow text-black font-medium rounded-full hover:bg-brand-yellow-hover transition-colors"
          >
            Start a Conversation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}

// One category block — heading + prose + grid. Flagship groups (only
// Integrated Platform for now) get a 2-col grid on lg so the cards
// land bigger; other groups stay at 3-col.
interface CategorySectionProps {
  label: string;
  prose: string;
  items: CaseStudyItem[];
  flagship?: boolean;
  isFirst: boolean;
  isLast: boolean;
}

function CategorySection({
  label,
  prose,
  items,
  flagship,
  isFirst,
  isLast
}: CategorySectionProps) {
  return (
    <section
      className={`work-group ${isFirst ? 'pt-4' : 'pt-16 md:pt-24 border-t border-white/10'} ${
        isLast ? 'pb-16 md:pb-24' : 'pb-4'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12">
        <div className="work-group-heading flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <span className="text-brand-yellow text-xs font-mono tracking-[0.25em] uppercase mb-3 block">
              {flagship ? 'Flagship' : 'Category'} · {items.length} {items.length === 1 ? 'project' : 'projects'}
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif italic leading-[1.05]">
              {label}
            </h2>
          </div>
          <p className="text-white/65 text-base md:text-lg max-w-md leading-relaxed">
            {prose}
          </p>
        </div>

        <div
          className={`grid grid-cols-1 ${
            flagship ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
          } gap-6`}
        >
          {items.map((project) => (
            <div key={project.id} className="work-card">
              <BentoCard
                caseStudy={{
                  ...project,
                  cardSize: 'small'
                }}
                className={flagship ? 'h-[380px] md:h-[420px]' : 'h-[340px]'}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
