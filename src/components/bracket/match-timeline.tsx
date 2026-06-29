import { Goal } from "lucide-react";
import type { TimelineEvent } from "@/lib/espn/summary-model";
import { cn } from "@/lib/utils";

type MatchTimelineProps = {
  events: TimelineEvent[];
};

export function MatchTimeline({ events }: MatchTimelineProps) {
  if (events.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Sem lances registrados ainda.
      </p>
    );
  }

  return (
    <ol className="relative space-y-3 pl-6">
      <span
        aria-hidden
        className="absolute top-1 bottom-1 left-[0.3rem] w-px bg-border"
      />
      {events.map((event, index) => (
        <li key={`${event.clock}-${index}`} className="relative">
          <span
            aria-hidden
            className={cn(
              "absolute top-1 -left-[1.35rem] flex size-3 items-center justify-center rounded-full ring-4 ring-popover",
              event.scoringPlay ? "bg-primary" : "bg-muted-foreground/50",
            )}
          />
          <div className="flex items-baseline gap-2">
            {event.clock ? (
              <span className="shrink-0 font-mono text-xs font-semibold text-primary tabular-nums">
                {event.clock}
              </span>
            ) : null}
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-sm font-medium">
                {event.scoringPlay ? (
                  <Goal className="size-3.5 text-primary" />
                ) : null}
                {event.type || "Lance"}
              </p>
              {event.text ? (
                <p className="text-xs text-muted-foreground">{event.text}</p>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
