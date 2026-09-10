"use client";

import { useMemo, useState } from "react";
import { Activity, CalendarDays, Clock3, Search, ShieldCheck, SlidersHorizontal, X } from "lucide-react";

type Log = {
  id: string;
  adminName: string | null;
  adminEmail: string;
  action: string;
  entityType: string;
  entityId: string | null;
  summary: string;
  metadata: unknown;
  createdAt: string;
};

type Props = { logs: Log[]; now: number };
type TimeFilter = "ALL" | "TODAY" | "7_DAYS" | "30_DAYS";

const timeFilters: { value: TimeFilter; label: string }[] = [
  { value: "ALL", label: "All time" },
  { value: "TODAY", label: "Today" },
  { value: "7_DAYS", label: "Last 7 days" },
  { value: "30_DAYS", label: "Last 30 days" },
];

function readableAction(action: string) {
  return action.replaceAll("_", " ").toLowerCase().replace(/^./, (letter) => letter.toUpperCase());
}

function metadataText(metadata: unknown) {
  if (!metadata || typeof metadata !== "object") return "";
  return Object.entries(metadata as Record<string, unknown>)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(" · ");
}

export function ActivityLogView({ logs, now }: Props) {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("ALL");
  const [actionFilter, setActionFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const actions = useMemo(
    () => [...new Set(logs.map((log) => log.action))].sort(),
    [logs],
  );

  const filteredLogs = useMemo(() => {
    const cutoff = timeFilter === "TODAY"
      ? new Date(new Date(now).setHours(0, 0, 0, 0)).getTime()
      : timeFilter === "7_DAYS"
        ? now - 7 * 24 * 60 * 60 * 1000
        : timeFilter === "30_DAYS"
          ? now - 30 * 24 * 60 * 60 * 1000
          : 0;
    const query = search.trim().toLowerCase();

    return logs.filter((log) => {
      const searchable = `${log.summary} ${log.adminName ?? ""} ${log.adminEmail} ${log.action} ${log.entityType} ${log.entityId ?? ""}`.toLowerCase();
      return new Date(log.createdAt).getTime() >= cutoff &&
        (actionFilter === "ALL" || log.action === actionFilter) &&
        (!query || searchable.includes(query));
    });
  }, [actionFilter, logs, search, timeFilter]);

  const hasFilters = timeFilter !== "ALL" || actionFilter !== "ALL" || search;

  return (
    <div>
      <div className="rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <SlidersHorizontal className="h-4 w-4 text-pop-600" /> Filter activity
          </div>
          <p className="text-xs text-ink-muted">Showing {filteredLogs.length} of {logs.length} records</p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <label className="relative block">
            <span className="sr-only">Search activity</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search admin, action, or user..."
              className="h-11 w-full rounded-xl border border-line bg-surface-muted pl-9 pr-3 text-sm text-ink outline-none transition focus:border-pop-500 focus:ring-2 focus:ring-pop-500/20"
            />
          </label>
          <label className="relative">
            <span className="sr-only">Filter by time</span>
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <select value={timeFilter} onChange={(event) => setTimeFilter(event.target.value as TimeFilter)} className="h-11 w-full appearance-none rounded-xl border border-line bg-surface-muted pl-9 pr-8 text-sm text-ink outline-none focus:border-pop-500 focus:ring-2 focus:ring-pop-500/20 md:w-40">
              {timeFilters.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}
            </select>
          </label>
          <label className="relative">
            <span className="sr-only">Filter by action</span>
            <select value={actionFilter} onChange={(event) => setActionFilter(event.target.value)} className="h-11 w-full appearance-none rounded-xl border border-line bg-surface-muted px-3 text-sm text-ink outline-none focus:border-pop-500 focus:ring-2 focus:ring-pop-500/20 md:w-52">
              <option value="ALL">All actions</option>
              {actions.map((action) => <option key={action} value={action}>{readableAction(action)}</option>)}
            </select>
          </label>
        </div>
        {hasFilters && <button type="button" onClick={() => { setTimeFilter("ALL"); setActionFilter("ALL"); setSearch(""); }} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-link hover:underline"><X className="h-3.5 w-3.5" /> Clear filters</button>}
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
        {filteredLogs.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <Activity className="h-10 w-10 text-ink-muted" />
            <p className="mt-4 text-sm font-semibold text-ink">{logs.length ? "No matching activity" : "Nothing here yet"}</p>
            <p className="mt-1 text-sm text-ink-muted">{logs.length ? "Try a different filter or search term." : "Admin changes will appear here as they happen."}</p>
          </div>
        ) : (
          <div className="divide-y divide-line">
            {filteredLogs.map((log) => {
              const metadata = metadataText(log.metadata);
              return <article key={log.id} className="flex gap-4 px-5 py-5 sm:px-6">
                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-link sm:flex"><ShieldCheck className="h-5 w-5" /></div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                    <div><p className="text-sm font-semibold text-ink">{log.summary}</p><p className="mt-1 text-xs font-medium text-link">{log.adminName ?? log.adminEmail}</p></div>
                    <div className="flex items-center gap-1.5 text-xs text-ink-muted"><Clock3 className="h-3.5 w-3.5" />{new Date(log.createdAt).toLocaleString()}</div>
                  </div>
                  <p className="mt-2 text-xs text-ink-muted">{readableAction(log.action)} · {log.entityType}{log.entityId ? ` · ${log.entityId}` : ""}</p>
                  {metadata && <p className="mt-2 text-xs text-ink-body">{metadata}</p>}
                </div>
              </article>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}