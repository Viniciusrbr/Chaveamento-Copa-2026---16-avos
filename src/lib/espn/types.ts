export type EspnTeam = {
  id: string;
  abbreviation?: string;
  displayName?: string;
  shortDisplayName?: string;
  name?: string;
  location?: string;
  color?: string;
  alternateColor?: string;
  isActive?: boolean;
  logo?: string;
};

export type EspnCompetitor = {
  id: string;
  homeAway: "home" | "away";
  winner?: boolean;
  advance?: boolean;
  form?: string;
  score?: string;
  shootoutScore?: number;
  team: EspnTeam;
};

export type EspnStatusType = {
  state: "pre" | "in" | "post";
  completed?: boolean;
  description?: string;
  detail?: string;
  shortDetail?: string;
};

export type EspnStatus = {
  clock?: number;
  displayClock?: string;
  period?: number;
  type: EspnStatusType;
};

export type EspnVenue = {
  fullName?: string;
  address?: {
    city?: string;
    country?: string;
  };
};

export type EspnCompetition = {
  id: string;
  date: string;
  attendance?: number;
  status: EspnStatus;
  venue?: EspnVenue;
  competitors: EspnCompetitor[];
};

export type EspnSeason = {
  year?: number;
  slug?: string;
};

export type EspnEvent = {
  id: string;
  date: string;
  name: string;
  shortName: string;
  season: EspnSeason;
  status: EspnStatus;
  competitions: EspnCompetition[];
};

export type EspnScoreboard = {
  events?: EspnEvent[];
};

export type EspnAthlete = {
  id?: string;
  displayName?: string;
  shortName?: string;
  jersey?: string;
};

export type EspnRosterPlayer = {
  active?: boolean;
  starter?: boolean;
  jersey?: string;
  formationPlace?: string;
  subbedIn?: boolean;
  subbedOut?: boolean;
  athlete?: EspnAthlete;
  position?: { abbreviation?: string; name?: string };
};

export type EspnRoster = {
  homeAway: "home" | "away";
  winner?: boolean;
  formation?: string;
  team: EspnTeam;
  roster: EspnRosterPlayer[];
};

export type EspnKeyEvent = {
  id?: string;
  type?: { id?: string; text?: string };
  text?: string;
  period?: { number?: number };
  clock?: { displayValue?: string };
  scoringPlay?: boolean;
  team?: { id?: string; displayName?: string };
};

export type EspnOfficial = {
  fullName?: string;
  displayName?: string;
  position?: { name?: string; displayName?: string };
};

export type EspnGameInfo = {
  venue?: EspnVenue & { capacity?: number };
  attendance?: number;
  officials?: EspnOfficial[];
};

export type EspnH2HEvent = {
  date?: string;
  shortName?: string;
  homeTeamScore?: string;
  awayTeamScore?: string;
};

export type EspnH2H = {
  team?: EspnTeam;
  events?: EspnH2HEvent[];
};

export type EspnSummary = {
  rosters?: EspnRoster[];
  keyEvents?: EspnKeyEvent[];
  gameInfo?: EspnGameInfo;
  headToHeadGames?: EspnH2H[];
  header?: unknown;
};
