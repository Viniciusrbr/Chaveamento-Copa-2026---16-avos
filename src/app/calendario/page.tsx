import type { Metadata } from "next";
import { LiveCalendar } from "@/components/calendar/live-calendar";
import { BracketError } from "@/components/home/bracket-error";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { getScoreboard } from "@/lib/espn/client";
import { normalizeScoreboard } from "@/lib/espn/normalize";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Calendário de Jogos",
  description:
    "Calendário completo do mata-mata da Copa do Mundo 2026: todos os confrontos de junho e julho, dia a dia, com horários, fases e status ao vivo.",
  alternates: {
    canonical: "/calendario",
  },
};

export default async function CalendarPage() {
  let bracket = null;
  let errorMessage: string | null = null;

  try {
    const scoreboard = await getScoreboard();
    const normalized = normalizeScoreboard(scoreboard);
    if (normalized.matches.length === 0) {
      errorMessage = "Nenhum confronto do mata-mata foi encontrado.";
    } else {
      bracket = normalized;
    }
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Erro ao conectar com a API da ESPN.";
  }

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader
        title="Calendário da Copa do Mundo 2026"
        subtitle="Cada jogo, dia a dia"
        description="Veja todo o mata-mata distribuído por data — de junho a julho de 2026. Cada dia mostra seus confrontos com horário e fase; toque em um jogo para abrir a ficha completa."
      />
      <main className="mx-auto w-full max-w-[110rem] min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-6">
        {bracket ? (
          <LiveCalendar initialBracket={bracket} />
        ) : (
          <BracketError
            title="Não foi possível carregar o calendário"
            message={errorMessage ?? "Erro desconhecido."}
          />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
