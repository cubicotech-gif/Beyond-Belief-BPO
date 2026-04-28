import { Check, X, AlertTriangle } from "lucide-react";
import { runDiagnostics } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Diagnostics — Beyond Belief BPO Admin",
  robots: { index: false, follow: false },
};

export default async function DiagnosticsPage() {
  const r = await runDiagnostics();

  const envOk =
    r.env.NEXT_PUBLIC_SUPABASE_URL &&
    r.env.SUPABASE_SERVICE_ROLE_KEY &&
    r.env.ADMIN_PASSWORD &&
    r.env.ADMIN_SESSION_SECRET;
  const tablesOk =
    r.tables.site_images.ok && r.tables.team_members.ok && r.tables.gallery_images.ok;
  const bucketOk = r.bucket.ok && r.bucket.public;
  const sampleOk =
    r.sampleSiteImages.length === 0 ||
    r.sampleSiteImages.every((s) => s.reachable === true);

  const allGood = envOk && tablesOk && bucketOk && sampleOk;

  return (
    <div className="px-10 py-12 max-w-4xl">
      <p className="eyebrow text-crimson mb-4">Health Check</p>
      <h1 className="headline text-5xl text-ink leading-[0.95]">
        Diagnostics<span className="headline-italic">.</span>
      </h1>
      <p className="body-text text-ink/60 mt-6 max-w-xl">
        Live status of the connection between the admin and the public site.
        If something below is red, that&apos;s why uploads aren&apos;t showing up.
      </p>

      <div
        className={`mt-10 p-6 border ${
          allGood
            ? "bg-paper border-paper-line"
            : "bg-crimson/5 border-crimson/30"
        }`}
      >
        <p className="eyebrow text-crimson mb-2">Overall</p>
        <p className="headline text-2xl text-ink">
          {allGood
            ? "All systems connected. Uploads will reflect on the live site."
            : "Issues detected — see below."}
        </p>
      </div>

      <Section title="Environment variables">
        <Row
          ok={r.env.NEXT_PUBLIC_SUPABASE_URL}
          label="NEXT_PUBLIC_SUPABASE_URL"
          hint="Project URL from Supabase → Settings → API"
        />
        <Row
          ok={r.env.SUPABASE_SERVICE_ROLE_KEY}
          label="SUPABASE_SERVICE_ROLE_KEY"
          hint="The secret service_role key (server-only). Without this, uploads + reads silently fail."
        />
        <Row
          ok={r.env.ADMIN_PASSWORD}
          label="ADMIN_PASSWORD"
          hint="Required to log in to /admin."
        />
        <Row
          ok={r.env.ADMIN_SESSION_SECRET}
          label="ADMIN_SESSION_SECRET"
          hint="Long random string used to sign admin sessions."
        />
        <Row
          ok={true}
          label={`SUPABASE_STORAGE_BUCKET = "${r.env.SUPABASE_STORAGE_BUCKET}"`}
          hint="Bucket name. Must match the one created in lib/supabase/schema.sql."
        />
      </Section>

      <Section title="Database tables">
        <TableRow name="site_images" t={r.tables.site_images} />
        <TableRow name="team_members" t={r.tables.team_members} />
        <TableRow name="gallery_images" t={r.tables.gallery_images} />
      </Section>

      <Section title="Storage bucket">
        <Row
          ok={r.bucket.ok}
          label={`Bucket "${r.env.SUPABASE_STORAGE_BUCKET}" exists`}
          hint={r.bucket.error || "Created by lib/supabase/schema.sql"}
        />
        <Row
          ok={r.bucket.public}
          label="Bucket is set to public"
          hint="Required so the browser can load image URLs directly."
        />
      </Section>

      {r.sampleSiteImages.length > 0 && (
        <Section title="Live image URL test">
          <p className="body-text text-ink/60 text-sm mb-4">
            Picked 3 site images and tried fetching them — exactly what the
            browser does on the public site. If any are red, the bucket
            isn&apos;t public or the file is missing.
          </p>
          {r.sampleSiteImages.map((s) => (
            <div
              key={s.slot}
              className="flex items-start justify-between py-3 border-b border-paper-line gap-4"
            >
              <div className="min-w-0 flex-1">
                <p className="eyebrow text-crimson text-[0.6rem]">{s.slot}</p>
                <p className="body-text text-xs text-ink/60 truncate font-mono">
                  {s.url}
                </p>
              </div>
              {s.reachable ? (
                <span className="inline-flex items-center gap-1.5 text-green-600 text-xs eyebrow shrink-0">
                  <Check size={14} /> 200 OK
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-crimson text-xs eyebrow shrink-0">
                  <X size={14} /> Not reachable
                </span>
              )}
            </div>
          ))}
        </Section>
      )}

      <Section title="Common fixes">
        <ul className="body-text text-ink/70 text-sm space-y-3 list-disc list-inside">
          <li>
            <strong>Missing env vars on Vercel:</strong> add them in Project →
            Settings → Environment Variables, then trigger a fresh deployment.
            Server-side env changes only apply on a new build.
          </li>
          <li>
            <strong>Tables don&apos;t exist:</strong> open Supabase → SQL Editor
            and run the contents of <code className="bg-paper-softer px-1.5 py-0.5">lib/supabase/schema.sql</code>.
          </li>
          <li>
            <strong>Bucket not public:</strong> Supabase → Storage → site-images
            → … → Make public. Or rerun the schema.
          </li>
          <li>
            <strong>Stale cache after deploy:</strong> uploads now call
            revalidatePath() so changes appear immediately, but a hard refresh
            (Cmd/Ctrl+Shift+R) bypasses the browser cache too.
          </li>
        </ul>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-12">
      <h2 className="headline text-2xl text-ink mb-4 border-b border-paper-line pb-2">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}

function Row({ ok, label, hint }: { ok: boolean; label: string; hint?: string }) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-paper-line last:border-b-0">
      <span className="mt-1 shrink-0">
        {ok ? (
          <Check size={16} className="text-green-600" />
        ) : (
          <X size={16} className="text-crimson" />
        )}
      </span>
      <div className="min-w-0">
        <p className="body-text text-ink text-sm font-medium">{label}</p>
        {hint && <p className="body-text text-ink/50 text-xs mt-0.5">{hint}</p>}
      </div>
    </div>
  );
}

function TableRow({
  name,
  t,
}: {
  name: string;
  t: { ok: boolean; count: number; error?: string };
}) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-paper-line last:border-b-0">
      <span className="mt-1 shrink-0">
        {t.ok ? (
          <Check size={16} className="text-green-600" />
        ) : (
          <AlertTriangle size={16} className="text-crimson" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="body-text text-ink text-sm font-medium font-mono">{name}</p>
        {t.ok ? (
          <p className="body-text text-ink/60 text-xs mt-0.5">
            {t.count} row{t.count === 1 ? "" : "s"}
          </p>
        ) : (
          <p className="body-text text-crimson text-xs mt-0.5">
            {t.error || "Unable to query — check schema.sql was run."}
          </p>
        )}
      </div>
    </div>
  );
}
