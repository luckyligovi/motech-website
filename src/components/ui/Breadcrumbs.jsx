import { Link } from 'react-router'
import { ChevronRight } from 'lucide-react'

/** Trail back up the site. `items` is [{ label, to }], the last entry being the current page. */
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-white/70">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1">
              {index > 0 && <ChevronRight aria-hidden="true" className="size-4 text-white/40" />}
              {isLast || !item.to ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link to={item.to} className="rounded hover:text-white hover:underline">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
