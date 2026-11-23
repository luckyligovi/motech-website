import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { courseBlurb } from '../../lib/courses'

/**
 * One course as a card. Used where there are a handful to browse — the homepage preview and
 * the "related courses" strip — never for the catalogue, which is a table.
 *
 * The banner is the school's subject photograph: a commercial kitchen for a hospitality
 * course, a multimeter for an engineering one. It is of the *craft*, never of students
 * presented as Motech's, so the card can carry a photograph without implying anything the
 * institute has not supplied. It is decorative — the heading and the school label say
 * everything it says — so its alt text is empty.
 *
 * The whole card is a single link, stretched from the title, so its accessible name stays the
 * course title. Facts come from the course's prebuilt labels, so a card and the course page
 * cannot disagree.
 */
export default function CourseCard({ course }) {
  const { slug, name, school, levelLabel, durationLabel, feeLabel } = course
  const Icon = school.icon
  const blurb = courseBlurb(course)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line glass-card transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-navy-950/5">
      {school.image ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-navy-900">
          <img
            src={school.image}
            alt=""
            loading="lazy"
            decoding="async"
            width="800"
            height="450"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Darkens the foot of the photograph so the school label stays legible over it. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/15 to-transparent"
          />
          <p className="absolute inset-x-3 bottom-2.5 flex items-center gap-2 text-xs font-semibold tracking-wide text-white uppercase">
            <span
              aria-hidden="true"
              className="grid size-6 shrink-0 place-items-center rounded"
              style={{ background: school.tint }}
            >
              <Icon className="size-3.5" />
            </span>
            <span className="min-w-0 truncate">{school.name}</span>
          </p>
          {levelLabel && (
            <span className="absolute top-3 right-3 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-navy-950">
              {levelLabel}
            </span>
          )}
        </div>
      ) : (
        <span aria-hidden="true" className="block h-1" style={{ background: school.tint }} />
      )}

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug font-bold text-head">
          <Link to={`/courses/${slug}`} className="after:absolute after:inset-0">
            {name}
          </Link>
        </h3>

        {blurb && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{blurb}</p>}

        <dl className="mt-auto grid grid-cols-2 gap-x-4 border-t border-line pt-4 text-sm">
          <dt className="text-xs text-muted">Duration</dt>
          <dt className="text-xs text-muted">Fees</dt>
          <dd className="mt-0.5 font-semibold text-head">{durationLabel ?? 'On enquiry'}</dd>
          <dd className="mt-0.5 font-semibold text-head">{feeLabel ?? 'On enquiry'}</dd>
        </dl>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          Course details
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </article>
  )
}
