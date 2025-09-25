// components/InstagramPost.tsx
"use client";
import Image from "next/image";

export default function InstagramPost() {
  return (
    <article className="w-full">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF8F6] shadow-sm">
        <Image
          src="/post-ig.png"
          alt="Instagram Post"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
      </div>
    </article>
  );
}
