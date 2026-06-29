import type { BracketSide } from "@/lib/bracket-topology";
import { cn } from "@/lib/utils";
import { BRACKET_METRICS } from "./bracket-metrics";

type ElbowConnectorProps = {
  side: BracketSide;
  /** Number of target matches (pairs) this connector feeds into. */
  targetCount: number;
};

export function ElbowConnector({ side, targetCount }: ElbowConnectorProps) {
  const elbowHeight = `${100 / (2 * targetCount)}%`;
  const isLeft = side === "left";

  return (
    <div className={cn("flex shrink-0 flex-col", BRACKET_METRICS.elbowWidth)}>
      <div className={cn("shrink-0", BRACKET_METRICS.headerHeight)} />
      <div className="flex flex-1 flex-col justify-around">
        {Array.from({ length: targetCount }, (_, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: positional connectors are static
            key={index}
            style={{ height: elbowHeight }}
            className={cn(
              "w-full border-border/70",
              isLeft
                ? "rounded-r-md border-y border-r"
                : "rounded-l-md border-y border-l",
            )}
          />
        ))}
      </div>
    </div>
  );
}
