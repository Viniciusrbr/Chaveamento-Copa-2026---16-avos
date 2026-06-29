import { NextResponse } from "next/server";
import { getSummary } from "@/lib/espn/client";
import { normalizeSummary } from "@/lib/espn/normalize-summary";

export const revalidate = 30;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ eventId: string }> },
) {
  const { eventId } = await params;

  if (!/^\d+$/.test(eventId)) {
    return NextResponse.json({ error: "Evento inválido" }, { status: 400 });
  }

  try {
    const summary = await getSummary(eventId);
    const normalized = normalizeSummary(summary);
    return NextResponse.json(normalized, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Falha ao buscar a partida";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
