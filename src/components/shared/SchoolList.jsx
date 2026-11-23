import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { schools } from '../../data/schools'
import { groupBySchool } from '../../lib/courses'

/**
 * Every school as a grid of picture cards linking into the catalogue, each showing how many
 * courses it holds. Counts are derived from the course data, so they can never drift.
 *
 * The photograph is of the school's subject, not of Motech, and is decorative — the heading
 * beside it names the school — so its alt text is empty.
 */
export default function SchoolList() {
  const groups = groupBySchool()
  const countFor = (slug) => groups.find((group) => group.school.slug === slug)?.courses.length ?? 0

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {schools.map(({ slug, name, blurb, icon: Icon, tint, image }) => {
        const count = countFor(slug)
        return (
          <li key={slug}>
            <Link
              to={`/courses#${slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-line glass-card transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md hover:shadow-navy-950/5"
            >
              {image && (
                <div className="relative aspect-[16/7] overflow-hidden bg-navy-900">
                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="350"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-2.5 left-3 grid size-8 place-items-center rounded-lg text-white"
                    style={{ background: tint }}
                  >
                    <Icon className="size-4" />
                  </span>
                </div>
              )}
              <div className="flex flex-1 items-center gap-3 p-4">
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-head">{name}</span>
                  <span className="block text-sm text-muted">
                    {count === 1 ? '1 course' : `${count} courses`}
                    {blurb ? ` · ${blurb}` : ''}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
