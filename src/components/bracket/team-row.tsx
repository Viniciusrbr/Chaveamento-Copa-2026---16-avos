"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MatchState, TeamSlot } from "@/lib/espn/model";
import { cn } from "@/lib/utils";

type TeamRowProps = {
  slot: TeamSlot;
  state: MatchState;
};

function useScorePop(score: number | undefined) {
  const previous = useRef(score);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    const changed =
      previous.current !== undefined &&
      score !== undefined &&
      score !== previous.current;
    previous.current = score;

    if (!changed) return;

    setPop(true);
    const timeout = setTimeout(() => setPop(false), 600);
    return () => clearTimeout(timeout);
  }, [score]);

  return pop;
}

export function TeamRow({ slot, state }: TeamRowProps) {
  const score = slot.kind === "team" ? slot.score : undefined;
  const pop = useScorePop(score);

  if (slot.kind === "placeholder") {
    return (
      <div className="flex items-center gap-2.5 px-3 py-2">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground/60">
          <span className="size-1.5 rounded-full bg-muted-foreground/40" />
        </span>
        <span className="truncate text-sm text-muted-foreground/70 italic">
          {slot.label}
        </span>
      </div>
    );
  }

  const isWinner = slot.winner || slot.advanced;
  const dimmed = state === "post" && !isWinner;

  return (
    <div
      className={cn(
        "group/team flex items-center gap-2.5 px-3 py-2 transition-colors",
        isWinner && "bg-primary/[0.07]",
      )}
    >
      {isWinner ? (
        <span
          aria-hidden
          className="-ml-3 mr-0 h-7 w-0.5 shrink-0 rounded-full bg-primary"
        />
      ) : (
        <span aria-hidden className="-ml-3 mr-0 h-7 w-0.5 shrink-0" />
      )}
      <span className="relative size-6 shrink-0 overflow-hidden rounded-full ring-1 ring-border/60">
        {slot.flag ? (
          <Image
            src={slot.flag}
            alt={`Bandeira ${slot.name}`}
            fill
            sizes="24px"
            className="object-cover"
          />
        ) : null}
      </span>
      <span
        className={cn(
          "min-w-0 flex-1 truncate text-sm font-medium",
          dimmed ? "text-muted-foreground" : "text-foreground",
        )}
      >
        <span className="hidden @[15rem]:inline">{slot.name}</span>
        <span className="@[15rem]:hidden">{slot.abbr}</span>
      </span>
      <span
        className={cn(
          "flex items-baseline gap-1 font-mono text-base font-semibold tabular-nums",
          dimmed ? "text-muted-foreground" : "text-foreground",
          pop && "animate-score-pop",
        )}
      >
        {slot.penaltyScore !== undefined ? (
          <span className="text-[0.65rem] font-medium text-muted-foreground">
            ({slot.penaltyScore})
          </span>
        ) : null}
        {score ?? <span className="text-muted-foreground/50">–</span>}
      </span>
    </div>
  );
}
