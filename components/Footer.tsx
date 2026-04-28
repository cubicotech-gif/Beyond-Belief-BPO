import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type FooterProps = {
  logoUrl?: string | null;
  logoAlt?: string;
};

export default function Footer({ logoUrl = null, logoAlt = "Beyond Belief BPO" }: FooterProps) {
  return (
    <footer className="bg-ink text-paper relative overflow-hidden">
      {/* Massive wordmark */}
      <div className="border-b border-paper/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-32">
          <p className="eyebrow text-crimson mb-6">Deriving Futures</p>
          <h2 className="headline text-[clamp(2.5rem,8vw,7rem)] text-paper leading-[0.9]">
            Let&apos;s build <span className="headline-italic text-crimson">something</span>
            <br />
            beyond belief.
          </h2>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 bg-paper text-ink rounded-full text-sm font-medium hover:bg-crimson hover:text-paper transition-colors duration-300"
            >
              Start a conversation <ArrowUpRight size={16} />
            </Link>
            <a
              href="mailto:info@beyondbeliefbpo.co"
              className="link-arrow text-paper"
            >
              info@beyondbeliefbpo.co
            </a>
          </div>
        </div>
      </div>

      {/* Footer details grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt={logoAlt}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="headline text-2xl">Beyond Belief</span>
                <span className="eyebrow text-crimson">BPO</span>
              </div>
            )}
            <p className="body-text text-paper/60 mt-4 text-sm max-w-xs">
              Transcending expectations in business process outsourcing since
              our humble beginnings.
            </p>
          </div>

          <div>
            <p className="eyebrow text-paper/50 mb-4">Karachi Office</p>
            <p className="body-text text-paper text-sm leading-relaxed">
              Off 204, Sayyeda Chamber
              <br />
              University Rd, Gulshan-E-Iqbal
              <br />
              13-C, Karachi, Sindh 75300
            </p>
            <a
              href="tel:+923111833583"
              className="body-text text-paper/80 text-sm mt-3 block hover:text-crimson"
            >
              +92 311 1833583
            </a>
          </div>

          <div>
            <p className="eyebrow text-paper/50 mb-4">USA Entity</p>
            <p className="body-text text-paper text-sm leading-relaxed">
              BB Medical Supplies LLC
              <br />
              5900 Balcones Dr Ste 100
              <br />
              Austin 78731-4298, TX, USA
            </p>
          </div>

          <div>
            <p className="eyebrow text-paper/50 mb-4">Navigate</p>
            <ul className="space-y-2">
              {[
                ["Home", "/"],
                ["About", "/about"],
                ["Team", "/team"],
                ["Careers", "/careers"],
                ["Gallery", "/gallery"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="body-text text-paper/70 text-sm hover:text-crimson transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline text-paper mt-16 mb-6" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="body-text text-paper/50 text-xs">
            © {new Date().getFullYear()} Beyond Belief BPO. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Facebook", "Instagram", "YouTube", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                className="body-text text-paper/60 text-xs hover:text-crimson transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
