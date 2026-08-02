// Maskable app icon (512x512) for the web app manifest.
//
// Android masks installed-app icons to a platform shape (circle, squircle,
// rounded square). The spec guarantees only the centre 80% — a circle of
// 0.8 x 512 = 409.6px diameter — survives every mask. The largest square
// that fits inside that circle is 409.6 / sqrt(2) ~= 290px, so the logo is
// drawn at 280px to keep a margin.
//
// The plain /android-chrome-512x512.png cannot serve as the maskable
// variant: it is an edge-to-edge logo on a transparent field, so masking
// clips its corners and the transparency shows the launcher background
// through. Here the logo is inset on an opaque brand-black field instead.
//
// Rendered through ImageResponse and prerendered at build time
// (force-static), matching the OG image generators elsewhere in the app.
// No font is loaded — the icon is pure image + colour.

import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { brand } from '@/lib/brand';

export const dynamic = 'force-static';
export const contentType = 'image/png';

const ICON_SIZE = 512;
// Safe-area square for an 80% maskable circle, with margin. See note above.
const LOGO_SIZE = 280;

export async function GET() {
  const logo = await readFile(
    path.join(process.cwd(), 'public', 'android-chrome-512x512.png')
  );
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: brand.black,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={LOGO_SIZE} height={LOGO_SIZE} alt="" />
      </div>
    ),
    { width: ICON_SIZE, height: ICON_SIZE }
  );
}
