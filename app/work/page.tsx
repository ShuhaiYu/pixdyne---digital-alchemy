import { Metadata } from 'next';
import Script from 'next/script';
import { getAllCaseStudies } from '@/lib/data/case-studies';
import { generateCollectionPageSchema } from '@/lib/seo/schema';
import WorkPageClient from './WorkPageClient';

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Selected case studies from Pixdyne — websites, custom systems, and ongoing operations. Built and operated alongside our clients since 2018.',
  alternates: {
    canonical: 'https://pixdyne.com/work'
  },
  openGraph: {
    title: 'Our Work | Pixdyne',
    description:
      'Selected case studies from Pixdyne — websites, custom systems, and ongoing operations.',
    url: 'https://pixdyne.com/work',
    images: [{ url: '/og-image.png', width: 1080, height: 1080, alt: 'Pixdyne' }]
  },
  twitter: {
    card: 'summary',
    title: 'Our Work | Pixdyne',
    description: 'Selected case studies from Pixdyne — built and operated since 2018.'
  }
};

export default function WorkPage() {
  const caseStudies = getAllCaseStudies();

  const collectionSchema = generateCollectionPageSchema({
    url: 'https://pixdyne.com/work',
    name: 'Our Work — Pixdyne Case Studies',
    description:
      'Selected case studies from Pixdyne: websites, custom systems, and ongoing operations built and operated for Australian businesses since 2018.',
    items: caseStudies.map((work) => ({
      name: work.name,
      url: `https://pixdyne.com/work/${work.slug}`
    }))
  });

  return (
    <>
      <Script
        id="work-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <WorkPageClient caseStudies={caseStudies} />
    </>
  );
}
