'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
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
  const tagLabel = isProduct ? 'Product' : (service.price ?? 'Get a quote');

  return (
    <div ref={containerRef} className="min-h-screen bg-brand-black text-white pt-24 pb-20 px-6 md:px-12 flex flex-col">
      <Link
        href="/#services"
        className="group flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-brand-yellow-hover mb-12 transition-colors w-fit"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Services
      </Link>

      <div className="detail-anim border-b border-white/20 pb-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-brand-yellow font-mono text-xs tracking-widest block mb-2">{protocolLabel}_{service.number}</span>
            <h1 className="text-6xl md:text-8xl font-serif italic text-white">{service.title}</h1>
          </div>
          <div className="font-mono text-xl md:text-2xl text-brand-yellow">
            {tagLabel}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
        <div className="detail-anim col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold mb-6">The Approach</h3>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12">
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
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">{sub.description}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {sub.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs font-mono text-gray-400">
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
        </div>

        <div className="detail-anim col-span-1">
          <div className="bg-brand-surface p-8 border border-white/10 sticky top-32">
            <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
              {isProduct ? 'Tags' : 'Technologies'}
            </h4>
            <div className="flex flex-wrap gap-2 mb-12">
              {service.tags.map(tag => (
                <span key={tag} className="border border-white/20 px-3 py-1 rounded-full text-xs uppercase hover:bg-white hover:text-black transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>

            <div className="border-t border-white/10 pt-8">
              {isProduct && service.externalUrl ? (
                <>
                  <h4 className="text-xl font-bold mb-4">See it live</h4>
                  <p className="text-sm text-gray-400 mb-6">
                    OnlyPixAI runs in production. Visit to see how Pixdyne delivers AI to end users.
                  </p>
                  <a
                    href={service.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-brand-yellow text-black font-bold py-4 uppercase tracking-widest hover:bg-white transition-colors text-center"
                  >
                    Visit OnlyPixAI
                    <ArrowUpRight size={18} />
                  </a>
                </>
              ) : (
                <>
                  <h4 className="text-xl font-bold mb-4">Talk to us</h4>
                  <p className="text-sm text-gray-400 mb-6">
                    Send us a brief and we will come back with a scope, timeline, and quote.
                  </p>
                  <Link
                    href="/#contact"
                    className="block w-full bg-brand-yellow text-black font-bold py-4 uppercase tracking-widest hover:bg-white transition-colors text-center"
                  >
                    Start a Project
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
