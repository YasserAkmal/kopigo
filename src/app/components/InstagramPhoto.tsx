"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useEffect } from "react";
import data from "@/app/data/instagram.json";

type Item = { id: string; src: string; alt?: string; permalink?: string };

export default function InstagramPhoto() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start", // penting utk continuous
      dragFree: true, // biar glide mulus
      skipSnaps: true,
    },
    [
      AutoScroll({
        playOnInit: true, // langsung jalan
        speed: 1.2, // atur kecepatan (naikkan kalau mau lebih cepat)
        stopOnInteraction: false, // tetap jalan setelah user drag
        stopOnMouseEnter: false, // pause saat hover (ubah ke false kalau mau terus)
      }),
    ]
  );

  const items: Item[] = (data as any)?.items ?? [];

  // (opsional) akses plugin kalau mau start/stop manual
  useEffect(() => {
    if (!emblaApi) return;
    const autoScroll = emblaApi.plugins()?.autoScroll;
    // autoScroll?.play(); // start
    // autoScroll?.stop(); // stop
  }, [emblaApi]);

  return (
    <section className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((it, i) => (
            <div
              key={it.id}
              className="px-3 sm:px-4 flex-[0_0_85%] sm:flex-[0_0_70%] lg:flex-[0_0_55%]"
            >
              <a
                href={it.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden shadow-sm hover:shadow-md"
              >
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "1 / 1" }}
                >
                  <Image
                    src={it.src}
                    alt={it.alt || "Instagram photo"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width:1024px) 70vw, 55vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
