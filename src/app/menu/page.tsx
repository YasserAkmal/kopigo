// app/menu/page.tsx
import Link from "next/link";
import MenuCard from "@/app/components/MenuCard";
import menuData from "@/app/data/menu.json";

export const metadata = {
  title: "Menu — Kopigo",
  description: "Daftar menu Kopigo.",
};

type SP = Record<string, string | string[] | undefined>;

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

export default async function MenuPage({
  searchParams,
}: {
  // Next 15: Promise
  searchParams?: Promise<SP>;
}) {
  const sp = (await searchParams) ?? {};
  const categories = menuData.categories ?? [];

  const allTabs = [
    { name: "All" as const },
    ...categories.map((c: any) => ({ name: c.name as string })),
  ];

  const selectedSlugRaw =
    typeof sp.category === "string"
      ? sp.category
      : Array.isArray(sp.category)
      ? sp.category[0]
      : "all";

  const selectedSlug = (selectedSlugRaw ?? "all").toLowerCase();
  const selectedName =
    selectedSlug === "all"
      ? "All"
      : categories.find((c: any) => slugify(c.name) === selectedSlug)?.name ??
        "All";

  const visibleCategories =
    selectedName === "All"
      ? categories
      : categories.filter((c: any) => c.name === selectedName);

  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="font-serif text-2xl sm:text-3xl text-sky-950">
            Menu Kopigo
          </h1>

          {/* Tabs kategori */}
          <div className="mt-6 flex flex-wrap gap-2">
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
                    "px-4 py-2 rounded-full text-sm border transition",
                    isActive
                      ? "bg-sky-600 text-white border-sky-600"
                      : "bg-white text-sky-900 border-sky-200",
                  ].join(" ")}
                >
                  {tab.name}
                </Link>
              );
            })}
          </div>

          {/* Grid menu (terfilter) */}
          {visibleCategories.map((cat: any) => (
            <div key={cat.name} className="mt-8">
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
