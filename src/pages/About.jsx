import { Check, MapPin, MonitorSmartphone, School } from 'lucide-react'
import { cityImage } from '../data/media'
import EnquiryActions from '../components/shared/EnquiryActions'
import Seo from '../components/shared/Seo'
import SubjectAreas from '../components/shared/SubjectAreas'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'

/**
 * What the institute is, in verified facts only.
 *
 * Motech has not supplied a history, mission, values, achievements or staff biographies, so
 * none appear here. The page describes where it is, what it teaches and how, and is honest
 * about what it cannot yet state. See docs/CONTENT-TO-CONFIRM.md.
 */

const atAGlance = [
  { icon: School, label: 'Type', value: 'Technical and vocational training college' },
  { icon: MapPin, label: 'Where', value: 'Tom Mboya Street, Nairobi CBD' },
  { icon: MonitorSmartphone, label: 'Study modes', value: 'In class, online or blended' },
]

const whatThisSiteCovers = [
  'What each course covers, the level it leads to and how long it runs.',
  'Which courses are taught in class, online, or as a mix of the two.',
  'How to reach the institute about fees, entry requirements and intake dates.',
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
            A technical training institute in the centre of Nairobi, teaching diploma and
            certificate courses across six subject areas.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex max-w-xl flex-col gap-4 text-lg leading-relaxed text-ink">
              <p>
                Motech Technology Training Institute is a technical and vocational training college
                on Tom Mboya Street, in the Nairobi central business district, opposite
                Ambassador&rsquo;s Hotel and close to the city&rsquo;s main matatu and bus routes.
              </p>
              <p>
                It teaches twelve diploma and certificate courses across six subject areas: ICT and
                computer studies, business and management, accounting and finance, health and
                nutrition, hospitality, and languages.
              </p>
              <p>
                Courses are taught in class, online, or as a mix of the two, so that study can fit
                around work and other commitments. The institute confirms entry requirements, fees
                and intake dates when you enquire about a particular course.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ul className="rounded-xl border border-line bg-white p-6">
              {atAGlance.map(({ icon: Icon, label, value }) => (
                <li
                  key={label}
                  className="flex gap-4 border-b border-line py-4 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-navy-950 text-accent">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted">{label}</span>
                    <span className="block font-semibold text-navy-950">{value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-white" aria-labelledby="areas-heading">
        <SectionHeading
          id="areas-heading"
          title="What you can study"
          lead="Six subject areas, twelve courses in total. Choose an area to see the courses in it."
        />
        <Reveal className="mt-10">
          <SubjectAreas />
        </Reveal>
      </Section>

      <Section aria-labelledby="honesty-heading">
        <div className="grid gap-10 rounded-2xl border border-line bg-white p-8 lg:grid-cols-12 lg:p-10">
          <div className="lg:col-span-6">
            <SectionHeading id="honesty-heading" title="What this website can tell you" />
            <p className="mt-4 text-muted">
              This site is built on information the institute has confirmed. Where a detail is not
              yet confirmed, it says so and points you to the institute, rather than publishing a
              figure it cannot stand behind.
            </p>
            <EnquiryActions className="mt-6" />
          </div>
          <ul className="flex flex-col gap-4 lg:col-span-6 lg:border-l lg:border-line lg:pl-10">
            {whatThisSiteCovers.map((item) => (
              <li key={item} className="flex gap-3">
                <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent-600" />
                <span className="text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <section className="bg-navy-950 py-14 text-white sm:py-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">Find the right course</h2>
            <p className="mt-2 max-w-xl text-white/80">
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
    </>
  )
}
