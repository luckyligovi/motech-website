import { Link } from 'react-router'
import { faqs } from '../../data/faqs'
import FaqList from '../shared/FaqList'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'

export default function Faqs() {
  return (
    <Section aria-labelledby="faq-heading">
      <SectionHeading
        id="faq-heading"
        title="Common questions"
        lead="Quick answers to what prospective students ask most. For anything specific, the institute is the best source."
      />
      <div className="mt-8 max-w-3xl">
        <FaqList items={faqs} />
        <p className="mt-6 text-muted">
          Still have a question?{' '}
          <Link
            to="/contact"
            className="rounded font-semibold text-navy-800 underline-offset-4 hover:underline"
          >
            Get in touch with the institute
          </Link>
          .
        </p>
      </div>
    </Section>
  )
}
