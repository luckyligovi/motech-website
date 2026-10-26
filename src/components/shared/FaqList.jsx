import { Link } from 'react-router'
import { ChevronDown } from 'lucide-react'

/**
 * Questions and answers, built on native <details>/<summary>.
 *
 * The browser handles opening, closing, keyboard operation and screen-reader state, so there
 * is no state to manage and nothing to get wrong. Several answers can be open at once, which
 * suits a list people skim.
 */
export default function FaqList({ items }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map(({ id, question, answer, link }) => (
        <details key={id} className="group">
          {/* The question is a heading so it can be navigated to, inside the summary so the
              browser still provides the disclosure behaviour. */}
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="text-lg font-semibold text-navy-950">{question}</h3>
            <ChevronDown
              aria-hidden="true"
              className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180"
            />
          </summary>

          <div className="pb-5 text-muted">
            {answer.map((paragraph) => (
              <p key={paragraph} className="mt-0 mb-3 leading-relaxed last:mb-0">
                {paragraph}
              </p>
            ))}
            {link && (
              <Link
                to={link.to}
                className="mt-3 inline-block rounded font-semibold text-navy-800 underline-offset-4 hover:underline"
              >
                {link.label}
              </Link>
            )}
          </div>
        </details>
      ))}
    </div>
  )
}
