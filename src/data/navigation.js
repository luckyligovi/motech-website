import { BookOpen, ClipboardList, Home, Info, Phone, Users } from 'lucide-react'
import WhatsAppIcon from '../components/ui/WhatsAppIcon'

/**
 * Primary navigation. Every entry must have a matching route in src/routes.jsx.
 *
 * `icon` is decorative: it sits beside the label, never instead of it, and is hidden from
 * screen readers. Icons are drawn in the mobile menu and the footer, where each link has a
 * line to itself and the icon helps the eye find it. The desktop header stays text-only —
 * seven labels, seven icons and the enquiry button do not fit a 1024px bar, and a horizontal
 * strip of icons reads as clutter rather than as signposting.
 *
 * Each icon matches the one that page already uses for itself, so the menu and the page
 * agree: Admissions carries the clipboard from its own "What to bring" panel, Apply carries
 * the message bubble from its WhatsApp buttons.
 */
export const primaryNav = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'About us', to: '/about', icon: Info },
  { label: 'Courses', to: '/courses', icon: BookOpen },
  { label: 'Admissions', to: '/admissions', icon: ClipboardList },
  { label: 'Student life', to: '/student-life', icon: Users },
  { label: 'Contact', to: '/contact', icon: Phone },
]

/**
 * The two things a visitor can *do*, as distinct from the pages they can read.
 *
 * Apply is an action, not a section, so it sits here rather than as a seventh nav item: in
 * the header it is the one filled button, and the enquiry sits beside it as a quieter link.
 * Keeping it out of `primaryNav` is also what lets the desktop bar fit at 1024px.
 */
export const actionNav = {
  secondary: { label: 'Enquire', to: '/contact' },
  primary: { label: 'Apply Now', to: '/apply', icon: WhatsAppIcon },
}
