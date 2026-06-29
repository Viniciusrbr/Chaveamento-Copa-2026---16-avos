"use client";

import { LiveDot } from "@/components/bracket/live-dot";
import { Button } from "@/components/ui/button";
import type { Match } from "@/lib/espn/model";
import { ROUND_LABEL } from "@/lib/espn/model";
import { formatMatchTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { CalendarTeamMini } from "./calendar-team-mini";

type CalendarMatchChipProps = {
  match: Match;
  onSelect: (match: Match) => void;
};

export function CalendarMatchChip({ match, onSelect }: CalendarMatchChipProps) {
  return (
    <Button
      variant="ghost"
      onClick={() => onSelect(match)}
      data-live={match.status.live ? "" : undefined}
      className={cn(
        "flex h-auto w-full flex-col items-stretch justify-start gap-1 whitespace-normal rounded-md border border-border/50 bg-secondary/30 px-2 py-1.5 text-left",
        "hover:border-primary/40 hover:bg-elevated",
        match.status.live && "border-live/40 bg-live/5",
      )}
    >
      <span className="flex items-center justify-between gap-1.5">
        <span className="eyebrow truncate text-[0.55rem] text-muted-foreground">
          {ROUND_LABEL[match.round]}
        </span>
        {match.status.live ? (
          <span className="flex shrink-0 items-center gap-1 font-mono text-[0.6rem] font-semibold text-live tabular-nums">
            <LiveDot className="size-1" />
            {match.status.clock?.trim() || "AO VIVO"}
          </span>
        ) : match.status.state === "post" ? (
          <span className="shrink-0 text-[0.6rem] font-medium text-muted-foreground/70">
            Fim
          </span>
        ) : (
          <span className="shrink-0 font-mono text-[0.6rem] font-medium text-muted-foreground tabular-nums">
            {formatMatchTime(match.date)}
          </span>
        )}
      </span>

      <span className="flex items-center gap-1">
        <CalendarTeamMini
          slot={match.home}
          state={match.status.state}
          align="start"
        />
        <span className="shrink-0 text-[0.6rem] text-muted-foreground/50">
          ×
        </span>
        <CalendarTeamMini
          slot={match.away}
          state={match.status.state}
          align="end"
        />
      </span>
    </Button>
  );
}
