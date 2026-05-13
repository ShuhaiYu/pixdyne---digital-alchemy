// Site-wide Open Graph image. Renders the landscape 1200x630 card used
// for Twitter `summary_large_image`, LinkedIn, Facebook, Slack, and any
// other consumer that prefers landscape over the legacy 1080x1080
// brand-kit square. Generated via Next.js ImageResponse at request time
// (edge runtime) and cached at the CDN edge.
//
// Brand recognition is carried by the warm-black background, the
// gold-on-cream typography, the gold rule, and the wordmark. No custom
// font fetch — Satori's defaults are used to keep generation deterministic
// and fast. Upgrade to bundled Playfair Display italic when an .otf or
// .ttf is checked into /public/fonts.

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Pixdyne — Melbourne technology partner since 2018';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 96px',
          background: '#0B0A08',
          color: '#E8E4DD',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top row — wordmark + Est. */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: '0.32em',
              color: '#C8962A',
            }}
          >
            PIXDYNE
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: '0.24em',
              color: '#8A847B',
              fontWeight: 600,
            }}
          >
            EST. 2018
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.08,
              color: '#E8E4DD',
              fontWeight: 500,
              maxWidth: 940,
              letterSpacing: '-0.01em',
            }}
          >
            Websites, custom systems, and AI products —
            <span style={{ color: '#C8962A' }}> built and operated</span>.
          </div>
        </div>

        {/* Bottom row — gold rule + locality */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div style={{ width: 120, height: 3, background: '#C8962A' }} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                fontSize: 22,
                letterSpacing: '0.18em',
                color: '#8A847B',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Melbourne · pixdyne.com
            </div>
            <div
              style={{
                fontSize: 18,
                letterSpacing: '0.18em',
                color: '#8A847B',
                fontWeight: 600,
              }}
            >
              ABN 96 690 116 584
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
