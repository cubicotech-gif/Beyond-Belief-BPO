import Link from "next/link";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";
import { LogOut, Image as ImageIcon, Users, Grid3x3, LayoutDashboard } from "lucide-react";

export const metadata = {
  title: "Admin — Beyond Belief BPO",
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/site-images", label: "Site Images", icon: ImageIcon },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/gallery", label: "Gallery", icon: Grid3x3 },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await verifySessionToken(cookies().get(ADMIN_COOKIE)?.value);

  if (!authed) {
    // /admin/login renders inside this layout; show a minimal shell.
    return (
      <div className="min-h-screen bg-paper-softer text-ink">{children}</div>
    );
  }

  return (
    <div className="min-h-screen bg-paper-softer text-ink flex">
      <aside className="w-64 shrink-0 bg-ink text-paper min-h-screen sticky top-0 flex flex-col">
        <div className="px-6 py-8 border-b border-paper/10">
          <Link href="/admin" className="flex items-baseline gap-2">
            <span className="headline text-xl tracking-tightest">Beyond Belief</span>
            <span className="eyebrow text-crimson">BPO</span>
          </Link>
          <p className="eyebrow text-paper/40 mt-3">Admin Console</p>
        </div>

        <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded text-paper/70 hover:bg-paper/5 hover:text-paper transition-colors body-text text-sm"
              >
                <Icon size={16} className="shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-paper/10">
          <Link
            href="/"
            className="block px-3 py-2 text-paper/50 hover:text-paper text-xs eyebrow"
          >
            ← View live site
          </Link>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded text-paper/70 hover:bg-crimson hover:text-paper transition-colors body-text text-sm"
            >
              <LogOut size={14} /> Log out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
