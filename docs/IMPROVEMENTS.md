# Improvement backlog

Ideas for the next round of work, with the questions that have to be answered first.

Most of this came from reviewing **Thika Technical Training Institute**
(https://www.thikatechnical.ac.ke/) on 19 November 2026 — a government TVET college of
comparable scope — and comparing it against what this site does. Only its structure and
content were reviewed, not its visual design.

Nothing here is a change to what the site currently says about Motech. Anything requiring a
new factual claim is listed in §4 as a question for the institute, not assumed.

---

## 1. Keep — where this site is already ahead

Worth stating plainly, so none of it gets traded away while chasing the list below.

| | This site | Thika TTI |
| --- | --- | --- |
| Course details | Level, entry requirement, duration, examining body **and fees** for all 86 courses, in comparable tables | Departments described in prose; no course specifics on the department pages |
| Fees | On the page, in an aligned column, searchable | A PDF download |
| Applying | About a minute, on WhatsApp | Portal account + PDF uploads, or KSh 500 at KCB Thika branch |
| Finding a course | Search across names, schools, levels and tools, plus a 14-school index | Navigate department by department |

For a student choosing a college on price, the fee tables are the single strongest thing this
site has. Do not move fees into a download.

Equally, do not copy: a separate portal subdomain, or department pages that are prose instead
of data.

---

## 2. Buildable now — no new information needed

Each of these uses data the site already holds, so nothing has to be confirmed first.

1. **Statistics band.** 86 courses, 14 schools, 7 examining bodies, "more than 10 years".
   Derived from `src/data/` at build time, so the figures cannot go stale. Thika runs the
   same idea with graduate numbers; ours should use only what we can stand behind.
2. **Notices band and a notices mechanism.** A small data file of dated announcements,
   rendered on the homepage and an archive page. Build the mechanism now; it stays hidden
   until there is something to put in it (§4, question 1).
3. **Surface industrial attachment properly.** It is the first item on the brochure's own
   "Why Motech" list and currently appears only as one line among nine. Thika gives Dual
   Training and Industry Linkages their own feature cards.

---

## 3. Blocked on the institute

Ordered by how much each would improve the site against the effort of getting it.

1. **Photographs.** The largest remaining gap, and already the main launch blocker — see
   `CONTENT-TO-CONFIRM.md`. Thika runs a campus gallery; this site has stock placeholders in
   the hero and page banners, and deliberately no photographs on course cards.
2. **News and notices content.** Three or four dated items change how alive a site feels more
   than any amount of design work. Graduations, intake announcements, new courses, visits.
3. **The brochure as a PDF**, for a downloads page. Thika offers its fee structure, brochure,
   application forms and a Service Charter in English and Swahili. We already publish the
   brochure's content; offering the document itself costs nothing once the file exists.
4. **Financing.** Thika links HELB, HEF and KUCCPS prominently. For many Kenyan applicants
   this decides whether they enrol at all, and this site says nothing about it.
5. **Intake dates.** "Intake ongoing" is what the brochure says, but Thika states each
   intake's status — January closed, May closed, September open — which tells an applicant
   where they stand. Dates would let us do the same.
6. **Accreditation logos — the slot is built, the files are not here.** The hero and the
   About page both carry a four-badge row for TVETA, KASNEB, KNEC and NITA. Each badge shows
   the body's name set in type until a logo file exists, so the row is complete either way.
   To finish it: get written permission from each body, download its mark from its own site,
   drop the file in `public/images/accreditation` (that folder's README has the sources and
   sizes) and set `logo` in `src/data/institute.js`. Nothing else changes.

---

## 4. Questions for the institute

Written to be read out or forwarded as-is.

**About news and announcements**

1. Do you have any recent news we can publish — graduations, intakes starting, new courses,
   visits, partnerships? Even three or four items, each with a date, would help. Who will
   send new ones as they happen?

**About intakes**

2. When does the next intake start, and is there a closing date for applications?
3. Do intakes run to a fixed calendar (for example January, May and September), or is
   enrolment genuinely continuous all year?

**About money**

4. Can Motech students apply for **HELB** loans or **HEF** funding? If so, what do they need
   from the institute to do it?
5. Are there bursaries, scholarships or payment plans we should mention?
6. Is the KSh 1,000 registration fee paid through the I&M paybill (542542, account 32015), or
   somewhere else? Are course fees paid the same way?

**About documents and photographs**

7. Do you have the brochure as a PDF, or the original artwork from the printer? We would like
   to offer it as a download.
8. Do you have a fee structure document, a service charter, or an application form that
   should be downloadable?
9. Photographs of the premises, classrooms, students and graduations that Motech owns and may
   publish — with consent from anyone recognisable, and from a parent or guardian for anyone
   under 18. The brochure's own pictures are the right subject; we need the original files,
   not photographs of the printed page.

**About accreditation**

10. May we display the KASNEB, KISEB, KNEC, NITA, ICM and ACCA logos? Each body has to permit
    this in writing. The site currently names them but shows no marks.

**About what else the institute offers**

11. Does Motech offer **Recognition of Prior Learning (RPL)** — assessing people on skills
    they already have rather than on a course? It is a significant TVET route in Kenya and
    Thika features it.
12. How does **industrial attachment** work — which courses, how long, and do you place
    students with specific employers?
13. Is there a careers service, or guidance and counselling for students, as distinct from the
    Guidance and Counselling course?
14. Are there clubs, societies or sports beyond the religious groups listed in the brochure?
15. What do the hostels cost, where are they, and how does a student apply for one? The
    brochure says "hostels available" and nothing more.

---

## 5. Not recommended

- **A student or staff portal**, and **e-learning on its own subdomain.** Thika runs both.
  They are separate products with their own hosting, accounts, support burden and data
  protection obligations — not an extension of a static marketing site.
- **An online application that stores applicant data.** The current WhatsApp flow stores
  nothing, which keeps the institute clear of data-controller obligations under the Data
  Protection Act 2019. Revisit only if the institute specifically wants records, and budget
  for a privacy notice, consent and a retention policy.
