import { cn } from "@/lib/cn";

export const CARD_CLASS =
  "rounded-2xl border border-line/80 bg-surface shadow-sm shadow-zinc-900/3 transition-all duration-200";

export const CARD_HOVER_CLASS =
  "hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/8";

export const CARD_LINK_CLASS = cn(CARD_CLASS, CARD_HOVER_CLASS, "group");

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn(CARD_CLASS, className)}>{children}</div>;
}
