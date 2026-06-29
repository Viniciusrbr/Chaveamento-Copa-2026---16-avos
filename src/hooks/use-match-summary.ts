"use client";

import { useEffect, useState } from "react";
import type { MatchSummary } from "@/lib/espn/summary-model";

type SummaryState = {
  data: MatchSummary | null;
  isLoading: boolean;
  error: string | null;
};

export function useMatchSummary(eventId: string | null): SummaryState {
  const [state, setState] = useState<SummaryState>({
    data: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!eventId) {
      setState({ data: null, isLoading: false, error: null });
      return;
    }

    const controller = new AbortController();
    setState({ data: null, isLoading: true, error: null });

    fetch(`/api/summary/${eventId}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok)
          throw new Error("Não foi possível carregar a partida");
        return (await response.json()) as MatchSummary;
      })
      .then((data) => setState({ data, isLoading: false, error: null }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        setState({
          data: null,
          isLoading: false,
          error:
            error instanceof Error ? error.message : "Erro ao carregar partida",
        });
      });

    return () => controller.abort();
  }, [eventId]);

  return state;
}
