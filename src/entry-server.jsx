import { StaticRouter } from 'react-router'
import { renderToStaticMarkup } from 'react-dom/server'
import AppRoutes from './routes'
import { allRoutes, metaForPath } from './seo/meta'
import { siteConfig } from './config/site'

// Re-exported for scripts/prerender.mjs, which imports the bundled SSR build (Node-safe).
export { allRoutes, metaForPath, siteConfig }

/**
 * Build-time render of a single route to a static HTML string.
 * Used by scripts/prerender.mjs. Never runs in the browser.
 *
 * Returns the app markup plus the route's resolved metadata; the prerender script builds the
 * document <head> from the metadata (not from tags in the markup), so head output is
 * deterministic and does not depend on React's metadata hoisting.
 */
export function render(path) {
  const appHtml = renderToStaticMarkup(
    <StaticRouter location={path}>
      <AppRoutes />
    </StaticRouter>,
  )
  return { appHtml, meta: metaForPath(path) }
}
