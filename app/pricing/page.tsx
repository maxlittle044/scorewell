import type { Metadata } from "next";
import { PricingTable } from "@/components/home/pricing-table";
import { CreditPacks } from "@/components/home/credit-packs";

export const metadata: Metadata = {
  title: "Pricing — ScoreWell",
  description: "Compare ScoreWell Free and Premium plans and choose a billing period.",
};

export default function PricingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PricingTable />
      <CreditPacks />
    </main>
  );
}
