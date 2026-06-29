"use client";

import { MatchCard } from "@/components/bracket/match-card";
import type { AgendaDay } from "@/lib/calendar";
import type { Match } from "@/lib/espn/model";
import { formatDayHeading } from "@/lib/format";
import { cn } from "@/lib/utils";
import { CalendarLiveDot } from "./calendar-live-dot";

type CalendarAgendaProps = {
  days: AgendaDay[];
  today: string | null;
  onSelect: (match: Match) => void;
};

export function CalendarAgenda({ days, today, onSelect }: CalendarAgendaProps) {
  return (
    <div className="flex flex-col gap-6">
      {days.map((day) => {
        const isToday = day.key === today;
        const hasLive = day.matches.some((match) => match.status.live);

        return (
          <section key={day.key} className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-1.5">
              <h2
                className={cn(
                  "eyebrow text-xs",
                  isToday ? "text-primary" : "text-muted-foreground",
                )}
              >
                {isToday ? "Hoje · " : ""}
                {formatDayHeading(day.iso)}
              </h2>
              <span className="flex items-center gap-1.5">
                {hasLive ? <CalendarLiveDot /> : null}
                <span className="rounded-full bg-primary/15 px-1.5 py-0.5 font-mono text-[0.6rem] font-semibold text-primary tabular-nums">
                  {day.matches.length}
                </span>
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {day.matches.map((match) => (
                <MatchCard key={match.id} match={match} onSelect={onSelect} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
