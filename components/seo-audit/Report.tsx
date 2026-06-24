'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SpotlightCard from './SpotlightCard';
import { AuditData, FilterType } from '@/lib/seo-audit/types';

const CIRC = 490;

const DIMS_FALLBACK = {
  crawl: { num: '01', group: 'SEO' as const, title: 'Crawl & index', score: 84, color: '#6B8E5A', impact: 'Low impact', issues: 2, summary: 'Search engines can reach your pages. A few redirect chains and orphan pages bleed crawl budget.',
    checks: [{ name: 'robots.txt & sitemap.xml valid', detail: '142 URLs', status: 'ok' as const }, { name: '3 redirect chains over 2 hops', detail: '3 found', status: 'warn' as const }, { name: '6 orphan pages, no internal links', detail: '6 found', status: 'warn' as const }, { name: 'Max crawl depth', detail: '4 levels · target 3', status: 'warn' as const }],
    pages: { title: 'Redirect chains over 2 hops', cols: ['Source URL', 'Hops', 'Resolves to'], rows: [['/products/old-house-blend', '3', '/shop/house-blend'], ['/blog?ref=newsletter', '3', '/blog'], ['/promo-2024', '4', '/shop']] } },
  onpage: { num: '02', group: 'SEO' as const, title: 'On-page HTML', score: 70, color: '#C8962A', impact: 'Medium impact', issues: 6, summary: 'Titles and meta need tightening. Every count here is parsed directly from your HTML.',
    checks: [{ name: '18 titles over 60 characters', detail: '18 pages', status: 'error' as const }, { name: '24 pages missing meta description', detail: '24 pages', status: 'error' as const }, { name: 'Images missing alt text', detail: '31% of images', status: 'warn' as const }, { name: 'H1 unique per page', detail: '96% of pages', status: 'ok' as const }],
    pages: { title: 'Titles over 60 characters', cols: ['URL', 'Length', 'Current title'], rows: [['/shop/ethiopia-guji', '74', 'Ethiopia Guji Natural Single-Origin Whole Bean Coffee 250g'], ['/blog/pour-over-guide', '68', 'The Complete Pour-Over Brewing Guide for Beginners and Beyond']] } },
  performance: { num: '03', group: 'SEO' as const, title: 'Performance', score: 61, color: '#C8962A', impact: 'High impact', issues: 4, summary: 'Mobile LCP is the headline problem. Field data (real users) carries more weight than the lab score.',
    checks: [{ name: 'LCP on mobile (field)', detail: '3.8s · poor', status: 'error' as const }, { name: 'INP', detail: '240ms · needs work', status: 'warn' as const }, { name: 'CLS', detail: '0.04 · good', status: 'ok' as const }, { name: 'TTFB', detail: '0.9s', status: 'warn' as const }] },
  structured: { num: '04', group: 'SEO' as const, title: 'Structured data', score: 55, color: '#C8962A', impact: 'Medium impact', issues: 3, summary: 'Organization markup is solid, but your shop and FAQs are invisible to rich results.',
    checks: [{ name: 'Organization schema valid', detail: 'JSON-LD', status: 'ok' as const }, { name: 'No Product schema on shop', detail: '64 pages', status: 'error' as const }, { name: 'No FAQPage anywhere', detail: '0 found', status: 'error' as const }, { name: 'Article schema on posts', detail: '18 posts', status: 'ok' as const }],
    pages: { title: 'Shop pages missing Product schema', cols: ['URL', 'Type detected', 'Recommended'], rows: [['/shop/house-blend', 'none', 'Product + Offer'], ['/shop/decaf', 'none', 'Product + Offer']] } },
  security: { num: '05', group: 'SEO' as const, title: 'Security', score: 92, color: '#6B8E5A', impact: 'Low impact', issues: 1, summary: 'Transport security is in good shape. One hardening header is missing.',
    checks: [{ name: 'HTTPS forced, HSTS present', detail: 'enabled', status: 'ok' as const }, { name: 'Valid certificate', detail: 'expires in 240d', status: 'ok' as const }, { name: 'No Content-Security-Policy header', detail: 'missing', status: 'warn' as const }] },
  aicrawler: { num: '01', group: 'GEO' as const, title: 'AI crawler access', score: 40, color: '#C84A3E', impact: 'High impact', issues: 3, summary: 'Training and search bots are separate. Blocking OAI-SearchBot quietly removes you from ChatGPT search.',
    checks: [{ name: 'OAI-SearchBot blocked — out of ChatGPT search', detail: 'Disallow: /', status: 'error' as const }, { name: 'GPTBot blocked (training only)', detail: 'Disallow: /', status: 'warn' as const }, { name: 'PerplexityBot & ClaudeBot allowed', detail: 'allowed', status: 'ok' as const }],
    pages: { title: 'AI crawler directives in robots.txt', cols: ['User-agent', 'Purpose', 'Status'], rows: [['OAI-SearchBot', 'ChatGPT search', 'Blocked'], ['GPTBot', 'OpenAI training', 'Blocked'], ['ClaudeBot', 'Claude', 'Allowed'], ['PerplexityBot', 'Perplexity', 'Allowed']] } },
  extractability: { num: '02', group: 'GEO' as const, title: 'Extractability', score: 52, color: '#C8962A', impact: 'High impact', issues: 4, summary: 'Most AI crawlers read raw HTML. Anything that needs JavaScript to appear is invisible to them.',
    checks: [{ name: 'Product copy renders client-side only', detail: 'CSR', status: 'error' as const }, { name: 'Semantic HTML on article pages', detail: 'article/section', status: 'ok' as const }, { name: 'Key specs live inside images', detail: 'no text alt', status: 'warn' as const }] },
  answerformat: { num: '03', group: 'GEO' as const, title: 'Answer format', score: 45, color: '#C8962A', impact: 'Medium impact', issues: 5, summary: 'AI engines favour content that leads with the answer. Your pages mostly bury it.',
    checks: [{ name: 'Few question-style headings', detail: '2 of 40', status: 'error' as const }, { name: 'No TL;DR / answer-first intros', detail: '0 found', status: 'warn' as const }, { name: 'No FAQPage blocks', detail: '0 found', status: 'error' as const }] },
  entityclarity: { num: '04', group: 'GEO' as const, title: 'Entity clarity', score: 60, color: '#C8962A', impact: 'Medium impact', issues: 2, summary: 'GEO optimises the entity, not the keyword. Add author/About pages and tie your brand to known entities.',
    checks: [{ name: 'Organization schema with sameAs', detail: 'present', status: 'ok' as const }, { name: 'No About / author pages', detail: 'missing', status: 'error' as const }, { name: 'Consistent NAP across site', detail: 'consistent', status: 'ok' as const }] },
};

const LOCKED = {
  cq: { num: '06', group: 'SEO', title: 'Content quality', sub: 'Needs human review', scoreText: '?', lines: ['Depth vs the pages that outrank you', 'E-E-A-T & author signals', 'Is it written to be cited'], lockLabel: 'We review this for you', critical: false },
  cite: { num: '05', group: 'GEO', title: 'Citation-worthiness', sub: 'Needs human review', scoreText: '?', lines: ['Fact & data density', 'Named, verifiable sources', 'Reads as reference, not an ad'], lockLabel: 'We review this for you', critical: false },
  aiv: { num: '06', group: 'GEO', title: 'AI visibility', sub: 'Tracked by our team', scoreText: '?', lines: ['Who AI engines cite for your prompts', 'Your share of AI answers vs rivals', 'Wrong claims AI repeats about you'], lockLabel: 'We track this for you', critical: true },
};

const REPORT_ORDER = ['crawl', 'onpage', 'performance', 'structured', 'security', 'L:cq', 'aicrawler', 'extractability', 'answerformat', 'entityclarity', 'L:cite', 'L:aiv'];

const FIX_ITEMS = [
  { rank: '01', issue: 'Unblock OAI-SearchBot in robots.txt', impact: 'High', effort: 'Low', impactColor: '#C84A3E', effortColor: '#6B8E5A', howToFix: 'Remove the Disallow for / — +14 GEO expected' },
  { rank: '02', issue: 'Server-render product copy (currently CSR)', impact: 'High', effort: 'High', impactColor: '#C84A3E', effortColor: '#C84A3E', howToFix: 'Pre-render with SSR/SSG — +9 GEO expected' },
  { rank: '03', issue: 'Add Product & FAQPage schema to shop', impact: 'Medium', effort: 'Low', impactColor: '#C8962A', effortColor: '#6B8E5A', howToFix: 'JSON-LD template — +6 SEO / +5 GEO expected' },
  { rank: '04', issue: 'Cut LCP from 3.8s on mobile', impact: 'High', effort: 'Medium', impactColor: '#C84A3E', effortColor: '#C8962A', howToFix: 'Preload hero, defer JS — +8 SEO expected' },
  { rank: '05', issue: 'Rewrite H2s as questions, add TL;DRs', impact: 'Medium', effort: 'Low', impactColor: '#C8962A', effortColor: '#6B8E5A', howToFix: 'Answer-first structure — +5 GEO expected' },
];

interface ReportProps {
  domain: string;
  auditData: AuditData | null;
  onOpenDim: (id: string) => void;
}

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

function chipStyle(active: boolean) {
  return {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    padding: '7px 15px',
    borderRadius: '99px',
    cursor: 'pointer',
    border: active ? '1px solid rgba(200,150,42,0.5)' : '1px solid rgba(255,255,255,0.18)',
    color: active ? '#C8962A' : '#8A847B',
    background: active ? 'rgba(200,150,42,0.06)' : 'transparent',
    transition: 'all 0.2s',
  };
}

function getGrade(score: number) {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 45) return 'D';
  return 'F';
}

function getSeoSummary(score: number) {
  if (score >= 75) return 'Crawlable and secure. Lose points on Core Web Vitals and incomplete structured data.';
  if (score >= 60) return 'Solid fundamentals but several issues need attention to reach top rankings.';
  return 'Critical gaps in crawlability, performance, or structured data need immediate attention.';
}

function getGeoSummary(score: number) {
  if (score >= 60) return 'Good AI readiness but some content still needs work to be fully citable.';
  if (score >= 40) return 'You are blocking an AI search crawler and key content needs JS to render — so most of your pages can\'t be read by AI, let alone cited.';
  return 'Critical GEO issues: AI crawlers blocked and content not extractable from raw HTML.';
}

export default function Report({ domain, auditData, onOpenDim }: ReportProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [exporting, setExporting] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [seoOffset, setSeoOffset] = useState(CIRC);
  const [geoOffset, setGeoOffset] = useState(CIRC);
  const [seoDisp, setSeoDisp] = useState(0);
  const [geoDisp, setGeoDisp] = useState(0);
  const scopeRef = useRef<HTMLDivElement>(null);

  const dims = auditData?.dimensions ?? DIMS_FALLBACK;
  const seoScore = auditData?.seoScore ?? 72;
  const geoScore = auditData?.geoScore ?? 48;
  const pagesCrawled = auditData?.pagesCrawled ?? 142;
  const pagesWithIssues = auditData?.pagesWithIssues ?? 38;
  const fixItems = auditData?.fixPriority ?? FIX_ITEMS.map(f => ({
    rank: parseInt(f.rank),
    issue: f.issue,
    impact: f.impact as 'High' | 'Medium' | 'Low',
    effort: f.effort as 'High' | 'Medium' | 'Low',
    howToFix: f.howToFix,
  }));

  // Count-up + ring fill, driven by GSAP (the project's animation engine) on a
  // single RAF-based tween instead of a hand-rolled setInterval easing loop.
  // useGSAP scopes the tween and auto-reverts on unmount; prefers-reduced-motion
  // is honoured (the old loop ignored it) by snapping straight to the final values.
  useGSAP(() => {
    const reduce = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const obj = { seo: 0, geo: 0, seoOff: CIRC, geoOff: CIRC };
    gsap.to(obj, {
      seo: seoScore,
      geo: geoScore,
      seoOff: CIRC * (1 - seoScore / 100),
      geoOff: CIRC * (1 - geoScore / 100),
      duration: reduce ? 0 : 1,
      ease: 'power3.out',
      onUpdate: () => {
        setSeoDisp(Math.round(obj.seo));
        setGeoDisp(Math.round(obj.geo));
        setSeoOffset(obj.seoOff);
        setGeoOffset(obj.geoOff);
      },
    });
  }, { dependencies: [seoScore, geoScore], scope: scopeRef });

  // Build cards
  const built = REPORT_ORDER.map(key => {
    if (key.startsWith('L:')) {
      const l = LOCKED[key.slice(2) as keyof typeof LOCKED];
      return { type: 'locked' as const, group: l.group, critical: l.critical, num: l.num, title: l.title, sub: l.sub, scoreText: l.scoreText, lines: l.lines, lockLabel: l.lockLabel, id: key };
    }
    const dd = (dims as typeof DIMS_FALLBACK)[key as keyof typeof DIMS_FALLBACK] ?? DIMS_FALLBACK[key as keyof typeof DIMS_FALLBACK];
    if (!dd) return null;
    return { type: 'dim' as const, id: key, group: dd.group, critical: (dd.impact === 'High impact' || dd.score < 50), num: dd.num, title: dd.title, score: dd.score, color: dd.color, impact: dd.impact, issues: dd.issues, checks: dd.checks };
  }).filter(Boolean);

  const visible = built.filter(c => {
    if (!c) return false;
    if (filter === 'all') return true;
    if (filter === 'seo') return c.group === 'SEO';
    if (filter === 'geo') return c.group === 'GEO';
    if (filter === 'critical') return (c as { critical?: boolean }).critical;
    return true;
  });

  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const impactColor = (impact: string) => {
    if (impact === 'High') return '#C84A3E';
    if (impact === 'Medium') return '#C8962A';
    return '#6B8E5A';
  };

  const handleExport = async () => {
    if (exporting) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailErr('Please enter a valid email address.');
      return;
    }
    setEmailErr('');
    setExporting(true);
    try {
      const data = { domain, pagesCrawled, pagesWithIssues, seoScore, geoScore, dimensions: dims, fixPriority: fixItems };
      const res = await fetch('/api/seo-audit/report-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, email: email.trim() }),
      });
      if (!res.ok) throw new Error('PDF request failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pixdyne-seo-geo-${domain.replace(/[^a-z0-9.-]/gi, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setShowEmailModal(false);
    } catch {
      setEmailErr('Sorry — the PDF could not be generated. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div ref={scopeRef} className="sg-fade" style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 48px 110px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap', marginBottom: '14px' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8962A' }}>
            Free check · {today}
          </div>
          <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '34px', color: '#F5F2ED', margin: '14px 0 0', fontWeight: 500, wordBreak: 'break-all' }}>{domain}</h1>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#8A847B', marginTop: '8px' }}>
            {pagesCrawled} pages crawled · {pagesWithIssues} with issues · Lab + field data
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => { setEmailErr(''); setShowEmailModal(true); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              fontSize: '11px',
              color: '#E8E4DD',
              background: 'none',
              border: '1px solid rgba(255,255,255,0.25)',
              padding: '13px 20px',
              cursor: 'pointer',
              transition: 'border-color 0.25s, color 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#C8962A'; e.currentTarget.style.color = '#C8962A'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#E8E4DD'; }}
          >Export PDF ↓</button>
          <a
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              fontSize: '11px',
              color: '#0B0A08',
              background: '#C8962A',
              border: '1px solid #C8962A',
              padding: '13px 22px',
              cursor: 'pointer',
              transition: 'background 0.25s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#D4A83A')}
            onMouseLeave={e => (e.currentTarget.style.background = '#C8962A')}
          >Get these fixed →</a>
        </div>
      </div>

      {/* Score rings */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '36px 0 48px' }}>
        {/* SEO */}
        <div style={{ background: '#151311', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '16px', padding: '36px', display: 'flex', alignItems: 'center', gap: '34px' }}>
          <div style={{ position: 'relative', width: '160px', height: '160px', flex: 'none' }}>
            <svg width="160" height="160" viewBox="0 0 180 180">
              <circle cx="90" cy="90" r="78" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="11" />
              <circle cx="90" cy="90" r="78" fill="none" stroke="#C8962A" strokeWidth="11" strokeLinecap="round" strokeDasharray="490" transform="rotate(-90 90 90)"
                style={{ strokeDashoffset: seoOffset }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '44px', lineHeight: 1, color: '#F5F2ED' }}>{seoDisp}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '2px', color: '#8A847B', marginTop: '7px' }}>/ 100</span>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8962A' }}>SEO Score</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '30px', color: '#F5F2ED', margin: '8px 0 10px' }}>
              Grade {getGrade(seoScore)} — {seoScore >= 75 ? 'solid base' : seoScore >= 60 ? 'needs work' : 'at risk'}
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.55, color: '#B7B0A6', maxWidth: '280px' }}>{getSeoSummary(seoScore)}</div>
          </div>
        </div>

        {/* GEO */}
        <div style={{ background: '#151311', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '16px', padding: '36px', display: 'flex', alignItems: 'center', gap: '34px' }}>
          <div style={{ position: 'relative', width: '160px', height: '160px', flex: 'none' }}>
            <svg width="160" height="160" viewBox="0 0 180 180">
              <circle cx="90" cy="90" r="78" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="11" />
              <circle cx="90" cy="90" r="78" fill="none" stroke="#C84A3E" strokeWidth="11" strokeLinecap="round" strokeDasharray="490" transform="rotate(-90 90 90)"
                style={{ strokeDashoffset: geoOffset }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '44px', lineHeight: 1, color: '#F5F2ED' }}>{geoDisp}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '2px', color: '#8A847B', marginTop: '7px' }}>/ 100</span>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C84A3E' }}>GEO Score</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '30px', color: '#F5F2ED', margin: '8px 0 10px' }}>
              Grade {getGrade(geoScore)} — {geoScore >= 60 ? 'needs work' : 'at risk'}
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.55, color: '#B7B0A6', maxWidth: '280px' }}>{getGeoSummary(geoScore)}</div>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '0 0 22px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '28px', color: '#F5F2ED' }}>Breakdown</span>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginLeft: '8px' }}>
          {(['all', 'seo', 'geo', 'critical'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={chipStyle(filter === f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#8A847B' }}>{visible.length} dimensions</span>
      </div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '48px' }}>
        {visible.map((card, i) => {
          if (!card) return null;
          if (card.type === 'locked') {
            return (
              <div key={card.id} className="sg-rise" style={{ animationDelay: `${i * 0.05}s` }}>
                <div style={{ position: 'relative', background: '#1E1B18', border: '1px solid rgba(200,150,42,0.28)', borderRadius: '16px', padding: '24px', overflow: 'hidden', height: '100%', minHeight: '240px' }}>
                  <div style={{ filter: 'blur(5px)', opacity: 0.45, pointerEvents: 'none', userSelect: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8962A' }}>({card.num}) {card.title}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#8A847B', marginTop: '6px' }}>{card.sub}</div>
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '26px', color: '#F5F2ED' }}>{card.scoreText}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13px', color: '#B7B0A6' }}>
                      {card.lines.map((ln, j) => <div key={j}>{ln}</div>)}
                    </div>
                  </div>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', textAlign: 'center', padding: '20px', background: 'linear-gradient(to bottom,rgba(11,10,8,0.4),rgba(11,10,8,0.85))' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8962A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8962A' }}>{card.lockLabel}</div>
                    <a href="/contact"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '11px', color: '#0B0A08', background: '#C8962A', border: 'none', padding: '10px 18px', cursor: 'pointer', transition: 'background 0.25s', textDecoration: 'none', display: 'inline-block' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#D4A83A')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#C8962A')}
                    >Contact us →</a>
                  </div>
                </div>
              </div>
            );
          }
          // dim card
          const dimCard = card as typeof built[0] & { type: 'dim'; score: number; color: string; issues: number; checks: { name: string; status: string }[] };
          const scoreColor = dimCard.id === 'aicrawler' ? '#C84A3E' : '#F5F2ED';
          return (
            <div key={card.id} className="sg-rise" style={{ animationDelay: `${i * 0.05}s`, height: '100%' }}>
              <SpotlightCard style={{ height: '100%' }}>
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8962A' }}>({dimCard.num}) {dimCard.title}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#8A847B', marginTop: '6px' }}>{dimCard.group} · {dimCard.issues} issues · {dimCard.impact}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '26px', color: scoreColor }}>{dimCard.score}</div>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ width: `${dimCard.score}%`, height: '100%', background: dimCard.color, borderRadius: '99px' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13px' }}>
                    {dimCard.checks.slice(0, 3).map((ck, j) => (
                      <div key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#B7B0A6' }}>
                        <span style={dotOf(ck.status)} />
                        {ck.name}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => onOpenDim(card.id)}
                    style={{ marginTop: 'auto', alignSelf: 'flex-start', background: 'none', border: 'none', padding: '6px 0 0', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', color: '#C8962A', transition: 'color 0.25s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#D4A83A')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#C8962A')}
                  >View all checks →</button>
                </div>
              </SpotlightCard>
            </div>
          );
        })}
      </div>

      {/* Fix priority */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '0 0 24px' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '28px', color: '#F5F2ED' }}>Fix priority</span>
        <span style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.12)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#8A847B' }}>Ranked by impact × effort</span>
      </div>
      <div style={{ background: '#151311', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 110px 110px 1.4fr', gap: '16px', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.10)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A847B' }}>
          <span>#</span><span>Issue</span><span>Impact</span><span>Effort</span><span>How to fix + expected gain</span>
        </div>
        {fixItems.slice(0, 5).map((item, i, arr) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '48px 1fr 110px 110px 1.4fr', gap: '16px', padding: '18px 24px', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: '#C8962A' }}>{String(item.rank).padStart(2, '0')}</span>
            <span style={{ fontSize: '15px', color: '#E8E4DD' }}>{item.issue}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: impactColor(item.impact) }}>{item.impact}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: impactColor(item.effort) }}>{item.effort}</span>
            <span style={{ fontSize: '13px', color: '#B7B0A6', filter: 'blur(4.5px)', userSelect: 'none' }}>{item.howToFix}</span>
          </div>
        ))}
      </div>

      {/* CTA band */}
      <div style={{ position: 'relative', marginTop: '48px', border: '1px solid rgba(200,150,42,0.3)', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%,rgba(200,150,42,0.12),transparent 62%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '560px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8A847B', marginBottom: '8px' }}>Pixdyne SEO &amp; Content</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500, fontSize: '32px', lineHeight: 1.15, color: '#F5F2ED', margin: '14px 0 12px' }}>
              Don&apos;t want to action this list yourself?
            </h3>
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#B7B0A6', margin: 0 }}>
              Our team implements every fix above, builds the content AI and Google cite, and tracks your scores over time. The check is free — getting it done is what we do.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 'none' }}>
            <a href="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'var(--font-sans)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', fontSize: '12px', color: '#0B0A08', background: '#C8962A', border: '1px solid #C8962A', padding: '15px 28px', cursor: 'pointer', transition: 'background 0.25s', textDecoration: 'none', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#D4A83A')}
              onMouseLeave={e => (e.currentTarget.style.background = '#C8962A')}
            >Talk to our SEO team →</a>
            <a href="/services/seo-content"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', color: '#C8962A', textDecoration: 'none', transition: 'color 0.25s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#D4A83A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#C8962A')}
            >See the SEO service ↗</a>
          </div>
        </div>
      </div>

      {showEmailModal && (
        <div
          onClick={() => { if (!exporting) setShowEmailModal(false); }}
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(11,10,8,0.78)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="sg-rise"
            style={{ width: '100%', maxWidth: '440px', background: '#151311', border: '1px solid rgba(200,150,42,0.3)', borderRadius: '16px', padding: '36px' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8962A' }}>Your report · {domain}</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500, fontSize: '26px', lineHeight: 1.15, color: '#F5F2ED', margin: '12px 0 8px' }}>Where should we send it?</h3>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#B7B0A6', margin: '0 0 20px' }}>
              We&apos;ll email your SEO &amp; GEO report as a PDF. No spam — just your results and the occasional way we can help.
            </p>
            <input
              type="email"
              value={email}
              autoFocus
              placeholder="you@company.com"
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleExport(); }}
              style={{ width: '100%', background: '#0B0A08', border: `1px solid ${emailErr ? '#C84A3E' : 'rgba(255,255,255,0.2)'}`, outline: 'none', color: '#E8E4DD', fontFamily: 'var(--font-mono)', fontSize: '15px', padding: '14px 16px', marginBottom: emailErr ? '8px' : '18px' }}
            />
            {emailErr && <div style={{ color: '#C84A3E', fontFamily: 'var(--font-mono)', fontSize: '12px', margin: '0 0 16px' }}>{emailErr}</div>}
            <button
              onClick={handleExport}
              disabled={exporting}
              style={{ width: '100%', fontFamily: 'var(--font-sans)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', fontSize: '12px', color: '#0B0A08', background: '#C8962A', border: 'none', padding: '15px', cursor: exporting ? 'wait' : 'pointer', opacity: exporting ? 0.7 : 1, transition: 'background 0.25s' }}
              onMouseEnter={e => { if (!exporting) e.currentTarget.style.background = '#D4A83A'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C8962A'; }}
            >{exporting ? 'Generating…' : 'Download PDF report ↓'}</button>
            <button
              onClick={() => { if (!exporting) setShowEmailModal(false); }}
              style={{ width: '100%', marginTop: '10px', background: 'none', border: 'none', color: '#8A847B', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.08em', cursor: 'pointer', padding: '6px' }}
            >Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
