// Per-post Open Graph image. Renders the blog title + category via the shared
// brand cover art. Next.js auto-wires this into each post's og:image (closing
// the per-blog OG gap in CLAUDE.md §14.13), and the blog post page reuses the
// same /blog/[slug]/opengraph-image URL as the visible hero, so one generated
// PNG serves both surfaces. generateStaticParams enumerates the slug set so one
// PNG is prerendered per post at build time. Runtime: default (Node.js on Fluid
// Compute).
import { ImageResponse } from 'next/og';
import { getBlogPostBySlug, getBlogSlugs } from '@/lib/data/blog';
import { renderCover, COVER_SIZE } from '@/lib/blog/cover-art';

export const size = COVER_SIZE;
export const contentType = 'image/png';
export const alt = 'Pixdyne Journal — Melbourne technology partner';

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  return new ImageResponse(
    renderCover({
      title: post?.title ?? 'Pixdyne Journal',
      category: post?.category ?? 'Journal',
    }),
    { ...size }
  );
}
