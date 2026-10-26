import { ArrowRight } from 'lucide-react'
import { getFeaturedCourses } from '../../lib/courses'
import CourseCard from '../courses/CourseCard'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'

export default function CoursePreview() {
  const featured = getFeaturedCourses()

  return (
    <Section aria-labelledby="courses-heading">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          id="courses-heading"
          title="What you can study"
          lead="One course from each subject area. Twelve run in total, from short certificates to two-year diplomas."
        />
        <Button to="/courses" variant="outline" icon={ArrowRight} className="hidden sm:inline-flex">
          All twelve courses
        </Button>
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((course, index) => (
          <Reveal as="li" key={course.slug} delay={(index % 3) * 80}>
            <CourseCard course={course} />
          </Reveal>
        ))}
      </ul>

      <Button to="/courses" variant="outline" icon={ArrowRight} className="mt-8 w-full sm:hidden">
        All twelve courses
      </Button>
    </Section>
  )
}
