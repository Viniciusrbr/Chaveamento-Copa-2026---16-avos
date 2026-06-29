import Image from "next/image";
import { formatSlotLabel } from "@/lib/calendar";
import type { MatchState, TeamSlot } from "@/lib/espn/model";
import { cn } from "@/lib/utils";

type CalendarTeamMiniProps = {
  slot: TeamSlot;
  state: MatchState;
  align: "start" | "end";
};

export function CalendarTeamMini({
  slot,
  state,
  align,
}: CalendarTeamMiniProps) {
  const reversed = align === "end";

  if (slot.kind === "placeholder") {
    return (
      <span
        className={cn(
          "flex min-w-0 flex-1 items-center",
          reversed ? "flex-row-reverse" : "flex-row",
        )}
      >
        <span className="truncate text-[0.7rem] text-muted-foreground/70 italic">
          {formatSlotLabel(slot.label)}
        </span>
      </span>
    );
  }

  const isWinner = slot.winner || slot.advanced;
  const dimmed = state === "post" && !isWinner;

  return (
    <span
      className={cn(
        "flex min-w-0 flex-1 items-center gap-1.5",
        reversed ? "flex-row-reverse" : "flex-row",
      )}
    >
      <span className="relative size-4 shrink-0 overflow-hidden rounded-full ring-1 ring-border/60">
        {slot.flag ? (
          <Image
            src={slot.flag}
            alt={`Bandeira ${slot.name}`}
            fill
            sizes="16px"
            className="object-cover"
          />
        ) : null}
      </span>
      <span
        className={cn(
          "truncate text-xs font-semibold tracking-tight",
          dimmed ? "text-muted-foreground" : "text-foreground",
        )}
      >
        {slot.abbr}
      </span>
      {state !== "pre" && slot.score !== undefined ? (
        <span
          className={cn(
            "font-mono text-xs font-semibold tabular-nums",
            dimmed ? "text-muted-foreground" : "text-foreground",
          )}
        >
          {slot.score}
        </span>
      ) : null}
    </span>
  );
}
