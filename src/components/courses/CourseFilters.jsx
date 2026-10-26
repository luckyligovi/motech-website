import { Search, X } from 'lucide-react'
import { categories } from '../../data/categories'

// The radio inside each chip is visually hidden, so the focus ring is drawn on the label.
const chipClass = (isActive) =>
  `cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-accent ${
    isActive
      ? 'border-navy-950 bg-navy-950 text-white'
      : 'border-line bg-white text-navy-800 hover:border-navy-800/40'
  }`

/**
 * Search box and category chips for the catalogue.
 *
 * The chips are a radio group rather than buttons: only one category applies at a time, and
 * radio semantics give keyboard users arrow-key movement between them for free. The active
 * chip is marked by its checked state, not by colour alone.
 */
export default function CourseFilters({
  query,
  onQueryChange,
  categorySlug,
  onCategoryChange,
  resultCount,
}) {
  const options = [{ slug: 'all', name: 'All courses' }, ...categories]

  return (
    <div className="flex flex-col gap-5">
      <div className="relative max-w-md">
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
          placeholder="Search by course name"
          className="h-12 w-full rounded-full border border-line bg-white pr-11 pl-12 text-base text-ink placeholder:text-muted focus:border-navy-800 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            aria-label="Clear search"
            className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-paper hover:text-ink"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        )}
      </div>

      <fieldset>
        <legend className="sr-only">Filter by subject area</legend>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <label key={option.slug} className={chipClass(categorySlug === option.slug)}>
              <input
                type="radio"
                name="course-category"
                value={option.slug}
                checked={categorySlug === option.slug}
                onChange={() => onCategoryChange(option.slug)}
                className="sr-only"
              />
              {option.name}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Announced to screen readers when filtering changes the list. */}
      <p aria-live="polite" className="text-sm text-muted">
        {resultCount === 1 ? '1 course' : `${resultCount} courses`}
      </p>
    </div>
  )
}
