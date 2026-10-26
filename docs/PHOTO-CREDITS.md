# Photo credits

Every image on the site is currently a **placeholder** from Unsplash, standing in until Motech
supplies its own photography. None of them show Motech. Replacing them is a launch task — see
`public/images/README.md` and `docs/CONTENT-TO-CONFIRM.md`.

The Unsplash License allows commercial use without permission, and does not require attribution.
Credits are recorded here anyway, as good practice and to make each image easy to trace and
replace. The photographer names are wired into the data (`src/data/categories.js` and
`src/data/media.js`) in case you want to show a credit line later.

| Where | Photographer | Unsplash photo id |
| --- | --- | --- |
| Hero background | Desola Lanre-Ologun | photo-1531482615713-2afd69097998 |
| "In the middle of Nairobi" band | Amani Nation | photo-1611348524140-53c9a25263d6 |
| ICT and computer studies | Mohammad Shahhosseini | photo-1719159381981-1327b22aff9b |
| Business and management | Scott Graham | photo-1573164574511-73c773193279 |
| Accounting and finance | Scott Graham | photo-1554224155-6726b3ff858f |
| Health and nutrition | Brooke Lark | photo-1490645935967-10de6ba17061 |
| Hospitality | Yes and Studio | photo-1622021142947-da7dedc7c39a |
| Languages | Joshua Hoehne | photo-1673515334669-1e445e4f4c3f |

These images load from Unsplash's servers (`images.unsplash.com`), which adds a third-party
request on every page. Moving them to local files in `/public/images` removes that and is part
of replacing them with Motech's own photographs.
