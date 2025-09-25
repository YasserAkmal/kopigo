"use client";
import Image from "next/image";

export default function Testimonial() {
  return (
    <section className="bg-[#FAF8F6] p-5 sm:p-6 ">
      <div className="flex items-start gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden ring-1 ring-black/10">
          <Image
            src="/user.jpg"
            alt="User avatar"
            fill
            sizes="56px"
            className="object-cover"
            priority={false}
          />
        </div>
        <p className="text-sm sm:text-base text-zinc-800">
          “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
          exercitationem iste vitae cupiditate dicta ipsum porro sunt, eveniet
          possimus est delectus quas nemo facere dolor! Neque impedit quia
          perspiciatis dicta?”
        </p>
      </div>
      <div className="mt-4">
        <p className="font-sans font-semibold text-zinc-900 leading-tight">
          John Doe
        </p>
        <p className="font-sans text-sm text-zinc-600">@johndoe</p>
      </div>
    </section>
  );
}
