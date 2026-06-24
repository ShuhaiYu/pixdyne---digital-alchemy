import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'node-html-parser';
import { XMLParser } from 'fast-xml-parser';
import { gunzipSync } from 'node:zlib';
import pLimit from 'p-limit';
import robotsParser from 'robots-parser';
import { AuditData, CheckResult, DimensionData, FixItem, PageTableData, ScanEvent } from '@/lib/seo-audit/types';
import { auditQuerySchema } from '@/lib/seo-audit/schema';
import { assertPublicHost } from '@/lib/seo-audit/ssrf';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// The crawl is heavy (up to MAX_PAGES fetches at CONCURRENCY, plus a PageSpeed
// call). Throttle per IP so a single client can't use this endpoint as a
// crawler-for-hire. In-memory limiter (per warm instance) — see lib/rate-limit.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

// ---------------------------------------------------------------------------
// Tunables
// ---------------------------------------------------------------------------
const MAX_PAGES = 20;          // pages we fully parse
const MAX_DISCOVER = 80;       // candidate URLs we consider before slicing
const CONCURRENCY = 8;
const FETCH_TIMEOUT = 9000;
const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 PixdyneSEOCheck/1.0';

// 2026 AI crawler landscape. `kind: 'search'` = live-retrieval agents that
// fetch a page to answer/cite right now (blocking these costs visibility);
// `kind: 'training'` = corpus crawlers (blocking is a brand/IP choice).
const AI_BOTS_INFO: { name: string; purpose: string; kind: 'search' | 'training' }[] = [
  { name: 'OAI-SearchBot', purpose: 'ChatGPT search', kind: 'search' },
  { name: 'ChatGPT-User', purpose: 'ChatGPT live fetch', kind: 'search' },
  { name: 'GPTBot', purpose: 'OpenAI training', kind: 'training' },
  { name: 'PerplexityBot', purpose: 'Perplexity index', kind: 'search' },
  { name: 'Perplexity-User', purpose: 'Perplexity live fetch', kind: 'search' },
  { name: 'Claude-User', purpose: 'Claude live fetch', kind: 'search' },
  { name: 'ClaudeBot', purpose: 'Anthropic training', kind: 'training' },
  { name: 'anthropic-ai', purpose: 'Anthropic (legacy)', kind: 'training' },
  { name: 'Google-Extended', purpose: 'Gemini / AI Overviews', kind: 'search' },
  { name: 'Applebot-Extended', purpose: 'Apple Intelligence', kind: 'training' },
  { name: 'Meta-ExternalAgent', purpose: 'Meta AI', kind: 'training' },
  { name: 'Amazonbot', purpose: 'Amazon / Alexa', kind: 'search' },
  { name: 'Bytespider', purpose: 'TikTok / Doubao', kind: 'training' },
  { name: 'CCBot', purpose: 'Common Crawl', kind: 'training' },
];
const AI_BOTS = AI_BOTS_INFO.map(b => b.name);
const SEARCH_BOTS = AI_BOTS_INFO.filter(b => b.kind === 'search').map(b => b.name);

// ---------------------------------------------------------------------------
// Low-level fetch
// ---------------------------------------------------------------------------
async function fetchRaw(url: string, init: RequestInit = {}, timeout = FETCH_TIMEOUT): Promise<Response> {
  await assertPublicHost(url); // SSRF guard — re-checks every redirect hop & sub-resource
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        'User-Agent': BROWSER_UA,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        ...(init.headers || {}),
      },
    });
    return res;
  } finally {
    clearTimeout(id);
  }
}

function norm(u: string): string {
  try {
    const url = new URL(u);
    url.hash = '';
    let s = url.toString();
    if (s.endsWith('/')) s = s.slice(0, -1);
    return s.toLowerCase();
  } catch {
    return u.toLowerCase();
  }
}

// ---------------------------------------------------------------------------
// robots.txt
// ---------------------------------------------------------------------------
interface RobotsResult {
  present: boolean;
  disallowAll: boolean;
  bingBlocked: boolean;     // Bingbot disallowed — hurts Bing index + Copilot/ChatGPT retrieval
  aiBotsBlocked: string[];
  aiBotsAllowed: string[];
  hasLlmsTxt: boolean;
  sitemaps: string[];
  matcher: ReturnType<typeof robotsParser> | null;
}

// Our own crawler identifies via this token; we respect rules targeting it or *.
const OUR_AGENT = 'PixdyneSEOCheck';

async function checkRobots(baseUrl: string): Promise<RobotsResult> {
  const empty: RobotsResult = { present: false, disallowAll: false, bingBlocked: false, aiBotsBlocked: [], aiBotsAllowed: [...AI_BOTS], hasLlmsTxt: false, sitemaps: [], matcher: null };
  try {
    const res = await fetchRaw(`${baseUrl}/robots.txt`);
    if (!res.ok) return empty;
    const text = await res.text();
    // robots.txt is plain text; an HTML body means a soft-404
    if (/<html[\s>]/i.test(text)) return empty;

    // robots-parser handles user-agent groups, Allow/Disallow precedence and wildcards.
    const robots = robotsParser(`${baseUrl}/robots.txt`, text);
    const testUrl = `${baseUrl}/`;
    const aiBotsBlocked = AI_BOTS.filter(b => robots.isAllowed(testUrl, b) === false);
    const aiBotsAllowed = AI_BOTS.filter(b => !aiBotsBlocked.includes(b));
    const disallowAll = robots.isAllowed(testUrl, 'Googlebot') === false;
    const bingBlocked = robots.isAllowed(testUrl, 'Bingbot') === false;
    const sitemaps = robots.getSitemaps() || [];

    let hasLlmsTxt = false;
    try {
      const lr = await fetchRaw(`${baseUrl}/llms.txt`);
      hasLlmsTxt = lr.ok && !/<html[\s>]/i.test(await lr.text());
    } catch { /* ignore */ }

    return { present: true, disallowAll, bingBlocked, aiBotsBlocked, aiBotsAllowed, hasLlmsTxt, sitemaps, matcher: robots };
  } catch {
    return empty;
  }
}

// ---------------------------------------------------------------------------
// URL discovery (sitemap incl. index, then internal links as fallback)
// ---------------------------------------------------------------------------
// Sitemaps are XML, may be gzipped (.xml.gz), and may be a sitemap index. Parse
// with fast-xml-parser instead of regex so namespaced tags, CDATA-wrapped <loc>,
// single-entry sitemaps and gzipped bodies are all handled correctly — the old
// regex silently returned zero URLs for any gzipped or CDATA sitemap.
const SITEMAP_PARSER = new XMLParser({ ignoreAttributes: true, trimValues: true });

function locsFrom(entries: unknown): string[] {
  const arr = Array.isArray(entries) ? entries : entries == null ? [] : [entries];
  return arr
    .map((e) => {
      if (typeof e === 'string') return e.trim();
      if (e && typeof e === 'object') {
        const loc = (e as Record<string, unknown>).loc;
        if (typeof loc === 'string') return loc.trim();
        if (loc && typeof loc === 'object' && '#text' in (loc as object)) {
          return String((loc as Record<string, unknown>)['#text']).trim();
        }
      }
      return '';
    })
    .filter(Boolean);
}

async function fetchSitemapBody(url: string): Promise<string> {
  const res = await fetchRaw(url);
  if (!res.ok) return '';
  const buf = Buffer.from(await res.arrayBuffer());
  // fetch only auto-decodes Content-Encoding, not a gzipped file body — inflate
  // .xml.gz (or anything starting with the gzip magic bytes) ourselves.
  const gzipped = url.toLowerCase().endsWith('.gz') || (buf.length > 2 && buf[0] === 0x1f && buf[1] === 0x8b);
  try {
    return (gzipped ? gunzipSync(buf) : buf).toString('utf8');
  } catch {
    return buf.toString('utf8');
  }
}

async function fetchSitemapUrls(sitemapUrl: string, depth = 0): Promise<string[]> {
  if (depth > 1) return [];
  try {
    const xml = await fetchSitemapBody(sitemapUrl);
    // A soft-404 serves an HTML page, not XML — bail before parsing it.
    if (!xml || /^\s*<(?:!doctype\s+)?html[\s>]/i.test(xml)) return [];
    const doc = SITEMAP_PARSER.parse(xml) as Record<string, unknown>;
    const index = doc.sitemapindex as Record<string, unknown> | undefined;
    if (index?.sitemap) {
      // sitemap index → fetch a few child sitemaps
      const children = locsFrom(index.sitemap).slice(0, 4);
      const nested = await Promise.all(children.map((c) => fetchSitemapUrls(c, depth + 1)));
      return nested.flat();
    }
    const urlset = doc.urlset as Record<string, unknown> | undefined;
    if (urlset?.url) return locsFrom(urlset.url);
    return [];
  } catch {
    return [];
  }
}

async function discoverUrls(baseUrl: string, robots: RobotsResult): Promise<{ urls: string[]; sitemapPresent: boolean; sitemapCount: number; robotsSkipped: number }> {
  const host = new URL(baseUrl).host;
  const sameHost = (u: string) => {
    try { return new URL(u).host === host; } catch { return false; }
  };

  const candidateSitemaps = [...new Set([...robots.sitemaps, `${baseUrl}/sitemap.xml`, `${baseUrl}/sitemap_index.xml`])];
  let sitemapUrls: string[] = [];
  for (const sm of candidateSitemaps) {
    const found = await fetchSitemapUrls(sm);
    if (found.length) sitemapUrls = sitemapUrls.concat(found);
    if (sitemapUrls.length >= MAX_DISCOVER) break;
  }
  sitemapUrls = [...new Set(sitemapUrls.filter(sameHost))];
  const sitemapPresent = sitemapUrls.length > 0;
  const sitemapCount = sitemapUrls.length;

  let urls = sitemapUrls.slice(0, MAX_DISCOVER);

  // Fallback: crawl internal links from homepage if sitemap is thin
  if (urls.length < 5) {
    try {
      const res = await fetchRaw(baseUrl, { redirect: 'follow' });
      if (res.ok) {
        const html = await res.text();
        const root = parse(html);
        const links = root.querySelectorAll('a[href]')
          .map(a => a.getAttribute('href') || '')
          .map(href => { try { return new URL(href, baseUrl).toString(); } catch { return ''; } })
          .filter(u => u && sameHost(u));
        urls = [...new Set([...urls, ...links])];
      }
    } catch { /* ignore */ }
  }

  // Crawler etiquette: drop URLs the site disallows for our agent (but always
  // keep the homepage so we can still produce a report and flag the block).
  const homeNorm = norm(baseUrl);
  let robotsSkipped = 0;
  const allowed = urls.filter(u => {
    if (norm(u) === homeNorm) return true;
    if (!robots.matcher) return true;
    const ok = robots.matcher.isAllowed(u, OUR_AGENT);
    if (ok === false) { robotsSkipped++; return false; }
    return true;
  });

  // Always include homepage first, dedupe, cap
  const ordered = [...new Set([baseUrl, ...allowed.map(u => u.split('#')[0])])];
  return { urls: ordered.slice(0, MAX_PAGES), sitemapPresent, sitemapCount, robotsSkipped };
}

// ---------------------------------------------------------------------------
// Per-page crawl + parse
// ---------------------------------------------------------------------------
interface PageCrawl {
  url: string;
  finalUrl: string;
  status: number;
  ok: boolean;
  hops: number;
  chain: string[];
  title: string;
  titleLength: number;
  hasMeta: boolean;
  metaLength: number;
  metaText: string;
  h1Count: number;
  h2Count: number;
  totalImages: number;
  imagesWithAlt: number;
  jsonLdTypes: string[];
  hasSameAs: boolean;
  textLength: number;
  htmlLength: number;
  textRatio: number;
  semanticCount: number;
  questionHeadings: number;
  hasFaq: boolean;
  hasListOrTable: boolean;
  internalLinks: string[];
  productLike: boolean;
  // indexability / on-page tags
  canonical: string;        // normalized absolute canonical URL ('' if none)
  hasCanonical: boolean;
  selfCanonical: boolean;   // canonical points at this page
  noindex: boolean;         // meta robots or X-Robots-Tag says noindex
  hasViewport: boolean;
  articleLike: boolean;     // has Article/BlogPosting/NewsArticle schema
  articleAuthorPerson: boolean;
  articleHasDates: boolean;
  hasHreflang: boolean;
  linkTotal: number;
  linkBad: number;          // uncrawlable href or non-descriptive anchor text
  headingOk: boolean;       // starts at h1 and never skips a level
  // AI / snippet-blocking directives (self-harm signals)
  nosnippet: boolean;       // nosnippet or max-snippet:0 — blocks search & AI snippets
  noai: boolean;            // noai / noimageai — opts the page out of AI use
  // social preview + language + depth + freshness
  hasOg: boolean;           // og:title present
  hasTwitterCard: boolean;  // twitter:card present
  htmlLang: string;         // <html lang> value ('' if none)
  wordCount: number;        // approximate visible-word count
  schemaDate: string;       // most-recent datePublished/dateModified ISO ('' if none)
  // GEO citable-content signals (Princeton GEO)
  statCount: number;        // numeric/statistic tokens in visible text
  quoteCount: number;       // blockquote/q/cite elements
  outboundLinks: number;    // links to external domains
  // homepage security headers
  hsts: boolean;
  xFrame: boolean;
  xContentType: boolean;
  csp: boolean;
}

function emptyCrawl(url: string, finalUrl: string, status: number, hops: number, chain: string[]): PageCrawl {
  return {
    url, finalUrl, status, ok: false, hops, chain,
    title: '', titleLength: 0, hasMeta: false, metaLength: 0, metaText: '', h1Count: 0, h2Count: 0,
    totalImages: 0, imagesWithAlt: 0, jsonLdTypes: [], hasSameAs: false,
    textLength: 0, htmlLength: 0, textRatio: 0, semanticCount: 0, questionHeadings: 0,
    hasFaq: false, hasListOrTable: false, internalLinks: [], productLike: false,
    canonical: '', hasCanonical: false, selfCanonical: false, noindex: false, hasViewport: false,
    articleLike: false, articleAuthorPerson: false, articleHasDates: false,
    hasHreflang: false, linkTotal: 0, linkBad: 0, headingOk: true,
    nosnippet: false, noai: false, hasOg: false, hasTwitterCard: false,
    htmlLang: '', wordCount: 0, schemaDate: '',
    statCount: 0, quoteCount: 0, outboundLinks: 0,
    hsts: false, xFrame: false, xContentType: false, csp: false,
  };
}

const QUESTION_RE = /^(what|how|why|when|where|who|which|can|do|does|is|are|should|will|could|where's|what's)\b/i;

function parseHtml(url: string, finalUrl: string, status: number, hops: number, chain: string[], html: string, res: Response): PageCrawl {
  const host = (() => { try { return new URL(finalUrl).host; } catch { return ''; } })();
  let root;
  // Defaults keep <script>/<style> as raw text so JSON-LD parses correctly.
  try { root = parse(html); } catch {
    return { ...emptyCrawl(url, finalUrl, status, hops, chain), htmlLength: html.length };
  }

  const titleEl = root.querySelector('title');
  const title = titleEl ? titleEl.text.trim() : '';

  const metaEl = root.querySelector('meta[name="description"]');
  const metaDesc = metaEl ? (metaEl.getAttribute('content') || '').trim() : '';

  const h1Count = root.querySelectorAll('h1').length;
  const h2s = [...root.querySelectorAll('h2'), ...root.querySelectorAll('h3')];
  const h2Count = root.querySelectorAll('h2').length;

  const imgs = root.querySelectorAll('img');
  const totalImages = imgs.length;
  const imagesWithAlt = imgs.filter(i => (i.getAttribute('alt') || '').trim().length > 0).length;

  const jsonLdTypes: string[] = [];
  let hasSameAs = false;
  let articleLike = false;
  let articleAuthorPerson = false;
  let articleHasDates = false;
  let schemaDate = ''; // most-recent ISO date seen in any JSON-LD (freshness signal)
  const ARTICLE_TYPES = ['Article', 'BlogPosting', 'NewsArticle', 'TechArticle'];
  for (const s of root.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const parsed = JSON.parse(s.text);
      const collect = (obj: unknown) => {
        if (!obj || typeof obj !== 'object') return;
        const o = obj as Record<string, unknown>;
        const types: string[] = [];
        if (o['@type']) {
          const t = o['@type'];
          if (Array.isArray(t)) t.forEach(x => types.push(String(x)));
          else types.push(String(t));
        }
        types.forEach(t => jsonLdTypes.push(t));
        if (o.sameAs) hasSameAs = true;
        if (types.some(t => ARTICLE_TYPES.includes(t))) {
          articleLike = true;
          const author = o.author as Record<string, unknown> | Record<string, unknown>[] | undefined;
          const authors = Array.isArray(author) ? author : author ? [author] : [];
          if (authors.some(a => a && (String((a as Record<string, unknown>)['@type']) === 'Person' || !!(a as Record<string, unknown>).name))) {
            articleAuthorPerson = true;
          }
          if (o.datePublished || o.dateModified) articleHasDates = true;
        }
        // Capture the freshest machine-readable date from any node (not just
        // articles) — content recency is a strong AI-citation signal.
        for (const k of ['dateModified', 'datePublished', 'dateCreated'] as const) {
          const v = o[k];
          if (typeof v === 'string') {
            const t = Date.parse(v);
            if (!Number.isNaN(t) && (!schemaDate || t > Date.parse(schemaDate))) schemaDate = new Date(t).toISOString();
          }
        }
        if (Array.isArray(o['@graph'])) (o['@graph'] as unknown[]).forEach(collect);
      };
      if (Array.isArray(parsed)) parsed.forEach(collect);
      else collect(parsed);
    } catch { /* ignore malformed */ }
  }

  // canonical / robots-noindex / viewport
  const canonEl = root.querySelector('link[rel="canonical"]');
  let canonical = '';
  let selfCanonical = false;
  if (canonEl) {
    try { canonical = norm(new URL(canonEl.getAttribute('href') || '', finalUrl).toString()); } catch { canonical = ''; }
    selfCanonical = canonical !== '' && canonical === norm(finalUrl);
  }
  const metaRobots = (root.querySelector('meta[name="robots"]')?.getAttribute('content') || '').toLowerCase();
  const xRobots = (res.headers.get('x-robots-tag') || '').toLowerCase();
  const robotsDirectives = `${metaRobots} ${xRobots}`;
  const noindex = metaRobots.includes('noindex') || xRobots.includes('noindex');
  // Self-harm directives: nosnippet/max-snippet:0 stop search AND AI engines
  // showing a snippet; noai/noimageai opt the page out of generative use.
  const nosnippet = /nosnippet/.test(robotsDirectives) || /max-snippet\s*:\s*0\b/.test(robotsDirectives);
  const noai = /\bnoai\b/.test(robotsDirectives) || /\bnoimageai\b/.test(robotsDirectives);
  const hasViewport = !!root.querySelector('meta[name="viewport"]');
  const hasHreflang = root.querySelectorAll('link[hreflang]').length > 0;
  const htmlLang = (root.querySelector('html')?.getAttribute('lang') || '').trim();
  const hasOg = !!root.querySelector('meta[property="og:title"]');
  const hasTwitterCard = !!root.querySelector('meta[name="twitter:card"]');

  // link quality: uncrawlable href or non-descriptive anchor text
  const GENERIC_ANCHORS = new Set(['click here', 'here', 'read more', 'more', 'learn more', 'this', 'link', 'read', 'details', 'continue']);
  let linkTotal = 0;
  let linkBad = 0;
  for (const a of root.querySelectorAll('a')) {
    const href = (a.getAttribute('href') || '').trim();
    if (!href) continue;
    linkTotal++;
    const uncrawlable = href === '#' || href.startsWith('javascript:') || href.startsWith('#');
    const label = (a.text || '').replace(/\s+/g, ' ').trim().toLowerCase() || (a.getAttribute('aria-label') || '').trim().toLowerCase();
    const nonDescriptive = label === '' || GENERIC_ANCHORS.has(label);
    if (uncrawlable || nonDescriptive) linkBad++;
  }

  // heading hierarchy: must start at h1 and never skip a level (h2→h4)
  let headingOk = true;
  let prevLevel = 0;
  for (const el of root.querySelectorAll('*')) {
    const m = /^h([1-6])$/.exec((el.rawTagName || '').toLowerCase());
    if (!m) continue;
    const lvl = Number(m[1]);
    if (prevLevel === 0) { if (lvl !== 1) headingOk = false; }
    else if (lvl - prevLevel > 1) headingOk = false;
    prevLevel = lvl;
  }

  // text extraction: strip scripts/styles
  ['script', 'style', 'noscript'].forEach(tag => root.querySelectorAll(tag).forEach(n => n.remove()));
  const textContent = root.text.replace(/\s+/g, ' ').trim();
  const textLength = textContent.length;
  const htmlLength = html.length;
  const textRatio = htmlLength > 0 ? textLength / htmlLength : 0;
  const wordCount = textContent ? textContent.split(/\s+/).filter(Boolean).length : 0;
  // Citable-content signals (Princeton GEO): statistic density + quoted material.
  const statCount = (textContent.match(/\b\d[\d,]*\.?\d*\s?%|\b\d{2,}(?:[.,]\d+)?\b/g) || []).length;
  const quoteCount = root.querySelectorAll('blockquote').length + root.querySelectorAll('q').length + root.querySelectorAll('cite').length;

  const semanticCount = ['article', 'section', 'main', 'aside', 'nav', 'header', 'footer']
    .reduce((acc, tag) => acc + root.querySelectorAll(tag).length, 0);

  const questionHeadings = h2s.filter(h => {
    const t = h.text.trim();
    return t.includes('?') || QUESTION_RE.test(t);
  }).length;

  const lowerHtml = html.toLowerCase();
  const hasFaq = jsonLdTypes.includes('FAQPage') || /faq|frequently asked/.test(lowerHtml);
  const hasListOrTable = (root.querySelectorAll('ul').length + root.querySelectorAll('ol').length) > 2 || root.querySelectorAll('table').length > 0;

  const internalLinks = root.querySelectorAll('a[href]')
    .map(a => { try { return new URL(a.getAttribute('href') || '', finalUrl).toString(); } catch { return ''; } })
    .filter(u => { try { return new URL(u).host === host; } catch { return false; } })
    .map(u => norm(u));

  // outbound links to external domains — a citation/authority signal for GEO
  const outboundLinks = root.querySelectorAll('a[href]')
    .map(a => { try { return new URL(a.getAttribute('href') || '', finalUrl).host; } catch { return ''; } })
    .filter(h => h && h !== host).length;

  const path = (() => { try { return new URL(finalUrl).pathname.toLowerCase(); } catch { return ''; } })();
  const productLike = /\/(shop|product|products|store|item|collection|collections|p)\//.test(path) || jsonLdTypes.includes('Product');

  return {
    url, finalUrl, status, ok: true, hops, chain,
    title, titleLength: title.length, hasMeta: metaDesc.length > 0, metaLength: metaDesc.length, metaText: metaDesc.slice(0, 240),
    h1Count, h2Count, totalImages, imagesWithAlt, jsonLdTypes, hasSameAs,
    textLength, htmlLength, textRatio, semanticCount, questionHeadings, hasFaq, hasListOrTable,
    internalLinks, productLike,
    canonical, hasCanonical: !!canonEl, selfCanonical, noindex, hasViewport,
    articleLike, articleAuthorPerson, articleHasDates,
    hasHreflang, linkTotal, linkBad, headingOk,
    nosnippet, noai, hasOg, hasTwitterCard, htmlLang, wordCount, schemaDate,
    statCount, quoteCount, outboundLinks,
    hsts: res.headers.has('strict-transport-security'),
    xFrame: res.headers.has('x-frame-options'),
    xContentType: res.headers.has('x-content-type-options'),
    csp: res.headers.has('content-security-policy'),
  };
}

async function crawlOne(startUrl: string): Promise<PageCrawl> {
  let url = startUrl;
  const chain = [startUrl];
  let hops = 0;
  let status = 0;
  for (let i = 0; i < 5; i++) {
    let res: Response;
    try {
      res = await fetchRaw(url, { redirect: 'manual' });
    } catch {
      return emptyCrawl(startUrl, url, 0, hops, chain);
    }
    status = res.status;
    if (status >= 300 && status < 400) {
      const loc = res.headers.get('location');
      if (!loc) return emptyCrawl(startUrl, url, status, hops, chain);
      try { url = new URL(loc, url).toString(); } catch { return emptyCrawl(startUrl, url, status, hops, chain); }
      hops++;
      chain.push(url);
      continue;
    }
    const ct = res.headers.get('content-type') || '';
    if (status === 200 && ct.includes('html')) {
      const html = await res.text();
      return parseHtml(startUrl, url, status, hops, chain, html, res);
    }
    return emptyCrawl(startUrl, url, status, hops, chain);
  }
  return emptyCrawl(startUrl, url, status, hops, chain);
}

async function crawlAll(urls: string[], onProgress?: (r: PageCrawl, done: number) => void): Promise<PageCrawl[]> {
  const limit = pLimit(CONCURRENCY);
  let done = 0;
  return Promise.all(urls.map(u => limit(async () => {
    const r = await crawlOne(u);
    done++;
    onProgress?.(r, done);
    return r;
  })));
}

// A cheap per-page issue tally for the live "issues found" counter during the
// stream. The final report computes its own numbers; this is just a running feel.
function quickIssues(p: PageCrawl): number {
  if (!p.ok) return p.status >= 400 || p.status === 0 ? 1 : 0;
  let n = 0;
  if (p.titleLength === 0 || p.titleLength > 60) n++;
  if (!p.hasMeta) n++;
  if (p.h1Count !== 1) n++;
  if (!p.hasCanonical) n++;
  if (!p.hasViewport) n++;
  if (p.noindex) n++;
  if (p.textRatio < 0.08) n++;
  if (p.totalImages > 0 && p.imagesWithAlt < p.totalImages) n++;
  return n;
}

// ---------------------------------------------------------------------------
// PageSpeed (homepage only) — optional API key
// ---------------------------------------------------------------------------
interface PageSpeedResult { score: number; lcp: number; cls: number; inp: number; ttfb: number; available: boolean; }

async function checkPageSpeed(url: string): Promise<PageSpeedResult> {
  const fallback: PageSpeedResult = { score: 0, lcp: 0, cls: 0, inp: 0, ttfb: 0, available: false };
  try {
    const key = process.env.PAGESPEED_API_KEY;
    const psUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance${key ? `&key=${key}` : ''}`;
    const res = await fetchRaw(psUrl, {}, 20000);
    if (!res.ok) return fallback;
    const data = await res.json();
    const cat = data.lighthouseResult?.categories?.performance;
    if (!cat) return fallback;
    const audits = data.lighthouseResult?.audits || {};
    return {
      score: Math.round((cat.score ?? 0) * 100),
      lcp: audits['largest-contentful-paint']?.numericValue ? audits['largest-contentful-paint'].numericValue / 1000 : 0,
      cls: audits['cumulative-layout-shift']?.numericValue ?? 0,
      inp: audits['interaction-to-next-paint']?.numericValue ?? audits['max-potential-fid']?.numericValue ?? 0,
      ttfb: audits['server-response-time']?.numericValue ? audits['server-response-time'].numericValue / 1000 : 0,
      available: true,
    };
  } catch {
    return fallback;
  }
}

// ---------------------------------------------------------------------------
// CDN/WAF AI-crawler reachability probe
// ---------------------------------------------------------------------------
// robots.txt allowing a bot does NOT mean the bot can actually fetch the page —
// CDN/WAF rules (e.g. Cloudflare's "AI Scrapers & Crawlers" managed rule) often
// return 403/challenge to AI crawler User-Agents. We request the homepage as
// OAI-SearchBot and compare: if a normal browser UA gets 200 but the AI UA is
// blocked, the site is invisible to AI search at the network layer — something
// a robots.txt-only check can never see.
const OAI_SEARCHBOT_UA = 'Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)';

async function probeAiBotReachability(url: string): Promise<{ tested: boolean; blocked: boolean; status: number }> {
  try {
    const res = await fetchRaw(url, { headers: { 'User-Agent': OAI_SEARCHBOT_UA }, redirect: 'manual' });
    const blocked = [401, 403, 429, 503].includes(res.status);
    return { tested: true, blocked, status: res.status };
  } catch {
    return { tested: false, blocked: false, status: 0 };
  }
}

// ---------------------------------------------------------------------------
// Fix library — concrete, actionable advice + expected gain
// ---------------------------------------------------------------------------
type Level = 'High' | 'Medium' | 'Low';
interface FixDef { issue: string; impact: Level; effort: Level; fix: (n?: number, extra?: string) => string; }

const FIXES: Record<string, FixDef> = {
  OAI_BLOCKED:   { issue: 'Unblock OAI-SearchBot in robots.txt', impact: 'High', effort: 'Low', fix: () => 'Remove the `Disallow: /` under User-agent: OAI-SearchBot so ChatGPT Search can index you. Expected: +12–15 GEO.' },
  GPTBOT_BLOCKED:{ issue: 'Decide on GPTBot (OpenAI training) access', impact: 'Low', effort: 'Low', fix: () => 'Allow GPTBot if you want inclusion in OpenAI training corpora (optional, brand-safety call). Expected: +3 GEO.' },
  CSR_CONTENT:   { issue: 'Server-render content that needs JavaScript', impact: 'High', effort: 'High', fix: (n) => `Pre-render the ${n} page(s) whose body text is missing from raw HTML (SSR/SSG/ISR). AI crawlers read raw HTML only. Expected: +8–10 GEO.` },
  TITLE_LONG:    { issue: 'Trim over-length <title> tags', impact: 'Medium', effort: 'Low', fix: (n) => `Shorten ${n} title(s) to ≤60 characters so they aren't truncated in results. Expected: +4–6 SEO.` },
  TITLE_MISSING: { issue: 'Add missing <title> tags', impact: 'High', effort: 'Low', fix: (n) => `Add a unique, descriptive <title> to ${n} page(s). Expected: +5–7 SEO.` },
  META_MISSING:  { issue: 'Write missing meta descriptions', impact: 'Medium', effort: 'Low', fix: (n) => `Add 150–160 char meta descriptions to ${n} page(s) to lift CTR. Expected: +3–5 SEO.` },
  H1_MISSING:    { issue: 'Add a single H1 to pages missing one', impact: 'Medium', effort: 'Low', fix: (n) => `Add one descriptive <h1> to ${n} page(s). Expected: +3 SEO.` },
  ALT_TEXT:      { issue: 'Add alt text to images', impact: 'Low', effort: 'Low', fix: (_n, e) => `Image alt coverage is ${e}. Describe meaningful images for accessibility and image search. Expected: +2–3 SEO.` },
  ORG_SCHEMA:    { issue: 'Add Organization JSON-LD with sameAs', impact: 'Medium', effort: 'Low', fix: () => 'Add Organization schema on the homepage with logo, url and sameAs links. Expected: +4 SEO / +3 GEO.' },
  PRODUCT_SCHEMA:{ issue: 'Add Product + Offer schema to shop pages', impact: 'Medium', effort: 'Low', fix: (n) => `Add Product/Offer JSON-LD to ${n} commerce page(s) for rich results. Expected: +5 SEO.` },
  FAQ_SCHEMA:    { issue: 'Add FAQ sections + FAQPage schema', impact: 'Medium', effort: 'Low', fix: () => 'Add visible FAQ blocks with FAQPage JSON-LD — heavily favoured by AI answers. Expected: +3 SEO / +4 GEO.' },
  PERF_LCP:      { issue: 'Cut mobile LCP', impact: 'High', effort: 'Medium', fix: (_n, e) => `Mobile LCP is ${e}. Preload the LCP image, defer non-critical JS, serve modern formats. Expected: +6–8 SEO.` },
  PERF_INP:      { issue: 'Reduce interaction latency (INP)', impact: 'Medium', effort: 'Medium', fix: (_n, e) => `INP is ${e}. Break up long tasks and defer third-party JS. Expected: +3 SEO.` },
  SEC_HEADERS:   { issue: 'Add missing security headers', impact: 'Low', effort: 'Low', fix: (_n, e) => `Add ${e}. Low SEO weight but a trust/hardening signal. Expected: +2 SEO.` },
  Q_HEADINGS:    { issue: 'Rewrite headings as questions + add TL;DRs', impact: 'Medium', effort: 'Medium', fix: (n) => `Reframe headings as natural questions and lead with the answer on ${n} page(s). Expected: +4–5 GEO.` },
  ENTITY_ABOUT:  { issue: 'Publish About / author pages, link entities', impact: 'Medium', effort: 'Medium', fix: () => 'Add About/author pages and sameAs links to Wikidata/LinkedIn/Crunchbase to disambiguate your entity. Expected: +3 GEO.' },
  REDIRECTS:     { issue: 'Flatten long redirect chains', impact: 'Low', effort: 'Low', fix: (n) => `Collapse ${n} chain(s) of 2+ hops into a single 301. Expected: +2 SEO.` },
  BROKEN:        { issue: 'Fix broken / unreachable pages', impact: 'High', effort: 'Medium', fix: (n) => `Repair or redirect ${n} URL(s) returning 4xx/5xx. Expected: +3–5 SEO.` },
  ROBOTS_SITEMAP:{ issue: 'Publish robots.txt and sitemap.xml', impact: 'Medium', effort: 'Low', fix: (_n, e) => `Missing: ${e}. Publish both so crawlers discover every page. Expected: +3 SEO.` },
  NOINDEX:       { issue: 'Remove accidental noindex', impact: 'High', effort: 'Low', fix: (n) => `${n} page(s) carry a noindex (meta robots or X-Robots-Tag) and are invisible to search. Remove it unless intentional. Expected: +6–10 SEO.` },
  CANONICAL:     { issue: 'Add / fix canonical tags', impact: 'Medium', effort: 'Low', fix: (n) => `${n} page(s) have no rel=canonical (or it points elsewhere). Add a self-referencing canonical to consolidate ranking signals. Expected: +3–5 SEO.` },
  VIEWPORT:      { issue: 'Add a mobile viewport meta tag', impact: 'High', effort: 'Low', fix: (n) => `${n} page(s) lack <meta name="viewport">, hurting mobile ranking and rendering. Add the responsive viewport tag. Expected: +4 SEO.` },
  DUP_TITLES:    { issue: 'De-duplicate page titles', impact: 'Medium', effort: 'Low', fix: (n) => `${n} page(s) share a <title> with another page. Make each title unique and specific. Expected: +3 SEO.` },
  DUP_META:      { issue: 'De-duplicate meta descriptions', impact: 'Low', effort: 'Low', fix: (n) => `${n} page(s) reuse the same meta description. Write a distinct one per page. Expected: +2 SEO.` },
  ARTICLE_SCHEMA:{ issue: 'Add Article schema with author & dates', impact: 'Medium', effort: 'Low', fix: (n) => `Add Article/BlogPosting JSON-LD with an author Person entity, datePublished and dateModified to ${n} content page(s). Strong AI-citation signal. Expected: +3 SEO / +4 GEO.` },
  SEARCH_BOT_BLOCKED: { issue: 'Unblock AI search/answer crawlers', impact: 'High', effort: 'Low', fix: (_n, e) => `robots.txt blocks live-retrieval AI agents (${e}). These fetch your page to cite it in answers — unblock them. Expected: +8–14 GEO.` },
  LINKS:         { issue: 'Fix non-descriptive / uncrawlable links', impact: 'Low', effort: 'Low', fix: (_n, e) => `${e} of links use generic text ("click here") or aren't crawlable (javascript:/#). Use descriptive anchor text and real hrefs. Expected: +2–3 SEO.` },
  HEADING_ORDER: { issue: 'Fix skipped heading levels', impact: 'Low', effort: 'Low', fix: (n) => `${n} page(s) jump heading levels (e.g. h2→h4). Keep a logical h1→h2→h3 order so AI and screen readers can parse structure. Expected: +2 SEO / +2 GEO.` },
  TRUST_PAGES:   { issue: 'Publish trust pages (Contact/Privacy/Terms)', impact: 'Medium', effort: 'Low', fix: (_n, e) => `Missing: ${e}. These E-E-A-T trust signals matter for YMYL ranking and AI trust. Add and link them in the footer. Expected: +2 SEO / +3 GEO.` },
  WAF_AI_BLOCK:  { issue: 'Allow AI crawlers at the CDN/WAF layer', impact: 'High', effort: 'Medium', fix: () => 'Your homepage returns a block/challenge to OAI-SearchBot even though robots.txt allows it — a CDN/WAF rule (e.g. Cloudflare "AI Scrapers & Crawlers") is the cause. Allow-list the AI search crawlers. Expected: +10–15 GEO.' },
  AI_DIRECTIVE:  { issue: 'Remove AI/snippet-blocking meta directives', impact: 'High', effort: 'Low', fix: (_n, e) => `${e} carry nosnippet / max-snippet:0 / noai directives that stop search and AI engines showing or citing the page. Remove them unless intentional. Expected: +6–10 GEO.` },
  BING_BLOCKED:  { issue: 'Unblock Bingbot in robots.txt', impact: 'Medium', effort: 'Low', fix: () => "Bingbot is disallowed. Bing's index powers Microsoft Copilot and ChatGPT's web retrieval, so this hurts AI visibility too. Allow Bingbot. Expected: +4 SEO / +3 GEO." },
  CANONICAL_MISMATCH: { issue: 'Fix canonical tags pointing elsewhere', impact: 'Medium', effort: 'Low', fix: (n) => `${n} page(s) have a rel=canonical pointing to a different URL, splitting ranking signals. Point each page's canonical at itself unless intentional. Expected: +3–5 SEO.` },
  THIN_CONTENT:  { issue: 'Expand thin pages', impact: 'Medium', effort: 'Medium', fix: (n) => `${n} page(s) carry very little text. Thin pages rarely rank or get cited — add substantive, original content. Expected: +3 SEO / +3 GEO.` },
  OG_TAGS:       { issue: 'Add Open Graph & Twitter card tags', impact: 'Low', effort: 'Low', fix: (n) => `${n} page(s) lack Open Graph / Twitter preview tags, so shared and AI-surfaced links render bare. Add og:title, og:image and twitter:card. Expected: +2 SEO.` },
  HTML_LANG:     { issue: 'Declare a page language', impact: 'Low', effort: 'Low', fix: (n) => `${n} page(s) have no <html lang> attribute. Declare the language so search and AI engines parse and target it correctly. Expected: +1–2 SEO.` },
  FRESHNESS:     { issue: 'Add machine-readable content dates', impact: 'Medium', effort: 'Low', fix: (_n, e) => `${e} Add datePublished / dateModified to your content schema and keep them honest — recent, dated content is cited far more by AI answer engines. Expected: +3–5 GEO.` },
  CITE_SIGNALS:  { issue: 'Add statistics, quotes and cited sources', impact: 'Medium', effort: 'Medium', fix: () => 'Content with concrete statistics, quoted experts and outbound citations is cited markedly more by AI engines (Princeton GEO: +30–40%). Add data points and link authoritative sources. Expected: +4–6 GEO.' },
};

// ---------------------------------------------------------------------------
// Scoring helpers
// ---------------------------------------------------------------------------
const makeColor = (s: number) => (s >= 75 ? '#6B8E5A' : s >= 50 ? '#C8962A' : '#C84A3E');
const makeImpact = (s: number) => (s < 50 ? 'High impact' : s < 75 ? 'Medium impact' : 'Low impact');
const pathOf = (u: string) => { try { return new URL(u).pathname || '/'; } catch { return u; } };
const pct = (a: number, b: number) => (b > 0 ? Math.round((a / b) * 100) : 0);

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------
// Runs the full audit. When `emit` is supplied, pushes real phase/progress
// events as the crawl proceeds (used by the streaming endpoint).
async function performAudit(domain: string, emit?: (e: ScanEvent) => void): Promise<AuditData> {
  // Honour an explicit http:// scheme; default to https. Private/localhost
  // targets are already rejected by the GET pre-check + fetchRaw SSRF guard.
  const scheme = /^http:\/\//i.test(domain) ? 'http' : 'https';
  const clean = domain.replace(/^https?:\/\//i, '').replace(/\/+$/, '').split('/')[0];
  const baseUrl = `${scheme}://${clean}`;

  {
    emit?.({ type: 'phase', key: 'robots', label: 'Fetching robots.txt & sitemap.xml', detail: 'discovering URLs' });
    const robots = await checkRobots(baseUrl);
    const { urls, sitemapPresent, sitemapCount, robotsSkipped } = await discoverUrls(baseUrl, robots);

    emit?.({ type: 'phase', key: 'crawl', label: 'Crawling & parsing pages', detail: `${urls.length} URLs · HTML · schema` });
    emit?.({ type: 'progress', pages: 0, issues: 0, total: urls.length });
    // PageSpeed + the AI-crawler reachability probe run concurrently with the crawl.
    const psPromise = checkPageSpeed(baseUrl);
    const aiProbePromise = probeAiBotReachability(baseUrl);
    let issuesAcc = 0;
    const crawls = await crawlAll(urls, (r, pagesDone) => {
      issuesAcc += quickIssues(r);
      emit?.({ type: 'progress', pages: pagesDone, issues: issuesAcc, total: urls.length });
    });
    emit?.({ type: 'phase', key: 'cwv', label: 'Measuring Core Web Vitals', detail: 'PageSpeed field data' });
    const ps = await psPromise;
    const aiProbe = await aiProbePromise;
    emit?.({ type: 'phase', key: 'score', label: 'Computing SEO & GEO readiness scores', detail: 'deterministic — no AI' });

    const home = crawls[0] || emptyCrawl(baseUrl, baseUrl, 0, 0, [baseUrl]);
    // Dedupe successful pages by final URL — a sitemap entry and a redirect target
    // can resolve to the same page, which would otherwise double-count issues.
    const okSeen = new Set<string>();
    const okPages = crawls.filter(c => {
      if (!c || !c.ok) return false;
      const k = norm(c.finalUrl);
      if (okSeen.has(k)) return false;
      okSeen.add(k);
      return true;
    });
    const reachable = okPages.length;

    if (reachable === 0) {
      // Nothing could be fetched (blocked/unreachable) — let the client fall back.
      throw new Error('unreachable');
    }

    const isHttps = baseUrl.startsWith('https://') && home.status === 200;
    const fixes: { code: string; n?: number; extra?: string }[] = [];

    // ----- Crawl & index -----
    const redirectChains = crawls.filter(c => c && c.hops >= 2);
    const broken = crawls.filter(c => c && (c.status >= 400 || c.status === 0));
    const inbound = new Map<string, number>();
    for (const p of okPages) for (const l of new Set(p.internalLinks)) inbound.set(l, (inbound.get(l) || 0) + 1);
    const orphans = okPages.filter(p => p.finalUrl !== home.finalUrl && (inbound.get(norm(p.finalUrl)) || 0) === 0);
    const noindexed = okPages.filter(p => p.noindex);

    const crawlChecks: CheckResult[] = [];
    crawlChecks.push(robots.present
      ? { name: 'robots.txt present', detail: 'found', status: 'ok' }
      : { name: 'robots.txt missing', detail: 'not found', status: 'error' });
    crawlChecks.push(sitemapPresent
      ? { name: 'sitemap.xml present', detail: `${sitemapCount} URLs`, status: 'ok' }
      : { name: 'sitemap.xml missing', detail: 'not found', status: 'warn' });
    crawlChecks.push(home.status === 200
      ? { name: 'Homepage returns 200', detail: `HTTP 200`, status: 'ok' }
      : { name: `Homepage status ${home.status}`, detail: `HTTP ${home.status}`, status: 'error' });
    crawlChecks.push(broken.length === 0
      ? { name: 'No broken pages in sample', detail: `${crawls.length} checked`, status: 'ok' }
      : { name: `${broken.length} broken page(s) (4xx/5xx)`, detail: `of ${crawls.length}`, status: 'error' });
    crawlChecks.push(redirectChains.length === 0
      ? { name: 'No long redirect chains', detail: 'clean', status: 'ok' }
      : { name: `${redirectChains.length} redirect chain(s) over 2 hops`, detail: `${redirectChains.length} found`, status: 'warn' });
    crawlChecks.push(orphans.length === 0
      ? { name: 'All sampled pages internally linked', detail: 'no orphans', status: 'ok' }
      : { name: `${orphans.length} orphan page(s) in sample`, detail: 'no inbound links', status: 'warn' });
    crawlChecks.push(noindexed.length === 0
      ? { name: 'No accidental noindex', detail: 'all indexable', status: 'ok' }
      : { name: `${noindexed.length} page(s) set to noindex`, detail: 'meta/X-Robots-Tag', status: 'error' });
    crawlChecks.push(robots.disallowAll
      ? { name: 'robots.txt blocks all crawling', detail: 'Disallow: /', status: 'error' }
      : { name: 'No site-wide Disallow', detail: 'crawlable', status: 'ok' });
    if (robotsSkipped > 0) {
      crawlChecks.push({ name: `${robotsSkipped} URL(s) skipped per robots.txt`, detail: 'we respect your rules', status: 'ok' });
    }

    let crawlScore = 100;
    if (!robots.present) crawlScore -= 12;
    if (!sitemapPresent) crawlScore -= 10;
    if (home.status !== 200) crawlScore -= 30;
    crawlScore -= Math.min(30, broken.length * 8);
    crawlScore -= Math.min(12, redirectChains.length * 4);
    crawlScore -= Math.min(10, orphans.length * 2);
    crawlScore -= Math.min(30, pct(noindexed.length, reachable) * 0.3);
    if (robots.disallowAll) crawlScore -= 40;
    crawlScore = Math.max(0, crawlScore);

    if (noindexed.length) fixes.push({ code: 'NOINDEX', n: noindexed.length });
    if (broken.length) fixes.push({ code: 'BROKEN', n: broken.length });
    if (redirectChains.length) fixes.push({ code: 'REDIRECTS', n: redirectChains.length });
    if (!robots.present || !sitemapPresent) {
      const miss = [!robots.present ? 'robots.txt' : '', !sitemapPresent ? 'sitemap.xml' : ''].filter(Boolean).join(' + ');
      fixes.push({ code: 'ROBOTS_SITEMAP', extra: miss });
    }

    const crawlPages: PageTableData | undefined = noindexed.length
      ? { title: 'Pages set to noindex', cols: ['URL', 'Source', 'Indexable?'], rows: noindexed.slice(0, 8).map(c => [pathOf(c.finalUrl), 'meta/header', 'No']) }
      : redirectChains.length
      ? { title: 'Redirect chains over 2 hops', cols: ['Source URL', 'Hops', 'Resolves to'], rows: redirectChains.slice(0, 8).map(c => [pathOf(c.url), String(c.hops), pathOf(c.finalUrl)]) }
      : broken.length
        ? { title: 'Broken / unreachable pages', cols: ['URL', 'Status', 'Note'], rows: broken.slice(0, 8).map(c => [pathOf(c.url), c.status === 0 ? 'timeout' : String(c.status), c.status === 0 ? 'no response' : 'error']) }
        : { title: 'Crawled pages', cols: ['URL', 'Status', 'Hops'], rows: crawls.slice(0, 8).map(c => [pathOf(c.url), String(c.status || '—'), String(c.hops)]) };

    // ----- On-page HTML -----
    const titlesLong = okPages.filter(p => p.titleLength > 60);
    const titlesMissing = okPages.filter(p => p.titleLength === 0);
    const metaMissing = okPages.filter(p => !p.hasMeta);
    const noH1 = okPages.filter(p => p.h1Count === 0);
    const multiH1 = okPages.filter(p => p.h1Count > 1);
    const totalImgs = okPages.reduce((a, p) => a + p.totalImages, 0);
    const altImgs = okPages.reduce((a, p) => a + p.imagesWithAlt, 0);
    const altCov = totalImgs > 0 ? pct(altImgs, totalImgs) : 100;
    const noCanonical = okPages.filter(p => !p.hasCanonical);
    const noViewport = okPages.filter(p => !p.hasViewport);
    // cross-page duplicate titles / meta descriptions
    const countBy = (vals: string[]) => { const m = new Map<string, number>(); for (const v of vals) m.set(v, (m.get(v) || 0) + 1); return m; };
    const titleCounts = countBy(okPages.map(p => p.title.trim().toLowerCase()).filter(Boolean));
    const metaCounts = countBy(okPages.map(p => p.metaText.trim().toLowerCase()).filter(Boolean));
    const dupTitlePages = okPages.filter(p => p.title.trim() && (titleCounts.get(p.title.trim().toLowerCase()) || 0) > 1);
    const dupMetaPages = okPages.filter(p => p.metaText.trim() && (metaCounts.get(p.metaText.trim().toLowerCase()) || 0) > 1);
    const linkTotalAll = okPages.reduce((a, p) => a + p.linkTotal, 0);
    const linkBadAll = okPages.reduce((a, p) => a + p.linkBad, 0);
    const linkBadPct = linkTotalAll > 0 ? pct(linkBadAll, linkTotalAll) : 0;
    const canonMismatch = okPages.filter(p => p.hasCanonical && !p.selfCanonical && p.canonical);
    const thinPages = okPages.filter(p => p.wordCount > 0 && p.wordCount < 200);
    const noOg = okPages.filter(p => !p.hasOg);
    const noLang = okPages.filter(p => !p.htmlLang);

    const onpageChecks: CheckResult[] = [
      titlesMissing.length === 0
        ? { name: 'All pages have a <title>', detail: `${reachable} pages`, status: 'ok' }
        : { name: `${titlesMissing.length} page(s) missing a title`, detail: `${titlesMissing.length} pages`, status: 'error' },
      titlesLong.length === 0
        ? { name: 'Titles within 60 chars', detail: 'good', status: 'ok' }
        : { name: `${titlesLong.length} title(s) over 60 characters`, detail: `${titlesLong.length} pages`, status: 'warn' },
      metaMissing.length === 0
        ? { name: 'All pages have meta descriptions', detail: `${reachable} pages`, status: 'ok' }
        : { name: `${metaMissing.length} page(s) missing meta description`, detail: `${metaMissing.length} pages`, status: metaMissing.length > reachable / 2 ? 'error' : 'warn' },
      noH1.length === 0
        ? { name: 'Every page has an H1', detail: `${reachable} pages`, status: 'ok' }
        : { name: `${noH1.length} page(s) with no H1`, detail: `${noH1.length} pages`, status: 'warn' },
      multiH1.length === 0
        ? { name: 'Single H1 per page', detail: 'good', status: 'ok' }
        : { name: `${multiH1.length} page(s) with multiple H1s`, detail: `${multiH1.length} pages`, status: 'warn' },
      altCov >= 90
        ? { name: 'Image alt coverage', detail: `${altCov}% covered`, status: 'ok' }
        : { name: 'Images missing alt text', detail: `${altCov}% covered`, status: altCov < 50 ? 'error' : 'warn' },
      noCanonical.length === 0
        ? { name: 'Canonical tag on every page', detail: `${reachable} pages`, status: 'ok' }
        : { name: `${noCanonical.length} page(s) missing rel=canonical`, detail: `${noCanonical.length} pages`, status: noCanonical.length > reachable / 2 ? 'error' : 'warn' },
      noViewport.length === 0
        ? { name: 'Mobile viewport tag present', detail: `${reachable} pages`, status: 'ok' }
        : { name: `${noViewport.length} page(s) missing viewport meta`, detail: `${noViewport.length} pages`, status: 'error' },
      dupTitlePages.length === 0
        ? { name: 'Titles are unique', detail: 'no duplicates', status: 'ok' }
        : { name: `${dupTitlePages.length} page(s) share a duplicate title`, detail: `${dupTitlePages.length} pages`, status: 'warn' },
      dupMetaPages.length === 0
        ? { name: 'Meta descriptions are unique', detail: 'no duplicates', status: 'ok' }
        : { name: `${dupMetaPages.length} page(s) share a meta description`, detail: `${dupMetaPages.length} pages`, status: 'warn' },
      linkBadPct < 15
        ? { name: 'Descriptive, crawlable links', detail: `${100 - linkBadPct}% clean`, status: 'ok' }
        : { name: `${linkBadPct}% of links non-descriptive or uncrawlable`, detail: `${linkBadAll}/${linkTotalAll}`, status: linkBadPct > 35 ? 'error' : 'warn' },
      canonMismatch.length === 0
        ? { name: 'Canonicals are self-referencing', detail: 'consistent', status: 'ok' }
        : { name: `${canonMismatch.length} page(s) canonicalised to another URL`, detail: `${canonMismatch.length} pages`, status: 'warn' },
      thinPages.length === 0
        ? { name: 'No thin pages in sample', detail: 'enough content', status: 'ok' }
        : { name: `${thinPages.length} thin page(s) under 200 words`, detail: `${thinPages.length} pages`, status: 'warn' },
      noLang.length === 0
        ? { name: 'Page language declared', detail: '<html lang>', status: 'ok' }
        : { name: `${noLang.length} page(s) missing <html lang>`, detail: `${noLang.length} pages`, status: 'warn' },
      noOg.length === 0
        ? { name: 'Open Graph / social tags present', detail: `${reachable} pages`, status: 'ok' }
        : noOg.length === reachable
          ? { name: 'No Open Graph / social tags', detail: `${reachable} pages`, status: 'warn' }
          : { name: 'Open Graph tags on most pages', detail: `${reachable - noOg.length}/${reachable} have them`, status: 'ok' },
    ];
    let onpageScore = 100;
    onpageScore -= pct(titlesMissing.length, reachable) * 0.4;
    onpageScore -= pct(titlesLong.length, reachable) * 0.12;
    onpageScore -= pct(metaMissing.length, reachable) * 0.2;
    onpageScore -= pct(noH1.length, reachable) * 0.12;
    onpageScore -= (100 - altCov) * 0.12;
    onpageScore -= pct(noCanonical.length, reachable) * 0.15;
    onpageScore -= pct(noViewport.length, reachable) * 0.2;
    onpageScore -= pct(dupTitlePages.length, reachable) * 0.1;
    onpageScore -= pct(dupMetaPages.length, reachable) * 0.06;
    onpageScore -= Math.min(12, linkBadPct * 0.1);
    onpageScore -= pct(canonMismatch.length, reachable) * 0.12;
    onpageScore -= pct(thinPages.length, reachable) * 0.15;
    onpageScore -= pct(noLang.length, reachable) * 0.05;
    onpageScore -= noOg.length === reachable ? 4 : 0;
    onpageScore = Math.max(0, Math.round(onpageScore));

    if (titlesMissing.length) fixes.push({ code: 'TITLE_MISSING', n: titlesMissing.length });
    if (titlesLong.length) fixes.push({ code: 'TITLE_LONG', n: titlesLong.length });
    if (metaMissing.length) fixes.push({ code: 'META_MISSING', n: metaMissing.length });
    if (noH1.length) fixes.push({ code: 'H1_MISSING', n: noH1.length });
    if (altCov < 90) fixes.push({ code: 'ALT_TEXT', extra: `${altCov}% covered` });
    if (noViewport.length) fixes.push({ code: 'VIEWPORT', n: noViewport.length });
    if (noCanonical.length) fixes.push({ code: 'CANONICAL', n: noCanonical.length });
    if (dupTitlePages.length) fixes.push({ code: 'DUP_TITLES', n: dupTitlePages.length });
    if (dupMetaPages.length) fixes.push({ code: 'DUP_META', n: dupMetaPages.length });
    if (linkBadPct >= 15) fixes.push({ code: 'LINKS', extra: `${linkBadPct}%` });
    if (canonMismatch.length) fixes.push({ code: 'CANONICAL_MISMATCH', n: canonMismatch.length });
    if (thinPages.length) fixes.push({ code: 'THIN_CONTENT', n: thinPages.length });
    if (noLang.length) fixes.push({ code: 'HTML_LANG', n: noLang.length });
    if (noOg.length === reachable) fixes.push({ code: 'OG_TAGS', n: noOg.length });

    const onpagePages: PageTableData | undefined = titlesLong.length
      ? { title: 'Titles over 60 characters', cols: ['URL', 'Length', 'Current title'], rows: titlesLong.slice(0, 8).map(p => [pathOf(p.finalUrl), String(p.titleLength), p.title.slice(0, 70)]) }
      : dupTitlePages.length
        ? { title: 'Duplicate page titles', cols: ['URL', 'Shared title', ''], rows: dupTitlePages.slice(0, 8).map(p => [pathOf(p.finalUrl), p.title.slice(0, 60), '']) }
      : noCanonical.length
        ? { title: 'Pages missing rel=canonical', cols: ['URL', 'Title', 'Canonical'], rows: noCanonical.slice(0, 8).map(p => [pathOf(p.finalUrl), p.title.slice(0, 50) || '—', 'missing']) }
      : metaMissing.length
        ? { title: 'Pages missing meta description', cols: ['URL', 'Title', 'Meta'], rows: metaMissing.slice(0, 8).map(p => [pathOf(p.finalUrl), p.title.slice(0, 50) || '—', 'missing']) }
        : undefined;

    // ----- Performance -----
    const perfChecks: CheckResult[] = [];
    let perfScore: number;
    if (ps.available) {
      const lcpStatus = ps.lcp < 2.5 ? 'ok' : ps.lcp < 4 ? 'warn' : 'error';
      const inpStatus = ps.inp < 200 ? 'ok' : ps.inp < 500 ? 'warn' : 'error';
      const clsStatus = ps.cls < 0.1 ? 'ok' : ps.cls < 0.25 ? 'warn' : 'error';
      const ttfbStatus = ps.ttfb < 0.8 ? 'ok' : ps.ttfb < 1.8 ? 'warn' : 'error';
      perfChecks.push({ name: 'LCP on mobile (lab)', detail: `${ps.lcp.toFixed(1)}s · ${lcpStatus === 'ok' ? 'good' : lcpStatus === 'warn' ? 'needs work' : 'poor'}`, status: lcpStatus });
      perfChecks.push({ name: 'INP', detail: `${Math.round(ps.inp)}ms · ${inpStatus === 'ok' ? 'good' : 'needs work'}`, status: inpStatus });
      perfChecks.push({ name: 'CLS', detail: `${ps.cls.toFixed(2)} · ${clsStatus === 'ok' ? 'good' : 'needs work'}`, status: clsStatus });
      perfChecks.push({ name: 'TTFB', detail: `${ps.ttfb.toFixed(1)}s`, status: ttfbStatus });
      perfChecks.push({ name: 'PageSpeed score (mobile)', detail: `${ps.score}/100`, status: ps.score >= 75 ? 'ok' : ps.score >= 50 ? 'warn' : 'error' });
      perfScore = ps.score;
      if (ps.lcp >= 2.5) fixes.push({ code: 'PERF_LCP', extra: `${ps.lcp.toFixed(1)}s` });
      if (ps.inp >= 200) fixes.push({ code: 'PERF_INP', extra: `${Math.round(ps.inp)}ms` });
    } else {
      perfChecks.push({ name: 'PageSpeed data unavailable', detail: 'set PAGESPEED_API_KEY', status: 'warn' });
      perfChecks.push({ name: 'HTML weight (proxy)', detail: `${Math.round(home.htmlLength / 1024)} KB`, status: home.htmlLength > 300000 ? 'warn' : 'ok' });
      perfScore = home.htmlLength > 0 ? (home.htmlLength > 300000 ? 55 : 70) : 50;
    }

    // ----- Structured data -----
    const allTypes = new Set(okPages.flatMap(p => p.jsonLdTypes));
    const hasOrg = allTypes.has('Organization') || allTypes.has('LocalBusiness');
    const productPages = okPages.filter(p => p.productLike);
    const productNoSchema = productPages.filter(p => !p.jsonLdTypes.includes('Product'));
    const anyFaq = okPages.some(p => p.jsonLdTypes.includes('FAQPage'));
    const pagesWithSchema = okPages.filter(p => p.jsonLdTypes.length > 0).length;
    // Article pages: editorial/content URLs (blog/news/guides/articles) or pages already marked-up
    const articlePages = okPages.filter(p => p.articleLike || /\/(blog|news|article|articles|guide|guides|insights|resources|post|posts)\//.test(pathOf(p.finalUrl).toLowerCase()));
    const articleWeak = articlePages.filter(p => !p.articleLike || !p.articleAuthorPerson || !p.articleHasDates);
    // content freshness — newest machine-readable date across all crawled pages
    const dated = okPages.map(p => p.schemaDate).filter(Boolean).sort();
    const newestDate = dated.length ? dated[dated.length - 1] : '';
    const freshAgeDays = newestDate ? Math.floor((Date.now() - Date.parse(newestDate)) / 86400000) : -1;

    const structChecks: CheckResult[] = [
      hasOrg ? { name: 'Organization schema present', detail: 'JSON-LD', status: 'ok' } : { name: 'No Organization schema', detail: 'missing', status: 'warn' },
      productPages.length === 0
        ? { name: 'No commerce pages detected', detail: 'n/a', status: 'ok' }
        : productNoSchema.length === 0
          ? { name: 'Product schema on shop pages', detail: `${productPages.length} pages`, status: 'ok' }
          : { name: `${productNoSchema.length} commerce page(s) without Product schema`, detail: `${productNoSchema.length} pages`, status: 'error' },
      anyFaq ? { name: 'FAQPage schema found', detail: 'present', status: 'ok' } : { name: 'No FAQPage schema', detail: '0 found', status: 'warn' },
      articlePages.length === 0
        ? { name: 'No article pages detected', detail: 'n/a', status: 'ok' }
        : articleWeak.length === 0
          ? { name: 'Article schema w/ author & dates', detail: `${articlePages.length} pages`, status: 'ok' }
          : { name: `${articleWeak.length} article(s) missing schema, author or dates`, detail: `${articleWeak.length} pages`, status: 'warn' },
      { name: 'Pages carrying any JSON-LD', detail: `${pagesWithSchema}/${reachable}`, status: pagesWithSchema > reachable / 2 ? 'ok' : 'warn' },
      freshAgeDays < 0
        ? { name: 'No machine-readable content dates', detail: 'add datePublished/dateModified', status: 'warn' }
        : freshAgeDays <= 365
          ? { name: 'Content carries recent dates', detail: `freshest ~${freshAgeDays}d`, status: 'ok' }
          : { name: 'Freshest dated content is over a year old', detail: `~${Math.round(freshAgeDays / 30)} months`, status: 'warn' },
    ];
    let structScore = 100;
    if (!hasOrg) structScore -= 22;
    structScore -= pct(productNoSchema.length, Math.max(1, productPages.length)) * 0.25;
    if (!anyFaq) structScore -= 12;
    structScore -= pct(articleWeak.length, Math.max(1, articlePages.length)) * 0.18;
    structScore -= (100 - pct(pagesWithSchema, reachable)) * 0.2;
    if (freshAgeDays < 0 || freshAgeDays > 365) structScore -= 6;
    structScore = Math.max(0, Math.round(structScore));

    if (!hasOrg) fixes.push({ code: 'ORG_SCHEMA' });
    if (productNoSchema.length) fixes.push({ code: 'PRODUCT_SCHEMA', n: productNoSchema.length });
    if (!anyFaq) fixes.push({ code: 'FAQ_SCHEMA' });
    if (articleWeak.length) fixes.push({ code: 'ARTICLE_SCHEMA', n: articleWeak.length });
    if (freshAgeDays < 0 || freshAgeDays > 365) fixes.push({ code: 'FRESHNESS', extra: freshAgeDays < 0 ? 'No dated content found.' : 'Content looks stale.' });

    const structPages: PageTableData | undefined = productNoSchema.length
      ? { title: 'Commerce pages missing Product schema', cols: ['URL', 'Detected', 'Recommended'], rows: productNoSchema.slice(0, 8).map(p => [pathOf(p.finalUrl), p.jsonLdTypes[0] || 'none', 'Product + Offer']) }
      : undefined;

    // ----- Security -----
    const secChecks: CheckResult[] = [
      isHttps ? { name: 'HTTPS enforced', detail: 'secure', status: 'ok' } : { name: 'Not HTTPS', detail: 'insecure', status: 'error' },
      home.hsts ? { name: 'HSTS header present', detail: 'enabled', status: 'ok' } : { name: 'No HSTS header', detail: 'missing', status: 'warn' },
      home.xFrame ? { name: 'X-Frame-Options present', detail: 'enabled', status: 'ok' } : { name: 'No X-Frame-Options', detail: 'missing', status: 'warn' },
      home.xContentType ? { name: 'X-Content-Type-Options present', detail: 'enabled', status: 'ok' } : { name: 'No X-Content-Type-Options', detail: 'missing', status: 'warn' },
      home.csp ? { name: 'Content-Security-Policy present', detail: 'enabled', status: 'ok' } : { name: 'No Content-Security-Policy', detail: 'missing', status: 'warn' },
    ];
    const secPoints = [isHttps, home.hsts, home.xFrame, home.xContentType, home.csp].filter(Boolean).length;
    const securityScore = Math.round((secPoints / 5) * 100);
    const missingHeaders = [!home.hsts ? 'HSTS' : '', !home.csp ? 'CSP' : '', !home.xContentType ? 'X-Content-Type-Options' : '', !home.xFrame ? 'X-Frame-Options' : ''].filter(Boolean);
    if (missingHeaders.length) fixes.push({ code: 'SEC_HEADERS', extra: missingHeaders.join(', ') });

    // ----- AI crawler access (GEO) -----
    // Live-retrieval ("search") agents matter most: blocking them removes you
    // from the AI answer itself. Training crawlers are a separate brand choice.
    const blocked = new Set(robots.aiBotsBlocked);
    const searchBlocked = SEARCH_BOTS.filter(b => blocked.has(b));
    const trainingBlocked = AI_BOTS_INFO.filter(b => b.kind === 'training' && blocked.has(b.name)).map(b => b.name);
    const aiDirectivePages = okPages.filter(p => p.nosnippet || p.noai);
    const wafBlocked = aiProbe.tested && aiProbe.blocked && home.status === 200;
    const aiChecks: CheckResult[] = [];
    let aiScore = 100;

    // The CDN/WAF-layer block is the most damaging and least visible AI issue:
    // robots.txt can say "allowed" while Cloudflare/Akamai returns 403 to the bot.
    aiChecks.push(wafBlocked
      ? { name: 'CDN/WAF blocks AI crawler (OAI-SearchBot)', detail: `HTTP ${aiProbe.status} at network layer`, status: 'error' }
      : { name: 'AI crawler reachable at network layer', detail: aiProbe.tested ? `HTTP ${aiProbe.status}` : 'not tested', status: 'ok' });

    aiChecks.push(blocked.has('OAI-SearchBot')
      ? { name: 'OAI-SearchBot blocked — out of ChatGPT search', detail: 'Disallow: /', status: 'error' }
      : { name: 'OAI-SearchBot allowed', detail: 'ChatGPT search', status: 'ok' });
    aiChecks.push(blocked.has('PerplexityBot')
      ? { name: 'PerplexityBot blocked', detail: 'Disallow: /', status: 'error' }
      : { name: 'PerplexityBot allowed', detail: 'Perplexity', status: 'ok' });
    aiChecks.push(blocked.has('Google-Extended')
      ? { name: 'Google-Extended blocked', detail: 'Gemini / AI Overviews', status: 'warn' }
      : { name: 'Google-Extended allowed', detail: 'Gemini / AI Overviews', status: 'ok' });
    const otherSearchBlocked = searchBlocked.filter(b => !['OAI-SearchBot', 'PerplexityBot', 'Google-Extended'].includes(b));
    aiChecks.push(otherSearchBlocked.length === 0
      ? { name: 'Live-fetch agents allowed', detail: 'ChatGPT/Claude/Perplexity-User', status: 'ok' }
      : { name: `${otherSearchBlocked.length} live-fetch agent(s) blocked`, detail: otherSearchBlocked.join(', '), status: 'warn' });
    aiChecks.push(trainingBlocked.length === 0
      ? { name: 'Training crawlers allowed', detail: 'GPTBot/ClaudeBot/CCBot…', status: 'ok' }
      : { name: `${trainingBlocked.length} training crawler(s) blocked`, detail: 'brand choice', status: 'warn' });
    aiChecks.push(robots.bingBlocked
      ? { name: 'Bingbot blocked — hurts Copilot & ChatGPT', detail: 'Bing powers their retrieval', status: 'error' }
      : { name: 'Bingbot allowed', detail: 'powers Copilot + ChatGPT retrieval', status: 'ok' });
    aiChecks.push(aiDirectivePages.length === 0
      ? { name: 'No snippet/AI-blocking meta directives', detail: 'clean', status: 'ok' }
      : { name: `${aiDirectivePages.length} page(s) use nosnippet/noai`, detail: 'blocks AI citation', status: 'error' });
    // llms.txt is honestly low-value in 2026 (Google ignores it; mainly used by
    // Perplexity + IDE agents), so it is reported but never penalised.
    aiChecks.push(robots.hasLlmsTxt
      ? { name: 'llms.txt present', detail: 'minor: Perplexity/agents only', status: 'ok' }
      : { name: 'No llms.txt', detail: 'optional — Google ignores it', status: 'ok' });

    // weight search bots heavily, training lightly
    aiScore -= wafBlocked ? 35 : 0;
    aiScore -= blocked.has('OAI-SearchBot') ? 30 : 0;
    aiScore -= blocked.has('PerplexityBot') ? 18 : 0;
    aiScore -= blocked.has('Google-Extended') ? 14 : 0;
    aiScore -= Math.min(18, otherSearchBlocked.length * 6);
    aiScore -= Math.min(10, trainingBlocked.length * 2);
    aiScore -= robots.bingBlocked ? 12 : 0;
    aiScore -= aiDirectivePages.length ? Math.min(25, 12 + aiDirectivePages.length * 4) : 0;
    aiScore = Math.max(0, Math.round(aiScore));

    if (wafBlocked) fixes.push({ code: 'WAF_AI_BLOCK' });
    if (searchBlocked.length) fixes.push({ code: 'SEARCH_BOT_BLOCKED', extra: searchBlocked.join(', ') });
    if (robots.bingBlocked) fixes.push({ code: 'BING_BLOCKED' });
    if (aiDirectivePages.length) fixes.push({ code: 'AI_DIRECTIVE', extra: `${aiDirectivePages.length} page(s)` });

    const aiPages: PageTableData = {
      title: 'AI crawler directives in robots.txt', cols: ['User-agent', 'Purpose', 'Status'],
      rows: AI_BOTS_INFO.slice(0, 10).map(b => [b.name, b.purpose, blocked.has(b.name) ? 'Blocked' : 'Allowed']),
    };

    // ----- Extractability (GEO) -----
    const csrPages = okPages.filter(p => p.textRatio < 0.08 || p.textLength < 250);
    const avgSemantic = okPages.reduce((a, p) => a + p.semanticCount, 0) / reachable;
    const listPages = okPages.filter(p => p.hasListOrTable).length;
    const badHeadingPages = okPages.filter(p => !p.headingOk);
    const extractChecks: CheckResult[] = [
      csrPages.length === 0
        ? { name: 'Content present in raw HTML', detail: `${reachable} pages`, status: 'ok' }
        : { name: `${csrPages.length} page(s) need JS to render content`, detail: 'CSR risk', status: 'error' },
      avgSemantic >= 3 ? { name: 'Semantic HTML used', detail: `avg ${avgSemantic.toFixed(0)} elements`, status: 'ok' } : { name: 'Sparse semantic HTML', detail: `avg ${avgSemantic.toFixed(0)}`, status: 'warn' },
      badHeadingPages.length === 0
        ? { name: 'Clean heading hierarchy', detail: 'no skipped levels', status: 'ok' }
        : { name: `${badHeadingPages.length} page(s) skip heading levels`, detail: 'e.g. h2→h4', status: 'warn' },
      altCov >= 80 ? { name: 'Good alt coverage for AI parsing', detail: `${altCov}%`, status: 'ok' } : { name: 'Images missing alt text', detail: `${altCov}%`, status: 'warn' },
      listPages > reachable / 3 ? { name: 'Lists & tables aid extraction', detail: `${listPages} pages`, status: 'ok' } : { name: 'Few lists or tables', detail: `${listPages} pages`, status: 'warn' },
    ];
    let extractScore = 100;
    extractScore -= pct(csrPages.length, reachable) * 0.5;
    if (avgSemantic < 3) extractScore -= 12;
    extractScore -= pct(badHeadingPages.length, reachable) * 0.1;
    extractScore -= (100 - altCov) * 0.1;
    if (listPages <= reachable / 3) extractScore -= 10;
    extractScore = Math.max(0, Math.round(extractScore));
    if (csrPages.length) fixes.push({ code: 'CSR_CONTENT', n: csrPages.length });
    if (badHeadingPages.length) fixes.push({ code: 'HEADING_ORDER', n: badHeadingPages.length });
    const extractPages: PageTableData | undefined = csrPages.length
      ? { title: 'Pages where content needs JS to render', cols: ['URL', 'Text in raw HTML', 'Risk'], rows: csrPages.slice(0, 8).map(p => [pathOf(p.finalUrl), `${p.textLength} chars`, p.textLength < 120 ? 'High' : 'Medium']) }
      : undefined;

    // ----- Answer format (GEO) -----
    const totalH2 = okPages.reduce((a, p) => a + p.h2Count, 0);
    const totalQ = okPages.reduce((a, p) => a + p.questionHeadings, 0);
    const qRatio = totalH2 > 0 ? totalQ / totalH2 : 0;
    const faqPages = okPages.filter(p => p.hasFaq).length;
    // citable-content signals (Princeton GEO): statistics, quotes, outbound sources
    const totalStats = okPages.reduce((a, p) => a + p.statCount, 0);
    const totalQuotes = okPages.reduce((a, p) => a + p.quoteCount, 0);
    const totalOutbound = okPages.reduce((a, p) => a + p.outboundLinks, 0);
    const citableSignals = (totalStats >= reachable * 3 ? 1 : 0) + (totalQuotes >= 1 ? 1 : 0) + (totalOutbound >= reachable ? 1 : 0);
    const answerChecks: CheckResult[] = [
      qRatio >= 0.3 ? { name: 'Question-style headings used', detail: `${totalQ} found`, status: 'ok' } : totalQ > 0 ? { name: 'Few question-style headings', detail: `${totalQ} of ${totalH2}`, status: 'warn' } : { name: 'No question-style headings', detail: '0 found', status: 'error' },
      faqPages > 0 ? { name: 'FAQ sections present', detail: `${faqPages} pages`, status: 'ok' } : { name: 'No FAQ pattern detected', detail: '0 found', status: 'warn' },
      listPages > reachable / 3 ? { name: 'Scannable lists & tables', detail: `${listPages} pages`, status: 'ok' } : { name: 'Few lists or tables', detail: `${listPages} pages`, status: 'warn' },
      citableSignals >= 2
        ? { name: 'Citable signals present', detail: `${totalStats} stats · ${totalQuotes} quotes · ${totalOutbound} cited links`, status: 'ok' }
        : { name: 'Few statistics, quotes or cited sources', detail: `${totalStats} stats · ${totalQuotes} quotes`, status: 'warn' },
    ];
    let answerScore = 100;
    answerScore -= (1 - Math.min(1, qRatio / 0.3)) * 40;
    if (faqPages === 0) answerScore -= 20;
    if (listPages <= reachable / 3) answerScore -= 15;
    if (citableSignals < 2) answerScore -= 12;
    answerScore = Math.max(0, Math.round(answerScore));
    if (qRatio < 0.3) fixes.push({ code: 'Q_HEADINGS', n: okPages.filter(p => p.questionHeadings === 0).length || reachable });
    if (citableSignals < 2) fixes.push({ code: 'CITE_SIGNALS' });

    // ----- Entity clarity (GEO) -----
    const anySameAs = okPages.some(p => p.hasSameAs);
    const allLinks = new Set(okPages.flatMap(p => p.internalLinks));
    const hasLink = (re: RegExp) => [...allLinks].some(l => re.test(l));
    const aboutLinked = hasLink(/\/about/);
    // E-E-A-T trust pages
    const trust = { contact: hasLink(/\/contact/), privacy: hasLink(/\/privacy|\/privacy-policy/), terms: hasLink(/\/terms|\/tos\b/) };
    const trustCount = [trust.contact, trust.privacy, trust.terms].filter(Boolean).length;
    const missingTrust = [!trust.contact ? 'Contact' : '', !trust.privacy ? 'Privacy' : '', !trust.terms ? 'Terms' : ''].filter(Boolean);
    const entityChecks: CheckResult[] = [
      anySameAs ? { name: 'Organization sameAs links present', detail: 'present', status: 'ok' } : hasOrg ? { name: 'Org schema without sameAs', detail: 'add sameAs', status: 'warn' } : { name: 'No Organization/sameAs schema', detail: 'missing', status: 'error' },
      aboutLinked ? { name: 'About page linked', detail: 'found', status: 'ok' } : { name: 'No About / author page found', detail: 'missing', status: 'warn' },
      trustCount === 3
        ? { name: 'Trust pages present', detail: 'Contact · Privacy · Terms', status: 'ok' }
        : { name: `Missing trust page(s): ${missingTrust.join(', ')}`, detail: `${trustCount}/3 found`, status: trustCount === 0 ? 'error' : 'warn' },
      hasOrg ? { name: 'Brand entity defined in schema', detail: 'Organization', status: 'ok' } : { name: 'Brand entity not defined', detail: 'no schema', status: 'warn' },
    ];
    let entityScore = 100;
    if (!anySameAs) entityScore -= 28;
    if (!aboutLinked) entityScore -= 18;
    if (!hasOrg) entityScore -= 18;
    entityScore -= (3 - trustCount) * 8;
    entityScore = Math.max(0, Math.round(entityScore));
    if (!aboutLinked || !anySameAs) fixes.push({ code: 'ENTITY_ABOUT' });
    if (missingTrust.length) fixes.push({ code: 'TRUST_PAGES', extra: missingTrust.join(', ') });

    // ----- Assemble dimensions -----
    const issuesOf = (checks: CheckResult[]) => checks.filter(c => c.status !== 'ok').length;
    const D = (num: string, group: 'SEO' | 'GEO', title: string, score: number, checks: CheckResult[], summary: string, pages?: PageTableData): DimensionData => ({
      num, group, title, score, color: makeColor(score), impact: makeImpact(score), issues: issuesOf(checks), summary, checks, pages,
    });

    const dimensions: Record<string, DimensionData> = {
      crawl: D('01', 'SEO', 'Crawl & index', crawlScore, crawlChecks, `Crawlability for ${clean}: robots.txt, sitemap, status codes, redirects and orphans across ${crawls.length} sampled pages.`, crawlPages),
      onpage: D('02', 'SEO', 'On-page HTML', onpageScore, onpageChecks, `On-page signals parsed across ${reachable} pages of ${clean}: titles, meta, headings and alt text.`, onpagePages),
      performance: D('03', 'SEO', 'Performance', perfScore, perfChecks, ps.available ? `Mobile Core Web Vitals for ${clean} from Google PageSpeed.` : `PageSpeed needs an API key; showing an HTML-weight proxy for ${clean}.`),
      structured: D('04', 'SEO', 'Structured data', structScore, structChecks, `JSON-LD schema detected across ${reachable} pages of ${clean}.`, structPages),
      security: D('05', 'SEO', 'Security', securityScore, secChecks, `Transport security and HTTP hardening headers for ${clean}.`),
      aicrawler: { ...D('01', 'GEO', 'AI crawler access', aiScore, aiChecks, `Which AI search crawlers ${clean} allows or blocks in robots.txt.`, aiPages), color: aiScore < 60 ? '#C84A3E' : makeColor(aiScore), impact: aiScore < 60 ? 'High impact' : makeImpact(aiScore) },
      extractability: D('02', 'GEO', 'Extractability', extractScore, extractChecks, `Whether AI crawlers can read ${clean} from raw HTML without running JavaScript.`, extractPages),
      answerformat: D('03', 'GEO', 'Answer format', answerScore, answerChecks, `Whether ${clean} structures content answer-first the way AI engines prefer.`),
      entityclarity: D('04', 'GEO', 'Entity clarity', entityScore, entityChecks, `How clearly ${clean} establishes its brand entity for AI knowledge graphs.`),
    };

    const seoScore = Math.round(crawlScore * 0.2 + onpageScore * 0.25 + perfScore * 0.3 + structScore * 0.15 + securityScore * 0.1);
    const geoScore = Math.round(aiScore * 0.35 + extractScore * 0.3 + answerScore * 0.2 + entityScore * 0.15);

    // ----- Fix priority (specific) -----
    const seen = new Set<string>();
    const order: Record<Level, number> = { High: 0, Medium: 1, Low: 2 };
    const fixPriority: FixItem[] = fixes
      .filter(f => { if (seen.has(f.code)) return false; seen.add(f.code); return !!FIXES[f.code]; })
      .map(f => {
        const def = FIXES[f.code];
        return { rank: 0, issue: def.issue, impact: def.impact, effort: def.effort, howToFix: def.fix(f.n, f.extra) };
      })
      .sort((a, b) => order[a.impact] - order[b.impact] || order[a.effort] - order[b.effort])
      .slice(0, 8)
      .map((f, i) => ({ ...f, rank: i + 1 }));

    const pagesWithIssues = okPages.filter(p =>
      p.titleLength === 0 || p.titleLength > 60 || !p.hasMeta || p.h1Count !== 1 ||
      (p.totalImages > 0 && p.imagesWithAlt < p.totalImages) || p.textRatio < 0.08
    ).length + broken.length;

    const result: AuditData = {
      domain: clean,
      pagesCrawled: crawls.length,
      pagesWithIssues,
      seoScore,
      geoScore,
      dimensions,
      fixPriority,
    };

    return result;
  }
}

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const limit = rateLimit(`seo-audit:${ip}`, { windowMs: RATE_LIMIT_WINDOW_MS, max: RATE_LIMIT_MAX });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many audits from this address. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(limit.retryAfterSeconds),
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(limit.resetAt / 1000)),
        },
      }
    );
  }

  const { searchParams } = new URL(req.url);
  const parsedQuery = auditQuerySchema.safeParse({ domain: searchParams.get('domain') ?? '' });
  if (!parsedQuery.success) return NextResponse.json({ error: 'a valid domain is required' }, { status: 400 });
  const domain = parsedQuery.data.domain;

  // SSRF pre-check on the submitted target before opening a stream or fetching.
  try {
    const scheme = /^http:\/\//i.test(domain) ? 'http' : 'https';
    const clean = domain.replace(/^https?:\/\//i, '').replace(/\/+$/, '').split('/')[0];
    await assertPublicHost(`${scheme}://${clean}`);
  } catch {
    return NextResponse.json({ error: 'That target is not allowed.' }, { status: 400 });
  }

  // Non-streaming mode (back-compat / direct callers): single JSON result.
  if (searchParams.get('stream') !== '1') {
    try {
      return NextResponse.json(await performAudit(domain));
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Audit failed';
      return NextResponse.json({ error: msg, domain }, { status: msg === 'unreachable' ? 502 : 500 });
    }
  }

  // Streaming mode: NDJSON progress events, ending with a {type:'done'} payload.
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (e: ScanEvent) => {
        try { controller.enqueue(encoder.encode(JSON.stringify(e) + '\n')); } catch { /* closed */ }
      };
      try {
        const data = await performAudit(domain, send);
        send({ type: 'done', data });
      } catch (err) {
        send({ type: 'error', error: err instanceof Error ? err.message : 'Audit failed' });
      } finally {
        controller.close();
      }
    },
  });
  return new Response(body, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
