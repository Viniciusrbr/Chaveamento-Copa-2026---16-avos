import { cn } from "@/lib/utils";
import { BRACKET_METRICS } from "./bracket-metrics";

export function StraightConnector() {
  return (
    <div
      className={cn("flex shrink-0 flex-col", BRACKET_METRICS.straightWidth)}
    >
      <div className={cn("shrink-0", BRACKET_METRICS.headerHeight)} />
      <div className="flex flex-1 items-center">
        <div className="h-px w-full bg-gradient-to-r from-border via-primary/60 to-primary/60" />
      </div>
    </div>
  );
}
