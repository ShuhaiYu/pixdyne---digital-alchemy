// Per-service Open Graph image. Same layout language as the site root
// OG (app/opengraph-image.tsx) but the headline swaps in the service
// title and the kicker becomes the service number ("SERVICE 01" etc).
// Generated at request time and cached at the edge — no static asset
// required per service. Build is unaffected.

import { ImageResponse } from 'next/og';
import { getServiceBySlug } from '@/lib/data/services';

// Static OG generation: Next.js reads page.tsx's generateStaticParams to
// pick the slug set, then prerenders one PNG per slug at build time. We
// do not declare generateStaticParams here — the file-based OG image
// convention inherits the route's static params from the colocated page.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Statically pre-generate alt text per service so Twitter / OG consumers
// get a meaningful image description rather than a generic site-wide
// fallback. Pixdyne is appended at the end so the brand always travels
// with the alt.
export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return [
      {
        id: 'fallback',
        alt: 'Pixdyne — Melbourne technology partner since 2018',
        size,
        contentType,
      },
    ];
  }
  return [
    {
      id: service.slug,
      alt: `${service.title} — Pixdyne, Melbourne`,
      size,
      contentType,
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const headline = service?.title ?? 'Pixdyne Services';
  const kicker = service
    ? service.tier === 'product'
      ? `PRODUCT · ${service.number}`
      : `SERVICE · ${service.number}`
    : 'SERVICES';

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
        {/* Top row — wordmark + kicker */}
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
              fontSize: 32,
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
            {kicker}
          </div>
        </div>

        {/* Headline — service title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            maxWidth: 1000,
          }}
        >
          <div
            style={{
              fontSize: 110,
              lineHeight: 1.02,
              color: '#E8E4DD',
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            {headline}
          </div>
          {service?.description && (
            <div
              style={{
                fontSize: 26,
                lineHeight: 1.35,
                color: '#8A847B',
                fontWeight: 400,
                marginTop: 12,
              }}
            >
              {service.description}
            </div>
          )}
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
              fontSize: 22,
              letterSpacing: '0.18em',
              color: '#8A847B',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Melbourne · pixdyne.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
