/**
 * Single source of truth for institutional details.
 *
 * Everything under `contact` and the motto was gathered from online listings
 * (Elimys directory and a photographed signboard). It is PROVISIONAL until the
 * institute confirms it. See docs/CONTENT-TO-CONFIRM.md.
 */
export const siteConfig = {
  name: 'Motech Technology Training Institute',
  shortName: 'Motech',
  tagline: 'Career Shaper', // Appears on the logo and listings; awaiting confirmation.

  // Production domain is not decided yet. While null, no canonical or og:url is emitted.
  url: null,

  // When false, every page asks search engines not to index it.
  // Individual course pages stay noindex regardless, until each course's `verified` flag is
  // set in src/data/courses.js — a page of "ask us" placeholders is not a useful result.
  indexable: true,

  // Path under /public. Set to null to fall back to the text brand mark.
  // The official Motech seal, supplied by the institute.
  logoSrc: '/images/schoolLogo.jpeg',

  contact: {
    phones: [
      { id: 'main', display: '+254 722 330 670', tel: '+254722330670' },
      { id: 'second', display: '+254 758 223 130', tel: '+254758223130' },
    ],
    email: 'technologymotech@gmail.com',
    address: {
      lines: ["Mwalimu Coop House, Tom Mboya Street", "Opposite Ambassador's Hotel", 'Nairobi CBD'],
      short: 'Mwalimu Coop House, Tom Mboya Street, Nairobi CBD',
    },
    postal: 'P.O. Box 11518-00100, Nairobi',
    // Coordinates from the Elimys listing. Opens a map search, no embedded third-party script.
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=-1.2852613,36.8239981',
  },
}

export const mainPhone = siteConfig.contact.phones[0]
