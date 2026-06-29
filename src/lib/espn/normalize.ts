import {
  type Bracket,
  type Match,
  type MatchStatus,
  ROUND_ORDER,
  type Round,
  type TeamSlot,
  type Venue,
} from "@/lib/espn/model";
import type {
  EspnCompetition,
  EspnCompetitor,
  EspnEvent,
  EspnScoreboard,
} from "@/lib/espn/types";

const KNOCKOUT_SLUGS = new Set<Round>(ROUND_ORDER);

function isKnockoutRound(slug: string | undefined): slug is Round {
  return !!slug && KNOCKOUT_SLUGS.has(slug as Round);
}

function parseScore(score: string | undefined): number | undefined {
  if (score === undefined || score === "") return undefined;
  const value = Number(score);
  return Number.isNaN(value) ? undefined : value;
}

function normalizeStatus(competition: EspnCompetition): MatchStatus {
  const { type } = competition.status;
  const state = type.state;
  const live = state === "in";
  return {
    state,
    label:
      state === "pre" ? "Agendado" : state === "in" ? "Ao vivo" : "Encerrado",
    detail: type.shortDetail ?? type.description ?? "",
    live,
    completed: type.completed ?? state === "post",
    clock: live ? competition.status.displayClock : undefined,
    period: competition.status.period,
  };
}

function normalizeVenue(competition: EspnCompetition): Venue | undefined {
  const venue = competition.venue;
  if (!venue?.fullName) return undefined;
  return {
    name: venue.fullName,
    city: venue.address?.city,
    country: venue.address?.country,
  };
}

function normalizeTeam(competitor: EspnCompetitor): TeamSlot {
  const { team } = competitor;
  const isPlaceholder = team.isActive === false;

  if (isPlaceholder) {
    return {
      kind: "placeholder",
      label: team.displayName ?? "A definir",
      homeAway: competitor.homeAway,
    };
  }

  return {
    kind: "team",
    id: team.id,
    name: team.displayName ?? team.name ?? "—",
    shortName: team.shortDisplayName ?? team.displayName ?? "—",
    abbr: team.abbreviation ?? "—",
    flag: team.logo ?? "",
    color: team.color ? `#${team.color}` : undefined,
    score: parseScore(competitor.score),
    penaltyScore: competitor.shootoutScore,
    winner: competitor.winner ?? false,
    advanced: competitor.advance ?? false,
    homeAway: competitor.homeAway,
    form: competitor.form,
  };
}

function normalizeEvent(event: EspnEvent, order: number): Match | null {
  const round = event.season?.slug;
  if (!isKnockoutRound(round)) return null;

  const competition = event.competitions?.[0];
  if (!competition) return null;

  const home = competition.competitors.find((c) => c.homeAway === "home");
  const away = competition.competitors.find((c) => c.homeAway === "away");
  if (!home || !away) return null;

  return {
    id: event.id,
    round,
    order,
    date: competition.date ?? event.date,
    name: event.name,
    shortName: event.shortName,
    status: normalizeStatus(competition),
    venue: normalizeVenue(competition),
    home: normalizeTeam(home),
    away: normalizeTeam(away),
  };
}

export function normalizeScoreboard(data: EspnScoreboard): Bracket {
  const events = data.events ?? [];

  const grouped = new Map<Round, EspnEvent[]>();
  for (const event of events) {
    const round = event.season?.slug;
    if (!isKnockoutRound(round)) continue;
    const list = grouped.get(round) ?? [];
    list.push(event);
    grouped.set(round, list);
  }

  const byRound = {} as Record<Round, Match[]>;
  const matches: Match[] = [];

  for (const round of ROUND_ORDER) {
    const roundEvents = (grouped.get(round) ?? []).sort(
      (a, b) => Number(a.id) - Number(b.id),
    );
    const roundMatches: Match[] = [];
    roundEvents.forEach((event, index) => {
      const match = normalizeEvent(event, index + 1);
      if (match) {
        roundMatches.push(match);
        matches.push(match);
      }
    });
    byRound[round] = roundMatches;
  }

  return {
    matches,
    byRound,
    updatedAt: new Date().toISOString(),
  };
}
