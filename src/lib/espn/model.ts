export type Round =
  | "round-of-32"
  | "round-of-16"
  | "quarterfinals"
  | "semifinals"
  | "3rd-place-match"
  | "final";

export const ROUND_ORDER: Round[] = [
  "round-of-32",
  "round-of-16",
  "quarterfinals",
  "semifinals",
  "3rd-place-match",
  "final",
];

export const ROUND_LABEL: Record<Round, string> = {
  "round-of-32": "16-avos",
  "round-of-16": "Oitavas",
  quarterfinals: "Quartas",
  semifinals: "Semifinais",
  "3rd-place-match": "Disputa de 3º",
  final: "Final",
};

export const ROUND_SIZE: Record<Round, number> = {
  "round-of-32": 16,
  "round-of-16": 8,
  quarterfinals: 4,
  semifinals: 2,
  "3rd-place-match": 1,
  final: 1,
};

export type MatchState = "pre" | "in" | "post";

export type MatchStatus = {
  state: MatchState;
  label: string;
  detail: string;
  live: boolean;
  completed: boolean;
  clock?: string;
  period?: number;
};

export type Venue = {
  name: string;
  city?: string;
  country?: string;
};

export type TeamSlot =
  | {
      kind: "team";
      id: string;
      name: string;
      shortName: string;
      abbr: string;
      flag: string;
      color?: string;
      score?: number;
      penaltyScore?: number;
      winner: boolean;
      advanced: boolean;
      homeAway: "home" | "away";
      form?: string;
    }
  | {
      kind: "placeholder";
      label: string;
      homeAway: "home" | "away";
    };

export type Match = {
  id: string;
  round: Round;
  /** 1-based position within its round, ordered by ascending event id. */
  order: number;
  date: string;
  name: string;
  shortName: string;
  status: MatchStatus;
  venue?: Venue;
  home: TeamSlot;
  away: TeamSlot;
};

export type Bracket = {
  matches: Match[];
  byRound: Record<Round, Match[]>;
  updatedAt: string;
};
