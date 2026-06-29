"use client";

import { LEFT_COLUMNS, RIGHT_COLUMNS } from "@/lib/bracket-topology";
import type { Match, Round } from "@/lib/espn/model";
import { BRACKET_METRICS } from "./bracket-metrics";
import { ElbowConnector } from "./elbow-connector";
import { FinalColumn } from "./final-column";
import { RoundColumn } from "./round-column";
import { StraightConnector } from "./straight-connector";

type BracketProps = {
  byRound: Record<Round, Match[]>;
  onSelect: (match: Match) => void;
};

export function Bracket({ byRound, onSelect }: BracketProps) {
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
              <ElbowConnector side="left" targetCount={next.order.length} />
            ) : (
              <StraightConnector />
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
              <StraightConnector />
            ) : (
              <ElbowConnector
                side="right"
                targetCount={previous.order.length}
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
