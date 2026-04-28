import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Careers — Beyond Belief BPO",
  description:
    "Join our team. We invite you to embark on a journey of unparalleled service and innovation.",
};

const positions = [
  {
    title: "Sales Representative",
    openings: "05",
    description:
      "Build relationships with prospective clients across our BPO and medical supplies divisions. Drive growth through consultative selling.",
  },
  {
    title: "Customer Service Representative",
    openings: "04",
    description:
      "Be the trusted voice our clients rely on. Resolve, support, and elevate every interaction with care and precision.",
  },
  {
    title: "Sales Trainer",
    openings: "02",
    description:
      "Develop our sales force. Design programs, coach individuals, and shape the next generation of high performers.",
  },
  {
    title: "Team Lead",
    openings: "01",
    description:
      "Lead a team of representatives. Own performance, culture, and operational execution at the floor level.",
  },
];

export default function Careers() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <p className="eyebrow text-crimson mb-6">Careers</p>
          <h1 className="headline text-[clamp(3rem,12vw,10rem)] text-ink leading-[0.88]">
            Join our
            <br />
            <span className="headline-italic text-crimson">team.</span>
          </h1>
          <p className="body-text text-xl md:text-2xl text-ink/75 max-w-3xl mt-12">
            We invite you to embark on a journey of unparalleled service and
            innovation. Join us in a partnership built on trust, dedication, and
            a shared vision for success.
          </p>
        </div>
      </section>

      {/* POSITIONS */}
      <section className="border-t border-paper-line">
        {positions.map((pos, i) => (
          <div
            key={pos.title}
            className="border-b border-paper-line group hover:bg-ink hover:text-paper transition-colors duration-500"
          >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-14 grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-1">
                <p className="eyebrow text-crimson">0{i + 1}</p>
              </div>
              <div className="md:col-span-2">
                <p className="eyebrow text-muted-dark group-hover:text-paper/60 transition-colors">
                  {pos.openings} positions
                </p>
              </div>
              <div className="md:col-span-6">
                <h3 className="headline text-4xl md:text-5xl group-hover:headline-italic transition-all">
                  {pos.title}
                </h3>
                <p className="body-text text-ink/70 group-hover:text-paper/70 mt-4 max-w-xl transition-colors">
                  {pos.description}
                </p>
              </div>
              <div className="md:col-span-3 md:text-right">
                <Link
                  href="/contact"
                  className="link-arrow text-ink group-hover:text-crimson"
                >
                  Apply Now <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* WHY US */}
      <section className="bg-paper-softer py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="eyebrow text-crimson mb-4">Why Beyond Belief</p>
              <h2 className="headline text-4xl md:text-6xl text-ink leading-[0.95]">
                More than
                <br />
                <span className="headline-italic">a job.</span>
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="body-text text-lg text-ink/75 mb-8">
                Our greatest asset is our diverse and talented team of
                professionals. Comprising individuals driven by passion,
                expertise, and a relentless pursuit of excellence, our team
                stands at the forefront of innovation. Together, we pursue to
                go beyond boundaries, explore new horizons, and exceed
                expectations.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-paper-line">
                {[
                  ["Growth", "Continuous learning and clear progression paths."],
                  ["Culture", "A team that celebrates wins and supports through challenges."],
                  ["Impact", "Work that matters — for clients, colleagues, and yourself."],
                ].map(([title, desc]) => (
                  <div key={title}>
                    <p className="eyebrow text-crimson mb-2">{title}</p>
                    <p className="body-text text-ink text-sm">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
