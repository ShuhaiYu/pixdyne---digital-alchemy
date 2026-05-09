import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of service for Pixdyne (ABN 96 690 116 584). Governing law: Victoria, Australia.',
  alternates: {
    canonical: 'https://pixdyne.com/legal/terms'
  }
};

const lastUpdatedISO = '2026-05-09';
const lastUpdatedHuman = 'May 2026';

export default function TermsPage() {
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
        <h1 className="text-4xl md:text-6xl font-serif italic mb-8">Terms of Service</h1>
        <p className="text-sm font-mono text-gray-500 mb-12">
          LAST UPDATED:{' '}
          <time dateTime={lastUpdatedISO}>{lastUpdatedHuman.toUpperCase()}</time>
        </p>

        <div className="prose prose-lg">
          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">1. About These Terms</h2>
          <p className="mb-8 text-gray-700">
            These Terms of Service apply to your use of pixdyne.com and any related
            services provided by <strong>Pixdyne</strong> (ABN 96 690 116 584), located
            at 294 Clayton Rd, Clayton VIC 3169, Australia. By accessing or using this
            website you agree to these terms. If you do not agree, please stop using the
            site.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">2. Services</h2>
          <p className="mb-8 text-gray-700">
            Pixdyne delivers Web Development, System Development (including ERP, CRM, and
            mobile apps), and Operations (managed IT, ongoing SEO and content, and
            continuous development). Specific scope, deliverables, timelines, payment
            terms, and intellectual property arrangements for any engagement are agreed
            in a separate written proposal or services agreement signed by both parties.
            These Terms govern your use of this website only; any client engagement is
            governed by the corresponding services agreement.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">3. Use of This Website</h2>
          <p className="mb-8 text-gray-700">
            You agree to use this website only for lawful purposes. You will not attempt
            to gain unauthorised access, interfere with site availability, scrape content
            for commercial reuse, or submit content that is unlawful, defamatory, or
            infringing.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">4. Intellectual Property</h2>
          <p className="mb-8 text-gray-700">
            The content of this website — including text, design, images, and the
            Pixdyne and OnlyPixAI marks — is owned by Pixdyne or our licensors. Third-
            party brand logos shown on this site (for example WordPress, Shopify,
            NetSuite, Salesforce) are the trademarks of their respective owners and
            appear here only to indicate the platforms we work on. Nothing on this site
            grants you any licence to use those marks.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">5. No Warranties for the Website</h2>
          <p className="mb-8 text-gray-700">
            The information on this website is provided on an &quot;as is&quot; basis for
            general information only. We do our best to keep it accurate and up to date,
            but we do not guarantee that it is complete, current, or fit for any
            particular purpose. Specific commitments to clients are made in our written
            services agreements, not on this website.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">6. Australian Consumer Law</h2>
          <p className="mb-8 text-gray-700">
            Nothing in these Terms excludes, restricts, or modifies any consumer
            guarantee, right, or remedy that you have under the Australian Consumer Law
            or other applicable Australian law where such exclusion, restriction, or
            modification would be unlawful. To the extent permitted by law, our liability
            for breach of any non-excludable consumer guarantee is limited (at our
            option) to re-supplying the relevant service or paying the cost of having it
            re-supplied.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">7. Limitation of Liability</h2>
          <p className="mb-8 text-gray-700">
            To the maximum extent permitted by law, and subject to Section 6, Pixdyne is
            not liable for indirect, incidental, special, consequential, or punitive
            damages, or for loss of profits, data, or business opportunities, arising
            from your use of this website. Our aggregate liability arising from your use
            of this website is limited to AUD $100.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">8. Third-Party Links</h2>
          <p className="mb-8 text-gray-700">
            This website links to third-party sites including, for example, OnlyPixAI
            (onlypixai.com). We are not responsible for the content, privacy practices,
            or availability of third-party sites. Visiting them is at your own risk.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">9. Privacy</h2>
          <p className="mb-8 text-gray-700">
            How we handle personal information collected through this site is described
            in our{' '}
            <Link href="/legal/privacy" className="underline hover:text-brand-yellow">
              Privacy Policy
            </Link>
            .
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">10. Governing Law and Jurisdiction</h2>
          <p className="mb-8 text-gray-700">
            These Terms are governed by the laws of the State of Victoria, Australia.
            Any dispute arising from your use of this website is subject to the
            non-exclusive jurisdiction of the courts of Victoria.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">11. Changes</h2>
          <p className="mb-8 text-gray-700">
            We may update these Terms from time to time. The current version is always
            available at this URL, with the date last updated shown at the top.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">12. Contact</h2>
          <p className="mb-8 text-gray-700">
            For any question about these Terms, please contact us at:
            <br />
            <br />
            <strong>Email:</strong> info@pixdyne.com
            <br />
            <strong>Mail:</strong> Pixdyne, 294 Clayton Rd, Clayton VIC 3169, Australia
            <br />
            <strong>ABN:</strong> 96 690 116 584
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-black/10">
          <Link
            href="/legal/privacy"
            className="text-sm font-mono text-brand-yellow hover:text-black transition-colors"
          >
            View Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
