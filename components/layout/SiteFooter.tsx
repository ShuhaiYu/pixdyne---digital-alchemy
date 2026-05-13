// Site-wide footer. Editorial layout: oversized serif italic Pixdyne
// wordmark + positioning paragraph on the left, NAP block on the
// right. Below: middot-separated nav + service deep-links inline. Bottom
// strip: copyright + legal links. Replaces the previous four-equal-
// columns layout flagged in the May 2026 design review as agency-
// template residue.
//
// CLAUDE.md §14.1: NAP literals (name, address, email, phone, ABN) are
// not allowed inline here — they come from @/lib/data/business so every
// surface reads from the same source of truth.

import Link from 'next/link';
import { BUSINESS, BUSINESS_FORMATTED } from '@/lib/data/business';

// Top nav — homepage sections + Contact route. Reads as a single
// middot-separated row, not a column of links.
const TOP_NAV: { href: string; label: string }[] = [
  { href: '/#services', label: 'Services' },
  { href: '/#approach', label: 'Approach' },
  { href: '/services/onlypixai', label: 'OnlyPixAI' },
  { href: '/contact', label: 'Contact' }
];

// Service deep-links — the four service detail pages. Surfaced as a
// secondary inline row so footer crawlers and visitors hunting a
// specific service get a direct path without resurrecting a Capabilities
// column.
const SERVICE_LINKS: { href: string; label: string }[] = [
  { href: '/services/web-development', label: 'Web Development' },
  { href: '/services/system-development', label: 'System Development' },
  { href: '/services/operations', label: 'Operations' },
  { href: '/services/onlypixai', label: 'OnlyPixAI' }
];

export const SiteFooter: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="w-full bg-brand-black text-brand-text border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-10">
        {/* Top — brand block (left) + NAP block (right). 2-col on
            md+, stacked on mobile. The Playfair italic wordmark is
            the visual anchor of the entire footer. */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 md:gap-16 items-start">
          {/* Brand block */}
          <div>
            <Link
              href="/"
              className="inline-block text-6xl md:text-7xl lg:text-8xl font-serif italic text-brand-text hover:text-brand-yellow-hover transition-colors leading-none"
              aria-label="Pixdyne home"
            >
              Pixdyne.
            </Link>
            <p className="mt-6 text-base md:text-lg text-brand-muted leading-relaxed max-w-md">
              A Melbourne-based long-term technology partner. Building and
              operating websites, custom systems, and AI products since 2018.
            </p>
          </div>

          {/* NAP block. Right-aligned on md+ so the eye returns from
              the wordmark to the address line. */}
          <address className="not-italic text-sm md:text-base text-brand-muted leading-relaxed md:text-right">
            <p className="text-brand-text">{BUSINESS.address.street}</p>
            <p className="text-brand-text">
              {BUSINESS.address.locality}, {BUSINESS.address.region}{' '}
              {BUSINESS.address.postalCode}
            </p>
            <p className="text-brand-text">{BUSINESS.address.country}</p>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="hover:text-brand-yellow-hover transition-colors block mt-4 text-brand-text"
            >
              {BUSINESS.email}
            </a>
            <a
              href={`tel:${BUSINESS.phone.tel}`}
              className="hover:text-brand-yellow-hover transition-colors block text-brand-text"
            >
              {BUSINESS.phone.display}
            </a>
            <p className="text-xs text-brand-muted/70 tracking-wider mt-4">
              {BUSINESS_FORMATTED.abnLabel}
            </p>
          </address>
        </div>

        {/* Service deep-links — small editorial caption form. Rendered
            as a middot-separated inline row preceded by a soft "Services"
            tag. Crawlers and direct-jump visitors keep their deep links;
            the page no longer hosts a Capabilities column to support them. */}
        <nav
          aria-label="Service deep links"
          className="mt-16 pt-8 border-t border-white/10 text-sm text-brand-muted leading-loose"
        >
          <span className="text-brand-yellow/80 mr-3">Services</span>
          {SERVICE_LINKS.map((link, i) => (
            <span key={link.href}>
              {i > 0 && (
                <span aria-hidden="true" className="text-brand-muted/40 mx-2">
                  ·
                </span>
              )}
              <Link
                href={link.href}
                className="hover:text-brand-yellow-hover transition-colors"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>

        {/* Bottom strip — primary nav (left) + legal + copyright (right).
            All small Space Grotesk so it recedes; the brand block above
            owns the footer's gravity. */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-xs text-brand-muted">
          {/* Primary nav inline */}
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {TOP_NAV.map((link, i) => (
              <span key={link.href} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-brand-muted/40">
                    ·
                  </span>
                )}
                <Link
                  href={link.href}
                  className="hover:text-brand-yellow-hover transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>

          {/* Legal + copyright */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link
              href="/legal/privacy"
              className="hover:text-brand-yellow-hover transition-colors"
            >
              Privacy
            </Link>
            <span aria-hidden="true" className="text-brand-muted/40">·</span>
            <Link
              href="/legal/terms"
              className="hover:text-brand-yellow-hover transition-colors"
            >
              Terms
            </Link>
            <span aria-hidden="true" className="text-brand-muted/40">·</span>
            <span>
              &copy; {year} {BUSINESS.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
