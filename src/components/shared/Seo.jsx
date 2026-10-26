import { siteConfig } from '../../config/site'
import { metaForPath } from '../../seo/meta'

/**
 * Per-page metadata. React 19 moves <title>, <meta> and <link> rendered here into <head>.
 *
 * All values come from src/seo/meta.js, the single source shared with the build-time
 * prerender, so the client-rendered head matches the static HTML exactly. Pass the route path;
 * for a course page pass `/courses/<slug>`.
 */
export default function Seo({ path }) {
  const { title, description, noindex, canonical } = metaForPath(path)

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </>
  )
}
