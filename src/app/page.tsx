import { LiveBracket } from "@/components/bracket/live-bracket";
import { BracketError } from "@/components/home/bracket-error";
import { SiteHeader } from "@/components/home/site-header";
import { getScoreboard } from "@/lib/espn/client";
import { normalizeScoreboard } from "@/lib/espn/normalize";

export const revalidate = 30;

export default async function Home() {
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
      <SiteHeader />
      <main className="mx-auto w-full max-w-[110rem] min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-6">
        {bracket ? (
          <LiveBracket initialBracket={bracket} />
        ) : (
          <BracketError message={errorMessage ?? "Erro desconhecido."} />
        )}
      </main>
      <footer className="border-t border-border/60 px-6 py-4">
        <p className="mx-auto max-w-[110rem] text-xs text-muted-foreground">
          Dados em tempo real via API pública da ESPN. Projeto independente, sem
          vínculo com a FIFA.
        </p>
      </footer>
    </div>
  );
}
