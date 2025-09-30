import Image from "next/image";
import HeroSubscription from "./components/HeroSubscription";
import PromoCarousel from "./components/PromoCarousel";
import Testimonial from "./components/testimonial";
import InstagramPost from "./components/InstagramPost";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
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

        <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white">
            KOPIGO
          </h1>
          <p className="mt-4 max-w-2xl text-white/90 text-base sm:text-lg">
            Where great coffee meets cozy vibes—a hangout spot for young people
            to chat, create, and express yourself.
          </p>
        </div>
      </section>
      <div className="">
        <HeroSubscription />
      </div>
      <div className="">
        <PromoCarousel />
      </div>
      <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="font-serif text-center text-2xl sm:text-3xl lg:text-4xl text-sky-950 mb-8 sm:mb-10">
          What they say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Testimonial />
          <Testimonial />
          <Testimonial />
          <Testimonial />
          <Testimonial />
          <Testimonial />
        </div>
      </div>
      <section className="bg-[#FAF8F6]">
        <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            <InstagramPost />
            <InstagramPost />
            <InstagramPost />
            <InstagramPost />
            <InstagramPost />
            <InstagramPost />
          </div>
        </div>
      </section>
    </main>
  );
}
