import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function formatMatchDate(iso: string): string {
  return dayjs(iso).format("DD MMM · HH:mm");
}

export function formatMatchWeekday(iso: string): string {
  const weekday = dayjs(iso).format("dddd").replace("-feira", "");
  return weekday.charAt(0).toUpperCase() + weekday.slice(1);
}

export function formatMatchDateLong(iso: string): string {
  return dayjs(iso).format("dddd, DD [de] MMMM [de] YYYY [às] HH:mm");
}

export function formatRelative(iso: string): string {
  return dayjs(iso).fromNow();
}

export function formatMatchTime(iso: string): string {
  return dayjs(iso).format("HH:mm");
}

export function formatMonthTitle(year: number, month: number): string {
  return dayjs(`${year}-${String(month + 1).padStart(2, "0")}-01`).format(
    "MMMM [de] YYYY",
  );
}

export function formatDayHeading(iso: string): string {
  const weekday = dayjs(iso).format("dddd").replace("-feira", "");
  const capitalized = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  return `${capitalized} · ${dayjs(iso).format("DD [de] MMMM")}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}
