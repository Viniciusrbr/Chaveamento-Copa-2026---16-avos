import type { EspnScoreboard, EspnSummary } from "@/lib/espn/types";

const SITE_BASE =
  process.env.ESPN_API_BASE_URL ??
  "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world";

/** Knockout window for the 2026 World Cup (round of 32 → final). */
export const KNOCKOUT_DATE_RANGE = "20260628-20260719";

class EspnError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "EspnError";
  }
}

async function fetchEspn<T>(
  path: string,
  revalidateSeconds: number,
): Promise<T> {
  const response = await fetch(`${SITE_BASE}${path}`, {
    next: { revalidate: revalidateSeconds },
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new EspnError(
      `ESPN respondeu ${response.status} para ${path}`,
      response.status,
    );
  }

  return (await response.json()) as T;
}

export function getScoreboard(): Promise<EspnScoreboard> {
  return fetchEspn<EspnScoreboard>(
    `/scoreboard?dates=${KNOCKOUT_DATE_RANGE}`,
    30,
  );
}

export function getSummary(eventId: string): Promise<EspnSummary> {
  return fetchEspn<EspnSummary>(`/summary?event=${eventId}`, 30);
}
