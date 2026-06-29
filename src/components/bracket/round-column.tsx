"use client";

import type { BracketColumn } from "@/lib/bracket-topology";
import type { Match, Round } from "@/lib/espn/model";
import { ROUND_LABEL } from "@/lib/espn/model";
import { cn } from "@/lib/utils";
import { BRACKET_METRICS } from "./bracket-metrics";
import { MatchCard } from "./match-card";

type RoundColumnProps = {
  column: BracketColumn;
  byRound: Record<Round, Match[]>;
  onSelect: (match: Match) => void;
  showLabel?: boolean;
};

export function RoundColumn({
  column,
  byRound,
  onSelect,
  showLabel = true,
}: RoundColumnProps) {
  const matches = byRound[column.round] ?? [];

  return (
    <div className={cn("flex shrink-0 flex-col", BRACKET_METRICS.cardWidth)}>
      <div
        className={cn(
          "flex shrink-0 items-center justify-center",
          BRACKET_METRICS.headerHeight,
        )}
      >
        {showLabel ? (
          <span className="eyebrow rounded-full bg-secondary/60 px-2.5 py-0.5 text-[0.6rem] text-muted-foreground">
            {ROUND_LABEL[column.round]}
          </span>
        ) : null}
      </div>
      <ul className="flex flex-1 flex-col justify-around">
        {column.order.map((position) => {
          const match = matches[position - 1];
          return (
            <li key={`${column.round}-${position}`} className="flex">
              {match ? (
                <MatchCard match={match} onSelect={onSelect} />
              ) : (
                <div className="h-16 w-full rounded-lg border border-dashed border-border/60 bg-card/40" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
