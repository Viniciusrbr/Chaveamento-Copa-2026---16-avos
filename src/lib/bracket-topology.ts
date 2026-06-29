import type { Round } from "@/lib/espn/model";

export type BracketSide = "left" | "right";

export type BracketColumn = {
  round: Round;
  side: BracketSide | "center";
  /**
   * Match positions (1-based, ordered by ascending ESPN event id within the
   * round) listed top-to-bottom. Positions are grouped as adjacent pairs so
   * the connector between two ties always sits between two neighbouring cards.
   */
  order: number[];
};

/**
 * Fixed topology of the FIFA World Cup 2026 knockout stage. The pairings below
 * are taken from the official bracket (captured from ESPN's placeholder labels,
 * e.g. "Round of 32 3 Winner") and never change during the tournament; only the
 * teams filling each slot do. Matches are addressed by their position within a
 * round (1..N) where position = rank by ascending event id.
 *
 * Layout is a classic two-sided bracket converging on a centered final:
 *   left  R32(8) → R16(4) → QF(2) → SF(1)
 *   center                                   FINAL ← SF(1) right
 *   right R32(8) ← R16(4) ← QF(2) ← SF(1)
 */
export const LEFT_COLUMNS: BracketColumn[] = [
  { round: "round-of-32", side: "left", order: [1, 3, 2, 5, 11, 12, 9, 10] },
  { round: "round-of-16", side: "left", order: [1, 2, 5, 6] },
  { round: "quarterfinals", side: "left", order: [1, 2] },
  { round: "semifinals", side: "left", order: [1] },
];

export const RIGHT_COLUMNS: BracketColumn[] = [
  { round: "semifinals", side: "right", order: [2] },
  { round: "quarterfinals", side: "right", order: [3, 4] },
  { round: "round-of-16", side: "right", order: [3, 4, 7, 8] },
  { round: "round-of-32", side: "right", order: [4, 6, 7, 8, 13, 15, 14, 16] },
];

export const CENTER_FINAL: BracketColumn = {
  round: "final",
  side: "center",
  order: [1],
};

export const THIRD_PLACE: BracketColumn = {
  round: "3rd-place-match",
  side: "center",
  order: [1],
};
