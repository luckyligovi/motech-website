import { useMemo, useState, useSyncExternalStore } from 'react'
import { useSearchParams } from 'react-router'
import { Check, Copy, ShieldCheck } from 'lucide-react'
import { siteConfig, whatsappPhone } from '../config/site'
import { requiredDocuments } from '../data/admissions'
import { campusImages } from '../data/campus'
import { courses, getCourseBySlug, groupBySchool } from '../lib/courses'
import { whatsappHref } from '../lib/contactLinks'
import { composeApplication, makeReference } from '../lib/application'
import useHydrated from '../hooks/useHydrated'
import EnquiryActions from '../components/shared/EnquiryActions'
import Seo from '../components/shared/Seo'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import WhatsAppIcon from '../components/ui/WhatsAppIcon'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'

/**
 * Apply for a course over WhatsApp.
 *
 * The form composes a message and hands it to WhatsApp. It submits nothing: no request
 * leaves the browser, nothing is stored, and the website never sees what is typed. The
 * applicant presses send in their own WhatsApp, to their own contact, and can read and edit
 * the message first.
 *
 * That is a deliberate design, not a shortcut. Collecting names, phone numbers and grades on
 * a server makes the institute a data controller under the Data Protection Act 2019, with a
 * privacy notice, consent and retention policy to match. None of that is needed to get an
 * applicant talking to the admissions desk.
 *
 * Documents are asked for in the chat rather than here: WhatsApp cannot prefill an
 * attachment, and a static site has no business handling copies of anyone's ID.
 *
 * /apply?course=<slug> preselects a course, so the page can be linked to from anywhere.
 */

const NO_PREFERENCE = ''

/**
 * What the form actually does, said before it is used.
 *
 * Someone arriving from a course page has pressed "Apply" and reasonably expects the next
 * button to submit an application. It does not — it opens WhatsApp. Saying so up front is
 * the difference between a button that feels broken and one that feels obvious.
 */
const howItWorks = [
  {
    title: 'Fill in your details',
    text: 'Your name, phone number and the course you want. It takes about a minute.',
  },
  {
    title: 'Open WhatsApp',
    text: 'Your application is already written. Read it, change anything you like, and press send.',
  },
  {
    title: 'Attach your documents',
    text: 'Send your ID copy, passport photos and results slip as photos in the same chat.',
  },
]

/**
 * The application reference, read through `useSyncExternalStore`.
 *
 * It cannot be generated during render: a value derived from the clock differs between the
 * prerendered HTML and the browser, which breaks hydration. The server snapshot is `null`,
 * so the static page ships without a reference and the browser fills one in on hydration.
 * Generated once per session and held at module scope, so it survives navigating away from
 * this page and back.
 */
let sessionReference = null
const neverChanges = () => () => {}
const readReference = () => (sessionReference ??= makeReference())
const readServerReference = () => null

const fieldClass =
  'h-12 w-full rounded-lg border border-line glass-card px-4 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none'
const labelClass = 'block text-sm font-semibold text-head'

function Field({ label, hint, htmlFor, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {hint && (
        <p id={`${htmlFor}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
    </div>
  )
}

export default function Apply() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    // null means "the visitor has not picked yet", so a value carried in the URL still wins.
    // An empty string means they deliberately cleared the choice.
    course: null,
    levelIndex: null,
    grade: '',
    classTime: NO_PREFERENCE,
    studyMode: NO_PREFERENCE,
  })
  const [copied, setCopied] = useState(false)
  const reference = useSyncExternalStore(neverChanges, readReference, readServerReference)
  // `?course=` and `?level=` let a course page or a catalogue row send someone straight here
  // with their choice already made. Read through react-router, so moving between two course
  // links without a page load updates the form; and only after hydration, because this page
  // is prerendered once with no query string.
  const hydrated = useHydrated()
  const [searchParams] = useSearchParams()
  const prefilledCourse = hydrated ? (searchParams.get('course') ?? '') : ''
  const prefilledLevel = hydrated ? (searchParams.get('level') ?? '') : ''
  const courseSlug = form.course ?? prefilledCourse

  const set = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const course = getCourseBySlug(courseSlug)
  // A catalogue row links to the level it sits on, so ?level= lands on that one already
  // chosen. Falls back to the first level if the index is missing or out of range, so a
  // hand-edited or stale URL still opens a usable form.
  const levelIndex = Number(form.levelIndex ?? prefilledLevel)
  const level = course?.levels[levelIndex] ?? course?.levels[0]

  const message = useMemo(
    () =>
      composeApplication({
        reference,
        name: form.name.trim(),
        phone: form.phone.trim(),
        course,
        level,
        grade: form.grade.trim(),
        classTime: form.classTime,
        studyMode: form.studyMode,
      }),
    [reference, form, course, level],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    const href = whatsappHref(message)
    if (!href) return
    // Opened in a new tab so the catalogue is still there when they come back; some browsers
    // hand a wa.me link straight to the installed app and never open the tab at all.
    if (!window.open(href, '_blank', 'noopener')) window.location.href = href
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Clipboard permission refused, or no clipboard API. The message is on screen and
      // selectable, so there is nothing to recover from and nothing to warn about.
    }
  }

  // Courses grouped by school, so the picker mirrors the catalogue.
  const groups = groupBySchool()

  if (!whatsappPhone) {
    return (
      <>
        <Seo path="/apply" />
        <PageHeader title="Apply">
          The institute has not published a WhatsApp number. Call or email to apply.
        </PageHeader>
        <Section>
          <EnquiryActions />
        </Section>
      </>
    )
  }

  return (
    <>
      <Seo path="/apply" />

      <PageHeader title="Apply on WhatsApp" image={{ src: campusImages[2].src }}>
        Fill this in and it opens WhatsApp with your application already written. Intake is
        ongoing, and there are {courses.length} courses to choose from.
      </PageHeader>

      <Section>
        <ol className="mb-10 grid gap-4 sm:grid-cols-3">
          {howItWorks.map(({ title, text }, index) => (
            <Reveal
              as="li"
              key={title}
              delay={index * 90}
              className="flex gap-4 rounded-xl border border-line glass-card p-5"
            >
              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-lg border border-accent/30 bg-accent/15 text-sm font-bold text-accent tabular-nums"
              >
                {index + 1}
              </span>
              <span>
                <h2 className="font-bold text-head">{title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
              </span>
            </Reveal>
          ))}
        </ol>

        <div className="grid gap-10 lg:grid-cols-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:col-span-7">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Your full name" htmlFor="apply-name">
                <input
                  id="apply-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={set('name')}
                  className={fieldClass}
                />
              </Field>

              <Field label="Your phone number" htmlFor="apply-phone">
                <input
                  id="apply-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="07xx xxx xxx"
                  value={form.phone}
                  onChange={set('phone')}
                  className={fieldClass}
                />
              </Field>
            </div>

            <Field label="Course you want" htmlFor="apply-course">
              <select
                id="apply-course"
                name="course"
                required
                value={courseSlug}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    course: event.target.value,
                    levelIndex: '0',
                  }))
                }
                className={fieldClass}
              >
                <option value="">Choose a course…</option>
                {groups.map(({ school, courses: list }) => (
                  <optgroup key={school.slug} label={school.name}>
                    {list.map((option) => (
                      <option key={option.slug} value={option.slug}>
                        {option.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </Field>

            {course && course.levels.length > 1 && (
              <Field label="Level" htmlFor="apply-level">
                <select
                  id="apply-level"
                  name="level"
                  value={String(course.levels[levelIndex] ? levelIndex : 0)}
                  onChange={set('levelIndex')}
                  className={fieldClass}
                >
                  {course.levels.map((option, index) => (
                    <option key={option.level ?? index} value={String(index)}>
                      {[option.level, option.duration].filter(Boolean).join(' — ')}
                    </option>
                  ))}
                </select>
              </Field>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Preferred class time" htmlFor="apply-class">
                <select
                  id="apply-class"
                  name="classTime"
                  value={form.classTime}
                  onChange={set('classTime')}
                  className={fieldClass}
                >
                  <option value={NO_PREFERENCE}>No preference</option>
                  {siteConfig.classTimes.map(({ id, label, time }) => (
                    <option key={id} value={`${label} (${time})`}>
                      {label} — {time}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Study mode" htmlFor="apply-mode">
                <select
                  id="apply-mode"
                  name="studyMode"
                  value={form.studyMode}
                  onChange={set('studyMode')}
                  className={fieldClass}
                >
                  <option value={NO_PREFERENCE}>No preference</option>
                  {siteConfig.studyModes.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field
              label="Your KCPE or KCSE grade"
              hint="Optional, but it lets the institute check straight away whether you qualify."
              htmlFor="apply-grade"
            >
              <input
                id="apply-grade"
                name="grade"
                type="text"
                placeholder="for example, KCSE C+"
                aria-describedby="apply-grade-hint"
                value={form.grade}
                onChange={set('grade')}
                className={fieldClass}
              />
            </Field>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="lg" variant="whatsapp" icon={WhatsAppIcon}>
                Open WhatsApp to send
              </Button>
              <Button type="button" variant="outline" onClick={handleCopy} icon={copied ? Check : Copy}>
                {copied ? 'Copied' : 'Copy message'}
              </Button>
            </div>

            <p className="flex gap-3 rounded-xl border border-line glass-card p-4 text-sm text-muted">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
              <span>
                Nothing is sent or saved by this website. The message is written in your browser
                and handed to WhatsApp — you read it, and you press send.
              </span>
            </p>
          </form>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-head">Your message</h2>
              <p className="mt-1 text-sm text-muted">
                This is exactly what WhatsApp will open with. You can edit it before sending.
              </p>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-line glass-card p-5 font-sans text-sm leading-relaxed whitespace-pre-wrap text-ink">
                {message}
              </pre>

              <div className="mt-6 rounded-xl border border-line glass-soft p-5">
                <h3 className="font-bold text-head">Have these ready to attach</h3>
                <p className="mt-1 text-sm text-muted">
                  Send them as photos in the same chat. Do not upload them here — this site
                  cannot receive files, and should not hold your documents.
                </p>
                <ul className="mt-3 flex flex-col gap-2 text-sm">
                  {requiredDocuments.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span className="text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-line pt-4 text-sm text-muted">
                  A registration fee of KSh{' '}
                  {siteConfig.registrationFee.amount.toLocaleString('en-KE')} applies (
                  {siteConfig.registrationFee.note}).
                </p>
              </div>

              <div className="mt-6 rounded-xl border border-line glass-soft p-5">
                <h3 className="font-bold text-head">Rather not use WhatsApp?</h3>
                <p className="mt-1 text-sm text-muted">Call or email the institute instead.</p>
                <EnquiryActions className="mt-4" />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
