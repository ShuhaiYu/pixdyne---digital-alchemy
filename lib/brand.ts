/**
 * Brand color constants for use in JS contexts (inline styles, props, WebGL).
 * These MUST stay in sync with the CSS tokens in globals.css @theme block.
 * For Tailwind classes, use the token names directly: text-brand-yellow, bg-brand-black, etc.
 */
export const brand = {
  yellow: '#C8962A',
  yellowHover: '#D4A83A',
  black: '#0B0A08',
  surface: '#151311',
  white: '#F5F2ED',
  text: '#E8E4DD',
  muted: '#8A847B',
  light: '#E5E0D8',
} as const;

/** RGB tuple for use in rgba() expressions */
export const brandRGB = {
  yellow: '200, 150, 42',
  black: '11, 10, 8',
  surface: '21, 19, 17',
  white: '245, 242, 237',
  muted: '138, 132, 123',
} as const;
