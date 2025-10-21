import data from "@/app/data/instagram.json";
import InstagramPhoto from "./InstagramPhoto";

export default function InstagramGrid() {
  const items = data.items;

  return (
    <section className="w-full">
      <div className="mb-4 flex items-end justify-between"></div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((it) => (
          <InstagramPhoto
            key={it.id}
            src={it.src}
            alt={it.alt}
            width={it.width}
            height={it.height}
            link={it.permalink}
          />
        ))}
      </div>
    </section>
  );
}
