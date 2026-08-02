/* Pixdyne service worker.
 *
 * Exists to satisfy Chrome's install-prompt criteria (a registered worker
 * with a fetch handler) and to give the installed app an offline fallback.
 * It is deliberately conservative: this is an SEO-led marketing site, so a
 * worker that serves stale HTML would be a far worse outcome than one that
 * caches nothing at all.
 *
 * Strategy by request class:
 *   navigation (HTML)  network-first -> cache -> /offline
 *                      Content is never served from cache while the network
 *                      is reachable, so a publish is visible immediately.
 *   /_next/static/*    cache-first. Content-hashed by the build and
 *                      therefore immutable; a changed file gets a new URL.
 *   other same-origin  stale-while-revalidate (images, icons, fonts).
 *   /api/*, cross-origin, non-GET
 *                      not handled at all — falls through to the network.
 *                      Never cache the contact endpoint, the SEO-audit
 *                      crawler, the PDF export, or BotID's proxy routes.
 *
 * Bump VERSION on any change here; `activate` drops every cache that does
 * not carry the current version.
 */

const VERSION = 'v1';
const STATIC_CACHE = `pixdyne-static-${VERSION}`;
const PAGES_CACHE = `pixdyne-pages-${VERSION}`;
const ASSETS_CACHE = `pixdyne-assets-${VERSION}`;
const OFFLINE_URL = '/offline';

const CURRENT_CACHES = [STATIC_CACHE, PAGES_CACHE, ASSETS_CACHE];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PAGES_CACHE)
      // `reload` bypasses the HTTP cache so a fresh install never bakes in
      // a stale offline page from a previous deploy.
      .then((cache) => cache.add(new Request(OFFLINE_URL, { cache: 'reload' })))
      // Do not block activation if the offline page cannot be fetched at
      // install time — a worker that fails to install would leave the site
      // with no worker at all.
      .catch(() => undefined)
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('pixdyne-') && !CURRENT_CACHES.includes(key))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

/** Only cache a response we can actually replay: same-origin, 200, basic. */
function isCacheable(response) {
  return Boolean(response) && response.status === 200 && response.type === 'basic';
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (isCacheable(response)) {
      const cache = await caches.open(PAGES_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;

    const offline = await caches.match(OFFLINE_URL);
    if (offline) return offline;

    return new Response('You are offline.', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (isCacheable(response)) {
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);

  const network = fetch(request)
    .then((response) => {
      if (isCacheable(response)) {
        caches.open(ASSETS_CACHE).then((cache) => cache.put(request, response.clone()));
      }
      return response;
    })
    // An offline revalidation must not surface as an unhandled rejection
    // when we already have a cached copy to serve.
    .catch(() => undefined);

  if (cached) return cached;

  const response = await network;
  if (response) return response;

  return new Response('', { status: 504, statusText: 'Gateway Timeout' });
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  // Cross-origin (analytics, third-party embeds) stays entirely on the network.
  if (url.origin !== self.location.origin) return;

  // Dynamic endpoints must never be served from cache: the contact form, the
  // SEO-audit crawler and its PDF export, and BotID's proxy paths.
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/.well-known/')) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});
