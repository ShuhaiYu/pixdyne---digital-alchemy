'use client';

import { CaseStudyItem } from '@/types';
import Link from 'next/link';
import { motion } from 'motion/react';
import DecryptedText from './DecryptedText';

interface MasonryCardProps {
  caseStudy: CaseStudyItem;
}

export default function MasonryCard({ caseStudy }: MasonryCardProps) {
  const accentColor = '#EAB308'; // 品牌黄色

  return (
    <Link href={`/work/${caseStudy.slug}`} className="block w-full">
      <motion.div
        className="relative w-full overflow-hidden rounded-2xl bg-neutral-900 group cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Image Container - Natural aspect ratio */}
        <div className="relative w-full overflow-hidden">
          <motion.img
            src={caseStudy.img}
            alt={caseStudy.name}
            className="w-full h-auto block"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          {/* Accent Color Glow on Hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500"
            style={{ backgroundColor: accentColor }}
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Category Badge */}
          <div
            className="inline-flex w-fit px-2 py-0.5 rounded-full text-[10px] font-medium mb-2 backdrop-blur-sm"
            style={{
              backgroundColor: `${accentColor}20`,
              color: accentColor,
              border: `1px solid ${accentColor}40`,
            }}
          >
            {caseStudy.category}
          </div>

          {/* Project Name with Decrypt Effect */}
          <h3 className="font-playfair font-bold text-white text-lg md:text-xl leading-tight">
            <DecryptedText
              text={caseStudy.name}
              animateOn="hover"
              speed={30}
              maxIterations={8}
              className="text-white"
              encryptedClassName="text-white/60"
            />
          </h3>

          {/* Year */}
          <p className="text-white/50 text-xs mt-1">{caseStudy.year}</p>
        </div>

        {/* Corner Accent Dot */}
        <div
          className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: accentColor }}
        />

        {/* Hover Arrow */}
        <motion.div
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17L17 7M17 7H7M17 7v10"
            />
          </svg>
        </motion.div>
      </motion.div>
    </Link>
  );
}
