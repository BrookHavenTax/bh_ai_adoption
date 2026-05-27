import type { Tutorial } from "../types";

export const strategyThinkingPartner: Tutorial = {
  slug: "strategy-thinking-partner",
  title: "Claude as a strategy thinking partner",
  subtitle:
    "Stress-test ideas, generate alternatives, and structure complex decisions — without convening a meeting.",
  emoji: "🧠",
  format: "Prompt",
  difficulty: "Beginner",
  timeEstimate: "Pick up immediately, hours of compounding leverage",
  audienceRoleIds: ["strategy-lead", "financial-advisor", "legal-ops-director"],
  themeIds: ["cross-entity-comms"],
  toolIds: [],
  aiTools: ["Claude.ai"],
  prerequisites: ["Claude.ai account", "A real decision or strategy question you're sitting on"],
  whenToUse:
    "When you're thinking through a strategy question and want a smart sounding-board that asks better questions than your colleagues might (or that you don't want to convene a meeting to get).",
  whenNotToUse:
    "When you need stakeholder buy-in. Claude won't replace the conversation; it just helps you arrive at the meeting with clearer thinking.",
  steps: [
    {
      title: "The wrong way to use Claude for strategy",
      body: `Most people open Claude and type *"What should our 2026 marketing strategy be?"* and get back a generic blob. That's not strategy work. That's asking the encyclopedia.

The right pattern is **iterative pressure-testing.** You bring the thinking. Claude pressure-tests it.`,
    },
    {
      title: "Pattern 1: 'Steelman the opposite of what I'm thinking'",
      body: `Lay out where you're leaning, then ask:`,
      prompt: `I'm leaning toward [your current plan]. Steelman the strongest possible case AGAINST this plan. Don't be polite — actually try to change my mind. Cover:

- What evidence would I need to see to know this plan is wrong?
- What's the most likely failure mode 12 months in?
- Who could oppose this and what would their best argument be?
- What's the cheapest experiment I could run BEFORE committing to find out if this is wrong?

End with: "Here's the question you should answer before going forward."`,
    },
    {
      title: "Pattern 2: 'What am I not considering?'",
      body: `Especially useful when you've been deep in a problem for a while and might have blind spots:`,
      prompt: `I'm thinking about [problem]. Here's the option I'm considering: [plan]. Here are the alternatives I've already considered and ruled out: [list].

What's an option I might be missing? Generate 3 alternatives I probably haven't thought of. For each:

- Sketch the option
- Why I might have ignored it
- What it would take to seriously evaluate it (cheapest first step)`,
    },
    {
      title: "Pattern 3: 'Help me structure this decision'",
      body: `When the question is complex and you don't even know how to organize the analysis:`,
      prompt: `I need to make a call on [decision]. Help me structure this — don't tell me the answer. Tell me:

1. What are the 3-5 dimensions I should be evaluating each option on?
2. For each dimension, what's a concrete test/metric/question I should answer?
3. What information would I need to gather to evaluate each option?
4. Where might my own bias be steering me wrong here?

Output as a decision framework I can fill in over the next week.`,
    },
    {
      title: "Pattern 4: 'Pre-mortem'",
      body: `Before launching anything significant:`,
      prompt: `Assume it's 12 months from now and [project I'm about to launch] failed. Write the post-mortem: what most likely went wrong, in order of probability?

Cover:
- The market reason it failed
- The internal/team reason it failed
- The technical/operational reason it failed
- The reason that's "embarrassing in hindsight" but obvious now

For each, what could I do TODAY to materially reduce that risk?`,
    },
    {
      title: "Pattern 5: 'Research the landscape'",
      body: `For genuinely new territory, Claude can do the literature review:`,
      prompt: `I'm researching [topic — e.g., "how multi-family offices handle trustee succession"]. Give me:

1. The 3-5 most important conceptual frames or models in this area
2. The historical context — how have firms approached this in the past 20 years and what changed?
3. The current state — what's the consensus today, where is there genuine disagreement?
4. The frontier — what are the smartest practitioners experimenting with that's not yet mainstream?
5. Specific firms / people / books I should look at next

Be specific. No platitudes.`,
    },
    {
      title: "Use Claude as 'fresh eyes' on existing work",
      body: `If you have a strategy document, plan, or memo you've been working on:

> *"Read this and tell me what's confusing. Where would a smart reader stop and say 'wait, what?' Where am I making claims I haven't supported? Where am I burying the lead?"*

This pattern is shockingly useful. A 20-minute session can take a draft from 6/10 to 8/10.`,
    },
  ],
  pitfalls: [
    "Treating Claude's analysis as gospel. The patterns above produce useful pressure-tests, not conclusions. YOU still make the call.",
    "Skipping the 'what's my current thinking' setup. Without it, you get generic strategy-101 output.",
    "Using these patterns once and stopping. The leverage compounds with practice.",
  ],
  relatedTutorialSlugs: ["pdf-summary-30sec", "email-first-draft"],
};

export const automationDiagnostics: Tutorial = {
  slug: "automation-diagnostics",
  title: "Diagnose broken integrations with Claude",
  subtitle: "Paste the broken flow, get the diagnosis. The Financial Advisor's wish-list item.",
  emoji: "🔧",
  format: "Prompt",
  difficulty: "Intermediate",
  timeEstimate: "20 min per broken integration",
  audienceRoleIds: ["financial-advisor", "accounting-lead", "admin-manager"],
  themeIds: ["monday-fragility"],
  toolIds: ["monday"],
  aiTools: ["Claude.ai"],
  prerequisites: [
    "Access to the system(s) where the broken integration lives",
    "A specific failure case you can describe (not 'it's been weird lately' — an actual broken example)",
  ],
  whenToUse:
    "When an integration between two systems (Monday → email, Outlook → Monday, Zapier flows, QBO sync, etc.) is producing wrong output and you need to find out why.",
  steps: [
    {
      title: "Gather the evidence first",
      body: `Don't just type "my integration is broken." Collect:

1. **The integration's configuration** (screenshot or description of the rule)
2. **The expected input** (what data is supposed to come in)
3. **The actual input** (what data actually came in — get a sample)
4. **The expected output** (what was supposed to happen)
5. **The actual output** (what actually happened — get a screenshot or copy of the bad output)

The more concrete, the better the diagnosis.`,
    },
    {
      title: "The diagnosis prompt",
      body: `Paste all five items into Claude.ai with this prompt:`,
      prompt: `I have a broken integration. Help me diagnose it.

CONFIGURATION:
[paste the rule / flow description]

EXPECTED INPUT:
[what's supposed to come in]

ACTUAL INPUT (sample):
[paste a real failing example]

EXPECTED OUTPUT:
[what should have happened]

ACTUAL OUTPUT:
[what actually happened]

Tell me:

1. **Most likely root cause** — what specifically is different between expected and actual that explains the failure?

2. **What I should verify first** — what's the cheapest test to confirm your hypothesis?

3. **Fix options ranked by effort** — list 2-3 ways to fix this, easiest to hardest. For each, tradeoffs.

4. **Could anything ELSE be silently affected by the same bug** — am I going to find more broken outputs once I look?

5. **How would I detect this earlier next time** — what monitoring or test would catch this kind of failure within an hour of it happening, not whenever I happened to notice?

Be specific about field names and data values from the inputs I gave you. Don't speculate about the system's internals.`,
    },
    {
      title: "Common patterns Claude will surface",
      body: `Most broken integrations fail for a handful of reasons:

- **Field rename:** the source system renamed a field, the integration still references the old name → gets null
- **Type mismatch:** the source sends a string, the destination expects a number → coerced incorrectly or rejected
- **Trigger race:** the integration fires before a dependent field finishes calculating → reads empty
- **Edge case in the data:** the integration handles 99% of cases but the failing case has a weird character, empty value, or unusual format
- **Authentication expired:** OAuth tokens silently expired, integration silently fails
- **Rate limit hit:** integration runs fine until volume spikes, then drops requests
- **Two integrations interacting:** A overwrites what B just wrote

Knowing which pattern you're hitting is 80% of the fix.`,
    },
    {
      title: "Verify the hypothesis cheaply",
      body: `Claude's diagnosis is a hypothesis. The "what to verify first" answer is the cheapest test.

Run that test. If it confirms the diagnosis, fix the underlying cause. If it doesn't, paste the new findings back to Claude:

> *"Verified X — your hypothesis was wrong because Y. What's your next-best explanation?"*`,
    },
    {
      title: "Build the monitor BEFORE fixing the bug",
      body: `Claude's #5 ("how would I detect this earlier") is often the most valuable answer. Build the monitor first, then fix the bug.

Why? Because once you fix it, you'll forget about it — and when the same class of bug bites you again in 6 months, you'll start from zero.

The monitor (a daily Telegram alert, a Monday health-check item, a scheduled "run this test" job) is what catches the next one early.`,
    },
    {
      title: "Document the diagnosis",
      body: `In a "Broken integrations log" Monday board or doc, record:
- Date
- Integration name
- Symptom
- Root cause
- Fix applied
- Monitor added

After a year of this, you have a real understanding of where your systems are fragile. Patterns emerge. You can fix the root causes, not just the symptoms.`,
    },
  ],
  pitfalls: [
    "Asking Claude to diagnose without giving it the actual inputs and outputs. It needs the concrete data.",
    "Fixing the symptom (re-running the integration manually) without finding root cause. Same bug bites you again next month.",
    "Skipping the monitor step. Without it, you'll be playing whack-a-mole forever.",
  ],
  relatedTutorialSlugs: ["monday-audit-automation", "monday-safe-automation"],
};

export const sharedInboxTriage: Tutorial = {
  slug: "shared-inbox-triage",
  title: "Shared inbox triage with Claude in Chrome",
  subtitle: "Route incoming email to the right person in 5 minutes instead of 30.",
  emoji: "📨",
  format: "Prompt",
  difficulty: "Beginner",
  timeEstimate: "15 min setup, saves 20+ min/day",
  audienceRoleIds: ["admin-manager", "client-resource-specialist"],
  themeIds: ["email-triage", "cross-entity-comms"],
  toolIds: ["outlook"],
  aiTools: ["Claude in Chrome"],
  prerequisites: [
    "Claude in Chrome extension installed",
    "Access to the shared inbox(es) in Outlook web",
    "A simple routing rule: which kinds of emails go to which people",
  ],
  whenToUse:
    "When you spend more than 15 minutes a day on inbox routing (reading emails, deciding who they're for, forwarding or assigning).",
  steps: [
    {
      title: "Write down your routing rules",
      body: `Before automating anything, get the rules clear in plain English. Example:

- Tax questions / client tax docs → Tax Lead
- Trust / estate questions → Legal Ops Director
- A/R questions / billing → Accounting Lead
- Document submissions (general) → Client Resource Specialist
- Anything about Monday or system access → Admin Manager
- Vendor invoices / bills → Accounting Lead
- Anything else → flag for me to handle personally

This list is the contract Claude will follow.`,
    },
    {
      title: "Open Outlook web and the Claude extension",
      body: `Go to outlook.office.com (the web version, not desktop). Open the shared inbox.

Click the Claude in Chrome icon in your browser toolbar. You should see a side panel.`,
    },
    {
      title: "Triage one email at a time, learn the pattern",
      body: `Click an email. In the Claude side panel, paste:`,
      prompt: `Read this email. Tell me:

1. **Who at BH should handle this?** (use the routing rules below)
2. **Why?** (one sentence)
3. **Urgency:** Critical (need response today) / Normal (this week) / FYI (no action needed)
4. **What to do next:** Forward / Reply with [draft below] / Flag / Archive

Routing rules:
- Tax questions / client tax docs → Tax Lead
- Trust / estate → Legal Ops Director
- A/R / billing → Accounting Lead
- Document submissions → Client Resource Specialist
- Monday / systems → Admin Manager
- Vendor invoices → Accounting Lead
- Else → flag for me

If urgency is Critical, also draft a 'we're on it' acknowledgment reply.`,
    },
    {
      title: "Build a daily rhythm",
      body: `Once you've triaged 20-30 emails this way, the routing becomes second-nature. The pattern:

1. Open inbox (morning + midday + EOD passes)
2. Click first unread email
3. Claude tells you where it goes + urgency
4. Forward / reply / archive based on Claude's read
5. Next email

The whole inbox can be triaged in 5-10 minutes per pass vs the 20-30 it used to take.`,
    },
    {
      title: "For repeating senders, build saved responses",
      body: `If certain clients write the same kind of question every week, build a saved response template:`,
      prompt: `BRIGHTPOINT writes us asking the same question 3-4 times a month: "what's the status of my ERC processing?"

Draft a friendly, accurate response template I can quickly personalize. Include where they can self-serve check status, and what info we'd need from them if there's an actual issue.`,
    },
    {
      title: "Handover doc for backup coverage",
      body: `Bonus benefit: write down your routing rules (step 1) clearly. When you're out, whoever covers the shared inbox can paste those same rules into Claude and triage in your style.`,
    },
  ],
  pitfalls: [
    "Trusting Claude's routing 100%. Spot-check the first week — make sure it's sending things to the right people.",
    "Forwarding without reading. Always glance at Claude's reasoning before acting. Sometimes the email is something Claude's rules don't quite fit.",
    "Forgetting to update the routing rules when team responsibilities shift.",
  ],
  relatedTutorialSlugs: ["email-first-draft", "claude-skill-bh-voice"],
};

export const socialMediaDrafting: Tutorial = {
  slug: "social-media-drafting",
  title: "Social media post drafting with Claude",
  subtitle:
    "Generate first-draft posts that sound like Brookhaven, not like generic LinkedIn content.",
  emoji: "📱",
  format: "Project",
  difficulty: "Beginner",
  timeEstimate: "15 min setup, 2 min per post after",
  audienceRoleIds: ["paralegal", "strategy-lead"],
  themeIds: ["email-triage"],
  toolIds: [],
  aiTools: ["Claude.ai", "Brookhaven voice Skill (recommended)"],
  prerequisites: [
    "Claude.ai account",
    "5-10 examples of past BH posts that worked well",
    "The Brookhaven voice Claude Skill (or willingness to build it as part of this)",
  ],
  whenToUse:
    "When social media drafting is eating significant time in your week (the Paralegal flagged this at 40% of the day).",
  steps: [
    {
      title: "Set up a 'BH social' Project",
      body: `Open Claude.ai → Projects → +New. Name: *"BH social media."*

In Project knowledge, paste:
- 5-10 past posts that performed well (or that leadership liked)
- The platform(s) you post to (LinkedIn, X, FB, Instagram)
- Your audience (current clients? prospective clients? referral partners?)
- Topics you cover (estate planning, trust admin, tax tips, firm news, team spotlights)`,
    },
    {
      title: "Custom instructions",
      body: `Paste:`,
      prompt: `You draft social media posts for Brookhaven. Apply the Brookhaven voice (friendly, professional, direct — no corporate-speak).

When I give you a topic or angle, produce:

## LinkedIn (200-400 chars body, 3-5 hashtags)
- Hook line (one short sentence that earns the click)
- Body (1-2 short paragraphs)
- Call to action or question
- 3-5 hashtags

## Instagram caption (under 200 chars)
- Hook
- 1 short body line
- Single CTA
- 2-3 hashtags

## Quick takes / X-style (under 280 chars total)
- One punchy thought
- No hashtags unless one fits naturally

Tone rules:
- No "Are you struggling with X?" hooks. We don't fearmonger.
- No "🚀" or "💡" emoji-heavy openers. One emoji max per post, only if it adds something.
- Don't use buzzwords like "innovate," "synergy," "leverage."
- We're warm but not casual to the point of unprofessional.
- We talk to people, not "professionals" or "individuals."

If the topic is sensitive (death, divorce, family conflict), be especially gentle. Always end on agency for the reader.`,
    },
    {
      title: "Generate posts from a single topic",
      body: `New chat in the Project. Type:`,
      prompt: `Topic: the new GA estate tax exemption increase. Draft 3 different angles:

1. The bad-news framing (a thing many families won't take advantage of in time)
2. The action framing (one specific thing readers can do this month)
3. The story framing (a real-feeling scenario without naming anyone)

Give me LinkedIn + Instagram + quick-take versions for each angle.`,
    },
    {
      title: "Build a content calendar prompt",
      body: `Once a week, ask Claude to generate the week's content lineup:`,
      prompt: `Draft this week's social calendar. We post Mon/Wed/Fri on LinkedIn and Tue/Thu on Instagram.

Topics this week should cover:
- One educational post (a planning concept)
- One firm-news post
- One client-impact post (anonymized, no specifics)
- One team-spotlight (we'll fill in the person separately)
- One "did you know" trust/tax/estate tidbit

Give me drafts for all 5 in the formats I usually post. I'll review and schedule.`,
    },
    {
      title: "Review, edit, schedule",
      body: `Claude's drafts are starting points. Always:
- Edit for voice (Claude is usually 90% there; tweak the 10%)
- Verify any factual claims (especially tax / legal facts — Claude can be wrong)
- Add a personal touch where appropriate (a story, a real client interaction shape, a team member's quote)

Schedule via your usual tool (Buffer / Hootsuite / native scheduler).`,
    },
    {
      title: "Track what works, feed it back",
      body: `Once a month, look at engagement. What posts performed well? What flopped? Update your Project knowledge with the best-performing examples and remove the ones that didn't land.

Your drafts get sharper each month.`,
    },
  ],
  pitfalls: [
    "Posting Claude's first draft without editing. Always edit.",
    "Letting facts slip through. Especially with legal / tax content. Verify before posting.",
    "Letting the Project's example library go stale. Update monthly with what's working.",
    "Sounding generic. If a post would work equally well for any firm, it's not BH-specific enough.",
  ],
  relatedTutorialSlugs: ["claude-skill-bh-voice", "email-first-draft"],
};

export const checklistAutoUpdate: Tutorial = {
  slug: "checklist-auto-update",
  title: "Auto-update the client checklist from email mentions",
  subtitle:
    "Stop manually checking boxes when a client emails 'attached is the W-9.' Let Claude update the checklist.",
  emoji: "☑️",
  format: "Script",
  difficulty: "Intermediate",
  timeEstimate: "2-3 hours setup, saves 30+ min/day after",
  audienceRoleIds: ["client-resource-specialist", "tax-lead"],
  themeIds: ["email-triage", "compliance-reminders"],
  toolIds: ["outlook", "monday"],
  aiTools: ["Claude API", "Microsoft Graph (Outlook) API", "Monday API"],
  prerequisites: [
    "Microsoft 365 admin willingness to grant a Graph API app permissions to read the relevant mailbox(es)",
    "Monday API token",
    "A clearly-defined client checklist structure (per client, per engagement)",
    "Someone comfortable with Python (~150 lines)",
  ],
  whenToUse:
    "When client checklist updates are eating real time. The Client Resource Specialist flagged this directly — opening multiple apps to track doc receipt and tick boxes is cumbersome.",
  steps: [
    {
      title: "Pin down the checklist structure",
      body: `Before building anything, agree on the structure. Per client, the checklist should have:

- A clear list of items (W-9, prior year return, brokerage 1099s, K-1s, etc.)
- Each item: status (Requested / Received / Reviewed / Filed) and a date
- A way to map "this email/attachment satisfies this item"

This is what the auto-update logic will hit.`,
    },
    {
      title: "Build the email → checklist matcher",
      body: `The flow: Outlook email lands → script reads it (and any attachments) → Claude classifies what doc type it is → script updates the relevant Monday item.

\`\`\`python
# auto_checklist.py
from msgraph_helpers import recent_emails
from monday_api import update_checklist_item
import anthropic

client = anthropic.Anthropic()

CHECKLIST_PROMPT = """You receive emails from BH clients submitting documents.
For each email, identify:

1. Which client is this from? (match against the client list provided)
2. What document type(s) did they send? (W-9, 1099, K-1, brokerage statement, prior return, bank statement, signed engagement, other)
3. For each doc type identified, what's your confidence? (high/medium/low)
4. Should I auto-mark this as Received in the checklist, or flag for human review?

Output as JSON:
{
  "client_code": "BRIGHTPOINT",
  "documents": [
    {"type": "W-9", "confidence": "high", "auto_mark": true},
    ...
  ],
  "needs_human_review": false,
  "reasoning": "1 sentence"
}"""

for email in recent_emails(since="last 1 hour"):
    msg = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=600,
        messages=[{"role": "user", "content": email_text_with_attachments(email)}],
        system=CHECKLIST_PROMPT,
    )
    result = parse_json(msg.content[0].text)
    for doc in result["documents"]:
        if doc["auto_mark"] and not result["needs_human_review"]:
            update_checklist_item(result["client_code"], doc["type"], status="Received", date=email.received_date)
        else:
            flag_for_review(email, result)
\`\`\``,
    },
    {
      title: "Run in 'propose, don't act' mode for the first 2 weeks",
      body: `For the first 2 weeks, the script should NOT actually update Monday. Instead, it should post a Telegram message to you: *"I would mark BRIGHTPOINT's W-9 as Received based on this email. Approve?"*

You approve or correct each one. Track your edit rate. When you're consistently below 5% corrections needed, you can graduate to auto-update with daily sample-check.`,
    },
    {
      title: "Add the daily sample-check",
      body: `Once auto-update is live, the script also picks 3 random auto-updates from the last 24 hours and posts them to you each morning:

> *"Sample check — I auto-marked these yesterday. Confirm correct: [3 items]. Reply with any that were wrong."*

This is the drift catcher. Without it, you'll never notice when accuracy slips.`,
    },
    {
      title: "Track miss patterns",
      body: `When the script gets one wrong, log:
- What client
- What doc type
- What the email said
- Why Claude misclassified it

After a month, patterns emerge. You'll see things like *"emails with subject 'Documents' from Hartwell get misclassified — they often contain multiple doc types and the prompt picks the first only."* Then you can fix the prompt or add an exception.`,
    },
    {
      title: "Cover the edge cases",
      body: `Common things that will fail without explicit handling:
- Email contains multiple doc types — script must update multiple checklist items
- Same doc resubmitted (corrected version) — don't double-mark; check current status first
- Doc attached but client mentions OTHER docs in the body — only mark the attached one
- Forwarded emails — the client wrapping a doc from a third party (e.g., brokerage statement forwarded from their advisor)

Each of these gets a rule in the prompt or the script.`,
    },
  ],
  pitfalls: [
    "Going to auto-update without proving accuracy in propose-only mode first. The whole point is reducing manual work, not creating wrong checklist states.",
    "Skipping the daily sample-check. Drift WILL happen.",
    "Not covering multi-document emails. They're common.",
    "Granting the script more email-read permissions than it needs. Scope to the specific mailbox; never grant org-wide read.",
  ],
  relatedTutorialSlugs: ["smart-compliance-reminders", "email-first-draft"],
};

export const roleSpecificTutorials = [
  strategyThinkingPartner,
  automationDiagnostics,
  sharedInboxTriage,
  socialMediaDrafting,
  checklistAutoUpdate,
];
