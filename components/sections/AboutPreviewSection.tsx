// Homepage About preview — small editorial tease for the /about
// destination page. Replaces the missing "who is Pixdyne" beat on the
// homepage without duplicating the full Approach pillars (TeamSection)
// or the deep-dive on /about itself. Reads in one breath, drives to
// /about, then yields to the Approach section below.

import Link from 'next/link';

export const AboutPreviewSection: React.FC = () => {
  return (
    <section
      className="w-full px-6 md:px-12 py-24 md:py-32 lg:py-40 max-w-7xl mx-auto"
      aria-label="About Pixdyne preview"
    >
      <span className="text-brand-yellow font-mono text-xs sm:text-sm font-bold uppercase tracking-widest block mb-8">
        About
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-20 items-end">
        <div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic leading-[1.05] text-brand-text mb-8">
            Melbourne-based.{' '}
            <span className="text-brand-yellow">At this since 2018.</span>
          </h2>
          <p className="text-lg md:text-xl text-brand-text/85 leading-relaxed max-w-2xl">
            We build and operate the websites, custom systems, and AI
            products our clients put in front of their customers and
            teams. We stay involved long after launch, and we bring real
            AI capability into the businesses we partner with.
          </p>
        </div>
        <div className="flex flex-col gap-4 lg:items-end">
          <p className="text-sm text-brand-muted lg:text-right max-w-xs">
            The longer story — what we stand for, what we deliver, how we
            partner.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 border border-brand-yellow text-brand-yellow text-sm uppercase tracking-widest py-4 px-8 hover:bg-brand-yellow hover:text-brand-black transition-colors w-fit"
          >
            Read more about us
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
