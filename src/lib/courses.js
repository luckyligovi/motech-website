import { schools } from '../data/schools'
import { courseRows, featuredCourseSlugs } from '../data/courses'
import { listLabel } from './text'

/**
 * Builds the catalogue the interface reads, by merging each course row in
 * src/data/courses.js with the defaults of its school in src/data/schools.js.
 *
 * The data files hold only what the brochure says. Everything derived — slugs, fee labels,
 * duration ranges, the search index — is computed here, once, at module load. Pages and
 * components receive finished objects and never reassemble them.
 */

const schoolsBySlug = new Map(schools.map((school) => [school.slug, school]))

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Drops keys whose value is `undefined`, so an absent override cannot erase a default. */
const defined = (object) =>
  Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined))

export const FEE_UNIT_LABEL = {
  term: 'per term',
  month: 'per month',
  level: 'per level',
  package: 'per package',
}

/**
 * "KSh 15,000 per term", or "KSh 15,000" where the brochure states no period.
 *
 * `withUnit: false` drops the period, for a table whose column header already carries it —
 * repeating "per month" down forty rows is noise, not information.
 */
export const formatFee = (fee, { withUnit = true } = {}) => {
  if (!fee) return null
  const suffix = withUnit ? [FEE_UNIT_LABEL[fee.unit], fee.note] : []
  return [`KSh ${fee.amount.toLocaleString('en-KE')}`, ...suffix].filter(Boolean).join(' ')
}

/**
 * One level of a course: the school's template for that level, overridden by whatever the
 * course states. `null` survives an override, so a cell the brochure leaves blank stays blank
 * rather than falling back to a school default that was never printed.
 */
const buildLevel = (school, spec) => {
  const override = defined(typeof spec === 'string' ? { level: spec } : spec)
  const template = school.levels?.[override.level] ?? {}

  const merged = {
    level: null,
    requirement: null,
    duration: null,
    terms: null,
    examiner: school.examiner ?? null,
    fee: school.fee ?? null,
    feeUnit: school.feeUnit ?? null,
    feeNote: null,
    ...template,
    ...override,
  }

  return {
    level: merged.level,
    requirement: merged.requirement,
    duration: merged.duration,
    terms: merged.terms,
    examiner: merged.examiner,
    fee:
      merged.fee == null
        ? null
        : { amount: merged.fee, unit: merged.feeUnit, note: merged.feeNote },
  }
}

/** Unique values of one field across a course's levels, in order, blanks dropped. */
const across = (levels, field) => [...new Set(levels.map((l) => l[field]).filter(Boolean))]

/** Unique `full` forms of the requirement objects across a course's levels. */
const requirementsAcross = (levels) => [
  ...new Set(levels.map((l) => l.requirement?.full).filter(Boolean)),
]

const buildCourse = (row) => {
  const school = schoolsBySlug.get(row.school)
  if (!school) {
    throw new Error(`Course "${row.name}" names unknown school "${row.school}".`)
  }

  // A course with no `levels` has a single unnamed one, described on the row itself.
  const specs = row.levels ?? [
    defined({ requirement: row.requirement, duration: row.duration, fee: row.fee, feeNote: row.feeNote }),
  ]
  const levels = specs.map((spec) => buildLevel(school, spec))
  const fees = across(levels, 'fee')

  return {
    ...row,
    slug: row.slug ?? slugify(row.name),
    school,
    levels,
    // Pre-joined labels, so a card and a table render the same text from the same place.
    levelLabel: across(levels, 'level').join(' or ') || null,
    durationLabel: across(levels, 'duration').join(' or ') || null,
    requirementLabel: requirementsAcross(levels).join(' or ') || null,
    examinerLabel: across(levels, 'examiner').join(' / ') || null,
    feeLabel: [...new Set(fees.map(formatFee))].join(' or ') || null,
    // Every course here is transcribed from the institute's own brochure.
    verified: true,
    search: [
      row.name,
      row.printed?.name,
      row.summary,
      school.name,
      ...(row.covers ?? []),
      ...across(levels, 'level'),
      ...requirementsAcross(levels),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  }
}

export const courses = courseRows.map(buildCourse)

// A duplicate slug would serve one page for two different courses. Fail loudly at load:
// give one of them an explicit `slug` in src/data/courses.js.
const seen = new Set()
for (const course of courses) {
  if (seen.has(course.slug)) {
    throw new Error(`Two courses share the slug "${course.slug}". Set an explicit slug on one.`)
  }
  seen.add(course.slug)
}

export const getCourseBySlug = (slug) => courses.find((course) => course.slug === slug)

export const getSchoolBySlug = (slug) => schoolsBySlug.get(slug)

/** Courses grouped under their school, in the school order of src/data/schools.js. */
export const groupBySchool = (list = courses) =>
  schools
    .map((school) => ({ school, courses: list.filter((course) => course.school.slug === school.slug) }))
    .filter((group) => group.courses.length > 0)

/** Homepage selection, in the order listed in src/data/courses.js. Unknown slugs are dropped. */
export const getFeaturedCourses = () => featuredCourseSlugs.map(getCourseBySlug).filter(Boolean)

/**
 * Courses to show at the foot of a course page. Prefers others in the same school; where a
 * school holds only this course, falls back to the wider catalogue so the page always offers
 * somewhere to go next. Returns `sameSchool` so the heading can say which it is.
 */
export const getRelatedCourses = (course, limit = 3) => {
  const sameSchool = courses.filter(
    (other) => other.school.slug === course.school.slug && other.slug !== course.slug,
  )
  if (sameSchool.length > 0) return { courses: sameSchool.slice(0, limit), sameSchool: true }
  return { courses: courses.filter((o) => o.slug !== course.slug).slice(0, limit), sameSchool: false }
}

/** Every course is transcribed from the institute's brochure, so all are offered to search. */
export const isCourseIndexable = (course) => Boolean(course?.verified)

/**
 * One sentence describing a course, for a card or a page header.
 *
 * The brochure is a fee table, not prose: most courses have no description, and inventing one
 * would put words in the institute's mouth. Where there is nothing to say, this returns null
 * and the interface shows the course's facts instead of filler.
 */
export const courseBlurb = (course) => {
  if (course.summary) return course.summary
  if (course.covers?.length) return `Covers ${listLabel(course.covers)}.`
  return null
}
