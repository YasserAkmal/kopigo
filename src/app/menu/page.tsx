import Link from "next/link";
import MenuCard from "@/app/components/MenuCard";
import menuData from "@/app/data/menu.json";
import  Image from "next/image";

export const metadata = {
  title: "Menu — Kopigo",
  description: "Daftar menu Kopigo.",
};

type SearchParams = {
  category?: string;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "") 
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function MenuPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const categories = menuData.categories ?? [];
  const allTabs = [
    { name: "All" as const },
    ...categories.map((c: any) => ({ name: c.name as string })),
  ];

  const selectedSlug = searchParams?.category?.toLowerCase() ?? "all";
  const selectedName =
    selectedSlug === "all"
      ? "All"
      : categories.find((c: any) => slugify(c.name) === selectedSlug)?.name ??
        "All";

  // Filter data sesuai kategori
  const visibleCategories =
    selectedName === "All"
      ? categories
      : categories.filter((c: any) => c.name === selectedName);

  return (
    <main>
       <section className="relative">
              <div className="absolute inset-0 -z-10">
                <Image
                  src="/bg.jpg" // ganti sesuai asetmu di /public
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
      
              <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white">
                  KOPIGO
                </h1>
                <p className="mt-4 max-w-2xl text-white/90 text-base sm:text-lg">
                  Where great coffee meets cozy vibes—a hangout spot for young people
                  to chat, create, and express yourself.
                </p>
              </div>
            </section>
      <section className="bg-white">
        <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

          {/* Tabs kategori */}
          <div className="mt-2 flex flex-wrap gap-2">
            {allTabs.map((tab) => {
              const slug = slugify(tab.name);
              const isActive =
                (selectedSlug === "all" && tab.name === "All") ||
                slug === selectedSlug;
              return (
                <Link
                  key={tab.name}
                  href={slug === "all" ? "/menu" : `/menu?category=${slug}`}
                  className={[
                    "px-4 py-2 rounded-full text-sm  transition",
                    isActive
                      ? "bg-sky-950 text-white"
                      : "bg-white text-sky-900 border-sky-950 hover:bg-sky-50 hover:text-sky-950",
                  ].join(" ")}
                >
                  {tab.name}
                </Link>
              );
            })}
          </div>

          {/* Daftar kategori (terfilter) */}
          {visibleCategories.map((cat: any) => (
            <div key={cat.name} className="mt-8">
              {/* Sembunyikan judul kategori kalau mode All menampilkan banyak kategori; 
                  kalau filter satu kategori, tetap tampilkan judulnya */}
              {(selectedName === "All" || visibleCategories.length > 1) && (
                <h2 className="font-serif text-lg sm:text-xl text-sky-950 mb-4">
                  {cat.name}
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items?.map((it: any) => (
                  <MenuCard
                    key={it.id}
                    publicId={it.publicId}
                    title={it.title}
                    desc={it.desc}
                    price={it.price}
                    badge={it.badge}
                  />
                ))}
                {!cat.items?.length && (
                  <div className="col-span-full text-sky-700 text-sm">
                    Belum ada item pada kategori ini.
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Jika kategori tidak ditemukan */}
          {visibleCategories.length === 0 && (
            <div className="mt-10 text-sky-700">
              Kategori tidak ditemukan. Coba pilih kategori lain.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
