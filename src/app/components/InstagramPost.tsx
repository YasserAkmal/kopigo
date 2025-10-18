"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function InstagramPhoto({
  permalink = "https://www.instagram.com/p/DPvXocoDRcc/",
  alt = "Foto Instagram",
}: {
  permalink?: string;
  alt?: string;
}) {
  const [url, setUrl] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let abort = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/instagram/thumbnail?url=${encodeURIComponent(permalink)}`
        );
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json"))
          throw new Error(`Bad content-type: ${ct}`);
        const data = await res.json();
        if (!res.ok)
          throw new Error(data?.error || "Gagal mengambil thumbnail");
        if (!abort) setUrl(data.thumbnail_url);
      } catch (e: any) {
        if (!abort) setErr(e?.message || "Error");
      }
    })();
    return () => {
      abort = true;
    };
  }, [permalink]);

  if (err) {
    // fallback sederhana
    return (
      <a
        href={permalink}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-sm text-gray-500 underline"
      >
        Lihat postingan di Instagram
      </a>
    );
  }

  if (!url) {
    return (
      <div className="aspect-[4/5] w-full animate-pulse rounded-2xl bg-gray-200" />
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={1080}
      height={1350}
      className="w-full h-auto rounded-2xl object-cover"
      // Jika Next/Image protes domain, lihat konfigurasi di bawah
    />
  );
}
