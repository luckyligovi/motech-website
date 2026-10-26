/**
 * Build-time prerender.
 *
 * Renders every route to static HTML so crawlers and social scrapers get real content and the
 * correct <title>/<meta> without running JavaScript. Pure Node — no headless browser — so it
 * stays part of a normal `npm run build`.
 *
 * Pipeline (see package.json "build"):
 *   1. vite build            -> dist/ with the HTML template and client assets
 *   2. vite build --ssr      -> dist-ssr/entry-server.js (Node-renderable app)
 *   3. node scripts/prerender.mjs (this file)
 *
 * It also writes sitemap.xml and robots.txt, derived from the same route list.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const dist = join(process.cwd(), 'dist')
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const { render, allRoutes, siteConfig } = await import(
  join(process.cwd(), 'dist-ssr', 'entry-server.js')
)

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Build the <head> metadata tags for a route from its resolved meta. */
function headTags(meta) {
  const tags = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(siteConfig.name)}" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
  ]
  if (meta.noindex) tags.push(`<meta name="robots" content="noindex, nofollow" />`)
  if (meta.canonical) {
    tags.push(`<link rel="canonical" href="${escape(meta.canonical)}" />`)
    tags.push(`<meta property="og:url" content="${escape(meta.canonical)}" />`)
  }
  return tags.join('\n    ')
}

// React renders the <Seo> tags inline in the body; strip them so only the head set remains.
const stripInlineMeta = (html) =>
  html
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*\bname="(description|robots)"[^>]*>/gi, '')
    .replace(/<meta\b[^>]*\bproperty="og:[^"]*"[^>]*>/gi, '')
    .replace(/<link\b[^>]*\brel="canonical"[^>]*>/gi, '')

function writeRoute(path) {
  const { appHtml, meta } = render(path)
  const body = stripInlineMeta(appHtml)
  const html = template
    .replace('</head>', `    ${headTags(meta)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)

  const outPath =
    path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, html)
  return meta
}

const routes = allRoutes()
for (const { path } of routes) writeRoute(path)

// 404 page for static hosts (served at /404.html on most of them).
const notFound = render('/404')
writeFileSync(
  join(dist, '404.html'),
  template
    .replace('</head>', `    ${headTags(notFound.meta)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${stripInlineMeta(notFound.appHtml)}</div>`),
)

// robots.txt — allow everything, point to the sitemap only when the domain is known.
const robots = siteConfig.url
  ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', siteConfig.url).href}\n`
  : `User-agent: *\nAllow: /\n\n# Set siteConfig.url and rebuild to add the Sitemap line.\n`
writeFileSync(join(dist, 'robots.txt'), robots)

// sitemap.xml — only the indexable routes, and only when there is an absolute origin to use.
const indexable = routes.filter((r) => r.indexable)
if (siteConfig.url) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = indexable
    .map((r) => {
      const loc = new URL(r.path, siteConfig.url).href
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`
    })
    .join('\n')
  writeFileSync(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  )
} else {
  writeFileSync(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Set siteConfig.url (src/config/site.js) and rebuild to generate absolute URLs. -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>\n`,
  )
}

rmSync(join(process.cwd(), 'dist-ssr'), { recursive: true, force: true })

console.log(
  `Prerendered ${routes.length} routes + 404. Sitemap lists ${
    siteConfig.url ? indexable.length : 0
  } URL(s)${siteConfig.url ? '' : ' (no domain set)'}.`,
)
