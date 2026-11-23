import { siteConfig, whatsappPhone } from '../config/site'

/**
 * Builders for enquiry links. All enquiry entry points go through here, so a backend
 * (e.g. intake booking) can later replace these links without touching page components.
 * Nothing here sends or stores data: each link opens the visitor's phone or email app.
 */

export const telHref = (phone) => `tel:${phone.tel}`

export const mailtoHref = ({ subject, body } = {}) => {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const query = params.toString().replaceAll('+', '%20')
  return `mailto:${siteConfig.contact.email}${query ? `?${query}` : ''}`
}

/**
 * A WhatsApp chat link for the number the brochure marks for WhatsApp. Returns null when no
 * number is marked, so callers render nothing rather than a broken link.
 */
export const whatsappHref = (message) => {
  if (!whatsappPhone) return null
  const query = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${whatsappPhone.whatsapp}${query}`
}
