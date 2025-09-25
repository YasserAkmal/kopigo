"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu as MenuIcon, X } from "lucide-react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const NAV_ITEMS = [
  { label: "DASHBOARD", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "MENU", href: "/menu" },
  { label: "STORE", href: "/store" },
  { label: "CONTACT US", href: "/contact" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-sky-950 text-zinc-50">
      <nav className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <span className="inline-flex h-9 w-9 items-center justify-center bg-white/10 ring-1 ring-white/30">
              K
            </span>
            <span className="truncate text-base font-semibold tracking-tight">
              Kopigo
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "px-3 py-2 text-sm transition-colors",
                  "hover:underline underline-offset-4 decoration-2",
                  isActive(item.href)
                    ? "font-semibold underline underline-offset-4 decoration-2"
                    : "font-normal"
                )}
                prefetch
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        <div
          className={cx(
            "md:hidden origin-top overflow-hidden transition-[max-height,opacity] duration-300 rounded-b-xl",
            open
              ? "max-h-96 opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          )}
        >
          <div className="mt-2 ">
            <div className="flex flex-col gap-1 py-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={`m-${item.href}`}
                  href={item.href}
                  className={cx(
                    "rounded-lg px-3 py-2 text-sm transition-colors text-white",
                    "hover:underline underline-offset-4 decoration-2",
                    isActive(item.href)
                      ? "font-semibold underline underline-offset-4 decoration-2"
                      : "font-normal"
                  )}
                  prefetch
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
