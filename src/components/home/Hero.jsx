import { ArrowRight, GraduationCap, MapPin, MonitorSmartphone } from 'lucide-react'
import { heroImage } from '../../data/media'
import Blueprint from '../ui/Blueprint'
import Button from '../ui/Button'
import Container from '../ui/Container'
import ProgrammeFinder from './ProgrammeFinder'

// Plain facts about where and how to study, taken from the institute's listings.
const quickFacts = [
  { icon: MapPin, label: 'Where', text: 'Tom Mboya Street, Nairobi CBD' },
  { icon: MonitorSmartphone, label: 'How', text: 'Classes in person and online' },
  { icon: GraduationCap, label: 'What', text: 'Diploma and certificate programmes' },
]

export default function Hero() {
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
            className="absolute inset-0 bg-navy-950/88 lg:bg-gradient-to-r lg:from-navy-950 lg:via-navy-950/92 lg:to-navy-950/75"
          />
        </>
      ) : (
        <Blueprint />
      )}

      <Container className="relative py-14 sm:py-18 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-7">
            <h1
              id="hero-heading"
              className="rise-1 max-w-2xl text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Build the skills for your next career step.
            </h1>

            <p className="rise-2 mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Motech Technology Training Institute offers programmes in ICT, business, accounting,
              health, hospitality and languages, in the centre of Nairobi.
            </p>

            <div className="rise-3 mt-8 flex flex-wrap gap-3">
              <Button to="/courses" size="lg" icon={ArrowRight}>
                Explore courses
              </Button>
              <Button to="/contact" variant="glass" size="lg">
                Enquire about admissions
              </Button>
            </div>
          </div>

          <div className="rise-3 lg:col-span-5">
            <ProgrammeFinder />
          </div>
        </div>

        {/* Spans the full width so the composition does not trail off on the left. */}
        <ul className="rise-4 mt-14 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-3">
          {quickFacts.map(({ icon: Icon, label, text }) => (
            <li key={label} className="flex items-start gap-3">
              <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
              <span>
                <span className="block text-sm text-white/60">{label}</span>
                <span className="block font-semibold">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
