import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSiteImage } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About — Beyond Belief BPO",
  description:
    "We transcend expectations and redefine industry standards with our unwavering commitment to excellence, innovation, and client satisfaction.",
};

export default async function About() {
  const heroImage = await getSiteImage("about_hero");

  return (
    <>
      {/* PAGE HERO */}
      <section className="pt-44 pb-20 md:pt-56 md:pb-32 relative overflow-hidden">
        {heroImage?.url && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage.url}
              alt={heroImage.alt || ""}
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper to-paper/50" />
          </>
        )}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative">
          <p className="eyebrow text-crimson mb-6">A Little Insight</p>
          <h1 className="headline text-[clamp(3rem,10vw,9rem)] text-ink leading-[0.88]">
            About <span className="headline-italic text-crimson">Us.</span>
          </h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-t border-paper-line py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="eyebrow text-muted-dark">Our Welcome</p>
            </div>
            <div className="md:col-span-7">
              <p className="headline text-3xl md:text-5xl text-ink leading-[1.05]">
                We invite you to embark on a journey of unparalleled service
                and innovation. Join us in a partnership built on{" "}
                <span className="headline-italic">trust, dedication, and a shared vision</span>{" "}
                for success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="bg-ink text-paper py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <p className="eyebrow text-crimson mb-6 text-center">How We Do It</p>
          <h2 className="headline text-5xl md:text-7xl text-paper text-center mb-20">
            Our <span className="headline-italic">Journey</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                title: "Our Work",
                body: "At Beyond Belief BPO, we transcend expectations and redefine industry standards with our unwavering commitment to excellence, innovation, and client satisfaction. Established with a vision to surpass boundaries and deliver exceptional BPO services, our journey began with a simple yet audacious belief — that excellence knows no limits.",
              },
              {
                title: "Our Staff",
                body: "Our greatest asset is our diverse and talented team of professionals. Comprising individuals driven by passion, expertise, and a relentless pursuit of excellence, our team stands at the forefront of innovation. Together, we pursue to go beyond boundaries, explore new horizons, and exceed expectations.",
              },
              {
                title: "Our Story",
                body: "From our humble beginnings, we have forged a path of resilience and growth, navigating through challenges and triumphs to emerge as a leading player in the industry. Our journey is a testament to our core values — integrity, innovation, and a dedication to fostering meaningful connections.",
              },
            ].map((p, i) => (
              <div key={i} className="border-t border-paper/15 pt-8">
                <p className="eyebrow text-crimson mb-6">0{i + 1}</p>
                <h3 className="headline text-3xl md:text-4xl text-paper mb-6">
                  {p.title}
                </h3>
                <p className="body-text text-paper/70">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION VISION RESULTS */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <p className="eyebrow text-crimson mb-6 text-center">The values we live by</p>
          <h2 className="headline text-5xl md:text-7xl text-ink text-center mb-20 leading-[0.95]">
            Mission. Vision. <span className="headline-italic">Results.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-paper-line">
            {[
              {
                label: "Mission",
                body: "To empower businesses across industries by delivering high-quality, cost-effective BPO solutions. We aim to optimize operational efficiency, foster growth, and cultivate long-term partnerships.",
              },
              {
                label: "Vision",
                body: "To be the leading provider of exceptional Business Process Outsourcing services globally, recognized for our commitment to excellence, innovation, and client satisfaction.",
              },
              {
                label: "Results",
                body: "We aim to solidify our position as a trusted partner in the BPO industry, creating lasting value for our clients, employees, and stakeholders while making a positive impact on the global business landscape.",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="bg-paper-softer p-10 md:p-12 hover:bg-paper transition-colors duration-500"
              >
                <p className="eyebrow text-crimson mb-8">0{i + 1}</p>
                <h3 className="headline text-4xl md:text-5xl text-ink mb-6">
                  {v.label}
                </h3>
                <p className="body-text text-ink/75">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* US ENTITY */}
      <section className="bg-paper-softer border-y border-paper-line py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <p className="eyebrow text-crimson mb-4">BB Medical Supplies LLC</p>
              <h3 className="headline text-3xl md:text-5xl text-ink leading-[1.05]">
                Officially registered in the{" "}
                <span className="headline-italic">United States.</span>
              </h3>
            </div>
            <div className="md:col-span-5">
              <p className="body-text text-ink/75 mb-6">
                Beyond Belief BPO is proud to announce its official
                registration in the USA, further solidifying our commitment to
                excellence in the medical supplies industry as BB Medical
                Supplies LLC.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-paper-line">
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

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <p className="headline text-4xl md:text-6xl text-ink leading-[1.05] max-w-4xl mx-auto mb-12">
            Ready to <span className="headline-italic text-crimson">go beyond</span> with us?
          </p>
          <Link href="/contact" className="btn-primary">
            Start a partnership <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
