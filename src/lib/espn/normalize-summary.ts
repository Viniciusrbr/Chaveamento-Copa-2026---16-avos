import type {
  H2HGame,
  LineupPlayer,
  MatchInfo,
  MatchOfficial,
  MatchSummary,
  TeamLineup,
  TimelineEvent,
} from "@/lib/espn/summary-model";
import type {
  EspnH2H,
  EspnKeyEvent,
  EspnRoster,
  EspnRosterPlayer,
  EspnSummary,
} from "@/lib/espn/types";

function normalizePlayer(player: EspnRosterPlayer): LineupPlayer {
  return {
    name: player.athlete?.displayName ?? "—",
    jersey: player.jersey,
    position: player.position?.abbreviation,
    formationPlace: player.formationPlace,
    starter: player.starter ?? false,
    subbedIn: player.subbedIn ?? false,
    subbedOut: player.subbedOut ?? false,
  };
}

function normalizeLineup(roster: EspnRoster): TeamLineup {
  const players = (roster.roster ?? []).map(normalizePlayer);
  return {
    homeAway: roster.homeAway,
    teamName: roster.team?.displayName ?? "—",
    formation: roster.formation,
    starters: players.filter((player) => player.starter),
    bench: players.filter((player) => !player.starter),
  };
}

function normalizeTimeline(events: EspnKeyEvent[]): TimelineEvent[] {
  return events.map((event) => ({
    clock: event.clock?.displayValue ?? "",
    type: event.type?.text ?? "",
    text: event.text ?? "",
    team: event.team?.displayName,
    scoringPlay: event.scoringPlay ?? false,
    period: event.period?.number,
  }));
}

function normalizeInfo(summary: EspnSummary): MatchInfo {
  const info = summary.gameInfo;
  const officials: MatchOfficial[] = (info?.officials ?? []).map(
    (official) => ({
      name: official.fullName ?? official.displayName ?? "—",
      role: official.position?.displayName ?? official.position?.name,
    }),
  );
  return {
    venueName: info?.venue?.fullName,
    venueCity: info?.venue?.address?.city,
    venueCountry: info?.venue?.address?.country,
    capacity: info?.venue?.capacity,
    attendance: info?.attendance,
    officials,
  };
}

function normalizeH2H(games: EspnH2H[]): H2HGame[] {
  return games.flatMap((entry) =>
    (entry.events ?? []).map((game) => ({
      date: game.date,
      label: game.shortName,
      homeScore: game.homeTeamScore,
      awayScore: game.awayTeamScore,
    })),
  );
}

export function normalizeSummary(summary: EspnSummary): MatchSummary {
  return {
    lineups: (summary.rosters ?? []).map(normalizeLineup),
    timeline: normalizeTimeline(summary.keyEvents ?? []),
    info: normalizeInfo(summary),
    headToHead: normalizeH2H(summary.headToHeadGames ?? []),
  };
}
