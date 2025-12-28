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

  return {
    title: service.seoTitle || `${service.title} Services`,
    description: service.seoDescription || service.fullDescription,
    openGraph: {
      title: `${service.title} Services | Pixdyne`,
      description: service.description,
      url: `https://pixdyne.com/services/${slug}`,
      images: [{
        url: `/og/services/${slug}.jpg`,
        width: 1200,
        height: 630
      }]
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
