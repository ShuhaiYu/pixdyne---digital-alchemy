'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowUpRight, Check, Plus } from 'lucide-react';
import { ServiceItem } from '@/types';

interface ServiceDetailClientProps {
  service: ServiceItem;
}

export const ServiceDetailClient: React.FC<ServiceDetailClientProps> = ({ service }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isProduct = service.tier === 'product';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.detail-anim', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, [service]);

  const protocolLabel = isProduct ? 'PRODUCT' : 'SERVICE';
  // Show the prominent header tag only when there is something
  // informative to put there: a real price, or the Product badge.
  // Services without a published price omit it (no "Get a quote" filler).
  const tagLabel: string | null = isProduct ? 'Product' : service.price ?? null;

  return (
    <div ref={containerRef} className="min-h-screen bg-brand-black text-brand-text pt-24 pb-20 px-6 md:px-12 flex flex-col">
      <a
        href="/#services"
        className="group flex items-center gap-2 text-sm font-mono text-brand-muted hover:text-brand-yellow-hover mb-12 transition-colors w-fit cursor-pointer"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Services
      </a>

      <div className="detail-anim border-b border-white/20 pb-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-brand-yellow font-mono text-xs tracking-widest block mb-2">{protocolLabel}_{service.number}</span>
            <h1 className="text-6xl md:text-8xl font-serif italic text-brand-text">{service.title}</h1>
          </div>
          {tagLabel && (
            <div className="font-mono text-xl md:text-2xl text-brand-yellow">
              {tagLabel}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
        <div className="detail-anim col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold mb-6">The Approach</h3>
          <p className="text-lg md:text-xl text-brand-text/85 leading-relaxed mb-12">
            {service.fullDescription}
          </p>

          {service.features.length > 0 && (
            <>
              <h3 className="text-2xl font-bold mb-6">{isProduct ? 'About this product' : 'What we deliver'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-4 border border-white/10 p-4 bg-white/5">
                    <span className="text-brand-yellow"><Check size={16} /></span>
                    <span className="font-mono text-sm">{feat}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {service.subServices && service.subServices.length > 0 && (
            <>
              <h3 className="text-2xl font-bold mb-6">Pick a service, or take the bundle</h3>
              <div className="space-y-6 mb-12">
                {service.subServices.map((sub) => (
                  <div key={sub.slug} className="border border-white/10 p-6 bg-white/5">
                    <h4 className="text-xl font-bold mb-2 text-brand-yellow">{sub.title}</h4>
                    <p className="text-sm text-brand-text/85 mb-4 leading-relaxed">{sub.description}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {sub.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs font-mono text-brand-muted">
                          <Check size={12} className="text-brand-yellow flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}

          {service.faqs && service.faqs.length > 0 && (
            <>
              {/* FAQ accordion. Native <details>/<summary> for accessibility
                  and zero-JS disclosure. The matching FAQPage JSON-LD is
                  emitted in page.tsx so Google can surface this as a SERP
                  rich result. Keep visible Q/A in sync with the schema —
                  divergence is a truth-auditor block. */}
              <h3 id="faq" className="text-2xl font-bold mb-6">Frequently asked</h3>
              <div className="space-y-2 mb-12">
                {service.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group border border-white/10 bg-white/[0.03] open:bg-white/[0.06] open:border-brand-yellow/30 transition-colors"
                  >
                    {/* list-none covers modern browsers. The
                        ::-webkit-details-marker arbitrary variant
                        suppresses the default disclosure triangle on
                        older WebKit (iOS Safari ≤ 16), otherwise it
                        would render alongside our <Plus> icon. */}
                    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <span className="font-serif italic text-base md:text-lg text-brand-text group-hover:text-brand-yellow transition-colors">
                        {faq.question}
                      </span>
                      <Plus
                        size={18}
                        className="text-brand-yellow flex-shrink-0 transition-transform duration-300 group-open:rotate-45"
                        aria-hidden="true"
                      />
                    </summary>
                    <div className="px-5 pb-5 pt-1 text-sm md:text-base text-brand-text/80 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="detail-anim col-span-1">
          <div className="bg-brand-surface p-8 border border-white/10 sticky top-32">
            <h4 className="text-sm font-mono text-brand-muted uppercase tracking-widest mb-6">
              {isProduct ? 'Tags' : 'Technologies'}
            </h4>
            <div className="flex flex-wrap gap-2 mb-12">
              {service.tags.map(tag => (
                <span key={tag} className="border border-white/20 px-3 py-1 rounded-full text-xs uppercase hover:bg-brand-white hover:text-brand-black transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>

            <div className="border-t border-white/10 pt-8">
              {isProduct && service.externalUrl ? (
                <>
                  <h4 className="text-xl font-bold mb-4">See it live</h4>
                  <p className="text-sm text-brand-muted mb-6">
                    OnlyPixAI runs in production. Visit to see how Pixdyne delivers AI to end users.
                  </p>
                  <a
                    href={service.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-brand-yellow text-brand-black font-bold py-4 uppercase tracking-widest hover:bg-brand-yellow-hover transition-colors text-center"
                  >
                    Visit OnlyPixAI
                    <ArrowUpRight size={18} />
                  </a>
                </>
              ) : (
                <>
                  <h4 className="text-xl font-bold mb-4">Talk to us</h4>
                  <p className="text-sm text-brand-muted mb-6">
                    Send us a brief and we will come back with a scope, timeline, and quote.
                  </p>
                  {/* Standalone /contact route — Contact is no longer a
                      homepage hash anchor. Plain <a> kept for parity
                      with the badge in HeroSection; could use next/link
                      now that the destination is a real route, but the
                      native anchor works just as well. */}
                  <a
                    href="/contact"
                    className="block w-full bg-brand-yellow text-brand-black font-bold py-4 uppercase tracking-widest hover:bg-brand-yellow-hover transition-colors text-center cursor-pointer"
                  >
                    Start a Project
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
