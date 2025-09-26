// src/components/MenuCard.tsx
"use client";
import Image from "next/image";

type MenuCardProps = {
  imageSrc: string;
  title: string;
  desc?: string;
  price: string; // contoh: "Rp28.000"
  badge?: string; // contoh: "NEW" | "BEST" | "SEASONAL"
};

export default function MenuCard({
  imageSrc,
  title,
  desc,
  price,
  badge,
}: MenuCardProps) {
  return (
    <article className=" bg-[#FAF8F6] group transition overflow-hidden pt-8 px-8">
      {/* Gambar */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          priority={false}
        />
        {badge && (
          <span className="absolute left-3 top-3 bg-sky-950/90 px-2 py-1 text-[11px] font-semibold text-white">
            {badge}
          </span>
        )}
      </div>

      {/* Konten */}
      <div className="p-4 sm:p-5">
        <h3 className="font-serif text-sky-950 text-base sm:text-lg tracking-tight">
          {title}
        </h3>
        {desc && (
          <p className="mt-1 text-sm text-zinc-700 line-clamp-2">{desc}</p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sky-950 font-semibold">{price}</p>

          <button
            className="inline-flex items-center justify-center bg-sky-950 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-900 transition"
            type="button"
          >
            More
          </button>
        </div>
      </div>
    </article>
  );
}
