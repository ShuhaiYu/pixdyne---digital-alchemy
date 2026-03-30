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

  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Work', id: 'work' },
    { label: 'Team', id: 'team' },
    { label: 'Insights', id: 'insights' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 text-white px-6 flex justify-between items-center bg-brand-black/60 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none md:mix-blend-difference ${scrolled ? 'py-4' : 'py-6'}`}
      >
        <Link href="/" className="flex items-center gap-4 group">
          <img
            src="/logo.jpeg"
            alt="Pixdyne"
            className="w-10 h-10 object-cover"
          />
          <span className="text-xl font-bold tracking-widest hidden sm:block">PIXDYNE</span>
        </Link>

        <div className="flex items-center gap-8">
          <button
            className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest hover:text-brand-yellow-hover active:scale-[0.98] transition-all group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow rounded"
            onClick={() => scrollToSection('contact')}
            aria-label="Start a project - scroll to contact form"
          >
            Start Project
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            ref={openButtonRef}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 group min-h-[44px] min-w-[44px] justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow rounded"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="main-menu"
          >
            <span className="hidden sm:block text-xs uppercase tracking-[0.2em]">Menu</span>
            <Menu size={24} className="group-hover:text-brand-yellow-hover transition-colors" />
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        id="main-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 bg-black z-[70] transition-transform duration-700 ease-[0.16,1,0.3,1] ${isOpen ? 'translate-y-0 visible' : '-translate-y-full invisible'}`}
        aria-hidden={!isOpen}
      >
        <button
          ref={closeButtonRef}
          className="absolute top-6 right-6 text-white hover:text-brand-yellow-hover transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow rounded"
          onClick={closeMenu}
          aria-label="Close navigation menu"
        >
          <X size={32} />
        </button>

        <div className="h-full flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 p-4" role="navigation" aria-label="Main menu links">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif italic text-transparent hover:text-brand-yellow-hover hover:tracking-wide transition-all duration-300 stroke-text cursor-pointer uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow rounded min-h-[44px]"
              style={{ WebkitTextStroke: '1px white' }}
              onClick={() => scrollToSection(item.id)}
              aria-label={`Navigate to ${item.label} section`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="absolute bottom-10 w-full px-10 flex justify-between text-white/50 text-xs uppercase tracking-widest">
          <span>Pixdyne © 2024</span>
          <span>SFO • NYC • LND</span>
        </div>
      </div>
    </>
  );
};
