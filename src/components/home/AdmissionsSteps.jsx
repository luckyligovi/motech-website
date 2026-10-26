import { admissionSteps } from '../../data/admissions'
import EnquiryActions from '../shared/EnquiryActions'
import StepList from '../shared/StepList'
import Reveal from '../ui/Reveal'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'

export default function AdmissionsSteps() {
  return (
    <Section aria-labelledby="admissions-heading" className="bg-white">
      <SectionHeading
        id="admissions-heading"
        title="How to join a course"
        lead="Motech confirms its own requirements and dates, so the quickest route is usually a phone call."
      />

      <Reveal className="mt-10">
        <StepList steps={admissionSteps} />
      </Reveal>

      <div className="mt-10 flex flex-col gap-5 rounded-xl border border-line bg-paper p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md font-semibold text-navy-950">
          Ready to ask about a course, or not sure which one fits?
        </p>
        <EnquiryActions />
      </div>
    </Section>
  )
}
