# Pixdyne Design Context

## Target Audience
Small-to-medium businesses and startups in Melbourne and globally seeking premium digital services (web dev, app dev, SEO, IT support).

## Brand Personality
**Technical & sharp** — engineering precision, high contrast, systematic, data-driven feel. Not playful, not corporate — confident and precise.

## Color Direction
**High contrast dark foundation** with a distinctive gold accent.

### Palette
| Token | Hex | Role |
|-------|-----|------|
| `--color-brand-yellow` | `#C8962A` | Dark gold / brass — primary accent |
| `--color-brand-yellow-hover` | `#D4A83A` | Brighter gold — hover/active states |
| `--color-brand-black` | `#0B0A08` | Warm near-black — primary dark bg |
| `--color-brand-surface` | `#151311` | Warm dark gray — elevated surfaces |
| `--color-brand-white` | `#F5F2ED` | Warm off-white — light section bg |
| `--color-brand-text` | `#E8E4DD` | Warm cream — primary text on dark |
| `--color-brand-muted` | `#8A847B` | Warm gray — secondary text |
| `--color-brand-light` | `#E5E0D8` | Warm light gray — alternate light bg |

### Secondary Accent
- Bronze `#9B6B3E` used for team member differentiation (warm complement to gold)
- Shine highlight: `#D4AB7A` (lighter bronze)

### Key Decisions
- Yellow is core to the brand but shifted from generic Tailwind yellow-500 (#EAB308) to a deeper, more amber dark gold (#C8962A)
- All blacks are warm-tinted (dark chocolate, not sterile)
- All whites are warm off-whites (parchment, not clinical)
- Grays are warm-tinted throughout

## Typography
- **Display/heading:** Playfair Display (serif, italic)
- **Body:** Space Grotesk (sans-serif)
- Both are good choices — distinctive, not overused.

## Design Constraints
- Next.js 16 App Router, React 19, Tailwind CSS 4
- GSAP for scroll animations, Three.js for WebGL effects
- Sticky scroll section architecture with layered reveals
