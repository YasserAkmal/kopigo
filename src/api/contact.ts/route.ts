// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // penting: jangan edge untuk nodemailer

const RATE_MS = 60_000;
const MAX_REQ = 5;
const bucket = new Map<string, { count: number; ts: number }>();

const Schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().max(200).optional().default("Pesan dari Form Kontak"),
  message: z.string().min(1).max(5000),
});

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function POST(req: Request) {
  try {
    // Rate limit sederhana per IP
    const ip =
      (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
      "0.0.0.0";
    const now = Date.now();
    const prev = bucket.get(ip);
    if (!prev || now - prev.ts > RATE_MS) {
      bucket.set(ip, { count: 1, ts: now });
    } else {
      if (prev.count >= MAX_REQ) {
        return NextResponse.json(
          { error: "Terlalu banyak permintaan, coba lagi sebentar." },
          { status: 429 }
        );
      }
      prev.count += 1;
    }

    const body = await req.json();
    const { name, email, subject, message } = Schema.parse(body);

    // Transporter Hostinger
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE) === "true", // true untuk 465, false untuk 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Kirim email ke admin
    await transporter.sendMail({
      from:
        process.env.MAIL_FROM || `"Kopigo Website" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email, // balas akan ke pengirim form
      subject,
      text: `Dari: ${name} <${email}>\n\n${message}`,
      html: `
        <h2>${subject}</h2>
        <p><b>Dari:</b> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(
          message
        )}</pre>
      `,
    });

    // (opsional) kirim copy ke pengirim
    // await transporter.sendMail({
    //   from: process.env.MAIL_FROM || `"Kopigo Website" <${process.env.SMTP_USER}>`,
    //   to: email,
    //   subject: `Salinan: ${subject}`,
    //   text: "Terima kasih, pesanmu sudah kami terima.",
    // });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    const msg =
      err?.issues?.map((i: any) => i.message).join(", ") ||
      err?.message ||
      "Gagal mengirim pesan.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
