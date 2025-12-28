'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowLeft, Check } from 'lucide-react';
import { ServiceItem } from '@/types';

interface ServiceDetailClientProps {
  service: ServiceItem;
}

export const ServiceDetailClient: React.FC<ServiceDetailClientProps> = ({ service }) => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6 md:px-12 flex flex-col">
      <Link
        href="/#services"
        className="group flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-yellow-500 mb-12 transition-colors w-fit"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        RETURN_TO_BASE
      </Link>

      <div className="detail-anim border-b border-white/20 pb-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-yellow-500 font-mono text-xs tracking-widest block mb-2">SERVICE_PROTOCOL_{service.number}</span>
            <h1 className="text-6xl md:text-8xl font-serif italic text-white">{service.title}</h1>
          </div>
          <div className="font-mono text-xl md:text-2xl text-yellow-500">
            {service.price}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
        <div className="detail-anim col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold mb-6">The Approach</h3>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12">
            {service.fullDescription}
            <br /><br />
            We don&apos;t just build; we engineer. In a digital landscape saturated with mediocrity,
            Pixdyne delivers precision. Our methodology for {service.title} involves a rigorous
            audit of current systems followed by a complete architectural overhaul designed for scalability.
          </p>

          <h3 className="text-2xl font-bold mb-6">Technical Capabilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-4 border border-white/10 p-4 bg-white/5">
                <span className="text-yellow-500"><Check size={16} /></span>
                <span className="font-mono text-sm">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-anim col-span-1">
          <div className="bg-[#111] p-8 border border-white/10 sticky top-32">
            <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">Technologies</h4>
            <div className="flex flex-wrap gap-2 mb-12">
              {service.tags.map(tag => (
                <span key={tag} className="border border-white/20 px-3 py-1 rounded-full text-xs uppercase hover:bg-white hover:text-black transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>

            <div className="border-t border-white/10 pt-8">
              <h4 className="text-xl font-bold mb-4">Ready to deploy?</h4>
              <p className="text-sm text-gray-400 mb-6">
                Schedule a consultation with our lead engineers.
              </p>
              <Link
                href="/#contact"
                className="block w-full bg-yellow-500 text-black font-bold py-4 uppercase tracking-widest hover:bg-white transition-colors text-center"
              >
                Start Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
