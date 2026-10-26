import Container from './Container'

/** Standard vertical rhythm for a page section, with the shared page width inside. */
export default function Section({ as: Tag = 'section', className = '', children, ...rest }) {
  return (
    <Tag className={`py-12 sm:py-16 ${className}`} {...rest}>
      <Container>{children}</Container>
    </Tag>
  )
}
