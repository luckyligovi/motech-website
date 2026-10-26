import { Bus, Clock3, MapPin, MonitorSmartphone, Users } from 'lucide-react'
import { cityImage } from '../data/media'
import EnquiryActions from '../components/shared/EnquiryActions'
import Seo from '../components/shared/Seo'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'

/**
 * Student life.
 *
 * IMPORTANT: no clubs, societies, sports, events, facilities, student numbers or testimonials
 * are listed, because the institute has not supplied any — inventing them would misrepresent
 * the school (the project brief forbids it, and the directory's clubs/facilities pages are
 * empty). This page states only what is verified (central location, flexible study modes) and
 * sends the reader to the institute for the rest. It is kept `noindex` (see src/seo/meta.js)
 * until real student-life content is confirmed. See docs/CONTENT-TO-CONFIRM.md.
 */

// All verified: drawn from the confirmed address and the listed study modes.
const highlights = [
  {
    icon: MapPin,
    title: 'In the heart of Nairobi',
    text: 'Classes are on Tom Mboya Street in the central business district, opposite Ambassador’s Hotel.',
  },
  {
    icon: Bus,
    title: 'Easy to reach',
    text: 'The CBD location is a short walk from the city’s main matatu and bus routes.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Study in person or online',
    text: 'Many courses run in class, online, or as a mix of the two, so study can fit around work.',
  },
  {
    icon: Clock3,
    title: 'Short and longer courses',
    text: 'From three-month certificates to two-year diplomas, depending on what you want to do.',
  },
]

export default function StudentLife() {
  return (
    <>
      <Seo path="/student-life" />

      <div className="relative overflow-hidden bg-navy-950 text-white">
        <img src={cityImage.src} alt="" className="absolute inset-0 size-full object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/92 to-navy-950/70"
        />
        <Container className="relative py-14 sm:py-16">
          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Student life
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            What it is like to study at Motech, in the centre of Nairobi.
          </p>
        </Container>
      </div>

      <Section aria-labelledby="life-heading">
        <SectionHeading
          id="life-heading"
          title="Studying in central Nairobi"
          lead="Motech is a city-centre college, so studying here fits around work, travel and life in town."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {highlights.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 rounded-xl border border-line bg-white p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-navy-950 text-accent">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span>
                <h3 className="font-bold text-navy-950">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Honest placeholder: these details exist only with the institute, not on this site yet. */}
      <Section className="bg-white" aria-labelledby="community-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-navy-950 text-accent">
                <Users aria-hidden="true" className="size-5" />
              </span>
              <SectionHeading id="community-heading" title="Clubs, activities and facilities" />
            </div>
            <p className="mt-4 max-w-xl text-muted">
              Motech shares details of its student clubs, activities and facilities directly. To
              find out what is available for the course and intake you are interested in, get in
              touch with the institute.
            </p>
            <EnquiryActions className="mt-6" />
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl border border-line bg-paper p-6">
              <h3 className="text-lg font-bold text-navy-950">Thinking of joining?</h3>
              <p className="mt-2 text-sm text-muted">
                Browse the courses, then ask about starting dates and how each one is taught.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button to="/courses">Browse courses</Button>
                <Button to="/admissions" variant="outline">
                  How to join
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
