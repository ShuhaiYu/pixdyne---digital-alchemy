'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { CaseStudyItem } from '@/types';

interface WorkDetailClientProps {
  work: CaseStudyItem;
}

export const WorkDetailClient: React.FC<WorkDetailClientProps> = ({ work }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.hero-img', { scale: 1.1, opacity: 0, duration: 1.2, ease: 'power2.out' })
        .from('.work-content', { y: 50, opacity: 0, stagger: 0.1, duration: 0.8 }, '-=0.8');
    }, containerRef);
    return () => ctx.revert();
  }, [work]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white pb-20 pt-20">
      {/* Sub-navigation */}
      <div className="w-full px-6 md:px-12 py-6 flex justify-between items-center z-40 relative">
        <Link
          href="/#work"
          className="flex items-center gap-2 text-sm font-mono text-white hover:text-yellow-500 transition-colors"
        >
          <ArrowLeft size={16} />
          BACK_TO_ARCHIVE
        </Link>
      </div>

      {/* Hero Image */}
      <div className="h-[60vh] md:h-[80vh] w-full overflow-hidden relative">
        <Image
          src={work.img}
          alt={`${work.name} - ${work.category} project by Pixdyne`}
          fill
          className="hero-img object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <span className="work-content block text-yellow-500 font-mono text-sm mb-2">{work.category}</span>
          <h1 className="work-content text-5xl md:text-8xl font-serif italic">{work.name}</h1>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-20 grid grid-cols-1 md:grid-cols-12 gap-12">

        {/* Stats Sidebar */}
        <div className="work-content col-span-1 md:col-span-3">
          <div className="flex flex-col gap-8 text-sm font-mono text-gray-400">
            <div>
              <span className="block text-white font-bold uppercase mb-1">Client</span>
              {work.client}
            </div>
            <div>
              <span className="block text-white font-bold uppercase mb-1">Year</span>
              {work.year}
            </div>
            <div>
              <span className="block text-white font-bold uppercase mb-1">Stack</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {work.stack.map(tech => (
                  <span key={tech} className="after:content-[',_'] last:after:content-['']">{tech}</span>
                ))}
              </div>
            </div>

            <a href="#" className="flex items-center gap-2 text-yellow-500 hover:text-white transition-colors mt-4">
              VISIT LIVE SITE <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Main Text */}
        <div className="col-span-1 md:col-span-9 flex flex-col gap-12">
          <div className="work-content">
            <h2 className="text-3xl font-bold mb-4">The Challenge</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {work.challenge}
            </p>
          </div>

          <div className="work-content">
            <h2 className="text-3xl font-bold mb-4">The Solution</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {work.solution}
            </p>
          </div>

          {/* Image Grid */}
          <div className="work-content grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-gray-800 h-64 md:h-80 overflow-hidden relative">
              <Image
                src={`https://picsum.photos/600/800?random=${work.id}a`}
                alt={`${work.name} project detail 1`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="bg-gray-800 h-64 md:h-80 overflow-hidden relative">
              <Image
                src={`https://picsum.photos/600/800?random=${work.id}b`}
                alt={`${work.name} project detail 2`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

      </div>

      <div className="work-content flex justify-center mt-24">
        <Link href="/#work" className="text-6xl font-serif italic text-gray-700 hover:text-white transition-colors duration-300">
          Next Project -&gt;
        </Link>
      </div>
    </div>
  );
};
