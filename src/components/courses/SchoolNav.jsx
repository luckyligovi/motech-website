import { schools } from '../../data/schools'
import { groupBySchool } from '../../lib/courses'

/**
 * The school index beside the catalogue.
 *
 * A radio group rather than buttons: only one school applies at a time, and radio semantics
 * give keyboard users arrow-key movement through the list for free. The active item is marked
 * by its checked state, not by colour alone.
 *
 * One piece of markup serves both layouts — a horizontal scroller on a phone, a sticky
 * vertical list from `lg` up — so the two can never drift apart.
 *
 * Counts are of the whole catalogue, not the current results, so the numbers stay still while
 * someone types rather than flickering under the cursor.
 */
const totals = new Map(groupBySchool().map(({ school, courses }) => [school.slug, courses.length]))
const options = [{ slug: 'all', name: 'All courses' }, ...schools]

export default function SchoolNav({ schoolSlug, onSchoolChange, total }) {
  return (
    <fieldset>
      <legend className="sr-only">Filter by school</legend>
      <ul className="scroll-row fade-trailing -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0 lg:pb-0 lg:[mask-image:none]">
        {options.map(({ slug, name, tint }) => {
          const isActive = schoolSlug === slug
          const count = slug === 'all' ? total : (totals.get(slug) ?? 0)
          return (
            <li key={slug} className="shrink-0 lg:shrink">
              <label
                className={`flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 text-sm whitespace-nowrap transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent lg:min-h-0 lg:px-3 lg:py-2 lg:whitespace-normal ${
                  isActive
                    ? 'border-accent/50 bg-accent/15 font-semibold text-head'
                    : 'border-transparent text-ink hover:bg-white/[0.06]'
                }`}
              >
                <input
                  type="radio"
                  name="course-school"
                  value={slug}
                  checked={isActive}
                  onChange={() => onSchoolChange(slug)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ background: tint ?? 'var(--color-accent)' }}
                />
                <span className="flex-1">{name}</span>
                <span
                  className={`text-xs tabular-nums ${isActive ? 'text-accent' : 'text-muted'}`}
                >
                  {count}
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}
