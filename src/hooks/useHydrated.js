import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * False while rendering on the server and during the first client render, true afterwards.
 *
 * Every page here is prerendered to static HTML with no query string and no hash, so anything
 * read from the URL differs between that HTML and the browser. Reading it during the first
 * render would therefore break hydration. Gating on this hook lets a component render the
 * neutral, prerendered state first and pick up the URL immediately after, with no effect, no
 * extra render pass and no mismatch.
 */
export default function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
