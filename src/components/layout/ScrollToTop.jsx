import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** Single-page navigation keeps the old scroll position; reset it, or honour #anchors. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
