import { requiredDocumentsShort } from '../data/admissions'
import { formatFee } from './courses'
import { listLabel } from './text'

/**
 * Composes a course application as a WhatsApp message.
 *
 * Deliberately pure and free of React: the message is the thing the institute receives, so it
 * is built and tested in one place rather than assembled inside a form component.
 *
 * **Nothing here sends or stores anything.** The text is built in the visitor's browser and
 * handed to WhatsApp through a `wa.me` link; the website never receives it. That is why the
 * form asks for no ID number and takes no file uploads — those belong in the chat, between
 * the applicant and the institute, not on a static site that would become a data controller
 * the moment it kept them.
 */

const REFERENCE_LENGTH = 6
const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ' // Crockford base32: no I, L, O or U.

/**
 * A short code so the institute can label the chat and match it to a payment later.
 *
 * All six characters are random rather than clock-derived. An earlier version mixed in
 * `Date.now()`, which collided badly whenever two references were produced in the same
 * millisecond; six random characters give 32^6 ≈ 1.07 billion codes instead.
 *
 * The alphabet omits I, L, O and U, so a reference read aloud down the phone or copied off a
 * screen cannot be confused with 1, 0, and cannot accidentally spell anything.
 *
 * Must be generated after hydration, never during render — see the store in pages/Apply.jsx.
 */
export const makeReference = () => {
  const bytes = new Uint8Array(REFERENCE_LENGTH)
  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(bytes)
  } else {
    for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256)
  }
  // 256 is a whole number of alphabet lengths (8 x 32), so the modulo introduces no bias.
  const code = Array.from(bytes, (byte) => ALPHABET[byte % ALPHABET.length]).join('')
  return `MT-${code}`
}

const line = (label, value) => (value ? `${label}: ${value}` : null)

/**
 * Build the message body.
 *
 * `level` is one entry from `course.levels`; when a course has only one, pass it anyway so
 * the message quotes that level's own fee and requirement rather than the course's summary
 * labels. Empty fields are dropped rather than sent as blank lines.
 */
export function composeApplication({
  reference,
  name,
  phone,
  course,
  level,
  grade,
  classTime,
  studyMode,
}) {
  const sections = [
    [`*COURSE APPLICATION*${reference ? `  ·  Ref ${reference}` : ''}`],
    [line('Name', name), line('Phone', phone)],
    [
      line('Course', course?.name),
      line('Level', [level?.level, level?.duration].filter(Boolean).join(' — ')),
      line('Fee', formatFee(level?.fee)),
      line('Examined by', level?.examiner ?? course?.examinerLabel),
      line('Entry requirement', level?.requirement?.full),
    ],
    [line('My grade', grade), line('Preferred class', classTime), line('Study mode', studyMode)],
    [`I will attach my ${listLabel(requiredDocumentsShort)} in this chat.`],
    ['Sent from the Motech website'],
  ]

  return sections
    .map((block) => block.filter(Boolean).join('\n'))
    .filter(Boolean)
    .join('\n\n')
}
