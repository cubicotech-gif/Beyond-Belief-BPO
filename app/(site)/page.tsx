import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { getAllSiteImages } from "@/lib/supabase/queries";

// Fully static, served from the CDN — no time-based regeneration at all.
// Admin writes call revalidatePath() (see lib/supabase/revalidate.ts), so
// edits still go live instantly. This is the most frugal setting for the
// Vercel free tier: a visit costs a cached edge response, nothing more.
export const revalidate = false;

const teamSlots = [
  { slot: "home_team_1", role: "Managing Director", note: "Leadership" },
  { slot: "home_team_2", role: "Team Lead", note: "Operations" },
  { slot: "home_team_3", role: "Head HR", note: "People" },
];

export default async function Home() {
  const images = await getAllSiteImages();
  const heroBg = images["home_hero_bg"]?.url;

  return (
    <>
      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-end pt-32 pb-16 md:pb-24 relative overflow-hidden">
        {heroBg && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroBg}
              alt={images["home_hero_bg"]?.alt || ""}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/60 to-paper/20" />
          </>
        )}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full relative">
          <div className="stagger">
            <p className="eyebrow text-crimson mb-8">Deriving Futures · Est. 2023</p>
            <h1 className="headline text-[clamp(3rem,12vw,11rem)] text-ink leading-[0.85] mb-8">
              Beyond
              <br />
              <span className="headline-italic text-crimson">Belief</span> BPO.
            </h1>
            <div className="grid md:grid-cols-12 gap-8 mt-12 items-end">
              <p className="body-text text-ink/75 text-lg md:col-span-5 max-w-md">
                We transcend expectations and redefine industry standards with
                an unwavering commitment to excellence, innovation, and client
                satisfaction.
              </p>
              <div className="md:col-span-4 md:col-start-9 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Start a partnership <ArrowUpRight size={16} />
                </Link>
                <Link href="/about" className="btn-ghost">
                  Our story
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in opacity-0" style={{ animationDelay: "1s" }}>
          <span className="eyebrow text-ink/40">Scroll</span>
          <ArrowDown size={14} className="text-ink/40 animate-bounce" />
        </div>
      </section>

      {/* MARQUEE — values (full red statement) */}
      <section className="bg-crimson py-8 overflow-hidden">
        <div className="marquee-row">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-16 pr-16">
              {[
                "Customer Service",
                "Chat Support",
                "BPO Services",
                "Medical Supplies",
                "Excellence Without Limits",
                "USA × Pakistan",
              ].map((item, i) => (
                <span
                  key={`${k}-${i}`}
                  className="headline text-paper text-3xl md:text-5xl whitespace-nowrap flex items-center gap-16"
                >
                  {item}
                  <span className="text-paper">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* US ENTITY ANNOUNCEMENT */}
      <section className="bg-paper-softer py-24 md:py-32 border-y border-paper-line">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="eyebrow text-crimson mb-6">Now Registered in the USA</p>
              <h2 className="headline text-5xl md:text-7xl text-ink leading-[0.9]">
                BB Medical
                <br />
                <span className="headline-italic">Supplies</span> LLC
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-end">
              <p className="body-text text-lg text-ink/75 mb-8">
                Beyond Belief BPO is proud to announce its official registration
                in the USA, further solidifying our commitment to excellence in
                the medical supplies industry as <strong>BB Medical Supplies LLC</strong>.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-paper-line">
                <div>
                  <p className="eyebrow text-muted-dark mb-2">Legal Name</p>
                  <p className="body-text text-ink">BB Medical Supplies LLC</p>
                </div>
                <div>
                  <p className="eyebrow text-muted-dark mb-2">Address</p>
                  <p className="body-text text-ink">
                    5900 Balcones Dr Ste 100
                    <br />
                    Austin 78731-4298, TX, USA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT GLIMPSE */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="eyebrow text-crimson mb-6">About Us</p>
            </div>
            <div className="md:col-span-8">
              <p className="headline text-3xl md:text-5xl text-ink leading-[1.05] mb-12">
                Established with a vision to surpass boundaries and deliver
                exceptional BPO services, our journey began with a simple yet
                audacious belief — that{" "}
                <span className="headline-italic text-crimson">excellence knows no limits</span>.
              </p>
              <Link href="/about" className="link-arrow text-ink">
                Read our story <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-ink text-paper py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="eyebrow text-crimson mb-6">Our Work</p>
              <h2 className="headline text-5xl md:text-7xl">
                We offer a wide variety
                <br />
                <span className="headline-italic">of services.</span>
              </h2>
            </div>
            <Link href="/contact" className="hidden md:flex link-arrow text-paper">
              Inquire <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-paper/10">
            {[
              {
                num: "01",
                title: "Customer Service",
                desc: "Trained representatives building lasting client relationships through every interaction.",
              },
              {
                num: "02",
                title: "Chat Support",
                desc: "Real-time digital assistance that scales with your business and converts conversations into outcomes.",
              },
              {
                num: "03",
                title: "BPO Services",
                desc: "End-to-end business process outsourcing tailored to your operational efficiency goals.",
              },
            ].map((s) => (
              <div
                key={s.num}
                className="bg-ink p-10 md:p-12 hover:bg-ink-softer transition-colors duration-500 group"
              >
                <p className="eyebrow text-crimson mb-12">{s.num}</p>
                <h3 className="headline text-3xl md:text-4xl text-paper mb-4 group-hover:text-crimson transition-colors">
                  {s.title}
                </h3>
                <p className="body-text text-paper/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM TEASER */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="eyebrow text-crimson mb-6">Our People</p>
            <h2 className="headline text-5xl md:text-7xl text-ink leading-[0.95]">
              Life at <span className="headline-italic">Beyond Belief</span>
            </h2>
          </div>

          <p className="body-text text-lg md:text-xl text-ink/75 max-w-3xl mx-auto text-center mb-16">
            Our greatest asset is our diverse and talented team of
            professionals — driven by passion, expertise, and a relentless
            pursuit of excellence. Together, we go beyond boundaries.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {teamSlots.map((p) => {
              const img = images[p.slot];
              return (
                <div
                  key={p.slot}
                  className="aspect-[3/4] bg-ink relative overflow-hidden group cursor-pointer"
                >
                  {img?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img.url}
                      alt={img.alt || p.role}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-paper/20 text-sm eyebrow">
                      Photo placeholder
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="eyebrow text-crimson mb-2">{p.note}</p>
                    <h3 className="headline text-3xl text-paper">{p.role}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link href="/team" className="btn-primary">
              Discover the team <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
