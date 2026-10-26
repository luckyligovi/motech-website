/**
 * Frequently asked questions.
 *
 * An answer here states only what the institute has confirmed. Where it has not — fees,
 * most entry requirements, intake dates, accreditation — the answer says so plainly and
 * points to the enquiry channels, rather than guessing or quietly skipping the question.
 *
 * `answer` is an array of paragraphs. `link` adds one related page link below the answer.
 */
export const faqs = [
  {
    id: 'what-courses',
    question: 'What courses does Motech offer?',
    answer: [
      'Twelve diploma and certificate courses across six areas: ICT and computer studies, business and management, accounting and finance, health and nutrition, hospitality, and languages.',
    ],
    link: { label: 'See all courses', to: '/courses' },
  },
  {
    id: 'entry-requirements',
    question: 'What are the entry requirements?',
    answer: [
      'They vary by course. Business Management is listed as requiring a KCSE mean grade of C- (minus).',
      'Requirements for the other courses have not been published, so ask the institute about the course you are interested in before you apply.',
    ],
  },
  {
    id: 'fees',
    question: 'How much are the fees?',
    answer: [
      'Motech has not published a fee structure, so this website does not list fees for any course.',
      'Call or email to ask what a course costs, what the fee covers and how it is paid. It is worth asking whether there is a separate application or examination fee.',
    ],
    link: { label: 'Contact the institute', to: '/contact' },
  },
  {
    id: 'duration',
    question: 'How long does a course take?',
    answer: [
      'It depends on the course and the level, from short certificates to diplomas running over two years or more. The length listed for each course is shown on its own page.',
      'Confirm the length with the institute when you enquire, along with how many hours a week you would be studying.',
    ],
    link: { label: 'Browse courses', to: '/courses' },
  },
  {
    id: 'intakes',
    question: 'When is the next intake?',
    answer: [
      'Intake dates and application deadlines are not published on this website. Contact the institute to find out when the next intake starts and whether applications are open.',
    ],
  },
  {
    id: 'online',
    question: 'Can I study online?',
    answer: [
      'Several courses are listed as being taught in class, online, or a mix of the two. Each course page shows the study modes listed for it.',
      'Confirm with the institute how the online classes run and what you would need, such as a reliable connection or a laptop.',
    ],
  },
  {
    id: 'location',
    question: 'Where is Motech?',
    answer: [
      'Mwalimu Coop House on Tom Mboya Street, opposite Ambassador’s Hotel, in the Nairobi central business district.',
    ],
    link: { label: 'Contact and directions', to: '/contact' },
  },
  {
    id: 'apply',
    question: 'How do I apply?',
    answer: [
      'Start by contacting the institute about the course you want. They can confirm whether you meet the entry requirements, what the fees are and what you need to bring.',
      'This website cannot take an application or save your details. Applications go through the institute directly.',
    ],
    link: { label: 'Contact the institute', to: '/contact' },
  },
]
