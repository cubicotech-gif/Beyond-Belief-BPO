import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";
import { cookies } from "next/headers";

export const metadata = {
  title: "Admin login — Beyond Belief BPO",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { from?: string; error?: string };
}) {
  if (await verifySessionToken(cookies().get(ADMIN_COOKIE)?.value)) {
    redirect(searchParams.from || "/admin");
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-baseline gap-2">
            <span className="headline text-3xl tracking-tightest">Beyond Belief</span>
            <span className="eyebrow text-crimson">BPO</span>
          </Link>
          <p className="eyebrow text-muted-dark mt-3">Admin Console</p>
        </div>

        <div className="bg-ink text-paper p-10 rounded-sm">
          <p className="eyebrow text-crimson mb-3">Restricted</p>
          <h1 className="headline text-4xl text-paper mb-8">
            Sign <span className="headline-italic">in.</span>
          </h1>

          <form action="/api/admin/login" method="post" className="space-y-6">
            <input type="hidden" name="from" value={searchParams.from || "/admin"} />

            <label className="block">
              <span className="eyebrow text-paper/60 mb-2 block">Password</span>
              <input
                type="password"
                name="password"
                required
                autoFocus
                className="w-full bg-transparent border-b border-paper/20 py-3 text-paper font-sans focus:outline-none focus:border-crimson transition-colors"
              />
            </label>

            {searchParams.error && (
              <p className="body-text text-crimson text-sm">
                {searchParams.error === "invalid"
                  ? "Incorrect password."
                  : "Something went wrong. Please try again."}
              </p>
            )}

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-4 bg-crimson text-paper rounded-full text-sm font-medium hover:bg-paper hover:text-ink transition-colors duration-300"
            >
              Continue <ArrowUpRight size={16} />
            </button>
          </form>
        </div>

        <p className="body-text text-ink/50 text-xs text-center mt-8">
          Configured via the <code className="bg-paper-softer px-1.5 py-0.5">ADMIN_PASSWORD</code> environment variable.
        </p>
      </div>
    </div>
  );
}
