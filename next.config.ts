import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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

export default nextConfig
