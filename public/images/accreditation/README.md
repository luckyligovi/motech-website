# Accreditation logos

The marks shown in the homepage hero and on the About page, for the four bodies the brochure
names: **TVETA**, **KASNEB**, **KNEC** and **NITA**.

| File | Body |
| --- | --- |
| `tveta.webp` | Technical and Vocational Education and Training Authority |
| `kasneb.webp` | Kenya Accountants and Secretaries National Examinations Board |
| `knec.webp` | Kenya National Examinations Council |
| `nita.webp` | National Industrial Training Authority |

These are WebP, converted from the artwork in `docs/logos-source`, which is kept out of
`public/` so it is not deployed. That folder's README has the conversion command.

## Permission

A logo is a trademark. Naming an accrediting body is a statement of fact and needs no
permission; **reproducing its mark does.** Confirm in writing with each body that Motech may
display its logo, and keep the reply — question 10 in `docs/IMPROVEMENTS.md`. Motech's
brochure prints these marks, which suggests permission exists, but the brochure is not itself
evidence of it. If a body declines, set that badge's `logo` to `null` in
`src/data/institute.js` and it falls back to the body's name in type.

## Sizing

Each logo carries a different amount of whitespace inside its own file, so the badge scales
each one to fill a shared box and clips the overflow. That is the `logoScale` number beside
each entry in `src/data/institute.js` — one value per logo, raise it until the mark matches
its neighbours. Current values were set by eye and are worth checking in the browser.

## Replacing one

1. Put the new artwork in `docs/logos-source`, taken from that body's own website, not from a
   search engine or another college. An out-of-date or distorted mark undermines the claim it
   is there to support.
2. Convert it to WebP into this folder.
3. Check `logoScale` still looks right.
