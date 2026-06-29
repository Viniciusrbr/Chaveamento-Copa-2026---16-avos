"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Bracket } from "@/lib/espn/model";

const POLL_INTERVAL_MS = 45_000;

type LiveBracketState = {
  bracket: Bracket;
  error: string | null;
  isRefreshing: boolean;
  refresh: () => void;
};

function hasLiveMatch(bracket: Bracket): boolean {
  return bracket.matches.some((match) => match.status.live);
}

export function useLiveBracket(initial: Bracket): LiveBracketState {
  const [bracket, setBracket] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const inFlight = useRef(false);

  const refresh = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setIsRefreshing(true);
    try {
      const response = await fetch("/api/scoreboard", { cache: "no-store" });
      if (!response.ok) throw new Error("Falha ao atualizar o chaveamento");
      const data = (await response.json()) as Bracket;
      setBracket(data);
      setError(null);
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Falha ao atualizar dados",
      );
    } finally {
      inFlight.current = false;
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const live = hasLiveMatch(bracket);
    const interval = live ? POLL_INTERVAL_MS : POLL_INTERVAL_MS * 2;
    const timer = setInterval(refresh, interval);

    function onVisible() {
      if (document.visibilityState === "visible") refresh();
    }
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [bracket, refresh]);

  return { bracket, error, isRefreshing, refresh };
}
