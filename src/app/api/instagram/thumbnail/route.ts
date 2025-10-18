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
      { error: "FB_APP_ID / FB_APP_SECRET not configured" },
      { status: 500 }
    );
  }

  // (opsional) cek domain caller saat produksi
  const host = req.headers.get("host") || "";
  const allowed = (process.env.ALLOWED_OEMBED_DOMAINS || "")
    .split(",")
    .map((s) => s.trim());
  if (allowed.length && !allowed.some((d) => host.includes(d))) {
    return NextResponse.json(
      { error: `Host ${host} not allowed for oEmbed` },
      { status: 403 }
    );
  }

  const accessToken = `${APP_ID}|${APP_SECRET}`; // <<< pakai App Access Token
  const api = new URL("https://graph.facebook.com/v20.0/instagram_oembed");
  api.searchParams.set("url", url);
  api.searchParams.set("access_token", accessToken);
  api.searchParams.set("omitscript", "true");
  api.searchParams.set("hidecaption", "true");

  const resp = await fetch(api.toString(), { next: { revalidate: 3600 } });
  const text = await resp.text();

  if (!resp.ok) {
    // Beberkan error aslinya agar mudah debug
    return NextResponse.json(
      {
        error: text,
        hint: "Pastikan product oEmbed aktif, Allowed Domains sudah berisi domainmu/localhost, dan app mode sesuai.",
      },
      { status: resp.status }
    );
  }

  const data = JSON.parse(text);
  return NextResponse.json({
    thumbnail_url: data.thumbnail_url,
    author_name: data.author_name,
    title: data.title,
  });
}
