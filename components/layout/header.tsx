"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Session } from "next-auth";
import { signOutAction } from "@/lib/auth-actions";
import { ThemeToggle } from "./theme-toggle";
import { NAV_ITEMS } from "@/lib/nav-data";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { ChevronDownIcon, CloseIcon, HomeIcon, MenuIcon, SearchIcon } from "./icons";

/** Dropdown panel width tracks how many columns the menu actually has. */
const PANEL_WIDTH: Record<number, string> = {
  1: "w-64",
  2: "w-160",
  3: "w-200",
  4: "w-240",
};

export function Header({ session }: { session: Session | null }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Tier 1 — white brand row: logo, search, account actions. */}
      <div className="border-b border-line/70 bg-surface">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
          <Logo />

          <form action="/search" className="ml-auto hidden max-w-sm flex-1 items-center lg:flex">
            <div className="relative w-full">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                type="search"
                name="q"
                placeholder="Search tests, tips, tools..."
                className="w-full rounded-full border border-line bg-surface-muted py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted transition-colors focus:border-brand-400 focus:bg-surface focus:outline-none focus:ring-4 focus:ring-brand-100"
              />
            </div>
          </form>

          <div className="hidden items-center gap-3 lg:flex">
            <Button href="/pricing" size="sm">
              Upgrade
            </Button>
          </div>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="ml-auto flex items-center justify-center rounded-full p-2 text-ink-body hover:bg-surface-sunken lg:hidden"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Tier 2 — navy navigation band. */}
      <div className="hidden bg-brand-700 lg:block">
        <div className="mx-auto flex h-12 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label="Home"
            className="flex items-center rounded-md px-3 py-2 text-white/90 transition-colors hover:bg-white/10 hover:text-white"
          >
            <HomeIcon />
          </Link>

          <nav ref={navRef} className="flex items-center">
            {NAV_ITEMS.map((item) => {
              if (item.type === "link") {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </Link>
                );
              }

              const isOpen = openMenu === item.label;
              return (
                <div key={item.label} className="relative">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenMenu(isOpen ? null : item.label)}
                    className={cn(
                      "flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                      isOpen ? "bg-white/15 text-white" : "text-white/90 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={isOpen ? "rotate-180 transition-transform" : "transition-transform"}
                    />
                  </button>

                  {isOpen && (
                    <div
                      className={cn(
                        "absolute left-0 top-full z-40 mt-2 rounded-2xl border border-line/80 bg-surface p-6 shadow-2xl shadow-zinc-900/15",
                        PANEL_WIDTH[item.columns.length] ?? "w-200",
                      )}
                    >
                      <div
                        className="grid gap-6"
                        style={{ gridTemplateColumns: `repeat(${item.columns.length}, minmax(0, 1fr))` }}
                      >
                        {item.columns.map((column) => (
                          <div key={column.heading}>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-pop-600">
                              {column.heading}
                            </p>
                            <ul className="flex flex-col gap-1.5">
                              {column.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    onClick={() => setOpenMenu(null)}
                                    className="text-sm text-ink-body hover:text-link"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <div className="mr-2">
              <ThemeToggle />
            </div>
            {session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-md px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 hover:text-white"
                >
                  {session.user.name ?? session.user.email}
                </Link>
                <form action={signOutAction}>
                  <button
                    type="submit"
                    className="rounded-md px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 hover:text-white"
                  >
                    Log out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 hover:text-white"
                >
                  Sign up
                </Link>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 hover:text-white"
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-surface px-4 pb-6 pt-4 lg:hidden">
          <form action="/search" className="mb-4">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                type="search"
                name="q"
                placeholder="Search tests, tips, tools..."
                className="w-full rounded-full border border-line bg-surface-muted py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
              />
            </div>
          </form>

          <div className="flex flex-col divide-y divide-zinc-100">
            {NAV_ITEMS.map((item) => {
              if (item.type === "link") {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-3 text-sm font-medium text-ink"
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <details key={item.label} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-medium text-ink">
                    {item.label}
                    <ChevronDownIcon className="text-ink-muted transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="grid grid-cols-2 gap-4 pb-3 pl-2">
                    {item.columns.map((column) => (
                      <div key={column.heading}>
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                          {column.heading}
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {column.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-sm text-ink-body"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              );
            })}
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
            {session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-center text-sm font-medium text-ink-body hover:bg-surface-muted"
                >
                  {session.user.name ?? session.user.email}
                </Link>
                <form action={signOutAction}>
                  <button
                    type="submit"
                    className="w-full rounded-md px-3 py-2 text-center text-sm font-medium text-ink-body hover:bg-surface-muted"
                  >
                    Log out
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-center text-sm font-medium text-ink-body hover:bg-surface-muted"
              >
                Log in
              </Link>
            )}
            <Button href="/pricing" onClick={() => setMobileOpen(false)} className="w-full">
              Upgrade
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
