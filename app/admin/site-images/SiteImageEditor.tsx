"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "../_components/ImageUpload";
import { Check } from "lucide-react";

type Props = {
  slot: string;
  label: string;
  description: string;
  initialUrl: string | null;
  initialAlt: string;
};

export default function SiteImageEditor({ slot, label, description, initialUrl, initialAlt }: Props) {
  const router = useRouter();
  const [url, setUrl] = useState<string | null>(initialUrl);
  const [storagePath, setStoragePath] = useState<string>("");
  const [alt, setAlt] = useState(initialAlt);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function persist(nextUrl: string | null, nextPath: string | null, nextAlt: string) {
    setSaving(true);
    setSaved(false);
    try {
      if (!nextUrl) {
        await fetch(`/api/admin/site-images/${encodeURIComponent(slot)}`, {
          method: "DELETE",
        });
      } else {
        await fetch(`/api/admin/site-images/${encodeURIComponent(slot)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: nextUrl, alt: nextAlt, storage_path: nextPath }),
        });
      }
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 1500);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-paper border border-paper-line p-6">
      <p className="eyebrow text-crimson mb-2">{slot}</p>
      <h3 className="headline text-2xl text-ink mb-2">{label}</h3>
      <p className="body-text text-ink/60 text-sm mb-6">{description}</p>

      <ImageUpload
        value={url}
        folder={`site/${slot}`}
        aspectClass="aspect-[4/3]"
        onUploaded={(nextUrl, nextPath) => {
          const cleaned = nextUrl || null;
          setUrl(cleaned);
          setStoragePath(nextPath);
          persist(cleaned, nextPath || null, alt);
        }}
      />

      <label className="block mt-4">
        <span className="eyebrow text-muted-dark mb-2 block">Alt text</span>
        <input
          type="text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          onBlur={() => url && persist(url, storagePath || null, alt)}
          placeholder="Describe the image for accessibility"
          className="w-full bg-paper-softer border border-paper-line py-2 px-3 text-ink text-sm focus:outline-none focus:border-crimson"
        />
      </label>

      <div className="mt-3 h-5 flex items-center text-xs">
        {saving && <span className="text-ink/50">Saving…</span>}
        {saved && (
          <span className="text-crimson inline-flex items-center gap-1">
            <Check size={12} /> Saved
          </span>
        )}
      </div>
    </div>
  );
}
