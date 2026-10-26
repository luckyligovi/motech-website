import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { categories } from '../../data/categories'
import { groupByCategory } from '../../lib/courses'

/**
 * The six subject areas as a grid of links into the catalogue, each showing how many courses
 * it holds. Counts are derived from the course data, so they can never drift out of step.
 */
export default function SubjectAreas() {
  const groups = groupByCategory()
  const countFor = (slug) => groups.find((group) => group.category.slug === slug)?.courses.length ?? 0

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map(({ slug, name, icon: Icon }) => {
        const count = countFor(slug)
        return (
          <li key={slug}>
            <Link
              to={`/courses#${slug}`}
              className="group flex h-full items-center gap-4 rounded-xl border border-line bg-white p-5 transition-colors hover:border-navy-800/40"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-navy-950 text-accent">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span className="flex-1">
                <span className="block font-semibold text-navy-950">{name}</span>
                <span className="text-sm text-muted">
                  {count === 1 ? '1 course' : `${count} courses`}
                </span>
              </span>
              <ArrowRight
                aria-hidden="true"
                className="size-5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-navy-800"
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
