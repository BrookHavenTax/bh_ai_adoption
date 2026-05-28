# BrookHaven AI Adoption — generator scripts

Three things in this folder, all runnable from here:

| Script | Purpose | Where output goes |
|---|---|---|
| `generate-narration.ts` | Turn each tutorial into a voiceover-ready text script | `./narration-output/{slug}.txt` (gitignored) |
| `render-audio.ts` | Turn those scripts into MP3 narration | `../web/public/audio/{slug}.mp3` |
| `generate-newsletter.ts` | Draft the monthly newsletter | `../web/src/content/newsletter/YYYY-MM.ts` |

## One-time setup

```bash
cd scripts
npm install
```

Set up environment variables. You can use a `.env` file (gitignored) or export them in your shell:

```bash
export ANTHROPIC_API_KEY=sk-ant-...        # for narration scripts + newsletter
export OPENAI_API_KEY=sk-...               # for TTS audio rendering
```

> **Why two API keys?** Claude writes the scripts (better at structured, conversational content). OpenAI handles TTS (high-quality TTS at low cost). You can swap OpenAI for ElevenLabs by editing `render-audio.ts` — that's a 20-line change.

## Producing tutorial audio narration

### Step 1: generate the scripts

```bash
npm run narration:scripts
```

This calls Claude for each of the 32 tutorials and produces a 2-3 minute speakable script per tutorial. Skips tutorials that already have a script in `./narration-output/` (re-running is safe).

Cost: ~$0.50 - $1.50 total for all 32 tutorials with Claude.

You can also regenerate specific tutorials:
```bash
npx tsx generate-narration.ts email-first-draft pdf-summary-30sec
```

### Step 2: render audio

```bash
npm run narration:audio
```

Calls OpenAI TTS for each script. Default voice: **nova** (friendly female). Override with environment variables:

```bash
TTS_VOICE=ash TTS_MODEL=tts-1-hd npm run narration:audio
```

Voices: `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`, `onyx`, `nova`, `sage`, `shimmer`.

Cost: OpenAI TTS-1-HD is ~$30/1M characters. A 400-word script ≈ 2500 chars. 32 tutorials × 2500 chars ≈ 80K chars total ≈ **$2.40 one-time**.

### Step 3: wire the audio into tutorials

After MP3s land in `web/public/audio/`, edit each tutorial in
`web/src/content/tutorials/*.ts` to add the `audioUrl` field:

```ts
export const emailFirstDraft: Tutorial = {
  slug: "email-first-draft",
  title: "Your first-draft email assistant",
  // ...existing fields...
  audioUrl: "/audio/email-first-draft.mp3",
};
```

The audio player appears on that tutorial's page automatically. Tutorials without an `audioUrl` show no player.

### Re-doing one tutorial

When you edit a tutorial and want to refresh its narration:

```bash
# Regenerate the script
npx tsx generate-narration.ts email-first-draft

# Re-render the audio (deletes the old MP3 first since the script auto-skips existing files)
rm narration-output/email-first-draft.txt   # forces regeneration
npx tsx generate-narration.ts email-first-draft
rm ../web/public/audio/email-first-draft.mp3
npx tsx render-audio.ts email-first-draft
```

---

## Monthly newsletter

See `generate-newsletter.ts` and `sources.yml` in the parent `newsletter/` folder.

```bash
npm run newsletter                   # generate this month's issue
npm run newsletter -- --month=2026-06   # generate a specific month
```

Cost: ~$2-4 per month depending on how chatty the news cycle was.

Automated: the GitHub Actions workflow at `.github/workflows/monthly-newsletter.yml`
runs this on the 1st of every month, commits the new issue, and Netlify
auto-deploys it within 2 minutes.

---

## Want a different TTS voice or service?

`render-audio.ts` is a thin wrapper around OpenAI's TTS API. To swap:

- **ElevenLabs** (more lifelike voices, higher cost): replace `OpenAI` with `ElevenLabsClient`, ~15 line change.
- **Azure Cognitive Services Speech**: similar.
- **Local TTS** (Piper, Coqui): swap the API call for a subprocess call to the local binary.

The narration scripts themselves are voice-agnostic — they're plain text written for TTS.

---

## Want video instead of audio?

Audio is the lower-friction path. If you want video:

1. Keep the narration scripts (they work as voiceover scripts)
2. Add slides or screen recordings as the visual layer
3. Use a service like Synthesia, HeyGen, or Descript to combine audio + visuals into AI-narrated video
4. Replace `audioUrl` on the Tutorial type with `videoUrl` and embed a `<video>` element

The infrastructure is here; the video assembly step is paid + manual.
