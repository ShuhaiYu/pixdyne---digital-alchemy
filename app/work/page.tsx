import { Metadata } from 'next';
import { getAllCaseStudies } from '@/lib/data/case-studies';
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

  return <WorkPageClient caseStudies={caseStudies} />;
}
