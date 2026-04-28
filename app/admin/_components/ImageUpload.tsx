"use client";

import { useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";

type Props = {
  /** Current image URL, if one is already saved. */
  value?: string | null;
  /** Called with the public URL after successful upload. */
  onUploaded: (url: string, storagePath: string) => void;
  /** Optional namespace folder inside the bucket (e.g. "team", "gallery"). */
  folder?: string;
  /** Optional accept attr; defaults to images. */
  accept?: string;
  /** Aspect class for preview frame. */
  aspectClass?: string;
};

export default function ImageUpload({
  value,
  onUploaded,
  folder = "misc",
  accept = "image/*",
  aspectClass = "aspect-[4/3]",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value ?? null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    try {
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);

      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);

      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.json()).error || "Upload failed");
      const json = (await res.json()) as { url: string; path: string };
      setPreview(json.url);
      onUploaded(json.url, json.path);
    } catch (e: any) {
      setError(e.message || "Upload failed");
      setPreview(value ?? null);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div
        className={`relative ${aspectClass} bg-ink overflow-hidden border border-paper-line group`}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-paper/40 gap-2">
            <UploadCloud size={28} />
            <span className="eyebrow">No image yet</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="absolute inset-0 bg-ink/0 hover:bg-ink/60 transition-colors flex items-center justify-center text-paper opacity-0 hover:opacity-100 disabled:opacity-40"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-crimson rounded-full text-xs eyebrow">
            <UploadCloud size={14} /> {busy ? "Uploading…" : preview ? "Replace" : "Upload"}
          </span>
        </button>

        {preview && !busy && (
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              onUploaded("", "");
            }}
            className="absolute top-2 right-2 bg-ink/70 hover:bg-crimson text-paper p-1.5 rounded-full"
            aria-label="Clear image"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />

      {error && <p className="body-text text-crimson text-xs mt-2">{error}</p>}
    </div>
  );
}
