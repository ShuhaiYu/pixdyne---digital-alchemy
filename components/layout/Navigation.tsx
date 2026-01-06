'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
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
      <nav className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 mix-blend-difference text-white px-6 py-6 flex justify-between items-center ${scrolled ? 'py-4' : 'py-6'}`}>
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
            className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest hover:text-yellow-500 transition-colors group"
            onClick={() => scrollToSection('contact')}
          >
            Start Project
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 group">
            <span className="hidden sm:block text-xs uppercase tracking-[0.2em]">Menu</span>
            <Menu size={24} className="group-hover:text-yellow-500 transition-colors" />
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-[70] transition-transform duration-700 ease-[0.16,1,0.3,1] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="absolute top-6 right-6 text-white cursor-pointer hover:text-yellow-500 transition-colors" onClick={() => setIsOpen(false)}>
          <X size={32} />
        </div>

        <div className="h-full flex flex-col justify-center items-center gap-8 p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="text-5xl md:text-7xl font-serif italic text-transparent hover:text-yellow-500 hover:tracking-wide transition-all duration-300 stroke-text cursor-pointer uppercase"
              style={{ WebkitTextStroke: '1px white' }}
              onClick={() => scrollToSection(item.id)}
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
