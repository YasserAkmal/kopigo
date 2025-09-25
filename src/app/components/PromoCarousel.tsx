// components/PromoCarousel.tsx
"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Gift,
  Truck,
  BadgePercent,
  Coffee,
  TimerReset,
  CalendarHeart,
} from "lucide-react";

type Promo = { icon: React.ReactNode; title: string; note?: string };

const PROMOS: Promo[] = [
  {
    icon: <BadgePercent className="h-10 w-10" />,
    title: "Diskon 25%",
    note: "Semua Signature Beans",
  },
  {
    icon: <Truck className="h-10 w-10" />,
    title: "Gratis Ongkir",
    note: "Minimal Rp150k",
  },
  {
    icon: <Gift className="h-10 w-10" />,
    title: "Bundle Hemat",
    note: "Buy 2 Get 1",
  },
  {
    icon: <Coffee className="h-10 w-10" />,
    title: "Free Drip Bag",
    note: "Untuk Member Baru",
  },
  {
    icon: <TimerReset className="h-10 w-10" />,
    title: "Happy Hour",
    note: "14.00–17.00 WIB",
  },
  {
    icon: <CalendarHeart className="h-10 w-10" />,
    title: "Weekend Sale",
    note: "Sabtu–Minggu",
  },
];

export default function PromoCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <section className="bg-[#FFFFF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="font-serif text-center text-2xl sm:text-3xl text-sky-950">
          Catch This Now!
        </h2>

        {/* Viewport */}
        <div ref={emblaRef} className="overflow-hidden mt-10">
          {/* Track */}
          <div className="flex">
            {PROMOS.map((p, i) => (
              <div
                key={i}
                className="
                  shrink-0 px-2 sm:px-3
                  basis-full sm:basis-1/2 lg:basis-1/4
                "
              >
                <div className="h-full px-4 py-6 flex flex-col items-center justify-start gap-3">
                  <div className="text-sky-900">
                    <div className="h-12 w-12 grid place-items-center">
                      {p.icon}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-serif text-sky-950 tracking-tight">
                      {p.title}
                    </p>
                    {p.note && (
                      <p className="text-sm text-sky-900/80 mt-0.5">{p.note}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {PROMOS.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition
                ${
                  i === selectedIndex
                    ? "bg-sky-950"
                    : "bg-sky-950/40 hover:opacity-80"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
