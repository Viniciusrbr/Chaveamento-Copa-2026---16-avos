"use client";

import { Trophy } from "lucide-react";
import type { Match, Round } from "@/lib/espn/model";
import { cn } from "@/lib/utils";
import { BRACKET_METRICS } from "./bracket-metrics";
import { MatchCard } from "./match-card";

type FinalColumnProps = {
  byRound: Record<Round, Match[]>;
  onSelect: (match: Match) => void;
};

function findChampion(final: Match | undefined): string | null {
  if (!final || !final.status.completed) return null;
  for (const slot of [final.home, final.away]) {
    if (slot.kind === "team" && (slot.winner || slot.advanced)) {
      return slot.name;
    }
  }
  return null;
}

export function FinalColumn({ byRound, onSelect }: FinalColumnProps) {
  const final = byRound.final?.[0];
  const thirdPlace = byRound["3rd-place-match"]?.[0];
  const champion = findChampion(final);

  return (
    <div
      className={cn(
        "flex shrink-0 flex-col items-center",
        BRACKET_METRICS.finalWidth,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center",
          BRACKET_METRICS.headerHeight,
        )}
      >
        <span className="eyebrow rounded-full bg-primary/15 px-2.5 py-0.5 text-[0.6rem] text-primary">
          Título
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <Trophy
            className={cn(
              "size-9 transition-colors",
              champion ? "text-primary" : "text-muted-foreground/40",
            )}
            strokeWidth={1.5}
          />
          <span className="eyebrow text-center text-[0.7rem] text-muted-foreground">
            {champion ? (
              <span className="text-primary">Campeão · {champion}</span>
            ) : (
              "Copa do Mundo FIFA"
            )}
          </span>
        </div>

        {final ? (
          <MatchCard match={final} onSelect={onSelect} variant="final" />
        ) : null}

        {thirdPlace ? (
          <div className="w-full pt-2">
            <p className="eyebrow mb-1.5 text-center text-[0.55rem] text-muted-foreground/70">
              Disputa de 3º lugar
            </p>
            <div className="opacity-90">
              <MatchCard match={thirdPlace} onSelect={onSelect} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
