// Web app manifest — drives "Add to Home Screen" on iOS Safari and
// "Install app" on Chrome/Edge (desktop and Android).
//
// Replaces the hand-written public/site.webmanifest, which had drifted:
// it still carried the pre-2026-05-25 "Digital Alchemy" name, a
// theme_color of #eab308 (a generic yellow, not the brand gold #C8962A),
// a #000000 background (not the warm brand black), and no start_url /
// scope / id at all.
//
// Next.js serves this at /manifest.webmanifest and injects the
// <link rel="manifest"> automatically — app/layout.tsx must NOT also
// declare `manifest:` in its metadata, or the tag is emitted twice.
//
// Colour tokens are mirrored from app/globals.css @theme (CLAUDE.md §8).
// theme_color intentionally equals the `themeColor` in the root layout's
// viewport export — a mismatch makes the installed title bar disagree
// with the in-browser one.

import type { MetadataRoute } from 'next';
import { brand } from '@/lib/brand';
import { BUSINESS } from '@/lib/data/business';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    // `id` pins the app identity across start_url changes. Without it the
    // browser derives identity from start_url, so a later start_url edit
    // would register as a different app and orphan existing installs.
    id: '/',
    name: `${BUSINESS.name} — Melbourne Technology Partner`,
    short_name: BUSINESS.name,
    description:
      'Melbourne technology partner since 2018. Websites, custom systems, ongoing operations, and real AI capability for your business.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'any',
    lang: 'en-AU',
    dir: 'ltr',
    categories: ['business', 'productivity'],
    background_color: brand.black,
    theme_color: brand.black,
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      // Maskable variant: Android applies a platform mask (circle, squircle,
      // rounded square) and only the centre ~80% is guaranteed visible. The
      // `any` icons above are an edge-to-edge logo on transparency, so they
      // would lose their corners and show the system colour through. This
      // one is generated with the logo inset on an opaque brand-black field.
      {
        src: '/icon-maskable',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
