import { siteConfig } from '../../config/site'
import { FEE_UNIT_LABEL, formatFee } from '../../lib/courses'
import Tag from '../ui/Tag'

/**
 * The facts panel on a course page.
 *
 * A course may be offered at several levels with different entry requirements, durations,
 * fees and even examining bodies, so the levels are a table: that is the shape the brochure
 * states them in, and it is the shape that lets a reader compare a diploma against its
 * certificate without scrolling between two panels.
 *
 * A cell the brochure leaves blank is shown as an explicit prompt to ask, never as a value
 * and never silently dropped, so a visitor can tell "this runs 18 months" from "we have not
 * published how long this runs".
 *
 * Columns that would be empty for every level — the level name on an unlevelled short
 * course, the term count outside the School of ICT — are left out rather than rendered as a
 * column of dashes.
 *
 * Below 40rem the same markup restacks into one block per level — see `.table-stack` in
 * src/index.css, which is why every cell carries a `data-label`.
 */
const AskUs = () => <span className="text-muted italic">Ask when you enquire</span>

const cell = 'px-3 py-3 text-sm align-top first:pl-4 last:pr-4'
const head =
  'px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted first:pl-4 last:pr-4'

function Row({ label, children }) {
  return (
    <div className="grid gap-1 border-b border-line py-3 last:border-b-0 sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-semibold text-muted">{label}</dt>
      <dd className="sm:col-span-2">{children}</dd>
    </div>
  )
}

export default function CourseFacts({ course }) {
  const { levels, examinerLabel, covers } = course

  const showLevel = levels.some((level) => level.level)
  const showTerms = levels.some((level) => level.terms)
  // Where the levels are examined by different bodies — the Public Relations diploma is
  // ICM / JP-UK while its certificate is KNEC — the examiner belongs in the table, not blended
  // into one line that names the bodies involved but not which one is yours.
  const showExaminer = new Set(levels.map((level) => level.examiner)).size > 1

  const units = new Set(levels.map((level) => level.fee?.unit ?? null))
  const sharedUnit = units.size === 1 ? [...units][0] : undefined
  const feeHeading = sharedUnit ? `Fees ${FEE_UNIT_LABEL[sharedUnit] ?? ''}`.trim() : 'Fees'

  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-x-auto rounded-xl border border-line glass-card">
        <table className="table-stack w-full border-collapse">
          <caption className="sr-only">
            {course.name}: entry requirement, duration and {feeHeading.toLowerCase()}
            {levels.length > 1 ? ', for each level it is offered at' : ''}.
          </caption>
          <thead>
            <tr className="border-b border-line bg-white/5">
              {showLevel && (
                <th scope="col" className={head}>
                  Level
                </th>
              )}
              <th scope="col" className={head}>
                Entry requirement
              </th>
              <th scope="col" className={head}>
                Duration
              </th>
              {showTerms && (
                <th scope="col" className={head}>
                  Terms
                </th>
              )}
              {showExaminer && (
                <th scope="col" className={head}>
                  Examined by
                </th>
              )}
              <th scope="col" className={`${head} text-right`}>
                {feeHeading}
              </th>
            </tr>
          </thead>
          <tbody>
            {levels.map((level, index) => (
              <tr key={level.level ?? index} className="border-t border-line first:border-t-0">
                {showLevel && (
                  <th scope="row" className={`${cell} text-left font-semibold text-head`}>
                    {level.level ?? '—'}
                  </th>
                )}
                <td data-label="Entry requirement" className={`${cell} text-ink`}>
                  {level.requirement?.full ?? <AskUs />}
                </td>
                <td data-label="Duration" className={`${cell} text-ink`}>
                  {level.duration ?? <AskUs />}
                </td>
                {showTerms && (
                  <td data-label="Terms" className={`${cell} text-ink`}>
                    {level.terms ?? '—'}
                  </td>
                )}
                {showExaminer && (
                  <td data-label="Examined by" className={`${cell} text-ink`}>
                    {level.examiner ?? <AskUs />}
                  </td>
                )}
                <td
                  data-label={feeHeading}
                  className={`${cell} text-right font-semibold whitespace-nowrap text-head`}
                >
                  {formatFee(level.fee, { withUnit: sharedUnit === undefined }) ?? <AskUs />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dl className="rounded-xl border border-line glass-card px-6">
        {!showExaminer && <Row label="Examining body">{examinerLabel ?? <AskUs />}</Row>}
        <Row label="Study modes">
          <span className="flex flex-wrap gap-2">
            {siteConfig.studyModes.map((mode) => (
              <Tag key={mode}>{mode}</Tag>
            ))}
          </span>
        </Row>
        {covers?.length > 0 && (
          <Row label="What it covers">
            <span className="flex flex-wrap gap-2">
              {covers.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </span>
          </Row>
        )}
      </dl>
    </div>
  )
}
