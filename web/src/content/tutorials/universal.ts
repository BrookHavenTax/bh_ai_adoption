import type { Tutorial } from "../types";

export const emailFirstDraft: Tutorial = {
  slug: "email-first-draft",
  title: "Your first-draft email assistant",
  subtitle:
    "Turn one routine email you send every day into a 30-second draft-and-edit habit.",
  emoji: "✉️",
  format: "Project",
  difficulty: "Beginner",
  timeEstimate: "10 minutes to set up, saves ~30 min/day after",
  audienceRoleIds: [
    "tax-lead",
    "client-resource-specialist",
    "accounting-lead",
    "admin-manager",
    "paralegal",
    "legal-ops-director",
  ],
  themeIds: ["email-triage"],
  toolIds: ["outlook"],
  aiTools: ["Claude.ai", "Claude in Chrome (Chrome extension)"],
  prerequisites: [
    "A Claude.ai account (claude.ai) — your work email is fine",
    "Optional but recommended: the Claude in Chrome extension installed (chrome.google.com/webstore → search 'Claude')",
    "Pick ONE email type you send routinely — AR follow-up, client checklist nudge, compliance reply, status update, etc.",
  ],
  whenToUse:
    "When you write the same kind of email more than 3 times a week. Routine = AR follow-ups, status updates, checklist nudges, compliance acknowledgments, document-request replies.",
  whenNotToUse:
    "Sensitive client matters (e.g., a difficult conversation about fees, a complaint response). Draft those yourself. Also skip for anything where exact phrasing has legal weight — Claude can help, but a human writes those start to finish.",
  steps: [
    {
      title: "Pick your one starter email",
      body: `Don't try to AI-assist every email at once — that fails. Pick **one** type you send routinely. Good candidates:

- *"Following up on invoice #12345"* (AR follow-up)
- *"We're still waiting on your W-9 and 1099 paperwork"* (client document nudge)
- *"Quick update on the TKI close timeline"* (internal status update)
- *"Confirming we received your docs — here's what we'll do next"* (acknowledgment)

Pull up the last 3 examples you sent of that email type. We'll teach Claude what your "voice" looks like by example.`,
      callout: {
        variant: "tip",
        body: "The single biggest mistake here is trying to automate too many email types at once. Pick one. Get it perfect. Then add the next.",
      },
    },
    {
      title: "Open Claude.ai and start a new Project",
      body: `Go to **claude.ai** → click **Projects** in the left sidebar → **+ New Project**.

Name it something like: *"BrookHaven email — AR follow-ups"* (or whatever you picked in step 1).

A Project is a saved workspace where Claude remembers your custom instructions and uploaded files across chats. This is where your "voice" will live.`,
    },
    {
      title: "Paste your 3 prior emails into the Project's Knowledge",
      body: `In your new Project, look for **Project knowledge** or **Add to knowledge**.

Paste the 3 prior emails you sent of this type, separated by clear dividers like \`---\`. These become Claude's reference for "this is how I write."

You can also attach them as a .docx or .txt file if you prefer.`,
      callout: {
        variant: "info",
        body: "Project knowledge stays in your Project — it doesn't leak into your other Claude chats and it's not used to train models. It's your private context.",
      },
    },
    {
      title: "Write the Project's custom instructions",
      body: `Click **Set custom instructions** (or **Edit instructions**) in your Project settings. Paste this template — adjust the names and details to your situation:`,
      prompt: `You are my email drafting assistant for BrookHaven. You help me write routine AR follow-up emails to tax/accounting clients.

VOICE:
- Friendly but professional. Warm tone. No corporate-speak.
- Short paragraphs. Avoid filler ("I hope this message finds you well").
- Sign-off: "Thanks, [my name]"

CONTENT RULES:
- State the ask in the first sentence.
- Reference the specific invoice number and date when relevant.
- Always offer a specific next step ("Pay online here," "Call me at X," "Reply with your CC info").
- If the client has paid late before, soften the tone but keep the ask clear.

WHEN I PASTE A SITUATION:
- Produce ONE draft, not multiple options.
- Keep it under 120 words unless I ask for more.
- End with: "[Edit anything in brackets before sending]" so I remember to review.

Don't include subject lines unless I ask. Don't apologize. Don't pad.`,
      callout: {
        variant: "tip",
        body: "Your custom instructions are the magic. They tell Claude HOW you write, not just WHAT to write. Spend 5 extra minutes here and the drafts get dramatically better.",
      },
    },
    {
      title: "Run your first draft",
      body: `Start a new chat inside the Project. Type a short situation in plain language — don't try to write the email yourself.

Example:`,
      prompt: `Invoice 4421 to BrightPoint, 45 days past due, $2,800 for Feb consulting hours. They've paid late twice before but always pay eventually. Keep it friendly but make the ask clear. Offer the online payment link.`,
    },
    {
      title: "Read what Claude produced",
      body: `Claude returns a draft that looks like something you'd write — because it learned from your 3 examples and your custom instructions.

Read it once. **Edit anything that doesn't sound like you.** Even small tweaks teach you what to adjust in the instructions next time.`,
    },
    {
      title: "Copy → paste into Outlook → send",
      body: `Hit **Copy** on Claude's response. Open your Outlook draft. Paste. Edit the recipient and subject line. Send.

You went from "blank email window" to "sent email" in under 60 seconds. That's the unit of leverage.`,
    },
    {
      title: "Iterate the Project instructions over the next week",
      body: `Every time Claude drafts something that needs more than a line of editing, ask yourself: *"Could I add a rule to the custom instructions to fix this next time?"*

If yes, edit the Project's custom instructions and add the rule. Your drafts get sharper every week without any extra work from you.`,
    },
    {
      title: "Bonus: use Claude in Chrome for one-click summaries",
      body: `Once you have the Chrome extension installed, open an email in Outlook web. Click the Claude icon in your toolbar.

Try these:
- *"Summarize this thread in 3 bullets"*
- *"What's the ask? When does this person need a response?"*
- *"Is there a deadline or commitment in here I should flag?"*

This is the "I have 100 unread emails and need to triage in 5 minutes" workflow.`,
      callout: {
        variant: "info",
        body: "Claude in Chrome reads only what you point it at, on demand. It doesn't watch your inbox or do anything in the background.",
      },
    },
    {
      title: "Add your next email type after a week",
      body: `Once your first email type is muscle memory, repeat steps 1–5 for the next routine email. New Project, 3 examples, custom instructions, run.

Most coworkers end up with 3–6 Projects (AR follow-up, client doc nudge, status update, compliance reply, internal handoff) and cover 70%+ of their routine email writing.`,
    },
  ],
  pitfalls: [
    "Trying to automate ALL your email at once. Pick one type, prove it, expand.",
    "Skipping the custom instructions step — without them, Claude writes generic emails that don't sound like you.",
    "Trusting first drafts blindly. Always read before sending. Always.",
    "Pasting sensitive client financial details into Claude without checking with your data policy first. (For most BrookHaven workflows this is fine on Claude.ai — but ask if you're unsure.)",
  ],
  relatedTutorialSlugs: [
    "claude-skill-bh-voice",
    "shared-inbox-triage",
    "qbo-ar-followup",
  ],
};

export const pdfSummary30sec: Tutorial = {
  slug: "pdf-summary-30sec",
  title: "PDF summary in 30 seconds",
  subtitle:
    "Stop reading 60-page docs end-to-end when you only need the key terms.",
  emoji: "📄",
  format: "Prompt",
  difficulty: "Beginner",
  timeEstimate: "5 minutes to learn, 30 seconds per PDF after",
  audienceRoleIds: [
    "tax-lead",
    "legal-ops-director",
    "paralegal",
    "accounting-lead",
    "client-resource-specialist",
    "admin-manager",
    "strategy-lead",
  ],
  themeIds: ["document-review"],
  toolIds: ["adobe-pdf"],
  aiTools: ["Claude.ai"],
  prerequisites: [
    "A Claude.ai account",
    "A PDF you need to understand quickly (a trust doc, contract, K-1, brokerage statement, IRS letter — anything)",
  ],
  whenToUse:
    "Any time you're handed a multi-page PDF and the question is 'what do I need to know from this?' rather than 'I need to read every word.'",
  whenNotToUse:
    "When you ARE the final reviewer of the document and accuracy at the word level is required (e.g., reviewing an estate doc you're signing off on). Use Claude to find the spots that need close reading, then do the close reading yourself.",
  steps: [
    {
      title: "Open Claude.ai and start a new chat",
      body: `Just claude.ai → New chat. No project setup needed for one-off summaries.`,
    },
    {
      title: "Drag the PDF into the chat (or click the paperclip)",
      body: `Claude reads multi-page PDFs natively. Up to ~100 pages comfortably. You'll see the file attach with a tiny preview.

If the PDF is a scan (image-based, not text), Claude still reads it — handwriting and low-quality scans work fine for summarization, though precise data extraction can be wobblier.`,
      callout: {
        variant: "info",
        body: "Files you upload to Claude.ai stay in your chat session. They're not used to train models. For very sensitive client docs, check your firm's data policy if unsure.",
      },
    },
    {
      title: "Ask the right question — not 'summarize'",
      body: `"Summarize this" produces a generic blob. **Ask for what you actually need.** Use one of these starter prompts:`,
      prompt: `Read this trust document. Produce:

1. **Settlor, trustee, beneficiaries** (just the names)
2. **Key terms summary** (5 bullets max)
3. **Trustee powers** (list, with the section number for each)
4. **Any non-standard clauses** that I should flag for a lawyer review
5. **Termination conditions** (when does the trust end?)

Keep it under 300 words total.`,
    },
    {
      title: "For tax/financial docs, use this prompt instead",
      body: `K-1s, brokerage statements, 1099s, and other tax source docs work better with a structured extraction prompt:`,
      prompt: `Read this PDF and extract every numeric value that would feed into a tax return. For each:

- What it is (e.g., "Box 1 — Ordinary dividends")
- The dollar amount
- Which form/schedule it goes on

Output as a table. If anything is ambiguous, flag it with "REVIEW:" at the start of the row.`,
    },
    {
      title: "For contracts, ask for a redline-style comparison",
      body: `If you're reviewing a new contract against a standard template, paste both PDFs (or one PDF + a description of your standard) and ask:`,
      prompt: `Compare the attached contract against the BrookHaven standard MSA. Produce a table:

| Section | What this contract says | What our standard says | Why it matters |

Flag anything that's:
- More restrictive than our standard
- Missing a clause we always include
- Using non-standard language that could be interpreted multiple ways

Don't comment on identical sections.`,
      callout: {
        variant: "tip",
        body: "If you do this redline workflow more than once a week, build it into a Claude Project so you don't have to re-explain 'our standard MSA' every time.",
      },
    },
    {
      title: "Use the answer to decide where to read closely",
      body: `Claude's summary is the **map**, not the destination. You don't trust it as final — you use it to find the 2 pages that need your careful read.

Workflow: read Claude's summary → open the PDF at the flagged sections → read those carefully → make your call.`,
    },
    {
      title: "Save the good prompts in a personal note",
      body: `Keep a small text file or Notion page titled "My Claude PDF prompts." Every time you find a prompt that gives you a great summary, save it. Within a month you'll have 5-10 prompts that cover most of your PDF work.`,
    },
  ],
  pitfalls: [
    "Trusting the summary as your final read for documents you're signing off on. The summary is a map, not the destination.",
    "Asking 'summarize this' instead of asking for what you specifically need. Specific prompts = useful answers.",
    "Forgetting that Claude can read scans. It can. Try it even on bad photocopies.",
    "Re-uploading the same template doc to every chat. Use Claude Projects with the template in Knowledge instead.",
  ],
  relatedTutorialSlugs: [
    "estate-doc-review",
    "contract-redline",
    "tax-source-doc-checklist",
  ],
};

export const claudeSkillBhVoice: Tutorial = {
  slug: "claude-skill-bh-voice",
  title: "Build the 'BrookHaven voice' Claude Skill",
  subtitle:
    "A reusable skill that captures our tone, signatures, and standard phrasings — so every BrookHaven-er sounds like a BrookHaven-er.",
  emoji: "🎤",
  format: "Skill",
  difficulty: "Intermediate",
  timeEstimate: "30 minutes to build, lifetime use",
  audienceRoleIds: [
    "tax-lead",
    "legal-ops-director",
    "accounting-lead",
    "admin-manager",
    "strategy-lead",
  ],
  themeIds: ["email-triage"],
  toolIds: ["outlook", "telegram"],
  aiTools: ["Claude.ai (Skills feature)", "Claude Cowork"],
  prerequisites: [
    "A Claude.ai account (Skills is available on Pro / Team / Enterprise plans)",
    "10 example BrookHaven emails or messages that show 'our voice' — collected from current staff",
    "Agreement from leadership on what 'BrookHaven voice' actually is (5 minutes; usually obvious)",
  ],
  whenToUse:
    "When you want everyone at BrookHaven to produce consistent-sounding written communication — client emails, status updates, internal handoffs, social posts. Build it once, everyone uses it.",
  whenNotToUse:
    "For deeply personal communication (a sensitive HR conversation, a personal note of condolence). Voice consistency is good for routine work, not for moments that should feel human and individual.",
  steps: [
    {
      title: "What a Claude Skill actually is",
      body: `A **Skill** is a small, named bundle of instructions + reference material that Claude can pick up when relevant — like a stored playbook. Unlike Project knowledge, Skills are reusable across many Projects and chats.

For BrookHaven, the "voice" skill is the perfect starter Skill. It encodes:
- Our tone (friendly, professional, low fluff)
- Standard sign-offs and signatures
- Phrasings we use ("Just confirming…" not "I am writing to inform you that…")
- Things we DON'T say ("synergize," "circle back," "best regards")`,
    },
    {
      title: "Collect 10 example communications",
      body: `Ask 3-4 senior staff to send you 2-3 of their best client emails — the ones they're proud of. Mix in a few internal Telegram messages too.

You want to see variety: AR follow-up, client doc request, internal status update, social post, compliance reply. The skill learns the COMMON thread across them.`,
    },
    {
      title: "Read through the examples and write down what you see",
      body: `Open a doc. As you read each example, jot:

- What's the average sentence length?
- Does the writer use first-person ("I'll send that over") or third-person ("BrookHaven will be in touch")?
- Are paragraphs short (2-3 lines) or long?
- What's the sign-off style?
- Are there phrases that appear in 3+ examples?

After 10 examples you'll have a clear picture. Most BrookHaven writing tends to be: short paragraphs, first-person, friendly-but-direct, no corporate filler.`,
    },
    {
      title: "Go to Claude.ai → Skills → New Skill",
      body: `In Claude.ai, click your profile → **Settings** → **Skills** → **+ New Skill**.

Name: \`BrookHaven voice\`
Description: \`Apply when drafting any external or internal BrookHaven communication — emails, Telegram, social posts, status updates. Captures our tone and standard phrasings.\``,
      callout: {
        variant: "info",
        body: "The description is what Claude reads to decide whether to use the skill. Make it specific — 'BrookHaven communications' is better than 'writing'.",
      },
    },
    {
      title: "Write the skill body using this template",
      body: `Paste this into the skill body and adjust for what you actually saw in the examples:`,
      prompt: `# BrookHaven Voice

Apply this skill when drafting any communication that goes out under the BrookHaven name — emails, Telegram posts, social, internal status updates, client newsletters.

## Tone

- **Friendly and professional, no corporate-speak.** We sound like a person, not a brochure.
- **Direct.** State the ask or update in the first sentence. No "I hope this finds you well."
- **Confident without being stiff.** "Let me know what works" beats "Please advise at your earliest convenience."

## Voice details

- First-person ("I'll send that over") for individual writers; "we" only when speaking on behalf of the firm.
- Short paragraphs (2-3 lines max).
- Active voice: "We sent the docs" not "The docs were sent."
- Contractions are fine. "We'll" beats "We will."

## Sign-offs

- Internal Telegram: no sign-off, just first name if anything ("- Lisa")
- External email: "Thanks, [First Name]" — never "Best regards," "Sincerely," or "Warm regards"
- Cold/formal external (first time meeting a regulator, court filing context): "Best, [First Name]" is OK

## Words we don't use

- "synergy," "synergize," "synergistic"
- "circle back"
- "leverage" (as a verb)
- "at your earliest convenience"
- "moving forward" (use "going forward" or just say what's next)
- "kindly" ("kindly send" is corporate)
- "please find attached" ("Attached is…" or "I've attached…")

## Phrases we DO use

- "Just confirming…" (opening a quick check-in)
- "Let me know what works" (closing with options)
- "Here's what I've got so far" (sharing an in-progress draft)
- "Quick question — " (for one-line asks)
- "On it" / "Got it" (acknowledgment in chat)

## Length

- Email: under 120 words unless the content requires more.
- Telegram: under 40 words ideally. One paragraph max.
- Status update: 3 short paragraphs (what happened, what's next, what I need from you).

## When in doubt

If a draft sounds like something a generic SaaS company would send, rewrite it like a human friend would say it.`,
    },
    {
      title: "Save the skill and test it on a fresh draft",
      body: `Save the skill. Start a new chat. Don't reference the skill explicitly — Claude should pick it up based on the description.

Try a prompt like:`,
      prompt: `Draft an email to a client confirming we received their Q1 documents and outlining what we'll do next. The client is BrightPoint, contact is Sarah, we got everything except the bank reconciliation for Feb.`,
    },
    {
      title: "Read the output — does it sound like BrookHaven?",
      body: `If yes: you're done. Share the skill with the team.

If no: figure out what's off. Is it too formal? Too long? Wrong sign-off? Go back to the skill body and add a rule. Re-test. Iterate.

Most skills get to "this sounds right" in 2-3 iterations.`,
    },
    {
      title: "Share with the team",
      body: `In Claude.ai's Skills settings, you can share a skill with your team (Team / Enterprise plans).

Send a short Telegram message: *"New shared skill called 'BrookHaven voice' — apply it whenever you're drafting anything that goes out under our name. It captures our tone."*`,
    },
    {
      title: "Review quarterly",
      body: `Voice drifts. New hires bring different patterns. Set a calendar reminder to review the skill every quarter — pull 5 fresh examples, see if the skill still matches, update if not.`,
    },
  ],
  pitfalls: [
    "Writing the skill body in generic 'be professional' language. The whole value is in being SPECIFIC about phrasings we do and don't use.",
    "Skipping the example-collection step. Without seeing real BrookHaven writing, you'll guess wrong about what our voice actually is.",
    "Sharing the skill before testing it on 5+ realistic drafts.",
    "Treating the skill as a finished artifact. Voice evolves. Review quarterly.",
  ],
  relatedTutorialSlugs: ["email-first-draft", "social-media-drafting"],
};

export const universalTutorials = [
  emailFirstDraft,
  pdfSummary30sec,
  claudeSkillBhVoice,
];
