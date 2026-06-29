import { Flag, MapPin, Users } from "lucide-react";
import type { MatchInfo as MatchInfoData } from "@/lib/espn/summary-model";
import { formatNumber } from "@/lib/format";
import { EmptyState } from "./empty-state";

type MatchInfoProps = {
  info: MatchInfoData;
};

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <div className="min-w-0">
        <p className="eyebrow text-[0.55rem] text-muted-foreground/70">
          {label}
        </p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
}

export function MatchInfo({ info }: MatchInfoProps) {
  const venue = [info.venueName, info.venueCity, info.venueCountry]
    .filter(Boolean)
    .join(" · ");
  const referee = info.officials[0]?.name;

  return (
    <div className="divide-y divide-border/40">
      {venue ? (
        <InfoRow
          icon={<MapPin className="size-4" />}
          label="Estádio"
          value={venue}
        />
      ) : null}
      {info.attendance ? (
        <InfoRow
          icon={<Users className="size-4" />}
          label="Público"
          value={`${formatNumber(info.attendance)} torcedores${
            info.capacity ? ` · cap. ${formatNumber(info.capacity)}` : ""
          }`}
        />
      ) : null}
      {referee ? (
        <InfoRow
          icon={<Flag className="size-4" />}
          label="Árbitro"
          value={referee}
        />
      ) : null}
      {!venue && !info.attendance && !referee ? (
        <EmptyState
          icon={<MapPin className="size-6" />}
          title="Detalhes da partida indisponíveis"
          hint="Estádio, público e arbitragem aparecem aqui quando confirmados."
        />
      ) : null}
    </div>
  );
}
