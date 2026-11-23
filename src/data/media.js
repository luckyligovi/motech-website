/**
 * The two full-width photographs. Per-school subject photographs live on the schools
 * themselves, in src/data/schools.js.
 *
 * All are Unsplash, free for commercial use, and self-hosted as WebP — the site makes no
 * third-party image request. Sources are listed in docs/PHOTO-CREDITS.md.
 *
 * `isPlaceholder` marks a photograph that stands in for one Motech should supply. Only the
 * hero carries it: a visitor reads a photograph on an institute's website as being that
 * institute, and that one shows a computer lab which is not Motech's. The skyline is simply
 * the city the college is in, which is true either way.
 *
 * To swap one in:
 *   1. Put the file in /public/images with a descriptive name.
 *   2. Point `src` at it and set `width`/`height` to its real pixel size, so the page does
 *      not jump while it loads.
 *   3. Set `alt` as described below, and clear `isPlaceholder`.
 */

/**
 * Background of the homepage hero: a bright, full computer lab.
 *
 * Still a stock photograph, and still not a picture of Motech — but it is of a *room of the
 * kind Motech teaches in* rather than of identifiable individuals, and it is self-hosted
 * rather than fetched from Unsplash on every page load. Replace it with Motech's own
 * photograph of its own lab the moment one exists; see docs/CONTENT-TO-CONFIRM.md.
 *
 * `alt` is deliberately empty: it sits behind the headline and adds nothing a screen-reader
 * user needs. A real photograph of Motech deserves a descriptive alt instead, for example
 * 'Students at work in a Motech computer lab'.
 */
export const heroImage = {
  src: '/images/hero-computer-lab.webp',
  alt: '',
  width: 2000,
  height: 1125,
  isPlaceholder: true,
}

/**
 * The Nairobi skyline, behind the About and Student life title bands. The city the institute
 * is in, so unlike the hero this one is simply true. Self-hosted; decorative at the point of
 * use, so alt is empty there.
 */
export const cityImage = {
  src: '/images/nairobi-skyline.webp',
  isPlaceholder: false,
}
