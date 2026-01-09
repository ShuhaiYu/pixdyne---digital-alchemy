import { Metadata } from 'next';
import { getAllCaseStudies } from '@/lib/data/case-studies';
import WorkPageClient from './WorkPageClient';

export const metadata: Metadata = {
  title: 'Our Work | Pixdyne Digital Alchemy',
  description: 'Explore our portfolio of digital projects including web development, app design, SEO campaigns, and brand identity work.',
};

export default function WorkPage() {
  const caseStudies = getAllCaseStudies();

  return <WorkPageClient caseStudies={caseStudies} />;
}
