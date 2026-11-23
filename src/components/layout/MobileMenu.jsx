import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router'
import { Phone, X } from 'lucide-react'
import { mainPhone } from '../../config/site'
import { actionNav } from '../../data/navigation'
import { telHref } from '../../lib/contactLinks'
import Button from '../ui/Button'

const linkClass = ({ isActive }) =>
  `flex items-center gap-4 rounded-lg px-4 py-3 text-xl font-bold transition-colors ${
    isActive ? 'bg-white/10 text-accent' : 'text-white hover:bg-white/5'
  }`

/**
 * Full-screen menu built on the native <dialog> element, which gives us a focus trap,
 * Escape-to-close, an inert page behind it and focus return to the menu button for free.
 */
export default function MobileMenu({ open, onClose, items }) {
  const dialogRef = useRef(null)

  // Keep the native dialog in sync with React state.
  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      id="mobile-menu"
      aria-label="Main menu"
      onClose={onClose}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-white backdrop:bg-navy-950/80 lg:hidden"
    >
      {/* Tapping outside the panel closes the menu. Keyboard users have Escape and the close button. */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />
      <div className="relative ml-auto flex h-full w-full max-w-sm flex-col bg-navy-950 px-4 pt-4 pb-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <p className="px-4 text-sm font-semibold text-white/75">Menu</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-full text-white hover:bg-white/10"
          >
            <X aria-hidden="true" className="size-6" />
          </button>
        </div>

        <nav aria-label="Main" className="mt-4 flex-1">
          <ul className="flex flex-col gap-1">
            {items.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'} onClick={onClose} className={linkClass}>
                  {Icon && <Icon aria-hidden="true" className="size-5 shrink-0 opacity-70" />}
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <Button
            to={actionNav.primary.to}
            variant="whatsapp"
            size="lg"
            icon={actionNav.primary.icon}
            onClick={onClose}
          >
            {actionNav.primary.label}
          </Button>
          <Button href={telHref(mainPhone)} variant="glass" size="lg" icon={Phone}>
            Call {mainPhone.display}
          </Button>
        </div>
      </div>
    </dialog>
  )
}
