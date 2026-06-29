import dayjs from "dayjs";
import type { Match } from "@/lib/espn/model";

export type CalendarDay = {
  key: string;
  dayOfMonth: number;
  inCurrentMonth: boolean;
};

export type CalendarMonthRef = {
  year: number;
  month: number;
};

export type AgendaDay = {
  key: string;
  iso: string;
  matches: Match[];
};

export const WEEKDAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export const CALENDAR_MONTHS: CalendarMonthRef[] = [
  { year: 2026, month: 5 },
  { year: 2026, month: 6 },
];

export function getMatchDayKey(iso: string): string {
  return dayjs(iso).format("YYYY-MM-DD");
}

export function buildMonthMatrix(year: number, month: number): CalendarDay[][] {
  const start = dayjs(`${year}-${String(month + 1).padStart(2, "0")}-01`);
  const leading = start.day();
  const totalCells = Math.ceil((leading + start.daysInMonth()) / 7) * 7;
  const gridStart = start.subtract(leading, "day");

  const weeks: CalendarDay[][] = [];
  for (let cell = 0; cell < totalCells; cell += 1) {
    const date = gridStart.add(cell, "day");
    if (cell % 7 === 0) weeks.push([]);
    weeks[weeks.length - 1].push({
      key: date.format("YYYY-MM-DD"),
      dayOfMonth: date.date(),
      inCurrentMonth: date.month() === month,
    });
  }
  return weeks;
}

export function groupMatchesByDay(matches: Match[]): Map<string, Match[]> {
  const sorted = [...matches].sort((a, b) => a.date.localeCompare(b.date));
  const byDay = new Map<string, Match[]>();
  for (const match of sorted) {
    const key = getMatchDayKey(match.date);
    const bucket = byDay.get(key);
    if (bucket) bucket.push(match);
    else byDay.set(key, [match]);
  }
  return byDay;
}

export function buildAgendaDays(byDay: Map<string, Match[]>): AgendaDay[] {
  return Array.from(byDay.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, matches]) => ({ key, matches, iso: matches[0].date }));
}

const PLACEHOLDER_RULES: { pattern: RegExp; replace: string }[] = [
  { pattern: /Round of 32 (\d+) Winner/i, replace: "Vencedor 16-avos $1" },
  { pattern: /Round of 16 (\d+) Winner/i, replace: "Vencedor Oitavas $1" },
  { pattern: /Quarterfinal (\d+) Winner/i, replace: "Vencedor Quartas $1" },
  { pattern: /Semifinal (\d+) Winner/i, replace: "Vencedor Semifinal $1" },
  { pattern: /Winner Group ([A-Z])/i, replace: "1º Grupo $1" },
  { pattern: /Runner-?Up Group ([A-Z])/i, replace: "2º Grupo $1" },
];

export function formatSlotLabel(label: string): string {
  for (const rule of PLACEHOLDER_RULES) {
    if (rule.pattern.test(label))
      return label.replace(rule.pattern, rule.replace);
  }
  return label;
}
