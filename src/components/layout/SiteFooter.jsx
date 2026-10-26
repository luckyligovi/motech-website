import { Link } from 'react-router'
import { Mail, MapPin, Phone } from 'lucide-react'
import { siteConfig } from '../../config/site'
import { primaryNav } from '../../data/navigation'
import { mailtoHref, telHref } from '../../lib/contactLinks'
import Container from '../ui/Container'
import Logo from '../shared/Logo'

const footerLinkClass = 'rounded text-white/80 transition-colors hover:text-white'
const currentYear = new Date().getFullYear()

export default function SiteFooter() {
  const { contact } = siteConfig

  return (
    <footer className="bg-navy-950 pt-14 pb-28 text-white md:pb-10">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Diploma and certificate programmes in ICT, business, accounting, health, hospitality
              and languages, in the centre of Nairobi.
            </p>
          </div>

          <nav aria-labelledby="footer-explore" className="md:col-span-3">
            <h2 id="footer-explore" className="text-sm font-bold text-white">
              Explore
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={footerLinkClass}>
                    {item.label}
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
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/70 sm:flex-row sm:justify-between">
          <p>
            &copy; {currentYear} {siteConfig.name}
          </p>
          <p>Course details, fees and intake dates are confirmed by the institute on enquiry.</p>
        </div>
      </Container>
    </footer>
  )
}
