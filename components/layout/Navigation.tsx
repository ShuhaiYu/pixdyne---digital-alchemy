'use client';

// Site-wide navigation. Five top-level routes:
//   Services (with hover/click dropdown), Work, About, Journal, Contact (CTA)
// Every nav entry resolves to a real page — no homepage anchor scrolls
// any more. The earlier inline nav was too quiet (text-xs) and went to
// homepage anchors only; this rewrite raises the visual weight, adds a
// proper sub-menu for the four service / product pages, and ensures
// every route the site ships is reachable from here.

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

interface SubItem {
  href: string;
  label: string;
  // Visual eyebrow on each sub-item — distinguishes Services from the
  // OnlyPixAI product in the same dropdown.
  kicker: 'SERVICE' | 'PRODUCT';
}

interface NavItem {
  label: string;
  href: string;
  // Optional sub-menu. When present, the desktop nav renders the parent
  // as a clickable link AND a hover dropdown trigger. The mobile
  // overlay renders the parent as a heading with the sub-items listed
  // beneath it.
  subItems?: SubItem[];
  // Treats the item as the primary call-to-action (gold pill).
  cta?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    subItems: [
      { href: '/services/web-development', label: 'Web Development', kicker: 'SERVICE' },
      { href: '/services/system-development', label: 'System Development', kicker: 'SERVICE' },
      { href: '/services/operations', label: 'Operations', kicker: 'SERVICE' },
      { href: '/services/onlypixai', label: 'OnlyPixAI', kicker: 'PRODUCT' }
    ]
  },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/blog' },
  { label: 'Contact', href: '/contact', cta: true }
];

export const Navigation: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Tracks which top-level item's dropdown is open on desktop. Only one
  // dropdown can be open at a time. null = nothing open.
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null);
  const mobileOpenButtonRef = useRef<HTMLButtonElement>(null);
  // Per-item dropdown close timer. Lets the cursor travel from the
  // trigger button to the dropdown panel without closing the menu, by
  // waiting ~120ms before applying mouseleave.
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── Scroll state for nav padding ────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── Mobile overlay focus + scroll lock ──────────────────────────
  useEffect(() => {
    if (isMobileOpen) {
      const timer = setTimeout(() => mobileCloseButtonRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isMobileOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileOpen(false);
    setTimeout(() => mobileOpenButtonRef.current?.focus(), 100);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen, closeMobileMenu]);

  useEffect(() => {
    if (!isMobileOpen || !mobileMenuRef.current) return;
    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const menu = mobileMenuRef.current;
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
  }, [isMobileOpen]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // ─── Desktop dropdown — hover + click + escape + outside-click ───
  const openDropdownFor = (label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenDropdown(label);
  };

  const scheduleDropdownClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
      closeTimerRef.current = null;
    }, 120);
  };

  // Close dropdown on escape.
  useEffect(() => {
    if (!openDropdown) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdown(null);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [openDropdown]);

  // Close dropdown on outside click.
  useEffect(() => {
    if (!openDropdown) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-nav-dropdown]')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openDropdown]);

  // Close dropdown when route changes (avoids it lingering after a
  // sub-item link navigates).
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  // ─── Active-route helper ─────────────────────────────────────────
  const isActiveRoute = (href: string): boolean => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // ─── Render ──────────────────────────────────────────────────────
  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 text-brand-text px-6 lg:px-8 flex justify-between items-center bg-brand-black/70 backdrop-blur-md border-b border-white/5 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <Link href="/" className="flex items-center gap-3 group" aria-label="Pixdyne home">
          <img
            src="/logo-400.png"
            alt="Pixdyne"
            className="w-10 h-10 object-contain transition-opacity duration-300"
          />
          <span className="text-xl font-bold tracking-widest hidden sm:block">
            PIXDYNE
          </span>
        </Link>

        {/* Desktop nav. Bigger text-sm lg:text-base (was text-xs lg:text-sm),
            wider gap, and an underline-on-active affordance so the
            current route reads as "I am here". */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_ITEMS.map((item) => {
            const active = isActiveRoute(item.href);
            const hasDropdown = item.subItems && item.subItems.length > 0;
            const isOpen = openDropdown === item.label;

            if (item.cta) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="ml-3 lg:ml-4 inline-flex items-center gap-2 text-sm lg:text-base uppercase tracking-widest bg-brand-yellow text-brand-black font-bold py-3 px-5 lg:py-3.5 lg:px-6 hover:bg-brand-yellow-hover transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow rounded-sm group"
                  aria-label="Get in touch — open the contact page"
                >
                  {item.label}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Link>
              );
            }

            return (
              <div
                key={item.label}
                data-nav-dropdown
                className="relative group"
                onMouseEnter={hasDropdown ? () => openDropdownFor(item.label) : undefined}
                onMouseLeave={hasDropdown ? scheduleDropdownClose : undefined}
              >
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 text-sm lg:text-base uppercase tracking-widest font-medium py-3 px-3 lg:px-4 transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow ${
                    active
                      ? 'text-brand-yellow'
                      : 'text-brand-text/85 hover:text-brand-yellow-hover'
                  }`}
                  aria-haspopup={hasDropdown ? 'menu' : undefined}
                  aria-expanded={hasDropdown ? isOpen : undefined}
                  onFocus={hasDropdown ? () => openDropdownFor(item.label) : undefined}
                >
                  <span>{item.label}</span>
                  {hasDropdown && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </Link>

                {/* Active-route underline. Gold hairline under the
                    item, fades in on active or on hover. */}
                <span
                  aria-hidden="true"
                  className={`absolute left-3 lg:left-4 right-3 lg:right-4 bottom-1 h-px transition-all duration-200 ${
                    active ? 'bg-brand-yellow scale-x-100' : 'bg-brand-yellow-hover scale-x-0 group-hover:scale-x-100'
                  }`}
                />

                {/* Dropdown panel */}
                {hasDropdown && (
                  <div
                    role="menu"
                    aria-label={`${item.label} sub-menu`}
                    className={`absolute top-full left-0 mt-2 min-w-[280px] bg-brand-surface border border-white/10 shadow-2xl shadow-brand-black/60 rounded-sm overflow-hidden transition-all duration-200 origin-top ${
                      isOpen
                        ? 'opacity-100 translate-y-0 visible'
                        : 'opacity-0 -translate-y-1 invisible'
                    }`}
                  >
                    {item.subItems!.map((sub) => {
                      const subActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          role="menuitem"
                          className={`flex flex-col gap-1 px-5 py-4 border-b border-white/5 last:border-b-0 transition-colors focus-visible:outline-none focus-visible:bg-brand-black/40 ${
                            subActive ? 'bg-brand-black/40' : 'hover:bg-brand-black/40'
                          }`}
                          onClick={() => setOpenDropdown(null)}
                        >
                          <span className="text-[10px] font-mono tracking-widest text-brand-yellow">
                            {sub.kicker}
                          </span>
                          <span
                            className={`text-base font-medium transition-colors ${
                              subActive ? 'text-brand-yellow' : 'text-brand-text group-hover:text-brand-yellow-hover'
                            }`}
                          >
                            {sub.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          ref={mobileOpenButtonRef}
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden flex items-center gap-2 group min-h-[44px] min-w-[44px] justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow rounded cursor-pointer"
          aria-label="Open navigation menu"
          aria-expanded={isMobileOpen}
          aria-controls="main-menu"
        >
          <span className="hidden sm:block text-xs uppercase tracking-[0.2em]">Menu</span>
          <Menu size={24} className="group-hover:text-brand-yellow-hover transition-colors" />
        </button>
      </nav>

      {/* ─── Mobile overlay ─────────────────────────────────────── */}
      <div
        id="main-menu"
        ref={mobileMenuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`md:hidden fixed inset-0 bg-brand-black z-[70] transition-transform duration-700 ease-[0.16,1,0.3,1] overflow-y-auto ${
          isMobileOpen ? 'translate-y-0 visible' : '-translate-y-full invisible'
        }`}
        aria-hidden={!isMobileOpen}
      >
        <button
          ref={mobileCloseButtonRef}
          className="absolute top-6 right-6 text-brand-text hover:text-brand-yellow-hover transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow rounded"
          onClick={closeMobileMenu}
          aria-label="Close navigation menu"
        >
          <X size={32} />
        </button>

        <nav
          aria-label="Mobile main menu"
          className="min-h-screen flex flex-col justify-center px-8 py-24"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActiveRoute(item.href);

            return (
              <div key={item.label} className="border-b border-white/10 py-6">
                <Link
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`block text-3xl sm:text-4xl md:text-5xl font-serif italic transition-colors min-h-[44px] ${
                    active ? 'text-brand-yellow' : 'text-brand-text hover:text-brand-yellow-hover'
                  }`}
                  aria-label={`Open ${item.label} page`}
                >
                  {item.label}
                </Link>
                {item.subItems && (
                  <ul className="mt-4 ml-2 space-y-2">
                    {item.subItems.map((sub) => {
                      const subActive = pathname === sub.href;
                      return (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            onClick={closeMobileMenu}
                            className={`block text-base uppercase tracking-widest py-2 transition-colors ${
                              subActive ? 'text-brand-yellow' : 'text-brand-text/75 hover:text-brand-yellow-hover'
                            }`}
                          >
                            <span className="text-[10px] font-mono tracking-widest text-brand-yellow/70 mr-3">
                              {sub.kicker}
                            </span>
                            {sub.label}
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

        <div className="px-8 pb-10 flex justify-between text-brand-text/50 text-xs uppercase tracking-widest">
          <span>Pixdyne © {new Date().getFullYear()}</span>
          <span>Melbourne · Australia</span>
        </div>
      </div>
    </>
  );
};
