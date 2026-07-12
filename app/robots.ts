import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://beyondbeliefbpo.co";

// High-volume crawlers that cost edge requests without sending real users:
// SEO scrapers and AI training bots. Most of them honor robots.txt, so
// disallowing them removes a large chunk of the bot traffic hitting the site.
// (Bad bots that ignore robots.txt must be blocked at the Vercel Firewall.)
const BLOCKED_BOTS = [
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "DataForSeoBot",
  "Bytespider",
  "PetalBot",
  "BLEXBot",
  "SeekportBot",
  "serpstatbot",
  "MegaIndex",
  "ImagesiftBot",
  "Scrapy",
  "GPTBot",
  "CCBot",
  "ClaudeBot",
  "anthropic-ai",
  "Amazonbot",
  "meta-externalagent",
  "Applebot-Extended",
];

// Dead URLs from the old WordPress site that Google still has indexed and
// keeps re-crawling — every one 404s. Disallowing these stops Googlebot from
// fetching them at all, which is what was generating tens of thousands of
// cached-404 edge requests. None of these overlap the 6 real pages
// (/, /about, /team, /careers, /gallery, /contact).
const LEGACY_DISALLOW = [
  "/admin",
  "/api",
  "/*.php", // /index.php, /item.php, /content.php, /xmlrpc.php, ...
  "/blog", // /blog, /blog/1, /blog/2, ...
  "/items", // /items/U19..., old catalog URLs
  "/wp-admin",
  "/wp-content",
  "/wp-includes",
  "/.env",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Real search engines: crawl the live pages, but skip the admin area,
      // the API, and every dead legacy WordPress path.
      { userAgent: "*", allow: "/", disallow: LEGACY_DISALLOW },
      // Aggressive SEO/AI crawlers get fully disallowed.
      ...BLOCKED_BOTS.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
