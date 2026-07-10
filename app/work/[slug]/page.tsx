import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, getCaseStudySlugs } from '@/lib/data/case-studies';
import { generateCaseStudySchema, generateBreadcrumbSchema } from '@/lib/seo/schema';
import { WorkDetailClient } from './WorkDetailClient';
import { IntegratedPlatformDetailClient } from './IntegratedPlatformDetailClient';

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

  // og:image: use the case-study hero when one exists. The root file-based
  // opengraph-image does NOT propagate to nested routes (CLAUDE.md §13,
  // 2026-05-25), so pages without a hero must reference the 1200×630 brand
  // OG route explicitly — otherwise they ship no og:image at all while
  // declaring a summary_large_image Twitter card.
  const ogImages = work.img
    ? [{ url: work.img, width: 1200, height: 630 }]
    : [{
        url: 'https://pixdyne.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Pixdyne — Melbourne technology partner since 2018'
      }];

  return {
    title: work.seoTitle || `${work.name} - Case Study`,
    description: work.seoDescription || work.challenge,
    openGraph: {
      title: `${work.name} | Pixdyne Case Study`,
      description: work.challenge,
      url: `https://pixdyne.com/work/${slug}`,
      images: ogImages
    },
    twitter: {
      card: 'summary_large_image',
      title: `${work.name} | Pixdyne`,
      description: work.shortDescription || work.challenge
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
    { name: 'Work', url: 'https://pixdyne.com/work' },
    { name: work.name, url: `https://pixdyne.com/work/${slug}` }
  ];

  return (
    <>
      <script
        id="casestudy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateCaseStudySchema(work))
        }}
      />
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
        }}
      />
      {work.category === 'Integrated Platform' ? (
        <IntegratedPlatformDetailClient work={work} />
      ) : (
        <WorkDetailClient work={work} />
      )}
    </>
  );
}
