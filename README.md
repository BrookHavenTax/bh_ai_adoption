# BrookHaven AI Adoption

Internal hub for rolling out Claude, Claude Cowork, and AI tooling to BrookHaven coworkers — built from a real survey of their daily tasks and pain points.

## What's in this repo

```
bh_ai_adoption/
├── analysis/                   # source-of-truth pain-point analysis (markdown)
├── data/                       # raw survey data (gitignored — contains coworker info)
├── web/                        # React + TypeScript site (the AI Integrations Hub)
│   ├── src/
│   │   ├── content/            # typed content: roles, themes, tools, tutorials
│   │   ├── components/         # reusable UI
│   │   ├── routes/             # one page per route
│   │   └── test/               # Vitest + RTL tests
│   ├── package.json
│   └── ...
├── scripts/                    # Node.js generators (narration audio + newsletter)
├── newsletter/                 # sources.yml + newsletter README
├── .github/workflows/          # monthly newsletter cron
├── netlify.toml                # Netlify config (recommended free deploy)
├── deploy-netlify.md           # Netlify deploy walkthrough
├── deploy.md                   # AWS EC2 + nginx deploy walkthrough (alternative)
├── deploy.sh                   # EC2 convenience deploy script
└── README.md                   # this file
```

## What's in here

1. **The AI Integrations Hub site (`web/`)** — React/TypeScript, 32 tutorials, dedicated Skills + Cowork sections, dark mode, command palette, step progress tracking, full search.
2. **Tutorial audio narration (`scripts/`)** — script + MP3 generators that produce voiceover audio for each tutorial. Run-once setup; outputs live in `web/public/audio/`. Audio player appears automatically on tutorials that have an MP3.
3. **Monthly newsletter (`newsletter/` + `web/src/content/newsletter/`)** — auto-generated 1st of every month via GitHub Actions. Two sections: tax legislation (primary) + AI tools (secondary). See [`newsletter/README.md`](./newsletter/README.md).

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

- `roles.ts` — 8 anonymized BrookHaven roles (Client Resource Specialist, Tax Lead, etc.) with their pain points and recommended tutorials
- `themes.ts` — 8 pain themes that came out of the survey
- `tools.ts` — per-tool playbooks (Outlook, Telegram, Dropbox, Adobe PDF, Monday, Teams, QBO)
- `tutorials/` — 32 detailed tutorials with steps, copyable prompts, callouts, and cross-links (8 of which are Claude Skills, 5 are Claude Cowork workflows)
- `newsletter/` — monthly newsletter issues (one TS file per month, e.g. `2026-06.ts`)

All cross-references are integrity-tested — `npm run test` fails if a role references a missing tutorial slug.

## Anonymization

The survey contains real coworker names. Names have been stripped from `analysis/` and never appear in `web/`. Raw survey data lives in `data/` and is gitignored.

## Tone

Friendly, casual, light emoji ok. The audience is BrookHaven coworkers across mixed technical comfort — plain language wins.

## Audio narration

The site supports per-tutorial audio narration. Generators live in `scripts/`:

```bash
cd scripts
npm install
ANTHROPIC_API_KEY=sk-ant-... npm run narration:scripts   # Claude writes the scripts
OPENAI_API_KEY=sk-... npm run narration:audio            # OpenAI TTS renders MP3s
```

Then add `audioUrl: "/audio/your-tutorial-slug.mp3"` to each tutorial that has audio. See [`scripts/README.md`](./scripts/README.md) for details.

## Monthly newsletter

Auto-generates on the 1st of each month via GitHub Actions. Set the `ANTHROPIC_API_KEY` repo secret once and the cron handles the rest. Manual run:

```bash
cd scripts
ANTHROPIC_API_KEY=sk-ant-... npm run newsletter
```

See [`newsletter/README.md`](./newsletter/README.md).

## See also

- `analysis/coworker-pain-points-2026-05-27.md` — the synthesized pain-point analysis that drives all the content
- `newsletter/README.md` — newsletter pipeline + GitHub Actions setup
- `scripts/README.md` — narration script + audio rendering pipeline
