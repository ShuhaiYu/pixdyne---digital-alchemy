'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="w-full flex flex-col p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32">
      {/* Animated Noise Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="flex justify-between items-start mb-6 sm:mb-8 md:mb-12">
        <span className="text-yellow-500 font-mono text-[10px] sm:text-xs md:text-sm">/// INITIALIZE_CONTACT_PROTOCOL</span>
        <span className="hidden md:block text-xs font-mono text-gray-500">EST_TIME: 1 MIN</span>
      </div>

      <div className="flex-grow flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-16 lg:gap-24">

        {/* Left Column: Heading & Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif italic mb-6 sm:mb-8 hover:text-yellow-500 transition-colors duration-500">
              Let&apos;s Talk.
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-sm mb-6 sm:mb-8">
              Ready to upgrade your digital infrastructure? Tell us about your project, timeline, and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-sm font-mono text-gray-400 mt-6 sm:mt-8 md:mt-0">
            <div>
              <h3 className="text-white font-bold mb-2 uppercase tracking-widest">Contact</h3>
              <a href="mailto:hello@pixdyne.com" className="hover:text-yellow-500 transition-colors block">hello@pixdyne.com</a>
              <a href="tel:+15550123456" className="hover:text-yellow-500 transition-colors block">+1 (555) 012-3456</a>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2 uppercase tracking-widest">Base</h3>
              <p>1200 Technology Dr</p>
              <p>San Jose, CA 94089</p>
            </div>
          </div>

          {/* Logo */}
          <div className="mt-12">
            <img
              src="/logo_full.jpeg"
              alt="Pixdyne"
              className="h-12 w-auto opacity-60"
            />
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="w-full md:w-1/2 flex items-center">
          <form className="w-full max-w-md flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="group">
              <label className="block text-xs font-mono uppercase text-gray-500 mb-2 group-focus-within:text-yellow-500 transition-colors">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-2 text-xl font-sans focus:outline-none focus:border-yellow-500 transition-colors text-white placeholder-white/20"
                placeholder="John Doe"
              />
            </div>

            <div className="group">
              <label className="block text-xs font-mono uppercase text-gray-500 mb-2 group-focus-within:text-yellow-500 transition-colors">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-2 text-xl font-sans focus:outline-none focus:border-yellow-500 transition-colors text-white placeholder-white/20"
                placeholder="john@company.com"
              />
            </div>

            <div className="group">
              <label className="block text-xs font-mono uppercase text-gray-500 mb-2 group-focus-within:text-yellow-500 transition-colors">Project Details</label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-2 text-xl font-sans focus:outline-none focus:border-yellow-500 transition-colors text-white placeholder-white/20 resize-none"
                placeholder="I need a new web platform..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-4 border border-white/20 text-white font-mono text-xs sm:text-sm uppercase py-3 sm:py-4 px-6 sm:px-8 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300 flex justify-between items-center group disabled:opacity-50"
            >
              <span>{status === 'loading' ? 'Transmitting...' : status === 'success' ? 'Message Sent!' : 'Transmit Message'}</span>
              <span className="group-hover:translate-x-2 transition-transform">-&gt;</span>
            </button>

            {status === 'error' && (
              <p className="text-red-500 text-sm font-mono">Error sending message. Please try again.</p>
            )}
          </form>
        </div>
      </div>

      <div className="absolute bottom-6 w-full left-0 px-8 md:px-12 flex justify-between text-[10px] md:text-xs font-mono text-gray-700 uppercase">
        <Link href="/legal/privacy" className="hover:text-yellow-500 transition-colors hidden md:inline">Privacy Policy</Link>
        <Link href="/legal/terms" className="hover:text-yellow-500 transition-colors hidden md:inline">Terms of Service</Link>
        <span className="ml-auto">© 2024 Pixdyne Inc.</span>
      </div>
    </div>
  );
};
