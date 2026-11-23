import { Mail, Phone } from 'lucide-react'
import { siteConfig } from '../../config/site'
import { mailtoHref, telHref, whatsappHref } from '../../lib/contactLinks'
import Button from '../ui/Button'
import WhatsAppIcon from '../ui/WhatsAppIcon'

/**
 * The enquiry entry point, used wherever a visitor needs to reach the institute.
 *
 * These are plain phone and email links: nothing is stored or sent by this website, and the
 * interface never suggests otherwise. When a backend arrives for intake booking, this
 * component and src/lib/contactLinks.js are the only places that need to change.
 */
export default function EnquiryActions({ courseName, className = '' }) {
  const subject = courseName ? `Enquiry: ${courseName}` : 'Course enquiry'
  const body = courseName
    ? `Hello Motech,\n\nI would like to know more about ${courseName} — entry requirements, fees, duration and the next intake.\n\nThank you.`
    : undefined
  // Null when the institute has not marked a number for WhatsApp, so nothing is rendered.
  const whatsapp = whatsappHref(body ?? 'Hello Motech, I would like to ask about a course.')

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {siteConfig.contact.phones.map((phone, index) => (
        <Button
          key={phone.id}
          href={telHref(phone)}
          variant={index === 0 ? 'primary' : 'outline'}
          icon={Phone}
        >
          {phone.display}
        </Button>
      ))}
      {whatsapp && (
        <Button href={whatsapp} variant="outline" icon={WhatsAppIcon} iconClassName="text-whatsapp">
          WhatsApp
        </Button>
      )}
      <Button href={mailtoHref({ subject, body })} variant="outline" icon={Mail}>
        Email us
      </Button>
    </div>
  )
}
