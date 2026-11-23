import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { FEE_UNIT_LABEL, formatFee } from '../../lib/courses'

/**
 * One school's courses as a table.
 *
 * The brochure this data comes from is a fee table, and so is this. A visitor choosing
 * between Java at 6,000 and Python at 8,000 wants them on adjacent rows with the figures in
 * one column — not in adjacent cards, where the eye has to travel and nothing lines up.
 *
 * A course offered at several levels spans its name down a row group, so each level keeps its
 * own entry requirement, duration and fee, exactly as the brochure sets it out.
 *
 * Each level row carries its own Apply link, pointing at the application page with that
 * course *and that level* already chosen — something the button on a course page cannot do,
 * because it does not know which level you were looking at.
 *
 * Accessibility notes:
 *   - The course name is a `<th scope="rowgroup">`, so a screen reader announces it with every
 *     level row beneath it, and the Apply link in each row is announced in that context.
 *   - The row itself is not clickable. Making a `<tr>` a link means faking it in JavaScript,
 *     which leaves it unreachable by keyboard and gives it an accessible name of the entire
 *     row's text. Two real links in the row — the name and Apply — do the same job properly,
 *     and still allow opening either in a new tab.
 *   - The horizontal scroll container is focusable and labelled, so it can be reached and
 *     scrolled from the keyboard on a narrow screen.
 *
 * Below 40rem the same markup restacks into one block per course — see `.table-stack` in
 * src/index.css. That needs a <tbody> per course and a `data-label` on every cell, which is
 * why the rows are grouped and labelled here rather than emitted as one flat list.
 */
const cell = 'px-3 py-3 text-sm align-top first:pl-4 last:pr-4'
const head = 'px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted first:pl-4 last:pr-4'

export default function CourseTable({ school, courses }) {
  // Where every fee in the school is quoted over the same period, the period moves into the
  // column header and the cells carry bare amounts, so the figures line up and compare.
  const units = new Set(courses.flatMap((c) => c.levels.map((l) => l.fee?.unit ?? null)))
  const sharedUnit = units.size === 1 ? [...units][0] : undefined
  const feeHeading = sharedUnit ? `Fees ${FEE_UNIT_LABEL[sharedUnit] ?? ''}`.trim() : 'Fees'

  return (
    // A scrollable region must be reachable and scrollable from the keyboard (WCAG 2.1.1),
    // which is exactly what tabIndex does here; the rule cannot tell the two cases apart.
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <section tabIndex="0" aria-labelledby={`${school.slug}-heading`} className="overflow-x-auto rounded-xl border border-line glass-card">
      <table className="table-stack w-full border-collapse sm:min-w-[40rem]">
        <caption className="sr-only">
          Courses in the {school.name}, with level, entry requirement, duration and{' '}
          {feeHeading.toLowerCase()}.
        </caption>
        <thead>
          <tr className="border-b border-line bg-white/5">
            <th scope="col" className={head}>
              Course
            </th>
            <th scope="col" className={head}>
              Level
            </th>
            <th scope="col" className={head}>
              Entry
            </th>
            <th scope="col" className={head}>
              Duration
            </th>
            <th scope="col" className={`${head} text-right`}>
              {feeHeading}
            </th>
            <th scope="col" className={head}>
              <span className="sr-only">Apply</span>
            </th>
          </tr>
        </thead>
        {courses.map((course) => (
          <tbody key={course.slug}>
            {course.levels.map((level, index) => (
              <tr
                key={`${course.slug}-${level.level ?? index}`}
                className={
                  index === 0
                    ? 'border-t border-line first:border-t-0 hover:bg-white/[0.06]'
                    : 'hover:bg-white/[0.06]'
                }
              >
                {index === 0 && (
                  <th
                    scope="rowgroup"
                    rowSpan={course.levels.length}
                    className={`${cell} text-left font-semibold text-head`}
                  >
                    <Link
                      to={`/courses/${course.slug}`}
                      className="rounded underline-offset-4 hover:text-accent hover:underline"
                    >
                      {course.name}
                    </Link>
                    {course.covers?.length > 0 && (
                      <span className="mt-0.5 block text-xs font-normal text-muted">
                        {course.covers.join(', ')}
                      </span>
                    )}
                  </th>
                )}
                <td data-label="Level" className={`${cell} text-ink`}>{level.level ?? '—'}</td>
                <td data-label="Entry" className={`${cell} text-muted`}>
                  {level.requirement?.short ?? '—'}
                </td>
                <td data-label="Duration" className={`${cell} text-ink`}>
                  {level.duration ?? '—'}
                </td>
                <td
                  data-label={feeHeading}
                  className={`${cell} text-right font-semibold whitespace-nowrap text-head`}
                >
                  {formatFee(level.fee, { withUnit: sharedUnit === undefined }) ?? '—'}
                </td>
                <td data-label="" className={`${cell} text-right`}>
                  <Link
                    to={`/apply?course=${course.slug}&level=${index}`}
                    className="inline-flex items-center gap-1 rounded font-semibold whitespace-nowrap text-accent underline-offset-4 hover:underline"
                  >
                    Apply
                    <span className="sr-only">
                      {' '}
                      for {course.name}
                      {level.level ? `, ${level.level}` : ''}
                    </span>
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </section>
  )
}
