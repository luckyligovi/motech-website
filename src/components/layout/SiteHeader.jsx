import { useState } from 'react'
import { NavLink } from 'react-router'
import { Menu } from 'lucide-react'
import { primaryNav } from '../../data/navigation'
import Button from '../ui/Button'
import Container from '../ui/Container'
import Logo from '../shared/Logo'
import MobileMenu from './MobileMenu'

const navLinkClass = ({ isActive }) =>
  `relative rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
    isActive
      ? 'text-white after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent'
      : 'text-white/80 hover:text-white'
  }`

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-950/95 supports-[backdrop-filter]:bg-navy-950/70 supports-[backdrop-filter]:backdrop-blur-xl">
      <Container className="flex h-18 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={navLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* On phones the bottom action bar already offers Enquire. */}
          <div className="hidden lg:block">
            <Button to="/contact">Enquire</Button>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid size-11 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
          >
            <Menu aria-hidden="true" className="size-6" />
          </button>
        </div>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} items={primaryNav} />
    </header>
  )
}
