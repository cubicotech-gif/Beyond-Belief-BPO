import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServer, STORAGE_BUCKET } from "@/lib/supabase/server";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

function safeFolder(input: string): string {
  return input.replace(/[^a-zA-Z0-9/_-]/g, "").slice(0, 80) || "misc";
}

function safeFilename(input: string): string {
  const base = input.split("/").pop() || "file";
  const cleaned = base.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  return cleaned || "file";
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file");
  const folder = safeFolder(String(form.get("folder") || "misc"));

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only images allowed" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 8 MB)" }, { status: 413 });
  }

  let supabase;
  try {
    supabase = getSupabaseServer();
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Supabase env vars not configured" },
      { status: 500 }
    );
  }

  const ext = (file.name.match(/\.[a-zA-Z0-9]+$/)?.[0] || ".bin").toLowerCase();
  const baseName = safeFilename(file.name.replace(/\.[a-zA-Z0-9]+$/, "")) || "image";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${baseName}${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: upErr } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (upErr) {
    // eslint-disable-next-line no-console
    console.error("[upload] storage upload failed", upErr);
    return NextResponse.json({ error: upErr.message }, { status: 500 });
  }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl, path });
}
