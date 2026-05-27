import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout } from "@/components/Callout";

export function About() {
  return (
    <article>
      <Breadcrumbs crumbs={[{ label: "Home", to: "/" }, { label: "About" }]} />
      <h1 className="text-3xl font-bold text-slate-900 mb-3">About this hub</h1>
      <p className="text-lg text-slate-600 mb-8 max-w-2xl">
        Where the content comes from, how to use it, and where it's going next.
      </p>

      <section className="prose-bh max-w-3xl">
        <h2>Why this exists</h2>
        <p>
          Brookhaven is bringing Claude, Claude Cowork, and AI tooling into
          everyday work. The risk isn't whether AI <em>can</em> help — it can —
          it's whether the rollout actually lands with each coworker doing their
          actual job. Generic "AI tips for businesses" content doesn't land.
          Role-mapped, pain-mapped content does.
        </p>
        <p>
          This hub is the source-of-truth for how to use AI at BH, organized by
          three lenses:
        </p>
        <ul>
          <li>
            <strong>By pain theme</strong> — the 8 themes that came out of the
            coworker survey
          </li>
          <li>
            <strong>By role</strong> — what to try first if you're in a given
            position
          </li>
          <li>
            <strong>By tool</strong> — how Claude works with each thing in the
            BH stack (Outlook, Telegram, Dropbox, Adobe PDF, Monday, Teams, QBO)
          </li>
        </ul>

        <h2>How tutorials are written</h2>
        <p>
          Every tutorial has the same shape so they're predictable to read:
        </p>
        <ul>
          <li>When to use this / when NOT to use this</li>
          <li>Prerequisites</li>
          <li>Numbered steps with copyable prompts</li>
          <li>Common pitfalls to watch for</li>
          <li>Related tutorials</li>
        </ul>
        <p>
          The friendly tone is intentional. The audience is coworkers across
          mixed levels of technical comfort. Plain language wins.
        </p>

        <h2>The over-automation rule</h2>
        <p>
          Every client-facing automation needs a human gate. This rule is in
          response to the Legal Ops Director's direct warning in the survey —
          the ILIT board failure mode (automation ran, output was wrong, nobody
          noticed) is exactly what we're designing against. Tutorials that
          touch client-facing output always include a propose-don't-act
          pattern.
        </p>

        <h2>What's coming next</h2>
        <ul>
          <li>
            <strong>Weekly newsletter</strong> — every Monday, a short digest
            of what's new in Claude / Claude Cowork / AI tooling, framed in
            terms of BH workflows. Delivered via email + Telegram channel +
            5-10 min walkthrough at the Monday meeting.
          </li>
          <li>
            <strong>Per-role onboarding</strong> — when a new BH coworker
            joins, they'll get a personalized AI onboarding doc generated
            from their role + daily tasks.
          </li>
          <li>
            <strong>Cross-system semantic search</strong> — the #1
            highest-leverage build from the survey. The "find the Pinnacle wire
            setup conversation from last spring" workflow.
          </li>
        </ul>

        <h2>How to contribute</h2>
        <p>
          If you've figured out a Claude workflow that's saving you time, drop
          it in the #ai-adoption Telegram channel. We'll write it up as a
          tutorial.
        </p>
        <p>
          Found a pitfall we should warn people about? Same channel.
        </p>
      </section>

      <div className="mt-8 max-w-3xl">
        <Callout
          variant="info"
          title="A note on what's NOT here"
          body="If a tutorial isn't on this site, it's either because we haven't written it yet — or because we don't yet have a confident, safe-to-recommend approach. We'd rather leave a gap than ship a tutorial that produces wrong output at scale. If you need something not covered here, ask in #ai-adoption."
        />
      </div>
    </article>
  );
}
