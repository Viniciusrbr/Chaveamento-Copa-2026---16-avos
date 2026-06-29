import type { MatchStatus } from "@/lib/espn/model";
import { cn } from "@/lib/utils";

type MatchStatusBadgeProps = {
  status: MatchStatus;
  className?: string;
};

export function MatchStatusBadge({ status, className }: MatchStatusBadgeProps) {
  if (status.live) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full bg-live/15 px-2 py-0.5 text-[0.7rem] font-semibold text-live",
          className,
        )}
      >
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-live opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-live" />
        </span>
        <span className="font-mono tabular-nums">
          {status.clock?.trim() || status.detail || "Ao vivo"}
        </span>
      </span>
    );
  }

  if (status.state === "post") {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground",
          className,
        )}
      >
        {status.detail || "Encerrado"}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground",
        className,
      )}
    >
      Agendado
    </span>
  );
}
