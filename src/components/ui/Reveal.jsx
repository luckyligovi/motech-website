import { useEffect, useRef, useState } from 'react'

/**
 * Reveals its children once, the first time they scroll into view: a short fade and rise.
 *
 * One treatment, used deliberately on section blocks rather than on every element, so the
 * page has a sense of arrival without the scattered motion that reads as generated.
 *
 * Motion is skipped entirely when the viewer prefers reduced motion, and when the browser
 * has no IntersectionObserver the content simply shows — it never stays hidden.
 */
// Decide once, at mount, whether this environment animates at all. When it does not — reduced
// motion, server render, or no IntersectionObserver — content starts visible and never hides.
const animates = () =>
  typeof window !== 'undefined' &&
  typeof IntersectionObserver !== 'undefined' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(() => !animates())

  useEffect(() => {
    if (shown) return

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [shown])

  return (
    <Tag
      ref={ref}
      style={shown ? { transitionDelay: `${delay}ms` } : undefined}
      className={`motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${
        shown ? 'opacity-100' : 'motion-safe:translate-y-6 motion-safe:opacity-0'
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
