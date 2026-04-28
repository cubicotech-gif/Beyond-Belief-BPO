import { getGalleryImages } from "@/lib/supabase/queries";
import GalleryManager from "./GalleryManager";

export const dynamic = "force-dynamic";

export default async function GalleryAdminPage() {
  const images = await getGalleryImages();
  return (
    <div className="px-10 py-12 max-w-6xl">
      <p className="eyebrow text-crimson mb-4">Manage</p>
      <h1 className="headline text-5xl text-ink leading-[0.95]">
        The <span className="headline-italic">Gallery.</span>
      </h1>
      <p className="body-text text-ink/60 mt-6 max-w-xl">
        Upload photos in any quantity. They appear on the public Gallery page
        ordered by the order index, then upload date.
      </p>

      <GalleryManager initial={images} />
    </div>
  );
}
