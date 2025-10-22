// app/storebranches/page.tsx
import Image from "next/image";
import { findBranch, mapsLink, mapsEmbedSrc } from "@/app/lib/branches";

type SP = Record<string, string | string[] | undefined>;

export default async function StoreBranches({
  searchParams,
}: {
  // ⬅️ hanya Promise, bukan union
  searchParams: Promise<SP>;
}) {
  const sp = (await searchParams) ?? {};
  const branchParam = typeof sp.branch === "string" ? sp.branch : null;
  const branch = findBranch(branchParam);

  if (!branch) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <h1 className="text-2xl font-bold">Cabang tidak ditemukan</h1>
        <p className="text-sm text-gray-500 mt-2">
          Pastikan parameter <code>?branch=</code> benar.
        </p>
      </main>
    );
  }

  const link = branch.gmapsQuery ? mapsLink(branch.gmapsQuery) : null;
  const embed = branch.gmapsQuery ? mapsEmbedSrc(branch.gmapsQuery) : null;

  return (
    <main className="mx-auto max-w-7xl p-6">
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111F15]">{branch.name}</h1>
          <p className="text-sm text-gray-500">
            {branch.address} • {branch.openingHours} • {branch.phone}
          </p>
          {branch.note && (
            <p className="text-xs text-gray-400 mt-1">{branch.note}</p>
          )}
        </div>
      </header>

      {embed && (
        <section className="mb-8">
          <div className="aspect-video w-full h-screen overflow-hidden">
            <iframe
              title={`Peta ${branch.name}`}
              src={embed}
              referrerPolicy="no-referrer-when-downgrade"
              loading="lazy"
              className="h-full w-full"
              allowFullScreen
            />
          </div>
        </section>
      )}
    </main>
  );
}
