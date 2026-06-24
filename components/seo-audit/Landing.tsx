'use client';

import { useRef } from 'react';
import SpotlightCard from './SpotlightCard';

interface LandingProps {
  domain: string;
  onRunAudit: (domain: string) => void;
}

export default function Landing({ domain, onRunAudit }: LandingProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleRun() {
    const v = (inputRef.current?.value || '').trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');
    onRunAudit(v || domain);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleRun();
  }

  return (
    <div className="sg-fade">
      {/* Hero */}
      <section style={{ position: 'relative', padding: '120px 48px 76px', overflow: 'hidden' }}>
        {/* Grid background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(200,150,42,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(200,150,42,0.06) 1px,transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'radial-gradient(circle at 50% 12%,black,transparent 72%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 12%,black,transparent 72%)',
          pointerEvents: 'none',
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '-120px',
          width: '760px',
          height: '520px',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle,rgba(200,150,42,0.12),transparent 64%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#8A847B',
            border: '1px solid rgba(255,255,255,0.12)',
            padding: '6px 14px',
            borderRadius: '99px',
          }}>
            A free check from Pixdyne · Est. 2018
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: '68px',
            lineHeight: 1.07,
            letterSpacing: '-0.02em',
            margin: '24px 0 0',
            color: '#F5F2ED',
          }}>
            Right now, AI is<br />recommending your <span style={{ color: '#C8962A' }}>competitor</span>.
          </h1>

          <p style={{
            fontSize: '20px',
            lineHeight: 1.6,
            color: '#B7B0A6',
            maxWidth: '560px',
            margin: '28px auto 0',
          }}>
            See whether AI and Google can find, read and cite your site — free, in about 30 seconds.
          </p>

          {/* URL Input */}
          <div style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 0,
            margin: '40px auto 0',
            maxWidth: '600px',
            border: '1px solid rgba(255,255,255,0.20)',
            background: '#151311',
          }}>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 18px',
              fontFamily: 'var(--font-mono)',
              fontSize: '15px',
              color: '#8A847B',
              borderRight: '1px solid rgba(255,255,255,0.12)',
              whiteSpace: 'nowrap',
            }}>https://</span>
            <input
              ref={inputRef}
              type="text"
              defaultValue={domain}
              placeholder="enter your domain"
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '16px',
                color: '#E8E4DD',
                padding: '18px 16px',
                minWidth: 0,
              }}
            />
            <button
              onClick={handleRun}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                fontSize: '12px',
                color: '#0B0A08',
                background: '#C8962A',
                border: 'none',
                padding: '0 26px',
                cursor: 'pointer',
                transition: 'background 0.25s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#D4A83A')}
              onMouseLeave={e => (e.currentTarget.style.background = '#C8962A')}
            >Run check →</button>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '18px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            letterSpacing: '0.06em',
            color: '#8A847B',
            flexWrap: 'wrap',
          }}>
            <span>Free</span><span>·</span><span>No sign-up</span><span>·</span><span>Results in ~30s</span>
          </div>
        </div>

        {/* The Shift Band */}
        <div style={{
          position: 'relative',
          maxWidth: '1080px',
          margin: '72px auto 0',
          paddingTop: '56px',
          borderTop: '1px solid rgba(255,255,255,0.12)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}>
            <div style={{ borderLeft: '2px solid #C8962A', paddingLeft: '34px' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C8962A',
                marginBottom: '20px',
              }}>The shift</div>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 500,
                fontSize: '36px',
                lineHeight: 1.22,
                color: '#F5F2ED',
                margin: 0,
              }}>
                Ranking used to mean a place on a page of blue links. Now your customer gets one answer — and either <span style={{ color: '#C8962A' }}>you&apos;re in it</span>, or a competitor is.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <div style={{ padding: '22px 0', borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A847B' }}>Then</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '24px', color: '#B7B0A6', marginTop: '8px' }}>A page of ten blue links</div>
              </div>
              <div style={{ padding: '22px 0' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8962A' }}>Now</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '24px', color: '#F5F2ED', marginTop: '8px' }}>One AI answer, a handful of sources</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engine marquee */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.10)', borderBottom: '1px solid rgba(255,255,255,0.10)', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '26px 48px', display: 'flex', alignItems: 'center', gap: '36px' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#8A847B',
            whiteSpace: 'nowrap',
            flex: 'none',
          }}>We check</span>
          <div style={{
            position: 'relative',
            flex: 1,
            overflow: 'hidden',
            maskImage: 'linear-gradient(90deg,transparent,black 8%,black 92%,transparent)',
            WebkitMaskImage: 'linear-gradient(90deg,transparent,black 8%,black 92%,transparent)',
          }}>
            <div style={{
              display: 'flex',
              gap: '54px',
              width: 'max-content',
              animation: 'sgmarquee 28s linear infinite',
            }}>
              {['Google Search', 'ChatGPT Search', 'Perplexity', 'Google AI Overviews', 'Gemini', 'Claude',
                'Google Search', 'ChatGPT Search', 'Perplexity', 'Google AI Overviews', 'Gemini', 'Claude'].map((name, i) => (
                <span key={i} style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '24px',
                  color: '#B7B0A6',
                  whiteSpace: 'nowrap',
                }}>{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO/GEO Score explainers */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.10)', borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ padding: '56px 48px', borderRight: '1px solid rgba(255,255,255,0.10)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8962A' }}>SEO Score</div>
            <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#B7B0A6', margin: '16px 0 0' }}>
              How well search engines can crawl, index and rank you. Crawlability, on-page HTML, Core Web Vitals, structured data and security — every check is deterministic. Same input, same answer.
            </p>
          </div>
          <div style={{ padding: '56px 48px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8962A' }}>GEO Score</div>
            <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#B7B0A6', margin: '16px 0 0' }}>
              Whether AI answer engines can reach, read and cite you — crawler access, content extractability, answer-format and entity clarity, all parsed straight from your code. It scores how <span style={{ color: '#E8E4DD' }}>ready you are to be cited</span>; whether engines actually cite you today is what our team tracks for you.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: '#151311', borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '90px 48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '40px', flexWrap: 'wrap', marginBottom: '56px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8A847B', marginBottom: '8px' }}>
                How it works
              </div>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 500,
                fontSize: '44px',
                lineHeight: 1.1,
                color: '#F5F2ED',
                margin: '16px 0 0',
                maxWidth: '540px',
              }}>From a URL to a plan in about thirty seconds.</h2>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.7, color: '#8A847B', maxWidth: '300px', textAlign: 'right' }}>
              No tags to install, no account to create. Paste a domain and read the result.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ padding: '34px 32px 34px 0', borderRight: '1px solid rgba(255,255,255,0.10)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#C8962A' }}>(01)</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '26px', color: '#F5F2ED', margin: '16px 0 12px' }}>Enter your domain</h3>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#B7B0A6', margin: 0 }}>We discover your sitemap and crawl every page — no plugin, no verification, nothing to install.</p>
            </div>
            <div style={{ padding: '34px 32px', borderRight: '1px solid rgba(255,255,255,0.10)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#C8962A' }}>(02)</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '26px', color: '#F5F2ED', margin: '16px 0 12px' }}>We run the checks</h3>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#B7B0A6', margin: 0 }}>Deterministic parsing of your HTML, headers and public APIs — AI-crawler access, schema, extractability and Core Web Vitals from field data. No AI, no guesswork.</p>
            </div>
            <div style={{ padding: '34px 0 34px 32px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#C8962A' }}>(03)</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '26px', color: '#F5F2ED', margin: '16px 0 12px' }}>Two scores + fixes</h3>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#B7B0A6', margin: 0 }}>An SEO score and a GEO readiness score, every issue grouped by dimension, and a fix list ranked by impact and effort.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What we check */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '100px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '40px', flexWrap: 'wrap', marginBottom: '54px' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: '46px',
            lineHeight: 1.1,
            color: '#F5F2ED',
            margin: 0,
            maxWidth: '520px',
          }}>One crawl. A full technical body-scan.</h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.7, color: '#8A847B', maxWidth: '340px', textAlign: 'right' }}>
            Every check is pure code — facts we can count or parse from your HTML, headers and public APIs. No AI, no opinions.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
          {[
            {
              num: '(01)',
              title: 'Crawl & index',
              desc: 'robots, sitemaps, status codes, redirect chains, canonicals, orphan pages and crawl depth across your whole site.',
              tags: ['robots.txt', 'Sitemaps', 'Redirects'],
            },
            {
              num: '(02)',
              title: 'On-page & speed',
              desc: 'Titles, meta, heading structure, alt coverage, plus Core Web Vitals from real-user field data — LCP, INP and CLS.',
              tags: ['Titles & meta', 'Core Web Vitals'],
            },
            {
              num: '(03)',
              title: 'AI readability',
              desc: 'Which AI crawlers you allow, whether content survives without JS, answer-format structure and entity clarity.',
              tags: ['GPTBot', 'Extractability', 'Schema'],
            },
          ].map((item, idx) => (
            <SpotlightCard key={idx}>
              <div style={{ padding: '34px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#8A847B' }}>{item.num}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '26px', lineHeight: 1.18, color: '#F5F2ED', margin: '14px 0 12px' }}>{item.title}</h3>
                <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#B7B0A6', margin: '0 0 18px' }}>{item.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      color: '#8A847B',
                      border: '1px solid rgba(255,255,255,0.14)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Pixdyne service pitch */}
      <section style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.10)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 72% 50%,rgba(200,150,42,0.14),transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '100px 48px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8A847B', marginBottom: '8px' }}>
              Pixdyne SEO &amp; Content
            </div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: '48px',
              lineHeight: 1.08,
              color: '#F5F2ED',
              margin: '18px 0 0',
            }}>The check is free. Fixing it is what we do.</h2>
            <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#B7B0A6', margin: '24px 0 22px', maxWidth: '500px' }}>
              This report finds the technical gaps. Pixdyne&apos;s SEO &amp; Content team closes them — and handles the parts code can&apos;t judge: content strategy, competitor gap, entity building and ongoing optimisation. We maintain rankings; we don&apos;t promise them.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <GoldBtn href="/contact">Talk to our SEO team →</GoldBtn>
              <OutlineBtn href="/services/seo-content">See the service ↗</OutlineBtn>
            </div>
          </div>
          <div style={{ background: '#151311', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '34px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8A847B', marginBottom: '24px' }}>
              What our team takes on
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                'Implement every fix from your report',
                'Content built to be cited by AI & ranked by Google',
                'Competitor & entity-gap analysis',
                'Ongoing monitoring & monthly reporting',
              ].map((item, i, arr) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                  padding: '15px 0',
                  borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#C8962A', fontSize: '13px' }}>→</span>
                  <span style={{ fontSize: '15px', color: '#E8E4DD' }}>{item}</span>
                </div>
              ))}
            </div>
            <a
              href="/work?capability=SEO%20%26%20Content"
              style={{
                display: 'inline-flex',
                marginTop: '24px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                color: '#C8962A',
                textDecoration: 'none',
                transition: 'color 0.25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#D4A83A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#C8962A')}
            >See our SEO work ↗</a>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '90px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '28px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500, fontSize: '52px', color: '#F5F2ED', margin: 0 }}>
            Run your free check.
          </h2>
          <p style={{ fontSize: '18px', color: '#B7B0A6', maxWidth: '480px', margin: 0 }}>
            Two scores, a full issue list, and the exact fixes that move them — no sign-up, no cost. Then talk to us about getting them done.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={handleRun}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                fontSize: '12px',
                color: '#0B0A08',
                background: '#C8962A',
                border: '1px solid #C8962A',
                padding: '15px 26px',
                cursor: 'pointer',
                transition: 'background 0.25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#D4A83A')}
              onMouseLeave={e => (e.currentTarget.style.background = '#C8962A')}
            >Check my site →</button>
            <a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                fontSize: '12px',
                color: '#E8E4DD',
                background: 'none',
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '15px 26px',
                cursor: 'pointer',
                transition: 'border-color 0.25s,color 0.25s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#C8962A'; e.currentTarget.style.color = '#C8962A'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#E8E4DD'; }}
            >Contact us ↗</a>
          </div>
        </div>
      </section>
    </div>
  );
}

function GoldBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.16em',
        fontSize: '12px',
        color: '#0B0A08',
        background: '#C8962A',
        border: '1px solid #C8962A',
        padding: '14px 24px',
        cursor: 'pointer',
        transition: 'background 0.25s',
        textDecoration: 'none',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = '#D4A83A')}
      onMouseLeave={e => (e.currentTarget.style.background = '#C8962A')}
    >{children}</a>
  );
}

function OutlineBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.16em',
        fontSize: '12px',
        color: '#E8E4DD',
        background: 'none',
        border: '1px solid rgba(255,255,255,0.25)',
        padding: '14px 24px',
        cursor: 'pointer',
        transition: 'border-color 0.25s,color 0.25s',
        textDecoration: 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#C8962A'; e.currentTarget.style.color = '#C8962A'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#E8E4DD'; }}
    >{children}</a>
  );
}
