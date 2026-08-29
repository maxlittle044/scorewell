import Link from "next/link";
import { CREDIT_PACKS } from "@/lib/credits";
import { formatNpr } from "@/lib/pricing";
import { FREE_MONTHLY_AI_USES } from "@/lib/ai/usage-limits";

/**
 * Pay-per-use credits as the subscription alternative (spec section 6), for
 * learners who want occasional AI scoring without a recurring plan.
 */
export function CreditPacks() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
          Or pay <span className="text-pop-600">only for what you use</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-600">
          No subscription. One credit buys one AI tool use — an essay checked, a speaking answer
          scored, a passage rewritten. Credits never expire, and your {FREE_MONTHLY_AI_USES} free
          monthly uses are always spent first.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {CREDIT_PACKS.map((pack) => (
            <div
              key={pack.id}
              className={
                pack.bestValue
                  ? "relative rounded-2xl border-2 border-brand-600 bg-white p-6 text-center shadow-md"
                  : "relative rounded-2xl border border-zinc-200 bg-white p-6 text-center"
              }
            >
              {pack.bestValue && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-500 px-3 py-0.5 text-xs font-semibold text-white">
                  Best value
                </span>
              )}
              <p className="font-display text-3xl font-bold text-brand-900">{pack.credits}</p>
              <p className="mt-1 text-sm text-zinc-500">credits</p>
              <p className="mt-4 text-lg font-semibold text-zinc-900">
                {formatNpr(pack.priceNpr)}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {formatNpr(Math.round(pack.priceNpr / pack.credits))} per use
              </p>
              <Link
                href={`/checkout?pack=${pack.id}`}
                className="mt-5 block rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Buy {pack.credits} credits
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Paid by eSewa, Khalti or bank transfer. Credits are added once an admin has confirmed
          your payment.
        </p>
      </div>
    </section>
  );
}
