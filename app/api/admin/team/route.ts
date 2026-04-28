import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { revalidateTeam } from "@/lib/supabase/revalidate";
import type { TeamSection } from "@/lib/supabase/types";

const validSections: TeamSection[] = ["core", "hods", "permanent"];

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    section?: string;
    name?: string;
    role?: string;
    photo_url?: string;
    storage_path?: string;
    order_index?: number;
  };

  const section = (body.section || "core") as TeamSection;
  if (!validSections.includes(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }
  if (!body.name?.trim() || !body.role?.trim()) {
    return NextResponse.json({ error: "Name and role required" }, { status: 400 });
  }

  const supabase = getSupabaseServer();
  const { error, data } = await supabase
    .from("team_members")
    .insert({
      section,
      name: body.name.trim(),
      role: body.role.trim(),
      photo_url: body.photo_url || null,
      storage_path: body.storage_path || null,
      order_index: Number(body.order_index) || 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateTeam();
  return NextResponse.json({ member: data });
}
