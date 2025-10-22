"use client";

import HeroSubscription from "./components/HeroSubscription";
import PromoCarousel from "./components/PromoCarousel";
import Testimonial from "./components/testimonial";
import InstagramPhoto from "./components/InstagramPhoto";
import HeroVideo from "./components/MainHero";
import GradualBlur from "./components/GradualBlur";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <section>
        <HeroVideo variant="home" />
        <div className="">
          <HeroSubscription />
          <HeroSubscription variant="GrowthStory" />
          <HeroVideo variant="Commitment" />
          <HeroSubscription variant="Movement" />
        </div>
        {/* <div className="bg-[#FAF8F6] py-12 sm:py-16">
          <PromoCarousel />
        </div> */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="font-serif text-center text-2xl sm:text-3xl lg:text-4xl text-sky-950 mb-8 sm:mb-10">
            What they say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </div>
        </div>
        <section className="bg-[#FAF8F6] ">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="">
              <InstagramPhoto />
            </div>
          </div>
        </section>
        <GradualBlur
          target="page"
          position="bottom"
          height="2rem"
          strength={3}
          divCount={5}
          curve="bezier"
          exponential={true}
          opacity={1}
        />
      </section>
    </main>
  );
}
