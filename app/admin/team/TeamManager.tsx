"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import ImageUpload from "../_components/ImageUpload";
import type { TeamMember, TeamSection } from "@/lib/supabase/types";

const sectionOptions: { value: TeamSection; label: string }[] = [
  { value: "core", label: "Core Team" },
  { value: "hods", label: "Heads of Departments" },
  { value: "permanent", label: "Permanent Members" },
];

type Draft = {
  section: TeamSection;
  name: string;
  role: string;
  photo_url: string;
  storage_path: string;
  order_index: number;
};

const emptyDraft: Draft = {
  section: "core",
  name: "",
  role: "",
  photo_url: "",
  storage_path: "",
  order_index: 0,
};

export default function TeamManager({ initialMembers }: { initialMembers: TeamMember[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [busy, setBusy] = useState(false);

  async function addMember(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.name.trim() || !draft.role.trim()) return;
    setBusy(true);
    try {
      await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      setDraft(emptyDraft);
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function deleteMember(id: string) {
    if (!confirm("Remove this team member?")) return;
    await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
    router.refresh();
  }

  const grouped: Record<TeamSection, TeamMember[]> = {
    core: [],
    hods: [],
    permanent: [],
  };
  for (const m of initialMembers) grouped[m.section].push(m);

  return (
    <div className="mt-12">
      {/* Add new */}
      <div className="bg-ink text-paper p-8 mb-12">
        <p className="eyebrow text-crimson mb-2">New Member</p>
        <h2 className="headline text-3xl text-paper mb-6">
          Add to the <span className="headline-italic">team.</span>
        </h2>

        <form onSubmit={addMember} className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-4">
            <ImageUpload
              folder="team"
              aspectClass="aspect-[3/4]"
              value={draft.photo_url || null}
              onUploaded={(url, path) =>
                setDraft({ ...draft, photo_url: url, storage_path: path })
              }
            />
          </div>

          <div className="md:col-span-8 space-y-4">
            <Field label="Name">
              <input
                type="text"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                required
                className="w-full bg-transparent border-b border-paper/20 py-2.5 text-paper focus:outline-none focus:border-crimson"
              />
            </Field>
            <Field label="Role / Title">
              <input
                type="text"
                value={draft.role}
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                required
                className="w-full bg-transparent border-b border-paper/20 py-2.5 text-paper focus:outline-none focus:border-crimson"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Section">
                <select
                  value={draft.section}
                  onChange={(e) =>
                    setDraft({ ...draft, section: e.target.value as TeamSection })
                  }
                  className="w-full bg-transparent border-b border-paper/20 py-2.5 text-paper focus:outline-none focus:border-crimson"
                >
                  {sectionOptions.map((o) => (
                    <option key={o.value} value={o.value} className="bg-ink">
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Order">
                <input
                  type="number"
                  value={draft.order_index}
                  onChange={(e) =>
                    setDraft({ ...draft, order_index: Number(e.target.value) || 0 })
                  }
                  className="w-full bg-transparent border-b border-paper/20 py-2.5 text-paper focus:outline-none focus:border-crimson"
                />
              </Field>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center gap-2 px-6 py-3 bg-crimson text-paper rounded-full text-sm font-medium hover:bg-paper hover:text-ink transition-colors disabled:opacity-60"
            >
              <Plus size={16} /> {busy ? "Adding…" : "Add member"}
            </button>
          </div>
        </form>
      </div>

      {/* Existing */}
      {sectionOptions.map((s) => (
        <div key={s.value} className="mb-12">
          <div className="flex items-end justify-between mb-6 border-b border-paper-line pb-3">
            <h3 className="headline text-2xl text-ink">{s.label}</h3>
            <p className="eyebrow text-muted-dark">{grouped[s.value].length} members</p>
          </div>

          {grouped[s.value].length === 0 ? (
            <p className="body-text text-ink/40 italic text-sm">
              No members yet — add one above.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {grouped[s.value].map((m) => (
                <div key={m.id} className="bg-paper border border-paper-line group">
                  <div className="aspect-[3/4] bg-ink relative overflow-hidden">
                    {m.photo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={m.photo_url}
                        alt={m.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-paper/30 text-xs eyebrow">
                        No photo
                      </div>
                    )}
                    <button
                      onClick={() => deleteMember(m.id)}
                      className="absolute top-2 right-2 bg-ink/80 hover:bg-crimson text-paper p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="eyebrow text-crimson text-[0.6rem] mb-1">{m.role}</p>
                    <p className="headline text-lg text-ink">{m.name}</p>
                    <p className="body-text text-ink/40 text-xs mt-1">
                      Order: {m.order_index}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow text-paper/50 mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}
