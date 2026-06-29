export type LineupPlayer = {
  name: string;
  jersey?: string;
  position?: string;
  formationPlace?: string;
  starter: boolean;
  subbedIn: boolean;
  subbedOut: boolean;
};

export type TeamLineup = {
  homeAway: "home" | "away";
  teamName: string;
  formation?: string;
  starters: LineupPlayer[];
  bench: LineupPlayer[];
};

export type TimelineEvent = {
  clock: string;
  type: string;
  text: string;
  team?: string;
  scoringPlay: boolean;
  period?: number;
};

export type MatchOfficial = {
  name: string;
  role?: string;
};

export type MatchInfo = {
  venueName?: string;
  venueCity?: string;
  venueCountry?: string;
  capacity?: number;
  attendance?: number;
  officials: MatchOfficial[];
};

export type H2HGame = {
  date?: string;
  label?: string;
  homeScore?: string;
  awayScore?: string;
};

export type MatchSummary = {
  lineups: TeamLineup[];
  timeline: TimelineEvent[];
  info: MatchInfo;
  headToHead: H2HGame[];
};
