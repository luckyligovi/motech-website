import { siteConfig } from '../config/site'
import { courses } from '../lib/courses'
import { schools } from './schools'

/**
 * Frequently asked questions.
 *
 * Answers come from the institute's brochure (docs/BROCHURE-TRANSCRIPTION.md). Where the
 * brochure is silent — how an application is submitted, when a particular intake starts —
 * the answer says so plainly and points to the enquiry channels, rather than guessing.
 *
 * Counts are interpolated from the catalogue, so an answer cannot go stale when a course is
 * added or removed.
 *
 * `answer` is an array of paragraphs. `link` adds one related page link below the answer.
 */
const { paybill, account, method } = siteConfig.payment
const registrationFee = `KSh ${siteConfig.registrationFee.amount.toLocaleString('en-KE')}`

export const faqs = [
  {
    id: 'what-courses',
    question: 'What courses does Motech offer?',
    answer: [
      `${courses.length} courses across ${schools.length} schools: accountancy, business, ICT, computer and software courses, graphic design, hospitality, cosmetology, health sciences, humanities, engineering and languages.`,
      'They range from two-week short courses to eighteen-month diplomas, at artisan, certificate, diploma and higher diploma level.',
    ],
    link: { label: 'See all courses', to: '/courses' },
  },
  {
    id: 'entry-requirements',
    question: 'What are the entry requirements?',
    answer: [
      'They vary by course and by level. Most diplomas ask for a KCSE mean grade of C and above, and most certificates a D and above. KASNEB courses ask for a C+. Short courses, the computer school and cosmetology have no grade requirement.',
      'The requirement for every level of every course is listed on that course’s page.',
    ],
    link: { label: 'Browse courses', to: '/courses' },
  },
  {
    id: 'fees',
    question: 'How much are the fees?',
    answer: [
      'Fees are listed on every course page, as the institute’s brochure prints them. Most KNEC diplomas and certificates are KSh 15,000; cosmetology, health sciences, engineering and hospitality are charged monthly; KASNEB courses are charged per level.',
      `A non-refundable registration fee of ${registrationFee} is charged on top, once every calendar year.`,
      'Confirm the current figures with the institute before you pay anything, and ask what the fee covers.',
    ],
    link: { label: 'Contact the institute', to: '/contact' },
  },
  {
    id: 'payment',
    question: 'How do I pay?',
    answer: [
      `The brochure gives ${method} ${paybill}, account number ${account}.`,
      'Confirm with the institute which fees go through the paybill, and get a receipt for anything you pay.',
    ],
  },
  {
    id: 'duration',
    question: 'How long does a course take?',
    answer: [
      'From two weeks for a short course to eighteen months for a diploma. Most KNEC certificates run a year and most diplomas eighteen months.',
      'The length of every level is shown on the course’s own page.',
    ],
    link: { label: 'Browse courses', to: '/courses' },
  },
  {
    id: 'intakes',
    question: 'When is the next intake?',
    answer: [
      'Intake is ongoing. Contact the institute to find out when the next classes start for the course you want.',
    ],
  },
  {
    id: 'class-times',
    question: 'What times do classes run?',
    answer: [
      'Three sessions: early morning 6:15 am to 7:50 am, full time 8:30 am to 4:00 pm, and evening 5:40 pm to 7:40 pm.',
      'Ask which sessions your course runs in before you enrol — not every course runs in every session.',
    ],
  },
  {
    id: 'online',
    question: 'Can I study online?',
    answer: [
      'The institute offers both online and physical classes, and lists free WiFi among its facilities.',
      'Confirm with the institute whether the course you want runs online, how the classes are delivered and what you would need, such as a reliable connection or a laptop.',
    ],
  },
  {
    id: 'accreditation',
    question: 'Is Motech accredited?',
    answer: [
      `The institute states that it is registered and accredited by TVETA, KASNEB, KNEC and NITA, under registration number ${siteConfig.registration}.`,
      'Courses are examined by KASNEB, KNEC, NITA, ICM and JP-UK, depending on the course; the examining body is shown on each course page. Ask to see the certificate for any qualification that matters to you.',
    ],
  },
  {
    id: 'accommodation',
    question: 'Is there accommodation?',
    answer: [
      'The institute lists hostels as available. Contact them for what is on offer, where it is and what it costs — none of that is published.',
    ],
  },
  {
    id: 'location',
    question: 'Where is Motech?',
    answer: [
      `${siteConfig.contact.address.short}, opposite Ambassador Hotel, in the Nairobi central business district.`,
    ],
    link: { label: 'Contact and directions', to: '/contact' },
  },
  {
    id: 'apply',
    question: 'How do I apply?',
    answer: [
      `Contact the institute about the course you want, and have a copy of your national ID, two coloured passport-size photographs and a copy of your KCPE or KCSE results ready. A ${registrationFee} registration fee applies.`,
      'This website cannot take an application or save your details. Applications go through the institute directly.',
    ],
    link: { label: 'How to join', to: '/admissions' },
  },
]
