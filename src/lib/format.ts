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

export function formatMatchDateLong(iso: string): string {
  return dayjs(iso).format("dddd, DD [de] MMMM [de] YYYY [às] HH:mm");
}

export function formatRelative(iso: string): string {
  return dayjs(iso).fromNow();
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}
