import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { revalidateGallery } from "@/lib/supabase/revalidate";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    url?: string;
    caption?: string;
    storage_path?: string;
    order_index?: number;
  };

  if (!body.url) {
    return NextResponse.json({ error: "url required" }, { status: 400 });
  }

  const supabase = getSupabaseServer();
  const { error, data } = await supabase
    .from("gallery_images")
    .insert({
      url: body.url,
      caption: body.caption || null,
      storage_path: body.storage_path || null,
      order_index: Number(body.order_index) || 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateGallery();
  return NextResponse.json({ image: data });
}
