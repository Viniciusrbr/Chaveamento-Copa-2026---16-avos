"use client";

import type { CalendarDay } from "@/lib/calendar";
import type { Match } from "@/lib/espn/model";
import { cn } from "@/lib/utils";
import { CalendarLiveDot } from "./calendar-live-dot";
import { CalendarMatchChip } from "./calendar-match-chip";

type CalendarDayCellProps = {
  day: CalendarDay;
  matches: Match[];
  isToday: boolean;
  onSelect: (match: Match) => void;
};

export function CalendarDayCell({
  day,
  matches,
  isToday,
  onSelect,
}: CalendarDayCellProps) {
  if (!day.inCurrentMonth) {
    return (
      <div className="min-h-24 rounded-lg border border-transparent p-1.5">
        <span className="text-xs font-medium text-muted-foreground/25">
          {day.dayOfMonth}
        </span>
      </div>
    );
  }

  const hasMatches = matches.length > 0;
  const hasLive = matches.some((match) => match.status.live);

  return (
    <div
      className={cn(
        "flex min-h-24 flex-col gap-1.5 rounded-lg border p-1.5 transition-colors",
        hasMatches ? "border-border bg-card" : "border-border/40 bg-card/20",
        isToday && "ring-1 ring-primary ring-offset-1 ring-offset-background",
      )}
    >
      <div className="flex items-center justify-between gap-1 px-0.5">
        <span
          className={cn(
            "font-display text-sm font-semibold",
            isToday
              ? "text-primary"
              : hasMatches
                ? "text-foreground"
                : "text-muted-foreground/60",
          )}
        >
          {day.dayOfMonth}
        </span>
        {hasMatches ? (
          <span className="flex items-center gap-1">
            {hasLive ? <CalendarLiveDot /> : null}
            <span className="rounded-full bg-primary/15 px-1.5 font-mono text-[0.6rem] font-semibold text-primary tabular-nums">
              {matches.length}
            </span>
          </span>
        ) : null}
      </div>

      {hasMatches ? (
        <div className="flex flex-col gap-1">
          {matches.map((match) => (
            <CalendarMatchChip
              key={match.id}
              match={match}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
