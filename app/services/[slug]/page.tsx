import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getServiceBySlug, getServiceSlugs } from '@/lib/data/services';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';
import { ServiceDetailClient } from './ServiceDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found'
    };
  }

  // TBD: per-service OG images at /og/services/${slug}.jpg are not yet
  // produced. Falling back to the site-wide og-image.png (1080x1080
  // branded social card) so cards render instead of 404'ing. Twitter
  // card stays `summary` (square) until landscape variants land —
  // upgrade to `summary_large_image` per-service when they do.
  return {
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.description,
    openGraph: {
      title: `${service.title} | Pixdyne`,
      description: service.description,
      url: `https://pixdyne.com/services/${slug}`,
      images: [{
        url: '/og-image.png',
        width: 1080,
        height: 1080,
        alt: `${service.title} — Pixdyne`
      }]
    },
    twitter: {
      card: 'summary',
      title: `${service.title} | Pixdyne`,
      description: service.description
    },
    alternates: {
      canonical: `https://pixdyne.com/services/${slug}`
    }
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://pixdyne.com' },
    { name: 'Services', url: 'https://pixdyne.com/#services' },
    { name: service.title, url: `https://pixdyne.com/services/${slug}` }
  ];

  return (
    <>
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateServiceSchema(service))
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
        }}
      />
      <ServiceDetailClient service={service} />
    </>
  );
}
