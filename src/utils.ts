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

export enum Languages {
  "Common" = "Common",
}

export enum Abilities {
  STR = "STR",
  DEX = "DEX",
  CON = "CON",
  WIS = "WIS",
  INT = "INT",
  CHA = "CHA",
}
