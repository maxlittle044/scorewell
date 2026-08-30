import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { PageHeader } from "@/components/layout/page-header";
import { FeatureBoard, FeatureRequestForm } from "@/components/content/feature-board";
import { listFeatureRequests } from "@/lib/feature-requests";

export const metadata: Metadata = {
  title: "Feature requests — ScoreWell",
  description: "Suggest what ScoreWell should build next, and vote for what other learners have asked for.",
};

export default async function FeatureRequestsPage() {
  const session = await auth();
  const requests = await listFeatureRequests(session?.user?.id ?? null);
  const signedIn = Boolean(session?.user);

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Feature requests"
          description="Vote on what we build next, or suggest something new."
        />

        {requests.length === 0 ? (
          // The honest empty state. This board used to open with five invented requests and
          // invented vote counts; nothing here is shown until somebody actually asks for it.
          <div className="rounded-2xl border border-line bg-surface p-8 text-center">
            <p className="text-base font-semibold text-ink">Nothing here yet.</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-body">
              No one has suggested anything so far. Be the first — it goes straight onto the
              board with your vote on it, and everyone can see it.
            </p>
          </div>
        ) : (
          <FeatureBoard
            requests={requests}
            signedIn={signedIn}
            isAdmin={isAdminEmail(session?.user?.email)}
          />
        )}

        <FeatureRequestForm signedIn={signedIn} />

        <p className="mt-6 text-xs leading-relaxed text-ink-muted">
          Every count on this page is a real vote from a real account — one per account, per
          request. A request marked Planned or In progress has been picked up by us; Open means
          we have seen it and not committed to it yet. If something here matters to you and it
          is not moving,{" "}
          <Link href="/contact" className="font-medium text-link hover:underline">
            tell us why
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
