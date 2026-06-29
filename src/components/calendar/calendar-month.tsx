"use client";

import { useMemo } from "react";
import { buildMonthMatrix, WEEKDAY_LABELS } from "@/lib/calendar";
import type { Match } from "@/lib/espn/model";
import { formatMonthTitle } from "@/lib/format";
import { CalendarDayCell } from "./calendar-day-cell";

type CalendarMonthProps = {
  year: number;
  month: number;
  matchesByDay: Map<string, Match[]>;
  today: string | null;
  onSelect: (match: Match) => void;
};

export function CalendarMonth({
  year,
  month,
  matchesByDay,
  today,
  onSelect,
}: CalendarMonthProps) {
  const weeks = useMemo(() => buildMonthMatrix(year, month), [year, month]);

  return (
    <section className="rounded-2xl border border-border/60 bg-card/30 p-3 pitch-grid sm:p-4">
      <h2 className="eyebrow mb-3 text-sm text-foreground sm:text-base">
        {formatMonthTitle(year, month)}
      </h2>

      <div className="mb-1.5 grid grid-cols-7 gap-1.5">
        {WEEKDAY_LABELS.map((label) => (
          <span
            key={label}
            className="eyebrow px-0.5 text-center text-[0.6rem] text-muted-foreground/60"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        {weeks.map((week) => (
          <div key={week[0].key} className="grid grid-cols-7 gap-1.5">
            {week.map((day) => (
              <CalendarDayCell
                key={day.key}
                day={day}
                matches={
                  day.inCurrentMonth ? (matchesByDay.get(day.key) ?? []) : []
                }
                isToday={day.inCurrentMonth && day.key === today}
                onSelect={onSelect}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
