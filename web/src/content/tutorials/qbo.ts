import type { Tutorial } from "../types";

export const qboBillAnomaly: Tutorial = {
  slug: "qbo-bill-anomaly",
  title: "Bill-pay anomaly review with Claude + QBO",
  subtitle:
    "Stop manually clicking through 14 recurring bills that haven't changed in 6 months. Approve the routine in a batch; review only the anomalies.",
  emoji: "🚨",
  format: "Cowork",
  difficulty: "Intermediate",
  timeEstimate: "1 hour setup, saves ~3-5 hours/month per entity",
  audienceRoleIds: ["accounting-lead"],
  themeIds: ["qbo-accounting"],
  toolIds: ["qbo"],
  aiTools: ["Claude.ai with QuickBooks Online MCP connector", "Claude API"],
  prerequisites: [
    "Claude.ai with the QuickBooks Online connector enabled (Settings → Connectors → QuickBooks Online)",
    "Admin access to the QBO file you want to pilot with",
    "Pick ONE entity to start — ideally your highest bill-volume one",
  ],
  whenToUse:
    "Monthly or weekly bill-pay review. Survey data: 460 bills, $4.1M, 59 recurring items in one year on one role. Single biggest hour-saver in the firm.",
  whenNotToUse:
    "Don't use this for new vendors or one-off bills. Those should always get individual human review with the full context.",
  steps: [
    {
      title: "Connect Claude to your pilot entity's QBO",
      body: `In Claude.ai → Settings → Connectors → QuickBooks Online → **Connect**. You'll be redirected to QBO's OAuth screen → log in → authorize.

**Important:** Claude only supports one QBO connection at a time. Pick the entity you want to pilot — typically your highest bill-volume one. We'll handle multi-entity later.`,
      callout: {
        variant: "warning",
        body: "When you reconnect to a different QBO company later, the previous connection is replaced. Plan to do one entity's monthly work in one Claude session.",
      },
    },
    {
      title: "Pull your bill-pay history with one prompt",
      body: `Start a new chat in Claude.ai (your QBO connector is now available). Run:`,
      prompt: `Pull every bill payment from the last 12 months for this company. For each, give me:

- Vendor name
- Bill date
- Amount
- Account/category
- Memo (if any)

Group by vendor. For each vendor, also compute:
- Total payments in the last 12 months
- Count of payments
- Average payment amount
- Standard deviation of payment amount
- Whether this looks like a "recurring" vendor (paid 6+ times in 12 months with stddev <20% of mean)

Output as a clean table, recurring vendors first.`,
    },
    {
      title: "Review the recurring-vendor list",
      body: `Claude will return a table. Skim it. These are your candidates for "approve in a batch without individual review next month."

You'll see things like:
- Geico, $340/mo, paid every month, very stable → recurring, low review priority
- AWS, ~$420-460/mo, paid every month, mild variance → recurring, occasional spot-check
- "ABC Plumbing," paid 3 times in 12 months for varying amounts → NOT recurring, always review

Mark the genuinely-recurring ones. Save the list. You'll use it as your "approve fast" pattern next month.`,
    },
    {
      title: "Each month, run the anomaly check",
      body: `Now your monthly workflow. At month-end, get the list of unpaid bills:`,
      prompt: `Pull all open (unpaid) bills currently in QBO. For each, compare against the same vendor's last 6 months of paid bills. Flag anything where:

- Amount is more than 25% above the 6-month average for that vendor
- This vendor hasn't been paid before (new vendor)
- The category/account is different from prior bills from the same vendor
- There's no memo and the vendor isn't on my recurring list

Output two tables:

**A. ROUTINE — recurring vendors, amount matches pattern.** I'll approve these in a batch.
**B. NEEDS REVIEW — anomalies, new vendors, or off-pattern amounts.** I'll review these individually.

For table B, include the prior 6 months of payments to that vendor alongside the current bill so I have context.`,
    },
    {
      title: "Approve table A in a batch",
      body: `Open QBO → Bills → select the items from table A → Pay (or move to Bill Pay). Done in 5 minutes for 14 recurring bills instead of 30 minutes.

**Spot-check rule:** randomly pick 2 of the 14 bills in table A to spot-check each month. This is your sanity check that the "routine" classification is still accurate. Drift happens; spot-checking catches it.`,
    },
    {
      title: "Review table B individually",
      body: `Open each table-B bill in QBO. Look at it with the prior-payment context Claude gave you.

Common findings:
- Insurance premium went up 8% at renewal → legit, pay
- Utility bill is $90 higher than usual → check meter reading or attached invoice → if wrong, dispute before paying
- New vendor "Acme Consulting" → confirm with the person who set up the engagement before paying

This is where human judgment matters. Don't skip it.`,
    },
    {
      title: "Track time saved",
      body: `Log how long the monthly bill review took before vs after. Most pilots see:
- Before: 3-5 hours of clicking
- After: 30-45 minutes (5 min for batch approval + 25-40 min for anomaly review)

That's the data you need to (a) justify expanding to other entities and (b) propose this pattern to leadership.`,
    },
    {
      title: "Extending to multiple entities",
      body: `Two paths:

**Manual (works today):** swap your Claude QBO connection to entity 2, repeat the monthly workflow. Slower but no engineering needed.

**Scripted (one-time build):** write a Python script that uses the QBO API directly (not via MCP) to pull bill history from all 11 entities into one dataset. Pass each entity's data to Claude for anomaly analysis. Output a master "anomaly review" report covering everything. This is a multi-day build but solves the multi-entity constraint.`,
    },
  ],
  pitfalls: [
    "Trusting the 'recurring' classification without periodic spot-checks. Drift will catch you.",
    "Forgetting that the QBO MCP connects to ONE company at a time. Plan your session to finish one entity before switching.",
    "Auto-approving table A without ever looking. The whole point is that anomaly detection PLUS spot-checking is safer than manual-everything.",
    "Skipping the prior-6-months context on table B. Without it, you can't tell whether an 'anomaly' is actually fine.",
  ],
  relatedTutorialSlugs: ["qbo-ar-followup", "qbo-month-close"],
};

export const qboArFollowup: Tutorial = {
  slug: "qbo-ar-followup",
  title: "AR follow-up drafts from your aging report",
  subtitle:
    "Turn 'who do I need to chase this week' into a stack of drafted emails calibrated to each client's payment history.",
  emoji: "💸",
  format: "Cowork",
  difficulty: "Intermediate",
  timeEstimate: "45 min setup, saves ~2 hours/week",
  audienceRoleIds: ["accounting-lead", "client-resource-specialist"],
  themeIds: ["qbo-accounting", "email-triage"],
  toolIds: ["qbo", "outlook"],
  aiTools: ["Claude.ai with QuickBooks Online MCP connector"],
  prerequisites: [
    "Claude.ai with QBO connector",
    "Knowledge of each major client's payment-pattern history (or just let Claude infer it from the data)",
    "The 'Brookhaven voice' Claude Skill (recommended)",
  ],
  whenToUse:
    "Weekly AR review. Especially valuable when you have 30+ open invoices across multiple entities.",
  steps: [
    {
      title: "Pull the AR aging detail",
      body: `In a new Claude chat:`,
      prompt: `Run the AR aging detail report for this company. Include every open invoice with: customer, invoice number, original amount, balance due, days past due, original invoice date.

Group by customer. Sort customers by total outstanding balance descending.`,
    },
    {
      title: "Get historical payment patterns per customer",
      body: `For each customer with open balances, ask Claude:`,
      prompt: `For each customer with outstanding balances above $500, pull their payment history from the last 12 months. For each customer, summarize:

- Average days from invoice to payment
- Whether they pay early, on time, late but reliable, or sporadically late
- The largest gap between invoice and payment in the last year
- Any current outstanding invoice that's beyond their typical pattern

Output as a table. This is the context I need to write appropriately-toned follow-ups.`,
    },
    {
      title: "Draft follow-ups grouped by payment-pattern profile",
      body: `Now ask Claude to draft the actual emails:`,
      prompt: `Using the AR aging + payment-pattern data above, draft follow-up emails grouped by customer profile:

**Tier 1 — 'Pays late but reliable' clients (e.g., always 30-45 days late):**
Tone: friendly nudge, no panic. "Following up on Invoice X, currently 35 days past due — let me know if you need a new copy."

**Tier 2 — 'Out of pattern' clients (current invoice is BEYOND their normal late):**
Tone: warm but more direct. Reference their typical pattern. "We usually see your payments by day 30 — Invoice X is at day 50, wanted to check in."

**Tier 3 — 'Brand new late' clients (first invoice ever past due):**
Tone: gentle, assume oversight. "Just a heads-up that Invoice X is 15 days past due — let me know if there's any issue."

**Tier 4 — 'Stop the bleeding' clients (60+ days past due, multiple open invoices):**
Tone: still professional but escalating. Direct ask. Offer to set up a call.

For each tier, draft ONE template email I can lightly personalize per client. Use the Brookhaven voice (friendly, professional, no corporate-speak). Under 100 words each. Sign with "Thanks, [my name]"`,
    },
    {
      title: "Personalize and send",
      body: `Claude returns 4 template emails plus the per-customer breakdown of who fits each tier.

For each customer:
1. Copy the template that matches their tier
2. Substitute the specific invoice number(s), dates, and amounts
3. Add a one-line personal touch if you have context ("Hope the renovation is going well")
4. Send via Outlook

The pattern means you're personalizing tone-by-tier rather than writing 30 individual emails from scratch.`,
    },
    {
      title: "Add the 'sensitive relationship' override",
      body: `Some clients have collections instructions from leadership ("hold all collections until Crystal says otherwise," "press at 45 days," etc.). Build a small lookup — a CSV or Notion page — with these notes.

When generating the AR follow-up list, give Claude this lookup as context:`,
      prompt: `Here are special collections instructions per client:

- TKI: press at 60 days, gentle reminder OK at 30
- BrightPoint: hold all collections, no follow-up emails
- Hartwell: usual cadence, no special handling
- (...)

When drafting follow-ups, override the standard tier for any client with a special instruction.`,
      callout: {
        variant: "tip",
        body: "The Accounting Lead's survey response specifically called this out — Lisa's institutional knowledge about client relationships needs to be captured somewhere referenceable, not just in her head. This lookup is where it lives.",
      },
    },
    {
      title: "Log what got sent",
      body: `Keep a Monday board (or a simple spreadsheet): one row per sent follow-up, with date, customer, invoice, tier used, response received (if any).

After 3 months you'll have data on which tier templates actually get paid the fastest. Tune the templates based on what works.`,
    },
  ],
  pitfalls: [
    "Sending tier-4 'stop the bleeding' emails without confirming with leadership first. Some clients are 'hold all collections' regardless of age.",
    "Using the same template for every customer. The whole point is tier-by-pattern. Take the 30 extra seconds to personalize.",
    "Ignoring the special-instructions lookup. That's where the institutional relationship knowledge lives.",
  ],
  relatedTutorialSlugs: ["email-first-draft", "qbo-bill-anomaly", "claude-skill-bh-voice"],
};

export const qboMonthClose: Tutorial = {
  slug: "qbo-month-close",
  title: "Month-end close on one entity in 20 minutes",
  subtitle: "Claude as your prep + review partner for the monthly close.",
  emoji: "📅",
  format: "Cowork",
  difficulty: "Intermediate",
  timeEstimate: "1 hour setup, ~20 min/entity/month after",
  audienceRoleIds: ["accounting-lead"],
  themeIds: ["qbo-accounting"],
  toolIds: ["qbo"],
  aiTools: ["Claude.ai with QuickBooks Online MCP connector"],
  prerequisites: [
    "Claude.ai with QBO connector",
    "Familiar with the entity's standard chart of accounts and recurring journal entries",
  ],
  whenToUse:
    "Monthly close work. Particularly valuable for the multi-entity reality: same workflow repeated 11+ times, where small AI assistance compounds.",
  steps: [
    {
      title: "Connect to the entity, then run the prep checklist",
      body: `Connect Claude to the entity. Then run:`,
      prompt: `Prepare a month-end close checklist for this company for the period ending {{last day of prior month}}. Include:

1. **Uncategorized transactions** — list all transactions with no class/category
2. **Unreconciled bank accounts** — for each bank/credit card, when was the last reconciliation completed? Are there transactions waiting?
3. **Missing standard JEs** — based on the last 6 months, what recurring JEs (depreciation, intercompany, loan amortization) should be posted but aren't?
4. **Unmatched A/R or A/P** — any payments not matched to invoices/bills
5. **Negative or unusual balances** — any account balance that's negative when it shouldn't be (e.g., negative bank balance, negative liability)
6. **Vendor/customer discrepancies** — any vendor 1099 totals that don't match expected, any customer with credit balance that should have been refunded

Output as a checklist with quantities and dollar amounts. Don't fix anything — just surface what needs attention.`,
    },
    {
      title: "Work the checklist top-down",
      body: `Take Claude's checklist. Work through it in QBO directly — Claude has surfaced the problems, your judgment fixes them.

For uncategorized transactions, you can ask Claude for help category-by-category:`,
      prompt: `Here are 23 uncategorized transactions. For each, suggest the most likely category based on:
- The vendor's prior coding history for THIS company
- The transaction memo
- The amount and date pattern

Output as a table: transaction, suggested category, confidence (high/med/low), why. I'll review and post.`,
    },
    {
      title: "Generate draft journal entries for recurring items",
      body: `For the recurring JEs you post every month (depreciation, intercompany allocations, accrued payroll), ask Claude:`,
      prompt: `Pull the journal entries posted in each of the last 3 months for this company. Identify any entries that look recurring (same accounts, same or similar amounts, posted monthly).

For each recurring entry, draft what the current month's entry should look like. Output as a list of proposed JEs in the form:

DR/CR | Account | Amount | Memo

I'll review and post the ones that are right.`,
    },
    {
      title: "Run the financial statement sanity check",
      body: `Once you've posted the close entries:`,
      prompt: `Run the P&L and Balance Sheet for the period ending {{date}}, and compare against the prior 3 months.

Flag anything unusual:
- Any line item that's >30% different from the trailing 3-month average
- Any new accounts that didn't have activity before
- Any unexpected zero or negative balances
- Any movement in equity accounts that I should explain

Don't tell me everything looks fine if it does — tell me specifically what you compared and what was within range. I want the negative result to be useful too.`,
    },
    {
      title: "Generate the close summary for review",
      body: `End each entity's close with a short summary you can paste into your daily report or send to Lisa:`,
      prompt: `Write a 100-word close summary for this entity for {{period}}. Include:
- Did anything unusual happen this month?
- What's the net income vs prior month and vs YTD?
- Any items still pending or needing leadership input?
- One-sentence "ready for review" or "needs more work" verdict

Use the Brookhaven voice (friendly, direct, no fluff).`,
    },
    {
      title: "Repeat for the next entity",
      body: `Disconnect Claude from this entity's QBO, reconnect to the next, repeat. This is where the per-connection limitation hurts most. The workflow itself is the same.

When you've done all 11, you have:
- Cleaned up uncategorized transactions
- Posted recurring JEs
- Flagged anomalies on each P&L
- Written a 100-word summary per entity

In ~3-4 hours total for the firm. Compared to the all-manual version, that's roughly half the time.`,
    },
  ],
  pitfalls: [
    "Trusting Claude's category suggestions for high-stakes accounts without review. Always review.",
    "Skipping the sanity-check step. The cleanup is only half the value — anomaly detection is the other half.",
    "Doing all 11 entities in one session and rushing. Better to do 3 entities a day for 4 days.",
  ],
  relatedTutorialSlugs: ["qbo-bill-anomaly", "qbo-ar-followup"],
};

export const qboTutorials = [qboBillAnomaly, qboArFollowup, qboMonthClose];
