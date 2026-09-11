import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getFirebaseAdminAuth, isFirebaseConfigured } from "@/lib/firebase/admin";
import { PageHeader } from "@/components/layout/page-header";
import { Users, CalendarDays } from "lucide-react";
import { UsersTable } from "./users-table";
import { requireAdminPage } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Users — ScoreWell",
  description: "Manage ScoreWell users, roles, and account access.",
};

export default async function AdminUsersPage() {
  // The gate. See requireAdminPage — the layout alone does not stop this page running.
  await requireAdminPage();

  const users = await prisma.user.findMany({
    where: { role: "USER" },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      firebaseUid: true,
      role: true,
      createdAt: true,
    },
  });

  const disabledByFirebaseUid = new Map<string, boolean>();
  const emailVerifiedByFirebaseUid = new Map<string, boolean>();
  if (isFirebaseConfigured()) {
    const firebaseAuth = getFirebaseAdminAuth();
    await Promise.all(
      users.flatMap((user) =>
        user.firebaseUid
          ? [
              firebaseAuth
                .getUser(user.firebaseUid)
                .then((firebaseUser) => {
                  disabledByFirebaseUid.set(user.firebaseUid!, firebaseUser.disabled);
                  emailVerifiedByFirebaseUid.set(user.firebaseUid!, firebaseUser.emailVerified);
                })
                .catch(() => undefined),
            ]
          : [],
      ),
    );
  }

  const totalUsers = users.length;

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div data-reveal>
          <PageHeader
            title="Users"
            description={`${totalUsers} ${
              totalUsers === 1 ? "account" : "accounts"
            } with the standard role. Administrators are listed under Admins.`}
          />
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div data-reveal className="rounded-2xl border border-ink-muted/20 bg-background p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-body/5">
                <Users className="h-5 w-5 text-ink-body" />
              </div>

              <div>
                {/* Not "Total users": this list excludes admins, and the overview's own
                    "Total users" counts everybody. Two cards with the same label and
                    different numbers is how someone ends up mistrusting both. */}
                <p className="text-sm text-ink-muted">Standard users</p>
                <p className="mt-1 text-2xl font-semibold text-ink-body">
                  {totalUsers}
                </p>
              </div>
            </div>
          </div>

          <div data-reveal style={{ transitionDelay: "100ms" }} className="rounded-2xl border border-ink-muted/20 bg-background p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-body/5">
                <CalendarDays className="h-5 w-5 text-ink-body" />
              </div>

              <div>
                <p className="text-sm text-ink-muted">Latest signup</p>
                <p className="mt-1 text-lg font-semibold text-ink-body">
                  {users.length > 0
                    ? users[0].createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <UsersTable
          users={users.map((user) => ({
            ...user,
            createdAt: user.createdAt.toISOString(),
            disabled: user.firebaseUid ? disabledByFirebaseUid.get(user.firebaseUid) ?? false : false,
            emailVerified: user.firebaseUid ? emailVerifiedByFirebaseUid.get(user.firebaseUid) ?? false : false,
          }))}
        />
      </div>
    </main>
  );
}