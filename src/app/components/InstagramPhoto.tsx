"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import data from "@/app/data/instagram.json";

type Item = {
  id: string;
  src: string;
  alt?: string;
  permalink?: string;
};

export default function InstagramPhoto() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [
      Autoplay({
        delay: 3500,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const items: Item[] = data.items as any;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (i: number) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi]
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  return (
    <section className="relative w-full">
      {/* Gradien pinggir */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-50 bg-gradient-to-r from-[#FAF8F6] via-[#FAF8F6]/10 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-50 bg-gradient-to-l from-[#FAF8F6] via-[#FAF8F6]/10 to-transparent z-10" />

      {/* Track Embla */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((it, i) => (
            <div
              key={it.id}
              className="flex-[0_0_85%] sm:flex-[0_0_70%] lg:flex-[0_0_50%] px-4"
            >
              <a
                href={it.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden  shadow-md hover:shadow-lg transition"
              >
                <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
                  <Image
                    src={it.src}
                    alt={it.alt || "Instagram photo"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width:1024px) 70vw, 50vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Tombol navigasi */}
      {/* <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 z-20">
        <button
          onClick={scrollPrev}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60 focus:ring-2 focus:ring-white/60"
          aria-label="Sebelumnya"
        >
          ‹
        </button>
        <button
          onClick={scrollNext}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60 focus:ring-2 focus:ring-white/60"
          aria-label="Berikutnya"
        >
          ›
        </button>
      </div> */}

      {/* Dots */}
      <div className="mt-5 flex justify-center gap-2">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === selectedIndex ? "w-6 bg-sky-600" : "w-2.5 bg-gray-400/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
