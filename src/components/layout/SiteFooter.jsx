import { Link } from 'react-router'
import { Mail, MapPin, Phone } from 'lucide-react'
import { siteConfig } from '../../config/site'
import { actionNav, primaryNav } from '../../data/navigation'
import { mailtoHref, telHref, whatsappHref } from '../../lib/contactLinks'
import { courses } from '../../lib/courses'
import { schools } from '../../data/schools'
import Container from '../ui/Container'
import Logo from '../shared/Logo'
import WhatsAppIcon from '../ui/WhatsAppIcon'

const footerLinkClass =
  'inline-flex items-center gap-2.5 rounded text-white/80 transition-colors hover:text-white'
const currentYear = new Date().getFullYear()

export default function SiteFooter() {
  const { contact } = siteConfig
  const whatsapp = whatsappHref()

  return (
    <footer className="glass border-t border-line pt-14 pb-28 text-white md:pb-10">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              {courses.length} courses across {schools.length} schools — accountancy, business,
              ICT, hospitality, cosmetology, health, engineering and languages — in the centre of
              Nairobi.
            </p>
            <p className="mt-3 text-xs text-white/60">Reg. no. {siteConfig.registration}</p>
          </div>

          <nav aria-labelledby="footer-explore" className="md:col-span-3">
            <h2 id="footer-explore" className="text-sm font-bold text-white">
              Explore
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {[...primaryNav, actionNav.primary].map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link to={to} className={footerLinkClass}>
                    {Icon && <Icon aria-hidden="true" className="size-4 shrink-0 text-accent" />}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-sm font-bold text-white">Contact</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/80">
              <li className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>
                  {contact.address.short}
                  <br />
                  {contact.postal}
                </span>
              </li>
              {contact.phones.map((phone) => (
                <li key={phone.id} className="flex gap-3">
                  <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                  <a href={telHref(phone)} className={footerLinkClass}>
                    {phone.display}
                  </a>
                </li>
              ))}
              <li className="flex gap-3">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                <a href={mailtoHref()} className={footerLinkClass}>
                  {contact.email}
                </a>
              </li>
              {whatsapp && (
                <li className="flex gap-3">
                  <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-whatsapp" />
                  <a href={whatsapp} className={footerLinkClass}>
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/70 sm:flex-row sm:justify-between">
          <p>
            &copy; {currentYear} {siteConfig.name}
          </p>
          <p>Fees and course details are as printed in the institute&rsquo;s brochure. Confirm before enrolling.</p>
        </div>
      </Container>
    </footer>
  )
}
