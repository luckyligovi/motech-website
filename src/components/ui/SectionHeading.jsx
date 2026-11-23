/** Heading and optional lead paragraph for a page section. Keeps type scale consistent. */
export default function SectionHeading({ id, title, lead, className = '' }) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <h2 id={id} className="text-3xl font-bold tracking-tight text-head sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-muted">{lead}</p>}
    </div>
  )
}
