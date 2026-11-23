import { useMemo } from 'react'
import { courses } from '../lib/courses'

/**
 * Narrows the catalogue by search term and school.
 *
 * Pure: it holds no state and owns no URL. The page decides where `query` and `schoolSlug`
 * come from — typing, the address bar, a link from the homepage — and this only filters, so
 * the rule for what matches lives in one place.
 *
 * Matching runs against each course's prebuilt `search` string (see src/lib/courses.js),
 * which folds in the course name, the brochure's own wording for it, the school, the levels,
 * the entry requirements and anything the course covers. A student searching the words
 * printed on paper therefore finds the course under the name the site publishes it as.
 */
export default function useCourseFilter({ query = '', schoolSlug = 'all' } = {}) {
  return useMemo(() => {
    const term = query.toLowerCase().trim()
    return courses.filter((course) => {
      if (schoolSlug !== 'all' && course.school.slug !== schoolSlug) return false
      return !term || course.search.includes(term)
    })
  }, [query, schoolSlug])
}
