import { NextRequest, NextResponse } from "next/server";
import { getAllHormuzBriefingSlugs } from "@/lib/hormuz-content";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Number.parseInt(limitParam, 10) : 50;
    const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 50;
    const slugs = getAllHormuzBriefingSlugs().slice(0, safeLimit);

    return NextResponse.json({ slugs });
  } catch (error) {
    console.error("[api/posts/slugs] failed", error);
    return NextResponse.json({ slugs: [] }, { status: 200 });
  }
}
