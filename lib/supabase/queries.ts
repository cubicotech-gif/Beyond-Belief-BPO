import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseServer } from "./server";
import type {
  ContactSubmission,
  GalleryImage,
  SiteImage,
  TeamMember,
  TeamSection,
} from "./types";

/**
 * Throwing during a server-render in Next would 500 the whole page.
 * Instead we log loudly and return empty data so pages still render
 * with placeholders — but failures are visible in Vercel logs and
 * via the /admin/diagnostics tool.
 */
function logQueryFailure(where: string, err: unknown) {
  // eslint-disable-next-line no-console
  console.error(`[supabase] ${where} failed:`, err);
}

export async function getAllSiteImages(): Promise<Record<string, SiteImage>> {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase.from("site_images").select("*");
    if (error) throw error;
    const map: Record<string, SiteImage> = {};
    for (const row of data ?? []) map[row.slot] = row as SiteImage;
    return map;
  } catch (err) {
    logQueryFailure("getAllSiteImages", err);
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
  } catch (err) {
    logQueryFailure(`getSiteImage(${slot})`, err);
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
  } catch (err) {
    logQueryFailure("getTeamMembers", err);
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
  } catch (err) {
    logQueryFailure("getGalleryImages", err);
    return [];
  }
}

/**
 * Admin-only: contact form submissions, newest first. Uses noStore so the
 * admin inbox always reflects the latest messages.
 */
export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  noStore();
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as ContactSubmission[];
  } catch (err) {
    logQueryFailure("getContactSubmissions", err);
    return [];
  }
}

/**
 * Used by /admin/diagnostics to surface exactly why a page is empty.
 * Returns the live state of env, db connectivity, and storage.
 */
export type DiagnosticsReport = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: boolean;
    SUPABASE_SERVICE_ROLE_KEY: boolean;
    SUPABASE_STORAGE_BUCKET: string;
    ADMIN_PASSWORD: boolean;
    ADMIN_SESSION_SECRET: boolean;
  };
  tables: {
    site_images: { ok: boolean; count: number; error?: string };
    team_members: { ok: boolean; count: number; error?: string };
    gallery_images: { ok: boolean; count: number; error?: string };
  };
  bucket: { ok: boolean; public: boolean; sampleUrl?: string; error?: string };
  sampleSiteImages: { slot: string; url: string; reachable: boolean | null }[];
};

export async function runDiagnostics(): Promise<DiagnosticsReport> {
  noStore();
  const env = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_STORAGE_BUCKET: process.env.SUPABASE_STORAGE_BUCKET || "site-images",
    ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
    ADMIN_SESSION_SECRET: !!process.env.ADMIN_SESSION_SECRET,
  };

  const tables: DiagnosticsReport["tables"] = {
    site_images: { ok: false, count: 0 },
    team_members: { ok: false, count: 0 },
    gallery_images: { ok: false, count: 0 },
  };
  const bucket: DiagnosticsReport["bucket"] = { ok: false, public: false };
  const sampleSiteImages: DiagnosticsReport["sampleSiteImages"] = [];

  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return { env, tables, bucket, sampleSiteImages };
  }

  try {
    const supabase = getSupabaseServer();

    for (const t of ["site_images", "team_members", "gallery_images"] as const) {
      const { count, error } = await supabase
        .from(t)
        .select("*", { count: "exact", head: true });
      if (error) tables[t] = { ok: false, count: 0, error: error.message };
      else tables[t] = { ok: true, count: count ?? 0 };
    }

    const { data: bucketInfo, error: bucketErr } = await supabase
      .storage
      .getBucket(env.SUPABASE_STORAGE_BUCKET);
    if (bucketErr) {
      bucket.error = bucketErr.message;
    } else if (bucketInfo) {
      bucket.ok = true;
      bucket.public = !!bucketInfo.public;
    }

    const { data: imgs } = await supabase
      .from("site_images")
      .select("slot, url")
      .limit(3);
    for (const row of (imgs ?? []) as { slot: string; url: string }[]) {
      let reachable: boolean | null = null;
      try {
        const head = await fetch(row.url, { method: "HEAD", cache: "no-store" });
        reachable = head.ok;
      } catch {
        reachable = false;
      }
      sampleSiteImages.push({ slot: row.slot, url: row.url, reachable });
    }
    if (!bucket.sampleUrl && sampleSiteImages[0]) {
      bucket.sampleUrl = sampleSiteImages[0].url;
    }
  } catch (err: any) {
    if (!tables.site_images.ok) tables.site_images.error = err?.message;
  }

  return { env, tables, bucket, sampleSiteImages };
}
