# Accreditation logo sources

The original artwork supplied by the institute, kept outside `public/` so it is not deployed.
What the site actually serves is the WebP in `public/images/accreditation`.

| Source | Served as | Why |
| --- | --- | --- |
| `tveta.png` 169×148 | `tveta.webp` | |
| `kasneb.jpg` 400×400 | `kasneb.webp` | |
| `knec.png` 211×238, 96KB | `knec.webp` 33KB | The PNG was far heavier than its pixel size warranted |
| `nita.png` 3000×3000, 176KB | `nita.webp` 19KB | Resized to 600px first; 3000px square for a 40px badge |

Together the four went from 160KB to 72KB. They load in the homepage hero, so the saving lands
on the first view, which matters for anyone arriving on mobile data.

To regenerate after replacing a source file:

```bash
cd docs/logos-source
cwebp -q 90 <file>.png -o ../../public/images/accreditation/<file>.webp
```

`cwebp` ships with the `webp` package (`brew install webp`).
