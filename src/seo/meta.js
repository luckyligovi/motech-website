import { siteConfig } from '../config/site'
import { courses } from '../data/courses'
import { isCourseIndexable } from '../lib/courses'

/**
 * Single source of per-route SEO metadata.
 *
 * Both the client <Seo> component and the build-time prerender read from here, so the title,
 * description and robots directive of a page can never drift between what React renders and
 * what the static HTML ships.
 */

const BASE_DESCRIPTION =
  'Motech Technology Training Institute offers diploma and certificate programmes in ICT, business, accounting, health, hospitality and languages in Nairobi CBD.'

// Static routes. Keep in step with src/routes.jsx.
const staticMeta = {
  '/': { title: null, description: BASE_DESCRIPTION },
  '/about': {
    title: 'About us',
    description:
      'Motech Technology Training Institute is a technical and vocational training college in Nairobi CBD, offering diploma and certificate courses across six subject areas.',
  },
  '/courses': {
    title: 'Courses',
    description:
      'Diploma and certificate courses at Motech Technology Training Institute in Nairobi: ICT, business, accounting, health and nutrition, hospitality and languages.',
  },
  '/admissions': {
    title: 'Admissions',
    description:
      'How to join a course at Motech Technology Training Institute in Nairobi: find a course, enquire about entry requirements and fees, apply, and start.',
  },
  '/student-life': {
    title: 'Student life',
    description:
      'Studying at Motech Technology Training Institute in central Nairobi: a city-centre college with in-person and online classes.',
    // Thin until the institute supplies clubs, activities and facilities content. Flip this
    // to false (or remove it) once there is real student-life content to index.
    noindex: true,
  },
  '/contact': {
    title: 'Contact',
    description:
      'Call, email or visit Motech Technology Training Institute on Tom Mboya Street, Nairobi CBD, to ask about courses, fees, entry requirements and intakes.',
  },
}

const buildTitle = (title) =>
  title ? `${title} | ${siteConfig.shortName}` : `${siteConfig.name} | Nairobi`

const canonicalFor = (path) => (siteConfig.url ? new URL(path, siteConfig.url).href : null)

/**
 * Resolve metadata for any path, including course detail pages.
 * Returns { title, description, path, noindex, canonical }.
 */
export function metaForPath(path) {
  // Course detail page
  const courseMatch = path.match(/^\/courses\/([^/]+)\/?$/)
  if (courseMatch) {
    const course = courses.find((c) => c.slug === courseMatch[1])
    if (course) {
      return {
        title: buildTitle(course.name),
        description: `${course.name} at Motech Technology Training Institute, Nairobi. ${course.summary}`,
        path: `/courses/${course.slug}`,
        noindex: !isCourseIndexable(course),
        canonical: canonicalFor(`/courses/${course.slug}`),
      }
    }
  }

  const entry = staticMeta[path.replace(/\/$/, '') || '/']
  if (entry) {
    return {
      title: buildTitle(entry.title),
      description: entry.description,
      path,
      // A page may opt out of indexing explicitly (e.g. a page still short of content).
      noindex: entry.noindex ?? !siteConfig.indexable,
      canonical: canonicalFor(path),
    }
  }

  // Unknown path (404)
  return {
    title: buildTitle('Page not found'),
    description: 'The page you were looking for could not be found.',
    path,
    noindex: true,
    canonical: null,
  }
}

/** Every path that should be prerendered and listed in the sitemap, with its indexability. */
export function allRoutes() {
  const staticPaths = Object.keys(staticMeta)
  const coursePaths = courses.map((c) => `/courses/${c.slug}`)
  return [...staticPaths, ...coursePaths].map((path) => {
    const meta = metaForPath(path)
    return { path, indexable: !meta.noindex }
  })
}
