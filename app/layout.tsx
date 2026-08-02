import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo/schema';
import { Navigation } from '@/components/layout/Navigation';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { BotIdClient } from 'botid/client';
import { ServiceWorkerRegistrar } from '@/components/pwa/ServiceWorkerRegistrar';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#0B0A08',
};

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pixdyne.com'),
  title: {
    default: 'Pixdyne | Melbourne Technology Partner',
    template: '%s | Pixdyne'
  },
  description:
    'Melbourne technology partner since 2018. Pixdyne builds and operates websites, custom systems, and AI-enabled products — and stays with you long after launch.',
  keywords: [
    'web development Melbourne',
    'system development Melbourne',
    'custom CRM development',
    'ERP implementation Melbourne',
    'managed IT Melbourne',
    'long-term technology partner',
    'WordPress development Melbourne',
    'Shopify Melbourne',
    'NetSuite implementation',
    'AI for business'
  ],
  authors: [{ name: 'Pixdyne' }],
  creator: 'Pixdyne',
  publisher: 'Pixdyne',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  // `manifest:` is deliberately absent — app/manifest.ts is a file-based
  // metadata route, so Next.js emits <link rel="manifest"> pointing at
  // /manifest.webmanifest on its own. Declaring it here as well would
  // render the tag twice (and the old /site.webmanifest no longer exists).
  //
  // Installed-app presentation on iOS. Safari reads these rather than the
  // manifest for "Add to Home Screen" on older iOS; 16.4+ also honours the
  // manifest, and the two agree by construction (title == short_name).
  // `black-translucent` lets content run under the status bar — the nav
  // compensates with env(safe-area-inset-top) padding, which resolves to 0
  // in normal browser tabs, so this changes nothing outside standalone mode.
  appleWebApp: {
    capable: true,
    title: 'Pixdyne',
    statusBarStyle: 'black-translucent',
  },
  other: {
    // Next.js emits the standardised `mobile-web-app-capable` for
    // appleWebApp.capable. Safari only learned that spelling in iOS 17.4,
    // and reads `display: standalone` from the manifest from 16.4. This
    // legacy alias is what covers iOS below 16.4, where neither applies.
    'apple-mobile-web-app-capable': 'yes',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://pixdyne.com',
    siteName: 'Pixdyne',
    title: 'Pixdyne | Melbourne Technology Partner',
    description:
      'Melbourne technology partner since 2018. Websites, custom systems, ongoing operations — and real AI capability for your business.'
    // Landscape og:image is emitted via the file-based convention at
    // app/opengraph-image.tsx (1200x630, dynamically rendered). Child
    // routes that do not define their own opengraph-image fall back to
    // the inline 1080x1080 brand-kit square at /og-image.png — set on
    // those routes' metadata directly.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pixdyne | Melbourne Technology Partner',
    description:
      'Melbourne technology partner since 2018. Websites, custom systems, operations — and real AI for your business.'
    // images intentionally omitted: file-based opengraph-image emits
    // both og:image and twitter:image. TBD: add `creator` once the
    // @pixdyne handle on X/Twitter is verified.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Google Search Console ownership is verified at the DNS layer (a
  // `google-site-verification=…` TXT record on pixdyne.com), which covers
  // the apex + www "Domain" property. No `verification.google` meta tag is
  // needed — do not add one; the DNS record is the single source of truth.
  verification: {
    // Bing Webmaster Tools site ownership (renders <meta name="msvalidate.01" />).
    other: {
      'msvalidate.01': 'FB87D11B62AD64E224F0C43B751744FC'
    }
  },
  alternates: {
    canonical: 'https://pixdyne.com'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={`${playfair.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema())
          }}
        />
        <script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebSiteSchema())
          }}
        />
        {/* Vercel BotID — only the Free SEO Audit endpoints are protected
            (browser-triggered, expensive crawl + PDF). The client SDK attaches
            classification headers to these requests; the routes verify with
            checkBotId(). All other traffic / content pages are unaffected. */}
        <BotIdClient
          protect={[
            { path: '/api/seo-audit', method: 'GET' },
            { path: '/api/seo-audit/report-pdf', method: 'POST' },
          ]}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-yellow focus:text-black focus:px-4 focus:py-2 focus:text-sm focus:font-mono focus:rounded"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
