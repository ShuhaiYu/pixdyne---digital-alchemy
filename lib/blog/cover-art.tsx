// Shared brand artwork for generated blog imagery, rendered by Next.js
// ImageResponse (Satori). Two layouts share the same warm-black / gold-on-cream
// language as the site OG (app/opengraph-image.tsx) so blog covers read as part
// of the same family:
//
//   - renderCover  → 1200×630 hero / Open Graph card (category kicker + title)
//   - renderQuote  → 1200×630 in-article pull-quote card (a short, quotable line)
//
// Consumed by app/blog/[slug]/opengraph-image.tsx (cover) and
// app/api/blog-image/route.tsx (cover + quote). No custom font fetch — Satori's
// system-ui keeps generation deterministic and fast, matching the existing OG
// generators. Satori rule: any element with more than one child must set
// `display: flex` explicitly, which is why single-child wrappers below do too.
import type { ReactElement } from 'react';

export const COVER_SIZE = { width: 1200, height: 630 } as const;

const BG = '#0B0A08'; // brand black
const GOLD = '#C8962A'; // brand yellow / dark gold
const CREAM = '#E8E4DD'; // brand text
const MUTED = '#8A847B'; // brand muted

const frame = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'space-between' as const,
  padding: '80px 96px',
  background: BG,
  color: CREAM,
  fontFamily: 'system-ui, sans-serif',
};

function topRow(kicker: string): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '0.32em', color: GOLD }}>
        PIXDYNE
      </div>
      <div style={{ fontSize: 18, letterSpacing: '0.24em', color: MUTED, fontWeight: 600 }}>
        {kicker}
      </div>
    </div>
  );
}

function bottomRow(): ReactElement {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: 120, height: 3, background: GOLD }} />
      <div
        style={{
          fontSize: 22,
          letterSpacing: '0.18em',
          color: MUTED,
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        Melbourne · pixdyne.com
      </div>
    </div>
  );
}

/** 1200×630 hero / OG cover: category kicker + the post title. */
export function renderCover({ title, category }: { title: string; category: string }): ReactElement {
  // Longer titles need a smaller size to stay on a few lines.
  const fontSize = title.length > 52 ? 60 : title.length > 34 ? 72 : 86;
  return (
    <div style={frame}>
      {topRow(category.toUpperCase())}
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
        <div
          style={{
            display: 'flex',
            fontSize,
            lineHeight: 1.08,
            color: CREAM,
            fontWeight: 600,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </div>
      </div>
      {bottomRow()}
    </div>
  );
}

/** 1200×630 in-article pull-quote card: a single short, quotable line. */
export function renderQuote({ quote, category }: { quote: string; category: string }): ReactElement {
  const fontSize = quote.length > 90 ? 50 : quote.length > 60 ? 60 : 70;
  return (
    <div style={frame}>
      {topRow(category.toUpperCase())}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 1000 }}>
        <div style={{ display: 'flex', fontSize: 120, lineHeight: 0.8, color: GOLD, fontWeight: 700 }}>
          “
        </div>
        <div
          style={{
            display: 'flex',
            fontSize,
            lineHeight: 1.18,
            color: CREAM,
            fontWeight: 500,
            letterSpacing: '-0.01em',
          }}
        >
          {quote}
        </div>
      </div>
      {bottomRow()}
    </div>
  );
}
