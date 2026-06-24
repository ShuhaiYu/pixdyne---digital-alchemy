// In-article pull-quote image generator. The blog post body embeds
// <figure><img src="/api/blog-image?slug=…&i=N"></figure> for each entry in the
// post's `pullQuotes`; this route renders that line as an on-brand card using
// the shared cover art. Data-bound by design — it only renders text that already
// lives in lib/data/blog.ts (looked up by slug + index), never free-text query
// input, so there is no arbitrary-render abuse surface. Cheap and fully
// cacheable at the CDN edge. Runtime: Node.js (Fluid Compute).
import { ImageResponse } from 'next/og';
import { getBlogPostBySlug } from '@/lib/data/blog';
import { renderQuote, COVER_SIZE } from '@/lib/blog/cover-art';

export function GET(request: Request): Response {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') ?? '';
  const index = Number.parseInt(searchParams.get('i') ?? '0', 10);

  const post = getBlogPostBySlug(slug);
  const quote = post?.pullQuotes?.[Number.isNaN(index) ? 0 : index];

  if (!post || !quote) {
    return new Response('Not found', { status: 404 });
  }

  return new ImageResponse(renderQuote({ quote, category: post.category }), {
    ...COVER_SIZE,
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
