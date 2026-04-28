import { getAllSiteImages } from "@/lib/supabase/queries";
import { SITE_IMAGE_SLOTS } from "@/lib/supabase/types";
import SiteImageEditor from "./SiteImageEditor";

export const dynamic = "force-dynamic";

export default async function SiteImagesPage() {
  const map = await getAllSiteImages();

  return (
    <div className="px-10 py-12 max-w-6xl">
      <p className="eyebrow text-crimson mb-4">Manage</p>
      <h1 className="headline text-5xl text-ink leading-[0.95]">
        Site <span className="headline-italic">Images.</span>
      </h1>
      <p className="body-text text-ink/60 mt-6 max-w-xl">
        Each slot below corresponds to a fixed image position on the public
        site. Upload to fill it; clear to revert to the styled placeholder.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {SITE_IMAGE_SLOTS.map((s) => (
          <SiteImageEditor
            key={s.slot}
            slot={s.slot}
            label={s.label}
            description={s.description}
            initialUrl={map[s.slot]?.url ?? null}
            initialAlt={map[s.slot]?.alt ?? ""}
          />
        ))}
      </div>
    </div>
  );
}
