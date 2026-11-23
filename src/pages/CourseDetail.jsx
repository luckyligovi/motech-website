import { useParams } from 'react-router'
import { siteConfig } from '../config/site'
import { courseBlurb, getCourseBySlug, getRelatedCourses } from '../lib/courses'
import CourseCard from '../components/courses/CourseCard'
import CourseFacts from '../components/courses/CourseFacts'
import EnquiryActions from '../components/shared/EnquiryActions'
import Seo from '../components/shared/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import WhatsAppIcon from '../components/ui/WhatsAppIcon'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'
import NotFound from './NotFound'

/**
 * The entry requirements, durations and fees below come from the institute's brochure. These
 * are the things that brochure does not answer, and that a visitor should ask about before
 * committing to a course.
 */
const questionsToAsk = [
  'Whether your grades meet the entry requirement for the level you want.',
  'What the fee covers, and whether it can be paid in instalments.',
  'When the next intake starts, and whether you can still join this one.',
  'Which class time the course runs in — early morning, full time or evening.',
  'Whether this course can be taken online, and what you would need for that.',
]

export default function CourseDetail() {
  const { slug } = useParams()
  const course = getCourseBySlug(slug)

  if (!course) return <NotFound />

  const { school } = course
  const { courses: related, sameSchool } = getRelatedCourses(course)
  const { amount, note } = siteConfig.registrationFee

  return (
    <>
      <Seo path={`/courses/${course.slug}`} />

      <PageHeader
        title={course.name}
        image={school.image ? { src: school.image } : undefined}
        above={
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Courses', to: '/courses' },
              { label: school.name, to: `/courses#${school.slug}` },
              { label: course.name },
            ]}
          />
        }
      >
        {courseBlurb(course) ?? school.blurb}
      </PageHeader>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-bold text-head">Course details</h2>
            <p className="mt-2 text-muted">
              {course.levels.length > 1
                ? `This course is offered at ${course.levels.length} levels. Each has its own entry requirement, duration and fee.`
                : 'Taken from the institute’s course brochure.'}
            </p>
            <div className="mt-5">
              <CourseFacts course={course} />
            </div>
            <p className="mt-5 text-sm text-muted">
              A registration fee of KSh {amount.toLocaleString('en-KE')} is charged in addition to
              course fees ({note}). Confirm the current figures with the institute before paying.
            </p>
          </div>

          <div className="lg:col-span-5">
            {/* Apply leads; the enquiry options sit under it for anyone not ready to commit.
                The link carries the course, so the application page opens with it already
                chosen and the applicant never retypes what they were just reading. */}
            <div className="glass-card rounded-xl border border-accent/35 bg-accent/10 p-6 shadow-lg shadow-accent/5">
              <h2 className="text-xl font-bold text-head">Apply for this course</h2>
              <p className="mt-2 text-sm text-ink">
                {course.levels.length > 1
                  ? 'Choose your level on the next page and your application opens in WhatsApp, already written.'
                  : 'Your application opens in WhatsApp, already written. Nothing is sent by this website — you press send.'}
              </p>
              <Button
                to={`/apply?course=${course.slug}`}
                size="lg"
                variant="whatsapp"
                icon={WhatsAppIcon}
                className="mt-5 w-full sm:w-auto"
              >
                Apply on WhatsApp
              </Button>
              <p className="mt-3 text-xs text-muted">Intake is ongoing. Takes about a minute.</p>
            </div>

            <div className="mt-6 rounded-xl border border-line glass-card p-6">
              <h2 className="text-xl font-bold text-head">Or ask a question first</h2>
              <p className="mt-2 text-sm text-muted">
                Call, message or email the institute. Mention {course.name} and they can go
                through the requirements and the next intake with you.
              </p>
              <EnquiryActions courseName={course.name} className="mt-5" />
            </div>

            <div className="mt-6 rounded-xl border border-line glass-card p-6">
              <h2 className="text-xl font-bold text-head">Worth asking about</h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                {questionsToAsk.map((question) => (
                  <li key={question} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t border-line pb-16">
          <Container className="pt-12">
            <h2 id="related-heading" className="text-2xl font-bold text-head">
              {sameSchool ? `Other courses in the ${school.name}` : 'Other courses you can take'}
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((other) => (
                <li key={other.slug}>
                  <CourseCard course={other} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  )
}
