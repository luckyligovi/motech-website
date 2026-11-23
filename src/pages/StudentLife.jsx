import { BedDouble, Briefcase, Bus, Clock3, HeartHandshake, MapPin, Moon, Wifi } from 'lucide-react'
import { siteConfig } from '../config/site'
import { campusImages } from '../data/campus'
import { cityImage } from '../data/media'
import EnquiryActions from '../components/shared/EnquiryActions'
import Seo from '../components/shared/Seo'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'

/**
 * Student life.
 *
 * Every facility named here is one the institute lists in its own brochure: hostels, a
 * prayer room, organised religious groups, free WiFi and industrial attachment
 * (docs/BROCHURE-TRANSCRIPTION.md §4). Nothing is invented. What the brochure does not give —
 * what the hostels cost, where they are, which clubs meet when — is not stated, and the page
 * sends the reader to the institute for it instead.
 */

const facilities = [
  {
    icon: BedDouble,
    title: 'Hostels available',
    text: 'The institute lists hostel accommodation. Ask about location, cost and availability for your intake — none of that is published.',
  },
  {
    icon: Wifi,
    title: 'Free WiFi and online classes',
    text: 'Classes run online as well as in person, and the institute provides free WiFi on site.',
  },
  {
    icon: HeartHandshake,
    title: 'Organised religious groups',
    text: 'CU, YCA, SDA and Muslim groups are organised at the college.',
  },
  {
    icon: Moon,
    title: 'Prayer room',
    text: 'A prayer room is provided for Muslim students.',
  },
  {
    icon: Briefcase,
    title: 'Industrial attachment',
    text: 'The institute arranges industrial attachment for its students as part of their training.',
  },
  {
    icon: Clock3,
    title: 'Three class sessions',
    text: 'Early morning, full time and evening, so study can fit around work.',
  },
]

const location = [
  {
    icon: MapPin,
    title: 'In the heart of Nairobi',
    text: 'The college is on the 8th floor of Mwalimu Co-op House on Tom Mboya Street, opposite Ambassador Hotel.',
  },
  {
    icon: Bus,
    title: 'Easy to reach',
    text: 'The CBD location is a short walk from the city’s main matatu and bus routes.',
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

      <Section aria-labelledby="facilities-heading">
        <ul className="grid gap-4 sm:grid-cols-3">
          {campusImages.map(({ id, src, alt }, index) => (
            <Reveal
              as="li"
              key={id}
              delay={index * 90}
              className={`overflow-hidden rounded-xl ${index === 0 ? 'sm:col-span-2' : ''}`}
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="h-48 w-full object-cover sm:h-56"
              />
            </Reveal>
          ))}
        </ul>
        <p className="mt-3 text-sm text-muted">
          Pictures of student life in general, not of Motech. The institute&rsquo;s own
          photographs will replace them.
        </p>

        <SectionHeading
          id="facilities-heading"
          className="mt-12"
          title="Facilities and support"
          lead="What the institute provides alongside the teaching."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map(({ icon: Icon, title, text }, index) => (
            <Reveal
              as="li"
              key={title}
              delay={(index % 3) * 80}
              className="flex gap-4 rounded-xl border border-line glass-card p-6"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span>
                <h3 className="font-bold text-head">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
              </span>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section className="glass-soft border-y border-line" aria-labelledby="location-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              id="location-heading"
              title="Studying in central Nairobi"
              lead="Motech is a city-centre college, so studying here fits around work, travel and life in town."
            />
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {location.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4 rounded-xl border border-line p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span>
                    <h3 className="font-bold text-head">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 text-lg font-bold text-head">Class times</h3>
            <dl className="mt-4 max-w-md rounded-xl border border-line glass-soft px-5">
              {siteConfig.classTimes.map(({ id, label, time }) => (
                <div
                  key={id}
                  className="flex flex-wrap justify-between gap-2 border-b border-line py-3 last:border-b-0"
                >
                  <dt className="font-semibold text-head">{label}</dt>
                  <dd className="text-muted">{time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl border border-line glass-soft p-6">
              <h3 className="text-lg font-bold text-head">Ask about the details</h3>
              <p className="mt-2 text-sm text-muted">
                Hostel costs, club meeting times and what is available for a particular intake are
                not published. The institute can tell you.
              </p>
              <EnquiryActions className="mt-5" />
            </div>

            <div className="mt-6 rounded-xl border border-line glass-soft p-6">
              <h3 className="text-lg font-bold text-head">Thinking of joining?</h3>
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
