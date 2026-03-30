'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return; // Prevent double submission
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
      <div className="flex justify-between items-start mb-6 sm:mb-8 md:mb-12">
        <span className="text-brand-yellow font-mono text-xs sm:text-sm font-bold uppercase tracking-widest">Contact</span>
      </div>

      <div className="flex-grow flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-16 lg:gap-24">

        {/* Left Column: Heading & Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif italic leading-tight mb-6 sm:mb-8 hover:text-brand-yellow-hover transition-colors duration-500">
              Let&apos;s Talk.
            </h2>
            <p className="text-brand-muted text-base sm:text-lg max-w-sm mb-6 sm:mb-8">
              Ready to upgrade your digital infrastructure? Tell us about your project, timeline, and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-sm font-mono text-brand-muted mt-6 sm:mt-8 md:mt-0">
            <div>
              <h3 className="text-white font-bold mb-2 uppercase tracking-widest">Contact</h3>
              <a href="mailto:info@pixdyne.com" className="hover:text-brand-yellow-hover transition-colors block">info@pixdyne.com</a>
              <a href="tel:+61410510751" className="hover:text-brand-yellow-hover transition-colors block">+61 410 510 751</a>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2 uppercase tracking-widest">Base</h3>
              <p>52 Monet Drive</p>
              <p>Truganina, VIC 3029</p>
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
          <form
            ref={formRef}
            className="w-full max-w-md flex flex-col gap-6"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
          >
            <div className="group">
              <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-brand-muted mb-2 group-focus-within:text-brand-yellow transition-colors">Name</label>
              <input
                id="contact-name"
                type="text"
                required
                autoComplete="name"
                maxLength={100}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-2 text-xl font-sans focus:outline-none focus:border-brand-yellow transition-colors text-white placeholder-white/20"
                placeholder="John Doe"
                aria-required="true"
              />
            </div>

            <div className="group">
              <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-brand-muted mb-2 group-focus-within:text-brand-yellow transition-colors">Email</label>
              <input
                id="contact-email"
                type="email"
                required
                autoComplete="email"
                maxLength={254}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-2 text-xl font-sans focus:outline-none focus:border-brand-yellow transition-colors text-white placeholder-white/20"
                placeholder="john@company.com"
                aria-required="true"
              />
            </div>

            <div className="group">
              <label htmlFor="contact-message" className="block text-xs font-mono uppercase text-brand-muted mb-2 group-focus-within:text-brand-yellow transition-colors">Project Details</label>
              <textarea
                id="contact-message"
                rows={3}
                required
                maxLength={2000}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-2 text-xl font-sans focus:outline-none focus:border-brand-yellow transition-colors text-white placeholder-white/20 resize-none"
                placeholder="I need a new web platform..."
                aria-required="true"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-4 border border-white/20 text-white font-mono text-xs sm:text-sm uppercase py-3 sm:py-4 px-6 sm:px-8 hover:bg-brand-yellow-hover hover:text-black hover:border-brand-yellow-hover active:scale-[0.98] transition-all duration-300 flex justify-between items-center group disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              aria-label={status === 'loading' ? 'Sending message' : status === 'success' ? 'Message sent successfully' : 'Send message'}
            >
              <span>{status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}</span>
              <span className="group-hover:translate-x-2 transition-transform" aria-hidden="true">-&gt;</span>
            </button>

            {/* Screen reader live region for form status */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {status === 'success' && 'Your message has been sent successfully. We will get back to you soon.'}
              {status === 'error' && 'There was an error sending your message. Please try again.'}
              {status === 'loading' && 'Sending your message...'}
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-sm font-mono" role="alert">
                Error sending message. Please try again.
              </p>
            )}

            {status === 'success' && (
              <p className="text-green-500 text-sm font-mono" role="status">
                Message sent successfully. We&apos;ll be in touch.
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="absolute bottom-6 w-full left-0 px-8 md:px-12 flex justify-between text-xs font-mono text-brand-muted uppercase">
        <Link href="/legal/privacy" className="hover:text-brand-yellow-hover transition-colors hidden md:inline">Privacy Policy</Link>
        <Link href="/legal/terms" className="hover:text-brand-yellow-hover transition-colors hidden md:inline">Terms of Service</Link>
        <span className="ml-auto">© 2024 Pixdyne Inc.</span>
      </div>
    </div>
  );
};
