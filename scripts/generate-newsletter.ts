/**
 * Generate a new monthly newsletter issue using Claude + live web search.
 *
 * Unlike a fixed scraper, this uses the Anthropic Messages API web_search
 * tool — Claude searches the web during generation (the same way a person
 * would), guided by the trusted-source list and priority topics in
 * newsletter/sources.yml. That keeps the unattended monthly run roughly as
 * good as doing the research by hand.
 *
 * Pipeline:
 *  1. Read /newsletter/sources.yml (trusted sources + priority topics + filters)
 *  2. Ask Claude (with web_search enabled) to research the month and return
 *     a structured NewsletterIssue JSON
 *  3. Write web/src/content/newsletter/YYYY-MM.ts
 *  4. Prepend the issue in web/src/content/newsletter/index.ts
 *
 * Run locally:
 *   ANTHROPIC_API_KEY=sk-ant-... npx tsx generate-newsletter.ts
 *   npx tsx generate-newsletter.ts --month=2026-07
 *
 * Used by .github/workflows/monthly-newsletter.yml on the 1st of each month.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import { parse as parseYaml } from "yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const SOURCES_PATH = join(REPO_ROOT, "newsletter", "sources.yml");
const NEWSLETTER_DIR = join(REPO_ROOT, "web", "src", "content", "newsletter");
const INDEX_PATH = join(NEWSLETTER_DIR, "index.ts");
const MODEL = "claude-opus-4-7";
const MAX_WEB_SEARCHES = 12;

interface SourceEntry {
  name: string;
  url: string;
  priority?: "high" | "medium" | "low";
}

interface SourcesFile {
  tax_legislation: SourceEntry[];
  ai_tools: SourceEntry[];
  filters?: {
    lookback_days?: number;
    exclude_terms?: string[];
    prioritize_topics?: string[];
  };
}

interface NewsletterItemJson {
  title: string;
  summary: string;
  status?: string;
  scope?: string;
  whatItMeans: string;
  affectsBrackets?: string[];
  impact: "high" | "medium" | "low" | "informational";
  sources: { label: string; url: string }[];
}

interface NewsletterJson {
  intro: string;
  taxLegislation: NewsletterItemJson[];
  noTaxNews?: string;
  aiTools: NewsletterItemJson[];
  noAiNews?: string;
  closing?: string;
}

const SYSTEM_PROMPT = `You are the editor of the BrookHaven Monthly newsletter — an internal monthly digest for a tax / legal / accounting / wealth-management firm serving clients from middle class to ultra high net worth.

Audience: BrookHaven staff (Tax Lead, Accounting Lead, Legal Operations Director, Paralegal, Admin Manager, Financial Advisor). They want practical "what's moving and what does it mean for our clients" — not legislative deep-dives.

Tone: friendly, professional, direct, plain English. Short sentences. Confident without being preachy. No emoji in body text.

You have web search. USE IT. Search for the genuinely latest developments. Verify status before stating it (don't say a bill "passed" unless a source confirms it). Prefer primary sources (IRS, Treasury, FinCEN, Congress.gov, state revenue depts, Anthropic) and reputable secondary coverage.

For each item determine:
- TITLE: 5-12 words, headline form, no trailing period
- SUMMARY: 2-3 sentences plain English on what is actually happening
- STATUS (tax items only): one of "Idea/Discussion", "Proposed bill", "Committee markup", "Passed one chamber", "Passed both chambers", "Signed into law", "Effective", "Stalled", "Court / regulatory action", "Withdrawn"
- SCOPE (optional): "Federal", "GA state", "Multi-state", or a specific state
- WHAT IT MEANS FOR BrookHaven: 1-2 sentences tied to BrookHaven client work — estate planning, tax filing, trust administration, multi-entity bookkeeping (Will runs 11+ entities), client communications. Reference BrookHaven specifics where apt (Lisa = Tax Lead and our cautious bellwether adopter; the ILIT board incident; the 460-bills-a-year accounting volume).
- AFFECTSBRACKETS (optional, tax items): subset of ["Middle class", "High net worth", "Ultra high net worth"]
- IMPACT: "high" | "medium" | "low" | "informational"
- SOURCES: at least one real URL you actually found via search. Never invent URLs.

Selection rules:
- Max 8 items per section. Quality over quantity. Cluster related items.
- Only include items from roughly the lookback window unless it's the latest update on an ongoing story.
- If a section is genuinely quiet, return an empty array and a one-sentence noTaxNews / noAiNews note. Don't pad with fluff.
- Tax legislation is the PRIMARY section. AI tools is SECONDARY and may be short.

Intro: 1-2 paragraphs, markdown ok, sets the tone — what's the one thing readers should care most about this month?
Closing: optional, warm, short.

OUTPUT: After your research, respond with ONLY valid JSON (no markdown fence, no commentary) in EXACTLY this shape:

{
  "intro": "markdown string",
  "taxLegislation": [
    {"title":"","summary":"","status":"","scope":"","whatItMeans":"","affectsBrackets":[""],"impact":"high|medium|low|informational","sources":[{"label":"","url":"https://"}]}
  ],
  "noTaxNews": "optional",
  "aiTools": [
    {"title":"","summary":"","whatItMeans":"","impact":"high|medium|low|informational","sources":[{"label":"","url":"https://"}]}
  ],
  "noAiNews": "optional",
  "closing": "optional"
}`;

async function generateIssue(
  client: Anthropic,
  monthLabel: string,
  sources: SourcesFile,
): Promise<NewsletterJson> {
  const taxSources = sources.tax_legislation
    .map((s) => `- ${s.name} (${s.url}) [priority: ${s.priority ?? "medium"}]`)
    .join("\n");
  const aiSources = sources.ai_tools
    .map((s) => `- ${s.name} (${s.url}) [priority: ${s.priority ?? "medium"}]`)
    .join("\n");
  const topics = (sources.filters?.prioritize_topics ?? []).join(", ");
  const lookback = sources.filters?.lookback_days ?? 35;

  const userPrompt = `Research and write the BrookHaven Monthly newsletter for ${monthLabel}.

Use web search to find what's actually new in roughly the last ${lookback} days.

SECTION 1 — TAX LEGISLATION (primary). Trusted sources to prioritize:
${taxSources}

SECTION 2 — AI TOOLS (secondary). Trusted sources to prioritize:
${aiSources}

Priority topics to weight heavily if anything moved on them: ${topics}

Search broadly (don't limit yourself to only the URLs above — those are starting points). Verify the current status of anything before reporting it. Then produce the JSON.`;

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 12000,
    system: SYSTEM_PROMPT,
    tools: [
      {
        // Anthropic server-side web search tool
        type: "web_search_20250305",
        name: "web_search",
        max_uses: MAX_WEB_SEARCHES,
      } as unknown as Anthropic.Tool,
    ],
    messages: [{ role: "user", content: userPrompt }],
  });

  // Concatenate every text block, then extract the outermost JSON object.
  const textBlocks = message.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text);
  const combined = textBlocks.join("\n").trim();

  const firstBrace = combined.indexOf("{");
  const lastBrace = combined.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
    console.error("Could not locate JSON in Claude response. Raw text:");
    console.error(combined.slice(0, 3000));
    throw new Error("No JSON object found in response");
  }
  const jsonStr = combined.slice(firstBrace, lastBrace + 1);
  try {
    return JSON.parse(jsonStr) as NewsletterJson;
  } catch (err) {
    console.error("Failed to parse JSON:");
    console.error(jsonStr.slice(0, 3000));
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Emit TypeScript content file
// ─────────────────────────────────────────────────────────────────────────
function escapeTs(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

function itemToTs(item: NewsletterItemJson): string {
  const lines: string[] = ["    {"];
  lines.push(`      title: \`${escapeTs(item.title)}\`,`);
  lines.push(`      summary: \`${escapeTs(item.summary)}\`,`);
  if (item.status) lines.push(`      status: \`${escapeTs(item.status)}\`,`);
  if (item.scope) lines.push(`      scope: \`${escapeTs(item.scope)}\`,`);
  lines.push(`      whatItMeans: \`${escapeTs(item.whatItMeans)}\`,`);
  if (item.affectsBrackets && item.affectsBrackets.length > 0) {
    lines.push(
      `      affectsBrackets: [${item.affectsBrackets.map((b) => `\`${escapeTs(b)}\``).join(", ")}],`,
    );
  }
  lines.push(`      impact: "${item.impact}",`);
  lines.push(`      sources: [`);
  for (const src of item.sources) {
    lines.push(
      `        { label: \`${escapeTs(src.label)}\`, url: \`${escapeTs(src.url)}\` },`,
    );
  }
  lines.push(`      ],`);
  lines.push("    },");
  return lines.join("\n");
}

function camelExportName(month: string): string {
  const [y, m] = month.split("-");
  const monthName = new Date(`${y}-${m}-01T00:00:00Z`).toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  return monthName.toLowerCase() + y;
}

function issueToTsFile(
  month: string,
  monthLabel: string,
  issue: NewsletterJson,
): string {
  const exportName = camelExportName(month);
  const isoDate = `${month}-01`;
  const lines: string[] = [];
  lines.push(`import type { NewsletterIssue } from "./types";`);
  lines.push("");
  lines.push(
    `// Auto-generated by scripts/generate-newsletter.ts (web-search) on ${new Date().toISOString()}`,
  );
  lines.push("");
  lines.push(`export const ${exportName}: NewsletterIssue = {`);
  lines.push(`  month: "${month}",`);
  lines.push(`  monthLabel: \`${monthLabel}\`,`);
  lines.push(`  publishedDate: "${isoDate}",`);
  lines.push(`  authorship: "auto-generated",`);
  lines.push(`  intro: \`${escapeTs(issue.intro)}\`,`);
  lines.push("");
  lines.push(`  taxLegislation: [`);
  for (const item of issue.taxLegislation) lines.push(itemToTs(item));
  lines.push(`  ],`);
  if (issue.noTaxNews) lines.push(`  noTaxNews: \`${escapeTs(issue.noTaxNews)}\`,`);
  lines.push("");
  lines.push(`  aiTools: [`);
  for (const item of issue.aiTools) lines.push(itemToTs(item));
  lines.push(`  ],`);
  if (issue.noAiNews) lines.push(`  noAiNews: \`${escapeTs(issue.noAiNews)}\`,`);
  if (issue.closing) lines.push(`  closing: \`${escapeTs(issue.closing)}\`,`);
  lines.push(`};`);
  lines.push("");
  return lines.join("\n");
}

async function updateIndexFile(month: string): Promise<void> {
  const exportName = camelExportName(month);
  const indexSrc = await readFile(INDEX_PATH, "utf8");
  const importLine = `import { ${exportName} } from "./${month}";`;
  if (indexSrc.includes(importLine)) {
    console.log(`Index already imports ${exportName} — skipping.`);
    return;
  }
  const importLines = indexSrc.match(/^import .+$/gm) ?? [];
  if (importLines.length === 0) throw new Error("No imports found in index.ts");
  const lastImport = importLines[importLines.length - 1];
  const updatedSrc = indexSrc
    .replace(lastImport, `${lastImport}\n${importLine}`)
    .replace(
      /export const issues: NewsletterIssue\[\] = \[([\s\S]*?)\];/,
      (_m, list: string) =>
        `export const issues: NewsletterIssue[] = [${exportName},${list}];`,
    );
  await writeFile(INDEX_PATH, updatedSrc, "utf8");
}

function parseArgs(): { month: string } {
  const args = process.argv.slice(2);
  let month: string | null = null;
  for (const a of args) {
    if (a.startsWith("--month=")) month = a.slice("--month=".length);
  }
  if (!month) {
    const now = new Date();
    month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  }
  if (!/^\d{4}-\d{2}$/.test(month)) {
    throw new Error(`Invalid --month "${month}", expected YYYY-MM`);
  }
  return { month };
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ERROR: Set ANTHROPIC_API_KEY in your environment.");
    process.exit(1);
  }
  const { month } = parseArgs();
  const [y, m] = month.split("-");
  const monthLabel = new Date(`${y}-${m}-01T00:00:00Z`).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const outPath = join(NEWSLETTER_DIR, `${month}.ts`);
  if (existsSync(outPath)) {
    console.error(`ERROR: ${outPath} already exists. Delete it to regenerate.`);
    process.exit(1);
  }

  console.log(`Generating BrookHaven Monthly for ${monthLabel} (${month}) with web search...\n`);

  const sourcesRaw = await readFile(SOURCES_PATH, "utf8");
  const sources = parseYaml(sourcesRaw) as SourcesFile;

  const client = new Anthropic({ apiKey });
  console.log("Claude is researching the web (this takes 1-3 minutes)...");
  const issue = await generateIssue(client, monthLabel, sources);
  console.log(
    `  ${issue.taxLegislation.length} tax items, ${issue.aiTools.length} AI items`,
  );

  await mkdir(NEWSLETTER_DIR, { recursive: true });
  await writeFile(outPath, issueToTsFile(month, monthLabel, issue), "utf8");
  console.log(`\n✓ Wrote ${outPath}`);

  await updateIndexFile(month);
  console.log(`✓ Updated ${INDEX_PATH}`);

  console.log(`\n🎉 Done. Commit + push to publish:`);
  console.log(`   git add web/src/content/newsletter/${month}.ts web/src/content/newsletter/index.ts`);
  console.log(`   git commit -m "Newsletter: ${monthLabel} issue (auto-generated)"`);
  console.log(`   git push origin main`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
