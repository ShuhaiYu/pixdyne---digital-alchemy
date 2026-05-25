import { Metadata } from 'next';
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
    url: 'https://pixdyne.com/about',
    // Root file-based opengraph-image does not propagate to nested routes;
    // reference the 1200×630 brand OG route so summary_large_image is valid.
    images: [{
      url: 'https://pixdyne.com/opengraph-image',
      width: 1200,
      height: 630,
      alt: 'Pixdyne — Melbourne technology partner since 2018'
    }]
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
      <script
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
