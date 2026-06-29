import { NextResponse } from "next/server";
import { getScoreboard } from "@/lib/espn/client";
import { normalizeScoreboard } from "@/lib/espn/normalize";

export const revalidate = 30;

export async function GET() {
  try {
    const scoreboard = await getScoreboard();
    const bracket = normalizeScoreboard(scoreboard);
    return NextResponse.json(bracket, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Falha ao buscar o chaveamento";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
