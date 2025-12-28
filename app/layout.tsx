import type { Metadata } from 'next';
import { Playfair_Display, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import { generateOrganizationSchema } from '@/lib/seo/schema';
import { Navigation } from '@/components/layout/Navigation';
import './globals.css';

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
  description: 'Premium IT Services: Web Development, App Development, Technical SEO, and IT Support. San Jose-based digital engineering agency.',
  keywords: ['web development', 'app development', 'SEO', 'IT services', 'San Jose', 'React', 'Next.js', 'mobile app', 'digital agency'],
  authors: [{ name: 'Pixdyne' }],
  creator: 'Pixdyne',
  publisher: 'Pixdyne',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pixdyne.com',
    siteName: 'Pixdyne',
    title: 'Pixdyne | Digital Alchemy',
    description: 'Premium IT Services: Web, App, SEO, and Support.',
    images: [{
      url: '/og/default.jpg',
      width: 1200,
      height: 630,
      alt: 'Pixdyne - Digital Alchemy'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pixdyne | Digital Alchemy',
    description: 'Premium IT Services for modern enterprises.',
    images: ['/og/default.jpg'],
    creator: '@pixdyne'
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
  verification: {
    google: 'google-site-verification-code',
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
        <Navigation />
        {children}
      </body>
    </html>
  );
}
