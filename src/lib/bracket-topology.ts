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
 * Fixed topology of the FIFA World Cup 2026 knockout stage. The pairings never
 * change during the tournament; only the teams filling each slot do. Matches
 * are addressed by their position within a round (1..N) where position = rank
 * by ascending event id.
 *
 * The order arrays were derived from ESPN's real bracket linkage, NOT from the
 * placeholder text. ESPN labels feeders by local match index (matchNumber - 72
 * for the round of 32), and that index does NOT follow ascending event id, so
 * each label index is translated back to its event-id position before being
 * paired here. Adjacent positions feed the same next-round match.
 *
 * Layout is a classic two-sided bracket converging on a centered final:
 *   left  R32(8) → R16(4) → QF(2) → SF(1)
 *   center                                   FINAL ← SF(1) right
 *   right R32(8) ← R16(4) ← QF(2) ← SF(1)
 */
export const LEFT_COLUMNS: BracketColumn[] = [
  { round: "round-of-32", side: "left", order: [1, 3, 4, 7, 11, 12, 9, 8] },
  { round: "round-of-16", side: "left", order: [1, 2, 5, 6] },
  { round: "quarterfinals", side: "left", order: [1, 2] },
  { round: "semifinals", side: "left", order: [1] },
];

export const RIGHT_COLUMNS: BracketColumn[] = [
  { round: "semifinals", side: "right", order: [2] },
  { round: "quarterfinals", side: "right", order: [3, 4] },
  { round: "round-of-16", side: "right", order: [3, 4, 7, 8] },
  { round: "round-of-32", side: "right", order: [2, 5, 6, 10, 13, 16, 15, 14] },
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
