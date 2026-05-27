import { Link, useParams } from "react-router-dom";
import { roles, rolesById, tutorialsBySlug, tutorialsForRole } from "@/content";
import { RoleCard, TutorialCard } from "@/components/cards";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function RolesIndex() {
  return (
    <div>
      <Breadcrumbs crumbs={[{ label: "Home", to: "/" }, { label: "By role" }]} />
      <h1 className="text-3xl font-bold text-slate-900 mb-3">
        Find your role
      </h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        Each role has its top pain points and a curated "first win" tutorial —
        the single highest-payoff workflow to try this week.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((r) => (
          <RoleCard key={r.id} role={r} />
        ))}
      </div>
    </div>
  );
}

export function RoleDetail() {
  const { roleId } = useParams();
  const role = roleId ? rolesById[roleId] : undefined;

  if (!role) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-3">Role not found</h1>
        <Link to="/roles" className="text-brand-700 hover:underline">
          ← Back to all roles
        </Link>
      </div>
    );
  }

  const recommended = role.recommendedTutorialSlugs
    .map((s) => tutorialsBySlug[s])
    .filter(Boolean);
  const others = tutorialsForRole(role.id).filter(
    (t) => !role.recommendedTutorialSlugs.includes(t.slug),
  );

  return (
    <article>
      <Breadcrumbs
        crumbs={[
          { label: "Home", to: "/" },
          { label: "By role", to: "/roles" },
          { label: role.title },
        ]}
      />
      <header className="mb-8">
        <div className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-2">
          {role.department}
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">{role.title}</h1>
        <p className="text-lg text-slate-600 leading-relaxed">{role.oneLiner}</p>
      </header>

      <section className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-5 mb-8">
        <div className="text-xs uppercase tracking-wider text-amber-900 font-semibold mb-1">
          ⭐ Your first win
        </div>
        <p className="text-slate-800 leading-relaxed">{role.firstWin}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          Top pain points
        </h2>
        <ul className="space-y-2">
          {role.topPainPoints.map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-slate-700"
            >
              <span
                className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-slate-400"
                aria-hidden="true"
              />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {recommended.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Recommended tutorials (start here)
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommended.map((t) => (
              <TutorialCard key={t.slug} tutorial={t} />
            ))}
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Also relevant for your role
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((t) => (
              <TutorialCard key={t.slug} tutorial={t} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
