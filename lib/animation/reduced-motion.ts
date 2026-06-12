/**
 * Returns true when the user has requested reduced motion at the OS level.
 *
 * GSAP animates by setting transforms in JS, so the CSS
 * `@media (prefers-reduced-motion)` rule in globals.css does not stop it. Each
 * GSAP-driven component calls this at the top of its effect and early-returns
 * when true — the animations simply never register, and because every entrance
 * uses `gsap.from(...)` (animating *to* the element's natural state), skipping
 * them leaves the content fully visible rather than hidden.
 *
 * SSR-safe: returns false when `window` is unavailable.
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
