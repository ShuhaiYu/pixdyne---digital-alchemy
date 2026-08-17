import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BUSINESS, BUSINESS_FORMATTED } from '@/lib/data/business';

export const metadata: Metadata = {
  title: 'Hao Roomie — Privacy Policy',
  description: `How ${BUSINESS.name} (${BUSINESS_FORMATTED.abnLabel}) collects, uses, and protects personal information in the Hao Roomie / 好室友 expense-splitting app.`,
  alternates: {
    canonical: 'https://pixdyne.com/haoroomie/privacy'
  },
  openGraph: {
    title: 'Hao Roomie — Privacy Policy | Pixdyne',
    description: `How ${BUSINESS.name} handles personal information in the Hao Roomie / 好室友 expense-splitting app.`,
    url: 'https://pixdyne.com/haoroomie/privacy',
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
    title: 'Hao Roomie — Privacy Policy | Pixdyne',
    description: `How ${BUSINESS.name} handles personal information in the Hao Roomie app.`
  }
};

const lastUpdatedISO = '2026-08-17';
const lastUpdatedHuman = 'August 2026';

export default function HaoRoomiePrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-white text-brand-black p-8 md:p-24">
      <Link
        href="/"
        className="group flex items-center gap-2 text-sm text-brand-muted hover:text-brand-black mb-12 transition-colors"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        RETURN
      </Link>

      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-brand-muted mb-3">好室友 · Hao Roomie</p>
        <h1 className="text-4xl md:text-6xl font-serif italic mb-8">Privacy Policy</h1>
        <p className="text-xs uppercase tracking-wider text-brand-muted mb-2">
          Effective date:{' '}
          <time dateTime={lastUpdatedISO}>{lastUpdatedHuman.toUpperCase()}</time>
        </p>
        <p className="text-sm text-brand-black/85 mb-6">
          Provider: <strong>{BUSINESS.name}</strong> ({BUSINESS_FORMATTED.abnLabel}, Australia) ·
          Contact: {BUSINESS.email}
        </p>
        <p className="text-sm text-brand-black/85 mb-12">
          Need help using the app? See the{' '}
          <Link
            href="/haoroomie/support"
            className="underline underline-offset-2 hover:text-brand-black"
          >
            Hao Roomie support page
          </Link>
          .
        </p>

        <div className="prose prose-lg">
          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">1. What we collect</h2>
          <ul className="list-disc pl-6 mb-8 text-brand-black/85 space-y-2">
            <li>
              <strong>Account:</strong> the identifier you sign in with — email or phone number, or an
              Apple / Google account identifier — plus a display name and avatar colour you choose.
            </li>
            <li>
              <strong>Ledger data:</strong> expenses you record (amount, category, note, date, who is
              included), comments you post on an expense, household and member names, invites, and
              settlements.
            </li>
            <li>
              <strong>Receipt images</strong> <em>(optional — Pro):</em>{' '}
              when you use receipt scanning, the photo you capture or select.
            </li>
            <li>
              <strong>Subscription status</strong> <em>(Pro):</em> whether you have an active
              &ldquo;Pixdyne Pro&rdquo; subscription (we do not receive or store your payment card details).
            </li>
            <li>
              <strong>Push notification token</strong> <em>(optional):</em> if you turn notifications on, a
              device push token used solely to deliver the alerts you enabled. You can turn this off in your
              device or in-app settings.
            </li>
            <li>
              <strong>Diagnostics (crash &amp; error reports):</strong> when the app crashes or hits an
              error, technical details — device model, operating-system and app version, and a stack trace —
              together with your account identifier. These reports never include your email, name, or ledger
              contents.
            </li>
          </ul>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">2. How we use it</h2>
          <ul className="list-disc pl-6 mb-8 text-brand-black/85 space-y-2">
            <li>
              To provide the app: store your ledger, sync it across your devices and to the roommates you
              invite to a household, and compute balances and settlements.
            </li>
            <li>
              <strong>Receipt scanning</strong> <em>(Pro):</em> the receipt
              image is sent to our AI processor to extract fields (merchant, amount, date, category). We do
              not use your data to train AI models.
            </li>
            <li>
              <strong>Push notifications</strong> <em>(optional):</em> to send the alerts you opt into — a
              roommate adds an expense, a settle-up is due, a transfer is marked paid, someone comments on an
              expense, or someone joins your household.
            </li>
            <li>
              <strong>Diagnostics:</strong> to detect, diagnose, and fix crashes and errors and improve
              stability.
            </li>
            <li>To manage your subscription and provide customer support.</li>
          </ul>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">3. Who processes your data (sub-processors)</h2>
          <ul className="list-disc pl-6 mb-8 text-brand-black/85 space-y-2">
            <li><strong>Supabase</strong> — database, authentication, file storage, hosted in Singapore (ap-southeast-1).</li>
            <li><strong>Google (Gemini API)</strong> <em>(Pro)</em> — receipt OCR processing of images you submit.</li>
            <li><strong>RevenueCat</strong> <em>(Pro)</em> — subscription management.</li>
            <li><strong>Sentry</strong> — crash and error diagnostics.</li>
            <li><strong>Expo</strong> — push-notification delivery (routed through Apple / Google push services).</li>
            <li><strong>Apple / Google</strong> — sign-in (if you choose those methods), in-app purchases, and push-notification delivery.</li>
          </ul>
          <p className="mb-8 text-brand-black/85">
            We do <strong>not</strong> sell your personal data or share it for advertising.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">4. Sharing within the app</h2>
          <p className="mb-8 text-brand-black/85">
            Expenses, comments, and settlement data are visible to the other members of a household you join
            or create — a household is closed: only people you invite can see or post anything in it. Your
            personal account contact (email / phone) is not shown to other members.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">5. Retention &amp; deletion</h2>
          <p className="mb-8 text-brand-black/85">
            We keep your data while your account is active. For financial integrity, deleted ledger records
            are soft-deleted (retained but hidden) rather than erased immediately. To delete your account and
            associated data, contact us at {BUSINESS.email}; we will action it within 30 days.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">6. Your rights</h2>
          <p className="mb-8 text-brand-black/85">
            You can access and export your ledger from within the app. Depending on your region (e.g. GDPR /
            PIPL / CCPA / the Australian Privacy Act) you may have rights to access, correct, or delete your
            data — contact us to exercise them.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">7. Children</h2>
          <p className="mb-8 text-brand-black/85">
            The app is not directed at children under 16. We do not knowingly collect their data.
          </p>

          <h2 className="font-bold uppercase tracking-widest text-sm mb-4">8. Changes</h2>
          <p className="mb-8 text-brand-black/85">
            We may update this policy; material changes will be noted in-app or on this page with a new
            effective date.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-black/10">
          <p className="text-xs text-brand-muted">
            {BUSINESS_FORMATTED.mailLine} · {BUSINESS_FORMATTED.abnLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
