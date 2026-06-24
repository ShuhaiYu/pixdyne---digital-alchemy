import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { AuditData, DimensionData } from './types';

const GOLD = '#C8962A';
const INK = '#1F1B16';
const MUTED = '#6B645B';
const LINE = '#D8D0C4';
const BG = '#F7F4EF';
const ERR = '#C84A3E';
const OK = '#6B8E5A';

function grade(score: number) {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 45) return 'D';
  return 'F';
}
const statusColor = (s: string) => (s === 'ok' ? OK : s === 'error' ? ERR : GOLD);

const styles = StyleSheet.create({
  page: { backgroundColor: BG, color: INK, paddingTop: 44, paddingBottom: 56, paddingHorizontal: 46, fontFamily: 'Helvetica', fontSize: 10 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderBottomWidth: 1, borderBottomColor: LINE, paddingBottom: 12 },
  brand: { fontFamily: 'Helvetica-Bold', fontSize: 14, letterSpacing: 3, color: INK },
  kicker: { fontSize: 8, letterSpacing: 2, color: MUTED, marginTop: 3 },
  metaRight: { fontSize: 8, letterSpacing: 1, color: MUTED, textAlign: 'right' },
  domain: { fontFamily: 'Times-BoldItalic', fontSize: 26, color: INK, marginTop: 18 },
  sub: { fontSize: 9, color: MUTED, marginTop: 6 },
  scoreRow: { flexDirection: 'row', gap: 16, marginTop: 22 },
  scoreCard: { flex: 1, borderWidth: 1, borderColor: LINE, borderRadius: 8, padding: 16, backgroundColor: '#FFFFFF' },
  scoreLabel: { fontSize: 8, letterSpacing: 2, color: GOLD },
  scoreNum: { fontFamily: 'Times-Bold', fontSize: 40, color: INK, marginTop: 4 },
  scoreOf: { fontSize: 10, color: MUTED },
  scoreGrade: { fontFamily: 'Times-Italic', fontSize: 13, color: INK, marginTop: 2 },
  bar: { height: 5, backgroundColor: '#EAE4DA', borderRadius: 3, marginTop: 10, overflow: 'hidden' },
  sectionTitle: { fontFamily: 'Times-Italic', fontSize: 16, color: INK, marginTop: 26, marginBottom: 10 },
  dimRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: LINE, paddingVertical: 7 },
  dimNum: { width: 22, fontSize: 8, color: GOLD },
  dimTitle: { flex: 1, fontSize: 10, color: INK },
  dimGroup: { width: 38, fontSize: 8, color: MUTED },
  dimIssues: { width: 70, fontSize: 8, color: MUTED },
  dimScore: { width: 46, fontSize: 11, fontFamily: 'Helvetica-Bold', textAlign: 'right' },
  fixRow: { flexDirection: 'row', alignItems: 'flex-start', borderBottomWidth: 1, borderBottomColor: LINE, paddingVertical: 8 },
  fixRank: { width: 20, fontSize: 10, color: GOLD, fontFamily: 'Helvetica-Bold' },
  fixIssue: { flex: 1, fontSize: 10, color: INK, paddingRight: 10 },
  badge: { width: 60, fontSize: 8 },
  lockCard: { flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: GOLD, borderRadius: 6, padding: 10, marginBottom: 6, backgroundColor: '#FFFDF8' },
  ctaBox: { marginTop: 22, borderWidth: 1, borderColor: GOLD, borderRadius: 8, padding: 16, backgroundColor: '#FFFDF8' },
  ctaTitle: { fontFamily: 'Times-Italic', fontSize: 14, color: INK },
  ctaText: { fontSize: 9, color: MUTED, marginTop: 6, lineHeight: 1.5 },
  ctaLink: { fontSize: 10, color: GOLD, fontFamily: 'Helvetica-Bold', marginTop: 8 },
  footer: { position: 'absolute', bottom: 24, left: 46, right: 46, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: LINE, paddingTop: 8 },
  footerText: { fontSize: 7.5, color: MUTED },
});

const LOCKED = [
  { title: 'Content quality', group: 'SEO', note: 'Depth, E-E-A-T and author signals — reviewed by our team.' },
  { title: 'Citation-worthiness', group: 'GEO', note: 'Fact density and verifiable sources — reviewed by our team.' },
  { title: 'AI visibility', group: 'GEO', note: 'Who AI engines actually cite for your prompts — tracked by our team.' },
];

function Bar({ score, color }: { score: number; color: string }) {
  return (
    <View style={styles.bar}>
      <View style={{ width: `${Math.max(2, Math.min(100, score))}%`, height: 5, backgroundColor: color, borderRadius: 3 }} />
    </View>
  );
}

export function ReportDocument({ data }: { data: AuditData }) {
  const dims = Object.values(data.dimensions) as DimensionData[];
  const seoColor = data.seoScore >= 75 ? OK : data.seoScore >= 45 ? GOLD : ERR;
  const geoColor = data.geoScore >= 75 ? OK : data.geoScore >= 45 ? GOLD : ERR;
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <Document title={`Pixdyne SEO & GEO check — ${data.domain}`} author="Pixdyne">
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.brand}>PIXDYNE</Text>
            <Text style={styles.kicker}>FREE SEO &amp; GEO READINESS CHECK</Text>
          </View>
          <Text style={styles.metaRight}>{today}{'\n'}{data.pagesCrawled} pages crawled · {data.pagesWithIssues} with issues</Text>
        </View>

        <Text style={styles.domain}>{data.domain}</Text>
        <Text style={styles.sub}>
          Deterministic crawl — robots, HTML, headers and field data. No AI, no guesswork. The GEO score measures
          readiness to be read and cited by AI answer engines.
        </Text>

        <View style={styles.scoreRow}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>SEO SCORE</Text>
            <Text style={styles.scoreNum}>{data.seoScore}<Text style={styles.scoreOf}> / 100</Text></Text>
            <Text style={styles.scoreGrade}>Grade {grade(data.seoScore)}</Text>
            <Bar score={data.seoScore} color={seoColor} />
          </View>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>GEO SCORE</Text>
            <Text style={styles.scoreNum}>{data.geoScore}<Text style={styles.scoreOf}> / 100</Text></Text>
            <Text style={styles.scoreGrade}>Grade {grade(data.geoScore)}</Text>
            <Bar score={data.geoScore} color={geoColor} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Breakdown by dimension</Text>
        {dims.map((d, i) => (
          <View key={i} style={styles.dimRow}>
            <Text style={styles.dimNum}>{d.num}</Text>
            <Text style={styles.dimTitle}>{d.title}</Text>
            <Text style={styles.dimGroup}>{d.group}</Text>
            <Text style={styles.dimIssues}>{d.issues} issue{d.issues === 1 ? '' : 's'}</Text>
            <Text style={{ ...styles.dimScore, color: statusColor(d.score >= 75 ? 'ok' : d.score >= 45 ? 'warn' : 'error') }}>{d.score}/100</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Fix priority</Text>
        {data.fixPriority.slice(0, 8).map((f, i) => (
          <View key={i} style={styles.fixRow}>
            <Text style={styles.fixRank}>{String(f.rank).padStart(2, '0')}</Text>
            <Text style={styles.fixIssue}>{f.issue}</Text>
            <Text style={{ ...styles.badge, color: f.impact === 'High' ? ERR : f.impact === 'Medium' ? GOLD : OK }}>Impact {f.impact}</Text>
            <Text style={{ ...styles.badge, color: f.effort === 'High' ? ERR : f.effort === 'Medium' ? GOLD : OK }}>Effort {f.effort}</Text>
          </View>
        ))}
        <Text style={{ fontSize: 8, color: MUTED, marginTop: 8 }}>
          Step-by-step remediation and expected score gains are delivered as part of a Pixdyne SEO &amp; Content engagement.
        </Text>

        <Text style={styles.sectionTitle}>What our team reviews for you</Text>
        {LOCKED.map((l, i) => (
          <View key={i} style={styles.lockCard}>
            <Text style={{ fontSize: 10, color: INK, fontFamily: 'Helvetica-Bold' }}>{l.title} <Text style={{ color: MUTED, fontFamily: 'Helvetica' }}>· {l.group}</Text></Text>
            <Text style={{ fontSize: 8, color: MUTED, flex: 1, textAlign: 'right' }}>{l.note}</Text>
          </View>
        ))}

        <View style={styles.ctaBox}>
          <Text style={styles.ctaTitle}>The check is free. Fixing it is what we do.</Text>
          <Text style={styles.ctaText}>
            Pixdyne&apos;s SEO &amp; Content team implements every fix above, builds the content AI and Google cite, and
            tracks your scores over time. We maintain rankings; we don&apos;t promise them.
          </Text>
          <Text style={styles.ctaLink}>Talk to our SEO team → pixdyne.com/contact</Text>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Pixdyne · Melbourne · Est. 2018</Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
