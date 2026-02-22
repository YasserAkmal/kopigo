"use client";

import HeroSubscription from "./components/HeroSubscription";
import Testimonial from "./components/testimonial";
import InstagramPhoto from "./components/InstagramPhoto";
import HeroVideo from "./components/MainHero";
import GradualBlur from "./components/GradualBlur";
import Maintenance from "./components/Maintanance";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Maintenance />
      {/* <section>
        <HeroVideo variant="home" />
        <div className="" data-aos="fade-up">
          <HeroSubscription />
        </div>
        <div className="" data-aos="fade-up">
          <HeroSubscription variant="GrowthStory" />
        </div>
        <div className="" data-aos="fade-up">
          <HeroSubscription variant="Movement" />
        </div>
        <section className="bg-[#FAF8F6] ">
          <div className="mx-auto max-w-12xl sm:px-6 lg:px-8 py-12 sm:py-16">
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
      </section> */}
    </main>
  );
}
