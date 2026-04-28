import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Team — Beyond Belief BPO",
  description:
    "Discover our extraordinary team — driven by passion, expertise, and a relentless pursuit of excellence.",
};

const sections = [
  {
    num: "01",
    label: "Core Team",
    description: "Our Board of leaders.",
    members: [
      { role: "Managing Director", name: "—" },
      { role: "CEO", name: "Faisal" },
      { role: "Head of Operations", name: "—" },
    ],
  },
  {
    num: "02",
    label: "HODs",
    description: "Our heads of departments.",
    members: [],
  },
  {
    num: "03",
    label: "Permanent Members",
    description: "Permanent part of our team.",
    members: [],
  },
];

export default function Team() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <p className="eyebrow text-crimson mb-6">Discover Our Extraordinary</p>
          <h1 className="headline text-[clamp(3.5rem,15vw,12rem)] text-ink leading-[0.85]">
            <span className="headline-italic text-crimson">Team.</span>
          </h1>
          <p className="body-text text-xl md:text-2xl text-ink/75 max-w-3xl mt-12">
            Our greatest asset is our diverse and talented team of professionals.
            Comprising individuals driven by passion, expertise, and a relentless
            pursuit of excellence.
          </p>
        </div>
      </section>

      {/* PEOPLE ARE OUR BRAND */}
      <section className="bg-crimson text-paper py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="eyebrow text-paper/70 mb-4">Featured</p>
            <h2 className="headline text-5xl md:text-7xl leading-[0.95]">
              Our people are
              <br />
              <span className="headline-italic">our brand.</span>
            </h2>
          </div>
          <a href="#sections" className="link-arrow text-paper">
            Explore <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      {/* SECTIONS */}
      <section id="sections" className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {sections.map((sec, idx) => (
            <div
              key={sec.num}
              className={`grid md:grid-cols-12 gap-8 py-12 md:py-16 ${
                idx !== sections.length - 1 ? "border-b border-paper-line" : ""
              }`}
            >
              <div className="md:col-span-4">
                <p className="eyebrow text-crimson mb-4">{sec.num}</p>
                <h3 className="headline text-4xl md:text-6xl text-ink leading-[0.95]">
                  {sec.label}
                </h3>
                <p className="body-text text-ink/70 mt-4">{sec.description}</p>
              </div>

              <div className="md:col-span-8">
                {sec.members.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {sec.members.map((m, i) => (
                      <div
                        key={i}
                        className="aspect-[3/4] bg-ink relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 p-5">
                          <p className="eyebrow text-crimson mb-1">{m.role}</p>
                          <p className="headline text-2xl text-paper">{m.name}</p>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center text-paper/20 text-xs">
                          Photo
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="body-text text-ink/40 italic">
                    Members to be announced.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-ink text-paper py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <blockquote className="headline text-4xl md:text-6xl text-paper max-w-5xl leading-[1.05]">
            &ldquo;Our belief is to provide the best{" "}
            <span className="headline-italic text-crimson">quality service</span>
            {" "}by providing the best people to represent it.&rdquo;
          </blockquote>
        </div>
      </section>
    </>
  );
}
