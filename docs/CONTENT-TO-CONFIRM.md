# Content the institute must confirm

Nothing in this list may be published as fact until Motech confirms it in writing.
Sources so far: the Elimys directory listing and a photographed signboard in that listing's
hero image. Neither is an official statement from the institute.

## 1. Contact and identity

| Item | Currently used | Status |
| --- | --- | --- |
| Institute name | Motech Technology Training Institute | Consistent across sources |
| Address | Mwalimu Coop House, Tom Mboya Street, opposite Ambassador's Hotel, Nairobi CBD | Confirm. The signboard also says "8th floor" |
| Phone (main) | +254 722 330 670 | Confirm |
| Phone (second) | +254 758 223 130 | From the signboard only. Confirm |
| Email | technologymotech@gmail.com | Confirm. A domain address would read as more credible |
| Postal | P.O. Box 11518-00100, Nairobi | Confirm |
| Motto | "Career Shaper" | Appears on the logo and listing. Confirm |
| Year established | 2025 (per listing) | Confirm. Not yet used on the site |
| WhatsApp | Not used | Confirm the number before any WhatsApp link is added |
| Social media | None used | Supply official accounts, or we add none |
| Opening hours | Not used | Supply if visitors should know them |

## 2. Accreditation and registration — do not publish without evidence

The signboard reads "TVETA ACCREDITED" with registration number TVETA/PRI/TVC/0245/2025, and
shows the logos of KASNEB, KISEB, JP International, NITA, ICM and ACCA. The same listing's
information page records the registration number as "NA" and its licences page is empty.

These two sources disagree, so the website currently makes **no** accreditation claim.
Needed before any such claim is published:

- The TVETA registration certificate, and the exact registered name and number.
- Written confirmation of each examining body relationship, and what it covers.
- Whether each body's logo may be displayed.

## 3. Courses

Twelve courses are listed online. Confirm for each: the official name, the qualification
awarded, the level, the duration, the entry requirements, the fees and the examining body.

| Course | Level (listed) | Duration (listed) | Examiner (listed) |
| --- | --- | --- | --- |
| ICT & Computer Studies | Diploma | 5 years | NITA, ICM, internal |
| Business Management | Diploma | 2 years | KNEC, internal |
| Human Resource Management | Diploma | 6 months | KNEC, internal |
| Community Development and Social Work | Diploma | 2 years | NITA, KASNEB, internal |
| CPA / CIFA | Certificate | 3 months | KASNEB, internal |
| Accounting Technician Diploma | Certificate | 3 months | KASNEB, internal |
| Certificate in Accounting and Management Skills | Certificate | 3 months | KASNEB, internal |
| Business Data Analysis | Certificate | 3 months | KASNEB, internal |
| Nutrition and Dietetics | Diploma | 2 years | KNEC and internal |
| Health Care Assistant | Diploma | 6 months | JP International, NITA, KNEC |
| Food and Beverage | Diploma | 2 years | KNEC, ICM, JP, NITA |
| Languages | Certificate | 6 months | Internal |

Points that look wrong and need checking before publication:

- "Accounting Technician Diploma" is listed as a **certificate** lasting 3 months.
- Human Resource Management and Health Care Assistant are listed as **diplomas** lasting 6 months.
- ICT & Computer Studies is listed as a **5-year** diploma.
- CPA and CIFA are two separate qualifications shown as one 3-month certificate.
- Entry requirement is given only for Business Management: KCSE C-. Needed for every course.
- Fees are "Contact Institution" everywhere, and the fee structure page is empty.

The signboard also advertises areas absent from the course list: Hotel & Tourism,
Health & Social Sciences, KCSE / IGCSE / bridging, and engineering. Confirm whether these
are offered before they appear anywhere on the site.

## 4. Admissions

- The listed intake runs Dec 2025 – Dec 2026, deadline 31 December 2026. Confirm.
- Supply the real application steps, required documents and how to pay fees.
- Confirm whether applications are accepted by phone, email or in person.

## 5. Assets and content

- ~~Official logo file.~~ **Supplied.** The institute's seal is in
  `public/images/schoolLogo.jpeg` and wired up via `siteConfig.logoSrc`; the favicons are
  generated from it. A vector (SVG) version would be sharper at small sizes if available.
- Brand guidelines, if any exist.
- **Photographs — currently a stock placeholder, must be replaced before launch.** The
  homepage hero uses a stock photograph from Unsplash, wired up in `src/data/media.js` and
  marked `isPlaceholder: true`. It is not a picture of Motech. A visitor reads a photograph
  on an institute's website as being that institute, so shipping it would misrepresent the
  school, and it is also loaded from Unsplash's servers rather than ours.

  Needed: photographs of the premises, classrooms and students that Motech owns and may
  publish, with recorded consent from anyone recognisable, and from a parent or guardian for
  anyone under 18. Images from the directory listing are not used: we have no licence.
- An approved description of the institute. The welcome note on the listing could be adapted.
- Testimonials, only if genuine, attributed and authorised.
- **Student life content.** A `/student-life` page now exists, but holds only verified facts
  (central location, study modes). Its "Clubs, activities and facilities" section defers to the
  institute because none of that has been supplied — nothing there is invented. The page is set
  `noindex` (in `src/seo/meta.js`) until real content is added; supply clubs, societies, sports,
  activities, facilities or student stories (genuine and authorised) to flesh it out, then lift
  the `noindex`.

## 6. Technical

- Preferred domain name and hosting. Until the domain is known, `siteConfig.url` stays null
  and no canonical or Open Graph URL is emitted.
- `siteConfig.indexable` is `false`, so every page currently asks search engines not to index
  it. Set it to `true` only when the content is approved and the site is live on its domain.
- Privacy policy and terms, if the site is to carry them. A real enquiry form would need a
  privacy notice under the Kenya Data Protection Act.
