export type SiteImage = {
  id: string;
  slot: string;
  url: string;
  alt: string | null;
  storage_path: string | null;
  updated_at: string;
};

export type TeamSection = "core" | "hods" | "permanent";

export type TeamMember = {
  id: string;
  section: TeamSection;
  name: string;
  role: string;
  photo_url: string | null;
  storage_path: string | null;
  order_index: number;
  created_at: string;
};

export type GalleryImage = {
  id: string;
  url: string;
  caption: string | null;
  storage_path: string | null;
  order_index: number;
  created_at: string;
};

/**
 * Fixed image slots used across the site. The admin UI lists these
 * so each slot can be uploaded independently.
 */
export const SITE_IMAGE_SLOTS: { slot: string; label: string; description: string }[] = [
  {
    slot: "home_hero_bg",
    label: "Home — Hero background",
    description: "Optional full-bleed background image behind the home hero headline.",
  },
  {
    slot: "home_team_1",
    label: "Home — Team teaser #1 (Managing Director)",
    description: "Featured portrait shown on the homepage team teaser.",
  },
  {
    slot: "home_team_2",
    label: "Home — Team teaser #2 (Team Lead)",
    description: "Featured portrait shown on the homepage team teaser.",
  },
  {
    slot: "home_team_3",
    label: "Home — Team teaser #3 (Head HR)",
    description: "Featured portrait shown on the homepage team teaser.",
  },
  {
    slot: "about_hero",
    label: "About — Hero image",
    description: "Optional editorial image on the About page.",
  },
  {
    slot: "gallery_featured",
    label: "Gallery — Featured album cover",
    description: "Large image at the top of the gallery page.",
  },
];
