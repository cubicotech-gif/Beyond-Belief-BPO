export const metadata = {
  title: "Gallery — Beyond Belief BPO",
  description: "Moments from life at Beyond Belief BPO.",
};

// Placeholder grid — replace with real images from /public/images
const placeholders = Array.from({ length: 9 });

export default function Gallery() {
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

      {/* RECENT TRIP CALLOUT */}
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
        </div>
      </section>

      {/* GRID */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {placeholders.map((_, i) => (
              <div
                key={i}
                className={`relative bg-ink overflow-hidden ${
                  i % 5 === 0 ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-square" : "aspect-[4/3]"
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center text-paper/20 text-xs">
                  {/* Replace with <Image src="/images/Z62_xxxx.jpg" ... /> */}
                  Photo {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="eyebrow text-muted-dark mb-4">More Photos</p>
            <p className="body-text text-ink/60 text-sm max-w-md mx-auto">
              Drop your real photoshoot images (Z62_xxxx series from Nov 2023)
              into <code className="bg-paper-softer px-2 py-0.5">/public/images/</code> and
              update the grid above.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
