import { NextResponse } from "next/server";

const FIELDS = [
  "id",
  "caption",
  "media_type",
  "media_url",
  "permalink",
  "thumbnail_url",
  "timestamp",
  "username",
].join(",");

export const revalidate = 3600; // ISR: cache 1 jam (opsional)

export async function GET() {
  const userId = process.env.IG_USER_ID;
  const token = process.env.IG_ACCESS_TOKEN;

  if (!userId || !token) {
    return NextResponse.json(
      { error: "Missing IG_USER_ID or IG_ACCESS_TOKEN" },
      { status: 500 }
    );
  }

  const url = new URL(`https://graph.instagram.com/${userId}/media`);
  url.searchParams.set("fields", FIELDS);
  url.searchParams.set("access_token", token);
  url.searchParams.set("limit", "6");

  const res = await fetch(url.toString(), {
    // Next cache; remove if you prefer pure SSR
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: res.status });
  }

  const data = await res.json();
  // Normalisasi: untuk video, pakai thumbnail_url
  const items = (data?.data ?? []).map((m: any) => ({
    id: m.id,
    caption: m.caption ?? "",
    media_type: m.media_type,
    url: m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url,
    permalink: m.permalink,
    timestamp: m.timestamp,
    username: m.username,
  }));

  return NextResponse.json({ items });
}
