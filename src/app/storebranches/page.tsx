import Image from "next/image";
import { findBranch, mapsEmbedSrc } from "@/app/lib/branches";

export default function StoreBranches({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const branchParam =
    typeof searchParams?.branch === "string" ? searchParams.branch : null;

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

  const embed = branch.gmapsQuery ? mapsEmbedSrc(branch.gmapsQuery) : null;

  return (
    <main className="mx-auto max-w-7xl p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-semibold text-sky-950">{branch.name}</h1>
        <p className="text-gray-600 text-sm mt-1">
          {branch.address} • {branch.openingHours} • {branch.phone}
        </p>
        {branch.note && <p className="text-xs text-gray-400">{branch.note}</p>}
      </header>

      {embed && (
        <div className="rounded-xl overflow-hidden shadow">
          <iframe
            title={`Peta ${branch.name}`}
            src={embed}
            referrerPolicy="no-referrer-when-downgrade"
            loading="lazy"
            className="w-full aspect-video border-0"
            allowFullScreen
          />
        </div>
      )}
    </main>
  );
}
