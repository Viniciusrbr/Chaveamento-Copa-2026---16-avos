import { ArrowDownRight, ArrowUpRight, Users } from "lucide-react";
import type { LineupPlayer, TeamLineup } from "@/lib/espn/summary-model";
import { cn } from "@/lib/utils";
import { EmptyState } from "./empty-state";

type LineupListProps = {
  lineups: TeamLineup[];
};

function PlayerRow({ player }: { player: LineupPlayer }) {
  return (
    <li className="flex items-center gap-2.5 py-1">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-secondary font-mono text-[0.7rem] font-semibold text-muted-foreground tabular-nums">
        {player.jersey ?? "–"}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm">{player.name}</span>
      {player.subbedOut ? (
        <ArrowDownRight
          className="size-3.5 text-live"
          aria-label="Substituído"
        />
      ) : null}
      {player.subbedIn ? (
        <ArrowUpRight className="size-3.5 text-pitch" aria-label="Entrou" />
      ) : null}
      {player.position ? (
        <span className="w-7 shrink-0 text-right font-mono text-[0.65rem] text-muted-foreground/70">
          {player.position}
        </span>
      ) : null}
    </li>
  );
}

function TeamLineupColumn({ lineup }: { lineup: TeamLineup }) {
  return (
    <div className="min-w-0">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h4 className="truncate text-sm font-semibold">{lineup.teamName}</h4>
        {lineup.formation ? (
          <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-primary">
            {lineup.formation}
          </span>
        ) : null}
      </div>
      <ul className="divide-y divide-border/40">
        {lineup.starters.map((player, index) => (
          <PlayerRow key={`${player.name}-${index}`} player={player} />
        ))}
      </ul>
      {lineup.bench.length > 0 ? (
        <div className="mt-3">
          <p className="eyebrow mb-1 text-[0.55rem] text-muted-foreground/60">
            Reservas
          </p>
          <ul className="divide-y divide-border/30 opacity-75">
            {lineup.bench.map((player, index) => (
              <PlayerRow
                key={`${player.name}-bench-${index}`}
                player={player}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function LineupList({ lineups }: LineupListProps) {
  const hasPlayers = lineups.some(
    (lineup) => lineup.starters.length > 0 || lineup.bench.length > 0,
  );

  if (!hasPlayers) {
    return (
      <EmptyState
        icon={<Users className="size-6" />}
        title="Escalações ainda não divulgadas"
        hint="Os técnicos costumam confirmar os titulares cerca de uma hora antes do apito inicial."
      />
    );
  }

  const home = lineups.find((lineup) => lineup.homeAway === "home");
  const away = lineups.find((lineup) => lineup.homeAway === "away");
  const ordered = [home, away].filter((lineup): lineup is TeamLineup =>
    Boolean(lineup),
  );

  return (
    <div className={cn("grid gap-6 sm:grid-cols-2")}>
      {ordered.map((lineup) => (
        <TeamLineupColumn key={lineup.homeAway} lineup={lineup} />
      ))}
    </div>
  );
}
