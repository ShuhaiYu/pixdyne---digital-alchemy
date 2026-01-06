'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { getAllCaseStudies } from '@/lib/data/case-studies';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const CaseStudySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cases = getAllCaseStudies();

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.case-card', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full p-4 pt-24 md:p-12 md:pt-28 flex flex-col">
      <div className="flex justify-between items-end mb-12 border-b border-white/20 pb-6">
        <h2 className="text-4xl md:text-6xl font-serif">Selected Works</h2>
        <Link href="#work" className="text-sm font-mono uppercase hover:text-yellow-500 transition-colors">View Archive -&gt;</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full pb-20">
        {cases.map((project) => (
          <Link
            key={project.id}
            href={`/work/${project.slug}`}
            className="case-card group relative overflow-hidden bg-gray-900 cursor-pointer h-[40vh] md:h-[50vh]"
          >
            <Image
              src={project.img}
              alt={`${project.name} - ${project.category} case study by Pixdyne`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <span className="text-yellow-500 text-xs font-mono mb-2">{project.category}</span>
              <h3 className="text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{project.name}</h3>
              <span className="text-xs font-mono mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100 text-white/70">
                VIEW_CASE_STUDY
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
