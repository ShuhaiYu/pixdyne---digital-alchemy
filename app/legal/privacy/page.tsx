import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BUSINESS, BUSINESS_FORMATTED } from '@/lib/data/business';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${BUSINESS.name} (${BUSINESS_FORMATTED.abnLabel}) collects, uses, and protects personal information under the Australian Privacy Act 1988.`,
  alternates: {
    canonical: 'https://pixdyne.com/legal/privacy'
  }
};

const lastUpdatedISO = '2026-05-09';
const lastUpdatedHuman = 'May 2026';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-black p-8 md:p-24">
      <Link
        href="/"
        className="group flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-black mb-12 transition-colors"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        RETURN
      </Link>

      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-serif italic mb-8">Privacy Policy</h1>
        <p className="text-sm font-mono text-gray-500 mb-12">
          LAST UPDATED:{' '}
          <time dateTime={lastUpdatedISO}>{lastUpdatedHuman.toUpperCase()}</time>
        </p>

        <div className="prose prose-lg">
          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">1. Who We Are</h2>
          <p className="mb-8 text-gray-700">
            This site is operated by <strong>{BUSINESS.name}</strong> ({BUSINESS_FORMATTED.abnLabel}), a
            Melbourne-based technology services business located at {BUSINESS_FORMATTED.addressLine}.
            This Privacy Policy explains what personal information we collect, why we collect it, and
            how we handle it. {BUSINESS.name} complies with the Australian Privacy Act 1988 (Cth) and
            the Australian Privacy Principles (APPs).
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">2. Information We Collect</h2>
          <p className="mb-4 text-gray-700">
            We only collect personal information that is reasonably necessary to provide our
            services and respond to enquiries. Specifically:
          </p>
          <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
            <li>
              <strong>Contact form submissions:</strong> name, email address, and the
              content of your message.
            </li>
            <li>
              <strong>Email correspondence:</strong> any information you choose to share
              when emailing us at {BUSINESS.email}.
            </li>
            <li>
              <strong>Anonymous analytics:</strong> aggregated visit data such as page
              views, referring source, approximate location at country level, and device
              type. This data does not identify individuals.
            </li>
          </ul>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">3. How We Use Your Information</h2>
          <p className="mb-8 text-gray-700">
            We use the information you provide to respond to your enquiries, scope and
            deliver work you have engaged us for, and improve our website. We do not sell
            or rent personal information to third parties, and we do not use your data for
            any purpose unrelated to the work you have asked us to do.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">4. Cookies and Analytics</h2>
          <p className="mb-8 text-gray-700">
            Our website uses essential cookies for site functionality. We may use a
            privacy-respecting analytics service to understand traffic patterns at an
            aggregate level. You can disable cookies in your browser settings; doing so
            will not prevent the site from functioning.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">5. Service Providers</h2>
          <p className="mb-8 text-gray-700">
            We rely on a small number of trusted service providers to host this website,
            deliver email, and host analytics infrastructure. These providers process data
            on our behalf under their own security and privacy obligations and are not
            permitted to use your information for any other purpose.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">6. Data Security</h2>
          <p className="mb-8 text-gray-700">
            We use HTTPS for all transmissions and apply reasonable technical and
            organisational measures to protect personal information. No method of
            transmission over the internet is 100% secure, however, and we cannot guarantee
            absolute security.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">7. Your Rights</h2>
          <p className="mb-8 text-gray-700">
            Under the Australian Privacy Principles you have the right to access the
            personal information we hold about you, request correction of inaccurate
            information, and request deletion subject to our legal record-keeping
            obligations. To exercise these rights, email {BUSINESS.email}. We will
            acknowledge your request promptly and respond within a reasonable period
            (generally within 30 days).
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">8. Complaints</h2>
          <p className="mb-8 text-gray-700">
            If you believe we have mishandled your personal information, please contact
            {BUSINESS.email} so we can investigate. If you are not satisfied with our
            response, you may lodge a complaint with the Office of the Australian
            Information Commissioner (OAIC) at oaic.gov.au.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">9. Changes to This Policy</h2>
          <p className="mb-8 text-gray-700">
            We may update this Privacy Policy from time to time. The current version is
            always available at this URL, with the date last updated shown at the top.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">10. Contact</h2>
          <p className="mb-8 text-gray-700">
            For any privacy-related question, please contact us at:
            <br />
            <br />
            <strong>Email:</strong> {BUSINESS.email}
            <br />
            <strong>Mail:</strong> {BUSINESS_FORMATTED.mailLine}
            <br />
            <strong>ABN:</strong> {BUSINESS.abn}
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-black/10">
          <Link
            href="/legal/terms"
            className="text-sm font-mono text-brand-yellow hover:text-black transition-colors"
          >
            View Terms of Service →
          </Link>
        </div>
      </div>
    </div>
  );
}
