import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getCaseStudyBySlug, getCaseStudySlugs } from '@/lib/data/case-studies';
import { generateCaseStudySchema, generateBreadcrumbSchema } from '@/lib/seo/schema';
import { WorkDetailClient } from './WorkDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = getCaseStudyBySlug(slug);

  if (!work) {
    return {
      title: 'Work Not Found'
    };
  }

  return {
    title: work.seoTitle || `${work.name} - Case Study`,
    description: work.seoDescription || work.challenge,
    openGraph: {
      title: `${work.name} | Pixdyne Case Study`,
      description: work.challenge,
      url: `https://pixdyne.com/work/${slug}`,
      images: [{
        url: work.img,
        width: 1200,
        height: 630
      }]
    },
    alternates: {
      canonical: `https://pixdyne.com/work/${slug}`
    }
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const work = getCaseStudyBySlug(slug);

  if (!work) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://pixdyne.com' },
    { name: 'Work', url: 'https://pixdyne.com/#work' },
    { name: work.name, url: `https://pixdyne.com/work/${slug}` }
  ];

  return (
    <>
      <Script
        id="casestudy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateCaseStudySchema(work))
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
        }}
      />
      <WorkDetailClient work={work} />
    </>
  );
}
