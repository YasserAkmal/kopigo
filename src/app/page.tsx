import Image from "next/image";
import HeroSubscription from "./components/HeroSubscription";
import PromoCarousel from "./components/PromoCarousel";
import Testimonial from "./components/testimonial";
import InstagramPost from "./components/InstagramPost";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      {/* Background pakai next/image (gambar di /public/mountains.jpg) */}
      <div
        className="
    relative w-full 
    h-[20vh] sm:h-[35vh] lg:h-[60vh] 
    flex flex-col items-center justify-center
    px-4 sm:px-6 lg:px-8
    bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat
  "
      >
        {/* Konten */}
        <div className="relative z-10 container mt-auto mb-5">
          <h1 className="font-serif text-left text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 drop-shadow">
            KOPIGO
          </h1>
          <p className="mt-2 font-sans text-left text-xl sm:text-2xl lg:text-3xl font-normal text-zinc-50/95">
            Where the joys of coffee meet the comforts of home.
          </p>
        </div>
      </div>
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
