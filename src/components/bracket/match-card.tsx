"use client";

import { ChevronRight } from "lucide-react";
import type { Match } from "@/lib/espn/model";
import { ROUND_LABEL } from "@/lib/espn/model";
import { formatMatchDate, formatMatchWeekday } from "@/lib/format";
import { cn } from "@/lib/utils";
import { AddToCalendarButton } from "./add-to-calendar-button";
import { MatchStatusBadge } from "./match-status";
import { TeamRow } from "./team-row";

type MatchCardProps = {
  match: Match;
  onSelect: (match: Match) => void;
  variant?: "default" | "final";
};

export function MatchCard({
  match,
  onSelect,
  variant = "default",
}: MatchCardProps) {
  const isFinal = variant === "final";
  const isUpcoming = match.status.state === "pre";

  return (
    <div
      data-live={match.status.live ? "" : undefined}
      className={cn(
        "@container group/card relative w-full overflow-hidden rounded-lg border border-border bg-card text-left",
        "transition-all duration-200",
        "hover:border-primary/40 hover:bg-elevated hover:shadow-lg hover:shadow-black/20",
        "focus-within:border-primary",
        match.status.live && "border-live/40",
        isFinal && "champion-glow border-primary/50 bg-elevated",
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(match)}
        className="absolute inset-0 z-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <span className="sr-only">
          {ROUND_LABEL[match.round]}: ver detalhes da partida
        </span>
      </button>

      <div className="pointer-events-none relative z-10">
        <div
          className={cn(
            "flex items-center justify-between gap-2 border-b border-border/60 px-3 py-1.5",
            isFinal && "bg-primary/10",
          )}
        >
          {isFinal ? (
            <span className="eyebrow text-[0.6rem] text-muted-foreground">
              Grande Final
            </span>
          ) : (
            <span className="flex min-w-0 flex-col">
              <span className="eyebrow text-[0.6rem] text-muted-foreground">
                {formatMatchDate(match.date)}
              </span>
              <span className="truncate text-[0.6rem] text-muted-foreground/60">
                {formatMatchWeekday(match.date)}
              </span>
            </span>
          )}
          <div className="flex items-center gap-1">
            {isUpcoming ? (
              <span className="pointer-events-auto">
                <AddToCalendarButton match={match} compact />
              </span>
            ) : null}
            <MatchStatusBadge status={match.status} />
          </div>
        </div>

        <div className="divide-y divide-border/50">
          <TeamRow slot={match.home} state={match.status.state} />
          <TeamRow slot={match.away} state={match.status.state} />
        </div>
      </div>

      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 right-1.5 z-10 -translate-y-1/2 text-muted-foreground/0 transition-all",
          "group-hover/card:right-2 group-hover/card:text-muted-foreground",
        )}
      >
        <ChevronRight className="size-4" />
      </span>
    </div>
  );
}
