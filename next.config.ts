import type { NextConfig } from 'next'
import { withBotId } from 'botid/next/config'

const nextConfig: NextConfig = {
  // @react-pdf/renderer (and its fontkit dependency) must run unbundled in
  // the Node server runtime — used by the Free SEO Audit PDF export route
  // (app/api/seo-audit/report-pdf). Without this, the build fails to bundle it.
  serverExternalPackages: ['@react-pdf/renderer'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // Blog post renamed to drop the engineer-only stack name from the slug
      // (CLAUDE.md §6 rule 10 / §14.7). 301 preserves any existing links.
      {
        source: '/blog/nextjs-performance-optimization',
        destination: '/blog/why-your-website-is-slow',
        permanent: true,
      },
    ]
  },
}

// withBotId sets up the BotID proxy rewrites that power the client SDK +
// checkBotId() classification on the Free SEO Audit endpoints.
export default withBotId(nextConfig)
