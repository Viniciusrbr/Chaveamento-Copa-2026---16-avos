"use client";

import {
  type BracketColumn,
  LEFT_COLUMNS,
  RIGHT_COLUMNS,
} from "@/lib/bracket-topology";
import type { Match, Round } from "@/lib/espn/model";
import { BRACKET_METRICS } from "./bracket-metrics";
import { type ElbowBox, ElbowConnector } from "./elbow-connector";
import { FinalColumn } from "./final-column";
import { RoundColumn } from "./round-column";
import { StraightConnector } from "./straight-connector";

type BracketProps = {
  byRound: Record<Round, Match[]>;
  onSelect: (match: Match) => void;
};

function hasAdvancingTeam(match: Match | undefined): boolean {
  if (!match || !match.status.completed) return false;
  return [match.home, match.away].some(
    (slot) => slot.kind === "team" && (slot.winner || slot.advanced),
  );
}

export function Bracket({ byRound, onSelect }: BracketProps) {
  const matchAt = (column: BracketColumn, position: number) =>
    byRound[column.round]?.[position - 1];

  const buildBoxes = (
    source: BracketColumn,
    target: BracketColumn,
  ): ElbowBox[] =>
    target.order.map((targetPosition, index) => ({
      topActive: hasAdvancingTeam(matchAt(source, source.order[index * 2])),
      bottomActive: hasAdvancingTeam(
        matchAt(source, source.order[index * 2 + 1]),
      ),
      outputActive: hasAdvancingTeam(matchAt(target, targetPosition)),
    }));

  return (
    <div
      className="flex items-stretch px-6 pb-4"
      style={{ height: BRACKET_METRICS.sideHeight }}
    >
      {LEFT_COLUMNS.map((column, index) => {
        const next = LEFT_COLUMNS[index + 1];
        return (
          <div key={`left-${column.round}`} className="flex items-stretch">
            <RoundColumn
              column={column}
              byRound={byRound}
              onSelect={onSelect}
            />
            {next ? (
              <ElbowConnector side="left" boxes={buildBoxes(column, next)} />
            ) : (
              <StraightConnector
                side="left"
                active={hasAdvancingTeam(matchAt(column, column.order[0]))}
              />
            )}
          </div>
        );
      })}

      <FinalColumn byRound={byRound} onSelect={onSelect} />

      {RIGHT_COLUMNS.map((column, index) => {
        const previous = RIGHT_COLUMNS[index - 1];
        return (
          <div key={`right-${column.round}`} className="flex items-stretch">
            {index === 0 ? (
              <StraightConnector
                side="right"
                active={hasAdvancingTeam(matchAt(column, column.order[0]))}
              />
            ) : (
              <ElbowConnector
                side="right"
                boxes={buildBoxes(column, previous)}
              />
            )}
            <RoundColumn
              column={column}
              byRound={byRound}
              onSelect={onSelect}
            />
          </div>
        );
      })}
    </div>
  );
}
