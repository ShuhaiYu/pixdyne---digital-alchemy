'use client';

// Client state machine for the Free SEO Audit tool. Ported from the
// standalone tool's app/page.tsx. Differences from the standalone version:
//   - No <Nav>/<Footer> — the site's global Navigation + SiteFooter
//     (app/layout.tsx) already wrap every route.
//   - No localStorage screen persistence — returning to /free-seo-audit
//     always lands on the Landing hero (the lead-gen surface), and the
//     server render is always 'landing' so there is no hydration mismatch.
// Inline-style hex colours in the child components intentionally match the
// brand tokens (see app/globals.css) — they are not Tailwind classes by design.

import { useState, useCallback } from 'react';
import Landing from '@/components/seo-audit/Landing';
import Scanning from '@/components/seo-audit/Scanning';
import Report from '@/components/seo-audit/Report';
import DimensionDetail from '@/components/seo-audit/DimensionDetail';
import { Screen, AuditData } from '@/lib/seo-audit/types';

export default function SeoAuditClient() {
  const [screen, setScreen] = useState<Screen>('landing');
  // No pre-filled placeholder domain — the visitor must enter their own site.
  const [domain, setDomain] = useState('');
  const [dimId, setDimId] = useState('onpage');
  const [auditData, setAuditData] = useState<AuditData | null>(null);

  const goTo = useCallback((s: Screen) => {
    setScreen(s);
    try { window.scrollTo(0, 0); } catch (_e) { /* ignore */ }
  }, []);

  const handleRunAudit = useCallback((d: string) => {
    const cleanDomain = d.trim();
    if (!cleanDomain) return; // require the visitor to enter their own domain
    setDomain(cleanDomain);
    setAuditData(null);
    // The Scanning screen streams the real audit and reports back the data.
    goTo('scanning');
  }, [goTo]);

  const handleScanComplete = useCallback((data: AuditData | null) => {
    setAuditData(data);
    goTo('report');
  }, [goTo]);

  const handleOpenDim = useCallback((id: string) => {
    setDimId(id);
    goTo('dim');
  }, [goTo]);

  const handleGoReport = useCallback(() => {
    goTo('report');
  }, [goTo]);

  return (
    <div style={{ background: '#0B0A08', color: '#E8E4DD', fontFamily: 'var(--font-sans)', minHeight: '100vh', overflowX: 'hidden' }}>
      {screen === 'landing' && (
        <Landing domain={domain} onRunAudit={handleRunAudit} />
      )}

      {screen === 'scanning' && (
        <Scanning domain={domain} onComplete={handleScanComplete} />
      )}

      {screen === 'report' && (
        <Report domain={domain} auditData={auditData} onOpenDim={handleOpenDim} />
      )}

      {screen === 'dim' && (
        <DimensionDetail dimId={dimId} auditData={auditData} onBack={handleGoReport} />
      )}
    </div>
  );
}
