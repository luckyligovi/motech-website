import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { siteConfig } from '../../config/site'
import { mailtoHref, telHref, whatsappHref } from '../../lib/contactLinks'
import Button from '../ui/Button'
import WhatsAppIcon from '../ui/WhatsAppIcon'

function ContactCard({ icon: Icon, iconClassName = 'text-accent', title, children }) {
  return (
    <article className="rounded-xl border border-line glass-card p-6">
      <div className="flex items-center gap-3">
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-lg bg-accent/15 ${iconClassName}`}
        >
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <h2 className="text-lg font-bold text-head">{title}</h2>
      </div>
      <div className="mt-4 flex flex-col gap-2 text-ink">{children}</div>
    </article>
  )
}

const textLinkClass = 'w-fit rounded font-semibold text-accent underline-offset-4 hover:underline'

/** Call, email and visit details for the Contact page. */
export default function ContactDetails() {
  const { contact } = siteConfig
  const whatsapp = whatsappHref('Hello Motech, I would like to ask about a course.')

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <ContactCard icon={Phone} title="Call us">
        {contact.phones.map((phone) => (
          <a key={phone.id} href={telHref(phone)} className={textLinkClass}>
            {phone.display}
          </a>
        ))}
        <p className="text-sm text-muted">Usually the quickest way to get an answer.</p>
      </ContactCard>

      {whatsapp && (
        <ContactCard icon={WhatsAppIcon} iconClassName="text-whatsapp" title="WhatsApp">
          <a href={whatsapp} className={textLinkClass}>
            Message us on WhatsApp
          </a>
          <p className="text-sm text-muted">
            The institute marks {contact.phones.find((phone) => phone.whatsapp).display} for
            WhatsApp.
          </p>
        </ContactCard>
      )}

      <ContactCard icon={Mail} title="Email us">
        <a href={mailtoHref({ subject: 'Course enquiry' })} className={`${textLinkClass} break-all`}>
          {contact.email}
        </a>
        <p className="text-sm text-muted">Mention the course you are interested in.</p>
      </ContactCard>

      <ContactCard icon={MapPin} title="Visit us">
        <address className="not-italic">
          {contact.address.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
        <p className="text-sm text-muted">{contact.postal}</p>
        <Button href={contact.mapUrl} variant="outline" icon={ExternalLink} className="mt-2 w-fit">
          Open in Google Maps
        </Button>
      </ContactCard>
    </div>
  )
}
