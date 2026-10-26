import { Check } from 'lucide-react'
import { cityImage } from '../../data/media'
import Container from '../ui/Container'
import GlassPanel from '../ui/GlassPanel'

/**
 * What the institute is, and what this website can and cannot answer.
 *
 * The second half replaces the usual "why choose us" selling points. Motech has not
 * supplied achievements, graduate outcomes or partnerships, and inventing them would
 * misrepresent the school, so the section sets expectations honestly instead.
 */
const siteAnswers = [
  'What each course covers, the level it leads to and how long it runs.',
  'Which courses are taught in class, online, or as a mix of the two.',
  'How to reach the institute about fees, entry requirements and intake dates.',
]

export default function AboutSnapshot() {
  return (
    <section
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-navy-950 py-16 text-white sm:py-20"
    >
      <img src={cityImage.src} alt="" className="absolute inset-0 size-full object-cover" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/95 to-navy-950/80"
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
              It teaches twelve diploma and certificate courses across six subject areas, taught
              in class, online, or a combination of the two, so the timetable can fit around work.
            </p>
          </div>
        </div>

        <GlassPanel as="div" className="p-6 sm:p-8 lg:col-span-5">
          <h3 className="text-xl font-bold">What this site can tell you</h3>
          <ul className="mt-5 flex flex-col gap-4">
            {siteAnswers.map((item) => (
              <li key={item} className="flex gap-3">
                <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent" />
                <span className="text-white/85">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-white/15 pt-5 text-sm text-white/70">
            Fees, entry requirements and intake dates are confirmed by the institute directly,
            so this site points you to them rather than publishing figures it cannot stand behind.
          </p>
        </GlassPanel>
      </Container>
    </section>
  )
}
