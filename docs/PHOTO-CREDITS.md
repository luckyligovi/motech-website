# Photography

Every photograph on the site is from [Unsplash](https://unsplash.com), free for commercial
use under the [Unsplash License](https://unsplash.com/license), which requires no attribution.
They are credited here anyway, so each can be traced, re-licensed or replaced.

All are **self-hosted as WebP** under `/public/images`. Nothing is loaded from Unsplash at
runtime, so the site makes no third-party image request on any page.

## What these pictures are, and are not

With one exception, every photograph is of a **subject**, not of Motech: a commercial
kitchen, a multimeter, a tray of colour swatches, a patch panel.

That distinction is deliberate. A photograph of somebody else's students on an institute's
website is read as a photograph of *that institute's* students, and would misrepresent the
school. A photograph of a soldering iron is read as "this is what the course is about",
which is true. Where people do appear — the business meeting, the ICT pair, the chef — they
are shot from behind or in profile, as an occupation rather than as identifiable individuals
presented as Motech's students.

**No photograph on this site is captioned, or positioned, as being of Motech.** Keep it that
way until the institute supplies its own.

## Still to replace

| Image | Why |
| --- | --- |
| `hero-computer-lab.webp` | The homepage hero. A full computer lab — the kind of room Motech teaches in, but not Motech's. Marked `isPlaceholder` in `src/data/media.js`. Motech's brochure has a photograph of its own lab; the original file is question 9 on the institute list. |

The Nairobi skyline is not a placeholder: it is the city the college is in, which is true
whoever took the picture.

## Sources

### Full-width

| File | Unsplash source |
| --- | --- |
| `hero-computer-lab.webp` | `photo-1719159381981-1327b22aff9b` |
| `nairobi-skyline.webp` | `photo-1611348524140-53c9a25263d6` |

### Per school — `/public/images/schools`

| School | Subject | Unsplash source |
| --- | --- | --- |
| Accountancy | Statements and a calculator on a desk | `photo-1554224155-6726b3ff858f` |
| Business | A meeting round a boardroom table | `photo-1573164574511-73c773193279` |
| ICT | Two people working at code on monitors | `photo-1629904853893-c2c8981a1dc5` |
| ICT Short Courses | A network patch panel | `photo-1544197150-b99a580bb7a8` |
| Computer Courses | A desk with monitor and keyboard | `photo-1510519138101-570d1dca3d66` |
| Graphic Design | Colour swatches, pencils and a keyboard | `photo-1716471330463-f475b00f0506` |
| Software Engineering | Code on screen | `photo-1461749280684-dccba630e2f6` |
| Hospitality | A chef at work in a commercial kitchen | `photo-1622021142947-da7dedc7c39a` |
| Cosmetology | Hands holding brushes, scissors and a tinting brush | `photo-1595475884562-073c30d45670` |
| Health Sciences | A prepared plate of vegetables and eggs | `photo-1490645935967-10de6ba17061` |
| Humanities and Social Sciences | A library reading room | `photo-1719954327260-7ac241a53aae` |
| Engineering | A multimeter and wiring | `photo-1553873002-785d775854c9` |
| Languages | Letter tiles spelling LANGUAGE | `photo-1673515334669-1e445e4f4c3f` |
| KCSE, IGCSE and Bridging | An empty classroom of desks | `photo-1644055066046-054ac0fc7213` |

Each source is at `https://images.unsplash.com/<id>`.

## Replacing one

Images are referenced by slug: a school's photograph is `/images/schools/<slug>.webp`,
derived in `src/data/schools.js`. Replace the file, keep the name, and nothing else changes.
Set a school's `image` to `null` to fall back to its coloured icon.

```bash
cwebp -q 76 new-photo.jpg -o public/images/schools/<slug>.webp
```

Keep school images around 800×500 and under ~40KB; they are lazy-loaded, but fourteen of
them appear on the catalogue page at once.

### Campus life — `/public/images/campus`

Used on Student life, and behind the Admissions and Apply title bands. These **do** show
people, so they appear only where the surrounding copy is about studying in general, and the
Student life strip says in plain text that they are not pictures of Motech. The brochure has
the institute's own graduation photograph; replace these with it.

| File | Subject | Unsplash source |
| --- | --- | --- |
| `graduation.webp` | Graduates celebrating after a ceremony | `photo-1645263012710-35e2fc89cb5c` |
| `lecture.webp` | Students with notebooks during a lecture | `photo-1758270705067-0d7edee57af0` |
| `study-group.webp` | Students working together around a laptop | `photo-1758270705518-b61b40527e76` |

Unlike the school photographs, these carry real alt text rather than empty — on Student life
they are the content, not decoration behind it. See `src/data/campus.js`.
