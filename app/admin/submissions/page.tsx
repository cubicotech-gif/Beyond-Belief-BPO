import { getContactSubmissions } from "@/lib/supabase/queries";
import SubmissionsList from "./SubmissionsList";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const submissions = await getContactSubmissions();

  return (
    <div className="px-10 py-12 max-w-4xl">
      <p className="eyebrow text-crimson mb-4">Contact form</p>
      <h1 className="headline text-5xl text-ink leading-[0.95]">
        Messages <span className="headline-italic">received.</span>
      </h1>
      <p className="body-text text-ink/60 mt-6 max-w-xl">
        Everything submitted through the public contact form lands here, newest
        first. Reply straight from your email client, then delete once handled.
      </p>

      <SubmissionsList initial={submissions} />
    </div>
  );
}
