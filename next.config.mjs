/** @type {import('next').NextConfig} */
const supabaseHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "").hostname || null;
  } catch {
    return null;
  }
})();

const remotePatterns = [
  { protocol: "https", hostname: "images.unsplash.com" },
];

if (supabaseHost) {
  remotePatterns.push({
    protocol: "https",
    hostname: supabaseHost,
    pathname: "/storage/v1/object/public/**",
  });
}

const nextConfig = {
  images: { remotePatterns },
};

export default nextConfig;
