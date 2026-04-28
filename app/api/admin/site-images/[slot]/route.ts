import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServer, STORAGE_BUCKET } from "@/lib/supabase/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { slot: string } }
) {
  const slot = params.slot;
  const body = (await req.json()) as {
    url?: string;
    alt?: string | null;
    storage_path?: string | null;
  };

  if (!body.url) {
    return NextResponse.json({ error: "url required" }, { status: 400 });
  }

  const supabase = getSupabaseServer();
  const { error } = await supabase.from("site_images").upsert(
    {
      slot,
      url: body.url,
      alt: body.alt ?? null,
      storage_path: body.storage_path ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "slot" }
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { slot: string } }
) {
  const supabase = getSupabaseServer();

  const { data: existing } = await supabase
    .from("site_images")
    .select("storage_path")
    .eq("slot", params.slot)
    .maybeSingle();

  if (existing?.storage_path) {
    await supabase.storage.from(STORAGE_BUCKET).remove([existing.storage_path]);
  }

  const { error } = await supabase
    .from("site_images")
    .delete()
    .eq("slot", params.slot);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
