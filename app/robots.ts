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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Real search engines: crawl the site, but never the admin area.
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
      // Everything above gets fully disallowed.
      ...BLOCKED_BOTS.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
