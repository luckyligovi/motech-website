import { useParams } from 'react-router'
import { getCategoryBySlug, getCourseBySlug, getRelatedCourses } from '../lib/courses'
import { unsplash } from '../lib/images'
import CourseCard from '../components/courses/CourseCard'
import CourseFacts from '../components/courses/CourseFacts'
import EnquiryActions from '../components/shared/EnquiryActions'
import Seo from '../components/shared/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import Container from '../components/ui/Container'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'
import NotFound from './NotFound'

// Generic, and true of any course here: these are the things the website cannot yet answer.
const questionsToAsk = [
  'The entry requirements, and whether your grades or experience qualify.',
  'The total fees, what they cover, and how they are paid.',
  'When the next intake starts and when applications close.',
  'The qualification awarded at the end, and who examines it.',
  'Class times, and whether the course can be taken online.',
]

export default function CourseDetail() {
  const { slug } = useParams()
  const course = getCourseBySlug(slug)

  if (!course) return <NotFound />

  const category = getCategoryBySlug(course.category)
  const { courses: related, sameCategory } = getRelatedCourses(course)

  return (
    <>
      <Seo path={`/courses/${course.slug}`} />

      <PageHeader
        title={course.name}
        image={category?.image && { src: unsplash(category.image.id, { w: 1600, h: 600 }) }}
        above={
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Courses', to: '/courses' },
              { label: category?.name ?? 'Course', to: `/courses#${course.category}` },
              { label: course.name },
            ]}
          />
        }
      >
        {course.summary}
      </PageHeader>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-bold text-navy-950">Course details</h2>
            <p className="mt-2 text-muted">
              Motech confirms the details below when you enquire. Anything not published here is
              marked, rather than guessed at.
            </p>
            <div className="mt-5">
              <CourseFacts course={course} />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl border border-line bg-white p-6">
              <h2 className="text-xl font-bold text-navy-950">Enquire about this course</h2>
              <p className="mt-2 text-sm text-muted">
                Call or email the institute. Mention {course.name} and they can go through the
                requirements and fees with you.
              </p>
              <EnquiryActions courseName={course.name} className="mt-5" />
            </div>

            <div className="mt-6 rounded-xl border border-line bg-white p-6">
              <h2 className="text-xl font-bold text-navy-950">Worth asking about</h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                {questionsToAsk.map((question) => (
                  <li key={question} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
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
            <h2 id="related-heading" className="text-2xl font-bold text-navy-950">
              {sameCategory
                ? `Other courses in ${category?.name.toLowerCase()}`
                : 'Other courses you can take'}
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
