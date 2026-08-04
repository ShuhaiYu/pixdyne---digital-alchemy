import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { BUSINESS, BUSINESS_FORMATTED } from '@/lib/data/business';
import { PIXDYNE_APPS } from '@/lib/data/apps';

export const metadata: Metadata = {
  title: 'App Policies & Support',
  description: `Privacy policies and support pages for the mobile apps published by ${BUSINESS.legalName}.`,
  alternates: {
    canonical: 'https://pixdyne.com/apps'
  },
  // This hub exists so store reviewers and we ourselves have one address that
  // lists every app's compliance pages. It is not a marketing surface and the
  // apps are unreleased, so keep it out of the index — `follow: true` still
  // lets crawlers reach the privacy/support pages, which must stay reachable.
  robots: {
    index: false,
    follow: true
  }
};

export default function AppsPage() {
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
        <p className="text-xs uppercase tracking-widest text-brand-muted mb-3">
          {BUSINESS.legalName}
        </p>
        <h1 className="text-4xl md:text-6xl font-serif italic mb-8">App Policies &amp; Support</h1>
        <p className="text-brand-black/85 mb-16 max-w-2xl">
          Privacy policies and support pages for the mobile apps we publish ourselves. Each app
          keeps its own policy — what one collects has no bearing on the others.
        </p>

        <ul className="space-y-px">
          {PIXDYNE_APPS.map((app) => (
            <li
              key={app.slug}
              className="border-t border-brand-black/15 py-10 last:border-b last:border-brand-black/15"
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                <h2 className="text-2xl md:text-3xl font-serif italic">{app.name}</h2>
                {app.altName && (
                  <span className="text-lg text-brand-black/60 font-serif">{app.altName}</span>
                )}
                <span className="text-xs uppercase tracking-widest text-brand-muted">
                  {app.platforms}
                </span>
              </div>

              <p className="text-brand-black/85 mb-6 max-w-2xl">{app.summary}</p>

              <div className="flex flex-wrap gap-x-8 gap-y-3">
                <Link
                  href={`/${app.slug}/privacy`}
                  className="group inline-flex items-center gap-1.5 text-sm uppercase tracking-wider text-brand-black hover:text-brand-yellow-deep transition-colors py-1"
                >
                  Privacy Policy
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </Link>
                {app.hasSupportPage && (
                  <Link
                    href={`/${app.slug}/support`}
                    className="group inline-flex items-center gap-1.5 text-sm uppercase tracking-wider text-brand-black hover:text-brand-yellow-deep transition-colors py-1"
                  >
                    Support
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-16 pt-8 border-t border-brand-black/10">
          <p className="text-sm text-brand-black/85 mb-2">
            Questions about any of these apps go to{' '}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="underline underline-offset-2 hover:text-brand-black"
            >
              {BUSINESS.email}
            </a>
            .
          </p>
          <p className="text-xs text-brand-muted">
            {BUSINESS_FORMATTED.mailLine} · {BUSINESS_FORMATTED.abnLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
