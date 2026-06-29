"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LiveStatusBarProps = {
  liveCount: number;
  isRefreshing: boolean;
  error: string | null;
  onRefresh: () => void;
};

export function LiveStatusBar({
  liveCount,
  isRefreshing,
  error,
  onRefresh,
}: LiveStatusBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {liveCount > 0 ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-live/15 px-2.5 py-1 text-xs font-semibold text-live">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-live opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-live" />
          </span>
          {liveCount} ao vivo
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
          Nenhum jogo ao vivo
        </span>
      )}

      {error ? <span className="text-xs text-live">{error}</span> : null}

      <Button
        variant="outline"
        size="sm"
        onClick={onRefresh}
        disabled={isRefreshing}
        className="ml-auto"
      >
        <RefreshCw className={cn("size-3.5", isRefreshing && "animate-spin")} />
        Atualizar
      </Button>
    </div>
  );
}
