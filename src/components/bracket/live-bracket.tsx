"use client";

import { useMemo, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useLiveBracket } from "@/hooks/use-live-bracket";
import type { Bracket as BracketData, Match } from "@/lib/espn/model";
import { Bracket } from "./bracket";
import { LiveStatusBar } from "./live-status-bar";
import { MatchDetailDialog } from "./match-detail-dialog";

type LiveBracketProps = {
  initialBracket: BracketData;
};

export function LiveBracket({ initialBracket }: LiveBracketProps) {
  const { bracket, error, isRefreshing, refresh } =
    useLiveBracket(initialBracket);
  const [selected, setSelected] = useState<Match | null>(null);

  const liveCount = useMemo(
    () => bracket.matches.filter((match) => match.status.live).length,
    [bracket],
  );

  const selectedMatch = useMemo(() => {
    if (!selected) return null;
    return (
      bracket.matches.find((match) => match.id === selected.id) ?? selected
    );
  }, [bracket, selected]);

  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <LiveStatusBar
        liveCount={liveCount}
        isRefreshing={isRefreshing}
        error={error}
        onRefresh={refresh}
      />

      <div className="min-w-0 overflow-hidden rounded-2xl border border-border/60 bg-card/30 pitch-grid">
        <ScrollArea className="w-full">
          <div className="min-w-max py-6">
            <Bracket byRound={bracket.byRound} onSelect={setSelected} />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <MatchDetailDialog
        match={selectedMatch}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </div>
  );
}
