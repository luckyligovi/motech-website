import { entry } from './entry'

/**
 * The course catalogue.
 *
 * Source: docs/BROCHURE-TRANSCRIPTION.md, transcribed from the institute's printed brochure,
 * confirmed current on 19 November 2026. Fees, durations, entry requirements and examining
 * bodies are recorded as the brochure prints them.
 *
 * A row states only what its school does not already say. Everything shared — the examining
 * body, the fee, the standard duration for a level — lives on the school in
 * src/data/schools.js and is merged in by src/lib/courses.js.
 *
 * Fields
 *   school     Required. A slug from src/data/schools.js.
 *   name       Required. What the site displays.
 *   slug       Optional. Derived from `name` unless two courses would collide; the catalogue
 *              throws on a duplicate rather than quietly serving one page for two courses.
 *   printed    Optional. The brochure's own wording, where it differs from `name`, with a
 *              reason of 'typo' or 'level-in-name'. Never displayed; it keeps the correction
 *              auditable and lets a student searching the brochure's wording still find the
 *              course. See §22 of the transcription.
 *   summary    Optional. One sentence on what the course covers. Where the institute has not
 *              supplied one, the course page describes itself from its own facts instead.
 *   covers     Optional. The packages, tools or languages the brochure lists for the course.
 *   levels     Optional. The levels offered, as a level name or an object overriding the
 *              school's template for that level. Omit it for a course with a single unnamed
 *              level and give `duration` and `fee` on the course instead.
 *
 * To add a course: append a row. Nothing else needs changing.
 */

export const courseRows = [
  // ── School of Accountancy ────────────────────────────────────────────────────────────────
  {
    school: 'accountancy',
    name: 'Business Data Analysis',
    summary:
      'Turning business records into figures a manager can act on, using spreadsheets and reporting tools.',
    levels: [{ level: 'Level 1 & 2', fee: 9000, feeUnit: null }],
  },
  { school: 'accountancy', name: 'CPA Foundation', levels: ['Level 1 & 2'] },
  { school: 'accountancy', name: 'CPA Intermediate', levels: ['Level 1 & 2'] },
  { school: 'accountancy', name: 'CPA Advanced', levels: ['Level 1 & 2'] },
  {
    school: 'accountancy',
    name: 'Accounting Technician Diploma (ATD)',
    slug: 'accounting-technician-diploma',
    printed: { name: 'ATD 1 &2', reason: 'typo' },
    summary: 'Practical bookkeeping and accounts work for people supporting an accounting function.',
    levels: ['Level 1 & 2'],
  },
  {
    school: 'accountancy',
    name: 'Certificate in Accounting and Management Skills (CAMS)',
    slug: 'certificate-in-accounting-and-management-skills',
    printed: { name: 'CAMS', reason: 'typo' },
    summary:
      'A short grounding in accounts and supervision, often taken as a first step towards further accountancy study.',
    levels: ['Level 1 & 2'],
  },

  // ── School of Business ───────────────────────────────────────────────────────────────────
  {
    school: 'business',
    name: 'Business Management',
    summary:
      'How a business is planned, staffed and run day to day, for people heading into management or starting out on their own.',
    levels: ['Diploma', 'Certificate'],
  },
  {
    school: 'business',
    name: 'Project Planning and Management',
    printed: { name: 'Project planning &management', reason: 'typo' },
    levels: ['Diploma', 'Certificate'],
  },
  {
    school: 'business',
    name: 'Supply Chain Management',
    printed: { name: 'Diploma in supply chain management', reason: 'level-in-name' },
    levels: ['Diploma', 'Certificate'],
  },
  {
    school: 'business',
    name: 'Human Resource Management',
    summary:
      'Recruiting, paying and developing staff, and the records and procedures an employer is expected to keep.',
    levels: ['Diploma', 'Certificate'],
  },
  { school: 'business', name: 'Sales and Marketing', levels: ['Diploma', 'Certificate'] },
  {
    school: 'business',
    name: 'International Relations',
    printed: { name: 'International relation', reason: 'typo' },
    levels: [
      { level: 'Diploma', duration: '6 months', examiner: 'JP-UK' },
      { level: 'Certificate', duration: '6 months', examiner: 'JP-UK' },
    ],
  },
  { school: 'business', name: 'Information Studies', levels: ['Diploma', 'Certificate'] },
  { school: 'business', name: 'Road Transport and Logistics', levels: ['Diploma', 'Certificate'] },
  {
    school: 'business',
    name: 'Banking and Finance',
    printed: { name: 'Baking and finance', reason: 'typo' },
    levels: ['Diploma', 'Certificate'],
  },
  { school: 'business', name: 'Accountancy', levels: ['Diploma', 'Certificate'] },
  { school: 'business', name: 'Customer Service', levels: ['Diploma', 'Certificate'] },
  { school: 'business', name: 'Road Transport Management', levels: ['Diploma', 'Certificate'] },
  { school: 'business', name: 'Secretarial Studies', levels: ['Diploma', 'Certificate'] },
  { school: 'business', name: 'Front Office Management', levels: ['Diploma', 'Certificate'] },
  {
    school: 'business',
    name: 'Public Relations',
    printed: { name: 'Public relation', reason: 'typo' },
    levels: [
      { level: 'Diploma', examiner: 'ICM / JP-UK' },
      { level: 'Certificate', duration: '9 months' },
    ],
  },
  {
    school: 'business',
    name: 'International Freight Management',
    levels: ['Diploma', { level: 'Certificate', duration: '9 months' }],
  },
  {
    school: 'business',
    name: 'Store Keeping, Clerical Duties and Salesmanship',
    printed: { name: 'Store keeping/clerical duties /salesmanship', reason: 'typo' },
    levels: ['Artisan'],
  },
  {
    school: 'business',
    name: 'Higher Diploma in Human Resource Management',
    levels: ['Higher Diploma'],
  },
  { school: 'business', name: 'Higher Diploma in Secretariat', levels: ['Higher Diploma'] },

  // ── School of ICT ────────────────────────────────────────────────────────────────────────
  {
    school: 'ict',
    name: 'Programming',
    levels: [{ level: 'Diploma', requirement: entry.CERTIFICATE, duration: '5 weeks', terms: 1 }],
  },
  {
    school: 'ict',
    name: 'Cyber Security',
    levels: [
      { level: 'Diploma', duration: '12 months', terms: 4 },
      { level: 'Certificate', duration: '6 months', terms: 2 },
    ],
  },
  {
    school: 'ict',
    name: 'Information Communication Technology',
    slug: 'ict-and-computer-studies',
    summary:
      'Computing skills for office work and technical support, from everyday applications through to the fundamentals of information technology.',
    levels: [
      { level: 'Diploma', duration: '18 months', terms: 6 },
      { level: 'Certificate', duration: '12 months', terms: 4 },
    ],
  },
  {
    school: 'ict',
    name: 'Criminology and Security Studies',
    printed: { name: 'Criminology &security studies', reason: 'typo' },
    levels: [
      { level: 'Diploma', duration: '12 months', terms: 4 },
      { level: 'Certificate', duration: '6 months', terms: 2 },
    ],
  },
  {
    school: 'ict',
    name: 'Information Technology',
    levels: [
      { level: 'Diploma', duration: '18 months', terms: 6 },
      // The brochure leaves this duration cell blank. See §21 of the transcription.
      { level: 'Certificate', duration: null, terms: 4 },
    ],
  },

  // ── ICT short courses ────────────────────────────────────────────────────────────────────
  {
    school: 'ict-short-courses',
    name: 'Basic Computer Packages',
    covers: ['Introduction to computers', 'Word', 'Excel', 'Access', 'PowerPoint', 'Emailing'],
    duration: '5 weeks',
    fee: 4000,
  },
  {
    school: 'ict-short-courses',
    name: 'Accounting Packages',
    printed: { name: 'Accounting', reason: 'typo' },
    covers: ['QuickBooks', 'Sage', 'Pastel'],
    duration: '2 weeks',
    fee: 4000,
    feeNote: 'per package',
  },
  {
    school: 'ict-short-courses',
    name: 'Graphic Design',
    slug: 'graphic-design-short-course',
    covers: ['CorelDRAW', 'Adobe Photoshop', 'Adobe'],
    duration: '2 weeks',
    fee: 4000,
    feeNote: 'per package',
  },
  {
    school: 'ict-short-courses',
    name: 'Statistical Packages',
    covers: ['SPSS'],
    duration: '3 weeks',
    fee: 7000,
  },
  { school: 'ict-short-courses', name: 'Projects', covers: ['AutoCAD'], duration: '3 weeks', fee: 7000 },
  {
    school: 'ict-short-courses',
    name: 'Web Development',
    covers: ['Front end', 'Back end'],
    duration: '8 weeks',
    fee: 21000,
  },
  {
    school: 'ict-short-courses',
    name: 'Computer Maintenance',
    covers: ['Computer maintenance and repair'],
    duration: '5 weeks',
    fee: 18000,
  },
  {
    school: 'ict-short-courses',
    name: 'Computer Networking',
    slug: 'computer-networking-short-course',
    duration: '5 weeks',
    fee: 15000,
  },
  {
    school: 'ict-short-courses',
    name: 'Programming with Python',
    covers: ['Python'],
    duration: '5 weeks',
    fee: 17000,
  },
  {
    school: 'ict-short-courses',
    name: 'CCTV Management and Installation',
    covers: ['CCTV'],
    duration: '5 weeks',
    fee: 15000,
  },
  {
    school: 'ict-short-courses',
    name: 'Advanced Excel',
    slug: 'advanced-excel-short-course',
    printed: { name: 'Advanced Excell', reason: 'typo' },
    duration: '3 weeks',
    fee: 3500,
  },
  { school: 'ict-short-courses', name: 'Digital Marketing', duration: '1 month', fee: 15000 },
  {
    school: 'ict-short-courses',
    name: 'Artificial Intelligence',
    printed: { name: 'Artifical Intelligence', reason: 'typo' },
    duration: '1 month',
    fee: 5500,
  },

  // ── School of Computer Courses ───────────────────────────────────────────────────────────
  { school: 'computer', name: '10 Computer Packages', levels: ['Certificate'] },
  {
    school: 'computer',
    name: 'Computerised Accounting',
    printed: { name: 'Comp account (quick books ,tally ,sage )', reason: 'typo' },
    covers: ['QuickBooks', 'Tally', 'Sage'],
    levels: ['Certificate'],
  },
  { school: 'computer', name: 'Advanced Excel', levels: ['Certificate'] },
  {
    school: 'computer',
    name: 'AutoCAD and Revit',
    printed: { name: 'Auto card & Revit', reason: 'typo' },
    levels: ['Certificate'],
  },
  {
    school: 'computer',
    name: 'SAP and Odoo',
    printed: { name: 'SAP &ODOO', reason: 'typo' },
    levels: ['Certificate'],
  },
  { school: 'computer', name: 'iTax', printed: { name: 'ITAX', reason: 'typo' }, levels: ['Certificate'] },

  // ── School of Graphic Design ─────────────────────────────────────────────────────────────
  {
    school: 'graphic-design',
    name: 'Graphic Design',
    printed: {
      name: 'Adobe page maker, Adobe illustrator, Corel draw, MS paint, Adobe Photoshop, Picasa ,MS publisher',
      reason: 'level-in-name',
    },
    covers: [
      'Adobe PageMaker',
      'Adobe Illustrator',
      'CorelDRAW',
      'MS Paint',
      'Adobe Photoshop',
      'Picasa',
      'MS Publisher',
    ],
    levels: ['Certificate'],
  },

  // ── School of Software Engineering ───────────────────────────────────────────────────────
  { school: 'software-engineering', name: 'Java', levels: [{ level: 'Certificate', fee: 6000 }] },
  { school: 'software-engineering', name: 'CSS', levels: [{ level: 'Certificate', fee: 3000 }] },
  { school: 'software-engineering', name: 'JavaScript', printed: { name: 'JAVA SCRIPT', reason: 'typo' }, levels: [{ level: 'Certificate', fee: 8000 }] },
  { school: 'software-engineering', name: 'HTML', levels: [{ level: 'Certificate', fee: 4000 }] },
  { school: 'software-engineering', name: 'Python', levels: [{ level: 'Certificate', fee: 8000 }] },
  { school: 'software-engineering', name: 'Android', levels: [{ level: 'Certificate', fee: 5000 }] },
  { school: 'software-engineering', name: 'PHP', levels: [{ level: 'Certificate', fee: 3000 }] },
  { school: 'software-engineering', name: 'Kotlin', levels: [{ level: 'Certificate', fee: 5000 }] },
  { school: 'software-engineering', name: 'Computer Networking', levels: [{ level: 'Certificate', fee: 5000 }] },

  // ── School of Hospitality ────────────────────────────────────────────────────────────────
  {
    school: 'hospitality',
    name: 'Hotel Management',
    levels: [
      { level: 'Diploma', duration: '1 year' },
      { level: 'Certificate', duration: '6 months' },
    ],
  },
  {
    school: 'hospitality',
    name: 'Food and Beverage',
    printed: { name: 'Food &beverage', reason: 'typo' },
    summary:
      'Food preparation and service for hotels, restaurants and catering, including kitchen and front-of-house practice.',
    levels: [
      { level: 'Diploma', fee: 6000 },
      { level: 'Certificate', fee: 6000 },
      { level: 'Artisan', requirement: entry.KCPE, duration: '6 months', fee: 6000 },
    ],
  },
  {
    school: 'hospitality',
    name: 'Housekeeping and Accommodation',
    levels: [
      { level: 'Diploma', fee: 6000 },
      { level: 'Certificate', fee: 6000 },
    ],
  },
  {
    school: 'hospitality',
    name: 'Pastry and Bakery',
    levels: [{ level: 'Certificate', requirement: entry.KCPE, duration: '3 months' }],
  },
  {
    school: 'hospitality',
    name: 'Food Production',
    levels: [{ level: 'Open', requirement: entry.KCPE, duration: '4 months' }],
  },
  {
    school: 'hospitality',
    name: 'Food and Beverage Services',
    printed: { name: 'Food &beverage Services', reason: 'typo' },
    levels: [{ level: 'Diploma', requirement: entry.KCPE, duration: '6 months' }],
  },
  {
    school: 'hospitality',
    name: 'Tour Guiding and Tourism Management',
    levels: ['Diploma', 'Certificate'],
  },
  {
    school: 'hospitality',
    name: 'Airfare and Ticketing with Amadeus and Galileo',
    printed: { name: 'Air fare and ticketing with Amadeus /Galileo', reason: 'typo' },
    covers: ['Amadeus', 'Galileo'],
    levels: ['Diploma', 'Certificate'],
  },
  {
    school: 'hospitality',
    name: 'Cabin Crew and Air Hostess',
    printed: { name: 'Cabin Crew, Air Hostess (passengers handling)', reason: 'typo' },
    covers: ['Passenger handling'],
    levels: [
      { level: 'Diploma', duration: '12 months' },
      { level: 'Certificate', duration: '9 months' },
    ],
  },

  // ── School of Cosmetology ────────────────────────────────────────────────────────────────
  {
    school: 'cosmetology',
    name: 'Cosmetology',
    levels: [{ level: 'Diploma', duration: '1 year' }, 'Certificate'],
  },
  { school: 'cosmetology', name: 'Hairdressing', levels: ['Diploma', 'Certificate'] },
  { school: 'cosmetology', name: 'Beauty Therapy', levels: ['Diploma', 'Certificate'] },
  { school: 'cosmetology', name: 'Nail Technology', levels: ['Diploma', 'Certificate'] },

  // ── School of Health Sciences ────────────────────────────────────────────────────────────
  {
    school: 'health-sciences',
    name: 'Nutrition and Dietetics',
    printed: { name: 'Nutrition &dietetics', reason: 'typo' },
    summary:
      'Food, diet and health, and how nutrition advice is given in clinics, schools and community settings.',
    levels: ['Diploma', 'Certificate'],
  },
  { school: 'health-sciences', name: 'Community Health', levels: ['Diploma', 'Certificate'] },
  {
    school: 'health-sciences',
    name: 'Health Care Support and Caregiver',
    printed: { name: 'Health care support &caregiver', reason: 'typo' },
    summary:
      'Supporting nurses and clinicians with patient care, hygiene and daily ward or home-care routines.',
    levels: [
      { level: 'Diploma', duration: '6 months' },
      { level: 'Certificate', duration: '6 months' },
    ],
  },

  // ── School of Humanities and Social Sciences ─────────────────────────────────────────────
  {
    school: 'humanities',
    name: 'Community and Social Work',
    slug: 'community-development-and-social-work',
    printed: { name: 'Diploma in community &social work', reason: 'level-in-name' },
    summary:
      'Working with communities and the organisations that support them, including project work and social services.',
    levels: ['Diploma', 'Certificate'],
  },
  {
    school: 'humanities',
    name: 'Guidance and Counselling',
    printed: { name: 'Diploma in guiding and counselling', reason: 'level-in-name' },
    levels: ['Diploma', 'Certificate'],
  },
  {
    school: 'humanities',
    name: 'HIV/AIDS and Community Health Promoters',
    levels: ['Diploma', 'Certificate'],
  },
  { school: 'humanities', name: 'Mediation and Conflict Resolution', duration: '3 months', fee: 15000 },
  { school: 'humanities', name: 'Cisco', duration: '2 months', fee: 18000 },

  // ── School of Engineering ────────────────────────────────────────────────────────────────
  {
    school: 'engineering',
    name: 'Electrical and Electronic Engineering',
    levels: ['Diploma', 'Certificate'],
  },
  {
    school: 'engineering',
    name: 'Electrical Installation',
    levels: [{ level: 'Diploma', duration: '6 months' }, 'Certificate'],
  },
  {
    school: 'engineering',
    name: 'Plumbing',
    levels: [
      { level: 'Grade 1 and 2', requirement: entry.KCSE, duration: '6 months' },
      { level: 'Grade 3', requirement: entry.KCSE, duration: '6 months' },
    ],
  },
  {
    school: 'engineering',
    name: 'Artisan in Electrical and Electronic Engineering',
    // The brochure prints "Artisan in and electronic engineering"; "electrical" is missing from
    // the print. Taken from the row above it. See §21 of the transcription.
    printed: { name: 'Artisan in and electronic engineering', reason: 'typo' },
    levels: [{ level: 'Artisan', requirement: entry.KCSE_BELOW_D, duration: '6 months' }],
  },

  // ── School of Languages ──────────────────────────────────────────────────────────────────
  {
    school: 'languages',
    name: 'Languages',
    summary:
      'Language tuition for work, study or travel, taught from beginner level through to advanced.',
    covers: ['Chinese', 'German', 'Spanish', 'French', 'English'],
    levels: ['Foundation', 'Intermediate', 'Advanced'],
  },

  // ── KCSE, IGCSE and bridging ─────────────────────────────────────────────────────────────
  {
    school: 'exams',
    name: 'KCSE, IGCSE and Bridging',
    printed: { name: 'KCSE, IGCSE &BRIDGING', reason: 'typo' },
    levels: ['Certificate'],
  },
]

/**
 * Courses shown on the homepage preview: one from each of six different schools, so a visitor
 * sees the breadth of the catalogue without it standing in for the catalogue itself.
 */
export const featuredCourseSlugs = [
  'ict-and-computer-studies',
  'business-management',
  'cpa-foundation',
  'cosmetology',
  'electrical-and-electronic-engineering',
  'web-development',
]
