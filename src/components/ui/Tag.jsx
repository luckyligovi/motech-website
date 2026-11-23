/** Small label for a course attribute, such as a study mode. */
export default function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-white/5 px-2 py-1 text-xs font-semibold text-accent">
      {children}
    </span>
  )
}
