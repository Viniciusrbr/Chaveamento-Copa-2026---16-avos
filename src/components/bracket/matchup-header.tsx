import Image from "next/image";
import type { Match, TeamSlot } from "@/lib/espn/model";
import { cn } from "@/lib/utils";
import { MatchStatusBadge } from "./match-status";

type MatchupHeaderProps = {
  match: Match;
};

function TeamBlock({
  slot,
  align,
}: {
  slot: TeamSlot;
  align: "start" | "end";
}) {
  const isWinner = slot.kind === "team" && (slot.winner || slot.advanced);

  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center gap-2",
        align === "start" ? "sm:items-start" : "sm:items-end",
      )}
    >
      <span className="relative size-12 overflow-hidden rounded-full ring-1 ring-border">
        {slot.kind === "team" && slot.flag ? (
          <Image
            src={slot.flag}
            alt={`Bandeira ${slot.name}`}
            fill
            sizes="48px"
            className="object-cover"
          />
        ) : (
          <span className="flex size-full items-center justify-center bg-secondary text-muted-foreground/50">
            ?
          </span>
        )}
      </span>
      <span
        className={cn(
          "max-w-full truncate text-center text-sm font-semibold sm:text-left",
          isWinner ? "text-primary" : "text-foreground",
        )}
      >
        {slot.kind === "team" ? slot.name : slot.label}
      </span>
    </div>
  );
}

export function MatchupHeader({ match }: MatchupHeaderProps) {
  const homeScore = match.home.kind === "team" ? match.home.score : undefined;
  const awayScore = match.away.kind === "team" ? match.away.score : undefined;
  const hasScore = match.status.state !== "pre";

  return (
    <div className="flex items-center gap-3 sm:gap-5">
      <TeamBlock slot={match.home} align="start" />

      <div className="flex shrink-0 flex-col items-center gap-1.5">
        <MatchStatusBadge status={match.status} />
        {hasScore ? (
          <div className="flex items-center gap-2 font-mono text-3xl font-bold tabular-nums">
            <span>{homeScore ?? 0}</span>
            <span className="text-muted-foreground/40">:</span>
            <span>{awayScore ?? 0}</span>
          </div>
        ) : (
          <span className="font-display text-lg font-semibold text-muted-foreground">
            VS
          </span>
        )}
        {match.home.kind === "team" &&
        match.home.penaltyScore !== undefined &&
        match.away.kind === "team" &&
        match.away.penaltyScore !== undefined ? (
          <span className="text-[0.65rem] text-muted-foreground">
            Pênaltis {match.home.penaltyScore}–{match.away.penaltyScore}
          </span>
        ) : null}
      </div>

      <TeamBlock slot={match.away} align="end" />
    </div>
  );
}
