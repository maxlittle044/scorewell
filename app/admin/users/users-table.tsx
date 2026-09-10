"use client";

import { useDeferredValue, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Mail, Search, Users } from "lucide-react";
import { CreateUserButton } from "./create-user-button";
import { UserActionsMenu } from "./user-actions-menu";

type UserRow = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  firebaseUid: string | null;
  role: "USER" | "ADMIN";
  createdAt: string;
  disabled: boolean;
};

export function UsersTable({ users, defaultRole = "USER" }: { users: UserRow[]; defaultRole?: "USER" | "ADMIN" }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const filteredUsers = users.filter((user) => {
    if (!deferredQuery) return true;
    return `${user.name ?? ""} ${user.email}`.toLowerCase().includes(deferredQuery);
  });
  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const firstVisible = filteredUsers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastVisible = Math.min(currentPage * pageSize, filteredUsers.length);
  const visibleUsers = filteredUsers.slice(firstVisible - 1, lastVisible);

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function updatePageSize(value: number) {
    setPageSize(value);
    setPage(1);
  }

  return (
    <div data-reveal style={{ transitionDelay: "180ms" }} className="mt-8 overflow-hidden rounded-2xl border border-ink-muted/20 bg-background">
      <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <label htmlFor="user-search" className="sr-only">Search users</label>
          <input
            id="user-search"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Search by name or email"
            className="w-full rounded-xl border border-line bg-surface py-2.5 pl-9 pr-4 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <p className="shrink-0 text-sm text-ink-muted">
            {firstVisible}-{lastVisible} of {filteredUsers.length} users
          </p>
          <CreateUserButton defaultRole={defaultRole} />
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <Users className="h-8 w-8 text-ink-muted" />
          <h3 className="mt-4 text-base font-semibold text-ink-body">No matching users</h3>
          <p className="mt-1 text-sm text-ink-muted">Try a different name or email address.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-ink-muted/20 bg-ink-body/2">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-ink-muted">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-ink-muted">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-ink-muted">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-ink-muted">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-ink-muted">Joined</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-ink-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-muted/15">
              {visibleUsers.map((user) => {
                const displayName = user.name?.trim() || "Unnamed user";
                const initials = user.name?.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "U";

                return (
                  <tr key={user.id} className="transition-colors hover:bg-ink-body/2">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          // Arbitrary provider avatar URLs; next/image would need every one
                          // of those hosts declared in next.config.ts before it rendered.
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={user.image} alt="" className="h-10 w-10 rounded-full object-cover" />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-body/10 text-sm font-semibold text-ink-body">{initials}</div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-ink-body">{displayName}</p>
                          <p className="mt-0.5 text-xs text-ink-muted">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-ink-muted"><Mail className="h-4 w-4 shrink-0" />{user.email}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${user.role === "ADMIN" ? "bg-brand-100 text-link" : "bg-surface-sunken text-ink-muted"}`}>
                        {user.role === "ADMIN" ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${user.disabled ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-700"}`}>
                        {user.disabled ? "Suspended" : "Active"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {/* suppressHydrationWarning: the server formats in its timezone, the browser in the
                          reader's, so the two passes can differ by a day near midnight. */}
                      <div suppressHydrationWarning className="flex items-center gap-2 text-sm text-ink-muted"><CalendarDays className="h-4 w-4 shrink-0" />{new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <UserActionsMenu userId={user.id} email={user.email} name={user.name} role={user.role} disabled={user.disabled} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {filteredUsers.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-line px-4 py-3 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-2">
            Rows per page
            <select
              value={pageSize}
              onChange={(event) => updatePageSize(Number(event.target.value))}
              className="rounded-lg border border-line bg-surface px-2.5 py-1.5 font-medium text-ink-body outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            >
              {[10, 25, 50, 100].map((size) => <option key={size} value={size}>{size}</option>)}
            </select>
          </label>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <span>Page {currentPage} of {pageCount}</span>
            <div className="flex gap-1">
              <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                className="rounded-lg border border-line p-2 text-ink-body hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next page"
                disabled={currentPage === pageCount}
                onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
                className="rounded-lg border border-line p-2 text-ink-body hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
