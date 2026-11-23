import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Menu } from 'lucide-react'
import { actionNav, primaryNav } from '../../data/navigation'
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
    <header className="glass sticky top-0 z-40 border-b border-white/10">
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
          {/* On phones the bottom action bar already carries both of these. */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              to={actionNav.secondary.to}
              className="rounded-md px-1 py-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
            >
              {actionNav.secondary.label}
            </Link>
            <Button to={actionNav.primary.to} variant="whatsapp" icon={actionNav.primary.icon}>
              {actionNav.primary.label}
            </Button>
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
