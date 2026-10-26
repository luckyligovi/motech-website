import { ArrowRight } from 'lucide-react'
import Blueprint from '../ui/Blueprint'
import Button from '../ui/Button'
import Container from '../ui/Container'

/**
 * Closing call to action. Gives the homepage a confident finish and a clear next step.
 * Uses navy-800 (lighter than the navy-950 footer below it) plus the blueprint grid so the
 * two dark bands read as distinct. "Shape your career" echoes the institute's own motto,
 * "Career Shaper".
 */
export default function ClosingCta() {
  return (
    <section aria-labelledby="cta-heading" className="relative overflow-hidden bg-navy-800">
      <Blueprint />
      {/* Soft accent glow so the band lifts off the footer. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 size-96 rounded-full bg-accent/20 blur-3xl"
      />
      <Container className="relative py-16 text-center sm:py-20">
        <h2
          id="cta-heading"
          className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          Shape your career at Motech
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/80">
          Pick a course and take the next step, or talk to the institute about what fits you best.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/courses" size="lg" icon={ArrowRight}>
            Explore courses
          </Button>
          <Button to="/contact" variant="glass" size="lg">
            Enquire about admissions
          </Button>
        </div>
      </Container>
    </section>
  )
}
