import { ClipboardList, Info } from 'lucide-react'
import { admissionSteps } from '../data/admissions'
import { faqs } from '../data/faqs'
import EnquiryActions from '../components/shared/EnquiryActions'
import FaqList from '../components/shared/FaqList'
import StepList from '../components/shared/StepList'
import Seo from '../components/shared/Seo'
import Reveal from '../components/ui/Reveal'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import PageHeader from '../components/ui/PageHeader'

/**
 * How to join a course.
 *
 * The steps are general, not Motech's published procedure, because the institute has not
 * supplied one. The page is written so a visitor is always sent to the institute for the
 * specifics, rather than being given a figure or a rule this site cannot confirm.
 * See docs/CONTENT-TO-CONFIRM.md.
 */

// Things a prospective student can usefully have to hand when they call. Generic and safe:
// none of these claims a specific Motech requirement.
const whatToPrepare = [
  'The course, or courses, you are interested in.',
  'Your most recent school results or certificates, so entry requirements can be checked.',
  'Whether you would prefer to study in class, online, or a mix of the two.',
  'Any questions about fees, dates or how the course is taught.',
]

// The admissions-related questions from the site's FAQ list.
const admissionsFaqIds = ['entry-requirements', 'fees', 'intakes', 'apply']
const admissionsFaqs = faqs.filter((faq) => admissionsFaqIds.includes(faq.id))

export default function Admissions() {
  return (
    <>
      <Seo path="/admissions" />

      <PageHeader title="Admissions">
        Joining a course at Motech starts with a conversation. Here is how it usually works, and
        what to ask the institute along the way.
      </PageHeader>

      <Section aria-labelledby="steps-heading">
        <SectionHeading
          id="steps-heading"
          title="How to join a course"
          lead="Four steps from choosing a course to starting it. The institute confirms its own requirements, fees and dates."
        />
        <Reveal className="mt-10">
          <StepList steps={admissionSteps} />
        </Reveal>

        {/* Honest about the limit of what the site knows, without alarming the reader. */}
        <div className="mt-8 flex gap-4 rounded-xl border border-line bg-white p-5 text-sm text-muted">
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-navy-800" />
          <p>
            Entry requirements, fees, intake dates and the application procedure are set by the
            institute and confirmed when you enquire. This website cannot take an application or
            save your details.
          </p>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-navy-950 text-accent">
                <ClipboardList aria-hidden="true" className="size-5" />
              </span>
              <h2 className="text-2xl font-bold text-navy-950">Before you call</h2>
            </div>
            <p className="mt-4 text-muted">
              You do not need anything to make an enquiry, but having these to hand makes the
              conversation quicker.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {whatToPrepare.map((item) => (
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

          <div className="lg:col-span-6">
            <div className="rounded-xl border border-line bg-paper p-6">
              <h2 className="text-xl font-bold text-navy-950">Enquire about admissions</h2>
              <p className="mt-2 text-sm text-muted">
                Call or email the institute to go through entry requirements, fees and the next
                intake for the course you want.
              </p>
              <EnquiryActions className="mt-5" />
            </div>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="admissions-faq-heading">
        <SectionHeading id="admissions-faq-heading" title="Admissions questions" />
        <div className="mt-8 max-w-3xl">
          <FaqList items={admissionsFaqs} />
        </div>
      </Section>
    </>
  )
}
