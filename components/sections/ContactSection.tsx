'use client';

// /contact destination layout. Reconceived from the previous "sticky-
// section closer" form into a proper destination page after the May
// 2026 design review flagged the prior version as "mechanically moved,
// not redesigned" — vestigial small logo at the bottom of the left
// column, redundant "Contact" section eyebrow above an H1 that already
// says "Let's Talk.", form max-w-md floating with no equal weight to
// the heading column. This file now expects to render inside
// app/contact/page.tsx and owns the page's vertical rhythm.

import React, { useState, useRef } from 'react';
import { BUSINESS, BUSINESS_FORMATTED } from '@/lib/data/business';

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
    if (status === 'loading') return;
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
    <section
      className="w-full px-6 md:px-12 lg:px-16 pb-24 md:pb-32"
      aria-label="Contact form"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero block — H1 only, no section eyebrow. The H1 carries the
            full editorial voice; an eyebrow above it would be a second
            label competing for the same role. */}
        <header className="mb-16 md:mb-24 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-serif italic leading-[0.95] text-brand-text mb-8">
            Let&apos;s talk.
          </h1>
          <p className="text-lg md:text-xl text-brand-muted leading-relaxed max-w-2xl">
            Tell us about the workflow you want upgraded, the system you want
            built, or the website you need shipped. We come back with a scope,
            timeline, and quote within a few business days.
          </p>
        </header>

        {/* Body — two columns with weight balance. Left: form (the
            primary call to action on this page). Right: direct contact
            info for visitors who prefer email or phone. Reversed from
            the previous layout so the form is now the dominant column
            and lives on the left under the heading, matching the H1's
            left alignment. */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 md:gap-16 lg:gap-24">
          {/* Left — form */}
          <form
            ref={formRef}
            className="flex flex-col gap-8"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Send a project brief"
          >
            <div className="group">
              <label
                htmlFor="contact-name"
                className="block text-sm text-brand-muted mb-3 group-focus-within:text-brand-yellow transition-colors"
              >
                Your name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                autoComplete="name"
                maxLength={100}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-3 text-2xl md:text-3xl font-sans focus:outline-none focus:border-brand-yellow transition-colors text-brand-text placeholder-brand-text/20"
                placeholder="John Doe"
                aria-required="true"
              />
            </div>

            <div className="group">
              <label
                htmlFor="contact-email"
                className="block text-sm text-brand-muted mb-3 group-focus-within:text-brand-yellow transition-colors"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                autoComplete="email"
                maxLength={254}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-3 text-2xl md:text-3xl font-sans focus:outline-none focus:border-brand-yellow transition-colors text-brand-text placeholder-brand-text/20"
                placeholder="john@company.com"
                aria-required="true"
              />
            </div>

            <div className="group">
              <label
                htmlFor="contact-message"
                className="block text-sm text-brand-muted mb-3 group-focus-within:text-brand-yellow transition-colors"
              >
                Tell us about the project
              </label>
              <textarea
                id="contact-message"
                rows={5}
                required
                maxLength={2000}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-3 text-xl md:text-2xl font-sans focus:outline-none focus:border-brand-yellow transition-colors text-brand-text placeholder-brand-text/20 resize-none leading-relaxed"
                placeholder="What are you trying to build, ship, or fix?"
                aria-required="true"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="self-start mt-4 border border-white/20 text-brand-text text-sm uppercase tracking-widest py-4 px-10 hover:bg-brand-yellow-hover hover:text-brand-black hover:border-brand-yellow-hover active:scale-[0.98] transition-all duration-300 inline-flex items-center gap-6 group disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              aria-label={
                status === 'loading'
                  ? 'Sending message'
                  : status === 'success'
                  ? 'Message sent successfully'
                  : 'Send message'
              }
            >
              <span>
                {status === 'loading'
                  ? 'Sending...'
                  : status === 'success'
                  ? 'Message sent'
                  : 'Send message'}
              </span>
              <span
                className="group-hover:translate-x-2 transition-transform"
                aria-hidden="true"
              >
                →
              </span>
            </button>

            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {status === 'success' &&
                'Your message has been sent successfully. We will get back to you soon.'}
              {status === 'error' &&
                'There was an error sending your message. Please try again.'}
              {status === 'loading' && 'Sending your message...'}
            </div>

            {status === 'error' && (
              <p className="text-brand-error text-sm" role="alert">
                Error sending message. Please try again.
              </p>
            )}

            {status === 'success' && (
              <p className="text-brand-success text-sm" role="status">
                Message sent. We&apos;ll be in touch within a few business days.
              </p>
            )}
          </form>

          {/* Right — direct contact options, secondary to the form but
              given enough weight that visitors who prefer email or
              phone have a clear path. Editorial typography: serif
              italic small labels above each block. */}
          <aside className="flex flex-col gap-10 lg:gap-12 lg:border-l lg:border-white/10 lg:pl-12">
            <div>
              <h2 className="font-serif italic text-brand-yellow text-2xl md:text-3xl mb-4">
                Or write to us
              </h2>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="block text-base md:text-lg text-brand-text hover:text-brand-yellow-hover transition-colors"
              >
                {BUSINESS.email}
              </a>
              <a
                href={`tel:${BUSINESS.phone.tel}`}
                className="block text-base md:text-lg text-brand-text hover:text-brand-yellow-hover transition-colors mt-1"
              >
                {BUSINESS.phone.display}
              </a>
            </div>

            <div>
              <h2 className="font-serif italic text-brand-yellow text-2xl md:text-3xl mb-4">
                Where we are
              </h2>
              <address className="not-italic text-base md:text-lg text-brand-text leading-relaxed">
                {BUSINESS.address.street}
                <br />
                {BUSINESS.address.locality}, {BUSINESS.address.region}{' '}
                {BUSINESS.address.postalCode}
                <br />
                {BUSINESS.address.country}
              </address>
              <p className="mt-4 text-xs text-brand-muted/70 tracking-wider">
                {BUSINESS_FORMATTED.abnLabel}
              </p>
            </div>

            <p className="text-sm text-brand-muted leading-relaxed max-w-xs">
              We reply during AEST business hours. Out-of-hours messages land
              in the same inbox.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};
