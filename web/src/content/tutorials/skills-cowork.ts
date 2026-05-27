import type { Tutorial } from "../types";

// ─────────────────────────────────────────────────────────────────────────
// FOUNDATIONAL — what Skills and Cowork actually are
// ─────────────────────────────────────────────────────────────────────────

export const claudeSkills101: Tutorial = {
  slug: "claude-skills-101",
  title: "Claude Skills 101 — what they are and how to build one",
  subtitle:
    "Stop pasting the same long instructions into every chat. Bundle them into a Skill that Claude picks up automatically.",
  emoji: "🎓",
  format: "Skill",
  difficulty: "Beginner",
  timeEstimate: "15 min to read + build your first one",
  audienceRoleIds: [
    "tax-lead",
    "client-resource-specialist",
    "accounting-lead",
    "admin-manager",
    "paralegal",
    "legal-ops-director",
    "strategy-lead",
    "financial-advisor",
  ],
  themeIds: ["email-triage"],
  toolIds: [],
  aiTools: ["Claude.ai (Skills feature)"],
  prerequisites: [
    "A Claude.ai account (Skills is available on Pro / Team / Enterprise plans)",
    "A repeating task where you find yourself re-typing the same context every time",
  ],
  whenToUse:
    "When you've noticed yourself pasting the same 'here's how I want this done' block into Claude more than 3 times. That's a Skill waiting to be born.",
  whenNotToUse:
    "For one-off tasks. A Skill is overhead for a single use. Build a Skill when there's repetition.",
  steps: [
    {
      title: "What a Skill actually is",
      body: `A **Skill** is a small, named bundle of instructions Claude can apply automatically when the task matches. Think of it as a saved playbook:

- A **name** (e.g. "Brookhaven email voice")
- A **description** — the trigger sentence Claude reads to decide whether to pick the skill up
- A **body** — the detailed instructions Claude follows when the skill activates
- Optional **reference files** — examples, templates, glossaries

Unlike Project knowledge (which is scoped to one Project), a Skill is reusable across **every** Claude.ai chat and Project. Build it once; the whole team can use it.`,
      callout: {
        variant: "info",
        body: "The description is the magic. Claude reads it and decides 'this matches what the user just asked' — then applies the body. So the description should describe the JOB, not the skill's name.",
      },
    },
    {
      title: "When a Skill beats a Project or a raw prompt",
      body: `Quick decision guide:

- **Raw prompt** — one-off question, no setup
- **Project** — repeated work in one specific area, with shared files/knowledge (e.g. "every email to client X")
- **Skill** — a STYLE or PATTERN that applies across many contexts (e.g. "anytime you draft for Brookhaven, use this voice")

If the same instructions apply to 5+ different chats, it's probably a Skill.`,
    },
    {
      title: "Open Claude.ai → Skills → New Skill",
      body: `In Claude.ai, look for **Skills** in the left sidebar or under your profile settings. (The exact location moves around as Claude.ai evolves; if you can't find it, search "skills" in the app's settings.)

Click **+ New Skill**.`,
    },
    {
      title: "Write the description carefully — it's the trigger",
      body: `The description is what Claude reads to decide if this skill matches the current task. Be **specific about the situation**, not the skill's mechanics.

❌ Bad: *"A skill for writing emails."* (too broad — Claude can't tell when this applies)
✅ Good: *"Apply when drafting any external Brookhaven email to a client, vendor, or referral partner — covers AR follow-ups, status updates, document requests, and routine correspondence."*

Better descriptions = better automatic triggering. Mention specific scenarios.`,
    },
    {
      title: "Write the body — what Claude should actually do",
      body: `The body is the instructions. Use the template below — adapted to your situation. The key sections:`,
      prompt: `# [Skill name]

Apply this skill when [the trigger condition from your description].

## Context
[1-2 sentences explaining the situation Claude is in when this skill activates.]

## Your job
[Bullet list of what Claude should produce / do.]

## Rules
- [Specific rule about format]
- [Specific rule about tone]
- [Specific rule about what NOT to do]

## Output format
[Exact shape of the response — be specific. "Markdown table with columns X, Y, Z" beats "a nice summary."]

## When uncertain
[How Claude should behave when missing info. Ask? Make assumptions? Flag?]`,
    },
    {
      title: "Test the skill on 5 realistic tasks",
      body: `**Do not share the skill until you've tested it 5 times.** This is the most-skipped step and the #1 cause of bad Skills.

Start a fresh chat (no project, no extra context). Type a task that should match your skill's description. Did Claude apply the skill? Did the output match what you wanted?

If yes: great. Test 4 more variations.
If no: edit the body, re-test. Iterate.`,
      callout: {
        variant: "warning",
        body: "If Claude doesn't apply the skill automatically, your description doesn't match the user's natural phrasing of the task. Rewrite the description to mention the WORDS people actually use.",
      },
    },
    {
      title: "Share with the team",
      body: `On Claude Team / Enterprise plans, you can share a Skill with the whole workspace. Settings → Skills → your skill → Share.

Then post a quick Telegram note: *"New shared skill called 'X' — applies automatically when you're doing Y. Try it next time you do that."*

Include a 2-line example of when the skill kicks in.`,
    },
    {
      title: "The 'review and refine' habit",
      body: `Set a quarterly calendar reminder: open each shared Skill, run it against 5 fresh real-world tasks, see if it still produces the right output. Update the body if standards have drifted.

Skills decay quietly. Refresh them on a cadence.`,
    },
  ],
  pitfalls: [
    "Writing a vague description like 'a skill for writing.' Claude can't tell when to apply it. Be specific about the SITUATION.",
    "Skipping the 5-test step. Don't ship until you've proved it triggers reliably and produces good output.",
    "Putting voice/tone instructions in every Project instead of building one shared 'voice' skill once. The whole point of Skills is reuse.",
    "Treating Skills as set-and-forget. They need quarterly review like any other internal documentation.",
  ],
  relatedTutorialSlugs: [
    "claude-skill-bh-voice",
    "skill-daily-briefing",
    "skill-meeting-prep",
    "claude-cowork-101",
  ],
};

export const claudeCowork101: Tutorial = {
  slug: "claude-cowork-101",
  title: "Claude Cowork 101 — connecting Claude to your work tools",
  subtitle:
    "Skills tell Claude HOW to think. Cowork connectors give it access to the systems you actually work in.",
  emoji: "🔌",
  format: "Cowork",
  difficulty: "Beginner",
  timeEstimate: "20 min to set up your first connector",
  audienceRoleIds: [
    "tax-lead",
    "accounting-lead",
    "admin-manager",
    "legal-ops-director",
    "strategy-lead",
    "financial-advisor",
    "client-resource-specialist",
    "paralegal",
  ],
  themeIds: ["cross-entity-comms"],
  toolIds: ["outlook", "dropbox", "monday", "qbo", "telegram", "teams"],
  aiTools: ["Claude.ai (Connectors)", "Claude Cowork"],
  prerequisites: [
    "A Claude.ai account (connectors are available on Pro / Team / Enterprise; some require specific plans)",
    "Admin access to whatever tool you want to connect (or admin willing to authorize)",
    "Clear sense of WHAT you want Claude to read or write to that tool",
  ],
  whenToUse:
    "When the question you keep asking Claude is 'can you check QBO?' / 'can you read my inbox?' / 'pull the Monday board' — connectors let Claude actually do that instead of you copy-pasting.",
  whenNotToUse:
    "For tasks where the data is small enough to paste into a chat. Don't add a connector just to make a single doc accessible — just paste it.",
  steps: [
    {
      title: "What 'Cowork' actually means",
      body: `**Cowork** is the umbrella term we'll use for Claude's connectors — the integrations that let Claude read from (and sometimes write to) external systems like Outlook, QuickBooks Online, Dropbox, Monday, Telegram, Microsoft Teams, and so on.

Each connector is built on **MCP (Model Context Protocol)** — Anthropic's open standard for AI ↔ tool integration. You don't need to know how MCP works under the hood; you just need to know that:

1. Connectors are installed once per Claude account
2. Once installed, Claude can use them automatically when the task calls for it
3. Each connector defines specific "tools" — things like \`search_dropbox\` or \`get_qbo_balance_sheet\``,
    },
    {
      title: "Find Connectors in Claude.ai",
      body: `In Claude.ai → **Settings** → look for **Connectors** (sometimes "Integrations" or "Tools" depending on the version).

You'll see a list of available connectors — both official Anthropic ones and third-party ones from the MCP ecosystem. The catalog grows constantly.

Common ones we care about at Brookhaven:
- **QuickBooks Online** (Anthropic official)
- **Microsoft 365** (covers Outlook, Calendar)
- **Dropbox**
- **Monday.com**
- **Telegram** (community / build-your-own)`,
    },
    {
      title: "Install your first connector",
      body: `Pick the one with the highest payoff — for most BH workflows, that's **QuickBooks Online**. Click **Connect** → you'll be redirected to QBO's OAuth screen → log in → authorize Claude → redirected back.

When you return to Claude.ai, the connector shows as **Active**.

Test it in a fresh chat:`,
      prompt: `Pull the AR aging summary for this company. Group by customer, sort by total balance descending.`,
    },
    {
      title: "Understand what each connector can DO",
      body: `Every connector exposes a set of "tools" — specific actions Claude can take. For example, the QBO connector exposes ~40+ tools including:

- Read: \`get_balance_sheet\`, \`get_ap_aging_detail\`, \`get_ar_aging_summary\`, \`get_sales_by_customer_summary\`
- Write: \`create_invoice\`, \`update_invoice\`, \`send_payment_link\`
- Search: \`search_customer\`, \`search_products\`

Claude picks the right tool automatically based on your request. You don't call them by name — you just describe the task.

If you want to see what a connector can do, ask Claude: *"What can you do with the QBO connector?"* It'll list its tools.`,
      callout: {
        variant: "info",
        body: "Each connector documents itself. When in doubt, ask Claude what it can do with a connected tool — saves you reading API docs.",
      },
    },
    {
      title: "Read-only vs read-write",
      body: `Every connector has **scopes** — read-only vs read-write. When you authorize, you're granting Claude permissions to do certain actions.

**Strong recommendation for first 30 days:** **authorize read-only first**, prove it's useful, then upgrade to write access if you need it. This is how the Legal Ops Director's "don't over-automate" principle applies to connectors.

Many connectors let you re-authorize at any time to expand scopes.`,
      callout: {
        variant: "warning",
        body: "A connector with write access can MODIFY data in your tool. Treat it like a junior team member with the same access — useful but not unsupervised.",
      },
    },
    {
      title: "The 'one connector per chat' practical limit",
      body: `In practice, Claude works best when one chat focuses on one tool at a time. If you've authorized 5 connectors, all 5 are AVAILABLE — but Claude will tend to use one per task unless you explicitly ask it to combine them.

If you want to do something like "pull AR from QBO, then draft follow-ups in Outlook," tell Claude that explicitly. It'll bridge the two connectors.

Per-tool sequential workflows are usually faster than trying to make Claude juggle 5 systems in one breath.`,
    },
    {
      title: "Combine Cowork with Skills for maximum leverage",
      body: `Skills + Cowork is the killer combo. Pattern:

- Build a **Skill** that captures HOW you handle a workflow (e.g. "AR follow-up drafting with the Brookhaven voice")
- Use a **Cowork connector** to pull the data the skill operates on (e.g. QBO aging report)

The skill provides the playbook; the connector provides the data. Together they automate end-to-end tasks while you stay in the loop on output.`,
    },
    {
      title: "Audit your connectors quarterly",
      body: `Calendar reminder: every quarter, open Settings → Connectors and review:

- Which connectors are still in use?
- Do any have wider permissions than they need? (read-write that could be read-only?)
- Have any been replaced by newer/better ones?

Revoke what you don't use. Tighten what's too permissive.`,
    },
  ],
  pitfalls: [
    "Authorizing read-write on day one. Start read-only. Upgrade after you've proven the value.",
    "Authorizing every available connector at once. The clutter makes Claude slower and less focused. Add them as you need them.",
    "Forgetting that connectors persist across chats. If you authorized QBO last week, it's still on. Audit periodically.",
    "Treating connectors as fully autonomous. A connector with write access acting on bad reasoning can do real damage. Keep human approval on anything client-facing.",
  ],
  relatedTutorialSlugs: [
    "claude-skills-101",
    "cowork-outlook-eod-digest",
    "cowork-monday-standup",
    "qbo-bill-anomaly",
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// SKILL EXAMPLES — small, copy-pasteable, real-world useful
// ─────────────────────────────────────────────────────────────────────────

export const skillDailyBriefing: Tutorial = {
  slug: "skill-daily-briefing",
  title: "Build a 'Morning briefing' Skill",
  subtitle:
    "Open Claude, say 'brief me,' get a 60-second rundown of what's hot today. The simplest useful Skill you'll build.",
  emoji: "☀️",
  format: "Skill",
  difficulty: "Beginner",
  timeEstimate: "10 min to build, 60 seconds to use each morning",
  audienceRoleIds: [
    "tax-lead",
    "accounting-lead",
    "admin-manager",
    "client-resource-specialist",
    "legal-ops-director",
    "strategy-lead",
    "financial-advisor",
    "paralegal",
  ],
  themeIds: ["compliance-reminders", "cross-entity-comms"],
  toolIds: ["telegram"],
  aiTools: ["Claude.ai (Skills)"],
  prerequisites: [
    "You've read the Claude Skills 101 tutorial",
    "A Claude.ai account on a plan that supports Skills",
    "5 minutes to think about what 'morning briefing' actually means for YOUR role",
  ],
  whenToUse:
    "Every morning, as you sit down at your desk. Replaces the 'where do I start today?' scroll through Telegram + email + Monday + calendar.",
  whenNotToUse:
    "When you already know exactly what you're working on and don't need a contextual reset.",
  steps: [
    {
      title: "Decide what your briefing should contain",
      body: `Before building the skill, write down what a perfect 60-second briefing would tell you. Different roles need different things.

**Tax Lead:**
- Returns due this week
- Client docs received yesterday
- Anything urgent from leadership

**Accounting Lead:**
- Bill pay queue status
- Anything past due in AR
- Monthly close calendar — where are we?

**Paralegal:**
- Task board status
- Filing deadlines in the next 14 days
- Anything that came in over email needing action`,
    },
    {
      title: "Open Claude.ai → Skills → New Skill",
      body: `Name: \`Morning briefing for [your role]\`

Description: \`Apply when the user asks for a daily briefing, morning rundown, "what's on my plate," "where do I start today," or similar variations. Produces a focused 60-second rundown of today's priorities.\``,
      callout: {
        variant: "tip",
        body: "Note how the description lists every NATURAL way someone might ask. The more phrasings you list, the more reliably Claude triggers the skill.",
      },
    },
    {
      title: "Write the skill body",
      body: `Paste this template — adapt the sections for your role:`,
      prompt: `# Morning briefing

Apply when the user asks for their morning briefing, daily rundown, "what's on my plate," or any variation thereof.

## Your job

Produce a 60-second briefing — short, scannable, prioritized. The user is sitting at their desk with coffee. They don't want a wall of text.

## Output format

Use this exact structure (in markdown):

### 🎯 Today's priorities
- [Bullet] — [1 sentence] — [Why it matters]
(3-5 items max)

### ⏰ Time-sensitive
[Anything due TODAY or already late. If nothing, write "Nothing today."]

### 📥 New since yesterday
[1-2 lines on anything that arrived overnight worth knowing — email, Telegram, Monday changes.]

### 💭 Heads-up for later this week
[1-2 items the user should be thinking about even if not acting today.]

## Rules

- Keep the whole briefing under 200 words.
- Lead with the most important thing.
- If there's nothing in a section, say "Nothing today" rather than padding.
- No greeting, no "good morning" preamble. The user clicked "brief me," skip the small talk.

## When the user hasn't told me what's going on

The user will paste in their actual data — calendar items, Telegram backlog, Monday tasks, inbox highlights. If they ask for a briefing without giving you anything to work with, ask them ONE focused question: "Paste in today's calendar + anything you noticed in the inbox since yesterday."`,
    },
    {
      title: "Add concrete examples to Skill reference files",
      body: `Most Skills get sharper with examples. In the Skill, attach 2-3 examples of "perfect" briefings for your role. Something like:

\`\`\`
SAMPLE BRIEFING:

### 🎯 Today's priorities
- BrightPoint Q1 return — needs final review and Lisa signoff before Friday
- TKI bill pay batch — 14 recurring bills, 1 anomaly flagged for review
- Trinity invoice — Crystal asked for status by EOD

### ⏰ Time-sensitive
- GA sales tax filing due Friday (3 days)

### 📥 New since yesterday
- Hartwell sent revised 1099 batch — needs cross-check before posting
- Crystal flagged the ILIT board issue in #legal

### 💭 Heads-up for later this week
- Lisa back Wed — finalize TKI fee schedule
- New AMEX statement drops Thursday
\`\`\`

Attaching examples teaches Claude the EXACT voice and density you want.`,
    },
    {
      title: "Test it five mornings in a row",
      body: `Each morning, open Claude, paste your morning context (calendar, Telegram highlights, Monday status), and say "brief me."

Look at the output. Did it surface the right priorities? Was the length right? Was the tone right?

Tweak the skill body after each session. After 5 mornings, it should feel like a focused colleague who knows your job.`,
      callout: {
        variant: "tip",
        body: "Don't expect the first version to nail it. The skill gets sharper as you iterate against real mornings.",
      },
    },
    {
      title: "Bonus: pair with a Telegram bot for fully automated delivery",
      body: `Once the skill is reliable, automate the data-gathering step too. A tiny Python script (see the "Build a Brookhaven Telegram bot" tutorial) can:

1. Pull this morning's calendar, Monday status, and Telegram highlights
2. Feed them to Claude with this skill active
3. Post the briefing to your personal Telegram

You go from "open Claude and paste" to "check Telegram at 8am, briefing already waiting." Same skill body — just removes the manual data step.`,
    },
  ],
  pitfalls: [
    "Letting the briefing get too long. Hard cap at 200 words; longer briefings get skipped.",
    "Building one shared 'BH morning briefing' skill across all roles. Roles have different priorities — build one per role group.",
    "Not feeding the skill any context and expecting magic. Skills don't read your inbox unless paired with a Cowork connector. Paste the data or wire up the connector.",
  ],
  relatedTutorialSlugs: [
    "claude-skills-101",
    "skill-deadline-watcher",
    "telegram-bot-bh",
    "cowork-monday-standup",
  ],
};

export const skillMeetingPrep: Tutorial = {
  slug: "skill-meeting-prep",
  title: "Build a 'Pre-meeting prep' Skill",
  subtitle:
    "Walk into every meeting with the context, the agenda, and the open questions already organized.",
  emoji: "📋",
  format: "Skill",
  difficulty: "Beginner",
  timeEstimate: "15 min to build, 3 min per meeting after",
  audienceRoleIds: [
    "strategy-lead",
    "legal-ops-director",
    "financial-advisor",
    "tax-lead",
    "accounting-lead",
  ],
  themeIds: ["cross-entity-comms"],
  toolIds: ["teams"],
  aiTools: ["Claude.ai (Skills)"],
  prerequisites: [
    "You've read Claude Skills 101",
    "Access to the calendar invite, prior meeting notes, and relevant Monday items for the meeting",
  ],
  whenToUse:
    "5 minutes before any internal meeting where you want to show up prepared. Especially useful for status meetings, ops huddles, and 1:1s with people you don't sync with often.",
  whenNotToUse:
    "Standing daily meetings where everyone already knows the agenda. The overhead isn't worth it for routine recurring meetings.",
  steps: [
    {
      title: "What makes a great meeting prep",
      body: `A useful pre-meeting brief covers:

1. **Who's in the meeting** and what they care about
2. **What's the actual purpose** (not just the calendar title)
3. **What got discussed last time** and what was promised
4. **What I need to bring** — questions to ask, decisions to make, things to share
5. **Anti-patterns to avoid** — topics that get circular, things this group disagrees on

The first three are pulled from data. The last two are judgment. The Skill helps with both.`,
    },
    {
      title: "Open Claude.ai → Skills → New Skill",
      body: `Name: \`Pre-meeting prep\`

Description: \`Apply when the user is preparing for a meeting and pastes in: calendar invite details, prior meeting notes, related Monday tasks, and/or relevant emails. Produces a focused brief covering attendees, purpose, prior commitments, and the user's specific role in the upcoming meeting.\``,
    },
    {
      title: "Write the skill body",
      body: `Paste this:`,
      prompt: `# Pre-meeting prep

Apply when the user is preparing for an upcoming meeting and shares calendar details, prior notes, Monday items, or related context.

## Your job

Produce a focused brief that answers four questions in order:

### 1. What is this meeting actually about?

Not just the calendar title. The REAL purpose. Look at:
- The attendee list (who's there tells you what kind of meeting it is)
- The agenda (if present)
- The pattern of prior meetings with these people

One short paragraph.

### 2. What got promised at the last meeting?

Pull from prior notes if available. List specifically:
- Open action items the user owes someone
- Open action items someone owes the user
- Decisions that were tabled "until next time"

Use this format:
| Owner | Promise | Status |

### 3. What should the user bring?

3-5 bullets. Could include:
- Questions to ask (specific, not "any updates?")
- Information to share (data, decisions, status)
- Decisions to push for
- Topics to explicitly raise

### 4. Anti-patterns to watch

What tends to go wrong in this kind of meeting with these people? 2-3 sentences. If you don't have enough context to know, skip this section.

## Rules

- Keep the whole brief under 300 words.
- If a section has no content, write "(nothing here)" rather than padding.
- Don't repeat the calendar invite back to the user — they already read it.
- Be specific. "Ask about the Q3 numbers" beats "discuss financials."

## When context is missing

If the user pastes only the calendar invite without prior notes, produce the brief based on what's available and explicitly call out: "Prior context not provided — I can't tell you what was promised last time." Don't guess.`,
    },
    {
      title: "Build a 'meeting context dossier' habit",
      body: `For the Skill to do its best work, it needs context. Build the habit:

Before any important meeting, copy-paste into Claude:
1. The calendar invite (title, time, attendees, agenda)
2. The last meeting's notes (if you have them)
3. Any related Monday items
4. Any recent emails with the attendees about the topic

Then ask Claude for the meeting prep. The Skill triggers automatically.`,
      callout: {
        variant: "tip",
        body: "5 minutes of context collection + 30 seconds of Claude = walking into the meeting more prepared than anyone else in the room.",
      },
    },
    {
      title: "Iterate per meeting type",
      body: `Different meetings need different prep. Consider building variant skills:

- *"Pre-client-meeting prep"* — emphasizes relationship history, prior asks, fee context
- *"Pre-leadership meeting prep"* — emphasizes data you'll be asked for, decisions to push
- *"Pre-team-1-on-1 prep"* — emphasizes development conversations, blockers, follow-ups owed

You can have multiple variant Skills as long as each has a distinct description so Claude triggers the right one.`,
    },
    {
      title: "Use the brief to focus the actual meeting",
      body: `The output isn't just for YOU — it's a thinking aid. Bring the bullets into the meeting. Use them to:
- Ask the specific questions you flagged
- Surface unresolved action items if no one else does
- Keep the conversation focused on what actually matters

Pair this with the *"Teams transcript → action items"* tutorial. Pre-brief in; structured digest out.`,
    },
  ],
  pitfalls: [
    "Building the skill but never feeding it context. The skill is only as good as the data you paste in.",
    "Treating the brief as the whole strategy. It's a thinking aid, not your meeting plan.",
    "Using the same prep skill for routine 1:1s. Reserve it for higher-stakes or less frequent meetings.",
  ],
  relatedTutorialSlugs: [
    "claude-skills-101",
    "teams-action-items",
    "skill-daily-briefing",
  ],
};

export const skillDeadlineWatcher: Tutorial = {
  slug: "skill-deadline-watcher",
  title: "Build a 'What's at risk this week' Skill",
  subtitle:
    "Beyond dumb due-date reminders — a skill that pressure-tests your week and flags what's actually going to slip.",
  emoji: "🔭",
  format: "Skill",
  difficulty: "Intermediate",
  timeEstimate: "20 min to build, 2 min to use weekly",
  audienceRoleIds: [
    "paralegal",
    "admin-manager",
    "accounting-lead",
    "legal-ops-director",
  ],
  themeIds: ["compliance-reminders"],
  toolIds: ["monday"],
  aiTools: ["Claude.ai (Skills)"],
  prerequisites: [
    "Claude Skills 101 read",
    "A Monday board (or similar) where you track recurring obligations and deadlines",
  ],
  whenToUse:
    "Every Friday afternoon, or Monday morning. Replaces the dumb 'X is due on the 15th' reminder with smart 'X is due on the 15th and the prerequisite isn't done yet.'",
  steps: [
    {
      title: "Why this beats Monday's built-in reminders",
      body: `Monday will reliably tell you "this task is due Friday." It doesn't tell you "this task is due Friday AND the thing it depends on hasn't started yet."

A deadline-watcher Skill takes your weekly compliance / task data and applies judgment: which deadlines are realistic vs at-risk vs already silently slipping.

This is the Paralegal's "more advanced automated reminders" — context-aware nudging, not date-based shouting.`,
    },
    {
      title: "Define what 'at risk' means for your work",
      body: `Different work has different risk signals. Examples:

**For tax filings:** Risk = the JE that has to be posted first isn't done.
**For ILIT premium notices:** Risk = the trustee hasn't approved the funding source yet.
**For trustee letters:** Risk = the underlying valuation isn't finalized.
**For invoicing:** Risk = the time records aren't reconciled.

Each risk is "deadline + missing prerequisite." Write down the 5-10 most common risk patterns for your work.`,
    },
    {
      title: "Open Claude.ai → Skills → New Skill",
      body: `Name: \`Weekly risk scan\`

Description: \`Apply when the user pastes in their compliance calendar, recurring task list, or weekly board and asks: "what's at risk this week," "what should I worry about," "anything slipping," or similar. Produces a triaged list of deadlines categorized by actual risk, not just date proximity.\``,
    },
    {
      title: "Write the skill body",
      body: `Paste this:`,
      prompt: `# Weekly risk scan

Apply when the user shares their compliance / deadline list and asks what's at risk.

## Your job

Take the user's deadline list. For each item due in the next 14 days, classify by ACTUAL risk:

- 🔴 **AT RISK** — deadline approaching AND a prerequisite is incomplete OR there's a pattern suggesting this kind of item runs late
- 🟡 **WATCH** — deadline approaching, prerequisites done, but not yet started or assigned
- 🟢 **ON TRACK** — deadline approaching, prerequisites met, work is in progress
- ✅ **DONE** — deadline approaching but the work is already complete

## Output format

### Summary line
"X items need attention this week. Y are at active risk."

### 🔴 At risk
For each item:
- **[Item name]** — due [date]
  - Why at risk: [1 sentence]
  - What unblocks it: [1 sentence — specific action, not "follow up"]
  - Who owns the unblock: [name if available, else "unowned"]

### 🟡 Watch
Brief bullets. Less detail than 🔴 items.

### 🟢 On track / ✅ Done
Just count and list. No detail needed.

## Rules

- Order each section by deadline ascending.
- If you don't know whether a prerequisite is done, mark the item 🟡 and ASK the user about the specific prerequisite — don't guess green.
- The "what unblocks it" sentence must be SPECIFIC. ❌ "Follow up with Lisa" → ✅ "Need Lisa's signoff on the Q3 fee schedule before invoicing can run."
- Don't repeat the input list back. Only flag the items that need attention.

## When the user hasn't given enough context

If the user pastes a calendar with no prerequisite info, do the scan based on dates only — but explicitly say at the top: "I'm classifying by date alone — for proper risk-aware ranking, share status on the prerequisites for each item." Then list specific prerequisites you'd want.`,
    },
    {
      title: "Friday afternoon ritual",
      body: `Every Friday at 4pm (set a recurring calendar block):

1. Open Monday (or wherever your deadlines live)
2. Export / copy this week + next week's items + their statuses
3. Paste into Claude, ask "what's at risk this week"
4. Skill triggers, produces the triaged list
5. For each 🔴, take ONE action right then — message the owner, schedule the unblocking work, escalate

10-minute ritual. Catches slips before they happen.`,
      callout: {
        variant: "tip",
        body: "The friday ritual matters more than the skill body. A perfect skill nobody runs is worse than a mediocre skill someone runs reliably.",
      },
    },
    {
      title: "Pair with the Monday connector",
      body: `Once you've proven the skill, pair it with the Monday connector (see Cowork 101) so Claude can pull the data itself rather than you exporting it. Workflow becomes:

> "Pull the compliance board, run my weekly risk scan."

Claude reads Monday, applies the skill, produces the triaged list. ~30 seconds, no copy-paste.`,
    },
  ],
  pitfalls: [
    "Running this weekly but never acting on the 🔴 items. The scan only matters if you take the unblock action right then.",
    "Letting Claude guess green statuses. If you don't know a prerequisite is done, the skill should mark it 🟡 and ask.",
    "Building it once and never updating. Compliance work shifts — review the skill quarterly to add new risk patterns.",
  ],
  relatedTutorialSlugs: [
    "smart-compliance-reminders",
    "claude-skills-101",
    "skill-daily-briefing",
    "cowork-monday-standup",
  ],
};

export const skillClientContext: Tutorial = {
  slug: "skill-client-context",
  title: "Build a 'Client context loader' Skill",
  subtitle:
    "Stop re-explaining BrightPoint's situation every time you draft for them. Bundle the institutional knowledge into a Skill.",
  emoji: "🗂️",
  format: "Skill",
  difficulty: "Intermediate",
  timeEstimate: "30 min per client to build, lifetime use",
  audienceRoleIds: [
    "tax-lead",
    "accounting-lead",
    "client-resource-specialist",
    "legal-ops-director",
  ],
  themeIds: ["cross-entity-comms", "document-review"],
  toolIds: [],
  aiTools: ["Claude.ai (Skills)"],
  prerequisites: [
    "Claude Skills 101 read",
    "5-10 minutes per client to write down the 'institutional knowledge' you carry in your head",
  ],
  whenToUse:
    "For your top 5-10 highest-engagement clients. The clients you do work for weekly. The ones where 'what's the situation again?' steals real time at the start of every email/draft.",
  whenNotToUse:
    "For one-off clients or low-engagement accounts. The skill setup overhead is only worth it for clients you touch often.",
  steps: [
    {
      title: "The pain this solves",
      body: `From the survey: the Accounting Lead specifically called out that *"the nuance currently living in Lisa's head"* (collections guidance per client, fee context, relationship sensitivities) is unreferenceable. Same applies to every senior team member: their institutional knowledge about clients is in their head.

A Client Context Loader Skill makes that knowledge **structured and reusable** — anyone drafting for that client can pull it in automatically.`,
    },
    {
      title: "What goes in the skill",
      body: `For each major client, capture:

- **Engagement scope** — what we actually do for them
- **Primary contact** — name, role, communication style
- **Decision-makers** — who actually approves things on their side
- **Fee structure** — flat / hourly / retainer; what's billable vs included
- **Payment history** — pay on time? always late? what's "normal" for them?
- **Sensitive topics** — pricing, scope creep, family dynamics, specific people to handle carefully
- **Recent history** — last 3-6 months of significant events
- **Tone** — formal? casual? do they want detail or summaries?
- **Known landmines** — things that have gone wrong before, lessons learned`,
    },
    {
      title: "Open Claude.ai → Skills → New Skill",
      body: `One skill per major client (so the skills triggers on the specific client name). Or one combined skill that switches based on the client mentioned.

For BrightPoint, you'd create:

Name: \`BrightPoint client context\`

Description: \`Apply whenever the user is drafting communication, planning a meeting, or making decisions related to BrightPoint Capital. Provides full institutional context including engagement scope, contacts, fee structure, payment patterns, sensitive topics, recent history, and known landmines.\``,
    },
    {
      title: "Write the skill body",
      body: `Use this template — fill in the actual specifics for the client. Treat this as a private cheat-sheet only your team will see:`,
      prompt: `# [Client name] context

Apply whenever the user is working on anything related to [Client name] — drafting communications, planning meetings, making decisions, reviewing deliverables, or invoicing.

## Engagement scope
- What we do: [tax prep / monthly bookkeeping / trustee services / legal advice / etc.]
- Started: [year]
- Annual revenue from this client: [bucket — small / medium / large]

## Contacts
- **Primary:** [Name] — [role] — communicates in [email / phone / Telegram]
- **Decision-maker on their side:** [Name + relationship to primary]
- **Other people we work with:** [list]

## Fee structure
[How we bill — flat fees, hourly, retainer. What's included. What triggers additional fees.]

## Payment history
- Typical: [pays on time / 30-45 days late but reliable / sporadically late / etc.]
- Outstanding pattern: [anything currently in AR?]
- Collections guidance: [press at X days / hold collections / etc.]

## Sensitive topics
List things to handle carefully. Examples:
- Pricing — they pushed back on the last fee increase, soft touch needed
- [Other landmines]

## Recent history (last 6 months)
- [Date] — [significant event]
- [Date] — [significant event]
(Update this regularly.)

## Tone for client comms
[Casual / formal / detailed / brief. Any phrasings they like or hate.]

## Internal context — DO NOT include in client-facing output
[Anything that's true and useful for internal drafting but shouldn't leak. Personal context about the family, scope concerns, internal debates about the relationship.]

## When to ask before acting

For [client], escalate to [name] before:
- Quoting any new fee
- Sending invoices over $X
- Initiating collections
- Any communication on [specific topic]`,
    },
    {
      title: "Test the skill on a real task",
      body: `Open a fresh Claude chat. Type something realistic like:

> "Draft an email to BrightPoint about the Q1 statement we're sending tomorrow."

The skill should trigger (because you mentioned BrightPoint), pull in the context, and produce a draft that respects their tone, references the engagement scope, and avoids landmines.

If it doesn't trigger, the description didn't match the natural phrasing — refine it.`,
    },
    {
      title: "Share carefully — this is sensitive",
      body: `Client context skills contain real institutional knowledge — fee structures, collections guidance, sensitive notes. Treat the share permissions accordingly:

- **Share with the immediate team** that works with this client (Tax + Accounting + the client lead)
- **Don't share firmwide** by default
- **Quarterly review** — outdated context is worse than no context

If your Claude.ai plan supports per-skill access controls, use them.`,
      callout: {
        variant: "warning",
        body: "Client context skills may contain confidential information. Apply the same access discipline you would to a client file in Dropbox.",
      },
    },
    {
      title: "Update on a cadence",
      body: `Stale client context is worse than none — it'll lead drafts down wrong paths. Build a habit:

- After any significant client interaction, take 60 seconds to update the recent-history section
- Quarterly, review the whole skill — payment patterns, contacts, scope
- When a major change happens (new engagement, new contact, fee change), update immediately`,
    },
  ],
  pitfalls: [
    "Building one giant 'all clients' skill. Per-client skills with specific descriptions trigger more reliably.",
    "Letting the skill go stale. Outdated payment guidance is dangerous.",
    "Including too much detail. The skill is a cheat-sheet, not a full file. Keep it scannable.",
    "Sharing too widely. Client context contains sensitive operational knowledge.",
  ],
  relatedTutorialSlugs: [
    "claude-skills-101",
    "claude-skill-bh-voice",
    "cumulative-client-note",
    "qbo-ar-followup",
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// COWORK EXAMPLES — connector-driven workflows
// ─────────────────────────────────────────────────────────────────────────

export const coworkOutlookEodDigest: Tutorial = {
  slug: "cowork-outlook-eod-digest",
  title: "Cowork + Outlook: end-of-day inbox digest",
  subtitle:
    "At 5pm, get a Claude-generated summary of every email that mattered today and what you still owe people.",
  emoji: "🌅",
  format: "Cowork",
  difficulty: "Intermediate",
  timeEstimate: "30 min to set up, 90 seconds at EOD to review",
  audienceRoleIds: [
    "tax-lead",
    "admin-manager",
    "client-resource-specialist",
    "legal-ops-director",
  ],
  themeIds: ["email-triage", "cross-entity-comms"],
  toolIds: ["outlook"],
  aiTools: ["Claude.ai with Outlook / Microsoft 365 connector"],
  prerequisites: [
    "Claude.ai with a Microsoft 365 / Outlook connector authorized",
    "Cowork 101 read",
    "A clear sense of which inbox(es) you want covered (personal vs shared vs both)",
  ],
  whenToUse:
    "Daily EOD. Replaces 'scroll back through inbox to figure out what I missed' with 'Claude already knows.'",
  whenNotToUse:
    "Light-volume inbox days — under 20 emails, just read them. Save the digest for high-volume days.",
  steps: [
    {
      title: "Authorize the Outlook / Microsoft 365 connector",
      body: `In Claude.ai → Settings → Connectors → find **Microsoft 365** or **Outlook** → **Connect**.

Authorize **read-only access** for your inbox to start. (You can upgrade later if you want Claude to be able to draft replies directly.)

After OAuth, return to Claude.ai — connector should show **Active**.`,
      callout: {
        variant: "warning",
        body: "Read-only first. Grant write access only after you've used the read-only flow for a few weeks and trust the pattern.",
      },
    },
    {
      title: "Test the connector",
      body: `Open a new chat. Try:`,
      prompt: `List the emails I received today, grouped by sender. Just senders + count + subject of most recent — no body content.`,
    },
    {
      title: "Build the digest skill",
      body: `Combine Cowork with Skills for max leverage. Create a Skill:

Name: \`EOD inbox digest\`

Description: \`Apply when the user asks for an end-of-day inbox summary, EOD digest, "what happened in my inbox today," or "what do I still owe people."\`

Body:`,
      prompt: `# EOD inbox digest

Apply when the user asks for an end-of-day inbox summary. Use the Outlook connector to read today's email activity.

## What to pull
- Emails RECEIVED today (last 8-10 hours)
- Emails I SENT today
- Any threads where I was @-mentioned or in the To/CC line and the most recent message is not from me (indicates a pending reply on my side)

## What to output

### 📥 Today's important inbound
3-5 emails that matter most. Skip newsletters, FYIs, automated notifications. For each:
- **Sender** — [name]
- **Subject** — [line]
- **What they want / what to know:** [1 sentence]
- **Do I need to respond?** Yes (by [date]) / No / Optional

### 📬 Threads I owe a reply on
List specifically. Format:
| Sender | Topic | How long they've been waiting | Urgency |

### 📤 What I sent today
1-line summary of significant outgoing emails (skip routine acknowledgments).

### ⚠️ Anything urgent I missed
If there's an email from a key client or leadership that hasn't been read or is flagged, surface it here. Otherwise: "Nothing flagged."

### 🎯 Tomorrow's first email
Suggest the single most important reply to start tomorrow with. One line.

## Rules
- Skip newsletters, marketing, calendar notifications, internal automated alerts.
- Be ruthless about brevity. Whole digest under 300 words.
- Group by relevance, not by chronological order.
- If something is genuinely urgent (overdue reply, leadership ask), flag it loudly.`,
    },
    {
      title: "Run it at 5pm",
      body: `At end of day, open Claude. Say:

> "Run my EOD inbox digest."

The connector pulls today's inbox, the skill structures it, and you get a 90-second read on what mattered and what you owe people.

Critical replies get flagged so they don't slip overnight.`,
    },
    {
      title: "Pair with a 'first email of tomorrow' habit",
      body: `The digest ends with "tomorrow's first email." That's not decoration — it's the single most useful output.

When you sit down tomorrow morning, write THAT email first, before opening the rest of the inbox. Then triage the rest with the freshness of having already done one important thing.`,
      callout: {
        variant: "tip",
        body: "This pattern compounds. Within a few weeks, your high-stakes emails get sent within 24 hours instead of slipping for days.",
      },
    },
    {
      title: "Bonus: shared inbox digest",
      body: `If you manage a shared inbox (Admin Manager, Client Resource Specialist), point the same digest at the shared mailbox. Have the digest also include:

- Routing recommendations ("this should go to Tax, this to Legal, this to Accounting")
- Anything sitting unanswered for >24 hours

Run it 2-3 times a day on the shared inbox. The shared inbox becomes manageable in 90 seconds instead of an hour.`,
    },
  ],
  pitfalls: [
    "Asking Claude to produce the digest WITHOUT the connector. It'll have nothing to read — you'd have to paste your inbox in manually.",
    "Granting write access too early. Stay read-only until you trust the pattern.",
    "Letting the digest cover newsletters and FYIs. Tune the skill body to skip those.",
    "Running the digest but ignoring its 'tomorrow's first email' suggestion. That's the highest-leverage output.",
  ],
  relatedTutorialSlugs: [
    "claude-cowork-101",
    "claude-skills-101",
    "shared-inbox-triage",
    "email-first-draft",
  ],
};

export const coworkMondayStandup: Tutorial = {
  slug: "cowork-monday-standup",
  title: "Cowork + Monday: daily team standup digest",
  subtitle:
    "Replace the 9am 'what's everyone working on' meeting with a 30-second auto-generated digest posted to Telegram.",
  emoji: "👥",
  format: "Cowork",
  difficulty: "Intermediate",
  timeEstimate: "45 min setup, eliminates the standup meeting",
  audienceRoleIds: [
    "admin-manager",
    "financial-advisor",
    "legal-ops-director",
    "strategy-lead",
  ],
  themeIds: ["cross-entity-comms", "monday-fragility"],
  toolIds: ["monday", "telegram"],
  aiTools: ["Claude.ai with Monday connector + Telegram bot"],
  prerequisites: [
    "Cowork 101 read",
    "Claude.ai with Monday connector authorized (read-only is fine)",
    "Telegram channel for the team (or Telegram bot per the 'Brookhaven Telegram bot' tutorial)",
    "Monday boards set up with clear status columns and per-person assignments",
  ],
  whenToUse:
    "When your team has daily standups that mostly cover 'here's what I'm working on' status updates. The digest delivers the same information in 30 seconds without a meeting.",
  whenNotToUse:
    "When standups serve a relationship/connection purpose beyond status updates. Don't replace human time with automation if the meeting's value is the conversation itself.",
  steps: [
    {
      title: "Authorize the Monday connector",
      body: `In Claude.ai → Settings → Connectors → Monday.com → Connect. Read-only authorization is enough — we're just pulling status, not changing anything.

Test:`,
      prompt: `List items on the Legal Task Management board that are currently in 'In Progress' status, grouped by assignee.`,
    },
    {
      title: "Define what the standup digest covers",
      body: `Per team / board, decide:

- **What boards to scan** (one team usually has 1-3 active boards)
- **Who's on the team** (and what their Monday usernames are)
- **What statuses to include** ("In Progress" + "Blocked" usually; skip "Done" and "Not Started")
- **What "yesterday" means** (last 24 hours? last business day?)`,
    },
    {
      title: "Build the standup digest skill",
      body: `Create a Skill:

Name: \`Daily team standup digest\`

Description: \`Apply when the user asks for a team standup, daily status digest, "what is everyone working on," or "what changed on the board yesterday." Pulls from Monday boards and produces a person-by-person status summary.\`

Body:`,
      prompt: `# Team standup digest

Apply when the user asks for a daily team standup digest. Use the Monday connector to pull board state.

## What to pull
- All items currently in "In Progress" or "Blocked" status on the team's active boards
- All items moved to "Done" in the last business day
- Any items where the due date is within 3 business days

## What to output

### 📅 [Today's date]

### ✅ Shipped yesterday
Brief bullets. One per item that moved to Done. Format:
- [Item name] — [assignee]

### 🛠 In progress today
Group by person. Format:
**[Person name]:**
- [Item] (status, due [date if relevant])
- [Item] (status)

### 🚧 Blocked
For each blocked item:
- **[Item]** — [assignee] — Blocked on: [if status notes mention what, include; else: "blocker unclear"]

### ⏰ Due in the next 3 days
List specifically — these are the items at risk of slipping.

### 🤝 Cross-team handoffs
Any items waiting for input from outside the team (status like "Waiting on Legal" / "Waiting on Tax").

## Rules
- Keep total under 400 words.
- If a section has no items, write "—" not a heading.
- Sort each section by due date ascending.
- Be specific about blockers — "blocked, no detail" is more useful than nothing because it surfaces the missing info.
- DON'T list "Not Started" items. Standup is about active work + completed work, not pre-work.`,
    },
    {
      title: "Run manually first to validate",
      body: `Before automating, run the skill manually for a week:

Each morning at 8:55am, open Claude, ask "Run today's team standup digest."

Compare the output to what would have come up in the actual standup meeting. Refine the skill body if it misses things or includes noise.

After a week of accurate manual digests, you've proven the value.`,
    },
    {
      title: "Automate via Telegram bot",
      body: `Once the manual digest works, wire it into a scheduled job that posts to a Telegram channel each morning.

Sketch:

\`\`\`python
# daily_standup.py — runs at 8:55am via cron
from anthropic import Anthropic
from telegram_helpers import post_to_channel

client = Anthropic()

response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=1500,
    messages=[{"role": "user", "content": "Run today's team standup digest."}],
    system="You have the Monday connector available and the team standup digest skill active.",
    # connector + skill activation handled via Claude.ai workspace settings or Managed Agents
)

post_to_channel("#team-standup", response.content[0].text)
\`\`\`

See the *"Build a Brookhaven Telegram bot"* tutorial for the full Telegram wiring.`,
      callout: {
        variant: "info",
        body: "If your plan supports Anthropic Managed Agents, the scheduling is even simpler — the agent handles cron, connector access, and skill activation automatically.",
      },
    },
    {
      title: "Cancel the actual standup meeting",
      body: `Run the digest in parallel with the actual standup for 2 weeks. Then propose: "for a month, we skip the meeting and use the digest. If we feel like we've lost something important, we bring it back."

Most teams find the meeting was 80% status updates anyway. The 20% that was actual conversation can move to a weekly 30-min sync.

Your team gets back ~30 minutes per person per day.`,
      callout: {
        variant: "tip",
        body: "Make this experimental at first. Frame it as a 30-day test, not a permanent cancellation. People feel more comfortable trying it.",
      },
    },
    {
      title: "Add a 'reply with blockers' channel norm",
      body: `The digest only surfaces blockers if they're noted in Monday. Pair the digest with a team norm:

> "When the standup digest posts in the morning, if you've got a blocker, reply in the thread with what you need from whom by when."

Now the digest becomes a daily blocker-clearing ritual without a meeting.`,
    },
  ],
  pitfalls: [
    "Letting the digest list every 'In Progress' item. Set a cap (10 items per section max) or it becomes unreadable.",
    "Automating before manual works. Run the digest manually for a week, refine, then automate.",
    "Replacing standups that serve real conversation needs. If your standup is 80% status, replace it. If it's 50% blockers and team dynamics, keep it.",
    "Not updating Monday statuses. The digest is only as accurate as the board. Discipline matters here.",
  ],
  relatedTutorialSlugs: [
    "claude-cowork-101",
    "telegram-bot-bh",
    "smart-compliance-reminders",
    "monday-safe-automation",
  ],
};

// ─────────────────────────────────────────────────────────────────────────

export const skillsAndCoworkTutorials = [
  claudeSkills101,
  claudeCowork101,
  skillDailyBriefing,
  skillMeetingPrep,
  skillDeadlineWatcher,
  skillClientContext,
  coworkOutlookEodDigest,
  coworkMondayStandup,
];
