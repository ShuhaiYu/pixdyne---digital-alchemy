import type { Metadata } from 'next';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import SeoAuditClient from './SeoAuditClient';

export const metadata: Metadata = {
  title: 'Free SEO & GEO Audit',
  description:
    'See whether AI and Google can find, read and cite your site — a free, deterministic SEO and GEO readiness check in about 30 seconds.',
  alternates: { canonical: 'https://pixdyne.com/free-seo-audit' },
  openGraph: {
    title: 'Free SEO & GEO Audit | Pixdyne',
    description:
      'See whether AI and Google can find, read and cite your site — free, in about 30 seconds.',
    url: 'https://pixdyne.com/free-seo-audit',
    // Nested routes do not inherit the root file-based opengraph-image, so
    // reference the 1200x630 /opengraph-image route explicitly (§14.2).
    images: [
      {
        url: 'https://pixdyne.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Pixdyne — Melbourne technology partner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SEO & GEO Audit | Pixdyne',
    description:
      'See whether AI and Google can find, read and cite your site — free, in about 30 seconds.',
  },
};

const breadcrumbs = [
  { name: 'Home', url: 'https://pixdyne.com' },
  { name: 'Free SEO & GEO Audit', url: 'https://pixdyne.com/free-seo-audit' },
];

export default function FreeSeoAuditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />
      <SeoAuditClient />
    </>
  );
}
