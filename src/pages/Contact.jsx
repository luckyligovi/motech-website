import { Clock } from 'lucide-react'
import { siteConfig } from '../config/site'
import { cityImage } from '../data/media'
import ContactDetails from '../components/shared/ContactDetails'
import Seo from '../components/shared/Seo'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'

// Keeps enquiries productive without claiming a specific Motech requirement.
const helpful = [
  'The course, or courses, you want to know about.',
  'Your recent school results, so entry requirements can be checked.',
  'Whether you would prefer to study in class, online, or both.',
]

export default function Contact() {
  return (
    <>
      <Seo path="/contact" />
      <PageHeader title="Contact Motech" image={{ src: cityImage.src }}>
        Ask about courses, fees, entry requirements and intakes. Call, message, email or visit us
        in Nairobi CBD. Intake is ongoing.
      </PageHeader>

      <Section>
        <ContactDetails />

        <div className="mt-6 grid gap-6 rounded-2xl border border-line glass-card p-8 lg:grid-cols-12 lg:items-center lg:p-10">
          <div className="lg:col-span-7">
            <h2 className="text-xl font-bold text-head">What helps us help you</h2>
            <p className="mt-2 text-muted">
              You do not need anything to get in touch, but having these to hand makes the
              conversation quicker.
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {helpful.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-line lg:pl-10">
            <div className="flex items-center gap-2 text-head">
              <Clock aria-hidden="true" className="size-5 text-accent" />
              <h2 className="text-lg font-bold">Class times</h2>
            </div>
            <dl className="mt-4">
              {siteConfig.classTimes.map(({ id, label, time }) => (
                <div
                  key={id}
                  className="flex flex-wrap justify-between gap-2 border-b border-line py-2.5 text-sm last:border-b-0"
                >
                  <dt className="font-semibold text-head">{label}</dt>
                  <dd className="text-muted">{time}</dd>
                </div>
              ))}
            </dl>
            <Button to="/courses" variant="outline" className="mt-5">
              Browse courses
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
