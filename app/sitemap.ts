import { MetadataRoute } from 'next';
import { getServiceSlugs } from '@/lib/data/services';
import { getAllCaseStudies } from '@/lib/data/case-studies';
import { getAllBlogPosts } from '@/lib/data/blog';

// Legal pages have stable hand-edited content. Stamping them with the
// current build time would falsely claim weekly churn. Use the documented
// `lastUpdatedISO` constants in the legal pages instead.
const LEGAL_LAST_UPDATED_ISO = '2026-05-09';

// Safe ISO parser. Falls back to current build time if the input is
// missing or unparseable — sitemap validity should never block on
// content-layer date typos.
function toISO(input: string | undefined, fallback: Date): Date {
  if (!input) return fallback;
  // Year-only strings (e.g. case-study `year: "2024"`) parse as
  // mid-year in some runtimes — normalise to Jan 1 of the year for
  // deterministic output.
  if (/^\d{4}$/.test(input)) return new Date(`${input}-01-01T00:00:00Z`);
  const parsed = new Date(input);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pixdyne.com';
  const buildTime = new Date();

  const serviceSlugs = getServiceSlugs();
  const caseStudies = getAllCaseStudies();
  const blogPosts = getAllBlogPosts();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: buildTime,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: buildTime,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: buildTime,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: new Date(LEGAL_LAST_UPDATED_ISO),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: new Date(LEGAL_LAST_UPDATED_ISO),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: buildTime,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const workPages: MetadataRoute.Sitemap = caseStudies.map((work) => ({
    url: `${baseUrl}/work/${work.slug}`,
    lastModified: toISO(work.year, buildTime),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: toISO(post.date, buildTime),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...workPages, ...blogPages];
}
