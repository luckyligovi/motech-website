import {
  Briefcase,
  Calculator,
  Code,
  Cpu,
  GraduationCap,
  HeartPulse,
  Laptop,
  Languages as LanguagesIcon,
  Monitor,
  Palette,
  Scissors,
  Users,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react'
import { entry } from './entry'

/**
 * The institute's schools, as its own brochure organises them.
 *
 * Source: docs/BROCHURE-TRANSCRIPTION.md, transcribed from the printed brochure the institute
 * confirmed current on 19 November 2026. The grouping is the brochure's, not ours.
 *
 * A school carries the defaults shared by every course under it, so that a course row only
 * states what makes it different:
 *
 *   examiner   Examining body for the school's courses.
 *   fee        Default amount in KSh.
 *   feeUnit    What that amount buys: 'term', 'month', 'level', 'package', or null where the
 *              brochure prints a figure with no period against it.
 *   levels     Template per level name. A course lists the levels it is offered at and
 *              overrides only the cells that differ. See src/lib/courses.js for the merge.
 *   image      A subject photograph. Derived from the slug below rather than typed out
 *              fourteen times; set `image: null` on a school that should not show one.
 *   tint       The school's colour, used for its icon chip and section rule so fourteen
 *              sections are not visually identical. All are oklch(48% 0.15 H) — one
 *              lightness and one chroma, only the hue changes — so they read as one family,
 *              none shouts louder than another, and every one clears 4.5:1 against white.
 *
 * To add a school: append it here and give its courses a matching `school` slug. Nothing else
 * needs changing — the catalogue, filters, navigation and sitemap all read from this list.
 */

const DIPLOMA_18 = { requirement: entry.KCSE_C, duration: '18 months' }
const CERTIFICATE_1Y = { requirement: entry.KCSE_D, duration: '1 year' }

const schoolList = [
  {
    slug: 'accountancy',
    name: 'School of Accountancy',
    blurb: 'KASNEB professional accountancy and finance qualifications.',
    icon: Calculator,
    tint: 'oklch(48% 0.15 250)',
    examiner: 'KASNEB',
    fee: 20000,
    feeUnit: 'level',
    levels: {
      'Level 1 & 2': { requirement: entry.KCSE_C_PLUS, duration: '3 months' },
    },
  },
  {
    slug: 'business',
    name: 'School of Business',
    blurb: 'KNEC diplomas and certificates across management, logistics and office practice.',
    icon: Briefcase,
    tint: 'oklch(48% 0.15 265)',
    examiner: 'KNEC',
    fee: 15000,
    feeUnit: null,
    levels: {
      Diploma: DIPLOMA_18,
      Certificate: CERTIFICATE_1Y,
      Artisan: { requirement: entry.KCPE, duration: '6 months' },
      'Higher Diploma': { requirement: entry.DIPLOMA, duration: '9 months' },
    },
  },
  {
    slug: 'ict',
    name: 'School of ICT',
    blurb: 'Diplomas and certificates in computing, cyber security and criminology.',
    icon: Laptop,
    tint: 'oklch(48% 0.15 230)',
    examiner: 'KNEC / ICM / JP-UK',
    fee: 15000,
    feeUnit: 'term',
    levels: {
      Diploma: { requirement: entry.KCSE_C_MINUS },
      Certificate: { requirement: entry.KCSE_D },
    },
  },
  {
    slug: 'ict-short-courses',
    name: 'ICT Short Courses',
    blurb: 'Standalone skills courses, two weeks to two months, with no entry requirement.',
    icon: Cpu,
    tint: 'oklch(48% 0.15 212)',
    feeUnit: 'term',
    levels: {},
  },
  {
    slug: 'computer',
    name: 'School of Computer Courses',
    printed: { name: 'School of Computer Course', reason: 'typo' },
    blurb: 'Five-week certificates in the packages an office actually runs on.',
    icon: Monitor,
    tint: 'oklch(48% 0.15 198)',
    fee: 4500,
    feeUnit: 'term',
    levels: {
      Certificate: { requirement: entry.KCPE, duration: '5 weeks' },
    },
  },
  {
    slug: 'graphic-design',
    name: 'School of Graphic Design',
    blurb: 'The design and layout packages, taught package by package.',
    icon: Palette,
    tint: 'oklch(48% 0.15 325)',
    fee: 4000,
    feeUnit: 'package',
    levels: {
      Certificate: { requirement: entry.KCPE, duration: '5 weeks' },
    },
  },
  {
    slug: 'software-engineering',
    name: 'School of Software Engineering',
    printed: { name: 'School of Software Engineering Programming', reason: 'level-in-name' },
    blurb: 'One language or platform at a time, five weeks each.',
    icon: Code,
    tint: 'oklch(48% 0.15 290)',
    feeUnit: 'month',
    levels: {
      Certificate: { requirement: entry.KCPE, duration: '5 weeks' },
    },
  },
  {
    slug: 'hospitality',
    name: 'School of Hospitality',
    blurb: 'Hotel, kitchen, travel and airline training, including Amadeus and Galileo.',
    icon: UtensilsCrossed,
    tint: 'oklch(48% 0.15 45)',
    fee: 5000,
    feeUnit: 'month',
    levels: {
      Diploma: DIPLOMA_18,
      Certificate: CERTIFICATE_1Y,
    },
  },
  {
    slug: 'cosmetology',
    name: 'School of Cosmetology',
    blurb: 'Hair, beauty and nails. Open entry — no grade requirement.',
    icon: Scissors,
    tint: 'oklch(48% 0.15 350)',
    fee: 6000,
    feeUnit: 'month',
    levels: {
      Diploma: { requirement: entry.OPEN, duration: '6 months' },
      Certificate: { requirement: entry.OPEN, duration: '6 months' },
    },
  },
  {
    slug: 'health-sciences',
    name: 'School of Health Sciences',
    blurb: 'Nutrition, community health and care work.',
    icon: HeartPulse,
    tint: 'oklch(48% 0.15 155)',
    fee: 5000,
    feeUnit: 'month',
    levels: {
      Diploma: DIPLOMA_18,
      Certificate: CERTIFICATE_1Y,
    },
  },
  {
    slug: 'humanities',
    name: 'School of Humanities and Social Sciences',
    blurb: 'Community work, counselling and conflict resolution.',
    icon: Users,
    tint: 'oklch(48% 0.15 20)',
    fee: 15000,
    feeUnit: null,
    levels: {
      Diploma: DIPLOMA_18,
      Certificate: { requirement: entry.KCSE_D, duration: '9 months' },
    },
  },
  {
    slug: 'engineering',
    name: 'School of Engineering',
    blurb: 'Electrical, electronic and plumbing trades, from artisan to diploma.',
    icon: Wrench,
    tint: 'oklch(48% 0.15 85)',
    fee: 5000,
    feeUnit: 'month',
    levels: {
      Diploma: { requirement: entry.KCSE_C, duration: '1 year' },
      Certificate: { requirement: entry.KCSE_D, duration: '6 months' },
    },
  },
  {
    slug: 'languages',
    name: 'School of Languages',
    blurb: 'Chinese, German, Spanish, French and English, at three levels.',
    icon: LanguagesIcon,
    tint: 'oklch(48% 0.15 180)',
    fee: 15000,
    feeUnit: 'term',
    levels: {
      Foundation: { requirement: entry.KCPE, duration: '6 months' },
      Intermediate: { requirement: entry.FOUNDATION, duration: '6 months' },
      Advanced: { requirement: entry.INTERMEDIATE, duration: '6 months' },
    },
  },
  {
    slug: 'exams',
    name: 'KCSE, IGCSE and Bridging',
    blurb: 'Secondary-school examinations and bridging, for returning to study.',
    icon: GraduationCap,
    tint: 'oklch(48% 0.15 310)',
    fee: 5000,
    feeUnit: null,
    levels: {
      Certificate: { requirement: entry.KCPE, duration: '1 year' },
    },
  },
]

/**
 * Subject photographs, one per school.
 *
 * These are of the *subject*, not of Motech: a commercial kitchen, a multimeter, a tray of
 * colour swatches. That distinction is the whole point. A photograph of somebody else's
 * students on an institute's website is read as a photograph of that institute's students,
 * which would misrepresent the school; a photograph of a soldering iron is read as "this is
 * what the course is about", which is true.
 *
 * All are Unsplash, free for commercial use, self-hosted rather than hotlinked so the site
 * makes no third-party request. See docs/PHOTO-CREDITS.md for the source of each.
 *
 * They are decorative everywhere they appear — a heading always names the school beside
 * them — so they carry empty alt text at the point of use.
 */
export const schools = schoolList.map((school) => ({
  image: `/images/schools/${school.slug}.webp`,
  ...school,
}))
