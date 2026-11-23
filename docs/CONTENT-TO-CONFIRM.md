# Content the institute must confirm

**Most of this list is now resolved.** The institute supplied its printed brochure and
confirmed it current on 19 November 2026. That document is a first-party published source, far
stronger than the Elimys directory listing this site was first built from, and it supersedes
the listing wherever the two disagree. It is transcribed cell by cell in
`BROCHURE-TRANSCRIPTION.md`, which is now the source of record for everything on the site.

What follows is only what the brochure does **not** settle. For things the institute could
supply that would *add* to the site rather than correct it — news, photographs, financing,
intake dates — see `IMPROVEMENTS.md`, which also carries a list of questions ready to put to
them.

## 1. Resolved by the brochure

| Item | Now published | Source |
| --- | --- | --- |
| Address, including floor | Mwalimu Co-op House, 8th Floor, Tom Mboya Street | §1 |
| Registration number | TVETA/PRI/TVC/0245/2025 | §1 |
| Accreditation | TVETA, KASNEB, KNEC, NITA — named, logos not shown | §2 |
| WhatsApp | 0758 223 130, marked by hand on the brochure | §1 |
| Withdrawn number | 0758 982 859, struck through — removed from the site | §1 |
| Year established | "more than 10 years ago" (confirmed verbally, 19 Nov 2026) | §2 |
| Motto | The Career Shaper | §1 |
| Vision, mission, core values | On /about, in the institute's own words | §3 |
| Why choose Motech | Nine points, on /about and the homepage | §4 |
| Admission requirements | KSh 1,000 registration fee, ID, 2 photos, KCPE/KCSE results | §5 |
| Payment | I&M Bank Paybill 542542, A/C 32015 | §1 |
| Class times | Three sessions, on /admissions, /contact and /student-life | §6 |
| Course catalogue | 86 courses, 14 schools, with entry requirement, duration, examiner and fees per level | §7–§19 |
| Student life | Hostels, prayer room, religious groups, free WiFi, industrial attachment | §4 |

The directory listing's claims that contradicted the brochure have been dropped: ICT is an
18-month diploma, not five years; CPA and CIFA are not one three-month certificate; HR
Management is an 18-month diploma, not six months; and the institute was not founded in 2025 —
that is the year of its TVETA registration.

## 2. Still outstanding

### Cells the brochure leaves unclear
Tracked in §21 of the transcription. The site renders each as "Ask the institute when you
enquire" rather than guessing, so none of them block anything:

1. ICT short courses — durations and fees for Advanced Excel, Digital Marketing and
   Artificial Intelligence, where the printed cell borders are misaligned.
2. Information Technology certificate — the duration cell is blank in the print.
3. "Higher Diploma in Secretariat" — is this Secretarial Studies?
4. "YCA" in the religious groups list.
5. Whether fees printed under a bare "Fees" heading are per term, per year or in total. The
   School of Business and School of Humanities tables give a figure with no period against it,
   so the site shows "KSh 15,000" with no unit.

### Logos
The brochure prints the KASNEB, KISEB, KNEC, NITA, ICM and ACCA marks. The site **names** the
accrediting bodies and displays **no marks yet**: naming a body is a statement of fact, while
reproducing its logo needs that body's permission.

The badge row is already built, for TVETA, KASNEB, KNEC and NITA, and falls back to the
body's name in type while `logo` is null. Supply written permission from each body, then the
mark from that body's own site, and see `public/images/accreditation/README.md`.

### Photographs — still the main launch blocker
The homepage hero and the page banners are **stock photographs from Unsplash**, wired up in
`src/data/media.js` and marked `isPlaceholder: true`. They are not pictures of Motech. A
visitor reads a photograph on an institute's website as being that institute, so shipping them
would misrepresent the school, and they load from Unsplash's servers rather than ours.

Course cards no longer carry photographs at all — they use the school's icon instead, which is
honest and loads nothing third-party.

Needed: photographs of the premises, classrooms and students that Motech owns and may publish,
with recorded consent from anyone recognisable and from a parent or guardian for anyone under
18. The brochure's own photographs are the right subject matter, but the files we have are
phone shots of a folded printed page — low resolution, with glare and page curvature. Ask for
the original digital files, or the brochure artwork.

### Other
- An email address on the institute's own domain would read as more credible than Gmail.
- Official social media accounts, or we add none.
- Testimonials, only if genuine, attributed and authorised.
- A privacy policy, required under the Kenya Data Protection Act before any real enquiry form
  is added. The site currently stores and sends nothing: every enquiry link opens the
  visitor's own phone, WhatsApp or email app.

## 3. Technical

- **Domain and hosting.** Until the domain is known, `siteConfig.url` stays `null`, and no
  canonical URL, Open Graph URL or sitemap entry is emitted. Set it and rebuild.
- `siteConfig.indexable` is `true`. Every page is now offered to search engines, including all
  86 course pages and /student-life, because every page carries confirmed content.

## 4. Brochure corrections for the next print run

Listed in §23 of the transcription. The website works around all of them; the paper does not.
The one that matters most is **"TEVETA" where the registration number should read "TVETA"** —
the institute's accreditation body, misspelt on its own brochure.
