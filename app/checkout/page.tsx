import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PageHeader } from "@/components/layout/page-header";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { getDuration } from "@/lib/pricing";
import { getCreditPack } from "@/lib/credits";
import { getAccountName, getConfiguredAccounts, getQrUrl, paymentsConfigured } from "@/lib/payment-config";

export const metadata: Metadata = {
  title: "Checkout — ScoreWell",
};

export default async function CheckoutPage({ searchParams }: PageProps<"/checkout">) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const params = await searchParams;
  const pack = getCreditPack(typeof params.pack === "string" ? params.pack : undefined);
  const durationParam = typeof params.duration === "string" ? params.duration : undefined;
  const purchase = pack
    ? ({ kind: "credits", pack } as const)
    : ({ kind: "subscription", duration: getDuration(durationParam) } as const);

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title={pack ? "Buy credits" : "Upgrade to Premium"}
          description="Scan a QR code below to pay, then submit your payment details for review."
        />
        {paymentsConfigured() ? (
          <CheckoutForm
            purchase={purchase}
            accounts={getConfiguredAccounts()}
            accountName={getAccountName()}
            qrUrl={getQrUrl()}
          />
        ) : (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-sm font-semibold text-amber-900">
              Payments are not set up yet
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-amber-900">
              We have not published our payment details, so there is nowhere for your money to go
              and nothing here can take it. Everything free on the site keeps working — practice
              tests, sample answers, and your monthly allowance of AI tool uses.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
