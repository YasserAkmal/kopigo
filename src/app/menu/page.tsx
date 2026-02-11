// app/menu/page.tsx
"use client";
import Link from "next/link";
import MenuCard from "@/app/components/MenuCard";
import menuData from "@/app/data/menu.json";
import Image from "next/image";
import GradualBlur from "../components/GradualBlur";

type SP = Record<string, string | string[] | undefined>;
type MenuItem = {
  id: string;
  title: string;
  desc: string;
  price: number;
  badge?: string;
  publicId?: string;
};
type MenuCategory = { name: string; items: MenuItem[] };
type MenuData = { categories: MenuCategory[] };

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
  searchParams?: Promise<SP>;
}) {
  const sp = (await searchParams) ?? {};
  const data = (menuData as MenuData) ?? { categories: [] };
  const categories = data.categories ?? [];

  const allTabs = [
    { name: "All" as const },
    ...categories.map((c) => ({ name: c.name })),
  ];

  // Ambil nilai query ?category=...
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
      : (categories.find((c) => slugify(c.name) === selectedSlug)?.name ??
        "All");

  const visibleCategories =
    selectedName === "All"
      ? categories
      : categories.filter((c) => c.name === selectedName);

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

        <div className="mx-auto max-w-12xl px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-semibold text-white">
            Menu Kopigo
          </h1>
          <p className="mt-4 max-w-2xl text-white/90 text-base sm:text-lg">
            Enjoy a variety of coffee and specialty drinks at Kopigo—a vibrant
            spot to hang out, create, and express yourself.
          </p>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-12xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Tabs kategori */}
          <div className=" flex flex-wrap gap-2">
            {allTabs.map((tab) => {
              const slug = slugify(tab.name);
              const isActive =
                (selectedSlug === "all" && tab.name === "All") ||
                slug === selectedSlug;
              const href = slug === "all" ? "/menu" : `/menu?category=${slug}`;
              return (
                <Link
                  key={tab.name}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "px-4 py-2 text-sm transition",
                    isActive
                      ? "bg-[#111F15] text-white border-[#111F15]"
                      : "bg-white text-[#111F15]  hover:border-bottom-[#111F15]",
                  ].join(" ")}
                >
                  {tab.name}
                </Link>
              );
            })}
          </div>

          {/* Grid menu (terfilter) */}
          {visibleCategories.map((cat) => (
            <div key={cat.name} className="mt-8">
              {(selectedName === "All" || visibleCategories.length > 1) && (
                <h2 className="font-playfair text-lg sm:text-xl text-[#111F15] mb-4">
                  {cat.name}
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items?.map((it) => (
                  <MenuCard
                    key={it.id}
                    publicId={it.publicId ?? ""}
                    title={it.title}
                    desc={it.desc}
                    price={it.price}
                    badge={it.badge}
                  />
                ))}
                {!cat.items?.length && (
                  <div className="col-span-full text-gray-500 text-sm">
                    Belum ada item pada kategori ini.
                  </div>
                )}
              </div>
            </div>
          ))}

          {visibleCategories.length === 0 && (
            <div className="mt-10 text-gray-500">
              Kategori tidak ditemukan. Coba pilih kategori lain.
            </div>
          )}
        </div>
      </section>
      <GradualBlur
        target="page"
        position="bottom"
        height="7rem"
        strength={3}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
      />
    </main>
  );
}
