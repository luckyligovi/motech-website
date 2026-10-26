# Completion report

The Motech Technology Training Institute website is built. This records what was done, how to
run it, what was checked, and what still needs the institute before launch.

## What was built

A complete, frontend-only website in React 19 + Vite 8 + Tailwind CSS v4, with these pages:

- **Home** — hero, course preview, about snapshot, admissions steps, FAQs.
- **Courses** (`/courses`) — all twelve courses in a searchable, filterable grid.
- **Course detail** (`/courses/<slug>`) — one page per course, with a facts panel that marks
  anything unconfirmed, an enquiry panel and related courses.
- **About** (`/about`) — the institute in verified facts, with the subject areas.
- **Admissions** (`/admissions`) — how to join, what to prepare, admissions FAQs.
- **Contact** (`/contact`) — call, email and visit details, and what helps an enquiry.
- **404** — a real not-found page.

The design is a navy-and-amber glassmorphic system: glass used selectively (header, hero panel,
about panel) over real imagery, flat surfaces elsewhere. One page-load animation and one
scroll-reveal, both disabled under reduced motion.

## How to run it

```bash
npm install
npm run dev      # development
npm run build    # production build + prerender into dist/
npm run preview  # serve the build
```

Node 20+ recommended. The build needs no headless browser.

## Key files

- `src/config/site.js` — all institutional details and the two launch switches (`url`, `indexable`).
- `src/data/` — courses, categories, navigation, FAQs, admissions steps, media. Content, not UI.
- `src/seo/meta.js` — per-route SEO metadata, shared by the client and the prerender.
- `scripts/prerender.mjs` — static HTML per route, plus `sitemap.xml` and `robots.txt`.
- `src/components/` — `ui/` primitives, `layout/` chrome, `shared/` and `courses/` and `home/`.
- `docs/CONTENT-TO-CONFIRM.md`, `docs/PHOTO-CREDITS.md` — what the institute must supply.

## Checks performed

- **Lint**: `oxlint` clean (including the React and jsx-a11y rule sets).
- **Build**: clean; 17 routes + 404 prerendered.
- **Accessibility**: axe-core (WCAG 2.0 / 2.1 A and AA) clean on every page, at desktop and
  mobile. Keyboard navigation, visible focus, a skip link, labelled landmarks, image alt text,
  and reduced-motion support all verified.
- **No-JS / crawlers**: every route serves real content and correct metadata with JavaScript
  disabled (verified against a plain static server).
- **Responsive**: no horizontal overflow at 390 / 768 / 1440px; one `<h1>` and correct heading
  order per page.
- **Interactivity**: search, category filters, mobile menu (open, Escape, focus return) and the
  hash-to-filter links all verified.

## Known limitations and remaining work

**Needs the institute** (see `docs/CONTENT-TO-CONFIRM.md` for the full list):

- The production **domain** — the one value that turns on canonical URLs, `og:url` and the
  sitemap. Set `siteConfig.url` and rebuild.
- **Accreditation / examining bodies** — not published anywhere on the site; the signboard and
  the directory disagree. Needs the TVETA certificate and written confirmation per course.
- **Course details** — levels, durations, entry requirements, fees, qualifications. Only
  Business Management's entry requirement (KCSE C-) is shown; several listed levels/durations
  look inconsistent and are flagged. Fees are shown nowhere.
- **Admissions process** — the four steps are generic, not Motech's published procedure.
- **Photography and logo** — every image is a stock placeholder (`docs/PHOTO-CREDITS.md`); the
  logo is a text mark until an official file is supplied.
- **Approved description, testimonials, social accounts, opening hours, privacy policy.**

**Deferred by design** (frontend-first; the brief defers the backend):

- No enquiry form that stores data. Enquiries are `tel:`/`mailto:` links that store nothing. A
  real form, intake booking and any WhatsApp link wait for the backend. `src/lib/contactLinks.js`
  and `EnquiryActions` are where that integrates.
- Images load from Unsplash's servers; moving them to `/public/images` (with Motech's own
  photos) removes that third-party request.

## Turning on a course page

When the institute confirms a course, fill its fields in `src/data/courses.js` and set its
`verified` to `true`. That both shows the real details (instead of "ask us" prompts) and lifts
the `noindex` on that course's page, so it can be indexed and listed in the sitemap.
