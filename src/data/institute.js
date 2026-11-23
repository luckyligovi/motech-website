import {
  BedDouble,
  Briefcase,
  HeartHandshake,
  MapPin,
  Moon,
  Trophy,
  Users,
  Wallet,
  Wifi,
} from 'lucide-react'

/**
 * What the institute says about itself.
 *
 * Every word here is the institute's own, from its printed brochure (transcribed in
 * docs/BROCHURE-TRANSCRIPTION.md, §2–§4). Spelling and punctuation are tidied; the claims are
 * not changed, extended or softened. Nothing is added that the brochure does not say.
 */

export const background = [
  'Motech Technology Training Institute was established more than ten years ago, and is registered and accredited by TVETA, KASNEB, KNEC and NITA to offer competency-based education and training (CBET) programmes.',
  'The college trains in accountancy, business studies, information and communication technology, hospitality and tourism, cosmetology, development studies and engineering.',
  'It is on the 8th floor of Mwalimu Co-op House on Tom Mboya Street, opposite Ambassador Hotel, in the Nairobi central business district.',
]

export const vision =
  'To be the centre of excellence in training business, ICT and technical skills.'

export const mission =
  'To provide professional and practical training so as to maximize on career growth, job creation and self-employment opportunities for our clients in the global market.'

export const coreValues = [
  { name: 'Passion', description: 'Being committed in training.' },
  { name: 'Integrity', description: 'Maintaining honesty in our business and training.' },
  { name: 'Commitment', description: 'Devoted to achieving the goals and objectives of our customers.' },
  { name: 'Innovation', description: 'Driving transformation and creativity in service delivery.' },
]

/** The brochure's "Why Motech Technology" list, in its own order. */
export const whyMotech = [
  { icon: Briefcase, text: 'Industrial attachment for our students' },
  { icon: Users, text: 'Experienced, competent lecturers' },
  { icon: Trophy, text: 'Top performance' },
  { icon: Wifi, text: 'Reliable online classes, with free WiFi' },
  { icon: Wallet, text: 'Affordable, flexible fee payment' },
  { icon: MapPin, text: 'Strategic location for morning and evening classes' },
  { icon: HeartHandshake, text: 'Organized religious groups: CU, YCA, SDA and Muslim' },
  { icon: Moon, text: 'Prayer room for Muslim students' },
  { icon: BedDouble, text: 'Hostels available' },
]

/**
 * The examining and accrediting bodies named in the brochure's background paragraph.
 *
 * Names only. The brochure also prints these bodies' logos, but permission to reproduce a
 * logo is a separate matter from naming an accreditation, so none are displayed.
 * See §21 of the transcription.
 */
export const accreditedBy = ['TVETA', 'KASNEB', 'KNEC', 'NITA']

/** Examining bodies the course tables name, beyond those above. */
export const examiningBodies = ['KASNEB', 'KNEC', 'NITA', 'ICM', 'JP-UK', 'KISEB', 'ACCA']

/**
 * The accreditation badges, shown in the homepage hero and on the About page.
 *
 * Exactly the four bodies the brochure's own sentence names — "registered and accredited by
 * TVETA, KASNEB, KNEC and NITA" — and the role each plays, which is what a prospective
 * student is actually checking.
 *
 * Nothing may be added here that the institute has not stated in writing. An accreditation
 * is a claim about somebody else's organisation, and the wrong one is a serious thing to
 * print.
 *
 * `logo` is a path under /public, or null. While it is null the badge renders as the body's
 * name set in type, so the row works either way.
 *
 * `logoScale` corrects for the whitespace baked into the supplied artwork. Each mark sits in
 * its own file with a different amount of padding around it — NITA's is a square with the
 * wordmark across the middle third — so rendering them all at one height would make some
 * look half the size of others. The badge clips to a fixed box, so scaling up crops
 * whitespace rather than making the card taller. One number per logo; raise it until the
 * mark matches its neighbours.
 *
 * `fullName` is the alt text. A logo is not decorative here: it is the evidence, so a
 * screen-reader user must get the same claim a sighted one does.
 */
export const accreditationBadges = [
  {
    name: 'TVETA',
    fullName: 'Technical and Vocational Education and Training Authority',
    role: 'Registered',
    logo: '/images/accreditation/tveta.webp',
    logoScale: 1,
  },
  {
    name: 'KASNEB',
    fullName: 'Kenya Accountants and Secretaries National Examinations Board',
    role: 'Examining body',
    logo: '/images/accreditation/kasneb.webp',
    logoScale: 1.7,
  },
  {
    name: 'KNEC',
    fullName: 'Kenya National Examinations Council',
    role: 'Examining body',
    logo: '/images/accreditation/knec.webp',
    logoScale: 1,
  },
  {
    name: 'NITA',
    fullName: 'National Industrial Training Authority',
    role: 'Accredited',
    logo: '/images/accreditation/nita.webp',
    logoScale: 2.2,
  },
]
