// components/mainhero.tsx
import Image from "next/image";
import Link from "next/link";
import heroData from "@/app/data/hero.json";

type Align = "left" | "center" | "right";

type Props = {
  variant?: string;
  /** padding vertikal tambahan (opsional) */
  heightClass?: string; // contoh: "py-8 sm:py-10"
  /** tampilkan gradient halus di bawah hero */
  withBottomGradient?: boolean;
};

export default function MainHero({
  variant,
  heightClass = "min-h-[80vh] sm:min-h-[90vh]",
}: Props) {
  const items = heroData.items || [];
  const item =
    (variant ? items.find((i) => i.key === variant) : items[0]) || items[0];

  if (!item) return null;

  return (
    <section className={` flex flex-col ${heightClass} overflow-hidden`}>
      <div className={`flex h-screen w-full  justify-center content-center`}>
        <div className="max-w-4xl px-6 md:px-12 lg:px-16 space-y-6 md:space-y-8 justify-center content-center">
          {/* Judul utama - besar & tebal */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-[#354338]">
            K O P I G O
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl md:text-3xl font-light text-[#354338]/90 tracking-[.25em] text-center">
            La passion du cafe
          </p>

          {/* Tombol CTA */}

          <div className="flex justify-center">
            <Link
              href="/contactus"
              className="px-10 py-5 
      bg-transparent border-2 border-[#354338]
      text-[#354338] font-medium text-xl
      hover:bg-[#354338] hover:text-white 
      transition-all duration-300
      rounded-sm tracking-wider uppercase
    "
            >
              Connect With Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
