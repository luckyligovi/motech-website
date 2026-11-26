# Deploying the site

The site is **static**: `npm run build` produces a folder of HTML, CSS, JavaScript and
images in `dist/`, with a real HTML file prerendered for every one of the 93 routes. There is
no database and no server code, so it can be served by anything that serves files.

The live domain is **motechtraining.com**. See "Domain history" below for why it is a `.com`
and not the `.ac.ke` that was tried first.

| | Where | Cost |
| --- | --- | --- |
| Domain `motechtraining.com` | HostAfrica | KSh 1,450, then KSh 2,990/yr |
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

## Domain history

`motechinstitute.ac.ke` was registered first, on 26 November 2026. `.ac.ke` is restricted to
colleges and universities, and KeNIC will not activate the domain until it sees proof: the
**TVETA certificate** (TVETA/PRI/TVC/0245/2025), or the college charter, or the founding Act
of Parliament, with the institute's name on it. That document was not to hand, so the
registration sits **parked and unused** rather than wasted — it is paid for a full year, it
does not expire early, and it can be activated the moment the certificate turns up, by
repeating the steps below with `motechinstitute.ac.ke` in place of `motechtraining.com`.

`motechtraining.com` was registered instead, because a `.com` needs no verification document
of any kind — it activates on payment alone. It cost more than a `.co.ke` would have
(KSh 1,450 against KSh 199 to register, KSh 2,990 against KSh 2,350 a year after), but it
avoided KeNIC's lighter `.co.ke` requirement too, which is a scan of the registrant's own ID.

**If the TVETA certificate is ever found**, `.ac.ke` is the better domain for an accredited
college to hold, and switching is cheap: repeat "Point the domain at Cloudflare" and "Connect
the repository" for `motechinstitute.ac.ke`, then change the one line in
`src/config/site.js` described below. Nothing else in the site changes.

## Steps

### 1. Register the domain — done

`motechtraining.com` was registered with HostAfrica on 29 November 2026, with auto-renew
enabled and the transfer lock on.

### 2. Point the domain at Cloudflare

Create a free Cloudflare account, add `motechtraining.com`, and Cloudflare gives two
nameservers. Enter those at HostAfrica in place of the defaults. That is the only change made
at HostAfrica.

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

Then add `motechtraining.com` as a custom domain in the project. The certificate is issued
automatically.

Every push to `main` now rebuilds and publishes on its own.

### 4. Set the site's own address — done

`src/config/site.js` sets:

```js
url: 'https://motechtraining.com',
```

Until this is set, `siteConfig.url` is `null` and the build deliberately emits **no canonical
URLs, no Open Graph URLs, and an empty sitemap** — rather than guessing an address and
publishing a wrong one. With it set, all three are on; `scripts/prerender.mjs` writes
`sitemap.xml` and the `Sitemap:` line in `robots.txt` from that one value.

Once the domain resolves, submit `https://motechtraining.com/sitemap.xml` to Google Search
Console.

## Caching

`public/_headers` is read by Cloudflare at deploy time. Fingerprinted assets and fonts are
cached for a year and never revalidated, because a changed file arrives under a new name.
Photographs keep their filenames across deploys, so they get a day in cache and are then
served stale while refreshing in the background. HTML is never cached: it is what points at
everything else.

## Adding email later

The one thing this plan does not include is `admissions@motechtraining.com`. To add it, buy
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
