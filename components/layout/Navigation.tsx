'use client';

// Site-wide navigation.
//   * Desktop (>= md): inline horizontal nav restored. Top-level items
//     (Services, Work, About, Journal) sit inline in the bar; Services
//     opens a hover/focus dropdown listing the four service detail pages
//     plus the OnlyPixAI product (tagged, divided off at the bottom). A
//     single "Start Project" CTA routes to /contact (Contact is
//     not duplicated as a text link). Home is omitted — the logo is home.
//   * The bar is transparent on desktop with mix-blend-difference so the
//     logo + inline links invert against whatever background scrolls
//     beneath them. Warm-black/blur fallback on mobile.
//   * The Services dropdown is rendered OUTSIDE the mix-blend bar (a fixed
//     sibling positioned against the trigger's measured rect) — otherwise
//     the blend mode would invert the panel and make it unreadable.
//   * Mobile (< md): hamburger trigger opens the fullscreen overlay menu.
//     The overlay is md:hidden so a stale isOpen after a mobile->desktop
//     resize can never trap a desktop user.
//   * Footer strip reads "Melbourne · Australia" (CLAUDE.md §6 rule 11).

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { BUSINESS } from '@/lib/data/business';

interface SubItem {
  href: string;
  label: string;
  // Optional category badge (e.g. 'Product'). Used to set the OnlyPixAI
  // entry apart from the four service lines and to render a divider
  // above it in the dropdown.
  tag?: string;
}

interface MenuItem {
  href: string;
  label: string;
  subItems?: SubItem[];
}

// Four service lines (mirroring the homepage Capabilities rail / see
// getCapabilityCards) plus the OnlyPixAI product as a distinct, tagged
// entry at the bottom. The Operations bundle page stays out of the
// dropdown — it's surfaced through its two standalone lines. OnlyPixAI
// carries a 'Product' badge and a divider so it reads as a different
// category from the services. Its menu label is the descriptive "AI
// Gateway" entry point; the destination page is the OnlyPixAI product
// itself (the product name is fixed — see CLAUDE.md §6 rule 5).
const SERVICE_SUBITEMS: SubItem[] = [
  { href: '/services/web-development', label: 'Web Development' },
  { href: '/services/system-development', label: 'System Development' },
  { href: '/services/managed-it', label: 'Managed IT' },
  { href: '/services/seo-content', label: 'SEO & Content' },
  { href: '/services/onlypixai', label: 'AI Gateway', tag: 'Product' }
];

// Full IA for the mobile overlay (includes Home + Contact).
const MENU_ITEMS: MenuItem[] = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services', subItems: SERVICE_SUBITEMS },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Journal' },
  { href: '/contact', label: 'Contact' }
];

// Desktop inline nav: Home is the logo, Contact is the CTA — so neither
// is repeated here. Services carries the dropdown.
const DESKTOP_ITEMS: MenuItem[] = [
  { href: '/services', label: 'Services', subItems: SERVICE_SUBITEMS },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Journal' }
];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  // --- Desktop Services dropdown ---
  const [servicesOpen, setServicesOpen] = useState(false);
  const [panelPos, setPanelPos] = useState<{ left: number; top: number } | null>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const measureServices = useCallback(() => {
    const r = servicesRef.current?.getBoundingClientRect();
    if (r) setPanelPos({ left: r.left, top: r.bottom + 10 });
  }, []);

  const openServices = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    measureServices();
    setServicesOpen(true);
  }, [measureServices]);

  const scheduleCloseServices = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 140);
  }, []);

  const closeServicesNow = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keep the dropdown anchored to the trigger as the bar height changes
  // (scroll shrinks padding) or the viewport resizes.
  useEffect(() => {
    if (!servicesOpen) return;
    window.addEventListener('resize', measureServices);
    window.addEventListener('scroll', measureServices, { passive: true });
    return () => {
      window.removeEventListener('resize', measureServices);
      window.removeEventListener('scroll', measureServices);
    };
  }, [servicesOpen, measureServices]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => closeButtonRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => openButtonRef.current?.focus(), 100);
  }, []);

  // Close both the overlay and the desktop dropdown when the route changes.
  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (isOpen) closeMenu();
      if (servicesOpen) closeServicesNow();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, servicesOpen, closeMenu, closeServicesNow]);

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const menu = menuRef.current;
      if (!menu) return;
      const focusable = menu.querySelectorAll<HTMLElement>(
        'button, a, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleTabTrap);
    return () => document.removeEventListener('keydown', handleTabTrap);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActiveRoute = (href: string): boolean => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 text-brand-text px-6 flex justify-between items-center bg-brand-black/60 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none md:mix-blend-difference ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <Link href="/" className="flex items-center gap-4 group" aria-label="Pixdyne home">
          <Image
            src="/logo-400.png"
            alt="Pixdyne"
            width={40}
            height={40}
            priority
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-bold tracking-widest hidden sm:block">PIXDYNE</span>
        </Link>

        <div className="flex items-center gap-8">
          {/* Desktop: inline horizontal nav. */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            {DESKTOP_ITEMS.map((item) => {
              const active = isActiveRoute(item.href);
              const linkClass = `text-xs lg:text-sm uppercase tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow rounded ${
                active ? 'text-brand-yellow' : 'hover:text-brand-yellow-hover'
              }`;

              if (item.subItems) {
                return (
                  <div
                    key={item.href}
                    ref={servicesRef}
                    className="relative flex items-center"
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleCloseServices}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 ${linkClass}`}
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                      aria-current={active ? 'page' : undefined}
                      onFocus={openServices}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkClass}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Persistent CTA — routes to /contact. */}
          <Link
            href="/contact"
            className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest hover:text-brand-yellow-hover active:scale-[0.98] transition-all group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow rounded"
            aria-label="Start a project — open the contact page"
          >
            Start Project
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Mobile: hamburger trigger for the fullscreen overlay. */}
          <button
            ref={openButtonRef}
            onClick={() => setIsOpen(true)}
            className="md:hidden flex items-center gap-2 group min-h-[44px] min-w-[44px] justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow rounded cursor-pointer"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="main-menu"
          >
            <span className="hidden sm:block text-xs uppercase tracking-[0.2em]">Menu</span>
            <Menu size={24} className="group-hover:text-brand-yellow-hover transition-colors" />
          </button>
        </div>
      </nav>

      {/* Desktop Services dropdown — fixed sibling OUTSIDE the mix-blend nav
          so its solid background stays readable. Positioned against the
          trigger's measured rect. Hidden on mobile (overlay covers IA). */}
      {panelPos && (
        <div
          className={`hidden md:block fixed z-[65] transition-all duration-200 ${
            servicesOpen
              ? 'opacity-100 translate-y-0 visible'
              : 'opacity-0 -translate-y-2 invisible pointer-events-none'
          }`}
          style={{ left: panelPos.left, top: panelPos.top }}
          onMouseEnter={openServices}
          onMouseLeave={scheduleCloseServices}
          role="menu"
          aria-label="Services"
        >
          <ul className="min-w-[260px] bg-brand-black border border-brand-yellow/20 rounded-md shadow-2xl shadow-black/40 py-2">
            {SERVICE_SUBITEMS.map((sub) => {
              const subActive = pathname === sub.href;
              return (
                <li
                  key={sub.href}
                  role="none"
                  // Tagged entries (the OnlyPixAI product) are divided off
                  // from the service lines above them.
                  className={sub.tag ? 'mt-2 border-t border-white/10 pt-2' : ''}
                >
                  <Link
                    href={sub.href}
                    role="menuitem"
                    onClick={closeServicesNow}
                    className={`flex items-center justify-between gap-3 px-5 py-3 text-sm uppercase tracking-widest transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-yellow ${
                      subActive
                        ? 'bg-brand-yellow/10 text-brand-yellow'
                        : 'text-brand-text/85 hover:bg-brand-white/[0.06] hover:text-brand-yellow-hover'
                    }`}
                    aria-current={subActive ? 'page' : undefined}
                  >
                    <span>{sub.label}</span>
                    {sub.tag && (
                      <span className="text-[10px] tracking-[0.18em] text-brand-yellow/80 border border-brand-yellow/30 rounded-full px-2 py-0.5">
                        {sub.tag}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Fullscreen menu overlay — mobile only. */}
      <div
        id="main-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`md:hidden fixed inset-0 bg-brand-black z-[70] transition-transform duration-700 ease-[0.16,1,0.3,1] overflow-y-auto ${
          isOpen ? 'translate-y-0 visible' : '-translate-y-full invisible'
        }`}
        aria-hidden={!isOpen}
      >
        <button
          ref={closeButtonRef}
          className="absolute top-6 right-6 text-brand-text hover:text-brand-yellow-hover transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow rounded cursor-pointer z-10"
          onClick={closeMenu}
          aria-label="Close navigation menu"
        >
          <X size={32} />
        </button>

        <nav
          role="navigation"
          aria-label="Main menu links"
          className="min-h-screen flex flex-col justify-center items-center gap-3 sm:gap-5 md:gap-6 px-6 py-24"
        >
          {MENU_ITEMS.map((item) => {
            const active = isActiveRoute(item.href);
            return (
              <div key={item.href} className="flex flex-col items-center">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif italic stroke-text uppercase tracking-tight transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow rounded min-h-[44px] ${
                    active
                      ? 'text-brand-yellow hover:tracking-wide'
                      : 'text-transparent hover:text-brand-yellow-hover hover:tracking-wide'
                  }`}
                  aria-label={`Open ${item.label} page`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>

                {item.subItems && (
                  <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 max-w-2xl">
                    {item.subItems.map((sub) => {
                      const subActive = pathname === sub.href;
                      return (
                        <li key={sub.href} className="flex items-center">
                          <Link
                            href={sub.href}
                            onClick={closeMenu}
                            className={`inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-widest py-1 transition-colors ${
                              subActive
                                ? 'text-brand-yellow'
                                : 'text-brand-text/75 hover:text-brand-yellow-hover'
                            }`}
                            aria-current={subActive ? 'page' : undefined}
                          >
                            {sub.label}
                            {sub.tag && (
                              <span className="text-[9px] tracking-[0.16em] text-brand-yellow/80 border border-brand-yellow/30 rounded-full px-1.5 py-0.5">
                                {sub.tag}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        <div className="absolute bottom-10 w-full px-10 flex justify-between text-brand-text/50 text-xs uppercase tracking-widest">
          <span>Pixdyne © {new Date().getFullYear()}</span>
          <span>
            {BUSINESS.address.locality} · {BUSINESS.address.country}
          </span>
        </div>
      </div>
    </>
  );
};
