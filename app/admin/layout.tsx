import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isAdminUser } from "@/lib/admin";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { UnauthorizedView } from "@/components/layout/unauthorized-view";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const session = await auth();
  if (!session) redirect("/login?callbackUrl=/admin");
  if (!(await isAdminUser(session.user.id))) return <UnauthorizedView />;

  return (
    <div className="flex min-h-[calc(100vh-0px)] flex-1 flex-col bg-surface-muted lg:flex-row">
      <AdminSidebar email={session.user?.email ?? ""} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}