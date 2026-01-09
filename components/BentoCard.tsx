'use client';

import { CaseStudyItem } from '@/types';
import Link from 'next/link';
import { motion } from 'motion/react';
import DecryptedText from './DecryptedText';

interface BentoCardProps {
  caseStudy: CaseStudyItem;
  className?: string;
}

export default function BentoCard({ caseStudy, className = '' }: BentoCardProps) {
  const size = caseStudy.cardSize || 'small';
  const accentColor = '#EAB308'; // 统一使用品牌黄色

  return (
    <Link href={`/work/${caseStudy.slug}`} className={`block ${className}`}>
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-2xl bg-neutral-900 group cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <motion.img
            src={caseStudy.img}
            alt={caseStudy.name}
            className="h-full w-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
          />
          {/* Accent Color Glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
            style={{ backgroundColor: accentColor }}
          />
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          {/* Category Badge */}
          <div
            className="inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium mb-3 backdrop-blur-sm"
            style={{
              backgroundColor: `${accentColor}20`,
              color: accentColor,
              border: `1px solid ${accentColor}40`,
            }}
          >
            {caseStudy.category}
          </div>

          {/* Project Name with Decrypt Effect */}
          <h3 className={`font-playfair font-bold text-white mb-2 ${
            size === 'featured' ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
          }`}>
            <DecryptedText
              text={caseStudy.name}
              animateOn="hover"
              speed={30}
              maxIterations={8}
              className="text-white"
              encryptedClassName="text-white/60"
            />
          </h3>

          {/* Short Description - Only for Featured */}
          {size === 'featured' && caseStudy.shortDescription && (
            <p className="text-white/70 text-sm md:text-base mb-4 line-clamp-2">
              {caseStudy.shortDescription}
            </p>
          )}

          {/* Tech Stack - For Featured and Wide */}
          {(size === 'featured' || size === 'wide') && (
            <div className="flex flex-wrap gap-2 mt-2">
              {caseStudy.stack.slice(0, size === 'featured' ? 4 : 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-md bg-white/10 text-white/80 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Year - For Wide and Small */}
          {size !== 'featured' && (
            <p className="text-white/50 text-xs mt-3">{caseStudy.year}</p>
          )}
        </div>

        {/* Corner Accent */}
        <div
          className="absolute top-4 right-4 w-3 h-3 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: accentColor }}
        />

        {/* Hover Arrow */}
        <motion.div
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
        >
          <svg
            className="w-6 h-6 text-white"
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
