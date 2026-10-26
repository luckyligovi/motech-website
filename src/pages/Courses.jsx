import { useEffect } from 'react'
import { useLocation } from 'react-router'
import useCourseFilter from '../hooks/useCourseFilter'
import { getCategoryBySlug } from '../lib/courses'
import CourseCard from '../components/courses/CourseCard'
import CourseFilters from '../components/courses/CourseFilters'
import Seo from '../components/shared/Seo'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'

/**
 * The catalogue is a single grid of all twelve courses, narrowed by search and the category
 * chips. Course counts per area are uneven (one area has a single course), so a flat grid
 * reads as deliberate where per-category rows would leave large gaps.
 *
 * Links from elsewhere (the homepage hero, the About page) point at /courses#<category>. The
 * hash selects that category here, so those links land on a pre-filtered catalogue.
 */
export default function Courses() {
  const { hash } = useLocation()
  const hashCategory = getCategoryBySlug(hash.replace('#', ''))?.slug

  const { query, setQuery, categorySlug, setCategorySlug, results, isFiltered, reset } =
    useCourseFilter(hashCategory ?? 'all')

  // Let a later hash change (e.g. a hero link clicked while already here) move the filter.
  useEffect(() => {
    if (hashCategory) setCategorySlug(hashCategory)
  }, [hashCategory, setCategorySlug])

  return (
    <>
      <Seo path="/courses" />

      <PageHeader title="Courses at Motech">
        Diploma and certificate programmes across six subject areas. Entry requirements, fees and
        intake dates are confirmed by the institute when you enquire.
      </PageHeader>

      <Section>
        <CourseFilters
          query={query}
          onQueryChange={setQuery}
          categorySlug={categorySlug}
          onCategoryChange={setCategorySlug}
          resultCount={results.length}
        />

        {results.length === 0 ? (
          <div className="mt-10 rounded-xl border border-line bg-white p-8 text-center">
            <h2 className="text-lg font-bold text-navy-950">No courses match that search</h2>
            <p className="mx-auto mt-2 max-w-md text-muted">
              Try a different word, or clear the filters to see all twelve courses. The institute
              can also tell you about programmes not listed here.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button onClick={reset}>Clear filters</Button>
              <Button to="/contact" variant="outline">
                Ask about a course
              </Button>
            </div>
          </div>
        ) : (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((course) => (
              <li key={course.slug}>
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
        )}

        {isFiltered && results.length > 0 && (
          <div className="mt-8">
            <Button onClick={reset} variant="outline">
              Show all courses
            </Button>
          </div>
        )}
      </Section>
    </>
  )
}
