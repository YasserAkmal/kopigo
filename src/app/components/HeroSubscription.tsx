import Image from "next/image";
import Link from "next/link";
import data from "@/app/data/hero-sections.json";

type Props = {
  variant?: string; // key di JSON
  paddingClass?: string; // custom padding
  maxWidthClass?: string; // custom max-width konten teks
};

export default function HeroSubscription({
  variant,
  paddingClass = "py-10 sm:py-14 lg:py-20",
  maxWidthClass = "max-w-3xl",
}: Props) {
  const items = (data as any)?.items ?? [];
  const item =
    (variant ? items.find((it: any) => it.key === variant) : items[0]) ||
    items[0];

  if (!item) return null;

  const hasImage = !!item.image?.src; // ← deteksi ada gambar atau tidak
  const bg = item.theme?.background ?? "#B2C0DA";
  const headingColor = item.theme?.headingColor ?? "text-[#111F15]";
  const textColor = item.theme?.textColor ?? "text-[#111F15]";
  const buttonClass =
    item.theme?.buttonClass ?? "bg-[#111F15] hover:bg-sky-800 text-white";
  const reverse = !!item.layout?.reverseOnDesktop;

  return (
    <section style={{ background: bg }}>
      <div
        className={`mx-auto max-w-12xl px-4 sm:px-6 lg:px-8 ${paddingClass}`}
      >
        {hasImage ? (
          // ======= MODE DUA KOLOM (ADA GAMBAR) =======
          <div
            className={`grid items-center gap-8 lg:gap-12 md:grid-cols-2 ${
              reverse ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            {/* Gambar */}
            <div className="relative w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.image?.src}
                  alt={item.image?.alt || ""}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Konten */}
            <ContentBlock
              headingColor={headingColor}
              textColor={textColor}
              buttonClass={buttonClass}
              item={item}
            />
          </div>
        ) : (
          // ======= MODE SATU KOLOM (TANPA GAMBAR) =======
          <div className={`mx-auto ${maxWidthClass}`}>
            <ContentBlock
              headingColor={headingColor}
              textColor={textColor}
              buttonClass={buttonClass}
              item={item}
              center // teks ditengah untuk versi tanpa gambar
            />
          </div>
        )}
      </div>
    </section>
  );
}

function ContentBlock({
  item,
  headingColor,
  textColor,
  buttonClass,
  center = false,
}: {
  item: any;
  headingColor: string;
  textColor: string;
  buttonClass: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : "md:pl-4 lg:pl-8"}>
      {item.eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-wider ${
            center ? "mx-auto mb-1" : "mb-1"
          } text-black/60`}
        >
          {item.eyebrow}
        </p>
      )}

      <h1
        className={`font-playfair text-3xl sm:text-4xl lg:text-5xl leading-tight ${headingColor}`}
      >
        {item.title}
      </h1>

      {item.description && (
        <p className={`mt-4 text-base sm:text-lg ${textColor}`}>
          {item.description}
        </p>
      )}

      {item.descriptionSecondary && (
        <p className={`mt-3 text-base sm:text-lg ${textColor}`}>
          {item.descriptionSecondary}
        </p>
      )}

      {item.cta?.href && item.cta?.label && (
        <div className={center ? "mt-8 flex justify-center" : "mt-8"}>
          <Link
            href={item.cta.href}
            className={`inline-flex items-center px-6 py-3 font-semibold transition ${buttonClass}`}
          >
            {item.cta.label}
          </Link>
        </div>
      )}
    </div>
  );
}
