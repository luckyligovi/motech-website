/**
 * A numbered sequence. Numbers are shown because the order genuinely matters here: each
 * step depends on the one before it.
 */
export default function StepList({ steps }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="bg-white p-6">
          {/* Amber numeral on navy: high contrast, where amber on white would fail it. */}
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-lg bg-navy-950 text-sm font-bold text-accent tabular-nums"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-4 text-lg font-bold text-navy-950">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  )
}
