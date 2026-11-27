import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowRight, Pause, Play, Search } from 'lucide-react'
import { schools } from '../../data/schools'
import { courses, groupBySchool } from '../../lib/courses'
import GlassPanel from '../ui/GlassPanel'

/**
 * The hero panel: every school, a page at a time, plus a search box.
 *
 * Two ways in, because visitors arrive in two states. Someone who knows they want CPA types
 * it; someone who only knows they want "something in business" browses. The search hands off
 * to /courses, which does the real filtering — this panel owns no search logic of its own.
 *
 * All fourteen schools are shown, rotating in pages, because eight static tiles hid six
 * schools from anyone who never scrolled to the catalogue. The three pages sit side by side
 * in one horizontal track; turning a page slides the whole track, and on a touch screen a
 * finger can drag it directly — a real swipe, not an instant swap.
 *
 * A dragged swipe has to tell a genuine sideways gesture apart from an ordinary vertical
 * scroll, since both start as a single finger touching this panel. The first several pixels
 * of movement decide which axis the gesture is on; once it is vertical, the drag is released
 * entirely so the page scrolls normally underneath it.
 *
 * Every page is in the HTML, with the inactive ones marked `inert` rather than removed —
 * `inert` keeps a page out of the tab order and off the accessibility tree while still
 * letting it sit, fully rendered, beside the active one on the track. All fourteen links
 * still reach crawlers.
 *
 * Accessibility (WCAG 2.2.2, "Pause, Stop, Hide" — this moves on its own for more than five
 * seconds, so it must be stoppable):
 *   - A visible pause button.
 *   - Rotation stops on hover and on keyboard focus anywhere inside, and resumes on leaving.
 *   - It never starts on a touch screen, where there is no hover to pause it with and the
 *     thing moving would be the thing under your thumb — though a deliberate swipe there
 *     still turns the page.
 *   - No rotation at all for a visitor who prefers reduced motion; the dots and swipe still
 *     work, just without the automatic timer.
 *
 * Counts come from the catalogue, so a tile can never advertise courses that are not there.
 */
const ROTATE_MS = 6000
const PAGE_COUNT = 3
// A swipe has to cross this share of the panel's width to turn the page; short of it, the
// track springs back. Short enough to feel responsive, long enough that a scroll which
// barely strays sideways doesn't accidentally turn the page.
const SWIPE_THRESHOLD = 0.18
// Pixels of initial movement before the gesture commits to an axis.
const AXIS_LOCK_PX = 8

const countsBySchool = new Map(
  groupBySchool().map(({ school, courses: list }) => [school.slug, list.length]),
)

/** Splits into `count` pages of as near the same size as possible: 14 becomes 5, 5, 4. */
const paginate = (items, count) => {
  const perPage = Math.ceil(items.length / count)
  return Array.from({ length: count }, (_, i) => items.slice(i * perPage, (i + 1) * perPage)).filter(
    (page) => page.length > 0,
  )
}

const pages = paginate(schools, PAGE_COUNT)
const tallestPage = Math.max(...pages.map((page) => page.length))

export default function ProgrammeFinder() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)
  // Pixels the track is currently offset by a finger in progress; 0 once released.
  const [dragPx, setDragPx] = useState(0)
  const [dragging, setDragging] = useState(false)

  const trackRef = useRef(null)
  const gesture = useRef({ x: 0, y: 0, axis: null })

  const goTo = (index) => setPage(((index % pages.length) + pages.length) % pages.length)

  useEffect(() => {
    if (paused || dragging || pages.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Nothing should move under a thumb on its own. On touch there is no hover to pause with,
    // so the automatic timer simply does not run; a swipe still turns the page deliberately.
    if (window.matchMedia('(hover: none)').matches) return

    const id = setInterval(() => goTo(page + 1), ROTATE_MS)
    return () => clearInterval(id)
  }, [paused, dragging, page])

  const handleTouchStart = (event) => {
    const touch = event.touches[0]
    gesture.current = { x: touch.clientX, y: touch.clientY, axis: null }
    setDragging(true)
  }

  const handleTouchMove = (event) => {
    const touch = event.touches[0]
    const dx = touch.clientX - gesture.current.x
    const dy = touch.clientY - gesture.current.y

    if (gesture.current.axis === null && Math.max(Math.abs(dx), Math.abs(dy)) > AXIS_LOCK_PX) {
      gesture.current.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
    }

    // A vertical gesture belongs to the page, not the carousel: stop tracking and let the
    // browser scroll normally underneath. A horizontal one is claimed from here on, which
    // keeps the page itself still while the track follows the finger.
    if (gesture.current.axis === 'x') {
      event.preventDefault()
      setDragPx(dx)
    }
  }

  const handleTouchEnd = () => {
    if (gesture.current.axis === 'x') {
      const width = trackRef.current?.offsetWidth || 1
      if (dragPx < -width * SWIPE_THRESHOLD) goTo(page + 1)
      else if (dragPx > width * SWIPE_THRESHOLD) goTo(page - 1)
    }
    setDragging(false)
    setDragPx(0)
    gesture.current.axis = null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const term = query.trim()
    navigate(term ? `/courses?q=${encodeURIComponent(term)}` : '/courses')
  }

  return (
    <div className="relative">
      {/* Small enough to sit in the empty top-right corner, clear of any text. */}
      <div
        aria-hidden="true"
        className="absolute -top-5 -right-5 size-24 rounded-2xl bg-accent/80 sm:size-32"
      />

      <GlassPanel as="section" aria-labelledby="finder-heading" className="relative p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="finder-heading" className="text-xl font-bold sm:text-2xl">
              Find your programme
            </h2>
            <p className="mt-1 text-sm text-white/70">
              All {schools.length} schools. Choose one to see the courses in it.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPaused((wasPaused) => !wasPaused)}
            aria-label={paused ? 'Resume rotating the schools' : 'Pause rotating the schools'}
            className="grid size-11 shrink-0 place-items-center rounded-lg border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:size-9"
          >
            {paused ? (
              <Play aria-hidden="true" className="size-4" />
            ) : (
              <Pause aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>

        {/*
          Hover and focus pause the rotation. The focus half is not a nicety: without it, the
          page can turn under a keyboard user who has just tabbed onto one of these links and
          take the link out from under them. A <section> with a name carries role="region",
          which is what the carousel pattern wants, so no explicit role is needed.

          overflow-hidden here is what turns "three full-width pages in a row" into "one page
          visible at a time, sliding" — the track itself is always three panels wide.
        */}
        {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <section
          aria-roledescription="carousel"
          aria-label="Schools at Motech"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className="mt-5 touch-pan-y overflow-hidden"
        >
          <div
            ref={trackRef}
            className="flex"
            style={{
              transform: `translateX(calc(${-page * 100}% + ${dragPx}px))`,
              transition: dragging ? 'none' : 'transform 400ms cubic-bezier(0.2, 0.7, 0.2, 1)',
            }}
          >
            {pages.map((group, pageIndex) => (
              <ul
                key={pageIndex}
                // `inert` (true, not an empty string — React treats that as false) rather than removing the page: it stays rendered — so it can sit
                // beside the active page on the track and slide into view — but drops out of
                // the tab order and the accessibility tree while it is off to the side.
                {...(pageIndex !== page && { inert: true })}
                aria-label={`Schools, page ${pageIndex + 1} of ${pages.length}`}
                className="grid w-full shrink-0 gap-2 sm:grid-cols-2 sm:gap-2.5"
              >
                {group.map(({ slug, name, icon: Icon, tint, image }, index) => {
                  const count = countsBySchool.get(slug) ?? 0
                  return (
                    <li key={slug} className="min-w-0 rise-row" style={{ '--row': index }}>
                      <Link
                        to={`/courses#${slug}`}
                        draggable={false}
                        className="group flex h-full items-center gap-3 rounded-xl border border-white/12 p-2.5 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:bg-white/5 active:translate-y-0 sm:p-3"
                      >
                        {/* The subject photograph, under a wash of the school's colour so the
                            icon stays legible and fourteen different photographs still read
                            as one set. Decorative: the school is named right beside it. */}
                        <span className="relative grid size-9 shrink-0 overflow-hidden rounded-lg sm:size-11">
                          {image && (
                            <img
                              src={image}
                              alt=""
                              loading="lazy"
                              decoding="async"
                              draggable={false}
                              className="size-full object-cover"
                            />
                          )}
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 grid place-items-center text-white"
                            style={{
                              background: image
                                ? `color-mix(in oklab, ${tint} 70%, transparent)`
                                : tint,
                            }}
                          >
                            <Icon className="size-4.5" />
                          </span>
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">{name}</span>
                          <span className="block text-xs text-white/60">
                            {count === 1 ? '1 course' : `${count} courses`}
                          </span>
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                        />
                      </Link>
                    </li>
                  )
                })}

                {/* Keeps every page the same height, so the track never jumps as it turns. */}
                {Array.from({ length: tallestPage - group.length }, (_, i) => (
                  <li key={`spacer-${i}`} aria-hidden="true" className="invisible p-3">
                    <span className="block size-9" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>

        {/* The visible bar is 6px; the button around it is 44, which is what a thumb needs. */}
        <div className="mt-2 flex justify-center">
          {pages.map((group, pageIndex) => (
            <button
              key={pageIndex}
              type="button"
              onClick={() => goTo(pageIndex)}
              aria-label={`Show schools ${pageIndex + 1} of ${pages.length}`}
              aria-current={pageIndex === page ? 'true' : undefined}
              className="group/dot grid h-11 w-9 place-items-center"
            >
              <span
                className={`h-1.5 rounded-full transition-all ${
                  pageIndex === page
                    ? 'w-6 bg-accent'
                    : 'w-3 bg-white/25 group-hover/dot:bg-white/50'
                }`}
              />
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="relative mt-5">
          <label htmlFor="hero-search" className="sr-only">
            Search courses
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-white/50"
          />
          <input
            id="hero-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${courses.length} courses — CPA, cyber security, plumbing…`}
            className="h-12 w-full rounded-xl border border-white/20 bg-navy-950/50 pr-24 pl-11 text-sm text-white placeholder:text-white/45 focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-1.5 h-9 -translate-y-1/2 rounded-lg bg-accent px-3.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-accent-600"
          >
            Search
          </button>
        </form>
      </GlassPanel>
    </div>
  )
}
