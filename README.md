# Brookhaven AI Adoption

Internal hub for rolling out Claude, Claude Cowork, and AI tooling to Brookhaven coworkers — built from a real survey of their daily tasks and pain points.

## What's in this repo

```
bh_ai_adoption/
├── analysis/                   # source-of-truth pain-point analysis (markdown)
├── data/                       # raw survey data (gitignored — contains coworker info)
├── web/                        # React + TypeScript site (the AI Adoption Hub)
│   ├── src/
│   │   ├── content/            # typed content: roles, themes, tools, tutorials
│   │   ├── components/         # reusable UI
│   │   ├── routes/             # one page per route
│   │   └── test/               # Vitest + RTL tests
│   ├── package.json
│   └── ...
├── netlify.toml                # Netlify config (recommended free deploy)
├── deploy-netlify.md           # Netlify deploy walkthrough
├── deploy.md                   # AWS EC2 + nginx deploy walkthrough (alternative)
├── deploy.sh                   # EC2 convenience deploy script
└── README.md                   # this file
```

## Two-part feature

This project rolls out in two coupled parts (both designed around the same anonymized survey data):

1. **The AI Adoption Hub (this site)** — a React/TypeScript static site with role-, theme-, and tool-mapped tutorials. Lives in `web/`. Deployable to any static host (we're going with AWS EC2 + nginx — see `deploy.md`).
2. **The weekly newsletter** *(not yet built)* — a scheduled job that produces 3 artifacts each Monday: an email newsletter, a Telegram channel post, and a 5-10 slide deck for the weekly meeting. Scaffolding for this will live alongside the site (`newsletter/`, `scripts/`).

## Working on the site

```bash
cd web/
npm install       # first time only
npm run dev       # local dev server at http://localhost:5173
npm run test      # run all tests
npm run typecheck # type-check without building
npm run build     # production build to dist/
npm run preview   # serve dist/ at http://localhost:4173 for smoke testing
```

## Deploying

**Recommended: Netlify (free).** Auto-deploys on every `git push` to `main`. ~10 minute one-time setup. See [`deploy-netlify.md`](./deploy-netlify.md) for the walkthrough.

Once Netlify is connected, the steady-state cycle is just:
```bash
git push origin main   # Netlify builds + deploys automatically
```

**Alternative: AWS EC2 + nginx.** See [`deploy.md`](./deploy.md). Use this if you need self-hosted control or want the hub behind a VPN. ~$15/mo.

## Content model

Everything on the site is driven by typed content in `web/src/content/`:

- `roles.ts` — 8 anonymized BH roles (Client Resource Specialist, Tax Lead, etc.) with their pain points and recommended tutorials
- `themes.ts` — 8 pain themes that came out of the survey
- `tools.ts` — per-tool playbooks (Outlook, Telegram, Dropbox, Adobe PDF, Monday, Teams, QBO)
- `tutorials/` — 32 detailed tutorials with steps, copyable prompts, callouts, and cross-links (8 of which are Claude Skills, 5 are Claude Cowork workflows)

All cross-references are integrity-tested — `npm run test` fails if a role references a missing tutorial slug.

## Anonymization

The survey contains real coworker names. Names have been stripped from `analysis/` and never appear in `web/`. Raw survey data lives in `data/` and is gitignored.

## Tone

Friendly, casual, light emoji ok. The audience is BH coworkers across mixed technical comfort — plain language wins.

## See also

- `analysis/coworker-pain-points-2026-05-27.md` — the synthesized pain-point analysis that drives all the content
