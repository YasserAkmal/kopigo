// src/app/about/page.tsx
import Image from "next/image";

export const metadata = {
  title: "About Us — Kopigo",
  description:
    "Kopigo adalah kafe untuk anak muda: tempat nongkrong, ngobrol, dan mengekspresikan diri lewat kopi, musik, dan komunitas.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
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
            About Kopigo
          </h1>
          <p className="mt-4 max-w-2xl text-white/90 text-base sm:text-lg">
            Where great coffee meets cozy vibes—a hangout spot for young people
            to chat, create, and express yourself.
          </p>
        </div>
      </section>

      {/* MISI / TAGLINE */}
      <section className="bg-[#FAF8F6]">
        <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl sm:text-3xl text-sky-950">
                Our Mission
              </h2>
              <p className="mt-4 text-zinc-700 leading-relaxed">
                To be a safe and exciting space for you to gather, share
                stories, and experiment. At Kopigo, great coffee meets cozy
                vibes—with plenty of power outlets, fast Wi-Fi, and playlists
                that make you feel at home. Whether you're here for me-time,
                study sessions, or meeting new communities—you’re always
                welcome.
              </p>
            </div>
            <div className="p-6">
              <p className="text-zinc-800">
                <span className="font-serif text-sky-950">Kopigo</span>
                was born from the culture of hanging out: random chats that
                spark ideas, creations born from playfulness, and laughter that
                lightens the day. Express yourself—we’ve got the space for it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden ">
              <Image
                src="/user.jpg"
                alt="Proses sangrai Kopigo"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-sky-950">
                Your Favorite Hangout Spot
              </h3>
              <p className="mt-4 text-zinc-700 leading-relaxed">
                We craft coffee that suits young tastes—from signature lattes to
                seasonal menus. We also regularly host open-mic nights, mini
                showcases, and creative communities so you can perform and
                connect.
              </p>

              <ul className="mt-6 space-y-3 text-zinc-800">
                <li>• Plenty of outlets & fast Wi-Fi</li>
                <li>• Weekly events: open-mic, classes, and communities</li>
                <li>• Budget-friendly menu & always has seasonal editions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F6]">
        <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h3 className="font-serif text-2xl sm:text-3xl text-sky-950">
            Our Values
          </h3>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Uncompromising Quality",
                desc: "Selected beans, consistent flavors, and meticulous processes—so every cup makes you want to come back.",
              },
              {
                title: "Freedom of Expression",
                desc: "A space to create and perform: from open-mic to small exhibitions, everyone is welcome to join the fun.",
              },
              {
                title: "Togetherness",
                desc: "We build a friendly, inclusive, and supportive community—healthy and positive hangouts.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className=" bg-white border border-black/5 p-6"
              >
                <p className="font-serif text-sky-950">{v.title}</p>
                <p className="mt-2 text-zinc-700">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="font-serif text-2xl text-sky-950">
                {" "}
                The Kopigo Team
              </h3>
              <p className="mt-4 text-zinc-700">
                Behind the bar are baristas, creators, and friends ready to
                greet you. We love to experiment, both in crafting flavors and
                creating fun events that make you want to stay longer.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["/user.jpg", "/user.jpg", "/user.jpg"].map((src) => (
                <div
                  key={src}
                  className="relative aspect-square w-full overflow-hidden"
                >
                  <Image
                    src={src}
                    alt="Tim Kopigo"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 33vw, 200px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FAF8F6]">
        <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className=" p-6 sm:p-8 lg:p-10 text-center">
            <h4 className="font-serif text-2xl text-sky-950">
              Ready to Hang Out at Kopigo?
            </h4>
            <p className="mt-2 text-zinc-700">
              Check out the menu, invite friends, and make Kopigo your favorite
              spot to chat and create.
            </p>
            <a
              href="/menu"
              className="mt-6 inline-flex items-center justify-center bg-sky-950 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-900 transition"
            >
              Explore Menu
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
