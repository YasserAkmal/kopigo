"use client";

import { useState } from "react";

type Status = {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
};

export default function ContactPage() {
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    // honeypot: jika terisi, anggap bot
    if ((fd.get("company") as string)?.trim()) {
      setStatus({ type: "success", message: "Terima kasih! (honeypot)" });
      e.currentTarget.reset();
      return;
    }

    setStatus({ type: "loading" });

    const payload = {
      name: ((fd.get("name") as string) || "").trim(),
      email: ((fd.get("email") as string) || "").trim(),
      subject: ((fd.get("subject") as string) || "").trim(),
      message: ((fd.get("message") as string) || "").trim(),
    };

    // front-end guard
    if (!payload.name || !payload.email || !payload.message) {
      setStatus({
        type: "error",
        message: "Nama, email, dan pesan wajib diisi.",
      });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Gagal mengirim pesan.");
      setStatus({ type: "success", message: "Pesan terkirim. Terima kasih!" });
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "Terjadi kesalahan.",
      });
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Hubungi Kami</h1>
        <p className="text-sm text-gray-500">
          Ada pertanyaan atau kerjasama? Kirimkan pesan melalui form di bawah.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Honeypot (hidden) */}
        <div className="hidden">
          <label className="block text-sm font-medium">Company</label>
          <input
            name="company"
            autoComplete="off"
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Nama</label>
            <input
              name="name"
              required
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="Nama lengkap"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="nama@domain.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Subjek</label>
          <input
            name="subject"
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="Tentang apa pesannya?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Pesan</label>
          <textarea
            name="message"
            required
            rows={6}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="Tulis pesanmu di sini..."
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={status.type === "loading"}
            className="inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 disabled:opacity-60"
          >
            {status.type === "loading" ? "Mengirim..." : "Kirim Pesan"}
          </button>
          {status.type === "success" && (
            <span className="text-sm text-green-600">{status.message}</span>
          )}
          {status.type === "error" && (
            <span className="text-sm text-red-600">{status.message}</span>
          )}
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
