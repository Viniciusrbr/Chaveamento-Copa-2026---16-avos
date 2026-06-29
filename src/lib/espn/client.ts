import type { EspnScoreboard, EspnSummary } from "@/lib/espn/types";

const SITE_BASE =
  process.env.ESPN_API_BASE_URL ??
  "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world";

const LANG = process.env.ESPN_API_LANG ?? "pt";
const REGION = process.env.ESPN_API_REGION ?? "br";

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
  params: Record<string, string>,
  revalidateSeconds: number,
): Promise<T> {
  const url = new URL(`${SITE_BASE}${path}`);
  url.searchParams.set("lang", LANG);
  url.searchParams.set("region", REGION);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url, {
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
    "/scoreboard",
    { dates: KNOCKOUT_DATE_RANGE },
    30,
  );
}

export function getSummary(eventId: string): Promise<EspnSummary> {
  return fetchEspn<EspnSummary>("/summary", { event: eventId }, 30);
}
