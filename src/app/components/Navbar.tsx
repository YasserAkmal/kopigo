"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, X, ChevronDown } from "lucide-react";
import cabang from "@/app/data/cabang.json"; // { items: [{ slug, name, image, ... }] }

type Branch = (typeof cabang.items)[number];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const NAV_ITEMS = [
  { label: "Dashboard", href: "/" },
  { label: "About Us", href: "/aboutus" },
  { label: "Our Menu", href: "/menu" },
  { label: "Locations", href: "/storebranches" },
  { label: "Contact Us", href: "/contactus" },
] as const;

const getBranchHref = (slug: string) =>
  `/storebranches?branch=${encodeURIComponent(slug)}`;

/* ===== Desktop STORE dropdown (di dalam Navbar saja) ===== */
function StoreDropdownDesktop({
  isActive,
  onNavigate,
}: {
  isActive?: boolean;
  onNavigate?: () => void;
}) {
  const branches: Branch[] = cabang.items;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<number | null>(null);
  const [open, setOpen] = useState(false);

  const openNow = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  };

  const closeWithDelay = (delay = 260) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
      closeTimer.current = null;
    }, delay);
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={() => closeWithDelay()}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openNow())}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
          if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
            e.preventDefault();
            openNow();
          }
        }}
        onFocus={openNow}
        onBlur={() => closeWithDelay()}
        className={cx(
          "px-3 py-2 text-sm inline-flex items-center gap-1 transition-colors",
          "hover:underline underline-offset-4 decoration-2",
          isActive
            ? "font-semibold underline underline-offset-4 decoration-2"
            : "font-normal"
        )}
      >
        Locations
        <ChevronDown
          className={cx("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>
      <div aria-hidden className="absolute left-0 right-0 top-full h-2" />

      <div
        role="menu"
        className={cx(
          "absolute -translate-x-3/4 mt-2 w-[720px] max-w-[90vw]",
          "bg-[#253A5B]",
          "shadow-2xl ring-1 ring-black/5 p-4",
          "transition-all duration-150 origin-top",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-85 pointer-events-none"
        )}
        onMouseEnter={openNow}
        onMouseLeave={() => closeWithDelay()}
      >
        <div className="grid grid-cols-3 gap-4">
          {branches.map((b) => (
            <Link
              key={b.slug}
              href={getBranchHref(b.slug)}
              className="group overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/60"
              prefetch
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              onFocus={openNow}
              onBlur={() => closeWithDelay()}
            >
              <div className="relative h-32">
                <Image
                  src={b.image || "/dummy-img.jpg"}
                  alt={b.name}
                  fill
                  sizes="(max-width: 768px) 90vw, 240px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold">{b.name}</p>
                <p className="text-xs text-white/70">{b.address}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== Mobile STORE accordion (tetap di dalam Navbar) ===== */
function StoreAccordionMobile({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const branches: Branch[] = cabang.items;

  return (
    <div className="px-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-lg px-3 py-2 text-left text-sm inline-flex items-center justify-between hover:underline underline-offset-4"
        aria-expanded={open}
      >
        <span>Locations</span>
        <ChevronDown
          className={cx("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>

      <div
        className={cx(
          "overflow-hidden transition-[max-height,opacity] duration-300",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="grid grid-cols-2 gap-3 px-2 pb-3">
          {branches.map((b) => (
            <Link
              key={`m-${b.slug}`}
              href={getBranchHref(b.slug)}
              className="rounded-lg overflow-hidden border border-white/10 hover:border-white/30"
              prefetch
              onClick={onNavigate}
            >
              <div className="relative h-24">
                <Image
                  src={b.image || "/dummy-img.jpg"}
                  alt={b.name}
                  fill
                  sizes="45vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-2">
                <p className="text-xs font-semibold">{b.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

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
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#253A5B] text-zinc-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 min-w-0 hover:opacity-80 transition-opacity"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center">
              <Image
                src="/LOGO-KOPIGO.svg"
                alt="KOPIGO"
                width={36}
                height={36}
                priority
              />
            </span>
            <span className="font-sans text-white text-base font-semibold tracking-tight">
              KOPIGO
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
              item.label === "Locations" ? (
                <StoreDropdownDesktop
                  key={item.href}
                  isActive={isActive(item.href)}
                  onNavigate={() => setOpen(false)}
                />
              ) : (
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
              )
            )}
          </div>

          {/* Mobile toggle */}
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

        {/* Mobile menu (di navbar) */}
        <div
          className={cx(
            "md:hidden origin-top overflow-hidden transition-[max-height,opacity] duration-300 rounded-b-xl",
            open
              ? "max-h-[80vh] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          )}
        >
          <div className="mt-2">
            <div className="flex flex-col gap-1 py-2">
              {NAV_ITEMS.map((item) =>
                item.label === "Locations" ? (
                  <StoreAccordionMobile
                    key={`m-${item.href}`}
                    onNavigate={() => setOpen(false)}
                  />
                ) : (
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
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
