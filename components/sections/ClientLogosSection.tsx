'use client';

import React from 'react';
import { LogoLoop, type LogoItem } from '@/components/LogoLoop';

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

// Visual treatment is defined in globals.css under .platform-marquee /
// .platform-marquee--secondary. Each <img> renders white by default and
// reveals its source brand colour when its wrapping .logo-tile is
// hovered. The custom renderItem (renderLogoTile) is essential — the
// LogoLoop default <img> carries pointer-events:none, so we wrap the
// img in a .logo-tile span that does receive pointer events.
const logoLoopClasses = 'platform-marquee md:[&_img]:h-12 [&_img]:h-9';
const logoLoopClassesSecondary =
  'platform-marquee--secondary md:[&_img]:h-8 [&_img]:h-6';

const renderLogoTile = (item: LogoItem) => {
  // Only the {src, alt} variant is used in this section.
  if ('node' in item) return item.node as React.ReactNode;
  return (
    <span className="logo-tile inline-flex items-center cursor-default">
      <img
        src={item.src}
        alt={item.alt ?? ''}
        title={item.title ?? item.alt}
        className="h-[var(--logoloop-logoHeight)] w-auto block object-contain"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </span>
  );
};

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

      {/* Primary marquee strip. Backdrop is a warm gold-tinted dark
          rather than the previous near-black, so that hover-revealed
          brand colours (some of which are themselves black, e.g.
          OpenAI / Grok) still read against the surface. */}
      <div className="w-full relative py-8 sm:py-10 md:py-12 bg-brand-yellow/[0.08] backdrop-blur-sm border-y border-brand-yellow/15 my-6 sm:my-8">
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
          renderItem={renderLogoTile}
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
          renderItem={renderLogoTile}
        />
      </div>

      <div className="w-full px-4 sm:px-8 md:px-12 flex justify-end">
        <p className="text-right text-brand-muted text-xs sm:text-sm max-w-md font-sans leading-relaxed">
          E-commerce stores, ERP and CRM rollouts, internal systems, and the
          ongoing operations that keep them running — we build on platforms
          your team can keep using long after launch.
        </p>
      </div>
    </div>
  );
};
