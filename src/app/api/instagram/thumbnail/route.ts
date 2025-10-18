import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing ?url=" }, { status: 400 });
  }

  const APP_ID = process.env.FB_APP_ID;
  const APP_SECRET = process.env.FB_APP_SECRET; // opsi A
  const CLIENT_TOKEN = process.env.FB_CLIENT_TOKEN; // opsi B

  if (!APP_ID) {
    return NextResponse.json(
      { error: "FB_APP_ID not configured" },
      { status: 500 }
    );
  }
  if (!APP_SECRET && !CLIENT_TOKEN) {
    return NextResponse.json(
      { error: "FB_APP_SECRET or FB_CLIENT_TOKEN must be configured" },
      { status: 500 }
    );
  }

  // (opsional) batasi host pemanggil
  const host = req.headers.get("host") || "";
  const allowed = (process.env.ALLOWED_OEMBED_DOMAINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowed.length && !allowed.some((d) => host.endsWith(d))) {
    return NextResponse.json(
      {
        error: `Host "${host}" not allowed`,
        hint: `Allowed: ${allowed.join(", ")}`,
      },
      { status: 403 }
    );
  }

  // Gunakan App Access Token jika ada SECRET; kalau tidak, fallback ke Client Token
  const accessToken = APP_SECRET
    ? `${APP_ID}|${APP_SECRET}`
    : `${APP_ID}|${CLIENT_TOKEN}`;
  const tokenType = APP_SECRET ? "app_secret" : "client_token";

  const api = new URL("https://graph.facebook.com/v20.0/instagram_oembed");
  api.searchParams.set("url", url);
  api.searchParams.set("access_token", accessToken);
  api.searchParams.set("omitscript", "true");
  api.searchParams.set("hidecaption", "true");

  try {
    const resp = await fetch(api.toString(), { cache: "no-store" });
    const text = await resp.text();

    if (!resp.ok) {
      // lihat di vercel logs kalau ada error
      console.error("oEmbed error", {
        status: resp.status,
        tokenType,
        host,
        text,
      });
      return NextResponse.json(
        {
          error: "Upstream oEmbed error",
          status: resp.status,
          details: text.slice(0, 1000),
          hint: "Pastikan: Product oEmbed aktif, Allowed Domains berisi domainmu/localhost, App Live/Dev sesuai, dan post IG publik.",
        },
        { status: 502 }
      );
    }

    const data = JSON.parse(text);
    return NextResponse.json({
      thumbnail_url: data.thumbnail_url,
      author_name: data.author_name,
      title: data.title,
    });
  } catch (e: any) {
    console.error("oEmbed exception", e);
    return NextResponse.json(
      { error: e?.message || "Internal error" },
      { status: 500 }
    );
  }
}
