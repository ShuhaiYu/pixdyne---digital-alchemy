'use client';

import { useEffect, useRef, useState } from 'react';
import { AuditData, ScanEvent } from '@/lib/seo-audit/types';

interface ScanStep {
  key: string;
  label: string;
  detail: string;
}

// Shown before the first real event arrives so the screen is never empty.
const INITIAL_STEP: ScanStep = { key: 'connect', label: 'Connecting to site', detail: 'opening crawl' };
const MIN_VISIBLE_MS = 1200; // avoid a jarring flash on very fast sites

interface ScanningProps {
  domain: string;
  onComplete: (data: AuditData | null) => void;
}

export default function Scanning({ domain, onComplete }: ScanningProps) {
  const [completed, setCompleted] = useState<ScanStep[]>([]);
  const [running, setRunning] = useState<ScanStep | null>(INITIAL_STEP);
  const [done, setDone] = useState(false);
  const [pages, setPages] = useState(0);
  const [issues, setIssues] = useState(0);
  const [total, setTotal] = useState(0);
  const [progress, setProgress] = useState(4);
  const [showCursor, setShowCursor] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(Date.now());
  const finishedRef = useRef(false);

  useEffect(() => {
    const ctrl = new AbortController();
    startedRef.current = Date.now();

    const finish = (data: AuditData | null) => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setDone(true);
      setShowCursor(true);
      setRunning(null);
      setProgress(100);
      const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - startedRef.current));
      setTimeout(() => onComplete(data), wait + 600);
    };

    const phaseFloor: Record<string, number> = { connect: 4, robots: 8, crawl: 10, cwv: 90, score: 96 };
    const handle = (ev: ScanEvent) => {
      if (ev.type === 'phase') {
        setRunning(prev => {
          if (prev && prev.key !== ev.key) setCompleted(c => [...c, prev]);
          return { key: ev.key, label: ev.label, detail: ev.detail };
        });
        setProgress(p => Math.max(p, phaseFloor[ev.key] ?? p));
      } else if (ev.type === 'progress') {
        setPages(ev.pages);
        setIssues(ev.issues);
        setTotal(ev.total);
        if (ev.total > 0) {
          // crawl phase occupies 10%→85% of the bar, scaled by pages done
          setProgress(p => Math.max(p, Math.min(85, 10 + Math.round((ev.pages / ev.total) * 75))));
        }
      } else if (ev.type === 'done') {
        setCompleted(c => (running ? [...c, running] : c));
        finish(ev.data);
      } else if (ev.type === 'error') {
        finish(null); // fall back to sample report
      }
    };

    (async () => {
      try {
        const res = await fetch(`/api/seo-audit?domain=${encodeURIComponent(domain)}&stream=1`, { signal: ctrl.signal });
        if (!res.ok || !res.body) throw new Error('no stream');
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buf = '';
        for (;;) {
          const { value, done: streamDone } = await reader.read();
          if (streamDone) break;
          buf += decoder.decode(value, { stream: true });
          let nl: number;
          while ((nl = buf.indexOf('\n')) >= 0) {
            const line = buf.slice(0, nl).trim();
            buf = buf.slice(nl + 1);
            if (line) {
              try { handle(JSON.parse(line) as ScanEvent); } catch { /* ignore partial */ }
            }
          }
        }
        // stream closed without a done/error event → fall back
        finish(null);
      } catch (e) {
        if (!(e instanceof DOMException && e.name === 'AbortError')) finish(null);
      }
    })();

    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [completed, running]);

  return (
    <div className="sg-fade" style={{ maxWidth: '860px', margin: '0 auto', padding: '90px 48px 120px', minHeight: '72vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ width: '9px', height: '9px', borderRadius: '99px', background: '#C8962A', animation: 'sgpulse 1.1s ease-in-out infinite', flex: 'none', display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8962A' }}>
          Analysing · live
        </span>
      </div>

      <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '32px', color: '#F5F2ED', margin: '18px 0 0', fontWeight: 500, wordBreak: 'break-all' }}>{domain}</h1>

      <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#B7B0A6', margin: '14px 0 0', maxWidth: '560px' }}>
        Running a real deterministic crawl — parsing HTML, headers and public APIs. No AI, no guesswork. Two scores when it is done.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '40px 0 28px' }}>
        <div style={{ background: '#151311', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '16px', padding: '26px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A847B' }}>Pages crawled</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '46px', color: '#F5F2ED', marginTop: '10px' }}>{pages}{total > 0 && <span style={{ fontSize: '22px', color: '#8A847B' }}> / {total}</span>}</div>
        </div>
        <div style={{ background: '#151311', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '16px', padding: '26px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A847B' }}>Issues found</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '46px', color: '#C8962A', marginTop: '10px' }}>{issues}</div>
        </div>
      </div>

      <div ref={logRef} style={{ background: '#151311', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '16px', padding: '14px 28px', minHeight: '300px', maxHeight: '360px', overflowY: 'auto' }}>
        {completed.map((step, i) => (
          <div key={i} className="sg-rise" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '13px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ color: '#6B8E5A', fontFamily: 'var(--font-mono)', fontSize: '14px', marginTop: '1px', flex: 'none' }}>✓</span>
            <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#E8E4DD' }}>{step.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#8A847B' }}>{step.detail}</span>
            </div>
          </div>
        ))}

        {running && (
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '13px 0' }}>
            <span style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid rgba(200,150,42,0.3)', borderTopColor: '#C8962A', animation: 'sgspin 0.7s linear infinite', flex: 'none', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#E8E4DD' }}>{running.label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#8A847B' }}>{running.detail}</span>
          </div>
        )}

        {showCursor && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '13px 0' }}>
            <span style={{ color: '#6B8E5A', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>✓</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#6B8E5A' }}>Check complete.</span>
            <span style={{ width: '9px', height: '16px', background: '#C8962A', display: 'inline-block', animation: 'sgblink 1s step-end infinite' }} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#8A847B', margin: '22px 0 8px' }}>
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: '#C8962A', borderRadius: '99px', transition: 'width 0.45s cubic-bezier(0.16,1,0.3,1)' }} />
      </div>

      {done && (
        <div className="sg-rise" style={{ display: 'flex', alignItems: 'center', gap: '18px', marginTop: '34px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#6B8E5A' }}>Opening report…</span>
        </div>
      )}
    </div>
  );
}
