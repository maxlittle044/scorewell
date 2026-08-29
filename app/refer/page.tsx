import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PageHeader } from "@/components/layout/page-header";
import { CopyLinkButton } from "@/components/refer/copy-link-button";
import {
  REFERRAL_REWARD_MONTHS,
  getOrCreateReferralCode,
  getReferralStats,
} from "@/lib/referral";

export const metadata: Metadata = {
  title: "Refer & earn — ScoreWell",
};

export default async function ReferPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const [code, stats, headerList] = await Promise.all([
    getOrCreateReferralCode(session.user.id),
    getReferralStats(session.user.id),
    headers(),
  ]);

  const host = headerList.get("host") ?? "scorewell.com";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const referralLink = `${protocol}://${host}/r/${code}`;

  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      <div className="mx-auto w-full max-w-xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Refer & earn" description="Give a free month, get a free month." />

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="text-sm text-zinc-600">
            Share your link. When a friend subscribes to Premium for the first time, you both get{" "}
            {REFERRAL_REWARD_MONTHS === 1 ? "one month" : `${REFERRAL_REWARD_MONTHS} months`} of
            Premium free.
          </p>

          <CopyLinkButton link={referralLink} />

          <dl className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-lg bg-zinc-50 py-4">
              <dt className="text-xs text-zinc-500">Signed up</dt>
              <dd className="mt-1 text-xl font-bold text-zinc-900">{stats.total}</dd>
            </div>
            <div className="rounded-lg bg-zinc-50 py-4">
              <dt className="text-xs text-zinc-500">Pending</dt>
              <dd className="mt-1 text-xl font-bold text-zinc-900">{stats.pending}</dd>
            </div>
            <div className="rounded-lg bg-zinc-50 py-4">
              <dt className="text-xs text-zinc-500">Months earned</dt>
              <dd className="mt-1 text-xl font-bold text-zinc-900">
                {stats.rewarded * REFERRAL_REWARD_MONTHS}
              </dd>
            </div>
          </dl>

          {stats.pending > 0 && (
            <p className="mt-4 text-center text-xs text-zinc-500">
              {stats.pending} friend{stats.pending === 1 ? " has" : "s have"} signed up but
              {stats.pending === 1 ? " hasn't" : " haven't"} subscribed yet — you&apos;ll earn your
              free month when they do.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
