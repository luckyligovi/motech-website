import { siteConfig } from '../config/site'
import { courseBlurb, courses, isCourseIndexable } from '../lib/courses'

/**
 * Single source of per-route SEO metadata.
 *
 * Both the client <Seo> component and the build-time prerender read from here, so the title,
 * description and robots directive of a page can never drift between what React renders and
 * what the static HTML ships.
 */

const BASE_DESCRIPTION =
  'Motech Technology Training Institute, Nairobi CBD: 86 courses across 14 schools in accountancy, business, ICT, hospitality, cosmetology, health, engineering and languages. Entry requirements, durations and fees listed. Intake ongoing.'

// Static routes. Keep in step with src/routes.jsx.
const staticMeta = {
  '/': { title: null, description: BASE_DESCRIPTION },
  '/about': {
    title: 'About us',
    description:
      'Motech Technology Training Institute is a TVETA-registered technical and vocational college on Tom Mboya Street, Nairobi CBD, teaching 86 courses across 14 schools. Its vision, mission, values and facilities.',
  },
  '/courses': {
    title: 'Courses',
    description:
      '86 courses at Motech Technology Training Institute, Nairobi, across 14 schools, with entry requirements, duration, examining body and fees listed for every level.',
  },
  '/admissions': {
    title: 'Admissions',
    description:
      'How to join Motech Technology Training Institute, Nairobi: admission requirements, the documents to bring, the KSh 1,000 registration fee, payment details and class times. Intake ongoing.',
  },
  '/apply': {
    title: 'Apply',
    description:
      'Apply for a course at Motech Technology Training Institute over WhatsApp. Choose your course and level, and the application opens in WhatsApp ready to send. Intake ongoing.',
  },
  '/student-life': {
    title: 'Student life',
    description:
      'Student life at Motech Technology Training Institute, Nairobi: hostels, free WiFi, a prayer room, organised religious groups, industrial attachment and three daily class sessions.',
  },
  '/contact': {
    title: 'Contact',
    description:
      'Call, WhatsApp, email or visit Motech Technology Training Institute on the 8th floor of Mwalimu Co-op House, Tom Mboya Street, Nairobi CBD. Class times and contact details.',
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
        description: [
          `${course.name} at Motech Technology Training Institute, Nairobi.`,
          courseBlurb(course),
          [course.levelLabel, course.durationLabel, course.feeLabel].filter(Boolean).join(' · '),
        ]
          .filter(Boolean)
          .join(' '),
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
