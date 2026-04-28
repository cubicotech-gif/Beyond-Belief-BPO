import { revalidatePath } from "next/cache";

/**
 * Centralized list of public paths that depend on Supabase content.
 * Mutation API routes call this so admin writes appear on the live
 * site without waiting for any cache TTL.
 */
const PATHS_USING_SITE_IMAGES = ["/", "/about", "/gallery", "/team"];
const PATHS_USING_TEAM = ["/", "/team"];
const PATHS_USING_GALLERY = ["/gallery"];

export function revalidateSiteImages() {
  for (const p of PATHS_USING_SITE_IMAGES) revalidatePath(p);
}

export function revalidateTeam() {
  for (const p of PATHS_USING_TEAM) revalidatePath(p);
}

export function revalidateGallery() {
  for (const p of PATHS_USING_GALLERY) revalidatePath(p);
}
