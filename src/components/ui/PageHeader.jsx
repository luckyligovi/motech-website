import Blueprint from './Blueprint'
import Container from './Container'

/**
 * Navy title band for inner pages. Renders the page's single H1.
 * `above` takes content that belongs over the heading, such as breadcrumbs.
 * `image` ({ src, credit }) sets a background photo behind a navy scrim; without it, the
 * decorative blueprint grid is shown instead.
 */
export default function PageHeader({ title, above, image, children }) {
  return (
    <div className="relative overflow-hidden bg-navy-950 text-white">
      {image ? (
        <>
          <img src={image.src} alt="" className="absolute inset-0 size-full object-cover" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/92 to-navy-950/70"
          />
        </>
      ) : (
        <Blueprint />
      )}

      <Container className="relative py-14 sm:py-16">
        {above && <div className="mb-5">{above}</div>}
        <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {children && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">{children}</p>
        )}
      </Container>
    </div>
  )
}
