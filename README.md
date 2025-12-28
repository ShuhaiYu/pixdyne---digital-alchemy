# Pixdyne - Digital Alchemy

## About Pixdyne

Pixdyne is a cutting-edge digital agency specializing in transforming businesses through innovative technology solutions. We blend creativity with technical expertise to deliver exceptional digital experiences that drive growth and engagement.

### Our Mission

To be the alchemists of the digital realm — transforming raw ideas into golden digital experiences. We believe in the power of design, code, and strategy working in harmony to create solutions that exceed expectations.

### What We Do

- **Brand & Identity** — Crafting distinctive visual identities that resonate
- **Web Development** — Building high-performance, scalable web applications
- **Digital Strategy** — Data-driven approaches to digital transformation
- **UI/UX Design** — User-centered design that converts and delights

### Our Clients

We partner with industry leaders across finance, technology, healthcare, and media sectors, delivering enterprise-grade solutions with startup agility.

## Project Background

This repository contains the official Pixdyne website — a showcase of our capabilities and philosophy. The site itself demonstrates our commitment to performance, aesthetics, and modern web standards.

Key design principles:
- **Performance First** — Optimized for Core Web Vitals
- **Visual Excellence** — Cinematic animations and premium aesthetics
- **Accessibility** — WCAG compliant, keyboard navigable
- **Scalability** — Modular architecture for easy maintenance

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19
- **Styling:** Tailwind CSS 4
- **Animations:** GSAP (GreenSock)
- **Components:** shadcn/ui + React Bits
- **Icons:** Lucide React
- **Language:** TypeScript

## Features

- Sticky scroll sections with smooth transitions
- Animated logo marquee (LogoLoop)
- Interactive 3D profile cards
- GSAP-powered scroll animations
- Responsive design
- SEO optimized with sitemap and robots.txt
- Contact form API

## Pages

- `/` - Home (Hero, Services, Team, Blog, Contact)
- `/services/[slug]` - Service detail pages
- `/work/[slug]` - Case study pages
- `/blog/[slug]` - Blog posts
- `/legal/privacy` - Privacy policy
- `/legal/terms` - Terms of service

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── services/          # Service pages
│   ├── work/              # Case study pages
│   └── legal/             # Legal pages
├── components/
│   ├── layout/            # Layout components (Navigation, StickySection)
│   ├── sections/          # Page sections (Hero, Services, Team, etc.)
│   └── ui/                # UI components (shadcn)
├── lib/
│   ├── data/              # Static data (services, team, blog)
│   └── seo/               # SEO utilities
├── public/                # Static assets
│   └── logos/             # Client logos
└── types/                 # TypeScript types
```

## Environment Variables

Create a `.env.local` file:

```env
# Add your environment variables here
```

## License

Private - All rights reserved.
