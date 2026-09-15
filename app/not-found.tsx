import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-surface-muted px-4 py-20">
      <section className="w-full max-w-lg rounded-2xl border border-line bg-surface p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
          <SearchX className="h-8 w-8 text-white" aria-hidden="true" />
        </div>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-brand-600">Error 404</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-muted">
          We couldn&apos;t find the page you were looking for. It may have moved or the link may be incomplete.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/exam-library" variant="outline">
            Explore practice
          </Button>
        </div>
      </section>
    </main>
  );
}
