/**
 * Image URL helper.
 *
 * PLACEHOLDER IMAGERY. The category and hero images are stock photographs hosted on Unsplash,
 * standing in until Motech supplies its own. They are not pictures of Motech. See
 * docs/CONTENT-TO-CONFIRM.md and public/images/README.md — replacing them is a launch task.
 *
 * Centralising the URL here means the swap to local files touches one function, not every
 * component: give each image a local `src` in the data and change `imageUrl` to return it.
 */
const UNSPLASH = 'https://images.unsplash.com'

/**
 * Build a sized Unsplash URL from a photo id.
 * @param {string} id   Unsplash photo id, e.g. 'photo-1719159381981-1327b22aff9b'
 * @param {object} opts width/height in pixels
 */
export function unsplash(id, { w = 800, h = 600 } = {}) {
  return `${UNSPLASH}/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`
}
