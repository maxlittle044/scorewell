import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { Users, Mail, CalendarDays } from "lucide-react";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
    },
  });

  const totalUsers = users.length;

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <PageHeader
          title="Users"
          description={`${totalUsers} registered ${
            totalUsers === 1 ? "user" : "users"
          }.`}
        />

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-ink-muted/20 bg-background p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-body/5">
                <Users className="h-5 w-5 text-ink-body" />
              </div>

              <div>
                <p className="text-sm text-ink-muted">Total users</p>
                <p className="mt-1 text-2xl font-semibold text-ink-body">
                  {totalUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-ink-muted/20 bg-background p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-body/5">
                <CalendarDays className="h-5 w-5 text-ink-body" />
              </div>

              <div>
                <p className="text-sm text-ink-muted">Latest signup</p>
                <p className="mt-1 text-lg font-semibold text-ink-body">
                  {users.length > 0
                    ? users[0].createdAt.toLocaleDateString()
                    : "—"}
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
                <Users className="h-7 w-7 text-ink-muted" />
              </div>

              <h3 className="mt-4 text-base font-semibold text-ink-body">
                No users yet
              </h3>

              <p className="mt-1 max-w-sm text-sm text-ink-muted">
                Registered users will appear here once they create an account.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-ink-muted/20 bg-ink-body/[0.02]">
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
                      <tr
                        key={user.id}
                        className="transition-colors hover:bg-ink-body/[0.02]"
                      >
                        {/* User */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-3">
                            {user.image ? (
                              <img
                                src={user.image}
                                alt={displayName}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-body/10 text-sm font-semibold text-ink-body">
                                {initials}
                              </div>
                            )}

                            <div>
                              <p className="text-sm font-medium text-ink-body">
                                {displayName}
                              </p>

                              <p className="mt-0.5 text-xs text-ink-muted">
                                ID: {user.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-ink-muted">
                            <Mail className="h-4 w-4 shrink-0" />
                            {user.email}
                          </div>
                        </td>

                        {/* Joined */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-ink-muted">
                            <CalendarDays className="h-4 w-4 shrink-0" />
                            {user.createdAt.toLocaleDateString()}
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
      </div>
    </main>
  );
}