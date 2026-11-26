/**
 * Single source of truth for institutional details.
 *
 * Everything here is taken from the institute's own printed brochure, which Motech confirmed
 * current on 19 November 2026 and which is transcribed in docs/BROCHURE-TRANSCRIPTION.md.
 * That document supersedes the online directory listing the site was first built from.
 */
export const siteConfig = {
  name: 'Motech Technology Training Institute',
  shortName: 'Motech',
  tagline: 'The Career Shaper',

  /**
   * The brochure says the institute was "established more than 10 years ago", then registered
   * and accredited by TVETA, KASNEB, KNEC and NITA. It gives no founding year, so the site
   * says "more than 10 years" and nothing more precise. The 2025 in the registration number
   * is the year of registration, not of founding — never write "founded 2025".
   */
  established: 'more than 10 years ago',

  /**
   * TVETA registration, printed on the brochure cover. (The brochure sets it as "TEVETA",
   * which is a misprint of TVETA, the Technical and Vocational Education and Training
   * Authority; the number itself is unchanged. See §23 of the transcription.)
   */
  registration: 'TVETA/PRI/TVC/0245/2025',

  /**
   * The site's own address. Registered with HostAfrica on 26 November 2026 and pointed at
   * Cloudflare; see docs/DEPLOYMENT.md.
   *
   * Everything canonical derives from this one value: the <link rel="canonical"> and og:url
   * on every page, and the absolute URLs in sitemap.xml and the Sitemap line of robots.txt,
   * all written by scripts/prerender.mjs at build time. Setting it back to null turns all of
   * them off rather than emitting a wrong address.
   */
  url: 'https://motechinstitute.ac.ke',

  // When false, every page asks search engines not to index it.
  indexable: true,

  // Path under /public. Set to null to fall back to the text brand mark.
  logoSrc: '/images/schoolLogo.jpeg',

  /** Offered institute-wide, not per course: "Online / Physical Classes Available". */
  studyModes: ['In class', 'Online'],

  /**
   * The intake badge in the homepage hero.
   *
   * The brochure says only "INTAKE ONGOING" and names no months, so that is all the site
   * says. Once the institute confirms its intake calendar (question 2 in
   * docs/IMPROVEMENTS.md), put the months here — "January and May intake open" — and the
   * badge picks them up. Do not guess them: a student who turns up for an intake that does
   * not exist has been misled by this website.
   */
  intake: { label: 'Intake ongoing', open: true },

  /** Printed on the brochure under "INTAKE ONGOING". */
  classTimes: [
    { id: 'early', label: 'Early morning', time: '6:15 am – 7:50 am' },
    { id: 'fulltime', label: 'Full time', time: '8:30 am – 4:00 pm' },
    { id: 'evening', label: 'Evening', time: '5:40 pm – 7:40 pm' },
  ],

  contact: {
    phones: [
      { id: 'main', display: '+254 722 330 670', tel: '+254722330670' },
      { id: 'second', display: '+254 758 223 130', tel: '+254758223130', whatsapp: '254758223130' },
    ],
    email: 'technologymotech@gmail.com',
    address: {
      lines: [
        'Mwalimu Co-op House, 8th Floor',
        'Tom Mboya Street, opposite Ambassador Hotel',
        'Nairobi CBD',
      ],
      short: 'Mwalimu Co-op House, 8th Floor, Tom Mboya Street, Nairobi CBD',
    },
    postal: 'P.O. Box 11518-00100, Nairobi',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=-1.2852613,36.8239981',
  },

  /** I&M Bank paybill, printed on the brochure cover. */
  payment: { method: 'I&M Bank Paybill', paybill: '542542', account: '32015' },

  /**
   * Charged once per calendar year and not refundable, per the brochure's admission
   * requirements. Separate from course fees.
   */
  registrationFee: { amount: 1000, note: 'non-refundable, payable every calendar year' },
}

export const mainPhone = siteConfig.contact.phones[0]

/** The number the brochure marks for WhatsApp, or null if none is marked. */
export const whatsappPhone = siteConfig.contact.phones.find((phone) => phone.whatsapp) ?? null
