"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Mail } from "lucide-react";
import type { ContactSubmission } from "@/lib/supabase/types";

export default function SubmissionsList({
  initial,
}: {
  initial: ContactSubmission[];
}) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    setBusyId(id);
    try {
      await fetch(`/api/admin/submissions/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  if (initial.length === 0) {
    return (
      <p className="body-text text-ink/40 italic text-sm mt-12">
        No messages yet. Submissions from the contact form will appear here.
      </p>
    );
  }

  return (
    <div className="mt-12 space-y-4">
      {initial.map((s) => (
        <div
          key={s.id}
          className="bg-paper border border-paper-line p-6 flex gap-5"
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="headline text-xl text-ink">{s.name}</p>
              <a
                href={`mailto:${s.email}?subject=Re: ${encodeURIComponent(
                  s.subject
                )}`}
                className="body-text text-sm text-crimson hover:underline inline-flex items-center gap-1"
              >
                <Mail size={13} /> {s.email}
              </a>
              <span className="eyebrow text-muted-dark ml-auto">
                {new Date(s.created_at).toLocaleString()}
              </span>
            </div>
            <p className="eyebrow text-muted-dark mt-4 mb-1">Subject</p>
            <p className="body-text text-ink">{s.subject}</p>
            <p className="eyebrow text-muted-dark mt-4 mb-1">Message</p>
            <p className="body-text text-ink/80 whitespace-pre-wrap">
              {s.message}
            </p>
          </div>
          <button
            onClick={() => remove(s.id)}
            disabled={busyId === s.id}
            className="self-start shrink-0 text-ink/30 hover:text-crimson transition-colors disabled:opacity-40"
            aria-label="Delete message"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
