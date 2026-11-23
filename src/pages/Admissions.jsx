import { Banknote, ClipboardList, Clock, Info } from 'lucide-react'
import { siteConfig } from '../config/site'
import { admissionSteps, requiredDocuments } from '../data/admissions'
import { campusImages } from '../data/campus'
import { faqs } from '../data/faqs'
import EnquiryActions from '../components/shared/EnquiryActions'
import FaqList from '../components/shared/FaqList'
import StepList from '../components/shared/StepList'
import Seo from '../components/shared/Seo'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import WhatsAppIcon from '../components/ui/WhatsAppIcon'

/**
 * How to join a course.
 *
 * The documents and the registration fee are the institute's published admission
 * requirements, from its brochure (docs/BROCHURE-TRANSCRIPTION.md §5). How an application is
 * actually submitted is not published, so the page sends the reader to the institute for
 * that rather than inventing a procedure.
 */

// The admissions-related questions from the site's FAQ list.
const admissionsFaqIds = ['entry-requirements', 'fees', 'payment', 'class-times', 'intakes', 'apply']
const admissionsFaqs = faqs.filter((faq) => admissionsFaqIds.includes(faq.id))

export default function Admissions() {
  return (
    <>
      <Seo path="/admissions" />

      <PageHeader title="Admissions" image={{ src: campusImages[1].src }}>
        Intake is ongoing. Here is what the institute asks for, what it costs to register, and
        how to get started.
      </PageHeader>

      <Section aria-labelledby="steps-heading">
        <SectionHeading
          id="steps-heading"
          title="How to join a course"
          lead="Four steps from choosing a course to starting it. Confirm the current figures with the institute before you pay anything."
        />
        <Reveal className="mt-10">
          <StepList steps={admissionSteps} />
        </Reveal>

        <Reveal className="mt-8 overflow-hidden rounded-xl">
          <img
            src={campusImages[0].src}
            alt={campusImages[0].alt}
            loading="lazy"
            decoding="async"
            className="h-56 w-full object-cover sm:h-72"
          />
        </Reveal>

        {/* Honest about the limit of what the site knows, without alarming the reader. */}
        <div className="mt-8 flex gap-4 rounded-xl border border-line glass-card p-5 text-sm text-muted">
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
          <p>
            Entry requirements, durations and fees are listed on every course page, taken from
            the institute&rsquo;s brochure. The application procedure itself is set by the
            institute and confirmed when you enquire. This website cannot take an application or
            save your details.
          </p>
        </div>
      </Section>

      <Section className="glass-soft border-y border-line">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-accent/15 text-accent">
                <ClipboardList aria-hidden="true" className="size-5" />
              </span>
              <h2 className="text-2xl font-bold text-head">What to bring</h2>
            </div>
            <p className="mt-4 text-muted">
              The institute asks every applicant for these on admission.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {requiredDocuments.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="text-ink">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-accent/15 text-accent">
                <Clock aria-hidden="true" className="size-5" />
              </span>
              <h2 className="text-2xl font-bold text-head">Class times</h2>
            </div>
            <dl className="mt-5 rounded-xl border border-line glass-soft px-5">
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
            <p className="mt-3 text-sm text-muted">
              Not every course runs in every session. Ask which applies to yours before you enrol.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl border border-line glass-soft p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-accent/15 text-accent">
                  <Banknote aria-hidden="true" className="size-5" />
                </span>
                <h2 className="text-xl font-bold text-head">Registration and payment</h2>
              </div>
              <p className="mt-4 text-ink">
                A registration fee of{' '}
                <strong className="font-bold">
                  KSh {siteConfig.registrationFee.amount.toLocaleString('en-KE')}
                </strong>{' '}
                is charged on top of course fees. It is {siteConfig.registrationFee.note}.
              </p>
              <dl className="mt-5 rounded-xl border border-line glass-card px-5">
                <div className="flex flex-wrap justify-between gap-2 border-b border-line py-3">
                  <dt className="font-semibold text-head">Method</dt>
                  <dd className="text-muted">{siteConfig.payment.method}</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2 border-b border-line py-3">
                  <dt className="font-semibold text-head">Paybill</dt>
                  <dd className="font-mono text-ink tabular-nums">{siteConfig.payment.paybill}</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2 py-3">
                  <dt className="font-semibold text-head">Account number</dt>
                  <dd className="font-mono text-ink tabular-nums">{siteConfig.payment.account}</dd>
                </div>
              </dl>
              <p className="mt-3 text-sm text-muted">
                Confirm with the institute which fees go through the paybill, and get a receipt
                for anything you pay.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-line glass-soft p-6">
              <h2 className="text-xl font-bold text-head">Apply on WhatsApp</h2>
              <p className="mt-2 text-sm text-muted">
                Pick your course and level, and the application opens in WhatsApp already
                written. Nothing is sent or stored by this website.
              </p>
              <Button to="/apply" size="lg" variant="whatsapp" icon={WhatsAppIcon} className="mt-5">
                Start your application
              </Button>
            </div>

            <div className="mt-6 rounded-xl border border-line glass-soft p-6">
              <h2 className="text-xl font-bold text-head">Or ask first</h2>
              <p className="mt-2 text-sm text-muted">
                Call, message or email the institute to go through entry requirements and the next
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
