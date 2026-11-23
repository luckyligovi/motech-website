import { Check } from 'lucide-react'
import { cityImage } from '../../data/media'
import { whyMotech } from '../../data/institute'
import { courses } from '../../lib/courses'
import { schools } from '../../data/schools'
import Container from '../ui/Container'
import GlassPanel from '../ui/GlassPanel'

/**
 * What the institute is, and why it says a student should choose it.
 *
 * The panel shows the first few of the brochure's own "Why Motech" points; the About page
 * carries all nine. They are the institute's claims, in the institute's words — nothing here
 * is a selling point this site invented.
 */
const highlights = whyMotech.slice(0, 4)

export default function AboutSnapshot() {
  return (
    <section
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-y border-line bg-navy-950 py-16 text-white sm:py-20"
    >
      <img src={cityImage.src} alt="" className="absolute inset-0 size-full object-cover" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-navy-950/82 lg:bg-gradient-to-br lg:from-navy-950/96 lg:via-navy-950/88 lg:to-navy-950/62"
      />
      <Container className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2
            id="about-heading"
            className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl"
          >
            A technical training institute in the middle of Nairobi
          </h2>
          <div className="mt-6 flex max-w-xl flex-col gap-4 text-lg leading-relaxed text-white/80">
            <p>
              Motech Technology Training Institute is a private college on Tom Mboya Street, in
              the Nairobi central business district, a short walk from the city&rsquo;s main
              matatu and bus routes.
            </p>
            <p>
              It teaches {courses.length} courses across {schools.length} schools, from two-week
              short courses to eighteen-month diplomas, in class or online. Classes run early
              morning, full time and evening, so the timetable can fit around work.
            </p>
          </div>
        </div>

        <GlassPanel as="div" className="p-6 sm:p-8 lg:col-span-5">
          <h3 className="text-xl font-bold">Why Motech</h3>
          <ul className="mt-5 flex flex-col gap-4">
            {highlights.map(({ text }) => (
              <li key={text} className="flex gap-3">
                <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent" />
                <span className="text-white/85">{text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-white/15 pt-5 text-sm text-white/70">
            Entry requirements, durations and fees are listed for every course, as the
            institute&rsquo;s brochure prints them. Confirm the current figures before you enrol.
          </p>
        </GlassPanel>
      </Container>
    </section>
  )
}
