import Tag from '../ui/Tag'

/**
 * The facts panel on a course page.
 *
 * A field the institute has not confirmed is shown as an explicit prompt to ask, never as a
 * value and never silently omitted. A visitor can then tell the difference between "this
 * course lasts two years" and "we have not published how long this course lasts".
 */
function Row({ label, children }) {
  return (
    <div className="grid gap-1 border-b border-line py-4 last:border-b-0 sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-semibold text-muted">{label}</dt>
      <dd className="sm:col-span-2">{children}</dd>
    </div>
  )
}

const AskUs = () => <span className="text-muted italic">Ask the institute when you enquire</span>

export default function CourseFacts({ course }) {
  const { level, duration, studyModes, entryRequirements, fees, examiner, qualification } = course

  return (
    <dl className="rounded-xl border border-line bg-white px-6">
      <Row label="Level">{level ?? <AskUs />}</Row>
      <Row label="Duration">{duration ?? <AskUs />}</Row>
      <Row label="Study modes">
        {studyModes?.length ? (
          <span className="flex flex-wrap gap-2">
            {studyModes.map((mode) => (
              <Tag key={mode}>{mode}</Tag>
            ))}
          </span>
        ) : (
          <AskUs />
        )}
      </Row>
      <Row label="Entry requirements">{entryRequirements ?? <AskUs />}</Row>
      <Row label="Fees">{fees ?? <AskUs />}</Row>
      <Row label="Qualification awarded">{qualification ?? <AskUs />}</Row>
      <Row label="Examining body">{examiner ?? <AskUs />}</Row>
    </dl>
  )
}
