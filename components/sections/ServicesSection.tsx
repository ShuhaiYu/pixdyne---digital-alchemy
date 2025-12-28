'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { getAllServices } from '@/lib/data/services';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ServicesSection: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const services = getAllServices();

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = listRef.current?.querySelectorAll('.service-item');

      gsap.fromTo(items || [],
        { opacity: 0.3, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 75%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );
    }, listRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="h-full w-full flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 p-8 md:p-12 border-r border-white/20 flex flex-col justify-between">
        <div>
          <h2 className="text-4xl md:text-6xl font-serif italic mb-6">Capabilities</h2>
          <p className="font-sans text-sm text-gray-400 max-w-xs leading-relaxed">
            We bridge the gap between aesthetic excellence and technical robustness.
            Our toolkit is vast, our precision is absolute.
          </p>
        </div>
        <div className="hidden md:block text-xs font-mono text-yellow-500">
          /// SERVICE_INDEX_V1.0
        </div>
      </div>

      <div className="w-full md:w-2/3 flex flex-col" ref={listRef}>
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="service-item group relative flex-1 border-b border-white/20 p-6 md:p-12 flex flex-col justify-center hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-baseline gap-6">
                <span className="text-xs font-mono text-yellow-500">({service.number})</span>
                <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight group-hover:text-yellow-500 transition-colors">
                  {service.title}
                </h3>
              </div>
              <span className="hidden md:block font-mono text-sm text-white/50 border border-white/20 px-3 py-1 rounded group-hover:bg-yellow-500 group-hover:text-black group-hover:border-yellow-500 transition-all">
                {service.price}
              </span>
            </div>

            <div className="md:pl-12 mt-2 flex justify-between items-end">
              <div className="max-w-md">
                <p className="text-sm md:text-base text-gray-400 group-hover:text-white transition-colors mb-4">
                  {service.description}
                </p>
                <span className="md:hidden font-mono text-xs text-yellow-500">
                  {service.price}
                </span>
                <span className="text-xs font-mono text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  CLICK_TO_EXPAND -&gt;
                </span>
              </div>

              <div className="hidden md:flex gap-2">
                {service.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase border border-white/20 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
