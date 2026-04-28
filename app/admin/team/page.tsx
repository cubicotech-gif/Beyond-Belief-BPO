import { getTeamMembers } from "@/lib/supabase/queries";
import TeamManager from "./TeamManager";

export const dynamic = "force-dynamic";

export default async function TeamAdminPage() {
  const grouped = await getTeamMembers();
  const all = [...grouped.core, ...grouped.hods, ...grouped.permanent];

  return (
    <div className="px-10 py-12 max-w-6xl">
      <p className="eyebrow text-crimson mb-4">Manage</p>
      <h1 className="headline text-5xl text-ink leading-[0.95]">
        The <span className="headline-italic">Team.</span>
      </h1>
      <p className="body-text text-ink/60 mt-6 max-w-xl">
        Add team members with photos, names, and roles. They&apos;ll appear on
        the public Team page grouped by section.
      </p>

      <TeamManager initialMembers={all} />
    </div>
  );
}
