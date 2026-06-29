"use client";

import { ChevronRight } from "lucide-react";
import type { Match } from "@/lib/espn/model";
import { ROUND_LABEL } from "@/lib/espn/model";
import { formatMatchDate } from "@/lib/format";
import { cn } from "@/lib/utils";
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

  return (
    <button
      type="button"
      onClick={() => onSelect(match)}
      data-live={match.status.live ? "" : undefined}
      className={cn(
        "@container group/card relative w-full overflow-hidden rounded-lg border border-border bg-card text-left",
        "transition-all duration-200 outline-none",
        "hover:border-primary/40 hover:bg-elevated hover:shadow-lg hover:shadow-black/20",
        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40",
        match.status.live && "border-live/40",
        isFinal && "champion-glow border-primary/50 bg-elevated",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-2 border-b border-border/60 px-3 py-1.5",
          isFinal && "bg-primary/10",
        )}
      >
        <span className="eyebrow text-[0.6rem] text-muted-foreground">
          {isFinal ? "Grande Final" : formatMatchDate(match.date)}
        </span>
        <MatchStatusBadge status={match.status} />
      </div>

      <div className="divide-y divide-border/50">
        <TeamRow slot={match.home} state={match.status.state} />
        <TeamRow slot={match.away} state={match.status.state} />
      </div>

      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 right-1.5 -translate-y-1/2 text-muted-foreground/0 transition-all",
          "group-hover/card:right-2 group-hover/card:text-muted-foreground",
        )}
      >
        <ChevronRight className="size-4" />
      </span>
      <span className="sr-only">
        {ROUND_LABEL[match.round]}: ver detalhes da partida
      </span>
    </button>
  );
}
