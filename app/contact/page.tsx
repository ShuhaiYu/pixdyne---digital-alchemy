import { Metadata } from 'next';
import Script from 'next/script';
import { ContactSection } from '@/components/sections/ContactSection';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';

// Metadata description deliberately omits email/phone literals — those
// live in @/lib/data/business (§14.1 single source of truth). The
// on-page ContactSection still renders them for users.
export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to Pixdyne in Melbourne. Send a brief and we will come back with a scope, timeline, and quote.',
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
      {/* Top padding clears the fixed navigation; bottom rhythm is
          owned by ContactSection (pb-24 md:pb-32). Single source of
          vertical breathing on this route. */}
      <div className="pt-32 md:pt-40 bg-brand-black text-brand-text min-h-screen">
        <ContactSection />
      </div>
    </>
  );
}
