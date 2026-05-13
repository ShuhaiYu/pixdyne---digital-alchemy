'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

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

  // Focus management: move focus into menu when opened, back to trigger when closed
  useEffect(() => {
    if (isOpen) {
      // Small delay to let the transition start before focusing
      const timer = setTimeout(() => closeButtonRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    // Return focus to the menu trigger button
    setTimeout(() => openButtonRef.current?.focus(), 100);
  }, []);

  // Escape key closes the menu
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

  // Focus trap within the open menu
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    closeMenu();
    if (pathname !== '/') {
      window.location.href = `/#${id}`;
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Items with `id` scroll to a same-page anchor on the homepage (or
  // navigate back to /#<id> when on another route). Items with `href`
  // use full Next.js routing — "Contact" is now a standalone /contact
  // route, not a homepage anchor. "Home" is omitted from the inline
  // nav because the logo on the left already routes there.
  type MenuItem = { label: string; id?: string; href?: string };
  const menuItems: MenuItem[] = [
    { label: 'Services', id: 'services' },
    // { label: 'Work', id: 'work' },
    { label: 'Approach', id: 'approach' },
    { label: 'OnlyPixAI', id: 'onlypixai' },
    // { label: 'Insights', id: 'insights' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 text-brand-text px-6 flex justify-between items-center bg-brand-black/60 backdrop-blur-sm ${scrolled ? 'py-4' : 'py-6'}`}
      >
        <Link href="/" className="flex items-center gap-4 group">
          <img
            // Single logo asset across all scroll positions. The earlier
            // scrolled-state ternary collapsed to the same source on
            // both branches; restoring a real swap is on the polish
            // backlog once a verified white-on-transparent mark exists
            // at /public/logo.png.
            src="/logo-400.png"
            alt="Pixdyne"
            className="w-10 h-10 object-contain transition-opacity duration-300"
          />
          <span className="text-xl font-bold tracking-widest hidden sm:block">PIXDYNE</span>
        </Link>

        {/* Desktop: inline horizontal nav. The fullscreen overlay
            menu is kept for mobile only — see md:hidden on the
            hamburger trigger below. OnlyPixAI is a brand wordmark
            (CLAUDE.md rule 5) and is exempted from the uppercase
            transform that the other nav items use. */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {menuItems.map((item) => {
            const isCta = item.label === 'Contact';
            const isBrand = item.id === 'onlypixai';
            const ctaClass =
              'inline-flex items-center gap-2 text-xs lg:text-sm uppercase tracking-widest bg-brand-yellow text-brand-black font-bold py-2.5 px-4 lg:py-3 lg:px-5 hover:bg-brand-yellow-hover transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow rounded-sm group cursor-pointer';
            const linkClass = `text-xs lg:text-sm tracking-widest text-brand-text/85 hover:text-brand-yellow-hover transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow rounded cursor-pointer ${isBrand ? '' : 'uppercase'}`;

            if (item.href) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={isCta ? ctaClass : linkClass}
                  aria-label={isCta ? 'Get in touch — open the contact page' : item.label}
                >
                  {item.label}
                  {isCta && (
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id!)}
                className={linkClass}
                aria-label={`Scroll to ${item.label} section`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Mobile: hamburger trigger for the fullscreen overlay below. */}
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
      </nav>

      {/* Full Screen Menu Overlay (mobile only — desktop uses the inline
          nav above). `md:hidden` guarantees the overlay is removed from
          the desktop layout entirely, so a stale isOpen=true after a
          mobile→desktop viewport resize cannot leave the user trapped. */}
      <div
        id="main-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`md:hidden fixed inset-0 bg-brand-black z-[70] transition-transform duration-700 ease-[0.16,1,0.3,1] ${isOpen ? 'translate-y-0 visible' : '-translate-y-full invisible'}`}
        aria-hidden={!isOpen}
      >
        <button
          ref={closeButtonRef}
          className="absolute top-6 right-6 text-brand-text hover:text-brand-yellow-hover transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow rounded"
          onClick={closeMenu}
          aria-label="Close navigation menu"
        >
          <X size={32} />
        </button>

        <div className="h-full flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 p-4" role="navigation" aria-label="Main menu links">
          {menuItems.map((item) => {
            // OnlyPixAI exempted from uppercase per CLAUDE.md rule 5.
            const isBrand = item.id === 'onlypixai';
            // .stroke-text class (defined in globals.css) drives the
            // -webkit-text-stroke off the brand-text CSS variable.
            // No inline style override needed — keeping it would have
            // re-hardcoded "1px white" and bypassed the token system.
            const baseClass = `text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif italic text-transparent hover:text-brand-yellow-hover hover:tracking-wide transition-all duration-300 stroke-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow rounded min-h-[44px] cursor-pointer ${isBrand ? '' : 'uppercase'}`;

            if (item.href) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className={baseClass}
                  aria-label={`Open ${item.label} page`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                className={baseClass}
                onClick={() => scrollToSection(item.id!)}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-10 w-full px-10 flex justify-between text-brand-text/50 text-xs uppercase tracking-widest">
          <span>Pixdyne © {new Date().getFullYear()}</span>
          <span>Melbourne · Australia</span>
        </div>
      </div>
    </>
  );
};
