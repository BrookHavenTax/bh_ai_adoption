import type { Tutorial } from "../types";

export const mondayAuditAutomation: Tutorial = {
  slug: "monday-audit-automation",
  title: "Audit a broken Monday automation with Claude",
  subtitle:
    "Diagnose first. Before you build anything new, find what's actually breaking.",
  emoji: "🩺",
  format: "Prompt",
  difficulty: "Intermediate",
  timeEstimate: "20 min per automation",
  audienceRoleIds: [
    "financial-advisor",
    "legal-ops-director",
    "accounting-lead",
    "admin-manager",
  ],
  themeIds: ["monday-fragility"],
  toolIds: ["monday"],
  aiTools: ["Claude.ai"],
  prerequisites: [
    "Edit access to the Monday board with the suspect automation",
    "1-2 examples of cases where the automation produced the wrong output",
  ],
  whenToUse:
    "When a Monday automation is doing the wrong thing — sending the wrong email, filling the wrong field, triggering on the wrong status. The ILIT board pattern.",
  whenNotToUse:
    "When the automation is just slow but correct. That's a different problem (and usually Monday's plan tier).",
  steps: [
    {
      title: "Why Claude is good at this",
      body: `Monday automations look simple but accumulate complexity — chained triggers, dependent fields, conditional notifications. When one breaks, the root cause is often 3 steps upstream from where you noticed the problem.

Claude is good at:
- Reading a complex multi-step automation as a system
- Spotting where data could be missing or in the wrong format
- Catching the case where two automations interact in unexpected ways`,
    },
    {
      title: "Capture the automation as text",
      body: `Open the Monday board → Automations → the suspect rule. Take a screenshot OR transcribe the rule into text.

Format it like this (so Claude can reason about it):`,
      prompt: `Automation: "ILIT premium notice"

TRIGGER: when status changes to "Premium Due"
↓
STEP 1: pull "Insured Name" from board column A
STEP 2: pull "Premium Amount" from board column F
STEP 3: pull "Due Date" from board column G
STEP 4: send email template "ILIT-PremiumNotice" to client
STEP 5: substitute {{insured_name}}, {{premium_amount}}, {{due_date}} in template
STEP 6: change status to "Notice Sent"
STEP 7: set "Next Review Date" = today + 30 days`,
    },
    {
      title: "Describe the failure mode",
      body: `Write down exactly what went wrong. Be specific:

> *"For ILIT case #14 (Smith family), the notice went out with {{insured_name}} as 'undefined' instead of the actual name. {{premium_amount}} was correct. The status updated to 'Notice Sent' even though the email was malformed."*

The more specific you are, the better the diagnosis.`,
    },
    {
      title: "Paste both into Claude and ask for a diagnosis",
      body: `Open Claude.ai → new chat. Paste your automation steps + failure description + this prompt:`,
      prompt: `You're debugging a Monday.com automation. Above is the automation logic and a failure example.

Tell me:

1. **Most likely root cause** (one paragraph)
2. **Alternative explanations** (2-3 other things that could explain this)
3. **What I should check FIRST** (the cheapest test to confirm the root cause)
4. **How to fix it** once the root cause is confirmed
5. **What ELSE this same bug might affect** — other automations or downstream data that could be quietly corrupted

Be specific. Reference column names from the automation steps. Don't speculate about Monday's internals — focus on what we can actually verify by looking at the board.`,
    },
    {
      title: "Read the diagnosis with skepticism",
      body: `Claude's diagnosis is a hypothesis, not a certainty. Treat it like a senior engineer's first guess — usually right, sometimes wrong, always worth verifying.

The "what I should check first" answer is the most useful — it tells you the cheapest test to run.`,
    },
    {
      title: "Run the suggested check",
      body: `Common Monday automation issues Claude will catch:
- A column was renamed but the automation still references the old name
- The trigger fires before a dependent column finishes calculating
- Two automations chain in an order that overwrites each other's output
- A template field references a column that's empty for some rows
- The "when status changes" trigger fires for status changes the automation isn't supposed to handle

Verify the suggested check. If it confirms the diagnosis, fix it. If not, paste the new info back to Claude and iterate.`,
    },
    {
      title: "Document the fix in a Monday item",
      body: `For every diagnosed automation issue, create a Monday item in a "Automation Fixes" board:

- Date
- Automation name
- Symptom
- Root cause
- Fix applied
- Test case to re-run if this regresses

After 6 months you have a real automation health log. Patterns emerge: *"We keep getting bitten by column renames — let's lock that down."*`,
    },
    {
      title: "When to give up on the Monday automation and script it",
      body: `If you've fixed the same automation 3+ times and it keeps breaking, that's the signal to replace it with a Python+Claude script that hits the Monday API directly. More code, but it's transparent, version-controlled, and logs every action.

See the "Safer automation pattern" tutorial for the script template.`,
    },
  ],
  pitfalls: [
    "Asking Claude 'why is my automation broken?' without giving it the automation steps. It needs the system to reason about.",
    "Trusting Claude's first hypothesis without verifying. It's usually right, sometimes wrong — always check.",
    "Fixing the symptom (re-running the automation manually) without finding the root cause. The bug comes back next month.",
  ],
  relatedTutorialSlugs: ["monday-safe-automation", "automation-diagnostics"],
};

export const mondaySafeAutomation: Tutorial = {
  slug: "monday-safe-automation",
  title: "The human-in-the-loop automation pattern",
  subtitle:
    "Replace fragile Monday automations with debuggable scripts that propose, never auto-act, on client-facing work.",
  emoji: "🛡️",
  format: "Script",
  difficulty: "Advanced",
  timeEstimate: "1-2 hours per automation to migrate",
  audienceRoleIds: [
    "legal-ops-director",
    "financial-advisor",
    "accounting-lead",
  ],
  themeIds: ["monday-fragility"],
  toolIds: ["monday", "telegram"],
  aiTools: ["Claude API", "Claude Cowork"],
  prerequisites: [
    "Monday API token (Account → Admin → API)",
    "A workstation that can run a Python script on a schedule (cron or Task Scheduler)",
    "Telegram bot for notifications (see the Telegram bot tutorial)",
  ],
  whenToUse:
    "For ANY automation that produces client-facing output — emails to clients, generated documents, payment notifications. The ILIT failure mode says this is non-negotiable.",
  whenNotToUse:
    "For purely internal status updates (e.g., 'when task is done, set color to green'). Native Monday automations are fine for that.",
  steps: [
    {
      title: "The pattern in one sentence",
      body: `**Propose, don't act.** Every client-facing automation runs in two phases: (1) generate the proposed action and log it; (2) wait for human approval before sending/posting/creating.

This is exactly what the Legal Ops Director was asking for: *"manually check to see if it worked"* — except now the check is one click instead of opening the email and the system.`,
    },
    {
      title: "The skeleton script",
      body: `Every safe automation looks like this:

\`\`\`python
# every_morning.py
from datetime import date
import requests, anthropic
from telegram_helpers import notify_pending

MONDAY_TOKEN = "..."
client = anthropic.Anthropic()

def list_items_needing_action():
    # Query Monday API for items in "Premium Due" status
    ...

def propose_action(item) -> dict:
    msg = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=600,
        messages=[{"role": "user", "content": f"Item: {item}. Draft the ILIT premium notice email."}],
        system="(detailed instructions for what good output looks like)",
    )
    return {"to": item.client_email, "subject": ..., "body": msg.content[0].text, "item_id": item.id}

def main():
    for item in list_items_needing_action():
        proposal = propose_action(item)
        save_proposal(proposal)
        notify_pending(proposal)

if __name__ == "__main__":
    main()
\`\`\`

The proposal is saved (database, file, or a Monday "Proposals" board) and a Telegram alert is sent. Nothing has been sent to a client yet.`,
    },
    {
      title: "The approval interface",
      body: `Simplest version: a Monday board with one row per pending proposal. Columns:
- Date generated
- Client
- Proposed subject
- Proposed body (click to preview)
- [✅ Approve] [✏️ Edit] [❌ Reject] buttons

Approve → triggers the actual send via API.
Edit → reopens for human revision before send.
Reject → marks the item back for human handling.

A medium-effort version is a small web app. A no-build version is a Telegram bot that DMs each proposal with inline approve/reject buttons.`,
    },
    {
      title: "Log everything — what was proposed, what was approved, what was sent",
      body: `For every action the script takes, log:
- Timestamp
- Trigger (which Monday item, what state change)
- Proposal (the draft email/doc)
- Reviewer (who approved)
- Final action (what was actually sent, after edits)

Store logs in a database table or a Dropbox-synced CSV. **This is the audit trail that lets you sleep at night** when something goes wrong.`,
    },
    {
      title: "Add a daily health-check digest",
      body: `Each morning, the script also sends a Telegram message:

> *"Health check: 12 actions proposed in last 24h. 11 approved and sent. 1 still pending review (TKI Premium #14). 0 errors."*

If this digest stops arriving, you know the script died. If counts look wrong, you investigate immediately.`,
    },
    {
      title: "Migration plan: one automation at a time",
      body: `Don't migrate every automation at once. Pick the most-painful one (the ILIT premium notice is the obvious starting point). Migrate it. Run it in parallel with the broken Monday version for 2 weeks. Disable the Monday version when the new one is proven.

Then move to the next.`,
    },
    {
      title: "When NOT to use this pattern",
      body: `For purely internal status changes (move task to "in progress," change a color, set a date), native Monday automations are fine. The human-in-the-loop overhead only pays off when:
- Output goes to a client (external email, generated doc)
- A mistake would be embarrassing or expensive
- The frequency is low enough that human approval isn't a bottleneck (typically <20 actions/day)

For high-frequency internal stuff, native Monday or simpler scripts without approval gates are right.`,
    },
  ],
  pitfalls: [
    "Auto-approving 'high confidence' proposals without a daily sample-check. Confidence scores drift; human review catches drift early.",
    "Skipping the audit log. When something goes wrong, you'll desperately wish you had it.",
    "Migrating every Monday automation to this pattern. Reserve it for the client-facing ones.",
    "Letting proposals accumulate without approval. Add a 'pending too long' alert (>4 hours unreviewed).",
  ],
  relatedTutorialSlugs: ["monday-audit-automation", "telegram-bot-bh"],
};

export const mondayTutorials = [mondayAuditAutomation, mondaySafeAutomation];
