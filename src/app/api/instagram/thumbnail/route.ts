import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing ?url=" }, { status: 400 });
  }

  const APP_ID = process.env.FB_APP_ID;
  const APP_SECRET = process.env.FB_APP_SECRET;

  if (!APP_ID || !APP_SECRET) {
    return NextResponse.json(
      { error: "FB_APP_ID / FB_APP_SECRET not configured on server" },
      { status: 500 }
    );
  }

  // (opsional) batasi asal host
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

  const accessToken = `${APP_ID}|${APP_SECRET}`;
  const api = new URL("https://graph.facebook.com/v20.0/instagram_oembed");
  api.searchParams.set("url", url);
  api.searchParams.set("access_token", accessToken);
  api.searchParams.set("omitscript", "true");
  api.searchParams.set("hidecaption", "true");

  try {
    // sementara: jangan cache biar debug gampang
    const resp = await fetch(api.toString(), { cache: "no-store" });
    const text = await resp.text();

    if (!resp.ok) {
      // log ke server untuk dilihat di vercel logs
      console.error("oEmbed error", resp.status, text);
      return NextResponse.json(
        {
          error: "Upstream oEmbed error",
          status: resp.status,
          details: text.slice(0, 1000),
          hint: "Cek: App Live/Dev, Allowed Domains, postingan publik, dan token APP_ID|APP_SECRET.",
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
