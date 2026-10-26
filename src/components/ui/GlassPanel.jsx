/**
 * Translucent surface for dark backgrounds. The blur, border and fallback live in the
 * `glass` utility (src/index.css); this component only adds shape. Use it sparingly.
 */
export default function GlassPanel({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`glass rounded-2xl text-white ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
