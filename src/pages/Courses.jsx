import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import useCourseFilter from '../hooks/useCourseFilter'
import useHydrated from '../hooks/useHydrated'
import { courses, getSchoolBySlug, groupBySchool } from '../lib/courses'
import { schools } from '../data/schools'
import { heroImage } from '../data/media'
import CourseSearch from '../components/courses/CourseSearch'
import CourseTable from '../components/courses/CourseTable'
import SchoolNav from '../components/courses/SchoolNav'
import Seo from '../components/shared/Seo'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'

/**
 * The full catalogue: one table per school.
 *
 * This is a fee table, and it is presented as one. Eighty-six courses as cards gave each
 * course a frame four times the size of its content and left nothing aligned; as rows, the
 * fees sit in a single column and the catalogue can actually be compared and scanned.
 *
 * The URL drives the filter rather than mirroring it: /courses#<school> selects a school and
 * /courses?q=<term> seeds the search, so a filtered catalogue can be linked to, bookmarked
 * and reached with the back button. The homepage hero uses both.
 *
 * The page is prerendered with no hash and no query, so neither is read until after
 * hydration — see useHydrated.
 */
export default function Courses() {
  const hydrated = useHydrated()
  const { hash } = useLocation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // `null` means the visitor has not typed yet, so a term carried in the URL still applies.
  // An empty string means they cleared the box, which must beat whatever the URL said.
  const [typed, setTyped] = useState(null)

  const schoolSlug = (hydrated && getSchoolBySlug(hash.replace('#', ''))?.slug) || 'all'
  const query = typed ?? (hydrated ? (searchParams.get('q') ?? '') : '')
  const results = useCourseFilter({ query, schoolSlug })

  const setSchoolSlug = (slug) => {
    // Lock in whatever is in the search box before navigating, so changing school does not
    // silently discard a term that came from the URL.
    setTyped(query)
    navigate(slug === 'all' ? '/courses' : `/courses#${slug}`)
  }

  const isFiltered = query.trim() !== '' || schoolSlug !== 'all'

  const reset = () => {
    setTyped('')
    navigate('/courses')
  }

  const groups = groupBySchool(results)

  return (
    <>
      <Seo path="/courses" />

      <PageHeader title="Courses at Motech" image={{ src: heroImage.src }}>
        {courses.length} courses across {schools.length} schools, from two-week short courses to
        eighteen-month diplomas. Entry requirement, duration and fees are listed for every level.
      </PageHeader>

      <Section>
        <div className="grid min-w-0 gap-x-10 gap-y-6 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-3">
            {/* Sticky on every size, but it earns it most on a phone: the catalogue is long
                and this keeps a one-tap route to any school within reach the whole way down. */}
            <div className="glass sticky top-18 z-20 -mx-4 border-b border-line px-4 py-2 sm:-mx-6 sm:px-6 lg:top-24 lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-filter-none">
              <SchoolNav
                schoolSlug={schoolSlug}
                onSchoolChange={setSchoolSlug}
                total={courses.length}
              />
            </div>
          </div>

          <div className="min-w-0 lg:col-span-9">
            <CourseSearch query={query} onQueryChange={setTyped} resultCount={results.length} />

            {groups.length === 0 ? (
              <div className="mt-8 rounded-xl border border-line glass-card p-8 text-center">
                <h2 className="text-lg font-bold text-head">No courses match that search</h2>
                <p className="mx-auto mt-2 max-w-md text-muted">
                  Try a different word, or clear the filters to see all {courses.length} courses.
                  The institute can also tell you about programmes not listed here.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <Button onClick={reset}>Clear filters</Button>
                  <Button to="/contact" variant="outline">
                    Ask about a course
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-8 flex flex-col gap-10">
                {groups.map(({ school, courses: list }) => (
                  <section key={school.slug} id={school.slug} className="scroll-mt-24">
                    <div
                      className="flex items-start gap-3 border-l-4 pl-4"
                      style={{ borderColor: school.tint }}
                    >
                      <div className="min-w-0 flex-1">
                        <h2
                          id={`${school.slug}-heading`}
                          className="text-lg font-bold text-head"
                        >
                          {school.name}
                        </h2>
                        <p className="mt-0.5 text-sm text-muted">
                          {list.length === 1 ? '1 course' : `${list.length} courses`}
                          {school.blurb ? ` · ${school.blurb}` : ''}
                          {school.examiner ? ` Examined by ${school.examiner}.` : ''}
                        </p>
                      </div>
                      {school.image ? (
                        <img
                          src={school.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          width="128"
                          height="72"
                          className="hidden h-16 w-28 shrink-0 rounded-lg object-cover sm:block"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="grid size-9 shrink-0 place-items-center rounded-lg text-white"
                          style={{ background: school.tint }}
                        >
                          <school.icon className="size-4.5" />
                        </span>
                      )}
                    </div>

                    <div className="mt-4">
                      <CourseTable school={school} courses={list} />
                    </div>
                  </section>
                ))}
              </div>
            )}

            {isFiltered && groups.length > 0 && (
              <div className="mt-8">
                <Button onClick={reset} variant="outline">
                  Show all {courses.length} courses
                </Button>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
