import type { H2HGame } from "@/lib/espn/summary-model";
import { formatMatchDate } from "@/lib/format";

type MatchH2HProps = {
  games: H2HGame[];
};

export function MatchH2H({ games }: MatchH2HProps) {
  if (games.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Sem confrontos diretos registrados.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border/40">
      {games.slice(0, 8).map((game, index) => (
        <li
          key={`${game.label}-${index}`}
          className="flex items-center justify-between gap-3 py-2.5"
        >
          <span className="min-w-0 truncate text-sm">
            {game.label ?? "Confronto"}
          </span>
          <span className="flex shrink-0 items-center gap-3">
            {game.date ? (
              <span className="font-mono text-[0.65rem] text-muted-foreground">
                {formatMatchDate(game.date)}
              </span>
            ) : null}
            <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-sm font-semibold tabular-nums">
              {game.homeScore ?? "–"} : {game.awayScore ?? "–"}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
