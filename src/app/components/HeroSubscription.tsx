// components/HeroSubscription.tsx
import Image from "next/image";
import Link from "next/link";

export default function HeroSubscription() {
  return (
    <section className="bg-[#FAF8F6]">
      {" "}
      <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        <div className="grid items-center gap-8 lg:gap-12 md:grid-cols-2">
          <div className="relative w-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/dummy-img.jpg"
                alt="Coffee subscription products"
                fill
                priority
                className="object-cover"
                sizes="100vw, 50vw"
              />
            </div>
          </div>
          <div className="md:pl-4 lg:pl-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-sky-950">
              The Journey
            </h1>

            <p className="mt-4 text-base sm:text-lg text-sky-950">
              KOPIGO was born in 2018 in West Sumatra with a simple dream: to
              make coffee not just a drink, but a moment of comfort and
              connection. From that first humble outlet, our journey has poured
              into people’s lives in ways we never imagined. By 2025, we had
              proudly served over one million cups of coffee and non-coffee
              beverages — each cup not just consumed, but lived, becoming part
              of someone’s day, someone’s story, someone’s memory. This
              milestone is not just a number. It is a testament to the trust of
              our community, the resilience of our team, and the spirit that
              turned a local coffee corner into a household name across West
              Sumatra. But our story does not end here. KOPIGO is ready for its
              next chapter: to transform from a regional champion into a
              national icon with regional aspirations, carrying the spirit of a
              million cups into tens of millions more — across Indonesia,
              and one day, Asia
            </p>

            <div className="mt-8">
              <Link href="/aboutus">
                <button className="px-6 py-3 bg-sky-950 text-white font-semibold hover:bg-sky-800 transition">
                  More About Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
