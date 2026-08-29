"use client";

import { useState } from "react";
import { DURATIONS, formatNpr, totalForDuration } from "@/lib/pricing";
import { FREE_MONTHLY_AI_USES } from "@/lib/ai/usage-limits";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

type Feature = {
  label: string;
  free: boolean | string;
  premium: boolean | string;
};

const FEATURES: Feature[] = [
  { label: "Practice tests (Reading, Listening, Writing, Speaking)", free: true, premium: true },
  { label: "Band-9 sample answers & tips", free: true, premium: true },
  { label: "AI tool uses", free: `${FREE_MONTHLY_AI_USES} per month`, premium: "Unlimited" },
  { label: "Saved progress & history", free: false, premium: true },
  { label: "Mistake analytics by question type", free: false, premium: true },
  { label: "Priority support", free: false, premium: true },
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-emerald-600">
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-zinc-300">
      <path d="M4 8h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) return <CheckIcon />;
  if (value === false) return <DashIcon />;
  return <span className="text-sm font-medium text-zinc-700">{value}</span>;
}

export function PricingTable() {
  const [selected, setSelected] = useState(DURATIONS[3]);
  const total = totalForDuration(selected);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          title="Simple, transparent pricing"
          description="Start free. Upgrade any time for unlimited AI tools and saved progress."
        />

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {DURATIONS.map((duration) => (
            <button
              key={duration.interval}
              type="button"
              onClick={() => setSelected(duration)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selected.interval === duration.interval
                  ? "bg-linear-to-r from-brand-600 to-pop-600 text-white shadow-glow-sm"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {duration.label}
              {duration.bestValue && (
                <span className="absolute -top-2.5 -right-2 rounded-full bg-linear-to-r from-accent-400 to-accent-500 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-900">
                  Best value
                </span>
              )}
            </button>
          ))}
        </div>

        <div data-reveal className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 p-6">
            <h3 className="text-lg font-semibold text-zinc-900">Free</h3>
            <p className="mt-2 text-3xl font-bold text-zinc-900">Rs. 0</p>
            <p className="mt-1 text-sm text-zinc-500">No payment required</p>
            <Button href="/login" variant="outline" className="mt-6 w-full">
              Get started
            </Button>
            <ul className="mt-6 flex flex-col gap-3">
              {FEATURES.map((feature) => (
                <li key={feature.label} className="flex items-start gap-2.5">
                  <FeatureValue value={feature.free} />
                  <span className="text-sm text-zinc-600">{feature.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl border-2 border-brand-600 bg-linear-to-b from-brand-50/60 to-white p-6 shadow-glow">
            <span className="absolute -top-3 left-6 rounded-full bg-linear-to-r from-brand-600 to-pop-600 px-3 py-1 text-xs font-semibold text-white">
              Premium
            </span>
            <h3 className="text-lg font-semibold text-zinc-900">Premium</h3>
            <p className="mt-2 text-3xl font-bold text-zinc-900">
              {formatNpr(selected.pricePerMonthNpr)}
              <span className="text-base font-normal text-zinc-500">/mo</span>
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              {selected.months === 1
                ? "Billed monthly"
                : `Billed ${formatNpr(total)} every ${selected.months} months`}
            </p>
            <Button href={`/checkout?duration=${selected.interval}`} className="mt-6 w-full">
              Upgrade to Premium
            </Button>
            <ul className="mt-6 flex flex-col gap-3">
              {FEATURES.map((feature) => (
                <li key={feature.label} className="flex items-start gap-2.5">
                  <FeatureValue value={feature.premium} />
                  <span className="text-sm text-zinc-600">{feature.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
