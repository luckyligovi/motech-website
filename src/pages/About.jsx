import { Award, Clock, MapPin, MonitorSmartphone, School } from 'lucide-react'
import { siteConfig } from '../config/site'
import { campusImages } from '../data/campus'
import { cityImage } from '../data/media'
import { accreditedBy, background, coreValues, mission, vision, whyMotech } from '../data/institute'
import { courses } from '../lib/courses'
import { schools } from '../data/schools'
import AccreditationBadges from '../components/shared/AccreditationBadges'
import EnquiryActions from '../components/shared/EnquiryActions'
import Seo from '../components/shared/Seo'
import SchoolList from '../components/shared/SchoolList'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'

/**
 * What the institute is, in the institute's own words.
 *
 * The background, vision, mission, values and reasons-to-choose on this page are the
 * brochure's, lifted from src/data/institute.js rather than written here, so the page cannot
 * drift from the document it came from. See docs/BROCHURE-TRANSCRIPTION.md §2–§4.
 */

const atAGlance = [
  { icon: School, label: 'Type', value: 'Technical and vocational training college' },
  { icon: Award, label: 'Registration', value: siteConfig.registration },
  { icon: MapPin, label: 'Where', value: 'Tom Mboya Street, Nairobi CBD' },
  { icon: MonitorSmartphone, label: 'Study modes', value: siteConfig.studyModes.join(' or ') },
  { icon: Clock, label: 'Classes', value: 'Early morning, full time and evening' },
]

export default function About() {
  return (
    <>
      <Seo path="/about" />

      <div className="relative overflow-hidden bg-navy-950 text-white">
        <img src={cityImage.src} alt="" className="absolute inset-0 size-full object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/92 to-navy-950/70"
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            About Motech
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            {siteConfig.tagline}. A technical training institute in the centre of Nairobi, teaching{' '}
            {courses.length} courses across {schools.length} schools.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex max-w-xl flex-col gap-4 text-lg leading-relaxed text-ink">
              {background.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="mb-6 overflow-hidden rounded-xl">
              <img
                src={campusImages[1].src}
                alt={campusImages[1].alt}
                loading="lazy"
                decoding="async"
                className="h-48 w-full object-cover"
              />
            </div>
            <ul className="rounded-xl border border-line glass-card p-6">
              {atAGlance.map(({ icon: Icon, label, value }) => (
                <li
                  key={label}
                  className="flex gap-4 border-b border-line py-4 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted">{label}</span>
                    <span className="block font-semibold text-head">{value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="glass-soft border-y border-line" aria-labelledby="purpose-heading">
        <SectionHeading id="purpose-heading" title="What moves us forward" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-line glass-soft p-6 sm:p-8">
            <h3 className="text-sm font-bold tracking-wide text-accent uppercase">Vision</h3>
            <p className="mt-3 text-lg leading-relaxed text-ink">{vision}</p>
          </div>
          <div className="rounded-xl border border-line glass-soft p-6 sm:p-8">
            <h3 className="text-sm font-bold tracking-wide text-accent uppercase">Mission</h3>
            <p className="mt-3 text-lg leading-relaxed text-ink">{mission}</p>
          </div>
        </div>

        <h3 className="mt-12 text-xl font-bold text-head">Core values</h3>
        <dl className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coreValues.map(({ name, description }) => (
            <div key={name} className="rounded-xl border border-line p-5">
              <dt className="font-bold text-head">{name}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted">{description}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section aria-labelledby="why-heading">
        <SectionHeading
          id="why-heading"
          title="Why Motech"
          lead="What the institute offers its students, in its own words."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyMotech.map(({ icon: Icon, text }, index) => (
            <Reveal
              as="li"
              key={text}
              delay={(index % 3) * 80}
              className="flex gap-4 rounded-xl border border-line glass-card p-5"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span className="self-center text-ink">{text}</span>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 border-t border-line pt-8">
          <h3 className="text-xs font-bold tracking-[0.12em] text-muted uppercase">
            Accredited and examining bodies
          </h3>
          <AccreditationBadges className="mt-4" />
          <p className="mt-5 max-w-3xl text-sm text-muted">
            Motech states that it is registered and accredited by {accreditedBy.join(', ')}, under
            registration number {siteConfig.registration}. Ask to see the certificate for any
            qualification that matters to you.
          </p>
        </div>
      </Section>

      <Section className="glass-soft border-y border-line" aria-labelledby="areas-heading">
        <SectionHeading
          id="areas-heading"
          title="What you can study"
          lead={`${schools.length} schools, ${courses.length} courses in total. Choose a school to see the courses in it.`}
        />
        <Reveal className="mt-10">
          <SchoolList />
        </Reveal>
      </Section>

      <section className="glass-soft border-y border-line py-14 sm:py-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-head">Find the right course</h2>
            <p className="mt-2 max-w-xl text-muted">
              Browse the full catalogue, or ask the institute which course fits what you want to do.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/courses" size="lg">
              Browse courses
            </Button>
            <Button to="/contact" variant="glass" size="lg">
              Contact the institute
            </Button>
          </div>
        </div>
      </section>

      <Section aria-labelledby="enquire-heading">
        <div className="rounded-2xl border border-line glass-card p-8 lg:p-10">
          <SectionHeading id="enquire-heading" title="Ask us anything" />
          <p className="mt-4 max-w-2xl text-muted">
            Fees, entry requirements and durations are listed for every course on this site, taken
            from the institute&rsquo;s own brochure. Confirm the current figures with the institute
            before you enrol or pay.
          </p>
          <EnquiryActions className="mt-6" />
        </div>
      </Section>
    </>
  )
}
