"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CreditCard,
  ClipboardList,
  Menu,
  LayoutDashboard,
  Mail,
  MessageSquareText,
  ShieldCheck,
  SlidersHorizontal,
  X,
  Users,
} from "lucide-react";
import { AdminLogoutButton } from "./admin-logout-button";

type Props = { email: string };

const navigation = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/admins", label: "Admins", icon: ShieldCheck },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/reviews", label: "Reviews", icon: MessageSquareText },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/activity-logs", label: "Activity logs", icon: ClipboardList },
  { href: "/admin/configuration", label: "Configuration", icon: SlidersHorizontal },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === href : pathname.startsWith(href);
}

export function AdminSidebar({ email }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  return (
    <>
      <aside className="admin-scrollbar sticky top-0 hidden h-dvh max-h-dvh w-72 shrink-0 flex-col overflow-y-auto bg-brand-900 text-white lg:flex">
        <div className="border-b border-white/10 px-6 py-7">
          <Link href="/" className="flex items-center gap-3" aria-label="ScoreWell home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-pop-400 to-brand-500 shadow-lg shadow-black/20">
              <ShieldCheck className="h-5 w-5 text-white" />
            </span>
            <span>
              <span className="block font-display text-xl font-bold tracking-tight">ScoreWell</span>
              <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-pop-300">
                Admin workspace
              </span>
            </span>
          </Link>
        </div>

        <div className="px-4 pt-8">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            Manage
          </p>
          <nav className="mt-3 space-y-1.5" aria-label="Admin navigation">
            {navigation.map(({ href, label, icon: Icon }) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-white text-brand-900 shadow-lg shadow-black/10"
                      : "text-white/65 hover:bg-white/10 hover:text-white"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className={`h-4.5 w-4.5 ${active ? "text-pop-600" : "text-white/45 group-hover:text-pop-300"}`} />
                  {label}
                  {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-pop-500" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pop-500/20 text-sm font-bold text-pop-300">
                {email.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white">Administrator</p>
                <p className="mt-0.5 truncate text-[11px] text-white/45">{email}</p>
              </div>
            </div>
            <Link href="/" className="mt-4 flex items-center gap-2 text-xs font-semibold text-pop-300 hover:text-white">
              Visit public site <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
      </aside>

      <div className="border-b border-line bg-surface px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-pop-400 to-brand-600">
              <ShieldCheck className="h-4 w-4 text-white" />
            </span>
            Score<span className="text-pop-600">Well</span>
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close admin navigation" : "Open admin navigation"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink-body transition-colors hover:bg-surface-sunken"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ease-out lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Admin navigation"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
          <button
            type="button"
            aria-label="Close admin navigation"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-brand-900/50 backdrop-blur-[2px]"
          />
          <aside
            className={`relative flex h-full w-[min(84vw,20rem)] flex-col bg-brand-900 text-white shadow-2xl transition-transform duration-300 ease-out ${
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-pop-400 to-brand-500">
                  <ShieldCheck className="h-4 w-4 text-white" />
                </span>
                <div>
                  <p className="font-display font-bold">ScoreWell</p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-pop-300">Admin</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close admin navigation"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-1.5 px-3 py-6" aria-label="Admin navigation">
              {navigation.map(({ href, label, icon: Icon }) => {
                const active = isActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3.5 text-sm font-semibold ${
                      active ? "bg-white text-brand-900" : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className={`h-4.5 w-4.5 ${active ? "text-pop-600" : "text-white/45"}`} />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto border-t border-white/10 p-4">
              <p className="truncate text-xs text-white/50">{email}</p>
              <Link href="/" onClick={() => setMobileOpen(false)} className="mt-3 flex items-center gap-2 text-sm font-semibold text-pop-300">
                Visit public site <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <AdminLogoutButton mobile onLogout={() => setMobileOpen(false)} />
            </div>
          </aside>
      </div>
    </>
  );
}