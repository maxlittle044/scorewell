"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { SearchIcon } from "@/components/layout/icons";
import { BookIcon, HeadphonesIcon, MicIcon, PencilIcon } from "@/components/home/skill-icons";

const VARIANT_TABS = [
  { value: "", label: "All Tests" },
  { value: "academic", label: "Academic Test" },
  { value: "general-training", label: "General Training Test" },
] as const;

const SKILL_PILLS = [
  { value: "", label: "All Skills", Icon: null },
  { value: "listening", label: "Listening", Icon: HeadphonesIcon },
  { value: "reading", label: "Reading", Icon: BookIcon },
  { value: "writing", label: "Writing", Icon: PencilIcon },
  { value: "speaking", label: "Speaking", Icon: MicIcon },
] as const;

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "practised", label: "Most practised" },
  { value: "alphabetical", label: "A–Z" },
] as const;

/**
 * Every control writes to the URL rather than to local state, so a filtered
 * view is linkable and indexable (spec section 4a) and the server component
 * stays the single source of truth.
 */
export function LibraryFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const variant = params.get("variant") ?? "";
  const skill = params.get("skill") ?? "";
  const sort = params.get("sort") ?? "newest";
  const queryParam = params.get("q") ?? "";

  const [draft, setDraft] = useState(queryParam);
  // Re-sync the box when the URL changes from outside (back button, a nav link
  // carrying ?q=). Adjusting state during render is React's documented pattern
  // here — doing it in an effect would cascade an extra render per keystroke.
  const [lastQuery, setLastQuery] = useState(queryParam);
  if (queryParam !== lastQuery) {
    setLastQuery(queryParam);
    setDraft(queryParam);
  }

  const apply = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      const qs = next.toString();
      router.replace(qs ? `/exam-library?${qs}` : "/exam-library", { scroll: false });
    },
    [params, router],
  );

  // Debounced so typing does not fire a navigation per keystroke.
  useEffect(() => {
    if (draft === queryParam) return;
    const timer = setTimeout(() => apply("q", draft), 300);
    return () => clearTimeout(timer);
  }, [draft, queryParam, apply]);

  return (
    <div className="mb-10 flex flex-col gap-6">
      <div className="flex flex-wrap gap-1 border-b border-zinc-200" role="tablist">
        {VARIANT_TABS.map((tab) => {
          const active = variant === tab.value;
          return (
            <button
              key={tab.value || "all"}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => apply("variant", tab.value)}
              className={cn(
                "-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition-colors",
                active
                  ? "border-brand-600 text-brand-700"
                  : "border-transparent text-zinc-500 hover:text-zinc-800",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {SKILL_PILLS.map((pill) => {
          const active = skill === pill.value;
          const Icon = pill.Icon;
          return (
            <button
              key={pill.value || "all"}
              type="button"
              aria-pressed={active}
              onClick={() => apply("skill", pill.value)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors",
                active
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-brand-300 hover:text-brand-700",
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {pill.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Search tests..."
            aria-label="Search tests"
            className="w-full rounded-full border border-zinc-200 bg-white py-3 pl-11 pr-4 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-brand-500"
          />
        </div>
        <label className="sr-only" htmlFor="library-sort">
          Sort tests
        </label>
        <select
          id="library-sort"
          value={sort}
          onChange={(event) => apply("sort", event.target.value)}
          className="rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-700 outline-none focus:border-brand-500"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
