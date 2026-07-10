"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

type NavProps = {
  logoUrl?: string | null;
  logoAlt?: string;
};

function Wordmark({
  logoUrl,
  logoAlt,
  scrolled,
}: {
  logoUrl: string | null;
  logoAlt: string;
  scrolled: boolean;
}) {
  if (logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt={logoAlt || "Beyond Belief BPO"}
        className={`w-auto object-contain transition-all duration-500 max-w-[70vw] md:max-w-none ${
          scrolled ? "h-10 md:h-14" : "h-16 md:h-24 lg:h-28"
        }`}
      />
    );
  }
  return (
    <div className="flex items-baseline gap-2">
      <span
        className={`headline tracking-tightest leading-none transition-all duration-500 ${
          scrolled ? "text-2xl md:text-3xl" : "text-4xl md:text-6xl lg:text-7xl"
        }`}
      >
        Beyond Belief
      </span>
      <span
        className={`eyebrow text-crimson transition-all duration-500 ${
          scrolled ? "text-[0.65rem]" : "text-xs md:text-sm"
        }`}
      >
        BPO
      </span>
    </div>
  );
}

export default function Nav({ logoUrl = null, logoAlt = "Beyond Belief BPO" }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-paper/90 backdrop-blur-xl border-b border-paper-line"
          : "bg-transparent"
      }`}
    >
      {/* Logo strip — its own container, free to scale */}
      <div
        className={`max-w-[1400px] mx-auto px-6 md:px-10 transition-[padding] duration-500 ${
          scrolled ? "py-3" : "pt-6 pb-4 md:pt-9 md:pb-5"
        }`}
      >
        <div className="flex items-center justify-between md:justify-center relative">
          <Link
            href="/"
            className="inline-flex items-center"
            aria-label="Beyond Belief BPO — Home"
            onClick={() => setOpen(false)}
          >
            <Wordmark logoUrl={logoUrl} logoAlt={logoAlt} scrolled={scrolled} />
          </Link>

          {/* Mobile-only menu toggle, anchored right of the logo row */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2 absolute right-0 top-1/2 -translate-y-1/2"
          >
            <span
              className={`block h-px w-6 bg-ink transition-transform ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-ink transition-transform ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Nav strip — slim, desktop only. Sits below the logo, decoupled. */}
      <div
        className={`hidden md:block transition-colors duration-500 border-t ${
          scrolled ? "border-paper-line/60" : "border-ink/10"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="body-text text-sm text-ink/70 hover:text-crimson transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            prefetch={false}
            className="btn-primary !py-2 !px-5 !text-xs"
          >
            Get in touch
          </Link>
        </div>
      </div>

      {/* Mobile drawer — links collapsed into a panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 bg-paper border-t border-paper-line ${
          open ? "max-h-[28rem]" : "max-h-0"
        }`}
      >
        <nav className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              onClick={() => setOpen(false)}
              className="headline text-2xl text-ink hover:text-crimson transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            prefetch={false}
            onClick={() => setOpen(false)}
            className="btn-primary mt-4 self-start"
          >
            Get in touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
