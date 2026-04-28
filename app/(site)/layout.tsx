import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllSiteImages } from "@/lib/supabase/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const images = await getAllSiteImages();
  const logoDark = images["site_logo"] ?? null;
  const logoLight = images["site_logo_light"] ?? logoDark;

  return (
    <>
      <Nav
        logoUrl={logoDark?.url ?? null}
        logoAlt={logoDark?.alt ?? "Beyond Belief BPO"}
      />
      <main>{children}</main>
      <Footer
        logoUrl={logoLight?.url ?? null}
        logoAlt={logoLight?.alt ?? "Beyond Belief BPO"}
      />
    </>
  );
}
