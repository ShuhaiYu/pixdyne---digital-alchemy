import { Metadata } from 'next';
import Script from 'next/script';
import { AboutSection } from '@/components/sections/AboutSection';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Pixdyne is a Melbourne-based long-term technology partner. Since 2018 we have built and operated websites, custom systems, and AI products alongside the businesses we partner with.',
  alternates: {
    canonical: 'https://pixdyne.com/about'
  },
  openGraph: {
    title: 'About | Pixdyne',
    description:
      'Melbourne-based long-term technology partner. Since 2018 we have built and operated websites, custom systems, and AI products for the businesses we partner with.',
    url: 'https://pixdyne.com/about'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Pixdyne',
    description: 'Melbourne-based long-term technology partner since 2018.'
  }
};

export default function AboutPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://pixdyne.com' },
    { name: 'About', url: 'https://pixdyne.com/about' }
  ];

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
        }}
      />
      <div className="pt-32 md:pt-40 bg-brand-black text-brand-text min-h-screen">
        <AboutSection />
      </div>
    </>
  );
}
