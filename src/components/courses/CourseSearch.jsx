import { Search, X } from 'lucide-react'

/**
 * The catalogue's search box.
 *
 * Matching runs over each course's prebuilt search string, which includes the wording the
 * brochure uses, so someone typing what is printed on paper still finds the course.
 */
export default function CourseSearch({ query, onQueryChange, resultCount }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <div className="relative min-w-0 flex-1 sm:max-w-md">
        <label htmlFor="course-search" className="sr-only">
          Search courses
        </label>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted"
        />
        <input
          id="course-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by course, subject or tool"
          className="h-12 w-full rounded-full border border-line glass-card pr-11 pl-12 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            aria-label="Clear search"
            className="absolute top-1/2 right-1 grid size-11 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-white/10 hover:text-ink"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        )}
      </div>

      {/* Announced to screen readers when filtering changes the list. */}
      <p aria-live="polite" className="text-sm font-medium text-muted">
        {resultCount === 1 ? '1 course' : `${resultCount} courses`}
      </p>
    </div>
  )
}
