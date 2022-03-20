import { SourceKeys } from "../sources";
import { Abilities, Languages, Sizes, SourceArray } from "../utils";

export type Race = {
  name: string;
  regExpSearch: RegExp;
  plural: string;
  source: SourceArray;
  variants?: Array<Partial<Omit<Race, "variants">>>;
  size: Sizes;
  speed: { walk: { spd: number; enc: number } };
  languageProfs: [...Languages[], number];
  age: string;
  height: string;
  weight: string;
  heightMetric: string;
  weightMetric: string;
  scorestxt: string;
  skillstxt?: string;
  scores:
    | [
        str: number,
        dex: number,
        con: number,
        wis: number,
        int: number,
        cha: number
      ]
    | [[amount: number, nb: number]];
  traits: { [name: string]: string };
};

export const races: Race[] = [
  {
    name: "Human",
    regExpSearch: /human/i,
    source: [
      [SourceKeys.SRD, 5],
      [SourceKeys.P, 31],
    ],
    plural: "Humans",
    size: Sizes.Medium,
    speed: {
      walk: { spd: 30, enc: 20 },
    },
    languageProfs: [Languages.Common, 1],
    age: " reach adulthood in their late teens and live less than 100 years",
    height: ' range from barely 5 to well over 6 feet tall (4\'8" + 2d10")',
    weight: " weigh around 165 lb (110 + 2d10 \xD7 2d4 lb)",
    heightMetric:
      " range from barely 1,5 to well over 1,8 metres tall (145 + 5d10 cm)",
    weightMetric: " weigh around 75 kg (50 + 5d10 \xD7 4d4 / 10 kg)",
    scorestxt: "+1 to all ability scores",
    scores: [1, 1, 1, 1, 1, 1],
    traits: {},
    variants: [
      {
        regExpSearch: /variant/i,
        source: [[SourceKeys.P, 31]],
        skillstxt: "Choose any one skill",
        scorestxt: "+1 to two different ability scores of my choice",
        scores: [[1, 2]],
        traits: {
          Skills: "I gain proficiency in one skill of my choice",
          Feat: "I gain one feat of my choice",
        },
      },
    ],
  },
];
