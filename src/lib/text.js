/** Shared text formatting. */

/** ['a', 'b', 'c'] -> "a, b and c". One item returns itself; none returns an empty string. */
export const listLabel = (items = []) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`
