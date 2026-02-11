"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

type Status = {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
};

export default function ContactPage() {
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const pendingRef = useRef(false);

  const isLoading = status.type === "loading";

  const safeTrim = (v: FormDataEntryValue | null) =>
    (typeof v === "string" ? v : "").trim();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if ((form as any).__submitting) return;
    (form as any).__submitting = true;

    try {
      const fd = new FormData(form);

      // Honeypot
      const hp = safeTrim(fd.get("company"));
      if (hp) {
        setStatus({ type: "success", message: "Thanks! (honeypot)" });
        form.reset();
        return;
      }

      const payload = {
        name: safeTrim(fd.get("name")),
        email: safeTrim(fd.get("email")),
        subject: safeTrim(fd.get("subject")) || "Message from Contact Form",
        message: safeTrim(fd.get("message")),
      };

      if (!payload.name || !payload.email || !payload.message) {
        setStatus({
          type: "error",
          message: "Name, email, and message are required.",
        });
        return;
      }

      setStatus({ type: "loading" });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const ct = res.headers.get("content-type") || "";
      if (!ct.includes("application/json")) {
        const text = await res.text();
        throw new Error(
          `Server responded ${res.status}. ${text.slice(0, 140)}…`,
        );
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send message.");

      setStatus({ type: "success", message: "Message sent. Thank you!" });
      form.reset();
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err?.message || "Something went wrong.",
      });
    } finally {
      (form as any).__submitting = false;
    }
  }

  const ariaLive = useMemo(() => (isLoading ? "off" : "polite"), [isLoading]);

  return (
    <main className="mx-auto max-w-12xl p-6">
      <div className="grid gap-10 md:grid-cols-2 items-start">
        {/* Left image (hidden on mobile) */}
        <aside className="hidden md:block">
          <div className="relative w-full h-[75vh] overflow-hidden shadow-sm">
            <Image
              src="/dummy-img.jpg"
              alt="Kopigo — contact illustration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 0px, (max-width: 1200px) 40vw, 600px"
              priority
            />
          </div>
        </aside>

        {/* Right: form */}
        <section>
          <header className="mb-8">
            <h1 className="text-3xl font-bold font-playfair">Contact Us</h1>
            <p className="text-sm text-gray-500">
              Have a question or partnership idea? Send us a message using the
              form below.
            </p>
          </header>

          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            {/* Honeypot (hidden) */}
            <div className="hidden" aria-hidden>
              <label className="block text-sm font-medium">Company</label>
              <input
                name="company"
                autoComplete="off"
                className="mt-1 w-full border px-3 py-2"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="mt-1 w-full border px-3 py-2"
                  placeholder="Your full name"
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
                  className="mt-1 w-full border px-3 py-2"
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                autoComplete="off"
                className="mt-1 w-full border px-3 py-2"
                placeholder="What is this about?"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="mt-1 w-full border px-3 py-2"
                placeholder="Write your message here…"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                disabled={isLoading}
                className="inline-flex items-center bg-[#111F15] px-4 py-2 text-white hover:bg-sky-800 disabled:opacity-60 rounded"
              >
                {isLoading ? "Sending..." : "Send Message"}
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

          {/* Static contact info */}
        </section>
      </div>
    </main>
  );
}
