# Deploying the site

The site is **static**: `npm run build` produces a folder of HTML, CSS, JavaScript and
images in `dist/`, with a real HTML file prerendered for every one of the 93 routes. There is
no database and no server code, so it can be served by anything that serves files.

The plan below costs **KSh 1,450 in the first year and KSh 2,350 a year after that** — the
domain, and nothing else.

| | Where | Cost |
| --- | --- | --- |
| Domain `motech.ac.ke` | HostAfrica | KSh 1,450, then KSh 2,350/yr |
| DNS | Cloudflare | Free |
| Hosting | Cloudflare Pages | Free |
| HTTPS certificate | Cloudflare | Free, renews itself |

## Why Cloudflare Pages and not Vercel

`vercel.json` is still in the repository from an earlier plan. **Do not deploy to Vercel's
free tier.** Vercel's Hobby plan is for non-commercial use, and Vercel's own definition of
commercial includes advertising a product or service — which is what a college prospectus
does. Deployments get paused for it, and the compliant plan is Pro at $20/month.

Cloudflare Pages' free tier permits commercial use, has no bandwidth limit on static files,
and allows 500 builds a month. The site is about 120 files against a 20,000 file limit.
Cloudflare also has edge locations in Kenya, so pages are served near the people reading
them. `vercel.json` is inert on Cloudflare and can be deleted whenever.

## Steps

### 1. Register the domain

Buy `motech.ac.ke` from HostAfrica. `.ac.ke` is restricted to colleges and universities, so
KeNIC asks for proof: send the **TVETA certificate** (TVETA/PRI/TVC/0245/2025), which names
the institute and classifies it as a technical college. Allow a few days for the check.

`.co.ke` is KSh 199 in the first year instead of KSh 1,450, and renews at the same
KSh 2,350. The extra KSh 1,251 buys an extension only an accredited college can hold.

### 2. Point the domain at Cloudflare

Create a free Cloudflare account, add `motech.ac.ke`, and Cloudflare gives two nameservers.
Enter those at HostAfrica in place of the defaults. That is the only change made at
HostAfrica.

DNS goes through Cloudflare rather than staying at HostAfrica because a root domain cannot
normally point at a host with a CNAME record; Cloudflare resolves that automatically. It also
makes adding email later a two-minute edit.

### 3. Connect the repository

In Cloudflare Pages, create a project from the GitHub repository and set:

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION` = `22` |

Set `NODE_VERSION` explicitly. The build needs a current Node, and Cloudflare's default has
moved before.

Then add `motech.ac.ke` as a custom domain in the project. The certificate is issued
automatically.

Every push to `main` now rebuilds and publishes on its own.

### 4. Set the site's own address

Open `src/config/site.js` and set:

```js
url: 'https://motech.ac.ke',
```

Until this is set, `siteConfig.url` is `null` and the build deliberately emits **no canonical
URLs, no Open Graph URLs, and an empty sitemap** — rather than guessing an address and
publishing a wrong one. Setting it turns all three on; `scripts/prerender.mjs` writes
`sitemap.xml` and the `Sitemap:` line in `robots.txt` from that one value.

Commit, push, and submit `https://motech.ac.ke/sitemap.xml` to Google Search Console.

## Caching

`public/_headers` is read by Cloudflare at deploy time. Fingerprinted assets and fonts are
cached for a year and never revalidated, because a changed file arrives under a new name.
Photographs keep their filenames across deploys, so they get a day in cache and are then
served stale while refreshing in the background. HTML is never cached: it is what points at
everything else.

## Adding email later

The one thing this plan does not include is `admissions@motech.ac.ke`. To add it, buy
HostAfrica's Web Hosting Starter (KSh 210/mo promotional, KSh 420/mo normally) for the
mailboxes alone, and paste its MX records into Cloudflare's DNS. **The website does not move
and nothing about the deployment changes.**

## Serving it from HostAfrica instead

If the site ever has to live on HostAfrica's cPanel hosting, it still works — upload the
contents of `dist/` to `public_html`. Every route is a real folder with an `index.html`, so
Apache serves clean URLs without configuration. Two things would be needed: an `.htaccess`
with `ErrorDocument 404 /404.html`, and a way to get the files up on each change, because
there is no automatic deployment. `_headers` is ignored by Apache; its caching rules would
have to be restated in `.htaccess`.
