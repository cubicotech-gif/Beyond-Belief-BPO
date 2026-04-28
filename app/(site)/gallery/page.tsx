import { getGalleryImages, getSiteImage } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery — Beyond Belief BPO",
  description: "Moments from life at Beyond Belief BPO.",
};

export default async function Gallery() {
  const [images, featured] = await Promise.all([
    getGalleryImages(),
    getSiteImage("gallery_featured"),
  ]);

  // If admin hasn't uploaded anything yet, show 9 styled placeholders.
  const showPlaceholders = images.length === 0;
  const items = showPlaceholders
    ? Array.from({ length: 9 }).map((_, i) => ({
        id: `ph-${i}`,
        url: null as string | null,
        caption: null as string | null,
        index: i,
      }))
    : images.map((g, i) => ({ id: g.id, url: g.url, caption: g.caption, index: i }));

  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <p className="eyebrow text-crimson mb-6">Moments</p>
          <h1 className="headline text-[clamp(3rem,12vw,10rem)] text-ink leading-[0.88]">
            <span className="headline-italic text-crimson">Gallery.</span>
          </h1>
        </div>
      </section>

      {/* RECENT TRIP CALLOUT + featured image */}
      <section className="border-t border-paper-line py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <p className="eyebrow text-crimson mb-4">Featured Album</p>
              <h2 className="headline text-4xl md:text-6xl text-ink leading-[1]">
                Our recent <span className="headline-italic">trip.</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="body-text text-ink/75">
                Our recent official trip to the company farmhouse went amazingly
                well. These are some fun clicks from our trip — moments that
                define what life at Beyond Belief feels like.
              </p>
            </div>
          </div>

          {featured?.url && (
            <div className="mt-12 aspect-[16/7] bg-ink relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.url}
                alt={featured.alt || ""}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* GRID */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`relative bg-ink overflow-hidden ${
                  item.index % 5 === 0
                    ? "aspect-[3/4]"
                    : item.index % 3 === 0
                    ? "aspect-square"
                    : "aspect-[4/3]"
                }`}
              >
                {item.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt={item.caption || ""}
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-paper/20 text-xs eyebrow">
                    Photo {String(item.index + 1).padStart(2, "0")}
                  </div>
                )}
              </div>
            ))}
          </div>

          {showPlaceholders && (
            <div className="text-center mt-16">
              <p className="eyebrow text-muted-dark mb-4">Awaiting Upload</p>
              <p className="body-text text-ink/60 text-sm max-w-md mx-auto">
                Sign in to the{" "}
                <a href="/admin/gallery" className="text-crimson hover:underline">
                  admin gallery panel
                </a>{" "}
                to replace these placeholders with real photos.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
