import type { Metadata } from "next";
import { PricingTable } from "@/components/home/pricing-table";
import { CreditPacks } from "@/components/home/credit-packs";
import { GuaranteeStrip } from "@/components/home/guarantee-strip";
import { getCurrency } from "@/lib/currency-server";

export const metadata: Metadata = {
  title: "Pricing — ScoreWell",
  description: "Compare ScoreWell Free and Premium plans and choose a billing period.",
};

export default async function PricingPage() {
  const currency = await getCurrency();

  return (
    <main className="flex flex-1 flex-col">
      <PricingTable currency={currency} />
      <CreditPacks currency={currency} />
      {/* Section 7a asks for the guarantees to be stated near the tier they apply to,
          so the strip repeats here under the plans rather than only on the homepage. */}
      <GuaranteeStrip />
    </main>
  );
}
