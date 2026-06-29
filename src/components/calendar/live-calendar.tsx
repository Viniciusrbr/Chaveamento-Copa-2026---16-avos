"use client";

import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { LiveStatusBar } from "@/components/bracket/live-status-bar";
import { MatchDetailDialog } from "@/components/bracket/match-detail-dialog";
import { useLiveBracket } from "@/hooks/use-live-bracket";
import {
  buildAgendaDays,
  CALENDAR_MONTHS,
  groupMatchesByDay,
} from "@/lib/calendar";
import type { Bracket as BracketData, Match } from "@/lib/espn/model";
import { CalendarAgenda } from "./calendar-agenda";
import { CalendarMonth } from "./calendar-month";

type LiveCalendarProps = {
  initialBracket: BracketData;
};

export function LiveCalendar({ initialBracket }: LiveCalendarProps) {
  const { bracket, error, isRefreshing, refresh } =
    useLiveBracket(initialBracket);
  const [selected, setSelected] = useState<Match | null>(null);
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(dayjs().format("YYYY-MM-DD"));
  }, []);

  const liveCount = useMemo(
    () => bracket.matches.filter((match) => match.status.live).length,
    [bracket],
  );

  const matchesByDay = useMemo(
    () => groupMatchesByDay(bracket.matches),
    [bracket],
  );

  const agendaDays = useMemo(
    () => buildAgendaDays(matchesByDay),
    [matchesByDay],
  );

  const selectedMatch = useMemo(() => {
    if (!selected) return null;
    return (
      bracket.matches.find((match) => match.id === selected.id) ?? selected
    );
  }, [bracket, selected]);

  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <LiveStatusBar
        liveCount={liveCount}
        isRefreshing={isRefreshing}
        error={error}
        onRefresh={refresh}
      />

      <div className="hidden flex-col gap-6 md:flex">
        {CALENDAR_MONTHS.map(({ year, month }) => (
          <CalendarMonth
            key={`${year}-${month}`}
            year={year}
            month={month}
            matchesByDay={matchesByDay}
            today={today}
            onSelect={setSelected}
          />
        ))}
      </div>

      <div className="md:hidden">
        <CalendarAgenda
          days={agendaDays}
          today={today}
          onSelect={setSelected}
        />
      </div>

      <MatchDetailDialog
        match={selectedMatch}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </div>
  );
}
