import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Contact us — ScoreWell",
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Contact us"
          description="Questions, feedback, or something not working right? Send us a message."
        />

        <form className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-body">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className="w-full rounded-lg border border-line-strong px-3 py-2 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-body">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-lg border border-line-strong px-3 py-2 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-body">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full rounded-lg border border-line-strong px-3 py-2 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Send message
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          You can also reach us directly at{" "}
          <span className="font-medium text-ink-body">support@scorewell.example</span>
        </p>
      </div>
    </main>
  );
}
