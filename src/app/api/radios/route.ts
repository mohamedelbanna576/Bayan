import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://mp3quran.net/api/v3/radios?language=ar", {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ radios: [] }, { status: 500 });
  }
}
