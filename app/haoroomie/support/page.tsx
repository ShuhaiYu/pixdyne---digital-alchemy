import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BUSINESS, BUSINESS_FORMATTED } from '@/lib/data/business';

export const metadata: Metadata = {
  title: 'Hao Roomie — Support',
  description:
    'Help for Hao Roomie / 好室友, the shared-household expense splitter: accounts and sign-in, household sharing, subscriptions, data export, and account deletion.',
  alternates: {
    canonical: 'https://pixdyne.com/haoroomie/support'
  },
  openGraph: {
    title: 'Hao Roomie — Support | Pixdyne',
    description:
      'Help for Hao Roomie / 好室友: sign-in, household sharing, subscriptions, data export, and account deletion.',
    url: 'https://pixdyne.com/haoroomie/support',
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
    title: 'Hao Roomie — Support | Pixdyne',
    description: 'Help for Hao Roomie / 好室友: sign-in, sharing, subscriptions, and your data.'
  }
};

// Every answer below must be traceable to a statement already published in
// /haoroomie/privacy. Do not add UI-specific walkthroughs ("tap Settings →
// …") to this page unless the flow has been confirmed against the shipped
// build — an inaccurate support page is worse than a short one.
interface FaqItem {
  readonly q: string;
  readonly a: readonly string[];
}

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    q: 'How do I sign in?',
    a: [
      'You can sign in with an email address, a phone number, or an Apple or Google account. Whichever you choose becomes the identifier your household membership is attached to, so use the same one on every device.'
    ]
  },
  {
    q: 'What can the other people in my household see?',
    a: [
      'Members of a household you create or join can see the expenses and settlements recorded in it — amount, category, note, date, and who is included.',
      'They cannot see your account contact details. Your email address or phone number is never shown to other members.'
    ]
  },
  {
    q: 'I deleted an expense but it still affects the balance.',
    a: [
      'Deleted ledger records are soft-deleted — retained but hidden — rather than erased immediately. That is deliberate: it keeps a shared ledger reconcilable when two people edit the same period. If a balance still looks wrong after a delete, send us the household name and the date range and we will look at it.'
    ]
  },
  {
    q: 'How do I get my data out?',
    a: [
      'You can access and export your ledger from within the app. If you need an export in a format the app does not offer, email us and we will help.'
    ]
  },
  {
    q: 'I paid for Pro but the features are locked.',
    a: [
      'The subscription follows the store account you paid with — your Apple ID on iOS, your Google account on Android. Make sure you are signed in to the same one, then use the restore-purchases option in the app.',
      'We never receive or store your payment card details; the transaction is handled entirely by Apple or Google.'
    ]
  },
  {
    q: 'What is in Pro and what is free?',
    a: [
      'Receipt scanning — photographing a receipt and having the merchant, amount, date and category filled in automatically — is a Pro feature and is not in the free version. Everything else, including shared households and settlements, works without a subscription.'
    ]
  },
  {
    q: 'How do I delete my account and my data?',
    a: [
      `Email ${BUSINESS.email} from the address on your account and ask for deletion. We will action it within 30 days.`
    ]
  }
];

export default function HaoRoomieSupportPage() {
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
        <h1 className="text-4xl md:text-6xl font-serif italic mb-8">Support</h1>
        <p className="text-brand-black/85 mb-4">
          Hao Roomie splits shared household costs — a ledger you and your roommates keep together.
          The questions below cover most of what people write in about.
        </p>
        <p className="text-sm text-brand-black/85 mb-12">
          Privacy questions are answered on the{' '}
          <Link
            href="/haoroomie/privacy"
            className="underline underline-offset-2 hover:text-brand-black"
          >
            Hao Roomie privacy policy
          </Link>
          .
        </p>

        <div className="mb-12">
          {FAQ_ITEMS.map((item) => (
            <div key={item.q} className="mb-8 pb-8 border-b border-brand-black/10 last:border-b-0">
              <h2 className="font-bold text-base mb-3 text-brand-black">{item.q}</h2>
              {item.a.map((paragraph) => (
                <p key={paragraph} className="mb-3 text-brand-black/85">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="font-bold uppercase tracking-widest text-sm mb-6 pb-3 border-b border-brand-black/15">
            Anything else
          </h2>
          <p className="mb-4 text-brand-black/85">
            Email{' '}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="underline underline-offset-2 hover:text-brand-black"
            >
              {BUSINESS.email}
            </a>{' '}
            with your device model, your OS version, and what you were doing when it went wrong. You
            can also use the{' '}
            <Link href="/contact" className="underline underline-offset-2 hover:text-brand-black">
              contact form
            </Link>
            . We read every message.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-brand-black/10">
          <p className="text-xs text-brand-muted">
            {BUSINESS_FORMATTED.mailLine} · {BUSINESS_FORMATTED.abnLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
