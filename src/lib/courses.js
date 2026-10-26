import { categories } from '../data/categories'
import { courses, featuredCourseSlugs } from '../data/courses'

/** Course lookups and grouping. Keeps page components free of data-shuffling logic. */

export const getCourseBySlug = (slug) => courses.find((course) => course.slug === slug)

export const getCategoryBySlug = (slug) => categories.find((category) => category.slug === slug)

/**
 * Courses grouped under their category, in the category order defined in data/categories.js.
 * Categories with no courses are left out rather than rendered empty.
 */
export const groupByCategory = (list = courses) =>
  categories
    .map((category) => ({
      category,
      courses: list.filter((course) => course.category === category.slug),
    }))
    .filter((group) => group.courses.length > 0)

/** Homepage selection, in the order listed in data/courses.js. Unknown slugs are dropped. */
export const getFeaturedCourses = () =>
  featuredCourseSlugs.map(getCourseBySlug).filter(Boolean)

/**
 * Courses to show at the foot of a course page. Prefers others in the same category; when a
 * category holds only this course, falls back to courses from other areas so the page always
 * offers somewhere to go next. Returns { courses, sameCategory } so the heading can adapt.
 */
export const getRelatedCourses = (course, limit = 3) => {
  const sameArea = courses.filter(
    (other) => other.category === course.category && other.slug !== course.slug,
  )
  if (sameArea.length > 0) {
    return { courses: sameArea.slice(0, limit), sameCategory: true }
  }
  const others = courses.filter((other) => other.slug !== course.slug).slice(0, limit)
  return { courses: others, sameCategory: false }
}

/**
 * A course page is offered to search engines only once the institute has confirmed that
 * course's details. Until then the page exists and is linked, but carries noindex, because
 * a page of "contact us to confirm" placeholders is not a useful search result.
 */
export const isCourseIndexable = (course) => Boolean(course?.verified)
