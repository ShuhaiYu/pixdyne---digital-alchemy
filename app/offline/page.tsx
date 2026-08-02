// Offline fallback, precached by the service worker at install time and
// served only when a navigation request cannot reach the network.
//
// Kept deliberately static: no client components, no images, no fonts
// beyond the ones the rest of the site already loads, so the cached entry
// stays small and can never itself fail to render.
//
// noindex — this page has no standalone value in search results and would
// otherwise dilute the crawl budget of a small site.

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Offline',
  description: 'You are currently offline. Reconnect to continue browsing Pixdyne.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-brand-black text-brand-text px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-yellow mb-6">
        No Connection
      </p>

      <h1 className="font-serif italic text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
        You are offline
      </h1>

      <p className="font-sans text-base text-brand-muted max-w-md leading-relaxed mb-10">
        This page is not available without a connection. Pages you have already
        visited will still open, and everything else loads again once you are
        back online.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-brand-yellow text-brand-black px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-brand-yellow-hover transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
      >
        Try Again
      </Link>
    </div>
  );
}
