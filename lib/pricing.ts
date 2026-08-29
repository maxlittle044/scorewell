export type BillingInterval = "MONTHLY_1" | "MONTHLY_3" | "MONTHLY_6" | "MONTHLY_12";

export type Duration = {
  interval: BillingInterval;
  months: number;
  label: string;
  pricePerMonthNpr: number;
  bestValue?: boolean;
};

// Placeholder NPR pricing — swap these for real price points.
export const DURATIONS: Duration[] = [
  { interval: "MONTHLY_1", months: 1, label: "1 month", pricePerMonthNpr: 1500 },
  { interval: "MONTHLY_3", months: 3, label: "3 months", pricePerMonthNpr: 1300 },
  { interval: "MONTHLY_6", months: 6, label: "6 months", pricePerMonthNpr: 1100 },
  { interval: "MONTHLY_12", months: 12, label: "12 months", pricePerMonthNpr: 900, bestValue: true },
];

export function getDuration(interval: string | null | undefined): Duration {
  return DURATIONS.find((d) => d.interval === interval) ?? DURATIONS[3];
}

export function formatNpr(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

export function totalForDuration(duration: Duration): number {
  return duration.pricePerMonthNpr * duration.months;
}
