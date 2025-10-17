import cabang from "@/app/data/cabang.json";

export type Branch = (typeof cabang.items)[number];

export function getBranches(): Branch[] {
  return cabang.items;
}

export function findBranch(slug?: string | null): Branch | null {
  if (!slug) return null;
  return cabang.items.find((b) => b.slug === slug) ?? null;
}

/** Semua cabang mengarah ke /storebranches?branch=<slug> */
export function getBranchHref(slug: string) {
  return `/storebranches?branch=${encodeURIComponent(slug)}`;
}

export function mapsLink(query: string) {
  // Link luar (buka tab baru) – aman tanpa API key
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
}

export function mapsEmbedSrc(query: string) {
  // Iframe embed sederhana tanpa API key
  // Bisa pakai format q=<query>&output=embed
  return `https://www.google.com/maps?q=${encodeURIComponent(
    query
  )}&output=embed`;
}
