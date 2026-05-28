/**
 * Generate voiceover-ready narration scripts for every tutorial.
 *
 * Reads each tutorial via the React app's content modules, sends each to
 * Claude with a "make this speakable" prompt, and saves one .txt file per
 * tutorial into ./narration-output/.
 *
 * Run:
 *   ANTHROPIC_API_KEY=sk-ant-... npx tsx generate-narration.ts
 *
 * The .txt outputs are then fed to render-audio.ts for TTS rendering.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import { tutorials } from "../web/src/content/tutorials/index.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "narration-output");
const MODEL = "claude-opus-4-7";

const SYSTEM_PROMPT = `You convert written tutorials into spoken-narration scripts for an internal Brookhaven Tax AI adoption hub.

WRITE THE SCRIPT AS IT WILL BE SPOKEN BY AN AI VOICE. NOT FOR READING ON A PAGE.

Constraints:
- Aim for 2-3 minutes of audio (~ 300-450 words). Hard ceiling 500 words.
- Conversational, warm, friendly, professional. NOT lecture-y. Like a smart colleague explaining over coffee.
- Open with a one-sentence "what this is and who it's for."
- Walk through the tutorial's actual content, condensed. Skip implementation minutiae (URLs, exact menu paths) — those belong on the written page. Focus on WHY and WHEN.
- Reference real Brookhaven context where the tutorial does (Lisa, the ILIT board incident, the 460 bills/year, etc.).
- End with one specific suggested next action ("Open Claude.ai now and...").
- NO bullet lists or numbered steps in the script — it must flow as natural speech.
- NO emoji, no markdown, no code blocks, no asterisks for emphasis.
- Avoid words that sound the same when spoken (e.g., "site" vs "sight"; just rewrite).
- Use sentence-level punctuation that gives TTS natural breathing points: commas, em-dashes, short sentences.
- Don't include speaker labels, stage directions, or timing notes — just the words to speak.
- Don't include the tutorial title at the start — assume the listener already knows what tutorial they clicked.

Tone reference:
"Here's the deal. You write the same email maybe three times a week — the AR follow-up, the doc nudge, the status update. You're starting from a blank page each time. With this tutorial, you'll spend ten minutes building a Claude Project that drafts those emails for you. Then for the next year, every time you need to send one, it's a thirty-second 'paste the situation, copy the draft, edit, send.' Lisa specifically asked for this — and Lisa is who we build for first."`;

function tutorialAsPlainText(t: (typeof tutorials)[number]): string {
  const lines: string[] = [];
  lines.push(`# ${t.title}`);
  lines.push(t.subtitle);
  lines.push("");
  lines.push(`Format: ${t.format}. Difficulty: ${t.difficulty}. Estimated time: ${t.timeEstimate}.`);
  lines.push("");
  lines.push(`## When to use this`);
  lines.push(t.whenToUse);
  if (t.whenNotToUse) {
    lines.push(`## When NOT to use this`);
    lines.push(t.whenNotToUse);
  }
  if (t.prerequisites.length > 0) {
    lines.push(`## Before you start`);
    for (const p of t.prerequisites) lines.push(`- ${p}`);
  }
  lines.push(`## Steps`);
  for (let i = 0; i < t.steps.length; i++) {
    const s = t.steps[i];
    lines.push(`### Step ${i + 1}: ${s.title}`);
    lines.push(s.body);
    if (s.callout) lines.push(`(${s.callout.variant}: ${s.callout.body})`);
  }
  if (t.pitfalls.length > 0) {
    lines.push(`## Common pitfalls`);
    for (const p of t.pitfalls) lines.push(`- ${p}`);
  }
  return lines.join("\n");
}

async function generateScript(
  client: Anthropic,
  t: (typeof tutorials)[number],
): Promise<string> {
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Convert this tutorial into a 2-3 minute narration script.\n\n${tutorialAsPlainText(t)}`,
      },
    ],
  });
  const block = message.content.find((b) => b.type === "text");
  if (!block || block.type !== "text") {
    throw new Error(`No text content returned for tutorial ${t.slug}`);
  }
  return block.text.trim();
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ERROR: Set ANTHROPIC_API_KEY in your environment.");
    console.error("  export ANTHROPIC_API_KEY=sk-ant-...");
    process.exit(1);
  }
  await mkdir(OUTPUT_DIR, { recursive: true });

  const client = new Anthropic({ apiKey });
  const args = process.argv.slice(2);
  const onlySlugs = args.length > 0 ? new Set(args) : null;

  const targets = onlySlugs
    ? tutorials.filter((t) => onlySlugs.has(t.slug))
    : tutorials;

  if (targets.length === 0) {
    console.error("No tutorials matched. Available slugs:");
    for (const t of tutorials) console.error(`  ${t.slug}`);
    process.exit(1);
  }

  console.log(`Generating ${targets.length} narration scripts...\n`);
  let done = 0;
  for (const t of targets) {
    const outPath = join(OUTPUT_DIR, `${t.slug}.txt`);
    if (existsSync(outPath) && !onlySlugs) {
      console.log(`✓ ${t.slug} (exists, skipping)`);
      done++;
      continue;
    }
    try {
      const script = await generateScript(client, t);
      await writeFile(outPath, script + "\n", "utf8");
      const wordCount = script.split(/\s+/).length;
      console.log(`✓ ${t.slug} (${wordCount} words)`);
      done++;
    } catch (err) {
      console.error(`✗ ${t.slug}:`, err);
    }
  }
  console.log(`\nDone. ${done}/${targets.length} scripts written to:`);
  console.log(`  ${OUTPUT_DIR}`);
  console.log(`\nNext step: run \`npm run narration:audio\` to render MP3s.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
