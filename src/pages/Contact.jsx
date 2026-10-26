import { Clock } from 'lucide-react'
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
      <PageHeader title="Contact Motech">
        Ask about courses, fees, entry requirements and intakes. Call, email or visit us in Nairobi
        CBD.
      </PageHeader>

      <Section>
        <ContactDetails />

        <div className="mt-6 grid gap-6 rounded-2xl border border-line bg-white p-8 lg:grid-cols-12 lg:items-center lg:p-10">
          <div className="lg:col-span-7">
            <h2 className="text-xl font-bold text-navy-950">What helps us help you</h2>
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
            <div className="flex items-center gap-2 text-navy-950">
              <Clock aria-hidden="true" className="size-5 text-accent-600" />
              <h2 className="text-lg font-bold">Not sure which course?</h2>
            </div>
            <p className="mt-2 text-sm text-muted">
              Browse the catalogue first, then ask the institute about anything that is not
              listed.
            </p>
            <Button to="/courses" variant="outline" className="mt-4">
              Browse courses
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
