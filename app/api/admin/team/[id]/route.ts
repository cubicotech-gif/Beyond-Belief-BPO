import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServer, STORAGE_BUCKET } from "@/lib/supabase/server";
import { revalidateTeam } from "@/lib/supabase/revalidate";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = getSupabaseServer();

  const { data: existing } = await supabase
    .from("team_members")
    .select("storage_path")
    .eq("id", params.id)
    .maybeSingle();

  if (existing?.storage_path) {
    await supabase.storage.from(STORAGE_BUCKET).remove([existing.storage_path]);
  }

  const { error } = await supabase.from("team_members").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateTeam();
  return NextResponse.json({ ok: true });
}
