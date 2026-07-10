import Link from "next/link";
import { ArrowUpRight, Image as ImageIcon, Users, Grid3x3 } from "lucide-react";
import { getAllSiteImages, getGalleryImages, getTeamMembers } from "@/lib/supabase/queries";
import { SITE_IMAGE_SLOTS } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const [siteImages, gallery, team] = await Promise.all([
    getAllSiteImages(),
    getGalleryImages(),
    getTeamMembers(),
  ]);

  const filledSlots = Object.keys(siteImages).length;
  const totalSlots = SITE_IMAGE_SLOTS.length;
  const teamCount = team.core.length + team.hods.length + team.permanent.length;

  const cards = [
    {
      href: "/admin/site-images",
      title: "Site Images",
      icon: ImageIcon,
      stat: `${filledSlots} / ${totalSlots}`,
      caption: "Hero & feature slots filled",
    },
    {
      href: "/admin/team",
      title: "Team",
      icon: Users,
      stat: `${teamCount}`,
      caption: "People across all sections",
    },
    {
      href: "/admin/gallery",
      title: "Gallery",
      icon: Grid3x3,
      stat: `${gallery.length}`,
      caption: "Photos uploaded",
    },
  ];

  return (
    <div className="px-10 py-12 max-w-5xl">
      <p className="eyebrow text-crimson mb-4">Welcome back</p>
      <h1 className="headline text-5xl text-ink leading-[0.95]">
        Manage <span className="headline-italic">your site.</span>
      </h1>
      <p className="body-text text-ink/60 mt-6 max-w-xl">
        Upload images, edit your team, and curate the gallery. Changes go live
        instantly on the public site.
      </p>

      <div className="grid md:grid-cols-3 gap-px bg-paper-line mt-12 border border-paper-line">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              prefetch={false}
              className="group bg-paper p-8 hover:bg-ink hover:text-paper transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-12">
                <Icon size={20} className="text-crimson" />
                <ArrowUpRight
                  size={16}
                  className="text-ink/30 group-hover:text-paper transition-colors"
                />
              </div>
              <p className="headline text-5xl text-ink group-hover:text-paper">
                {c.stat}
              </p>
              <p className="eyebrow text-crimson mt-4">{c.title}</p>
              <p className="body-text text-ink/60 group-hover:text-paper/60 text-sm mt-1">
                {c.caption}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <div className="bg-paper p-8 border border-paper-line">
          <p className="eyebrow text-crimson mb-3">Quick start</p>
          <h2 className="headline text-2xl text-ink mb-4">First time here?</h2>
          <ol className="body-text text-ink/70 text-sm space-y-2 list-decimal list-inside">
            <li>Run <code className="bg-paper-softer px-1.5 py-0.5">lib/supabase/schema.sql</code> in Supabase.</li>
            <li>Set <code className="bg-paper-softer px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="bg-paper-softer px-1.5 py-0.5">SUPABASE_SERVICE_ROLE_KEY</code>.</li>
            <li>Upload images from the panels on the left.</li>
            <li>Refresh the public site — placeholders will be replaced.</li>
          </ol>
        </div>
        <div className="bg-ink text-paper p-8">
          <p className="eyebrow text-crimson mb-3">Brand reminder</p>
          <p className="headline text-2xl mb-3">
            Black, white, <span className="headline-italic text-crimson">red.</span>
          </p>
          <p className="body-text text-paper/70 text-sm">
            High-impact imagery works best — strong contrast, confident faces,
            real moments. Avoid stock-feeling photos. Square or 3:4 portraits
            sit nicely in the team grid.
          </p>
        </div>
      </div>
    </div>
  );
}
