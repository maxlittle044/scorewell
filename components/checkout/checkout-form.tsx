"use client";

import { useActionState, useState } from "react";
import type { Duration } from "@/lib/pricing";
import { formatNpr, totalForDuration } from "@/lib/pricing";
import type { CreditPack } from "@/lib/credits";
import { submitPaymentAction } from "@/app/checkout/actions";
import type { PaymentAccount } from "@/lib/payment-config";

/** One form serves both purchases; the purpose decides labels and hidden fields. */
export type Purchase =
  | { kind: "subscription"; duration: Duration }
  | { kind: "credits"; pack: CreditPack };

export function CheckoutForm({
  purchase,
  accounts,
  accountName,
  qrUrl,
}: {
  purchase: Purchase;
  /** Only methods that actually have an account behind them. */
  accounts: PaymentAccount[];
  accountName: string | null;
  qrUrl: string | null;
}) {
  const [method, setMethod] = useState<string>(accounts[0]?.method ?? "ESEWA");
  const selected = accounts.find((a) => a.method === method) ?? accounts[0];
  const [state, formAction, pending] = useActionState(submitPaymentAction, {});

  const isCredits = purchase.kind === "credits";
  const summaryLabel = isCredits
    ? `${purchase.pack.credits} credits`
    : `${purchase.duration.label} plan`;
  const summaryPrice = isCredits
    ? formatNpr(purchase.pack.priceNpr)
    : formatNpr(totalForDuration(purchase.duration));

  if (state.success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <h2 className="font-semibold text-emerald-900">Payment details received</h2>
        <p className="mt-2 text-sm text-emerald-700">
          {isCredits
            ? "We'll verify your payment and add the credits to your account shortly. This usually takes a few hours."
            : "We'll verify your payment and upgrade your account to Premium shortly. This usually takes a few hours."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <span className="text-sm text-zinc-600">{summaryLabel}</span>
        <span className="text-lg font-semibold text-zinc-900">{summaryPrice}</span>
      </div>

      <div className="mt-5 flex gap-2">
        {accounts.map((account) => (
          <button
            key={account.method}
            type="button"
            onClick={() => setMethod(account.method)}
            className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
              method === account.method
                ? "bg-brand-600 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            {account.label}
          </button>
        ))}
      </div>

      {/* A QR is shown only when a real one has been supplied — never a stand-in. */}
      {qrUrl && (
        <div className="mt-6 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrUrl}
            alt={`QR code for paying by ${selected?.label ?? "the selected method"}`}
            className="h-48 w-48 rounded-lg border border-zinc-200 bg-white p-2"
          />
        </div>
      )}

      {selected && (
        <div className="mt-4 rounded-lg bg-zinc-50 px-4 py-3 text-center text-sm">
          <p className="font-medium text-zinc-800">
            {selected.label}: <span className="font-mono">{selected.accountId}</span>
          </p>
          {accountName && <p className="mt-0.5 text-xs text-zinc-500">Account name: {accountName}</p>}
        </div>
      )}

      <form action={formAction} className="mt-6 flex flex-col gap-4 border-t border-zinc-100 pt-6">
        <input type="hidden" name="method" value={method} />
        <input type="hidden" name="purpose" value={isCredits ? "CREDITS" : "SUBSCRIPTION"} />
        {isCredits ? (
          <input type="hidden" name="pack" value={purchase.pack.id} />
        ) : (
          <input type="hidden" name="billingInterval" value={purchase.duration.interval} />
        )}

        {state.error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>
        )}

        <div>
          <label htmlFor="transactionRef" className="mb-1.5 block text-sm font-medium text-zinc-700">
            Transaction ID / reference number
          </label>
          <input
            id="transactionRef"
            name="transactionRef"
            type="text"
            required
            placeholder="e.g. the reference shown after payment"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <div>
          <label htmlFor="screenshot" className="mb-1.5 block text-sm font-medium text-zinc-700">
            Payment screenshot <span className="font-normal text-zinc-400">(optional)</span>
          </label>
          <input
            id="screenshot"
            name="screenshot"
            type="file"
            accept="image/*"
            className="w-full text-sm text-zinc-600 file:mr-3 file:rounded-full file:border-0 file:bg-zinc-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-zinc-700 hover:file:bg-zinc-200"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Submitting…" : "I've paid — submit for review"}
        </button>
      </form>
    </div>
  );
}
