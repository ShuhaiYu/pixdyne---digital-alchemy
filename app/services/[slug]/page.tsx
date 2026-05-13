import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getServiceBySlug, getServiceSlugs } from '@/lib/data/services';
import {
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema
} from '@/lib/seo/schema';
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

  // 1200x630 landscape og:image is emitted via the file-based
  // convention at app/services/[slug]/opengraph-image.tsx (dynamically
  // rendered per service). No inline images entry — Next.js auto-injects
  // both og:image and twitter:image meta from the file-based generator.
  return {
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.description,
    openGraph: {
      title: `${service.title} | Pixdyne`,
      description: service.description,
      url: `https://pixdyne.com/services/${slug}`
    },
    twitter: {
      card: 'summary_large_image',
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

  // FAQPage schema is emitted only when the service has real FAQ
  // content. generateFAQSchema returns null when the array is empty,
  // so we never ship an empty FAQPage stub (which would be a
  // truth-auditor block per CLAUDE.md §14.3).
  const faqSchema = service.faqs ? generateFAQSchema(service.faqs) : null;

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
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
      )}
      <ServiceDetailClient service={service} />
    </>
  );
}
