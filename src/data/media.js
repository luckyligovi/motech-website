/**
 * Photography used on the site.
 *
 * PLACEHOLDERS — REPLACE BEFORE LAUNCH.
 * The images below are stock photographs from Unsplash standing in until Motech supplies
 * its own. They are not pictures of Motech, its premises or its students. A visitor
 * reasonably reads a photograph on an institute's website as being that institute, so
 * leaving stock imagery here at launch would misrepresent the school.
 *
 * They are also loaded from Unsplash's servers rather than from this site, which adds a
 * third-party request on every page load. Replacing them with local files in /public/images
 * fixes that too. See that folder's README.
 *
 * To swap one in:
 *   1. Put the file in /public/images with a descriptive name.
 *   2. Point `src` at '/images/<name>.jpg' and set `width`/`height` to its real pixel size,
 *      so the page does not jump while the image loads.
 *   3. Set `alt` as described below.
 */

/**
 * Background of the homepage hero.
 *
 * `alt` is deliberately empty: the photograph sits behind the headline and adds no
 * information a screen reader user needs, so it is marked decorative. Give a real photo of
 * Motech a descriptive alt instead, for example 'Students at work in a Motech computer lab'.
 *
 * Placeholder: unsplash.com/photos/woman-and-man-sitting-in-front-of-monitor-IgUR1iX0mqM
 * by @disruptxn, free under the Unsplash License.
 */
export const heroImage = {
  src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2000&h=1125&q=70',
  alt: '',
  width: 2000,
  height: 1125,
  credit: 'Desola Lanre-Ologun',
  isPlaceholder: true,
}

/**
 * Nairobi skyline, behind the "A technical training institute in Nairobi" band.
 * Placeholder, by @bepnamanh on Unsplash. Decorative, so alt is empty at the point of use.
 */
export const cityImage = {
  src: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?auto=format&fit=crop&w=2000&h=1000&q=70',
  credit: 'Amani Nation',
  isPlaceholder: true,
}
