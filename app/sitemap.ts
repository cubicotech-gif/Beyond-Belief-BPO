import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://beyondbeliefbpo.co";

// A sitemap lets well-behaved crawlers discover the 6 real pages in one pass
// instead of repeatedly probing/guessing URLs — fewer wasted edge requests.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/team", "/careers", "/gallery", "/contact"];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
