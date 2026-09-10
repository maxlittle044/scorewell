import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export function UnauthorizedView() {
  return (
    <main className="flex flex-1 items-center justify-center bg-surface-muted px-4 py-20">
      <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Access restricted</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">Unauthorized</h1>
        <p className="mt-4 text-sm leading-6 text-ink-body">
          You do not have permission to view this workspace. Please contact an administrator if you need access.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          <ArrowLeft className="h-4 w-4" /> Return to ScoreWell
        </Link>
      </div>
    </main>
  );
}