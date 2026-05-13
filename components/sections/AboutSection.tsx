// /about destination. Company-level introduction — Pixdyne's history,
// what we deliver, how we partner. Deliberately omits any individual
// team member identity (CLAUDE.md §6 rule 1) and any fabricated
// metrics (§6 rule 3). The voice is the same warm-dark editorial
// register the rest of the site uses.

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const PILLARS: { title: string; body: string }[] = [
  {
    title: 'Long-term partnership.',
    body:
      'Not a build-and-leave shop. We embed in the business lines we work with and grow alongside them. Several of our retainers have run continuously since 2018.'
  },
  {
    title: 'Proven evolution.',
    body:
      'WordPress and Shopify projects, NetSuite deployments, bespoke CRM systems, mobile apps for iOS and Android, ongoing operations after launch. We move when the work moves.'
  },
  {
    title: 'AI built for clients, not for us.',
    body:
      'We do not pitch AI as our internal accelerator. We deliver AI capability into your business. OnlyPixAI is the public proof — a unified AI gateway we ship and operate ourselves.'
  }
];

const CAPABILITIES: { href: string; title: string; description: string }[] = [
  {
    href: '/services/web-development',
    title: 'Web Development',
    description: 'WordPress, Shopify, Webflow, Squarespace, or fully custom. Design through launch and beyond.'
  },
  {
    href: '/services/system-development',
    title: 'System Development',
    description: 'NetSuite, Salesforce, HubSpot, bespoke CRMs, internal tools, and iOS / Android apps.'
  },
  {
    href: '/services/operations',
    title: 'Operations',
    description: 'Managed IT, ongoing SEO and content, and continuous development after launch.'
  },
  {
    href: '/services/onlypixai',
    title: 'OnlyPixAI',
    description: 'Our flagship product: 100+ LLMs through one billed-once pipeline, live at onlypixai.com.'
  }
];

export const AboutSection: React.FC = () => {
  return (
    <section
      className="w-full px-6 md:px-12 lg:px-16 pb-24 md:pb-32"
      aria-label="About Pixdyne"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero block */}
        <header className="mb-16 md:mb-24 max-w-5xl">
          <span className="text-brand-yellow font-mono text-xs sm:text-sm font-bold uppercase tracking-widest block mb-6">
            About
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-serif italic leading-[0.95] text-brand-text mb-10">
            We&apos;ve been at this since 2018.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-brand-muted leading-relaxed max-w-3xl">
            Pixdyne is a Melbourne-based technology partner. We build and
            operate the websites, custom systems, and AI products our clients
            put in front of their customers and teams. We stay involved long
            after launch, and we bring real AI capability into the businesses
            we partner with.
          </p>
        </header>

        {/* Pillars — three principles that anchor how we work */}
        <div className="mb-20 md:mb-28">
          <h2 className="text-2xl font-bold mb-10">What we stand for</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            {PILLARS.map((pillar, i) => (
              <div key={pillar.title}>
                <span className="text-xs font-mono text-brand-yellow tracking-widest block mb-4">
                  ({String(i + 1).padStart(2, '0')})
                </span>
                <h3 className="text-xl md:text-2xl font-serif italic text-brand-yellow mb-4 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-base text-brand-text/85 leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities — links into the service detail pages */}
        <div className="mb-20 md:mb-28">
          <h2 className="text-2xl font-bold mb-10">What we deliver</h2>
          <div className="border-t border-white/10">
            {CAPABILITIES.map((cap) => (
              <Link
                key={cap.href}
                href={cap.href}
                className="group block border-b border-white/10 py-8 md:py-10 hover:bg-brand-black/[0.4] transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-brand-text group-hover:text-brand-yellow transition-colors">
                    {cap.title}
                  </h3>
                  <ArrowUpRight
                    size={28}
                    className="text-brand-yellow flex-shrink-0 transition-transform group-hover:-rotate-12 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 text-base md:text-lg text-brand-text/75 leading-relaxed max-w-3xl">
                  {cap.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Where we are — Melbourne anchor + plain factual statement.
            Helps GEO/AI search engines pick up location signal and
            grounds the about page in the real-world business. */}
        <div className="mb-20 md:mb-28 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Where we are</h2>
            <p className="text-base md:text-lg text-brand-text/85 leading-relaxed mb-4">
              We work out of Clayton in southeast Melbourne, and we work with
              clients across the city and around Australia. Local enough to
              meet in person when it matters, set up for remote delivery when
              it does not.
            </p>
            <p className="text-base md:text-lg text-brand-text/85 leading-relaxed">
              Email and phone reach us during AEST business hours. Out-of-hours
              messages land in the same inbox.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">How we partner</h2>
            <p className="text-base md:text-lg text-brand-text/85 leading-relaxed mb-4">
              Most of our work starts with a brief and a scoping conversation.
              Build phases are written into a services agreement; ongoing work
              after launch is written into a retainer.
            </p>
            <p className="text-base md:text-lg text-brand-text/85 leading-relaxed">
              You own the code, you own the data, you can leave when it stops
              working. Most clients stay because the partnership keeps paying
              off, not because the contract locks them in.
            </p>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="border-t border-white/10 pt-10 md:pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-serif italic text-brand-text mb-4 leading-tight">
                Have a project in mind?
              </h2>
              <p className="text-base md:text-lg text-brand-muted">
                Send us a brief and we come back with a scope, timeline, and
                quote within a few business days.
              </p>
            </div>
            <Link
              href="/contact"
              className="self-start md:self-end inline-flex items-center gap-3 bg-brand-yellow text-brand-black font-bold text-sm uppercase tracking-widest py-4 px-8 hover:bg-brand-yellow-hover transition-colors flex-shrink-0"
            >
              Start a project
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
