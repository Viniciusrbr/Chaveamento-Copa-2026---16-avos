import type { BracketSide } from "@/lib/bracket-topology";
import { cn } from "@/lib/utils";
import { BRACKET_METRICS } from "./bracket-metrics";

export type ElbowBox = {
  topActive: boolean;
  bottomActive: boolean;
  outputActive: boolean;
};

type ElbowConnectorProps = {
  side: BracketSide;
  boxes: ElbowBox[];
};

export function ElbowConnector({ side, boxes }: ElbowConnectorProps) {
  const isLeft = side === "left";
  const boxHeight = `${100 / (2 * boxes.length)}%`;

  return (
    <div className={cn("flex shrink-0 flex-col", BRACKET_METRICS.elbowWidth)}>
      <div className={cn("shrink-0", BRACKET_METRICS.headerHeight)} />
      <div className="flex flex-1 flex-col justify-around">
        {boxes.map((box, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: positional connectors are static
            key={index}
            style={{ height: boxHeight }}
            className="relative w-full"
          >
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-0 top-0 h-px transition-colors",
                box.topActive ? "bg-primary" : "bg-muted-foreground/30",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-0 bottom-0 h-px transition-colors",
                box.bottomActive ? "bg-primary" : "bg-muted-foreground/30",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "absolute inset-y-0 w-px transition-colors",
                isLeft ? "right-0" : "left-0",
                box.outputActive ? "bg-primary" : "bg-muted-foreground/30",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full transition-colors",
                isLeft ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2",
                box.outputActive
                  ? "bg-primary shadow-[0_0_8px_var(--primary)]"
                  : "bg-muted-foreground/45",
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
