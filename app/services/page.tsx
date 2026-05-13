import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/data/services';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Web development, system development, and operations from a Melbourne team. Plus OnlyPixAI — our unified AI gateway product. Pick what fits how your team actually works.',
  alternates: {
    canonical: 'https://pixdyne.com/services'
  },
  openGraph: {
    title: 'Services | Pixdyne',
    description:
      'Web development, system development, operations, and OnlyPixAI from a Melbourne team. Pick what fits how your team actually works.',
    url: 'https://pixdyne.com/services'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | Pixdyne',
    description: 'Web, custom systems, ongoing operations, and OnlyPixAI from Melbourne.'
  }
};

export default function ServicesIndexPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://pixdyne.com' },
    { name: 'Services', url: 'https://pixdyne.com/services' }
  ];

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
        }}
      />
      <div className="pt-32 md:pt-40 bg-brand-black text-brand-text min-h-screen">
        <section
          className="w-full px-6 md:px-12 lg:px-16 pb-24 md:pb-32"
          aria-label="Services overview"
        >
          <div className="max-w-7xl mx-auto">
            {/* Hero block */}
            <header className="mb-16 md:mb-24 max-w-5xl">
              <span className="text-brand-yellow font-mono text-xs sm:text-sm font-bold uppercase tracking-widest block mb-6">
                Services
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-serif italic leading-[0.95] text-brand-text mb-10">
                What we deliver.
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-brand-muted leading-relaxed max-w-3xl">
                Three service lines and one flagship product. We pick the
                platform that fits how your team will run it after launch,
                not whatever is easiest to build.
              </p>
            </header>

            {/* Services list. Editorial layout per service: numbered
                kicker, large serif italic title with hover arrow, prose
                description, inline middot-separated tag row, and a
                small "View details" link. Reads as a catalogue, not a
                grid of duplicate cards. */}
            <div className="border-t border-white/10">
              {services.map((service) => {
                const isProduct = service.tier === 'product';
                const kicker = isProduct
                  ? `PRODUCT · ${service.number}`
                  : `SERVICE · ${service.number}`;
                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group block border-b border-white/10 py-12 md:py-16 hover:bg-brand-black/[0.4] transition-colors"
                  >
                    <span className="text-xs font-mono text-brand-yellow tracking-widest block mb-4">
                      {kicker}
                    </span>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="flex-1 max-w-4xl">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-brand-text group-hover:text-brand-yellow transition-colors leading-[1.05]">
                          {service.title}
                        </h2>
                        <p className="mt-5 text-base md:text-lg text-brand-text/85 leading-relaxed max-w-3xl">
                          {service.description}
                        </p>
                        {service.tags.length > 0 && (
                          <p className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-1 text-xs text-brand-muted">
                            {service.tags.slice(0, 6).map((tag, i) => (
                              <span
                                key={tag}
                                className="flex items-center gap-2"
                              >
                                {i > 0 && (
                                  <span
                                    aria-hidden="true"
                                    className="text-brand-muted/40"
                                  >
                                    ·
                                  </span>
                                )}
                                <span>{tag}</span>
                              </span>
                            ))}
                          </p>
                        )}
                      </div>
                      <ArrowUpRight
                        size={32}
                        className="text-brand-yellow flex-shrink-0 transition-transform group-hover:-rotate-12 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Closing CTA */}
            <div className="mt-20 md:mt-28 pt-10 md:pt-12 border-t border-white/10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-5xl font-serif italic text-brand-text mb-4 leading-tight">
                    Not sure which fits?
                  </h2>
                  <p className="text-base md:text-lg text-brand-muted">
                    Tell us about the workflow, system, or website you want
                    built. We come back with a scope, timeline, and quote.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="self-start md:self-end inline-flex items-center gap-3 bg-brand-yellow text-brand-black font-bold text-sm uppercase tracking-widest py-4 px-8 hover:bg-brand-yellow-hover transition-colors flex-shrink-0"
                >
                  Talk to us
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
