import { siteConfig } from '../config/site'

/**
 * The admissions process.
 *
 * Steps 2 and 3 are the institute's published admission requirements, from the brochure
 * (docs/BROCHURE-TRANSCRIPTION.md §5). Steps 1 and 4 describe how to use what the brochure
 * publishes; neither invents a rule. The brochure does not say how an application is
 * submitted or where the registration fee is paid, so the page asks the reader to confirm
 * that rather than assuming the paybill covers it.
 */
const { amount } = siteConfig.registrationFee
const fee = `KSh ${amount.toLocaleString('en-KE')}`

export const admissionSteps = [
  {
    title: 'Choose your course',
    description:
      'Each course page lists the entry requirement, duration and fee for every level it is offered at. Check that your grades meet the level you want.',
  },
  {
    title: 'Get your documents together',
    description:
      'A copy of your national ID, two coloured passport-size photographs, and a copy of your KCPE or KCSE results.',
  },
  {
    title: 'Pay the registration fee',
    description: `${fee}, non-refundable, charged once every calendar year on top of course fees. Ask the institute how to pay it.`,
  },
  {
    title: 'Pick your class time and start',
    description:
      'Classes run early morning, full time and evening, and intake is ongoing. Confirm your start date when you enrol.',
  },
]

/** Exactly what the brochure asks an applicant to bring, in its own words. */
export const requiredDocuments = [
  'A copy of your national ID',
  'Two coloured passport-size photographs, on admission',
  'A copy of your KCPE or KCSE results',
]

/** The same documents, phrased for an applicant's own message. See src/lib/application.js. */
export const requiredDocumentsShort = ['ID copy', 'two passport photos', 'KCPE/KCSE results']
