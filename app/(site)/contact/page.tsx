"use client";

import { useState } from "react";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      subject: data.get("subject"),
      message: data.get("message"),
      company: data.get("company"), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      form.reset();
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="pt-44 pb-16 md:pt-56 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <p className="eyebrow text-crimson mb-6">Stay In Touch</p>
          <h1 className="headline text-[clamp(3rem,12vw,10rem)] text-ink leading-[0.88]">
            Contact <span className="headline-italic text-crimson">Us.</span>
          </h1>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="border-t border-paper-line py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12">
          {/* Left — info */}
          <div className="md:col-span-5">
            <p className="eyebrow text-crimson mb-4">Find Us</p>
            <h2 className="headline text-3xl md:text-5xl text-ink mb-12 leading-[1.05]">
              Send us a query, or get in <span className="headline-italic">touch.</span>
            </h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin size={18} className="text-crimson mt-1 shrink-0" />
                <div>
                  <p className="eyebrow text-muted-dark mb-2">Karachi Office</p>
                  <p className="body-text text-ink">
                    Off 204, Sayyeda Chamber, University Rd,
                    <br />
                    Gulshan-E-Iqbal, 13-C, Karachi, Sindh 75300
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone size={18} className="text-crimson mt-1 shrink-0" />
                <div>
                  <p className="eyebrow text-muted-dark mb-2">Phone</p>
                  <a
                    href="tel:+923111833583"
                    className="body-text text-ink hover:text-crimson"
                  >
                    +92 311 1833583
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail size={18} className="text-crimson mt-1 shrink-0" />
                <div>
                  <p className="eyebrow text-muted-dark mb-2">Email</p>
                  <a
                    href="mailto:info@beyondbeliefbpo.co"
                    className="body-text text-ink hover:text-crimson"
                  >
                    info@beyondbeliefbpo.co
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-paper-line">
                <p className="eyebrow text-muted-dark mb-3">Follow Us</p>
                <div className="flex gap-5">
                  {["Facebook", "Instagram", "YouTube", "LinkedIn"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="body-text text-ink/70 text-sm hover:text-crimson transition-colors"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="md:col-span-7 md:col-start-7">
            <div className="bg-ink text-paper p-8 md:p-12 rounded-sm">
              {submitted ? (
                <div className="py-12 text-center">
                  <p className="eyebrow text-crimson mb-4">Message Received</p>
                  <p className="headline text-3xl text-paper mb-4">
                    Thank you.
                  </p>
                  <p className="body-text text-paper/70">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <p className="eyebrow text-crimson mb-2">Send Us A Message</p>
                    <h3 className="headline text-3xl md:text-4xl text-paper">
                      Let&apos;s talk.
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Name" name="name" required />
                    <Field label="Email" name="email" type="email" required />
                  </div>
                  <Field label="Subject" name="subject" required />
                  <Field
                    label="Comment or Message"
                    name="message"
                    textarea
                    required
                  />

                  {/* Honeypot — hidden from real users, catches bots */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  {error && (
                    <p className="body-text text-crimson text-sm" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-7 py-4 bg-crimson text-paper rounded-full text-sm font-medium hover:bg-paper hover:text-ink transition-colors duration-300 disabled:opacity-60"
                  >
                    {submitting ? "Sending…" : "Send Message"}
                    <ArrowUpRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* US ENTITY CALLOUT */}
      <section className="bg-paper-softer border-t border-paper-line py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <p className="eyebrow text-crimson mb-4">USA Registered Entity</p>
            <h3 className="headline text-3xl md:text-5xl text-ink leading-[1.05]">
              We&apos;re also based in{" "}
              <span className="headline-italic">Austin, Texas.</span>
            </h3>
          </div>
          <div className="md:col-span-5">
            <p className="body-text text-ink/75 mb-6">
              Beyond Belief BPO is proud to announce its official registration
              in the USA, further solidifying our commitment to excellence in
              the medical supplies industry as BB Medical Supplies LLC.
            </p>
            <div className="space-y-3 pt-4 border-t border-paper-line">
              <div>
                <p className="eyebrow text-muted-dark">Legal Name</p>
                <p className="body-text text-ink">BB Medical Supplies LLC</p>
              </div>
              <div>
                <p className="eyebrow text-muted-dark">Address</p>
                <p className="body-text text-ink">
                  5900 Balcones Dr Ste 100, Austin 78731-4298, TX, USA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-paper/60 mb-2 block">
        {label}
        {required && " *"}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          className="w-full bg-transparent border-b border-paper/20 py-3 text-paper font-sans focus:outline-none focus:border-crimson transition-colors resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          className="w-full bg-transparent border-b border-paper/20 py-3 text-paper font-sans focus:outline-none focus:border-crimson transition-colors"
        />
      )}
    </label>
  );
}
