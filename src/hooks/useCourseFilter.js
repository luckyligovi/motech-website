import { useMemo, useState } from 'react'
import { courses } from '../data/courses'
import { getCategoryBySlug } from '../lib/courses'

const normalise = (value) => value.toLowerCase().trim()

/**
 * Search and category filtering for the catalogue.
 *
 * Derived values are computed during render rather than mirrored into state, so the list
 * cannot fall out of step with the query. `query` and `categorySlug` are the only state.
 */
export default function useCourseFilter(initialCategory = 'all') {
  const [query, setQuery] = useState('')
  const [categorySlug, setCategorySlug] = useState(initialCategory)

  const results = useMemo(() => {
    const term = normalise(query)

    return courses.filter((course) => {
      if (categorySlug !== 'all' && course.category !== categorySlug) return false
      if (!term) return true

      const haystack = [
        course.name,
        course.summary,
        course.level ?? '',
        getCategoryBySlug(course.category)?.name ?? '',
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(term)
    })
  }, [query, categorySlug])

  const isFiltered = query.trim() !== '' || categorySlug !== 'all'

  const reset = () => {
    setQuery('')
    setCategorySlug('all')
  }

  return { query, setQuery, categorySlug, setCategorySlug, results, isFiltered, reset }
}
