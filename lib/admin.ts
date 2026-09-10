import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/**
 * Who counts as an admin.
 *
 * The database `role` is the real answer, and the admin workspace edits it. `ADMIN_EMAILS`
 * is kept as a bootstrap and a way back in, for two situations that would otherwise have no
 * remedy:
 *
 *  - **The first admin.** The migration that adds `role` defaults every existing account to
 *    USER, so immediately after it runs nobody is an admin — including the owner. The page
 *    that promotes people is itself behind this check, so without a fallback there is no way
 *    to grant the first role except by hand in the database.
 *  - **Losing the last one.** An admin can demote another admin. Remove the last one and the
 *    workspace is closed to everybody, permanently.
 *
 * The env var is set by whoever controls the deployment, so it is no weaker than the
 * database as a source of authority — and it cannot be changed from inside the app.
 */

function bootstrapAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isBootstrapAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return bootstrapAdminEmails().includes(email.toLowerCase());
}

export async function isAdminUser(userId: string | null | undefined): Promise<boolean> {
  if (!userId) return false;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true, email: true },
  });
  if (!user) return false;

  return user.role === "ADMIN" || isBootstrapAdminEmail(user.email);
}

/**
 * The guard every admin *page* must call before it reads anything.
 *
 * `app/admin/layout.tsx` also checks, but a layout cannot protect a page: React renders the
 * two in parallel, so the page's queries run and its results are serialised into the RSC
 * payload even when the layout decides not to display them. That was measured, not assumed —
 * a signed-in non-admin was served "Unauthorized" on screen while every user's email address
 * sat in the HTML source of the same response.
 *
 * So the layout is the visible frame, and this is the actual gate. Server Actions do their
 * own check for the same reason: nothing outside the function itself can be relied on.
 */
export async function requireAdminPage() {
  const session = await auth();
  if (!session?.user?.id || !(await isAdminUser(session.user.id))) {
    notFound();
  }
  return session;
}
