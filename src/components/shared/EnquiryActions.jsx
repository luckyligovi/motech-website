import { Mail, Phone } from 'lucide-react'
import { siteConfig } from '../../config/site'
import { mailtoHref, telHref } from '../../lib/contactLinks'
import Button from '../ui/Button'

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
      <Button href={mailtoHref({ subject, body })} variant="outline" icon={Mail}>
        Email us
      </Button>
    </div>
  )
}
