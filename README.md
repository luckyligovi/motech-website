# Motech Technology Training Institute — website

Frontend for the Motech Technology Training Institute website (Nairobi, Kenya).

## Running it

```bash
npm install
npm run dev      # development server
npm run lint     # oxlint
npm run build    # production build + prerender into dist/
npm run preview  # serve the production build
npm run build:spa  # client-only build, no prerender (rarely needed)
```

`npm run build` runs three steps: the client build, a server build of
`src/entry-server.jsx`, and `scripts/prerender.mjs`, which writes a static HTML file for every
route (see "SEO and prerendering" below).

## Stack

React 19, Vite 8, JavaScript (no TypeScript), Tailwind CSS v4, Lucide icons, React Router 8.

Tailwind v4 is configured CSS-first: design tokens live in the `@theme` block of
`src/index.css`, and there is no `tailwind.config.js`. The Manrope typeface is self-hosted
through `@fontsource-variable/manrope`, so the site makes no third-party font request.

## Layout of the code

```
src/
  config/site.js        institutional details, in one place
  data/                 navigation, course categories (content, not UI)
  lib/contactLinks.js   builders for tel: and mailto: links
  components/ui/        Button, Container, GlassPanel, PageHeader, Blueprint
  components/layout/    header, mobile menu, footer, mobile action bar
  components/shared/    Seo, Logo, ContactDetails
  components/home/      hero and its programme finder
  pages/                one component per route
  seo/meta.js           per-route title/description/robots (shared with the prerender)
  entry-server.jsx      build-time render entry (never runs in the browser)
  routes.jsx            route table
scripts/prerender.mjs   writes static HTML per route + sitemap.xml + robots.txt
```

Rules that keep it consistent: institutional facts come from `config/site.js`, never typed
into a component; every action uses `Button`, which renders a router link, an anchor or a
real button depending on its props; the glass effect lives in the `glass` utility in
`src/index.css` and nowhere else.

## Important: unverified content

Course details, accreditation and some contact details are not yet confirmed by the
institute. See `docs/CONTENT-TO-CONFIRM.md` before publishing anything. Photographs are stock
placeholders — see `docs/PHOTO-CREDITS.md`.

## SEO and prerendering

Metadata for every route lives in one place, `src/seo/meta.js` (title, description, robots).
Both the client `Seo` component and the build-time prerender read from it, so they never drift.

`scripts/prerender.mjs` renders each route to a static HTML file (`dist/about/index.html`, and
so on) using `react-dom/server` — no headless browser, so it stays part of a normal build. This
means crawlers and social scrapers (WhatsApp, Facebook) get real content and the correct
title/description without running JavaScript. `EducationalOrganization` structured data is in
`index.html` (confirmed contact facts only). The build also writes `robots.txt` and
`sitemap.xml`.

Two switches in `src/config/site.js`:

- **`url`** — the production domain. While `null`, no canonical/`og:url` is emitted and the
  sitemap is empty (with a note). Set it to e.g. `https://motech.ac.ke` and rebuild: canonical
  URLs, `og:url` and an absolute-URL sitemap all appear. This is the one value needed for launch.
- **`indexable`** — currently `true`, so the main pages may be indexed. Individual course pages
  stay `noindex` until each course's `verified` flag is set, so unconfirmed course pages are not
  indexed. The sitemap lists only indexable pages.

### Hosting

The build produces one `index.html` per route, so host it on any static host with "clean URLs"
/ directory-index serving (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S+Nginx/Apache):
a request for `/about` should serve `/about/index.html`. Configure the SPA fallback for unknown
paths to `/404.html`. All real routes are prerendered, so most hosts work with no extra config.

## Enquiries

There is no backend. Enquiry actions are `tel:` and `mailto:` links built in
`lib/contactLinks.js`; nothing is stored or submitted. When a backend is added for intake
booking, that module and `EnquiryActions` are the places to change.

## Build phases

1. **Done** — setup, design system, header, mobile menu, footer, hero, contact page.
2. **Done** — course catalogue: `data/courses.js`, course cards, `/courses` with search and
   category filters, and a course detail page per course.
3. **Done** — remaining homepage sections: course preview, about, admissions steps, FAQs.
4. **Done** — About and Admissions pages, with a shared subject-areas grid.
5. **Done** — SEO (per-route prerendering, sitemap, robots, structured data), accessibility
   pass (WCAG 2.1 AA), completion report.

## Editing homepage copy

The written content lives in `src/data`, not in components: `faqs.js` for the questions,
`admissions.js` for the four steps, and `featuredCourseSlugs` in `courses.js` for which six
courses the homepage shows.

Both `faqs.js` and `admissions.js` carry a header explaining what is confirmed and what is
not. The admissions steps in particular are generic, not Motech's published procedure, and
are to be replaced once the institute supplies the real one.

## Adding or changing a course

Everything lives in `src/data/courses.js`; no component needs touching. Append an object with
a unique `slug` and a `category` taken from `src/data/categories.js`, and the catalogue, the
filters, the detail page at `/courses/<slug>` and the related-course lists all pick it up.

Any field you cannot confirm stays `null`. The interface then prints an explicit prompt to
ask the institute, so an unknown is never displayed as a fact. Set a course's `verified` to
`true` once Motech confirms that course's details; until then its detail page carries
`noindex`, because a page of "ask us" placeholders is not a useful search result.
