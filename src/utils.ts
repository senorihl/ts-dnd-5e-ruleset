import { SourceKeys } from "./sources";

export type SourceArray = Array<[source: SourceKeys, page: number]>;
export enum Sizes {
  Tiny,
  Small,
  Medium,
  Large,
  Huge,
  Gargantuan,
}

export const levels = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export enum Languages {
  "Common" = "Common",
  "Draconic" = "Draconic",
  "Dwarvish" = "Dwarvish",
  "Elvish" = "Elvish",
  "Gnomish" = "Gnomish",
  "Undercommon" = "Undercommon",
  "Halfling" = "Halfling",
}

export enum Abilities {
  STR = "STR",
  DEX = "DEX",
  CON = "CON",
  INT = "INT",
  WIS = "WIS",
  CHA = "CHA",
}

export enum Skills {
  Perception,
}
