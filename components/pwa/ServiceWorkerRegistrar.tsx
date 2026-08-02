'use client';

import { useEffect } from 'react';

/**
 * Registers /sw.js so the site is installable as an app.
 *
 * Renders nothing. Registration is deferred to the `load` event so it never
 * competes with first paint or LCP for bandwidth on the critical path
 * (CLAUDE.md §14.8).
 *
 * Development is skipped on purpose: a worker scoped to `/` would sit in
 * front of the dev server's HMR requests, and its caches survive a restart,
 * which makes for confusing local debugging.
 */
export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // A failed registration must stay silent — the site is fully
        // functional without a worker, and this is not something a visitor
        // can act on.
      });
    };

    if (document.readyState === 'complete') {
      register();
      return;
    }

    window.addEventListener('load', register);
    return () => window.removeEventListener('load', register);
  }, []);

  return null;
}
