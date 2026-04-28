"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Trash2 } from "lucide-react";
import type { GalleryImage } from "@/lib/supabase/types";

export default function GalleryManager({ initial }: { initial: GalleryImage[] }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

  async function handleFiles(files: FileList) {
    if (files.length === 0) return;
    setBusy(true);
    setProgress({ done: 0, total: files.length });
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", "gallery");
        const upload = await fetch("/api/admin/upload", { method: "POST", body: fd });
        if (!upload.ok) continue;
        const { url, path } = (await upload.json()) as { url: string; path: string };
        await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url,
            storage_path: path,
            caption: "",
            order_index: initial.length + i,
          }),
        });
        setProgress({ done: i + 1, total: files.length });
      }
      router.refresh();
    } finally {
      setBusy(false);
      setProgress(null);
    }
  }

  async function deleteImage(id: string) {
    if (!confirm("Delete this image?")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="mt-12">
      {/* Drop zone */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="w-full bg-ink text-paper py-16 border-2 border-dashed border-paper/20 hover:border-crimson hover:bg-ink-softer transition-colors flex flex-col items-center justify-center gap-3 disabled:opacity-60"
      >
        <UploadCloud size={32} className="text-crimson" />
        <p className="headline text-2xl">
          {busy && progress
            ? `Uploading ${progress.done} / ${progress.total}…`
            : "Click to upload photos"}
        </p>
        <p className="body-text text-paper/50 text-sm">Multiple files supported · JPG, PNG, WebP</p>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {/* Grid */}
      <div className="mt-12">
        <div className="flex items-end justify-between mb-6 border-b border-paper-line pb-3">
          <h3 className="headline text-2xl text-ink">All photos</h3>
          <p className="eyebrow text-muted-dark">{initial.length} images</p>
        </div>

        {initial.length === 0 ? (
          <p className="body-text text-ink/40 italic text-sm">
            No photos yet — drop some in above.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {initial.map((g) => (
              <div key={g.id} className="relative group aspect-square bg-ink overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.url}
                  alt={g.caption || ""}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <button
                  onClick={() => deleteImage(g.id)}
                  className="absolute top-2 right-2 bg-ink/80 hover:bg-crimson text-paper p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/80 to-transparent p-3 text-paper text-xs eyebrow opacity-0 group-hover:opacity-100 transition-opacity">
                  #{g.order_index}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
