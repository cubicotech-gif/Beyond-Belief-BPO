import { getSupabaseServer } from "./server";
import type { GalleryImage, SiteImage, TeamMember, TeamSection } from "./types";

export async function getAllSiteImages(): Promise<Record<string, SiteImage>> {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase.from("site_images").select("*");
    if (error) throw error;
    const map: Record<string, SiteImage> = {};
    for (const row of data ?? []) map[row.slot] = row as SiteImage;
    return map;
  } catch {
    return {};
  }
}

export async function getSiteImage(slot: string): Promise<SiteImage | null> {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("site_images")
      .select("*")
      .eq("slot", slot)
      .maybeSingle();
    if (error) throw error;
    return (data as SiteImage) ?? null;
  } catch {
    return null;
  }
}

export async function getTeamMembers(): Promise<Record<TeamSection, TeamMember[]>> {
  const grouped: Record<TeamSection, TeamMember[]> = {
    core: [],
    hods: [],
    permanent: [],
  };
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("section", { ascending: true })
      .order("order_index", { ascending: true });
    if (error) throw error;
    for (const m of (data ?? []) as TeamMember[]) {
      grouped[m.section].push(m);
    }
  } catch {
    // fall through with empty groups
  }
  return grouped;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as GalleryImage[];
  } catch {
    return [];
  }
}
