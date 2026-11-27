import { accreditationBadges } from '../../data/institute'

/**
 * The bodies that registered, accredit or examine for the institute.
 *
 * White cards, so a mark reads correctly against both the navy hero and the paper page
 * background, and so the four sit as one row.
 *
 * Every logo lives in a box of the same size and is scaled to fill it (see `logoScale` in
 * the data), because the supplied artwork carries wildly different amounts of built-in
 * whitespace — NITA's is a square with the wordmark across the middle third. The box clips,
 * so a scaled-up mark crops its own padding instead of making its card taller than the rest.
 *
 * A badge with no logo file shows the body's name set in type instead — not a broken image,
 * and not a placeholder to rush: naming a body is a statement of fact, while reproducing its
 * mark needs that body's permission. See public/images/accreditation.
 *
 * `eager` loads the marks immediately, for the homepage hero where they sit above the fold.
 * Everywhere else they stay lazy.
 */
/* The logo tile: shorter on a phone. Two per row below 640px — four packed this tight
 * left "Examining body" no slack to wrap safely, which is what Cloudflare's deploy is
 * fine with but a 360px phone is not — then four in a row from `sm` up. */
const BOX_REM = 2.5
const BOX_REM_SM = 1.75

export default function AccreditationBadges({ eager = false, className = '' }) {
  return (
    <ul className={`grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2.5 ${className}`}>
      {accreditationBadges.map(({ name, fullName, role, logo, logoScale = 1 }) => (
        <li
          key={name}
          className="glass-card flex min-w-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-line px-2 py-2 transition-all hover:-translate-y-0.5 hover:border-accent/40 sm:min-w-[7.5rem] sm:flex-1 sm:gap-2 sm:rounded-xl sm:px-4 sm:py-3"
        >
          {/* The marks are drawn for light backgrounds — two of the four are supplied on a
              white rectangle — so each sits on its own white tile rather than on the glass. */}
          <span
            className="flex h-7 w-full items-center justify-center overflow-hidden rounded bg-white px-1.5 sm:h-10 sm:rounded-lg sm:px-2"
          >
            {logo ? (
              <img
                src={logo}
                alt={`${fullName} (${name})`}
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
                style={{ '--h': `${BOX_REM_SM * logoScale}rem`, '--h-sm': `${BOX_REM * logoScale}rem` }}
                className="h-[var(--h)] w-auto max-w-none object-contain sm:h-[var(--h-sm)]"
              />
            ) : (
              <span className="text-sm font-extrabold text-navy-950 sm:text-base" title={fullName}>
                {name}
              </span>
            )}
          </span>
          <span className="text-center text-[0.65rem] leading-tight font-medium text-muted sm:text-xs">
            {role}
          </span>
        </li>
      ))}
    </ul>
  )
}
