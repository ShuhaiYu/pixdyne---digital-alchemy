# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run Next.js linting
```

## Architecture

This is a Next.js 16 App Router project for the Pixdyne digital agency website. It uses React 19, Tailwind CSS 4, GSAP for animations, and shadcn/ui components.

### Sticky Scroll System

The homepage uses a stacked sticky section architecture where each section pins to the viewport as users scroll, creating a layered reveal effect. This is implemented through:

- **`StickySection`** (`components/layout/StickySection.tsx`): Wrapper component that applies `position: sticky; top: 0` with configurable z-index ordering. Each section stacks on top of previous sections as the user scrolls.
- **Transition types**: `curtain`, `parallax`, `mask-diagonal`, `pixel-glitch` - controlled via GSAP ScrollTrigger
- **Z-index management**: Sections must have incrementing z-index values (10, 15, 20, 30, etc.) to properly layer

### Page Composition Pattern

The homepage (`app/page.tsx`) composes sections by wrapping each in `StickySection` with specific z-index and transition settings. Each section component in `components/sections/` is self-contained.

### Data Layer

Static data lives in `lib/data/`:
- `services.ts` - Service offerings
- `case-studies.ts` - Portfolio items
- `team.ts` - Team members
- `blog.ts` - Blog posts

Types for all data structures are centralized in `types/index.ts`.

### Component Organization

- `components/layout/` - Layout primitives (Navigation, StickySection)
- `components/sections/` - Full page sections (Hero, Services, Team, etc.)
- `components/ui/` - shadcn/ui components (add with `npx shadcn@latest add <component>`)
- `components/LogoLoop.tsx` - Animated logo marquee with requestAnimationFrame-based smooth scrolling

### Styling

- Uses Tailwind CSS 4 with CSS variables
- shadcn/ui configured with "new-york" style and neutral base color
- React Bits registry available: `npx shadcn@latest add @react-bits/<component>`
- Custom utility: `cn()` from `lib/utils.ts` for conditional class merging

### Fonts

Two Google Fonts loaded in `app/layout.tsx`:
- Playfair Display (`--font-playfair`) - Display/heading font
- Space Grotesk (`--font-space`) - Body font

### Path Aliases

`@/*` maps to project root (configured in tsconfig.json)
