'use client';

import React from 'react';
import { LogoLoop } from '@/components/LogoLoop';

const logos = [
  { src: '/logos/nexus.svg', alt: 'Nexus Dynamics' },
  { src: '/logos/apex.svg', alt: 'Apex Corp' },
  { src: '/logos/velocity.svg', alt: 'Velocity Labs' },
  { src: '/logos/echo.svg', alt: 'Echo Systems' },
  { src: '/logos/stratus.svg', alt: 'Stratus Cloud' },
  { src: '/logos/omega.svg', alt: 'Omega Industries' },
  { src: '/logos/quantum.svg', alt: 'Quantum Soft' },
  { src: '/logos/vortex.svg', alt: 'Vortex Media' },
  { src: '/logos/cyber.svg', alt: 'Cybernetics' },
  { src: '/logos/zenith.svg', alt: 'Zenith Global' },
];

export const ClientLogosSection: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center bg-[#111] text-white overflow-hidden relative py-16 sm:py-20 md:py-24">
      <div className="absolute top-16 sm:top-20 md:top-24 left-0 w-full px-4 sm:px-8 md:px-12 py-4 sm:py-6 flex justify-between items-baseline border-b border-white/10 z-10">
        <h2 className="text-xs sm:text-sm font-mono text-yellow-500 tracking-widest uppercase">/// Trusted_By</h2>
        <p className="text-[10px] sm:text-xs text-gray-500 font-mono hidden sm:block">GLOBAL PARTNERS</p>
      </div>

      <div className="w-full relative py-8 sm:py-10 md:py-12 bg-black/50 backdrop-blur-sm border-y border-white/10 my-6 sm:my-8">
        <LogoLoop
          logos={logos}
          direction="left"
          speed={80}
          logoHeight={36}
          gap={40}
          pauseOnHover
          fadeOut
          fadeOutColor="#111"
          className="[&_img]:invert [&_img]:opacity-60 hover:[&_img]:opacity-100 md:[&_img]:h-12 [&_img]:h-9"
        />
      </div>

      <div className="w-full relative py-4 sm:py-6 opacity-60 mb-6 sm:mb-8">
        <LogoLoop
          logos={logos}
          direction="right"
          speed={60}
          logoHeight={24}
          gap={32}
          pauseOnHover
          fadeOut
          fadeOutColor="#111"
          className="[&_img]:invert [&_img]:opacity-40 md:[&_img]:h-8 [&_img]:h-6"
        />
      </div>

      <div className="w-full px-4 sm:px-8 md:px-12 flex justify-end">
        <p className="text-right text-gray-500 text-xs sm:text-sm max-w-xs font-sans">
          Powering digital infrastructure for industry leaders across finance, tech, and healthcare.
        </p>
      </div>
    </div>
  );
};
