/**
 * Render narration scripts into MP3 files using OpenAI TTS.
 *
 * Reads ./narration-output/*.txt, sends each to OpenAI's TTS API, and
 * writes ../web/public/audio/{slug}.mp3.
 *
 * Run:
 *   OPENAI_API_KEY=sk-... npx tsx render-audio.ts
 *
 * Optional env:
 *   TTS_VOICE   - one of: alloy, ash, ballad, coral, echo, fable, onyx, nova, sage, shimmer
 *                  (default: nova — friendly female; "ash" is a good warm male alt)
 *   TTS_MODEL   - "tts-1-hd" (better quality, slower, recommended for content)
 *                  or "tts-1" (faster, cheaper). Default: tts-1-hd.
 *
 * Outputs paths into the React app's /public/audio/, which Vite serves
 * directly. Once an MP3 exists for a tutorial, set its `audioUrl` field
 * to e.g. "/audio/email-first-draft.mp3" and the AudioPlayer appears on
 * that tutorial's page automatically.
 */
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCRIPTS_DIR = join(__dirname, "narration-output");
const AUDIO_DIR = join(__dirname, "..", "web", "public", "audio");

const VOICE = (process.env.TTS_VOICE ??
  "nova") as "alloy" | "ash" | "ballad" | "coral" | "echo" | "fable" | "onyx" | "nova" | "sage" | "shimmer";
const MODEL = (process.env.TTS_MODEL ?? "tts-1-hd") as "tts-1" | "tts-1-hd";

async function renderOne(
  client: OpenAI,
  slug: string,
  script: string,
): Promise<void> {
  const response = await client.audio.speech.create({
    model: MODEL,
    voice: VOICE,
    input: script,
    response_format: "mp3",
    speed: 1.0,
  });
  const audio = Buffer.from(await response.arrayBuffer());
  const outPath = join(AUDIO_DIR, `${slug}.mp3`);
  await writeFile(outPath, audio);
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("ERROR: Set OPENAI_API_KEY in your environment.");
    console.error("  export OPENAI_API_KEY=sk-...");
    process.exit(1);
  }
  if (!existsSync(SCRIPTS_DIR)) {
    console.error(`ERROR: ${SCRIPTS_DIR} does not exist.`);
    console.error("  Run `npm run narration:scripts` first.");
    process.exit(1);
  }
  await mkdir(AUDIO_DIR, { recursive: true });

  const client = new OpenAI({ apiKey });
  const files = (await readdir(SCRIPTS_DIR)).filter((f) => f.endsWith(".txt"));
  const args = process.argv.slice(2);
  const onlySlugs = args.length > 0 ? new Set(args) : null;

  console.log(
    `Using voice="${VOICE}", model="${MODEL}". Rendering ${files.length} scripts...\n`,
  );

  let done = 0;
  let skipped = 0;
  for (const file of files) {
    const slug = basename(file, ".txt");
    if (onlySlugs && !onlySlugs.has(slug)) continue;

    const outPath = join(AUDIO_DIR, `${slug}.mp3`);
    if (existsSync(outPath) && !onlySlugs) {
      skipped++;
      continue;
    }
    try {
      const script = (await readFile(join(SCRIPTS_DIR, file), "utf8")).trim();
      if (!script) {
        console.warn(`⚠ ${slug}: empty script, skipping`);
        continue;
      }
      await renderOne(client, slug, script);
      console.log(`✓ ${slug}.mp3`);
      done++;
    } catch (err) {
      console.error(`✗ ${slug}:`, err);
    }
  }

  console.log(`\nDone. ${done} rendered, ${skipped} already existed.`);
  console.log(`MP3s written to: ${AUDIO_DIR}`);
  console.log(`\nNext step: set the \`audioUrl\` field on each tutorial in`);
  console.log(`web/src/content/tutorials/*.ts, e.g.:`);
  console.log(`  audioUrl: "/audio/email-first-draft.mp3"`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
