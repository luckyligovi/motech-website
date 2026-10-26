import { Link } from 'react-router'
import { ArrowRight, Clock } from 'lucide-react'
import { getCategoryBySlug } from '../../lib/courses'
import { unsplash } from '../../lib/images'

/**
 * One course in a list. Used on the catalogue, the homepage preview and under "related".
 *
 * The banner is the course's category image (a placeholder until Motech supplies photos).
 * It is decorative — the heading already names the course — so its alt text is empty; the
 * category and level are drawn over it for sighted users. The whole card is a single link,
 * stretched from the title, so its accessible name stays the course title.
 *
 * Everything shown comes from the course data; `level`, `duration` and `studyModes` fall back
 * to an honest prompt when the institute has not confirmed them.
 */
export default function CourseCard({ course }) {
  const { slug, name, summary, level, duration, studyModes } = course
  const category = getCategoryBySlug(course.category)
  const Icon = category?.icon

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-all hover:border-navy-800/40 hover:shadow-lg hover:shadow-navy-950/5">
      {category?.image && (
        <div className="relative aspect-[16/9] overflow-hidden bg-navy-800">
          <img
            src={unsplash(category.image.id, { w: 640, h: 360 })}
            alt=""
            width="640"
            height="360"
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Darken the foot of the image so the category label stays legible over any photo. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent"
          />
          {Icon && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
              <Icon aria-hidden="true" className="size-4 text-accent" />
              {category.name}
            </span>
          )}
          {level && (
            <span className="absolute top-3 right-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-navy-950">
              {level}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-navy-950">
          <Link to={`/courses/${slug}`} className="after:absolute after:inset-0">
            {name}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{summary}</p>

        <div className="mt-5 border-t border-line pt-4">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-navy-950">
            <Clock aria-hidden="true" className="size-4 text-navy-800" />
            {duration ?? 'Duration on enquiry'}
          </p>

          {studyModes?.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {studyModes.map((mode) => (
                <li
                  key={mode}
                  className="rounded-md bg-paper px-2 py-0.5 text-xs font-medium text-muted"
                >
                  {mode}
                </li>
              ))}
            </ul>
          )}
        </div>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800">
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
