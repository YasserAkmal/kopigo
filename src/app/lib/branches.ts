import cabang from "@/app/data/cabang.json";

export type Branch = {
  slug: string;
  name: string;
  image?: string;
  address: string;
  phone: string;
  openingHours: string;
  note?: string;
  gmapsQuery?: string;
};

export function findBranch(slug: string | null): Branch | undefined {
  if (!slug) return;
  return cabang.items.find((b) => b.slug === slug);
}

export function mapsLink(query: string): string {
  const encoded = encodeURIComponent(query);
  return `https://www.google.com/maps/search/?api=1&query=${encoded}`;
}

export function mapsEmbedSrc(query: string): string {
  const key = process.env.NEXT_PUBLIC_GMAPS_KEY;
  const encoded = encodeURIComponent(query);

  // ✅ kalau key kosong, jangan crash — pakai fallback embed tanpa key
  if (!key) {
    console.warn(
      "⚠️  NEXT_PUBLIC_GMAPS_KEY tidak ditemukan, pakai fallback embed."
    );
    return `https://www.google.com/maps?q=${encoded}&output=embed`;
  }

  return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${encoded}`;
}
 