"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getBranches, getBranchHref, Branch } from "@/app/lib/branches";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  isActive?: boolean;
  label?: string;
  onNavigate?: () => void;
};

export default function StoreDropdown({
  isActive,
  label = "STORE",
  onNavigate,
}: Props) {
  const branches = getBranches();
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
          "px-3 py-2 text-sm inline-flex items-center gap-1 rounded-md transition-colors",
          "hover:underline underline-offset-4 decoration-2",
          isActive
            ? "font-semibold underline underline-offset-4 decoration-2"
            : "font-normal"
        )}
      >
        {label}
        <ChevronDown
          className={cx("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>

      {/* Hover bridge */}
      <div aria-hidden className="absolute left-0 right-0 top-full h-2" />

      <div
        role="menu"
        className={cx(
          "absolute left-1/2 -translate-x-1/2 mt-2 w-[720px] max-w-[90vw]",
          "rounded-xl border border-white/10 bg-sky-900/95 backdrop-blur supports-[backdrop-filter]:bg-sky-900/70",
          "shadow-2xl ring-1 ring-black/5 p-4",
          "transition-all duration-150 origin-top",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
        onMouseEnter={openNow}
        onMouseLeave={() => closeWithDelay()}
      >
        <div className="grid grid-cols-3 gap-4">
          {branches.map((b: Branch) => (
            <Link
              key={b.slug}
              href={getBranchHref(b.slug)}
              className="group rounded-lg overflow-hidden border border-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
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
                <p className="text-xs text-white/70">Lihat menu cabang →</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-3 text-right">
          <Link
            href="/storebranches"
            className="text-xs underline underline-offset-4 hover:opacity-80"
            prefetch
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
            onFocus={openNow}
            onBlur={() => closeWithDelay()}
          >
            Lihat semua cabang
          </Link>
        </div>
      </div>
    </div>
  );
}
