// app/storebranches/page.tsx
import Image from "next/image";
import { findBranch, mapsLink, mapsEmbedSrc } from "@/app/lib/branches";

type SP = Record<string, string | string[] | undefined>;

export default async function StoreBranches({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = (await searchParams) ?? {};
  const branchParam = typeof sp.branch === "string" ? sp.branch : null;
  const branch = findBranch(branchParam);

  if (!branch) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <h1 className="text-2xl font-bold">Branch not found</h1>
        <p className="text-sm text-gray-500 mt-2">
          Make sure the <code>?branch=</code> parameter is correct.
        </p>
      </main>
    );
  }

  const link = branch.gmapsQuery ? mapsLink(branch.gmapsQuery) : null;
  const embed = branch.gmapsQuery ? mapsEmbedSrc(branch.gmapsQuery) : null;

  return (
    <main className="mx-auto max-w-12xl p-6">
      <header className="mb-6 flex flex-col gap-3">
        <div
          className="relative overflow-hidden px-5 py-10 text-white"
          style={{
            backgroundImage: `url(${branch.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-3xl font-bold">
              {branch.name}
            </h1>
            {branch.note && (
              <p className="text-s text-gray-300 mt-2">
                {branch.note}
              </p>
            )}
            <p className="text-xs text-gray-200 mt-2">
              {branch.address} • {branch.openingHours} • {branch.phone}
            </p>
          </div>
        </div>


      </header>

      {/* BEST SELLERS */}
      {branch.bestSellers && branch.bestSellers.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">Best Sellers</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {branch.bestSellers.map((item: string, i: number) => (
              <li
                key={i}
                className="bg-gray-50 px-4 py-2 rounded-md text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* PARKING & ACCESS */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Parking & Accessibility</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">Parking Info</p>
            <p className="text-sm text-gray-600">{branch.parking}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">Wheelchair Access</p>
            <p className="text-sm text-gray-600">
              {branch.accessible ? "Available" : "Not Available"}
            </p>
          </div>
        </div>
      </section>

      {/* PROMO */}
      {branch.promo && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-2">Current Promotion</h2>
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-sm text-green-800">
            {branch.promo}
          </div>
        </section>
      )}

      {/* PHOTOS */}
      {branch.photos && branch.photos.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {branch.photos.map((photo: string, i: number) => (
              <div key={i} className="relative w-full h-64">
                <Image
                  src={photo}
                  alt={`${branch.name} photo ${i + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MAP */}
      {embed && (
        <section className="mt-10 mb-8 flex justify-center">
          <div className="aspect-video w-full max-w-7xl">
            <iframe
              title={`Map ${branch.name}`}
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