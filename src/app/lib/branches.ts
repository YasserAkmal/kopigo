// app/lib/branches.ts
import cabang from "@/app/data/cabang.json";
export type Branch = {
  slug: string;
  name: string;
  image: string;
  address: string;
  phone: string;
  openingHours: string;
  note?: string;
  gmapsQuery?: string;

  bestSellers?: string[];
  parking?: string;
  accessible?: boolean;
  social?: string;
  promo?: string;
  photos?: string[];
};

export function getBranches(): Branch[] {
  return (cabang.items ?? []) as Branch[];
}

export function getBranchHref(slug: string): string {
  // sesuaikan dengan path page kamu: /app/storebranches/page.tsx
  return `/storebranches?branch=${encodeURIComponent(slug)}`;
}

export function findBranch(slug: string | null): Branch | undefined {
  if (!slug) return;
  return getBranches().find((b) => b.slug === slug);
}

export function mapsLink(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
}

export function mapsEmbedSrc(query: string): string {
  const key = process.env.NEXT_PUBLIC_GMAPS_KEY;
  const encoded = encodeURIComponent(query);
  if (!key) {
    console.warn(
      "⚠️ NEXT_PUBLIC_GMAPS_KEY tidak ditemukan, pakai fallback embed."
    );
    return `https://www.google.com/maps?q=${encoded}&output=embed`;
  }
  return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${encoded}`;
}
