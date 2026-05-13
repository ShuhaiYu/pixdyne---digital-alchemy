import { Metadata } from 'next';
import Script from 'next/script';
import { ContactSection } from '@/components/sections/ContactSection';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to Pixdyne in Melbourne. Send a brief and we will come back with a scope, timeline, and quote. Email info@pixdyne.com or call +61 410 510 751.',
  alternates: {
    canonical: 'https://pixdyne.com/contact'
  },
  openGraph: {
    title: 'Contact | Pixdyne',
    description:
      'Talk to Pixdyne in Melbourne. Tell us about the workflow, system, or website you want built — we will come back with a scope, timeline, and quote.',
    url: 'https://pixdyne.com/contact'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Pixdyne',
    description:
      'Talk to Pixdyne in Melbourne. Scope, timeline, and quote within a few business days.'
  }
};

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://pixdyne.com' },
    { name: 'Contact', url: 'https://pixdyne.com/contact' }
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
      {/* Top padding clears the fixed navigation. ContactSection itself
          owns vertical rhythm via py-16/20/24/32, but as a standalone
          route it needs extra clearance so the "Let's Talk." heading
          doesn't tuck under the nav on first paint. */}
      <div className="pt-20 md:pt-24 bg-brand-black text-white min-h-screen">
        <ContactSection />
      </div>
    </>
  );
}
