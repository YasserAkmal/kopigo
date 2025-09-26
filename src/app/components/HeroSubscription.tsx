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
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
              faucibus ex sapien vitae pellentesque sem placerat. In id cursus
              mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
              urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
              egestas. Iaculis massa nisl malesuada lacinia integer nunc
              posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad
              litora torquent per conubia nostra inceptos himenaeos.
            </p>

            <div className="mt-8">
              <Link href="/aboutus">
                <button className="px-6 py-3 bg-sky-950 text-white font-semibold hover:bg-sky-800 transition">
                  Selengkapnya
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
