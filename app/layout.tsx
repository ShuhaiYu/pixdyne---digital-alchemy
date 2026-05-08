import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import { generateOrganizationSchema } from '@/lib/seo/schema';
import { Navigation } from '@/components/layout/Navigation';
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
    default: 'Pixdyne | Digital Alchemy',
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
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://pixdyne.com',
    siteName: 'Pixdyne',
    title: 'Pixdyne | Digital Alchemy',
    description:
      'Melbourne technology partner since 2018. Websites, custom systems, ongoing operations — and real AI capability for your business.',
    // TBD: replace with a dedicated 1200x630 OG image generated via
    // app/opengraph-image.tsx. logo_full.jpeg (1024x1024) is a temporary
    // placeholder so social cards render instead of 404'ing.
    images: [{
      url: '/logo_full.jpeg',
      width: 1024,
      height: 1024,
      alt: 'Pixdyne'
    }]
  },
  twitter: {
    card: 'summary',
    title: 'Pixdyne | Digital Alchemy',
    description:
      'Melbourne technology partner since 2018. Websites, custom systems, operations — and real AI for your business.',
    images: ['/logo_full.jpeg']
    // TBD: re-add `creator` once the @pixdyne handle on X/Twitter is verified.
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
  // TBD: add `verification.google` once Google Search Console verification
  // code is issued. Shipping the placeholder string fails verification.
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
    <html lang="en" className={`${playfair.variable} ${spaceGrotesk.variable}`}>
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema())
          }}
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
      </body>
    </html>
  );
}
