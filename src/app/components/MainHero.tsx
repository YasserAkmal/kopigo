// components/mainhero.tsx
import Image from "next/image";
import Link from "next/link";
import heroData from "@/app/data/hero.json";

type Align = "left" | "center" | "right";

type Props = {
  variant?: string;
  /** padding vertikal tambahan (opsional) */
  heightClass?: string; // contoh: "py-8 sm:py-10"
  /** tampilkan gradient halus di bawah hero */
  withBottomGradient?: boolean;
};

export default function MainHero({
  variant,
  heightClass = "",
  withBottomGradient = false,
}: Props) {
  const items = heroData.items || [];
  const item =
    (variant ? items.find((i) => i.key === variant) : items[0]) || items[0];

  if (!item) return null;

  const {
    title,
    description,
    video,
    overlay = "bg-black/40",
    align = "",
    cta,
    ctaSecondary,
  } = item as {
    title: string;
    description?: string;
    video?: { src?: string; type?: string; poster?: string };
    overlay?: string;
    align?: Align;
    cta?: { href?: string; label?: string };
    ctaSecondary?: { href?: string; label?: string };
  };

  // alignment container & text
  const containerAlign =
    align === "center"
      ? "items-center justify-center text-center"
      : align === "right"
      ? "items-end justify-center text-right"
      : "items-start justify-center text-left";

  return (
    <section className="relative">
      {/* Background (video atau poster) */}
      <div className="absolute inset-0 -z-10">
        {video?.src ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={video?.poster || undefined}
          >
            <source src={video.src} type={video.type || "video/mp4"} />
          </video>
        ) : video?.poster ? (
          <Image
            src={video.poster}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        ) : null}

        <div className={`absolute inset-0 ${overlay}`} />

        {withBottomGradient && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${heightClass}`}>
        <div className={`min-h-[60svh] sm:min-h-[70svh] ${containerAlign}`}>
          <div className="flex h-[70vh] flex-col justify-center sm:w-auto sm:items-start sm:text-left mx-auto sm:mx-0 gap-4">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white">
              {title}
            </h1>

            {description && (
              <p className="text-base sm:text-lg text-white/90">
                {description}
              </p>
            )}

            {(cta?.href && cta?.label) ||
            (ctaSecondary?.href && ctaSecondary?.label) ? (
              <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full">
                {cta?.href && cta?.label && (
                  <Link href={cta.href} className="w-full sm:w-auto">
                    <span
                      className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg px-6 py-3
                       bg-sky-950 text-white font-semibold hover:bg-sky-900
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600
                       transition"
                    >
                      {cta.label}
                    </span>
                  </Link>
                )}

                {ctaSecondary?.href && ctaSecondary?.label && (
                  <Link href={ctaSecondary.href} className="w-full sm:w-auto">
                    <span
                      className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg px-6 py-3
                       border border-white/80 text-white/90 hover:bg-white/10
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600
                       transition"
                    >
                      {ctaSecondary.label}
                    </span>
                  </Link>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Noscript fallback untuk poster */}
      {video?.poster && (
        <noscript>
          <div className="absolute inset-0 -z-10">
            <Image
              src={video.poster}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className={`absolute inset-0 ${overlay}`} />
          </div>
        </noscript>
      )}
    </section>
  );
}
