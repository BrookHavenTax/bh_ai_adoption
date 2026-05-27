# Deploying the BH AI Adoption Hub to AWS EC2

The site is a static React + Vite build. The deployment target is an EC2 instance running nginx that serves the static `dist/` directory. This doc covers a first-time deploy plus the steady-state rebuild/redeploy cycle.

## Architecture

```
[ Your laptop ]                          [ EC2 instance: t3.small, Ubuntu 24.04 ]
  npm run build  ────── scp ──────▶  /var/www/bh-ai-adoption-hub/
  produces dist/                          ↓
                                        nginx (port 80/443)
                                          ↓
                                     [ Brookhaven coworkers' browsers ]
```

No backend, no database, no API. Just static files served by nginx.

---

## One-time EC2 setup

### 1. Launch the instance

- **AMI:** Ubuntu Server 24.04 LTS (x86_64)
- **Instance type:** `t3.small` (2 vCPU, 2 GB RAM) — more than enough for a static site
- **Storage:** 20 GB gp3 (default is fine)
- **Security group:**
  - SSH (port 22) from your IP
  - HTTP (port 80) from `0.0.0.0/0` *(or restrict to office IPs if internal-only)*
  - HTTPS (port 443) from `0.0.0.0/0`
- **Key pair:** create one if you don't have one. Save `bh-hub.pem` somewhere safe.
- **Tag the instance:** `Name = bh-ai-adoption-hub`

If you want the site to be internal-only (VPN or office IPs), restrict the HTTP/HTTPS security-group rules to those IP ranges.

### 2. SSH in and install nginx

```bash
chmod 400 ~/.ssh/bh-hub.pem
ssh -i ~/.ssh/bh-hub.pem ubuntu@<EC2_PUBLIC_IP>

# Once in:
sudo apt update
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl status nginx       # should show "active (running)"
```

You should now be able to hit `http://<EC2_PUBLIC_IP>/` and see the nginx welcome page.

### 3. Create the site directory

```bash
sudo mkdir -p /var/www/bh-ai-adoption-hub
sudo chown -R ubuntu:ubuntu /var/www/bh-ai-adoption-hub
```

### 4. Configure nginx for SPA routing

The site is a single-page app — React Router handles routes client-side, but the server has to send `index.html` for any unmatched path so the client can render the right page.

Create the nginx config:

```bash
sudo nano /etc/nginx/sites-available/bh-ai-adoption-hub
```

Paste this — replace `your-domain.com` with the real domain (or omit the `server_name` line entirely if you're hitting by IP):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com;

    root /var/www/bh-ai-adoption-hub;
    index index.html;

    # Long cache for hashed asset files
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Never cache the index — it's how new builds are picked up
    location = /index.html {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # SPA fallback: every unmatched path returns index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1000;
}
```

Enable the site and disable the default:

```bash
sudo ln -s /etc/nginx/sites-available/bh-ai-adoption-hub /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t                # test the config
sudo systemctl reload nginx
```

### 5. Optional: HTTPS via Let's Encrypt

If you've pointed a domain at the instance's public IP:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
# follow prompts; certbot will update the nginx config and set up auto-renew
```

### 6. Optional: firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## Building locally and deploying

### Steady-state deploy cycle

From your laptop, in the `web/` directory of this project:

```bash
# 1. Build
npm run build

# 2. Sync dist/ to EC2
rsync -avz --delete \
  -e "ssh -i ~/.ssh/bh-hub.pem" \
  ./dist/ \
  ubuntu@<EC2_PUBLIC_IP>:/var/www/bh-ai-adoption-hub/

# 3. (No nginx reload needed — it serves files from disk on every request)
```

That's it. The site is live with the new build.

### Verifying the deploy

```bash
# Should show recent timestamps
ssh -i ~/.ssh/bh-hub.pem ubuntu@<EC2_PUBLIC_IP> "ls -la /var/www/bh-ai-adoption-hub/"

# From your laptop:
curl -I https://your-domain.com/
# Should be HTTP/2 200, content-type text/html
```

Then load the site in a browser and click through:
- Home → renders the hero and stat strip
- Click any theme / role / tool / tutorial card → detail page loads
- Type something in the search box → results appear

If any of those break in production but worked locally, it's almost always the nginx SPA fallback (`try_files`) — re-check that line in the config.

---

## Convenience: deploy script

Save this as `deploy.sh` in the project root and `chmod +x deploy.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

EC2_HOST="ubuntu@<EC2_PUBLIC_IP>"
KEY_PATH="$HOME/.ssh/bh-hub.pem"
REMOTE_DIR="/var/www/bh-ai-adoption-hub/"

cd "$(dirname "$0")/web"

echo "→ Running tests..."
npm run test

echo "→ Type-checking..."
npm run typecheck

echo "→ Building..."
npm run build

echo "→ Syncing to ${EC2_HOST}..."
rsync -avz --delete \
  -e "ssh -i ${KEY_PATH}" \
  ./dist/ \
  "${EC2_HOST}:${REMOTE_DIR}"

echo "✓ Deploy complete."
```

Now deploying is `./deploy.sh`.

---

## Updating content

Most updates are just content changes — adding a tutorial, fixing a typo. The flow:

1. Edit the relevant file in `web/src/content/` (a tutorial, role, theme, or tool)
2. Run `npm run test` locally — the content-integrity tests catch broken cross-links
3. Run `./deploy.sh`
4. Refresh the site

No CMS, no admin panel. The content is in version control. That's intentional — it's small enough to be fine.

---

## Troubleshooting

### Page loads but route refresh returns 404

Your nginx SPA fallback isn't working. Verify `/etc/nginx/sites-available/bh-ai-adoption-hub` has:
```nginx
location / { try_files $uri $uri/ /index.html; }
```

### CSS/JS not updating after deploy

Browser cache. Hard-reload (Cmd+Shift+R) or check that `index.html` has `Cache-Control: no-cache` headers. The hashed asset filenames (e.g. `index-abc123.js`) should change on every build — if they didn't, the build didn't actually change.

### `nginx -t` fails after editing the config

Check the error message. Common: missing semicolon, wrong path. Don't reload nginx if `nginx -t` fails — your site goes down.

### Site is unreachable from your office

Check the security group rules in EC2 console. The HTTP/HTTPS rules must include your office IP range (or `0.0.0.0/0` for public).

### `npm run build` fails on EC2

Don't build on the EC2. Build locally, scp the `dist/` folder. That's the whole point of a static site.

---

## Cost

- `t3.small` on-demand: ~$15/mo
- Reserved 1-year: ~$10/mo
- Bandwidth: negligible for internal use

For a slightly cheaper option, `t4g.small` (ARM) is ~$12/mo on-demand and works fine for static hosting.

---

## When to outgrow this setup

This deployment is perfect for an internal hub. Move to something fancier if any of these happen:

- **Need preview deploys for content reviews** → migrate to Cloudflare Pages, Vercel, or Netlify (all free for static)
- **Need authentication** → put it behind AWS ALB + Cognito, or use Cloudflare Access
- **Need a CMS** → add a headless CMS (Sanity, Contentful) and rebuild the content layer

Until then, this is the right level of complexity.
