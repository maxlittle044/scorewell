import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Users — ScoreWell",
};

/**
 * The newest accounts, capped. Every row here is personal data, so the page shows a recent
 * window rather than the entire table — the same shape the payments queue uses.
 */
const MAX_ROWS = 100;

/*
 * Icons are local inline SVG, as everywhere else on the site (29 files and no icon package).
 * `currentColor` and aria-hidden so they inherit the surrounding text colour and stay out of
 * the accessibility tree — they repeat the column header beside them.
 */
function UsersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <circle cx="8" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 16c0-2.6 2.5-4.3 5.5-4.3s5.5 1.7 5.5 4.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14.5 5.2a2.8 2.8 0 0 1 0 5.4M15.5 16c0-1.8-.6-3-1.6-3.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <rect x="2.5" y="4.5" width="15" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="m3.5 6.5 5.6 4a1.5 1.5 0 0 0 1.8 0l5.6-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <rect x="2.5" y="4" width="15" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 8h15M6.5 2.5v3M13.5 2.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** Pinned to en-US like the other admin tables, so the format does not follow the server's locale. */
function formatJoined(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function AdminUsersPage() {
  // Every /admin page gates itself: there is no admin layout and no middleware, so a page
  // without this check is simply public. This one lists names and email addresses, which
  // makes it the last page on the site that should be reachable without it.
  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) {
    notFound();
  }

  const [users, totalUsers] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: MAX_ROWS,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    }),
    // Counted separately, or the total would silently become "at most MAX_ROWS".
    prisma.user.count(),
  ]);

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <PageHeader
          title="Users"
          description={`${totalUsers} registered ${totalUsers === 1 ? "user" : "users"}.`}
        />

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-ink-muted/20 bg-background p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-body/5">
                <UsersIcon className="h-5 w-5 text-ink-body" />
              </div>

              <div>
                <p className="text-sm text-ink-muted">Total users</p>
                <p className="mt-1 text-2xl font-semibold text-ink-body">{totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-ink-muted/20 bg-background p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-body/5">
                <CalendarIcon className="h-5 w-5 text-ink-body" />
              </div>

              <div>
                <p className="text-sm text-ink-muted">Latest signup</p>
                <p className="mt-1 text-lg font-semibold text-ink-body">
                  {users.length > 0 ? formatJoined(users[0].createdAt) : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Users table */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-ink-muted/20 bg-background">
          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-body/5">
                <UsersIcon className="h-7 w-7 text-ink-muted" />
              </div>

              <h3 className="mt-4 text-base font-semibold text-ink-body">No users yet</h3>

              <p className="mt-1 max-w-sm text-sm text-ink-muted">
                Registered users will appear here once they create an account.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-ink-muted/20 bg-ink-body/2">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-ink-muted">
                      User
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-ink-muted">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-ink-muted">
                      Joined
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-ink-muted/15">
                  {users.map((user) => {
                    const displayName = user.name?.trim() || "Unnamed user";

                    const initials =
                      user.name
                        ?.trim()
                        .split(/\s+/)
                        .slice(0, 2)
                        .map((part) => part[0]?.toUpperCase())
                        .join("") || "U";

                    return (
                      <tr key={user.id} className="transition-colors hover:bg-ink-body/2">
                        {/* User */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-3">
                            {user.image ? (
                              // A plain <img>: these are arbitrary provider avatar URLs, and
                              // next/image would need every one of those hosts declared in
                              // next.config.ts before it would render them at all.
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={user.image}
                                alt=""
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-body/10 text-sm font-semibold text-ink-body">
                                {initials}
                              </div>
                            )}

                            <div>
                              <p className="text-sm font-medium text-ink-body">{displayName}</p>

                              <p className="mt-0.5 text-xs text-ink-muted">ID: {user.id}</p>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-ink-muted">
                            <MailIcon className="h-4 w-4 shrink-0" />
                            {user.email}
                          </div>
                        </td>

                        {/* Joined */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-ink-muted">
                            <CalendarIcon className="h-4 w-4 shrink-0" />
                            {formatJoined(user.createdAt)}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {totalUsers > users.length && (
          <p className="mt-4 text-sm text-ink-muted">
            Showing the {users.length} most recent of {totalUsers} accounts.
          </p>
        )}
      </div>
    </main>
  );
}
