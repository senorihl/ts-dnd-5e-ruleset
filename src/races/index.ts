import { SourceKeys } from "../sources";
import { Languages, Sizes, SourceArray } from "../utils";

export type Feature = {
  name: string;
  limfeaname?: string;
  minlevel: number;
  usages: number;
  dmg: string;
  recovery: string;
  action: [[type: string, _: string]];
  range: string;
  description: string;
  dmgtype: string;
};

export type CurrentCharacter = {
  race: Race;
  level: number;
  hitDice: { total: number };
};

export type Race = {
  name: string;
  sortname?: string;
  description?: string;
  regExpSearch: RegExp;
  plural: string;
  source: SourceArray;
  variants?: Array<Partial<Omit<Race, "variants">>>;
  size: Sizes;
  speed: { walk: { spd: number; enc: number } };
  languageProfs: [...Languages[], number];
  toolProfs?: [[type: string, nb: number]];
  weaponProfs?: [
    simple: boolean,
    martial: boolean,
    custom: ["battleaxe", "handaxe", "warhammer", "light hammer"]
  ];
  vision?: [[type: string, distance: number]];
  age: string;
  height: string;
  weight: string;
  heightMetric: string;
  weightMetric: string;
  scorestxt: string;
  skillstxt?: string;
  savetxt?: Partial<{
    adv_vs: string[];
  }>;
  dmgres?: string[];
  scores:
    | [
        str: number,
        dex: number,
        con: number,
        int: number,
        wis: number,
        cha: number
      ]
    | [[amount: number, nb: number]];
  traits?: { [name: string]: string };
  features?: {
    [name: string]: Feature | ((currentCharacter: CurrentCharacter) => Feature);
  };
  calcChanges?: (currentCharacter: CurrentCharacter) => Partial<{
    hp: [hp: number, reason: string];
  }>;
};

export const races: { [key: string]: Race } = {
  human: {
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
  dragonborn: {
    regExpSearch: /dragonborn/i,
    name: "Dragonborn",
    description:
      "Your draconic heritage manifests in a variety of traits you share with other dragonborn.",
    source: [
      [SourceKeys.SRD, 5],
      [SourceKeys.P, 34],
    ],
    plural: "Dragonborn",
    size: Sizes.Medium,
    speed: {
      walk: { spd: 30, enc: 20 },
    },
    languageProfs: [Languages.Common, Languages.Draconic, 0],
    age: " reach adulthood by 15 and live around 80 years",
    height: ' stand well over 6 feet tall (5\'6" + 2d8")',
    weight: " weigh around 240 lb (175 + 2d8 \xD7 2d6 lb)",
    heightMetric: " stand well over 1,8 metres tall (170 + 5d8 cm)",
    weightMetric: " weigh around 110 kg (80 + 5d8 \xD7 4d6 / 10 kg)",
    scorestxt: "+2 Strength, +1 Charisma",
    scores: [2, 0, 0, 0, 0, 1],
    traits: {
      "Draconic Ancestry":
        "You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type, as shown in the table.",
      "Breath Weapon":
        "You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation.\n" +
        "When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at11th level, and 5d6 at 16th level.\n" +
        "After you use your breath weapon, you can’t use it again until you complete a short or long rest.",
      "Damage Resistance":
        "You have resistance to the damage type associated with your draconic ancestry.",
      Languages:
        "You can speak, read, and write Common and Draconic. Draconic is thought to be one of the oldest languages and is often used in the study of magic. The language sounds harsh to most other creatures and includes numerous hard consonants and sibilants.",
    },
    features: {
      "draconic ancestry": (currentCharacter) => ({
        name: "Draconic Ancestry",
        limfeaname: "Breath Weapon",
        minlevel: 1,
        usages: 1,
        dmg:
          (currentCharacter.level < 6
            ? 2
            : currentCharacter.level < 11
            ? 3
            : currentCharacter.level < 16
            ? 4
            : 5) + "d6",
        recovery: "short rest",
        action: [["action", ""]],
        range: /black|blue|brass|bronze|copper/i.test(
          currentCharacter.race.name
        )
          ? "5-ft \xD7 30-ft line"
          : "15-ft cone",
        description:
          "Hits all in area; Dex save, success - half damage; Usable only once per short rest".replace(
            /(dex|con) save/i,
            (/silver|white|green/i.test(currentCharacter.race.name)
              ? "Con"
              : "Dex") + " save"
          ),
        dmgtype: /black|copper/i.test(currentCharacter.race.name)
          ? "Acid"
          : /blue|bronze/i.test(currentCharacter.race.name)
          ? "Lightning"
          : /brass|gold|red/i.test(currentCharacter.race.name)
          ? "Fire"
          : /green/i.test(currentCharacter.race.name)
          ? "Poison"
          : "Cold",
      }),
    },
    variants: [
      { name: "Black dragonborn" },
      { name: "Blue dragonborn" },
      { name: "Brass dragonborn" },
      { name: "Bronze dragonborn" },
      { name: "Copper dragonborn" },
      { name: "Gold dragonborn" },
      { name: "Green dragonborn" },
      { name: "Red dragonborn" },
      { name: "Silver dragonborn" },
      { name: "White dragonborn" },
    ],
  },
  dwarf: {
    regExpSearch:
      /^((?=.*(neidar|klar))|((?=.*\b(dwarfs?|dwarves|dwarfish|dwarvish|dwarven)\b)(?=.*\b(hill|gold)\b))).*$/i,
    name: "dwarf",
    sortname: "Dwarf",
    source: [
      [SourceKeys.SRD, 3],
      [SourceKeys.P, 20],
    ],
    plural: "Dwarves",
    size: 3,
    speed: {
      walk: { spd: 25, enc: 25 },
    },
    languageProfs: [Languages.Common, Languages.Dwarvish, 0],
    vision: [["Darkvision", 60]],
    scorestxt: "+2 Constitution",
    savetxt: { adv_vs: ["poison"] },
    dmgres: ["Poison"],
    weaponProfs: [
      false,
      false,
      ["battleaxe", "handaxe", "warhammer", "light hammer"],
    ],
    toolProfs: [["Smith, brewer, or mason tools", 1]],
    age: " are considered young until they are 50 and live about 350 years",
    height: ' stand between 4 and 5 feet tall (3\'8" + 2d4")',
    weight: " weigh around 150 lb (115 + 2d4 \xD7 2d6 lb)",
    heightMetric: " stand between 1,2 and 1,5 metres tall (110 + 5d4 cm)",
    weightMetric: " weigh around 70 kg (55 + 5d4 \xD7 4d6 / 10 kg)",
    scores: [0, 0, 2, 0, 0, 0],
    traits: {
      Stonecunning:
        "Whenever I make an Intelligence (History) check related to the origin of stonework, I am considered proficient in the History skill and add double my proficiency bonus to the check, instead of my normal proficiency bonus",
    },
    variants: [
      {
        name: "Hill dwarf",
        sortname: "Dwarf, Hill",
        plural: "Hill dwarves",
        scorestxt: "+2 Constitution, +1 Wisdom",
        scores: [0, 0, 2, 0, 1, 0],
        traits: {
          "Dwarven Toughness":
            "My hit point maximum increases by 1 for every level I have",
        },
        calcChanges: (currentCharacter) => ({
          hp: [
            currentCharacter.level + currentCharacter.hitDice.total,
            "Dwarven Toughness",
          ],
        }),
      },
    ],
  },
};
