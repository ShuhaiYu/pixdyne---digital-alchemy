import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BUSINESS, BUSINESS_FORMATTED } from '@/lib/data/business';

export const metadata: Metadata = {
  title: 'PixComic — Privacy Policy',
  description: `How ${BUSINESS.name} (${BUSINESS_FORMATTED.abnLabel}) handles data in the PixComic comic reader for iPhone and iPad. Files stay on your device; only advertising data reaches Google.`,
  alternates: {
    canonical: 'https://pixdyne.com/pixcomic/privacy'
  },
  openGraph: {
    title: 'PixComic — Privacy Policy | Pixdyne',
    description: `How ${BUSINESS.name} handles data in the PixComic comic reader for iPhone and iPad.`,
    url: 'https://pixdyne.com/pixcomic/privacy',
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
    title: 'PixComic — Privacy Policy | Pixdyne',
    description: `How ${BUSINESS.name} handles data in the PixComic comic reader.`
  }
};

// Must stay in lockstep with PrivacyInfo.xcprivacy in the PixComic Xcode
// project and with the App Store privacy nutrition labels. Apple cross-checks
// all three; changing one without the others is an App Review rejection.
const lastUpdatedISO = '2026-08-03';
const lastUpdatedHuman = 'August 2026';

// Google AdMob SDK collection disclosure. Mirrors the App Store privacy
// labels — do not add a row here without adding it there too.
const AD_DATA_ROWS = [
  {
    data: 'Device identifiers (including the advertising identifier)',
    why: 'Serve and measure ads',
    tracking: 'Yes, if you allow it'
  },
  {
    data: 'Advertising data (which ads were shown, tapped)',
    why: 'Serve and measure ads',
    tracking: 'Yes, if you allow it'
  },
  {
    data: 'Product interaction (app opens, session length)',
    why: 'Ad delivery and analytics',
    tracking: 'No'
  },
  {
    data: 'Coarse location (derived from IP address, city-level)',
    why: 'Regionally relevant ads',
    tracking: 'Yes, if you allow it'
  }
] as const;

const headingClass = 'font-bold uppercase tracking-widest text-sm mb-4';
const paraClass = 'mb-8 text-brand-black/85';
const listClass = 'list-disc pl-6 mb-8 text-brand-black/85 space-y-2';
// External legal references must be clickable for App Review, but this site
// lives on organic search — nofollow keeps link equity from leaking out.
const linkClass = 'underline underline-offset-2 hover:text-brand-black';

function AdDataTable() {
  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="border-b border-brand-black/20">
            {['Data', 'Why', 'Used to track you?'].map((header) => (
              <th key={header} className="py-3 pr-4 font-bold uppercase tracking-wider text-xs">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {AD_DATA_ROWS.map((row) => (
            <tr key={row.data} className="border-b border-brand-black/10 align-top">
              <td className="py-3 pr-4 text-brand-black/85">{row.data}</td>
              <td className="py-3 pr-4 text-brand-black/85">{row.why}</td>
              <td className="py-3 text-brand-black/85">{row.tracking}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PixComicPrivacyPage() {
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
        <p className="text-xs uppercase tracking-widest text-brand-muted mb-3">PixComic · Comic Reader</p>
        <h1 className="text-4xl md:text-6xl font-serif italic mb-8">Privacy Policy</h1>
        <p className="text-xs uppercase tracking-wider text-brand-muted mb-2">
          Last updated:{' '}
          <time dateTime={lastUpdatedISO}>{lastUpdatedHuman.toUpperCase()}</time>
        </p>
        <p className="text-sm text-brand-black/85 mb-6">
          Developer: <strong>{BUSINESS.legalName}</strong> ({BUSINESS_FORMATTED.abnLabel},
          Melbourne, Australia) · Contact: {BUSINESS.email}
        </p>
        <p className="text-sm text-brand-black/85 mb-12">
          Need help using the app? See the{' '}
          <Link href="/pixcomic/support" className={linkClass}>
            PixComic support page
          </Link>
          .
        </p>

        <div className="prose prose-lg">
          <h2 className={headingClass}>The short version</h2>
          <p className={paraClass}>
            PixComic reads comic files that are already on your device. It has no accounts, no cloud,
            and no servers of ours. <strong>We never receive your files, your reading history, or
            anything else about how you use the app.</strong> The only company that receives any data
            is Google, and only to show advertisements in the free version.
          </p>

          <h2 className={headingClass}>What stays on your device, always</h2>
          <p className={paraClass}>
            Everything you put into PixComic stays on your iPhone or iPad:
          </p>
          <ul className={listClass}>
            <li>The comic archives you import</li>
            <li>Reading progress, bookmarks, titles, tags and covers</li>
            <li>All settings, including the theme and reading direction</li>
          </ul>
          <p className={paraClass}>
            None of this is transmitted anywhere. It lives in the app&rsquo;s own storage and is
            removed when you delete the app. If you have iCloud Backup enabled, your comics may be
            included in your own Apple backup — that is between you and Apple, and we have no access
            to it.
          </p>

          <h2 className={headingClass}>The Wi-Fi transfer feature</h2>
          <p className={paraClass}>
            When you turn on &ldquo;Transfer&rdquo; in the app, PixComic starts a small web server{' '}
            <strong>on your device</strong>, reachable only by computers on the same local network.
            Your files travel directly from your computer to your device.
          </p>
          <ul className={listClass}>
            <li>Nothing passes through any server operated by us or by anyone else.</li>
            <li>The server is not reachable from the internet.</li>
            <li>It stops when you turn it off or when the app is suspended by iOS.</li>
            <li>You can require a 4-digit PIN before any transfer is accepted.</li>
          </ul>

          <h2 className={headingClass}>Advertising (free version only)</h2>
          <p className={paraClass}>
            The free version shows advertisements supplied by <strong>Google AdMob</strong>. To do
            that, the Google Mobile Ads SDK may collect:
          </p>
          <AdDataTable />
          <p className={paraClass}>
            This data is collected by Google, not by us. We never see it in a form that identifies
            you. Google&rsquo;s handling of it is governed by the{' '}
            <a
              href="https://policies.google.com/privacy"
              className={linkClass}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              Google Privacy Policy
            </a>{' '}
            and the{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              className={linkClass}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              Google Advertising Policies
            </a>
            .
          </p>
          <p className="mb-4 text-brand-black/85"><strong>Your control over this:</strong></p>
          <ul className={listClass}>
            <li>
              iOS will ask whether PixComic may track you across apps and websites.{' '}
              <strong>Declining changes nothing about how the app works</strong> — you still get
              every feature, and you still see ads, they are just less targeted.
            </li>
            <li>
              If you are in the EEA, the UK or Switzerland, you will see a consent form before any
              ads load. You can reopen it any time from{' '}
              <strong>Settings → About → Ad privacy options</strong>.
            </li>
            <li>
              <strong>Tipping once removes ads permanently.</strong> After that the advertising SDK
              is never started at all: no consent prompt, no data collection, no network requests.
            </li>
          </ul>

          <h2 className={headingClass}>Purchases</h2>
          <p className={paraClass}>
            The one-off &ldquo;supporter&rdquo; purchase that removes ads is processed entirely by
            Apple through the App Store. <strong>We never receive your name, payment details or
            Apple ID.</strong> Apple tells the app only whether the purchase exists, so the app knows
            to hide the ads. See{' '}
            <a
              href="https://www.apple.com/legal/privacy/"
              className={linkClass}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              Apple&rsquo;s Privacy Policy
            </a>{' '}
            for how Apple handles that transaction.
          </p>

          <h2 className={headingClass}>Children</h2>
          <p className={paraClass}>
            PixComic is not directed at children. Because you can import any file you like, the app
            is rated 17+. We do not knowingly collect information from children.
          </p>

          <h2 className={headingClass}>Your rights</h2>
          <p className={paraClass}>
            Since we hold no personal data about you, there is nothing on our side to access, correct
            or delete. For the data Google collects for advertising, use{' '}
            <a
              href="https://myadcenter.google.com/"
              className={linkClass}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              Google&rsquo;s My Ad Center
            </a>{' '}
            or contact Google directly.
          </p>
          <p className={paraClass}>
            If you are in the EEA/UK, Australia, California or another region with specific privacy
            rights, those rights apply to Google as the data controller for advertising data. As the
            app developer we can only confirm what is written on this page: we collect nothing.
          </p>

          <h2 className={headingClass}>Changes</h2>
          <p className={paraClass}>
            If this policy changes we will update the date at the top and note the change in the
            app&rsquo;s release notes. Material changes will be highlighted in the app.
          </p>

          <h2 className={headingClass}>Contact</h2>
          <p className={paraClass}>
            <strong>{BUSINESS.legalName}</strong>
            <br />
            Email:{' '}
            <a href={`mailto:${BUSINESS.email}`} className={linkClass}>
              {BUSINESS.email}
            </a>
            <br />
            {BUSINESS_FORMATTED.addressLine}
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
