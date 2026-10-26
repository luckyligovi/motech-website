import { Outlet } from 'react-router'
import MobileActionBar from './MobileActionBar'
import ScrollToTop from './ScrollToTop'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

/** Shared chrome around every page. */
export default function Layout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-md bg-accent px-4 py-2 font-semibold text-navy-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="bg-paper outline-none">
        <Outlet />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </>
  )
}
