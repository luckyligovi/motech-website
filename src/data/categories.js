import { Briefcase, Calculator, HeartPulse, Languages, Laptop, UtensilsCrossed } from 'lucide-react'

/**
 * Course categories, based on the programmes listed online for Motech.
 * Categories are deliberately uneven in size; the layout should not pretend otherwise.
 *
 * `image.id` is an Unsplash photo id used as a placeholder until Motech supplies its own
 * photography (see src/lib/images.js). `image.credit` records the photographer for the
 * attribution list. `image` is decorative on the homepage tiles, so alt text is empty there;
 * where a category image carries meaning, give it a real description at the point of use.
 */
export const categories = [
  {
    slug: 'ict-computer-studies',
    name: 'ICT and computer studies',
    icon: Laptop,
    image: { id: 'photo-1719159381981-1327b22aff9b', credit: 'Mohammad Shahhosseini' },
  },
  {
    slug: 'business-management',
    name: 'Business and management',
    icon: Briefcase,
    image: { id: 'photo-1573164574511-73c773193279', credit: 'Scott Graham' },
  },
  {
    slug: 'accounting-finance',
    name: 'Accounting and finance',
    icon: Calculator,
    image: { id: 'photo-1554224155-6726b3ff858f', credit: 'Scott Graham' },
  },
  {
    slug: 'health-nutrition',
    name: 'Health and nutrition',
    icon: HeartPulse,
    image: { id: 'photo-1490645935967-10de6ba17061', credit: 'Brooke Lark' },
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    icon: UtensilsCrossed,
    image: { id: 'photo-1622021142947-da7dedc7c39a', credit: 'Yes and Studio' },
  },
  {
    slug: 'languages',
    name: 'Languages',
    icon: Languages,
    image: { id: 'photo-1673515334669-1e445e4f4c3f', credit: 'Joshua Hoehne' },
  },
]
