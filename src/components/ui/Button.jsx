import { Link } from 'react-router'

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50'

const variantClasses = {
  primary: 'bg-accent text-navy-950 hover:bg-accent-600',
  glass: 'glass text-white hover:bg-white/15',
  outline: 'border border-white/25 text-accent hover:bg-white/10',
  // Brand green, with dark text: white on this green is 2.0:1 and fails outright.
  whatsapp: 'bg-whatsapp text-whatsapp-ink hover:bg-whatsapp-700',
}

const sizeClasses = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

const isExternal = (href) => /^https?:\/\//.test(href)

/**
 * One button for every action. It renders the right element for the job:
 *  - `to`   internal route (router link)
 *  - `href` external site, phone or email link
 *  - neither: a real <button>
 *
 * The icon inherits the button's text colour unless `iconClassName` says otherwise, which is
 * how a brand mark keeps its own colour on a button that is not that brand's colour.
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconClassName = '',
  className = '',
  children,
  ...rest
}) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  const content = (
    <>
      {children}
      {Icon && <Icon aria-hidden="true" className={`size-4 shrink-0 ${iconClassName}`} />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    const externalProps = isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <a href={href} className={classes} {...externalProps} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
