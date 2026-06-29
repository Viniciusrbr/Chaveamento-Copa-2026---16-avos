"use client";

import { LoaderCircle, TriangleAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMatchSummary } from "@/hooks/use-match-summary";
import type { Match } from "@/lib/espn/model";
import { ROUND_LABEL } from "@/lib/espn/model";
import { formatMatchDateLong } from "@/lib/format";
import { AddToCalendarButton } from "./add-to-calendar-button";
import { LineupList } from "./lineup-list";
import { MatchH2H } from "./match-h2h";
import { MatchInfo } from "./match-info";
import { MatchTimeline } from "./match-timeline";
import { MatchupHeader } from "./matchup-header";

type MatchDetailDialogProps = {
  match: Match | null;
  onOpenChange: (open: boolean) => void;
};

export function MatchDetailDialog({
  match,
  onOpenChange,
}: MatchDetailDialogProps) {
  const { data, isLoading, error } = useMatchSummary(match?.id ?? null);

  return (
    <Dialog open={Boolean(match)} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] gap-0 overflow-hidden p-0 sm:max-w-2xl">
        {match ? (
          <>
            <DialogHeader className="gap-3 border-b border-border/60 p-5 pr-12 text-left">
              <div className="flex items-center gap-2">
                <span className="eyebrow rounded-full bg-secondary px-2 py-0.5 text-[0.6rem] text-muted-foreground">
                  {ROUND_LABEL[match.round]}
                </span>
              </div>
              <DialogTitle className="sr-only">
                {match.name} — {ROUND_LABEL[match.round]}
              </DialogTitle>
              <MatchupHeader match={match} />
              <DialogDescription className="text-center text-xs sm:text-left">
                {formatMatchDateLong(match.date)}
                {match.venue ? ` · ${match.venue.name}` : ""}
              </DialogDescription>
              {match.status.state !== "post" ? (
                <AddToCalendarButton match={match} />
              ) : null}
            </DialogHeader>

            <div className="max-h-[56vh] overflow-y-auto p-5">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
                  <LoaderCircle className="size-4 animate-spin" />
                  Carregando detalhes…
                </div>
              ) : error ? (
                <div className="flex flex-col items-center gap-2 py-12 text-sm text-muted-foreground">
                  <TriangleAlert className="size-5 text-live" />
                  {error}
                </div>
              ) : data ? (
                <Tabs defaultValue="lineups">
                  <TabsList className="w-full justify-start overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <TabsTrigger value="lineups">Escalações</TabsTrigger>
                    <TabsTrigger value="timeline">Lances</TabsTrigger>
                    <TabsTrigger value="info">Detalhes</TabsTrigger>
                    <TabsTrigger value="h2h">Histórico</TabsTrigger>
                  </TabsList>
                  <TabsContent value="lineups" className="pt-4">
                    <LineupList lineups={data.lineups} />
                  </TabsContent>
                  <TabsContent value="timeline" className="pt-4">
                    <MatchTimeline events={data.timeline} />
                  </TabsContent>
                  <TabsContent value="info" className="pt-4">
                    <MatchInfo info={data.info} />
                  </TabsContent>
                  <TabsContent value="h2h" className="pt-4">
                    <MatchH2H games={data.headToHead} />
                  </TabsContent>
                </Tabs>
              ) : null}
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
