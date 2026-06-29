import type { BracketSide } from "@/lib/bracket-topology";
import { cn } from "@/lib/utils";
import { BRACKET_METRICS } from "./bracket-metrics";

type StraightConnectorProps = {
  side: BracketSide;
  active?: boolean;
};

export function StraightConnector({
  side,
  active = false,
}: StraightConnectorProps) {
  const isLeft = side === "left";

  return (
    <div
      className={cn("flex shrink-0 flex-col", BRACKET_METRICS.straightWidth)}
    >
      <div className={cn("shrink-0", BRACKET_METRICS.headerHeight)} />
      <div className="relative flex flex-1 items-center">
        <div
          className={cn(
            "h-px w-full transition-colors",
            active
              ? isLeft
                ? "bg-linear-to-r from-primary/50 to-primary"
                : "bg-linear-to-l from-primary/50 to-primary"
              : "bg-muted-foreground/30",
          )}
        />
        <span
          aria-hidden
          className={cn(
            "absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full transition-colors",
            isLeft ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2",
            active
              ? "bg-primary shadow-[0_0_8px_var(--primary)]"
              : "bg-muted-foreground/45",
          )}
        />
      </div>
    </div>
  );
}
