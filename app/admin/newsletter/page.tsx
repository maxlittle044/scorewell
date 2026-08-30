import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Newsletter list — ScoreWell",
};

/**
 * The captured addresses, for whoever is going to send the mail.
 *
 * Without this page the homepage block writes to a table nobody can read, and a signup form
 * that goes nowhere visible is the kind of thing that quietly stays broken for months. There
 * is no send button here on purpose: no mailing service is wired up, so the honest interface
 * is a list to copy out of, not a compose box that would imply one exists.
 */
export default async function AdminNewsletterPage() {
  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) {
    notFound();
  }

  const [total, subscribers] = await Promise.all([
    prisma.newsletterSubscriber.count(),
    prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
  ]);

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Newsletter list"
          description="Addresses left on the homepage signup block. Nothing is sent from here."
        />

        {total === 0 ? (
          <p className="text-sm text-ink-muted">Nothing here yet — no one has signed up.</p>
        ) : (
          <>
            <p className="mb-4 text-sm text-ink-muted">
              {total} {total === 1 ? "address" : "addresses"}
              {total > subscribers.length && ` · showing the most recent ${subscribers.length}`}
            </p>

            <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-line text-xs uppercase tracking-wide text-ink-muted">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Email
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Signed up
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      From
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber.id}>
                      <td className="px-5 py-3 text-ink">{subscriber.email}</td>
                      <td className="whitespace-nowrap px-5 py-3 text-ink-muted">
                        {subscriber.createdAt.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-3 text-ink-muted">{subscriber.source ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
