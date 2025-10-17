"use client";

import { useMemo, useRef, useState } from "react";

type Status = {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
};

export default function ContactPage() {
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const pendingRef = useRef(false);

  const isLoading = status.type === "loading";

  // helper kecil
  const safeTrim = (v: FormDataEntryValue | null) =>
    (typeof v === "string" ? v : "").trim();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pendingRef.current) return; // anti double submit

    const fd = new FormData(e.currentTarget);
    // honeypot (bot akan mengisi ini)
    if (safeTrim(fd.get("company"))) {
      setStatus({ type: "success", message: "Terima kasih! (honeypot)" });
      e.currentTarget.reset();
      return;
    }

    const payload = {
      name: safeTrim(fd.get("name")),
      email: safeTrim(fd.get("email")),
      subject: safeTrim(fd.get("subject")) || "Pesan dari Form Kontak",
      message: safeTrim(fd.get("message")),
    };

    // front-end guard
    if (!payload.name || !payload.email || !payload.message) {
      setStatus({
        type: "error",
        message: "Nama, email, dan pesan wajib diisi.",
      });
      return;
    }

    setStatus({ type: "loading" });
    pendingRef.current = true;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Cegah parse HTML error page sebagai JSON
      const ct = res.headers.get("content-type") || "";
      if (!ct.includes("application/json")) {
        const text = await res.text();
        throw new Error(
          `Server mengembalikan ${res.status}. ${text.slice(0, 140)}…`
        );
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Gagal mengirim pesan.");

      setStatus({ type: "success", message: "Pesan terkirim. Terima kasih!" });
      e.currentTarget.reset();
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err?.message || "Terjadi kesalahan.",
      });
    } finally {
      pendingRef.current = false;
    }
  }

  // agar screen reader mengumumkan status
  const ariaLive = useMemo(() => (isLoading ? "off" : "polite"), [isLoading]);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Hubungi Kami</h1>
        <p className="text-sm text-gray-500">
          Ada pertanyaan atau kerjasama? Kirimkan pesan melalui form di bawah.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {/* Honeypot (hidden) */}
        <div className="hidden" aria-hidden>
          <label className="block text-sm font-medium">Company</label>
          <input
            name="company"
            autoComplete="off"
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nama
            </label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="Nama lengkap"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="nama@domain.com"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium">
            Subjek
          </label>
          <input
            id="subject"
            name="subject"
            autoComplete="off"
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="Tentang apa pesannya?"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Pesan
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="Tulis pesanmu di sini..."
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={isLoading}
            className="inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 disabled:opacity-60"
          >
            {isLoading ? "Mengirim..." : "Kirim Pesan"}
          </button>

          <span role="status" aria-live={ariaLive} className="text-sm">
            {status.type === "success" && (
              <span className="text-green-600">{status.message}</span>
            )}
            {status.type === "error" && (
              <span className="text-red-600">{status.message}</span>
            )}
          </span>
        </div>
      </form>

      {/* Info kontak statis */}
      <section className="mt-10 grid gap-3 text-sm text-gray-600">
        <div>
          <span className="font-medium">Email:</span> hello@kopigo.id
        </div>
        <div>
          <span className="font-medium">Telepon:</span> +62 812-0000-0000
        </div>
        <div>
          <span className="font-medium">Alamat:</span> Jl. Contoh No. 1, Jakarta
        </div>
      </section>
    </main>
  );
}
