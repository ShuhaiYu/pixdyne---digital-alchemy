'use client';

// Site-wide navigation. Restores the original editorial design language:
//   * Bar is barely there — transparent on desktop with mix-blend-difference
//     so the logo + Menu trigger invert against whatever background scrolls
//     beneath them. Warm-black/blur fallback on mobile where blend mode
//     would fight the small viewport.
//   * No inline desktop nav. The only persistent affordances are the
//     hamburger and a single "Start Project" CTA.
//   * Fullscreen overlay is the actual menu: stroke-text serif italic
//     items, large, deliberately quiet. Service sub-items live inline
//     beneath the Services parent so the overlay covers the full IA
//     without a second-tier hover layer.
//   * All items route to real pages — Services, Work, About, Journal,
//     Contact, plus the four service / product detail pages. No homepage
//     anchor scrolls.
//   * Footer strip reads "Melbourne · Australia" (CLAUDE.md §6 rule 11
//     replaces the original "SFO · NYC · LND" template residue).

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { BUSINESS } from '@/lib/data/business';

interface SubItem {
  href: string;
  label: string;
  kicker: 'SERVICE' | 'PRODUCT';
}

interface MenuItem {
  href: string;
  label: string;
  subItems?: SubItem[];
}

const MENU_ITEMS: MenuItem[] = [
  { href: '/', label: 'Home' },
  {
    href: '/services',
    label: 'Services',
    subItems: [
      { href: '/services/web-development', label: 'Web Development', kicker: 'SERVICE' },
      { href: '/services/system-development', label: 'System Development', kicker: 'SERVICE' },
      { href: '/services/operations', label: 'Operations', kicker: 'SERVICE' },
      { href: '/services/onlypixai', label: 'OnlyPixAI', kicker: 'PRODUCT' }
    ]
  },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Journal' },
  { href: '/contact', label: 'Contact' }
];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Close overlay automatically when the route changes (clicking a link
  // navigates but the overlay should never linger on the new page).
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

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
          <img
            src="/logo-400.png"
            alt="Pixdyne"
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-bold tracking-widest hidden sm:block">PIXDYNE</span>
        </Link>

        <div className="flex items-center gap-8">
          {/* Persistent CTA — the only inline desktop affordance besides
              the hamburger. Routes to /contact (no longer a homepage
              anchor scroll). */}
          <Link
            href="/contact"
            className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest hover:text-brand-yellow-hover active:scale-[0.98] transition-all group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow rounded"
            aria-label="Start a project — open the contact page"
          >
            Start Project
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            ref={openButtonRef}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 group min-h-[44px] min-w-[44px] justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow rounded cursor-pointer"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="main-menu"
          >
            <span className="hidden sm:block text-xs uppercase tracking-[0.2em]">Menu</span>
            <Menu size={24} className="group-hover:text-brand-yellow-hover transition-colors" />
          </button>
        </div>
      </nav>

      {/* Fullscreen menu overlay — the editorial moment. Sits above the
          mix-blend nav so the X close button reads as text-brand-text on
          warm-black, not blended. */}
      <div
        id="main-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 bg-brand-black z-[70] transition-transform duration-700 ease-[0.16,1,0.3,1] overflow-y-auto ${
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
                        <li key={sub.href} className="flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            className="text-[10px] font-mono tracking-widest text-brand-yellow/70"
                          >
                            {sub.kicker}
                          </span>
                          <Link
                            href={sub.href}
                            onClick={closeMenu}
                            className={`text-xs sm:text-sm uppercase tracking-widest py-1 transition-colors ${
                              subActive
                                ? 'text-brand-yellow'
                                : 'text-brand-text/75 hover:text-brand-yellow-hover'
                            }`}
                            aria-current={subActive ? 'page' : undefined}
                          >
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
