import type { Tutorial } from "../types";

export const teamsActionItems: Tutorial = {
  slug: "teams-action-items",
  title: "Teams transcript → structured action items",
  subtitle: "Every meeting ends with 'who's doing what by when' — without anyone taking notes.",
  emoji: "🎥",
  format: "Project",
  difficulty: "Beginner",
  timeEstimate: "10 min setup, 2 min per meeting after",
  audienceRoleIds: [
    "admin-manager",
    "legal-ops-director",
    "financial-advisor",
    "strategy-lead",
    "accounting-lead",
  ],
  themeIds: ["cross-entity-comms"],
  toolIds: ["teams", "telegram"],
  aiTools: ["Claude.ai"],
  prerequisites: [
    "Teams meeting transcription enabled (Meeting options → Allow transcription)",
    "Claude.ai account",
  ],
  whenToUse:
    "After any internal meeting where decisions get made or work gets handed off. Especially valuable for ops huddles, due-out follow-up meetings, and project kickoffs.",
  whenNotToUse:
    "Client-facing calls — transcribing client meetings has separate privacy/consent implications. Always tell the client and get explicit consent before recording.",
  steps: [
    {
      title: "Enable transcription as default",
      body: `In Teams, for any meeting:
- Click the meeting → Meeting options → toggle "Record automatically" + "Transcribe" on

For recurring internal meetings, set this once and it'll apply every time.

Microsoft saves the transcript in the meeting chat after the call ends. Click ••• → Transcript → Download .docx or .vtt.`,
    },
    {
      title: "Set up a 'Meeting action items' Claude Project",
      body: `Open Claude.ai → Projects → +New Project. Name: *"Meeting action items."*

Custom instructions:`,
      prompt: `When I share a meeting transcript, produce:

## 1. TL;DR (3 bullets max)
What this meeting was about and what got decided.

## 2. Decisions made
- [What was decided] — [who decided / who's accountable]

## 3. Action items
| Owner | Action | Due | Source quote |

Pull each action item directly from someone making a commitment ("I'll get that to you by Friday" → action). Don't invent action items. If due date isn't specified, write "—" and flag it for clarification.

## 4. Open questions
Things that came up and didn't get resolved. List them so they can be raised at the next meeting.

## 5. Who wasn't there but should hear about this
Based on the discussion, who else needs to know? Note specifically: [name] for [reason].

Output in markdown.`,
    },
    {
      title: "Process your first transcript",
      body: `New chat in the Project. Drag in the .docx or .vtt transcript. Just say *"Process this."*

Claude returns the structured digest in ~30 seconds.`,
    },
    {
      title: "Post it where the team will see it",
      body: `Three places, depending on the meeting:
- **Ops huddle:** post in the relevant Telegram channel
- **Client team meeting:** create a Monday item per action with the owner, due date, and source quote
- **Cross-department meeting:** email the digest to attendees + "who should hear about this" list

The digest takes 2 minutes from transcript-download to posted-summary. Compare to the 20-30 minutes of trying to remember and reconstruct after the meeting.`,
    },
    {
      title: "Track action-item completion",
      body: `Action items only matter if they happen. After the meeting, the meeting owner (or admin manager) is responsible for:

1. Filing each action as a Monday item with the owner + due date
2. Sweeping the previous meeting's action items at the START of the next meeting — what's done, what's open, what's stuck

This sounds obvious but is the most-skipped step. Don't skip it. The AI summarization is wasted if nothing gets actioned.`,
    },
    {
      title: "Bonus: draft the follow-up emails",
      body: `Once you have the action items, ask Claude:`,
      prompt: `For each action item above, draft a brief email TO the owner reminding them of what they committed to, with the deadline and any context they need. One email per owner; group all their actions in one email.

Friendly tone (Brookhaven voice). Don't be preachy. Just confirming what they said they'd do.`,
    },
  ],
  pitfalls: [
    "Letting the digest go unposted. The whole point is shared visibility.",
    "Recording client calls without consent. Internal meetings only unless the client explicitly OKs it.",
    "Skipping the 'sweep prior meeting' step. Action items rot fast without follow-through.",
  ],
  relatedTutorialSlugs: ["telegram-bot-bh", "email-first-draft"],
};

export const telegramBotBh: Tutorial = {
  slug: "telegram-bot-bh",
  title: "Build a Brookhaven Telegram bot",
  subtitle:
    "A bot the team can DM with questions — answers from Monday + Dropbox + QBO via Claude.",
  emoji: "🤖",
  format: "Script",
  difficulty: "Advanced",
  timeEstimate: "3-4 hours initial build, hours of saved searching after",
  audienceRoleIds: [
    "admin-manager",
    "accounting-lead",
    "legal-ops-director",
    "strategy-lead",
  ],
  themeIds: ["cross-entity-comms"],
  toolIds: ["telegram", "monday", "dropbox", "qbo"],
  aiTools: ["Claude API", "Telegram Bot API"],
  prerequisites: [
    "Someone comfortable with Python (~300 lines)",
    "Anthropic API key",
    "Telegram account with permission to add bots to the BH workspace",
    "Server / always-on machine to host the bot",
  ],
  whenToUse:
    "When 'where is X / what's the status of Y / who has Z' questions are eating chunks of multiple coworkers' days. The cross-system search pain in Telegram-shaped form.",
  steps: [
    {
      title: "Create the bot in Telegram",
      body: `Open Telegram. Search for **@BotFather**. Send \`/newbot\`. Follow the prompts:
- Name: \`BH Assistant\`
- Username: \`brookhaven_assistant_bot\` (or whatever's available)

BotFather gives you a token. Save it in a password manager. It's the only credential the bot needs to function.`,
    },
    {
      title: "The bot architecture",
      body: `Three layers:

1. **Telegram polling loop** — listens for incoming DMs to the bot
2. **Claude as the brain** — receives each question, decides which data source(s) to query, runs the queries, drafts an answer
3. **Tool integrations** — Monday API, Dropbox API, QBO API (start with one; add others incrementally)

Use Anthropic's tool-use feature so Claude can call the integrations natively.`,
    },
    {
      title: "Sketch of the main loop",
      body: `\`\`\`python
# bh_bot.py
import os, requests, anthropic
from telegram.ext import Application, MessageHandler, filters

client = anthropic.Anthropic()

# Define tools Claude can call
tools = [
    {
        "name": "search_monday",
        "description": "Search Monday boards for items matching a query string. Returns top 5 matches with their status and assignee.",
        "input_schema": {"type": "object", "properties": {"query": {"type": "string"}}, "required": ["query"]},
    },
    {
        "name": "list_open_invoices",
        "description": "List open (unpaid) invoices for a client in QBO. Returns invoice number, amount, age.",
        "input_schema": {"type": "object", "properties": {"client_code": {"type": "string"}}, "required": ["client_code"]},
    },
    # ... more tools as needed
]

async def handle_message(update, context):
    question = update.message.text
    user = update.message.from_user.username

    if not is_authorized(user):
        await update.message.reply_text("Sorry, this bot is only available to BH staff.")
        return

    # Multi-turn agent loop
    messages = [{"role": "user", "content": question}]
    while True:
        resp = client.messages.create(
            model="claude-opus-4-7",
            max_tokens=1500,
            tools=tools,
            messages=messages,
            system="You're BH Assistant. Help BH staff find info from Monday, Dropbox, and QBO. Be concise. If you don't know, say so honestly.",
        )
        if resp.stop_reason == "end_turn":
            await update.message.reply_text(resp.content[0].text)
            return
        # Otherwise, Claude wants to use a tool
        for block in resp.content:
            if block.type == "tool_use":
                result = run_tool(block.name, block.input)
                messages.append({"role": "assistant", "content": resp.content})
                messages.append({"role": "user", "content": [{"type": "tool_result", "tool_use_id": block.id, "content": result}]})

def main():
    app = Application.builder().token(os.environ["BH_BOT_TOKEN"]).build()
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    app.run_polling()

if __name__ == "__main__":
    main()
\`\`\`

That's the skeleton. The real work is in the \`run_tool\` function — wiring each integration.`,
    },
    {
      title: "Start with ONE integration: Monday board search",
      body: `Pick the highest-value first integration. Usually Monday — "what's the status of the TKI close" is the most-asked question.

Implement \`search_monday(query)\`:
1. Call Monday GraphQL API for items matching the query string across the boards you care about
2. Return a clean list: item name, board name, status, assignee, last updated

Test it directly first. Then wire it into the bot. DM the bot "status of TKI close" — get an answer.`,
    },
    {
      title: "Add authentication so only BH staff can use it",
      body: `Inside \`is_authorized(user)\`, check against a whitelist of Telegram usernames. Store the whitelist in a file or environment variable.

For sensitive queries (anything touching QBO), add a second check — only specific roles get those tools available.`,
      callout: {
        variant: "warning",
        body: "Without auth, anyone who finds the bot username can DM it and access internal data. Lock this down on day 1.",
      },
    },
    {
      title: "Deploy on an always-on machine",
      body: `Options:
- **EC2 / DigitalOcean droplet:** ~$5/mo, runs forever, easy SSH access
- **Anthropic Managed Agents:** if available in your plan, hosts the bot for you
- **Internal server:** if BH has an always-on machine

Set up systemd (or pm2) so the bot auto-restarts on crash. Pipe logs to a file so you can debug.`,
    },
    {
      title: "Add tools incrementally",
      body: `Don't try to wire every integration on day 1. Order of impact:

1. **Monday search** (week 1)
2. **Dropbox semantic search** (week 2-3, after the indexer is up)
3. **QBO open-invoices query** (week 4)
4. **Calendar / meeting status** (week 5)

Each new tool gets tested independently first, then wired into the bot.`,
    },
    {
      title: "Daily digest as bonus output",
      body: `Once the bot can query Monday + QBO, add a daily morning broadcast:

\`\`\`python
# every morning at 8am
def morning_digest():
    overdue = qbo_overdue_invoices_total()
    pending_monday = monday_items_due_today()
    msg = claude_summarize(overdue, pending_monday)
    bot.send_message(BH_CHANNEL_ID, msg)
\`\`\`

Posts a 1-paragraph "here's what's hot today" to the team channel. Free per-day value once the bot exists.`,
    },
  ],
  pitfalls: [
    "Building all integrations at once. One at a time. Test each. Wire each.",
    "Skipping authentication. The bot has access to internal data — secure it.",
    "Letting Claude hallucinate when the data isn't there. Add 'if you don't know, say so honestly' to the system prompt and verify in testing.",
    "Forgetting log retention. When something goes wrong, you'll want the last 30 days of bot conversations.",
  ],
  relatedTutorialSlugs: [
    "dropbox-semantic-search",
    "smart-compliance-reminders",
    "monday-safe-automation",
  ],
};

export const smartComplianceReminders: Tutorial = {
  slug: "smart-compliance-reminders",
  title: "Smart compliance reminders with Claude + Monday",
  subtitle:
    "Stop hearing 'X is due in 5 days' for things that are already in motion. Get reminders with context.",
  emoji: "⏰",
  format: "Script",
  difficulty: "Intermediate",
  timeEstimate: "2 hours setup, ongoing maintenance ~30 min/month",
  audienceRoleIds: [
    "paralegal",
    "accounting-lead",
    "admin-manager",
    "legal-ops-director",
  ],
  themeIds: ["compliance-reminders"],
  toolIds: ["monday", "telegram"],
  aiTools: ["Claude API"],
  prerequisites: [
    "Monday board with your compliance calendar (recurring obligations: GA sales tax, hotel/motel tax, 1099s, payroll filings, ILIT premiums, Crummey letters, etc.)",
    "Monday API token",
    "Telegram bot (see telegram-bot-bh tutorial) OR willingness to receive reminders via email",
  ],
  whenToUse:
    "When you're getting reminded about deadlines but the reminders don't know whether the prerequisites are done. The Paralegal asked for 'more advanced automated reminders' — this is that.",
  steps: [
    {
      title: "Make sure your compliance calendar is in Monday",
      body: `One Monday board, one row per recurring obligation. Columns:
- Obligation name (e.g., "GA Sales Tax Filing")
- Frequency (monthly / quarterly / annual)
- Next due date
- Owner
- Status (Not Started / In Progress / Submitted)
- Prerequisites (free-text or relations to other items — e.g., "Prior month JE posted")

This is your source of truth. The smart-reminder script reads from here.`,
    },
    {
      title: "The 'smart' part: prerequisite-aware reminders",
      body: `Standard dumb reminder: *"GA Sales Tax due in 5 days."*

Smart reminder: *"GA Sales Tax due in 5 days. Prerequisite check: prior-month JE has NOT been posted yet — close that first."*

The script does this by querying Monday for the obligation + checking the prerequisite status before composing the reminder.`,
    },
    {
      title: "The script (daily cron)",
      body: `\`\`\`python
# smart_reminders.py
from datetime import date, timedelta
from monday_api import get_compliance_items
from telegram_api import post_message
import anthropic

client = anthropic.Anthropic()

def main():
    items = get_compliance_items()
    upcoming = [i for i in items if i.due_date <= date.today() + timedelta(days=14) and i.status != "Submitted"]

    if not upcoming:
        return

    msg = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=800,
        messages=[{"role": "user", "content": f"Items: {upcoming}"}],
        system="""You produce daily compliance reminders. For each upcoming obligation, format:

[ICON] [obligation name] — due in [N] days ([date])
  ↳ Status: [current status]
  ↳ Prerequisites: [done / NOT DONE — what's missing]
  ↳ Owner: [name]

Use 🔴 if overdue, 🟡 if <3 days, 🟢 if 4-14 days.
Group by urgency.
Add a one-line summary at the top: "X obligations need attention this week."
Don't pad. Don't say 'good morning.' Just the info."""
    )
    post_message(msg.content[0].text)

if __name__ == "__main__":
    main()
\`\`\`

Run via cron each weekday morning at 7am. Output posts to a Telegram channel everyone follows.`,
    },
    {
      title: "Make prerequisite checks real",
      body: `For the script to know "prior-month JE NOT posted yet," it needs to actually check. Two options:

**Simple:** add a "prerequisite met?" checkbox column to the Monday compliance board. Owner updates manually when the prerequisite is done.

**Automated:** the script also queries QBO (via API or the MCP) to check "are there any unposted JEs for last month?" and updates the prerequisite status itself.

Start simple. Graduate to automated when you trust the pattern.`,
    },
    {
      title: "Add the 'nothing-to-do' day messaging",
      body: `On days where nothing's due in 14 days and nothing's at risk, post a quick "✅ Compliance is clear for the next 2 weeks" instead of silence.

Silence makes people wonder if the bot died. Affirmative "we're good" messages keep trust.`,
    },
    {
      title: "Add escalation",
      body: `If an obligation hits "due tomorrow" and status is still "Not Started," the script DMs the owner directly (not just the channel) with: *"Hey — GA Sales Tax is due tomorrow and you haven't started. Anything blocking you?"*

This is the layer that prevents missed deadlines, not just predicts them.`,
    },
  ],
  pitfalls: [
    "Sending so many reminders that they get ignored. Daily is the right cadence; hourly is noise.",
    "Forgetting to mark items 'Submitted' in Monday. The bot will keep nagging. Train the team.",
    "Building auto-prerequisite-checks before manual ones are proven. Get the human-updated version working first.",
  ],
  relatedTutorialSlugs: ["telegram-bot-bh", "monday-safe-automation"],
};

export const commsTutorials = [
  teamsActionItems,
  telegramBotBh,
  smartComplianceReminders,
];
