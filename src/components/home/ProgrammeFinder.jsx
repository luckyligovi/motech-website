import { Link } from 'react-router'
import { categories } from '../../data/categories'
import Button from '../ui/Button'
import GlassPanel from '../ui/GlassPanel'

/**
 * Hero panel linking to each course area. Sits half over an amber block so the glass
 * has something to blur against; the block is decoration only.
 *
 * Laid out as a grid rather than a list so the panel stays close in height to the
 * headline beside it, and so six areas can be scanned at a glance.
 */
export default function ProgrammeFinder() {
  return (
    <div className="relative">
      {/* Small enough to sit in the empty top-right corner, clear of any text. */}
      <div
        aria-hidden="true"
        className="absolute -top-5 -right-5 size-24 rounded-2xl bg-accent sm:size-32"
      />

      <GlassPanel as="section" aria-labelledby="finder-heading" className="relative p-6 sm:p-8">
        <h2 id="finder-heading" className="text-xl font-bold">
          Find your programme
        </h2>
        <p className="mt-1 text-sm text-white/80">Choose an area to see the courses in it.</p>

        <ul className="mt-5 grid grid-cols-2 gap-3">
          {categories.map(({ slug, name, icon: Icon }, index) => (
            <li key={slug} className="rise-row" style={{ '--row': index }}>
              <Link
                to={`/courses#${slug}`}
                className="group flex h-full flex-col gap-2 rounded-xl border border-white/15 p-3.5 transition-colors hover:border-accent hover:bg-white/5 active:bg-white/10"
              >
                <span className="grid size-9 place-items-center rounded-lg bg-white/10 text-accent transition-colors group-hover:bg-accent group-hover:text-navy-950">
                  <Icon aria-hidden="true" className="size-4.5" />
                </span>
                <span className="text-sm leading-snug font-semibold">{name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <Button to="/courses" className="mt-5 w-full">
          See all courses
        </Button>
      </GlassPanel>
    </div>
  )
}
