/** Decorative technical grid for dark bands. Hidden from assistive technology. */
export default function Blueprint({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`bg-blueprint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_75%_35%,black,transparent_70%)] ${className}`}
    />
  )
}
