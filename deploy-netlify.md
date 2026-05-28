# Deploying the BrookHaven AI Integrations Hub to Netlify (free)

The site is a static React/Vite build. Netlify's free tier covers static
sites with auto-deploys from GitHub, free SSL, a custom subdomain, and
custom-domain support — perfect for an internal hub.

**Cost:** $0/mo for the site itself. Domain (~$12/yr) is optional.

---

## What you get on the free tier

- ✅ Auto-deploy on every `git push` to `main`
- ✅ 100 GB bandwidth/month (you'll use well under 1 GB for an internal hub)
- ✅ 300 build minutes/month (each deploy takes ~30 seconds)
- ✅ Free SSL via Let's Encrypt (auto-renewed)
- ✅ Free `*.netlify.app` subdomain — pick anything available
- ✅ Optional custom domain (you bring it; Netlify handles DNS + cert)
- ✅ Atomic deploys with one-click rollback
- ✅ Deploy previews for PRs (every PR gets its own URL)
- ❌ Site-wide password protection (Pro plan, $19/mo)
- ❌ Per-user auth without a paid plan

If you need to restrict access, see the "Locking it down" section below.

---

## One-time setup (10 minutes)

### 1. Sign up

Go to **https://app.netlify.com/signup** and sign up with your GitHub
account (the one that owns the `BrookHavenTax/bh_ai_adoption` repo, or one
that's a collaborator on it).

### 2. New site from Git

- Click **Add new site** → **Import an existing project**
- Choose **GitHub** as the Git provider
- Authorize Netlify to access your GitHub (one-time)
- Select the **`BrookHavenTax/bh_ai_adoption`** repo

### 3. Configure build settings

You **don't need to fill these in manually** — the `netlify.toml` file in
the repo root tells Netlify everything. But for reference, the values are:

| Setting | Value |
|---|---|
| **Branch to deploy** | `main` |
| **Base directory** | `web` |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` (relative to base, so `web/dist`) |
| **Node version** | 22 (set via `netlify.toml`) |

Click **Deploy site**. Netlify will:
1. Clone the repo
2. Run `cd web && npm ci && npm run build`
3. Publish the contents of `web/dist`

First build takes 60–90 seconds. Subsequent builds are usually ~30 seconds.

### 4. Watch the deploy

The first deploy will get a URL like
`https://stunning-puffin-12345.netlify.app`. You can change this in
**Site settings → Site information → Change site name** to something
nicer like `bh-ai-hub` → `https://bh-ai-hub.netlify.app`.

If the build fails, click **Deploys → most recent → Deploy log** and read
the error. Most first-time failures are:
- Wrong Node version (the `netlify.toml` pins 22; should be fine)
- Missing dependency (push a fresh `package-lock.json` if needed)

### 5. (Optional) Add a custom domain

If you want `ai-hub.brookhavenfirm.com` or similar:

- **Site settings → Domain management → Add custom domain**
- Add the domain (Netlify gives you DNS records to set)
- Update DNS at your registrar (Cloudflare/Namecheap/wherever) per the
  instructions
- SSL is automatic — wait ~5 minutes for the cert to issue

---

## Steady-state workflow

Once setup is done, deploying is just:

```bash
git push origin main
```

Netlify watches the repo, sees the push, runs the build, and ships the new
version to the live URL. You get an email when each deploy completes.

To roll back: **Deploys → pick any prior deploy → Publish deploy**. Site
swaps in seconds.

---

## Locking it down (if you don't want it public)

The site has anonymized data (no coworker names), and the content is
intentionally internal-only. A few options for keeping it out of public
hands:

### Option A — Just don't share the URL
The simplest option. The URL won't be indexed by Google (we can add a
`robots.txt` if you want to be extra sure). Anyone with the URL can read
it, but nobody finds it by accident.

**To add `robots.txt`:** create `web/public/robots.txt` with:
```
User-agent: *
Disallow: /
```

### Option B — Netlify Pro password ($19/mo)
Site-wide password set in the dashboard. Everyone who visits sees a
password prompt first. Cheap, simple, works for internal use.

### Option C — Netlify Identity (free for small teams)
Built-in user auth. You invite specific email addresses; they have to
sign in. Adds a login screen to the site. Requires a small code change to
the React app (an Identity widget script). Worth it if access control
matters.

### Option D — Cloudflare Access in front of Netlify (free)
Put the Netlify URL behind Cloudflare Access. Restrict by email domain
(e.g. only `@brookhaventax.com`). Most secure free option. Requires
Cloudflare DNS for your custom domain.

For an internal hub with anonymized data, I'd start with **Option A** and
add restriction later if needed.

---

## Comparing Netlify free vs EC2

| | Netlify free | EC2 t3.small |
|---|---|---|
| **Cost** | $0/mo | ~$15/mo |
| **Setup time** | 10 min | 30–60 min |
| **Deploy** | `git push` | Manual via deploy.sh |
| **SSL** | Automatic | Manual via certbot |
| **Custom domain** | Easy | Manual |
| **Rollback** | One click | Manual |
| **Logs / debugging** | Great UI | SSH + tail |
| **Control** | Less | Full |
| **Multi-region** | Built-in CDN | Single region |

**Recommendation:** Netlify free for this site. The EC2 instructions in
`deploy.md` remain available if you ever want to self-host.

---

## Troubleshooting

### Build fails with "command not found: npm"
Netlify Node detection failed. Force it in netlify.toml — already set to
`NODE_VERSION = "22"`. If still failing, try `"20"` (LTS).

### Site loads but routes refresh to 404
SPA fallback not working. The `[[redirects]]` block in `netlify.toml`
handles this — verify it's still there and that the deploy picked it up.

### CSS or JS not updating after a deploy
Browser cache. `netlify.toml` sets `Cache-Control: no-cache` on
`index.html` so this shouldn't happen, but if it does, hard-reload
(Cmd+Shift+R).

### "Failed to compile" with TypeScript errors
The build runs `tsc -b && vite build`. Any TS error fails the build. Fix
locally with `npm run typecheck` from `web/`, push, redeploy.

---

## Cost projection for BrookHaven

Assuming:
- ~20 coworkers visit the site
- ~5 page views per visit, ~2 visits per week
- Each page ~200 KB (gzipped HTML+CSS+JS)

Monthly bandwidth: 20 × 5 × 2 × 4 × 200 KB ≈ **80 MB / month**.
Free tier: **100 GB / month** — you'd use 0.08% of the quota.

Build minutes per month: ~15 deploys × 1 min = **15 minutes**.
Free tier: **300 minutes** — you'd use 5% of the quota.

No reason to ever pay for this site unless you specifically want one of
the Pro features (e.g. site-wide password).
