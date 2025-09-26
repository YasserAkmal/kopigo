// src/app/menu/page.tsx
import MenuCard from "@/app/components/MenuCard";

export const metadata = {
  title: "Menu — Kopigo",
};

export default function MenuPage() {
  return (
    <main>
      <section className="">
        <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

          {/* Filter/Category (opsional) */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="bg-white px-3 py-1.5 text-sm hover:bg-zinc-50">All</button>
            <button className="bg-white px-3 py-1.5 text-sm hover:bg-zinc-50">Coffee</button>
            <button className="bg-white px-3 py-1.5 text-sm hover:bg-zinc-50">Non-Coffee</button>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MenuCard
              imageSrc="/user.jpg"
              title="Vanilla Latte"
              desc="Espresso, susu creamy, dan vanilla yang lembut."
              price="IDR 28.000"
              badge="BEST"
            />
            <MenuCard
              imageSrc="/user.jpg"
              title="Hazelnut Cappuccino"
              desc="Cappuccino dengan sentuhan hazelnut aromatik."
              price="IDR 30.000"
            />
            <MenuCard
              imageSrc="/user.jpg"
              title="Sea Salt Caramel"
              desc="Manis gurih karamel & sea salt—favorit nongkrong."
              price="IDR 32.000"
              badge="SEASONAL"
            />
            <MenuCard
              imageSrc="/user.jpg"
              title="Americano"
              desc="Espresso + air: clean, bold, dan menyegarkan."
              price="IDR 22.000"
            />
            <MenuCard
              imageSrc="/user.jpg"
              title="Cold Brew"
              desc="Seduhan dingin 12 jam—halus, rendah asam."
              price="IDR 26.000"
            />
            <MenuCard
              imageSrc="/user.jpg"
              title="Matcha Latte"
              desc="Matcha premium & susu, balance dan creamy."
              price="IDR 30.000"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
