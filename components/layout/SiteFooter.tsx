// Site-wide footer. Surfaces NAP, primary navigation, and legal links
// on every page (sticky-scroll homepage included). Visual style matches
// the editorial dark / warm-gold language used elsewhere on the site.
//
// CLAUDE.md §14.1: this is the fourth NAP-bearing surface. Address /
// email / ABN literals here must stay byte-for-byte identical with the
// other three (lib/seo/schema.ts, app/legal/privacy/page.tsx,
// app/legal/terms/page.tsx). If any value changes, update all four in
// one commit.

import Link from 'next/link';

const PRIMARY_LINKS: { href: string; label: string; uppercase?: boolean }[] = [
  { href: '/#services', label: 'Services', uppercase: true },
  { href: '/#approach', label: 'Approach', uppercase: true },
  { href: '/services/onlypixai', label: 'OnlyPixAI', uppercase: false },
  { href: '/contact', label: 'Contact', uppercase: true }
];

export const SiteFooter: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="w-full bg-brand-black text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          {/* Brand block */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo-400.png"
                alt="Pixdyne"
                className="h-10 w-auto opacity-80"
                width={40}
                height={40}
              />
              <span className="text-lg font-bold tracking-widest">PIXDYNE</span>
            </div>
            <p className="text-sm font-sans text-brand-muted leading-relaxed max-w-xs">
              Melbourne-based long-term technology partner. Building and operating
              websites, custom systems, and AI products since 2018.
            </p>
          </div>

          {/* NAP block */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand-yellow">
              Where
            </h3>
            <address className="not-italic text-sm font-sans text-brand-muted leading-relaxed">
              <p>294 Clayton Rd</p>
              <p>Clayton, VIC 3169</p>
              <p>Australia</p>
            </address>
            <div className="text-sm font-sans text-brand-muted leading-relaxed">
              <a
                href="mailto:info@pixdyne.com"
                className="hover:text-brand-yellow-hover transition-colors block"
              >
                info@pixdyne.com
              </a>
              <a
                href="tel:+61410510751"
                className="hover:text-brand-yellow-hover transition-colors block"
              >
                +61 410 510 751
              </a>
            </div>
            <p className="text-xs font-mono text-brand-muted/70 tracking-wider mt-3">
              ABN 96 690 116 584
            </p>
          </div>

          {/* Primary navigation */}
          <nav aria-label="Footer navigation" className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand-yellow">
              Pages
            </h3>
            <ul className="space-y-2 text-sm font-sans text-brand-muted">
              {PRIMARY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`hover:text-brand-yellow-hover transition-colors ${
                      link.uppercase ? 'uppercase tracking-wider text-xs font-mono' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services list */}
          <nav aria-label="Services" className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand-yellow">
              Capabilities
            </h3>
            <ul className="space-y-2 text-sm font-sans text-brand-muted">
              <li>
                <Link
                  href="/services/web-development"
                  className="hover:text-brand-yellow-hover transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/system-development"
                  className="hover:text-brand-yellow-hover transition-colors"
                >
                  System Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/operations"
                  className="hover:text-brand-yellow-hover transition-colors"
                >
                  Operations
                </Link>
              </li>
              <li>
                <Link
                  href="/services/onlypixai"
                  className="hover:text-brand-yellow-hover transition-colors"
                >
                  OnlyPixAI
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom strip — copyright + legal links */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs font-mono text-brand-muted">
          <p className="uppercase tracking-widest">
            &copy; {year} Pixdyne &middot; All rights reserved
          </p>
          <div className="flex items-center gap-3 uppercase tracking-widest">
            <Link
              href="/legal/privacy"
              className="hover:text-brand-yellow-hover transition-colors"
            >
              Privacy
            </Link>
            <span aria-hidden="true" className="text-brand-muted/40">
              &middot;
            </span>
            <Link
              href="/legal/terms"
              className="hover:text-brand-yellow-hover transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
