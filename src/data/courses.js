/**
 * Course catalogue.
 *
 * PROVISIONAL. Every course below comes from Motech's Elimys directory listing, not from the
 * institute directly. See docs/CONTENT-TO-CONFIRM.md, which lists the entries that look
 * wrong and must be checked before launch.
 *
 * Field rules:
 *   - `null` means "not confirmed". The interface shows an enquiry prompt instead of a value,
 *     so an unknown is never displayed as a fact. Never fill a field with a guess.
 *   - `examiner` is deliberately null everywhere: the listing names examining bodies, but the
 *     same listing records the institute's registration number as "NA" and its licences page
 *     is empty. Publishing an examining body is a credential claim, so it waits for evidence.
 *   - `verified` flips to true per course once the institute confirms that course's details.
 *     Only verified courses are offered to search engines; see src/lib/courses.js.
 *
 * To add a course: append an object with a unique `slug` and a `category` from
 * src/data/categories.js. Nothing else needs changing.
 */
/**
 * Courses shown on the homepage preview: one from each subject area, so a visitor sees the
 * breadth of the catalogue without it standing in for the catalogue itself.
 */
export const featuredCourseSlugs = [
  'ict-and-computer-studies',
  'business-management',
  'cpa-cifa',
  'nutrition-and-dietetics',
  'food-and-beverage',
  'languages',
]

export const courses = [
  {
    slug: 'ict-and-computer-studies',
    name: 'ICT and Computer Studies',
    category: 'ict-computer-studies',
    summary:
      'Computing skills for office work and technical support, from everyday applications through to the fundamentals of information technology.',
    level: 'Diploma',
    duration: '5 years',
    studyModes: ['Online'],
    entryRequirements: null,
    fees: null,
    examiner: null,
    qualification: null,
    verified: false,
  },
  {
    slug: 'business-management',
    name: 'Business Management',
    category: 'business-management',
    summary:
      'How a business is planned, staffed and run day to day, for people heading into management or starting out on their own.',
    level: 'Diploma',
    duration: '2 years',
    studyModes: ['In class', 'Online', 'Blended'],
    // The only entry requirement published anywhere for any Motech course.
    entryRequirements: 'KCSE mean grade C- (minus)',
    fees: null,
    examiner: null,
    qualification: null,
    verified: false,
  },
  {
    slug: 'human-resource-management',
    name: 'Human Resource Management',
    category: 'business-management',
    summary:
      'Recruiting, paying and developing staff, and the records and procedures an employer is expected to keep.',
    level: 'Diploma',
    duration: '6 months',
    studyModes: ['In class', 'Online', 'Blended'],
    entryRequirements: null,
    fees: null,
    examiner: null,
    qualification: null,
    verified: false,
  },
  {
    slug: 'community-development-and-social-work',
    name: 'Community Development and Social Work',
    category: 'business-management',
    summary:
      'Working with communities and the organisations that support them, including project work and social services.',
    level: 'Diploma',
    duration: '2 years',
    studyModes: ['In class', 'Online'],
    entryRequirements: null,
    fees: null,
    examiner: null,
    qualification: null,
    verified: false,
  },
  {
    slug: 'cpa-cifa',
    name: 'CPA and CIFA',
    category: 'accounting-finance',
    summary:
      'Preparation for the professional accountancy and investment analysis examinations taken by accountants and finance analysts in Kenya.',
    level: 'Certificate',
    duration: '3 months',
    studyModes: ['In class', 'Online'],
    entryRequirements: null,
    fees: null,
    examiner: null,
    qualification: null,
    verified: false,
  },
  {
    slug: 'accounting-technician-diploma',
    name: 'Accounting Technician Diploma',
    category: 'accounting-finance',
    summary:
      'Practical bookkeeping and accounts work for people supporting an accounting function.',
    level: 'Certificate',
    duration: '3 months',
    studyModes: ['In class', 'Online', 'Blended'],
    entryRequirements: null,
    fees: null,
    examiner: null,
    qualification: null,
    verified: false,
  },
  {
    slug: 'certificate-in-accounting-and-management-skills',
    name: 'Certificate in Accounting and Management Skills',
    category: 'accounting-finance',
    summary:
      'A short grounding in accounts and supervision, often taken as a first step towards further accountancy study.',
    level: 'Certificate',
    duration: '3 months',
    studyModes: ['In class', 'Online', 'Blended'],
    entryRequirements: null,
    fees: null,
    examiner: null,
    qualification: null,
    verified: false,
  },
  {
    slug: 'business-data-analysis',
    name: 'Business Data Analysis',
    category: 'accounting-finance',
    summary:
      'Turning business records into figures a manager can act on, using spreadsheets and reporting tools.',
    level: 'Certificate',
    duration: '3 months',
    studyModes: ['In class', 'Online', 'Blended'],
    entryRequirements: null,
    fees: null,
    examiner: null,
    qualification: null,
    verified: false,
  },
  {
    slug: 'nutrition-and-dietetics',
    name: 'Nutrition and Dietetics',
    category: 'health-nutrition',
    summary:
      'Food, diet and health, and how nutrition advice is given in clinics, schools and community settings.',
    level: 'Diploma',
    duration: '2 years',
    studyModes: ['Blended'],
    entryRequirements: null,
    fees: null,
    examiner: null,
    qualification: null,
    verified: false,
  },
  {
    slug: 'health-care-assistant',
    name: 'Health Care Assistant',
    category: 'health-nutrition',
    summary:
      'Supporting nurses and clinicians with patient care, hygiene and daily ward or home-care routines.',
    level: 'Diploma',
    duration: '6 months',
    studyModes: ['Blended'],
    entryRequirements: null,
    fees: null,
    examiner: null,
    qualification: null,
    verified: false,
  },
  {
    slug: 'food-and-beverage',
    name: 'Food and Beverage',
    category: 'hospitality',
    summary:
      'Food preparation and service for hotels, restaurants and catering, including kitchen and front-of-house practice.',
    level: 'Diploma',
    duration: '2 years',
    studyModes: ['Blended'],
    entryRequirements: null,
    fees: null,
    examiner: null,
    qualification: null,
    verified: false,
  },
  {
    slug: 'languages',
    name: 'Languages',
    category: 'languages',
    summary:
      'Language tuition for work, study or travel. Ask the institute which languages are running in the current intake.',
    level: 'Certificate',
    duration: '6 months',
    studyModes: ['In class', 'Online'],
    entryRequirements: null,
    fees: null,
    examiner: null,
    qualification: null,
    verified: false,
  },
]
