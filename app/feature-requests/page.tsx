"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";

type Request = {
  id: string;
  title: string;
  votes: number;
  status: "Planned" | "In progress" | "Under review";
};

const INITIAL_REQUESTS: Request[] = [
  { id: "offline-mode", title: "Offline mode for downloaded practice tests", votes: 214, status: "Under review" },
  { id: "speaking-live", title: "Live speaking practice with real tutors", votes: 187, status: "Planned" },
  { id: "vocab-tracker", title: "Personal vocabulary tracker across all tools", votes: 152, status: "In progress" },
  { id: "dark-mode", title: "Dark mode", votes: 98, status: "Under review" },
  { id: "pte-support", title: "PTE Academic practice tests", votes: 76, status: "Under review" },
];

function StatusBadge({ status }: { status: Request["status"] }) {
  const styles: Record<Request["status"], string> = {
    Planned: "bg-brand-50 text-link",
    "In progress": "bg-accent-100 text-accent-600",
    "Under review": "bg-surface-sunken text-ink-body",
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function FeatureRequestsPage() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [voted, setVoted] = useState<Set<string>>(new Set());

  function toggleVote(id: string) {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, votes: r.votes + (voted.has(id) ? -1 : 1) } : r))
    );
    setVoted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Feature requests"
          description="Vote on what we build next, or suggest something new."
        />

        <ul className="flex flex-col divide-y divide-zinc-200 rounded-2xl border border-line">
          {requests.map((request) => (
            <li key={request.id} className="flex items-center gap-4 px-5 py-4">
              <button
                type="button"
                onClick={() => toggleVote(request.id)}
                aria-pressed={voted.has(request.id)}
                className={`flex w-14 shrink-0 flex-col items-center rounded-lg border py-1.5 text-xs font-semibold transition-colors ${
                  voted.has(request.id)
                    ? "border-brand-600 bg-brand-50 text-link"
                    : "border-line text-ink-body hover:border-brand-300"
                }`}
              >
                <span>▲</span>
                {request.votes}
              </button>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">{request.title}</p>
              </div>
              <StatusBadge status={request.status} />
            </li>
          ))}
        </ul>

        <form className="mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-surface-muted p-5">
          <label htmlFor="idea" className="text-sm font-medium text-ink-body">
            Suggest a feature
          </label>
          <textarea
            id="idea"
            name="idea"
            rows={3}
            placeholder="What should we build next?"
            className="w-full rounded-lg border border-line-strong bg-surface px-3 py-2 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <button
            type="submit"
            className="self-start rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
