'use client';

import { AuditData } from '@/lib/seo-audit/types';

const DIMS_FALLBACK = {
  crawl: { num: '01', group: 'SEO', title: 'Crawl & index', score: 84, color: '#6B8E5A', impact: 'Low impact', issues: 2, summary: 'Search engines can reach your pages. A few redirect chains and orphan pages bleed crawl budget.',
    checks: [{ name: 'robots.txt & sitemap.xml valid', detail: '142 URLs', status: 'ok' }, { name: '3 redirect chains over 2 hops', detail: '3 found', status: 'warn' }, { name: '6 orphan pages, no internal links', detail: '6 found', status: 'warn' }, { name: 'Max crawl depth', detail: '4 levels · target 3', status: 'warn' }],
    pages: { title: 'Redirect chains over 2 hops', cols: ['Source URL', 'Hops', 'Resolves to'], rows: [['/products/old-house-blend', '3', '/shop/house-blend'], ['/blog?ref=newsletter', '3', '/blog'], ['/promo-2024', '4', '/shop']] } },
  onpage: { num: '02', group: 'SEO', title: 'On-page HTML', score: 70, color: '#C8962A', impact: 'Medium impact', issues: 6, summary: 'Titles and meta need tightening. Every count here is parsed directly from your HTML.',
    checks: [{ name: '18 titles over 60 characters', detail: '18 pages', status: 'error' }, { name: '24 pages missing meta description', detail: '24 pages', status: 'error' }, { name: 'Images missing alt text', detail: '31% of images', status: 'warn' }, { name: 'H1 unique per page', detail: '96% of pages', status: 'ok' }],
    pages: { title: 'Titles over 60 characters', cols: ['URL', 'Length', 'Current title'], rows: [['/shop/ethiopia-guji', '74', 'Ethiopia Guji Natural Single-Origin Whole Bean Coffee 250g'], ['/blog/pour-over-guide', '68', 'The Complete Pour-Over Brewing Guide for Beginners and Beyond'], ['/shop/subscription', '71', 'Monthly Specialty Coffee Subscription — Roasted to Order Weekly']] } },
  performance: { num: '03', group: 'SEO', title: 'Performance', score: 61, color: '#C8962A', impact: 'High impact', issues: 4, summary: 'Mobile LCP is the headline problem. Field data (real users) carries more weight than the lab score.',
    checks: [{ name: 'LCP on mobile (field)', detail: '3.8s · poor', status: 'error' }, { name: 'INP', detail: '240ms · needs work', status: 'warn' }, { name: 'CLS', detail: '0.04 · good', status: 'ok' }, { name: 'TTFB', detail: '0.9s', status: 'warn' }, { name: 'Unused JavaScript', detail: '320 KB', status: 'warn' }] },
  structured: { num: '04', group: 'SEO', title: 'Structured data', score: 55, color: '#C8962A', impact: 'Medium impact', issues: 3, summary: 'Organization markup is solid, but your shop and FAQs are invisible to rich results.',
    checks: [{ name: 'Organization schema valid', detail: 'JSON-LD', status: 'ok' }, { name: 'No Product schema on shop', detail: '64 pages', status: 'error' }, { name: 'No FAQPage anywhere', detail: '0 found', status: 'error' }, { name: 'Article schema on posts', detail: '18 posts', status: 'ok' }],
    pages: { title: 'Shop pages missing Product schema', cols: ['URL', 'Type detected', 'Recommended'], rows: [['/shop/house-blend', 'none', 'Product + Offer'], ['/shop/ethiopia-guji', 'none', 'Product + Offer'], ['/shop/decaf', 'none', 'Product + Offer']] } },
  security: { num: '05', group: 'SEO', title: 'Security', score: 92, color: '#6B8E5A', impact: 'Low impact', issues: 1, summary: 'Transport security is in good shape. One hardening header is missing.',
    checks: [{ name: 'HTTPS forced, HSTS present', detail: 'enabled', status: 'ok' }, { name: 'Valid certificate, HTTP/2', detail: 'expires in 240d', status: 'ok' }, { name: 'No mixed content', detail: 'clean', status: 'ok' }, { name: 'No Content-Security-Policy header', detail: 'missing', status: 'warn' }] },
  aicrawler: { num: '01', group: 'GEO', title: 'AI crawler access', score: 40, color: '#C84A3E', impact: 'High impact', issues: 3, summary: 'Training and search bots are separate. Blocking OAI-SearchBot quietly removes you from ChatGPT search.',
    checks: [{ name: 'OAI-SearchBot blocked — out of ChatGPT search', detail: 'Disallow: /', status: 'error' }, { name: 'GPTBot blocked (training only)', detail: 'Disallow: /', status: 'warn' }, { name: 'PerplexityBot & ClaudeBot allowed', detail: 'allowed', status: 'ok' }, { name: 'Google-Extended allowed', detail: 'Gemini / AIO', status: 'ok' }, { name: 'No llms.txt', detail: 'experimental signal', status: 'warn' }],
    pages: { title: 'AI crawler directives in robots.txt', cols: ['User-agent', 'Purpose', 'Status'], rows: [['OAI-SearchBot', 'ChatGPT search', 'Blocked'], ['GPTBot', 'OpenAI training', 'Blocked'], ['ClaudeBot', 'Claude', 'Allowed'], ['PerplexityBot', 'Perplexity', 'Allowed'], ['Google-Extended', 'Gemini / AI Overviews', 'Allowed']] } },
  extractability: { num: '02', group: 'GEO', title: 'Extractability', score: 52, color: '#C8962A', impact: 'High impact', issues: 4, summary: 'Most AI crawlers read raw HTML. Anything that needs JavaScript to appear is invisible to them.',
    checks: [{ name: 'Product copy renders client-side only', detail: 'CSR', status: 'error' }, { name: 'Semantic HTML on article pages', detail: 'article/section', status: 'ok' }, { name: 'Key specs live inside images', detail: 'no text alt', status: 'warn' }, { name: 'Tables & lists used on guides', detail: 'good', status: 'ok' }],
    pages: { title: 'Pages where content needs JS to render', cols: ['URL pattern', 'Missing from raw HTML', 'Risk'], rows: [['/shop/*', 'Price & description', 'High'], ['/subscriptions', 'Plan details', 'High'], ['/blog/*', 'Nothing — full text present', 'Low']] } },
  answerformat: { num: '03', group: 'GEO', title: 'Answer format', score: 45, color: '#C8962A', impact: 'Medium impact', issues: 5, summary: 'AI engines favour content that leads with the answer. Your pages mostly bury it.',
    checks: [{ name: 'Few question-style headings', detail: '2 of 40', status: 'error' }, { name: 'No TL;DR / answer-first intros', detail: '0 found', status: 'warn' }, { name: 'No FAQPage blocks', detail: '0 found', status: 'error' }, { name: 'Lists used in guides', detail: '40% of guides', status: 'warn' }] },
  entityclarity: { num: '04', group: 'GEO', title: 'Entity clarity', score: 60, color: '#C8962A', impact: 'Medium impact', issues: 2, summary: 'GEO optimises the entity, not the keyword. Add author/About pages and tie your brand to known entities.',
    checks: [{ name: 'Organization schema with sameAs', detail: 'present', status: 'ok' }, { name: 'No About / author pages', detail: 'missing', status: 'error' }, { name: 'Brand not linked to Wikidata', detail: 'unlinked', status: 'warn' }, { name: 'Consistent NAP across site', detail: 'consistent', status: 'ok' }] },
};

const colorMap: Record<string, string> = { ok: '#6B8E5A', warn: '#C8962A', error: '#C84A3E' };

function dotOf(status: string) {
  return {
    width: '8px',
    height: '8px',
    borderRadius: '99px',
    flex: 'none' as const,
    marginTop: '6px',
    background: colorMap[status] || '#8A847B',
    display: 'inline-block' as const,
  };
}

interface DimensionDetailProps {
  dimId: string;
  auditData: AuditData | null;
  onBack: () => void;
}

export default function DimensionDetail({ dimId, auditData, onBack }: DimensionDetailProps) {
  const dims = auditData?.dimensions ?? DIMS_FALLBACK;
  const d = (dims as typeof DIMS_FALLBACK)[dimId as keyof typeof DIMS_FALLBACK] ?? DIMS_FALLBACK.onpage;

  return (
    <div className="sg-fade" style={{ maxWidth: '1040px', margin: '0 auto', padding: '48px 48px 110px' }}>
      <button
        onClick={onBack}
        style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A847B', background: 'none', border: 'none', padding: 0, cursor: 'pointer', transition: 'color 0.25s', marginBottom: '36px', display: 'block' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#E8E4DD')}
        onMouseLeave={e => (e.currentTarget.style.color = '#8A847B')}
      >← Back to report</button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '32px', flexWrap: 'wrap', paddingBottom: '34px', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8962A' }}>
            ({d.num}) {d.group} · Checks
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500, fontSize: '44px', lineHeight: 1.1, color: '#F5F2ED', margin: '14px 0 0' }}>{d.title}</h1>
          <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#B7B0A6', margin: '18px 0 0', maxWidth: '520px' }}>{d.summary}</p>
        </div>
        <div style={{ width: '230px', flex: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '52px', color: '#F5F2ED' }}>{d.score}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: '#8A847B' }}>/ 100</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden', marginTop: '14px' }}>
            <div style={{ width: `${d.score}%`, height: '100%', background: d.color, borderRadius: '99px' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#8A847B', marginTop: '12px' }}>{d.impact}</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '44px 0 18px' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '24px', color: '#F5F2ED' }}>All checks</span>
        <span style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.12)' }} />
      </div>

      <div style={{ background: '#151311', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '16px', padding: '6px 28px' }}>
        {d.checks.map((check, i, arr) => (
          <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '17px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <span style={dotOf(check.status)} />
            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', gap: '18px', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '15px', color: '#E8E4DD' }}>{check.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#8A847B', whiteSpace: 'nowrap' }}>{check.detail}</span>
            </div>
          </div>
        ))}
      </div>

      {('pages' in d && d.pages) && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '44px 0 18px' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '24px', color: '#F5F2ED' }}>{(d as typeof DIMS_FALLBACK.crawl).pages!.title}</span>
            <span style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.12)' }} />
          </div>
          <div style={{ background: '#151311', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: '18px', padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.10)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A847B' }}>
              {(d as typeof DIMS_FALLBACK.crawl).pages!.cols.map((col, i) => <span key={i} style={{ flex: 1 }}>{col}</span>)}
            </div>
            {(d as typeof DIMS_FALLBACK.crawl).pages!.rows.map((row, ri, arr) => (
              <div key={ri} style={{ display: 'flex', gap: '18px', padding: '15px 24px', borderBottom: ri < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#E8E4DD', alignItems: 'flex-start' }}>
                {row.map((cell, ci) => <span key={ci} style={{ flex: 1, lineHeight: 1.45 }}>{cell}</span>)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', padding: '24px 28px', marginTop: '28px', background: '#1E1B18', border: '1px solid rgba(200,150,42,0.25)', borderRadius: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', color: '#C8962A', fontSize: '16px' }}>→</span>
          <span style={{ fontSize: '15px', color: '#E8E4DD' }}>Want Pixdyne&apos;s SEO &amp; Content team to fix this for you?</span>
        </div>
        <a
          href="/contact"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-sans)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', fontSize: '11px', color: '#0B0A08', background: '#C8962A', border: '1px solid #C8962A', padding: '13px 22px', cursor: 'pointer', transition: 'background 0.25s', textDecoration: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#D4A83A')}
          onMouseLeave={e => (e.currentTarget.style.background = '#C8962A')}
        >Contact us →</a>
      </div>
    </div>
  );
}
