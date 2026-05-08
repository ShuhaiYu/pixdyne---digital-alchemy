'use client';

import React from 'react';
import { LogoLoop } from '@/components/LogoLoop';

// Platform marquee. Honest framing: these are the platforms Pixdyne
// builds and operates on, not customers we are claiming. See CLAUDE.md
// rule 8 (no fabricated client logos) and rule 10 (business-owner
// vocabulary).
//
// Source SVGs:
// - gilbarbara/logos (CC-BY 4.0): 13 brand logos
// - devicons/devicon (MIT): magento
// - hand-typeset wordmarks (own work): netsuite, myob
//
// Brand trademarks are owned by their respective companies. Use here is
// limited to indicating the technology platforms we deliver projects on.
//
// Visual treatment: monochrome white by default (CSS filter), revealing
// original brand colour on hover.

const logos = [
  // E-commerce and web platforms
  { src: '/logos/wordpress.svg', alt: 'WordPress' },
  { src: '/logos/shopify.svg', alt: 'Shopify' },
  { src: '/logos/woocommerce.svg', alt: 'WooCommerce' },
  { src: '/logos/webflow.svg', alt: 'Webflow' },
  { src: '/logos/magento.svg', alt: 'Magento' },
  // Business systems
  { src: '/logos/netsuite.svg', alt: 'NetSuite' },
  { src: '/logos/hubspot.svg', alt: 'HubSpot' },
  { src: '/logos/salesforce.svg', alt: 'Salesforce' },
  { src: '/logos/xero.svg', alt: 'Xero' },
  { src: '/logos/myob.svg', alt: 'MYOB' },
  // Infrastructure
  { src: '/logos/aws.svg', alt: 'Amazon Web Services' },
  { src: '/logos/googlecloud.svg', alt: 'Google Cloud' },
  { src: '/logos/cloudflare.svg', alt: 'Cloudflare' },
  // AI providers (working ground for OnlyPixAI and AI delivery work)
  { src: '/logos/openai.svg', alt: 'OpenAI' },
  { src: '/logos/anthropic.svg', alt: 'Claude (Anthropic)' },
  { src: '/logos/googlegemini.svg', alt: 'Google Gemini' }
];

// Tailwind arbitrary-property classes:
// - Each <img> renders white by default via brightness(0) invert(1)
//   filter plus reduced opacity, so coloured and monochrome SVGs look
//   uniform.
// - On individual <img> hover, the filter is removed and opacity goes
//   to full, revealing the source brand colours from the SVG.
// - A short transition keeps the colour-in feel intentional.
const logoLoopClasses = [
  '[&_img]:[filter:brightness(0)_invert(1)]',
  '[&_img]:opacity-70',
  '[&_img]:transition-all',
  '[&_img]:duration-300',
  '[&_img:hover]:[filter:none]',
  '[&_img:hover]:opacity-100',
  'md:[&_img]:h-12',
  '[&_img]:h-9'
].join(' ');

const logoLoopClassesSecondary = [
  '[&_img]:[filter:brightness(0)_invert(1)]',
  '[&_img]:opacity-50',
  '[&_img]:transition-all',
  '[&_img]:duration-300',
  '[&_img:hover]:[filter:none]',
  '[&_img:hover]:opacity-100',
  'md:[&_img]:h-8',
  '[&_img]:h-6'
].join(' ');

export const ClientLogosSection: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center bg-brand-surface text-white overflow-hidden relative py-16 sm:py-20 md:py-24">
      <div className="absolute top-16 sm:top-20 md:top-24 left-0 w-full px-4 sm:px-8 md:px-12 py-4 sm:py-6 flex justify-between items-baseline border-b border-white/10 z-10">
        <h2 className="text-xs sm:text-sm font-mono font-bold text-brand-yellow tracking-widest uppercase">
          Working ground
        </h2>
        <p className="text-xs text-brand-muted font-mono hidden sm:block uppercase tracking-widest">
          Platforms we deliver on
        </p>
      </div>

      <div className="w-full relative py-8 sm:py-10 md:py-12 bg-black/50 backdrop-blur-sm border-y border-white/10 my-6 sm:my-8">
        <LogoLoop
          logos={logos}
          direction="left"
          speed={80}
          logoHeight={36}
          gap={48}
          pauseOnHover
          fadeOut
          fadeOutColor="var(--color-brand-surface)"
          className={logoLoopClasses}
        />
      </div>

      <div className="w-full relative py-4 sm:py-6 mb-6 sm:mb-8">
        <LogoLoop
          logos={logos}
          direction="right"
          speed={60}
          logoHeight={24}
          gap={40}
          pauseOnHover
          fadeOut
          fadeOutColor="var(--color-brand-surface)"
          className={logoLoopClassesSecondary}
        />
      </div>

      <div className="w-full px-4 sm:px-8 md:px-12 flex justify-end">
        <p className="text-right text-brand-muted text-xs sm:text-sm max-w-md font-sans leading-relaxed">
          From WordPress storefronts to NetSuite rollouts and bespoke systems on
          Node.js — we build on the platforms your team can keep using long
          after launch.
        </p>
      </div>
    </div>
  );
};
