import { ArrowRight, Clock, GraduationCap, MapPin } from 'lucide-react'
import { siteConfig } from '../../config/site'
import { accreditationBadges } from '../../data/institute'
import { heroImage } from '../../data/media'
import { courses } from '../../lib/courses'
import AccreditationBadges from '../shared/AccreditationBadges'
import Blueprint from '../ui/Blueprint'
import Button from '../ui/Button'
import Container from '../ui/Container'
import WhatsAppIcon from '../ui/WhatsAppIcon'
import ProgrammeFinder from './ProgrammeFinder'

/**
 * The homepage hero.
 *
 * Three things in order of what a visitor needs: that enrolment is open, what the institute
 * teaches and on whose authority, and a way into the catalogue without reading anything else.
 *
 * The accreditation badges are names, not logos — the institute has not yet obtained
 * permission to reproduce the marks. The four shown are exactly the bodies its brochure's own
 * sentence names; see src/data/institute.js before adding to them.
 */
const quickFacts = [
  {
    icon: MapPin,
    label: 'Where',
    text: 'Mwalimu Co-op House, Tom Mboya Street',
    note: '8th floor, opposite Ambassador Hotel, Nairobi CBD',
    link: { href: siteConfig.contact.mapUrl, label: 'View on map' },
  },
  {
    icon: Clock,
    label: 'When',
    text: 'Morning, full time and evening classes',
    note: 'Flexible schedules for working students',
  },
  {
    icon: GraduationCap,
    label: 'What',
    text: `${courses.length} courses, artisan to higher diploma`,
    note: accreditationBadges.map((body) => body.name).join(', '),
  },
]

export default function Hero() {
  const { intake } = siteConfig

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-navy-950 text-white"
    >
      {heroImage ? (
        <>
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            width={heroImage.width}
            height={heroImage.height}
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover"
          />
          {/* Keeps headline contrast well above 4.5:1 whatever the photograph looks like. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-navy-950/82 lg:bg-gradient-to-r lg:from-navy-950/96 lg:via-navy-950/86 lg:to-navy-950/58"
          />
        </>
      ) : (
        <Blueprint />
      )}

      {/* A slow wash of colour behind the panel, to give the right-hand side some depth. */}
      <div
        aria-hidden="true"
        className="drift-slow pointer-events-none absolute -top-32 -right-24 size-[36rem] rounded-full bg-accent/12 blur-3xl"
      />

      <Container className="relative py-9 sm:py-14 lg:py-20">
        <div className="grid min-w-0 gap-8 sm:gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="min-w-0 lg:col-span-7">
            {intake.open && (
              <p className="rise-1 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/10 py-1.5 pr-4 pl-3 text-sm font-semibold text-accent">
                <span aria-hidden="true" className="pulse-dot size-2 rounded-full bg-accent" />
                {intake.label}
              </p>
            )}

            <h1
              id="hero-heading"
              className="rise-1 mt-4 max-w-2xl text-[2rem] leading-[1.08] font-extrabold tracking-tight sm:mt-5 sm:text-5xl lg:text-6xl"
            >
              Build the skills for your next career <span className="text-accent">step.</span>
            </h1>

            <p className="rise-2 mt-4 max-w-xl leading-relaxed text-white/80 sm:mt-6 sm:text-lg">
              Motech Technology Training Institute teaches accountancy, business, ICT,
              hospitality, cosmetology, health, engineering and languages, in the centre of
              Nairobi.
            </p>

            <div className="rise-3 mt-6 flex flex-wrap gap-3 sm:mt-8">
              <Button to="/courses" size="lg" icon={ArrowRight}>
                Explore courses
              </Button>
              <Button
                to="/apply"
                variant="glass"
                size="lg"
                icon={WhatsAppIcon}
                iconClassName="text-whatsapp"
              >
                Apply on WhatsApp
              </Button>
            </div>

            <div className="rise-4 mt-7 border-t border-white/15 pt-5 sm:mt-10 sm:pt-6">
              <h2 className="text-xs font-bold tracking-[0.12em] text-white/50 uppercase">
                Accredited and examining bodies
              </h2>
              <AccreditationBadges eager className="mt-4" />
            </div>
          </div>

          <div className="min-w-0 rise-3 lg:col-span-5">
            <ProgrammeFinder />
          </div>
        </div>
      </Container>

      {/* Full-width band, so the composition does not trail off below the panel. */}
      <div className="glass rise-5 relative border-t border-line">
        <Container>
          <ul className="grid gap-4 py-5 sm:grid-cols-3 sm:gap-6 sm:py-7">
            {quickFacts.map(({ icon: Icon, label, text, note, link }) => (
              <li key={label} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-white/10 text-accent">
                  <Icon aria-hidden="true" className="size-4.5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold tracking-wide text-white/50 uppercase">
                    {label}
                  </span>
                  <span className="mt-0.5 block font-semibold">{text}</span>
                  {note && <span className="hidden text-sm text-white/60 sm:block">{note}</span>}
                  {link && (
                    <a
                      href={link.href}
                      className="mt-1 inline-flex items-center gap-1 rounded text-sm font-semibold text-accent underline-offset-4 hover:underline"
                    >
                      {link.label}
                      <ArrowRight aria-hidden="true" className="size-3.5" />
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  )
}
