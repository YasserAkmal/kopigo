"use client";
import { CldImage } from "next-cloudinary";

type Props = {
  publicId: string;
  title: string;
  desc?: string;
  price: number;
  badge?: string;
};

export default function MenuCard({
  publicId,
  title,
  desc,
  price,
  badge,
}: Props) {
  return (
    <article className="group bg-[#FAF8F6] overflow-hidden pt-5 px-5">
      <div className="relative aspect-[4/3] w-full">
        <CldImage
          src={publicId}
          alt={title}
          fill
          className="object-cover"
          // Transformasi aman & hemat bandwidth
          quality="auto"
          format="auto"
          crop="fill"
          gravity="auto"
        />
        {badge && (
          <span className="absolute left-3 top-3 bg-[#111F15]/90 px-2 py-1 text-[11px] font-semibold text-white">
            {badge}
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="font-serif text-[#111F15] text-base sm:text-lg tracking-tight">
          {title}
        </h3>
        {desc && <p className="mt-1 text-sm text-zinc-700">{desc}</p>}

        {/* <div className="mt-4 flex items-center justify-between">
          <p className="text-[#111F15] font-semibold">{formatIDR(price)}</p>
        </div> */}
      </div>
    </article>
  );
}

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}
