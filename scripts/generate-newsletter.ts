/**
 * Generate a new monthly newsletter issue.
 *
 * Pipeline:
 *  1. Read /newsletter/sources.yml
 *  2. Fetch each source URL, extract visible text, truncate to ~5k chars
 *  3. Send the bundle to Claude with a prompt that asks for structured
 *     NewsletterIssue JSON (taxLegislation + aiTools + intro + closing)
 *  4. Validate the response
 *  5. Write web/src/content/newsletter/YYYY-MM.ts
 *  6. Update web/src/content/newsletter/index.ts to import + prepend the issue
 *
 * Run locally:
 *   ANTHROPIC_API_KEY=sk-ant-... npx tsx generate-newsletter.ts
 *
 * Specify a different month:
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
const MAX_SOURCE_CHARS = 5000;
const FETCH_TIMEOUT_MS = 15000;

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

interface FetchedSource {
  name: string;
  url: string;
  priority: string;
  text: string;
  error?: string;
}

interface FetchedBundle {
  tax_legislation: FetchedSource[];
  ai_tools: FetchedSource[];
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

// ─────────────────────────────────────────────────────────────────────────
// HTML → plain text (cheap & sufficient)
// ─────────────────────────────────────────────────────────────────────────
function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<aside[\s\S]*?<\/aside>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchSource(s: SourceEntry): Promise<FetchedSource> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(s.url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 BHAdoptionHubBot/0.1 (newsletter generator; +internal use)",
      },
    });
    clearTimeout(timeout);
    if (!res.ok) {
      return {
        name: s.name,
        url: s.url,
        priority: s.priority ?? "medium",
        text: "",
        error: `HTTP ${res.status}`,
      };
    }
    const raw = await res.text();
    const text = stripHtml(raw).slice(0, MAX_SOURCE_CHARS);
    return {
      name: s.name,
      url: s.url,
      priority: s.priority ?? "medium",
      text,
    };
  } catch (err) {
    return {
      name: s.name,
      url: s.url,
      priority: s.priority ?? "medium",
      text: "",
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

function bundleAsContext(bundle: FetchedBundle): string {
  function fmt(group: string, list: FetchedSource[]): string {
    const sections = list.map((s) => {
      if (s.error) {
        return `### ${s.name} (${s.url}) — PRIORITY: ${s.priority}\n[fetch failed: ${s.error}]\n`;
      }
      return `### ${s.name} (${s.url}) — PRIORITY: ${s.priority}\n${s.text}\n`;
    });
    return `## ${group}\n\n${sections.join("\n")}`;
  }
  return [
    fmt("TAX LEGISLATION SOURCES", bundle.tax_legislation),
    fmt("AI TOOLS SOURCES", bundle.ai_tools),
  ].join("\n\n");
}

// ─────────────────────────────────────────────────────────────────────────
// Claude prompt
// ─────────────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the editor of the Brookhaven Monthly newsletter — an internal monthly digest for a tax / legal / accounting / wealth-management firm that serves clients ranging from middle class to ultra high net worth.

Audience: BH staff (Tax Lead, Accounting Lead, Legal Operations Director, Paralegal, Admin Manager, Financial Advisor, and others). Most are not full-time policy wonks. They want practical "what's moving and what does it mean for our clients" — not legislative deep-dives.

Tone: Friendly, professional, direct. Plain English. No "industry jargon for jargon's sake." Short sentences. Confident without being preachy. Light emoji ok in the section structure (already there in the UI); not in the body text.

For each item, you must determine:
- TITLE: 5-12 words, headline form, no period
- SUMMARY: 2-3 sentences plain English on what is actually happening
- STATUS (tax items only): one of "Idea/Discussion", "Proposed bill", "Committee markup", "Passed one chamber", "Passed both chambers", "Signed into law", "Effective", "Stalled", "Court / regulatory action", "Withdrawn"
- SCOPE (optional): "Federal", "GA state", "Multi-state", or specific state name
- WHAT IT MEANS FOR BH: 1-2 sentences tied to BH client work — estate planning, tax filing, trust administration, multi-entity bookkeeping (Will runs 11+ entities), client communications. Reference specific BH context where relevant: Lisa (Tax Lead, willing-but-cautious adopter), the ILIT board incident, the 460-bills-a-year accounting volume.
- AFFECTSBRACKETS (optional, tax items only): subset of ["Middle class", "High net worth", "Ultra high net worth"]
- IMPACT: "high" (likely affects most clients OR small subset materially), "medium" (worth knowing), "low" (minor / niche), "informational" (FYI, no action)
- SOURCES: at least one primary source link. Use the URLs we provide you; do NOT invent URLs.

Selection rules:
- Maximum 8 items per section. Quality over quantity. Skip duplicates and items that don't actually move anything.
- If a section truly has nothing material this month, set the items array to empty and provide a 1-sentence "noTaxNews" or "noAiNews" note explaining why.
- Cluster related items if there are multiple proposals on the same topic.
- Skip pure press-release fluff. Skip items >35 days old unless they're the latest update on an ongoing story.
- Don't fabricate items. If the sources don't surface anything substantive, that's an honest "quiet month."

Intro paragraph guidance:
- 1-2 paragraphs total
- Set the tone for the month. What's the one thing readers should care most about?
- Markdown ok (bold, links)
- Brookhaven-y voice (per the tone rules)

Closing note: optional. If included, keep it warm and short.

OUTPUT FORMAT: respond with ONLY valid JSON matching this exact shape (no markdown fence, no commentary):

{
  "intro": "...markdown string...",
  "taxLegislation": [
    {
      "title": "...",
      "summary": "...",
      "status": "...",
      "scope": "...",
      "whatItMeans": "...",
      "affectsBrackets": ["..."],
      "impact": "high|medium|low|informational",
      "sources": [{"label": "...", "url": "https://..."}]
    }
  ],
  "noTaxNews": "...optional...",
  "aiTools": [ ...same shape as items, omit status/scope/affectsBrackets... ],
  "noAiNews": "...optional...",
  "closing": "...optional..."
}`;

// ─────────────────────────────────────────────────────────────────────────
// Generation
// ─────────────────────────────────────────────────────────────────────────
async function generateIssue(
  client: Anthropic,
  month: string,
  monthLabel: string,
  bundle: FetchedBundle,
  filters: SourcesFile["filters"],
): Promise<NewsletterJson> {
  const context = bundleAsContext(bundle);
  const filterHints = filters
    ? `\n\nFilter hints:\n- Lookback window: ${filters.lookback_days ?? 35} days\n- Prioritize topics: ${(filters.prioritize_topics ?? []).join(", ")}\n- Exclude terms: ${(filters.exclude_terms ?? []).join(", ")}`
    : "";

  const userPrompt = `Generate the Brookhaven Monthly newsletter for ${monthLabel} (${month}).

Below are the fetched contents from each configured source. Use these — and ONLY these — to determine what's worth including. Do not invent items. If a section is genuinely quiet, say so.${filterHints}

${context}`;

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  const block = message.content.find((b) => b.type === "text");
  if (!block || block.type !== "text") {
    throw new Error("No text content in Claude response");
  }
  const raw = block.text.trim();
  // Strip accidental ``` fences if Claude included them
  const cleaned = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();

  let parsed: NewsletterJson;
  try {
    parsed = JSON.parse(cleaned) as NewsletterJson;
  } catch (err) {
    console.error("Failed to parse Claude JSON response:");
    console.error(cleaned.slice(0, 2000));
    throw err;
  }
  return parsed;
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
  // 2026-06 → june2026
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
  lines.push(`// Auto-generated by scripts/generate-newsletter.ts on ${new Date().toISOString()}`);
  lines.push(`// Source: ${SOURCES_PATH.replace(REPO_ROOT, "")}`);
  lines.push("");
  lines.push(`export const ${exportName}: NewsletterIssue = {`);
  lines.push(`  month: "${month}",`);
  lines.push(`  monthLabel: \`${monthLabel}\`,`);
  lines.push(`  publishedDate: "${isoDate}",`);
  lines.push(`  authorship: "auto-generated",`);
  lines.push(`  intro: \`${escapeTs(issue.intro)}\`,`);
  lines.push("");
  lines.push(`  taxLegislation: [`);
  for (const item of issue.taxLegislation) {
    lines.push(itemToTs(item));
  }
  lines.push(`  ],`);
  if (issue.noTaxNews) {
    lines.push(`  noTaxNews: \`${escapeTs(issue.noTaxNews)}\`,`);
  }
  lines.push("");
  lines.push(`  aiTools: [`);
  for (const item of issue.aiTools) {
    lines.push(itemToTs(item));
  }
  lines.push(`  ],`);
  if (issue.noAiNews) {
    lines.push(`  noAiNews: \`${escapeTs(issue.noAiNews)}\`,`);
  }
  if (issue.closing) {
    lines.push(`  closing: \`${escapeTs(issue.closing)}\`,`);
  }
  lines.push(`};`);
  lines.push("");
  return lines.join("\n");
}

async function updateIndexFile(month: string): Promise<void> {
  const exportName = camelExportName(month);
  const indexSrc = await readFile(INDEX_PATH, "utf8");

  // Insert import line
  const importLine = `import { ${exportName} } from "./${month}";`;
  if (indexSrc.includes(importLine)) {
    console.log(`Index already imports ${exportName} — skipping update.`);
    return;
  }
  const lastImportMatch = indexSrc.match(/^import .+$/m);
  if (!lastImportMatch) {
    throw new Error("Could not find import statements in index.ts");
  }
  // Find the last import line in the existing file
  const importLines = indexSrc.match(/^import .+$/gm) ?? [];
  const lastImport = importLines[importLines.length - 1];
  const updatedSrc = indexSrc
    .replace(lastImport, `${lastImport}\n${importLine}`)
    .replace(
      /export const issues: NewsletterIssue\[\] = \[([\s\S]*?)\];/,
      (_match, existingList: string) =>
        `export const issues: NewsletterIssue[] = [${exportName},${existingList}];`,
    );
  await writeFile(INDEX_PATH, updatedSrc, "utf8");
}

// ─────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────
function parseArgs(): { month: string } {
  const args = process.argv.slice(2);
  let month: string | null = null;
  for (const a of args) {
    if (a.startsWith("--month=")) {
      month = a.slice("--month=".length);
    }
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
    console.error(`ERROR: ${outPath} already exists. Delete it first if you want to regenerate.`);
    process.exit(1);
  }

  console.log(`Generating BH Monthly for ${monthLabel} (${month})...\n`);

  // Step 1 — read sources
  const sourcesRaw = await readFile(SOURCES_PATH, "utf8");
  const sources = parseYaml(sourcesRaw) as SourcesFile;

  // Step 2 — fetch all
  console.log("Fetching sources...");
  const [taxResults, aiResults] = await Promise.all([
    Promise.all(sources.tax_legislation.map(fetchSource)),
    Promise.all(sources.ai_tools.map(fetchSource)),
  ]);

  const bundle: FetchedBundle = {
    tax_legislation: taxResults,
    ai_tools: aiResults,
  };

  for (const s of [...taxResults, ...aiResults]) {
    if (s.error) {
      console.warn(`⚠ ${s.name}: ${s.error}`);
    } else {
      console.log(`✓ ${s.name} (${s.text.length} chars)`);
    }
  }
  console.log("");

  // Step 3 — Claude generates
  console.log("Calling Claude to draft the issue (this takes ~30-60s)...");
  const client = new Anthropic({ apiKey });
  const issue = await generateIssue(client, month, monthLabel, bundle, sources.filters);

  console.log(
    `  ${issue.taxLegislation.length} tax items, ${issue.aiTools.length} AI items`,
  );

  // Step 4 — write file
  await mkdir(NEWSLETTER_DIR, { recursive: true });
  const tsContent = issueToTsFile(month, monthLabel, issue);
  await writeFile(outPath, tsContent, "utf8");
  console.log(`\n✓ Wrote ${outPath}`);

  // Step 5 — update index
  await updateIndexFile(month);
  console.log(`✓ Updated ${INDEX_PATH}`);

  console.log(`\n🎉 Done. Commit and push the changes to publish:`);
  console.log(`   git add web/src/content/newsletter/${month}.ts web/src/content/newsletter/index.ts`);
  console.log(`   git commit -m "Newsletter: ${monthLabel} issue"`);
  console.log(`   git push origin main`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
