import { Link } from 'react-router'
import { siteConfig } from '../../config/site'

/**
 * Brand mark. Uses the official logo once `siteConfig.logoSrc` is set; until then it shows a
 * simple text mark so the header never looks broken. The official logo is a round seal on a
 * white background, so it sits on a white disc to stay legible on the navy header.
 */
export default function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      title={`${siteConfig.name} — home`}
      className={`inline-flex items-center gap-3 rounded-lg ${className}`}
    >
      {siteConfig.logoSrc ? (
        <img
          src={siteConfig.logoSrc}
          alt=""
          width="44"
          height="44"
          className="size-11 rounded-full bg-white object-contain"
        />
      ) : (
        <span
          aria-hidden="true"
          className="grid size-11 place-items-center rounded-lg bg-accent text-xl font-extrabold text-navy-950"
        >
          M
        </span>
      )}
      {/* The space after the short name keeps the accessible name "Motech Technology Training
          Institute" (one string with spaces), matching WCAG 2.5.3 "Label in Name". */}
      <span className="flex flex-col leading-tight">
        <span className="text-base font-extrabold tracking-tight text-white sm:text-lg">
          {siteConfig.shortName}{' '}
        </span>
        <span className="text-xs font-medium text-white/75">Technology Training Institute</span>
      </span>
    </Link>
  )
}
