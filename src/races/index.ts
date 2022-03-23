import { SourceKeys } from "../sources";
import { Spell } from "../spells";
import { Languages, Sizes, SourceArray, Skills, Abilities } from "../utils";

export type Feature = {
  name: string;
  limfeaname?: string;
  minlevel: number;
  usages: number;
  dmg?: string;
  recovery?: string;
  action?: [[type: string, _: string]];
  range?: string;
  description?: string;
  dmgtype?: string;
  spellcastingBonus?:
    | {
        name: string;
        class: string;
        level: number;
        addon_text?: string;
      }
    | {
        name: string;
        spells: string[];
        addon_text?: string;
      };
  spellChanges?: { [spell: string]: Partial<Spell> & { changes: string } };
};

export type CurrentCharacter = {
  race: Race;
  level: number;
  hitDice: { total: number };
};

export type SpellCasterRace = {
  spellcastingAbility?: Abilities;
  spellcastingBonus?:
    | {
        name: string;
        class: string;
        level: number;
        addon_text?: string;
      }
    | {
        name: string;
        spells: string[];
        addon_text?: string;
      };
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
  toolProfs?: Array<string | [type: string, nb: number]>;
  armorProfs?: [
    light: boolean,
    medium: boolean,
    heavy: boolean,
    shields: boolean
  ];
  skills?: Skills[];
  weaponProfs?: [simple: boolean, martial: boolean, custom: string[]];
  vision?: Array<[type: string, distance: number]>;
  age: string;
  height: string;
  weight: string;
  heightMetric: string;
  weightMetric: string;
  scorestxt: string;
  skillstxt?: string;
  savetxt?: Partial<{
    adv_vs: string[];
    text: string[];
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
} & SpellCasterRace;

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
    name: "Dwarf",
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
      {
        regExpSearch:
          /^((?=.*(hylar|daewar))|((?=.*\b(dwarfs?|dwarves|dwarfish|dwarvish|dwarven)\b)(?=.*\b(mountain|shield)\b))).*$/i,
        name: "Mountain dwarf",
        sortname: "Dwarf, Mountain",
        source: [[SourceKeys.P, 20]],
        plural: "Mountain dwarves",
        armorProfs: [true, true, false, false],
        scorestxt: "+2 Constitution, +2 Strength",
        scores: [2, 0, 2, 0, 0, 0],
      },
    ],
  },
  elf: {
    regExpSearch:
      /^(?!.*half)((?=.*(silvanesti|qualinesti))|((?=.*\b(elfs?|elves|elvish|elven)\b)(?=.*\b(high|sun|moon|grey|gray|valleys?|silvers?)\b))).*$/i,
    name: "Elf",
    sortname: "Elf",
    source: [
      [SourceKeys.SRD, 4],
      [SourceKeys.P, 23],
    ],
    plural: "Elves",
    size: 3,
    speed: {
      walk: { spd: 30, enc: 20 },
    },
    languageProfs: [Languages.Common, Languages.Elvish, 0],
    vision: [["Darkvision", 60]],
    scorestxt: "+2 Dexterity",
    savetxt: {
      text: ["Magic can't put me to sleep"],
      adv_vs: ["charmed"],
    },
    weaponProfs: [false, false, []],
    skills: [Skills.Perception],
    age: " typically claim adulthood around age 100 and can live to be 750 years old",
    height: ' range from under 5 to over 6 feet tall (4\'6" + 2d10")',
    weight: " weigh around 115 lb (90 + 2d10 \xD7 1d4 lb)",
    heightMetric:
      " range from under 1,5 to over 1,8 metres tall (140 + 5d10 cm)",
    weightMetric: " weigh around 55 kg (40 + 5d10 \xD7 2d4 / 10 kg)",
    scores: [0, 2, 0, 0, 0, 0],
    traits: {
      "Keen Senses": "You have proficiency in the Perception skill",
      "Fey Ancestry":
        "You have advantage on saving throws against being charmed, and magic can’t put you to sleep",
      Trance:
        "Elves don’t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is “trance.”) While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.",
      Languages:
        "You can speak, read, and write Common and Elvish. Elvish is fluid, with subtle intonations and intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races. Many bards learn their language so they can add Elvish ballads to their repertoires.",
    },
    variants: [
      {
        regExpSearch:
          /^(?!.*half)((?=.*(silvanesti|qualinesti))|((?=.*\b(elfs?|elves|elvish|elven)\b)(?=.*\b(high|sun|moon|grey|gray|valleys?|silvers?)\b))).*$/i,
        name: "High elf",
        plural: "High elves",
        sortname: "Elf, High",
        scorestxt: "+2 Dexterity, +1 Intelligence",
        weaponProfs: [
          false,
          false,
          ["longsword", "shortsword", "longbow", "shortbow"],
        ],
        scores: [0, 2, 0, 1, 0, 0],
        languageProfs: [Languages.Common, Languages.Elvish, 1],
        traits: {
          "Elf Weapon Training":
            "You have proficiency with the longsword, shortsword, shortbow, and longbow",
          Cantrip:
            "You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it",
          "Extra Language":
            "You can speak, read, and write one extra language of your choice",
        },
        spellcastingAbility: Abilities.INT,
        spellcastingBonus: {
          name: "High Elf Cantrip",
          class: "wizard",
          level: 0,
          addon_text: "At will",
        },
      },
      {
        regExpSearch:
          /^(?!.*half)((?=.*drow)|((?=.*\b(elfs?|elves|elvish|elven)\b)(?=.*\b(dark|underdarks?|deep|depths?)\b))).*$/i,
        name: "Drow",
        sortname: "Elf, Dark (Drow)",
        source: [[SourceKeys.P, 24]],
        plural: "Drow",
        scorestxt: "+2 Dexterity, +1 Charisma",
        vision: [
          ["Darkvision", 60],
          ["Sunlight Sensitivity", 0],
        ],
        weaponProfs: [false, false, ["rapier", "shortsword", "hand crossbow"]],
        scores: [0, 2, 0, 0, 0, 1],
        languageProfs: [Languages.Common, Languages.Elvish, 0],
        traits: {
          "Sunlight Sensitivity":
            "Disadvantage on attack rolls and Wisdom (Perception) checks that rely on sight when I or what I am trying to attack/perceive is in direct sunlight",
          "Drow Magic":
            "1st level: Dancing Lights cantrip; 3rd level: Faerie Fire; 5th level: Darkness. Both spells can be used once per long rest. Charisma is my spellcasting ability for these.", // errata to specify once per day is long rest
        },
        spellcastingAbility: Abilities.CHA,
        features: {
          "dancing lights": {
            name: "Drow Magic (level 1)",
            limfeaname: "Dancing Lights",
            minlevel: 1,
            usages: -1,
            spellcastingBonus: {
              name: "Drow Magic",
              spells: ["dancing lights"],
              addon_text: "At will",
            },
          },
          "faerie fire": {
            name: "Drow Magic (level 3)",
            limfeaname: "Faerie Fire",
            minlevel: 3,
            usages: 1,
            recovery: "long rest",
            spellcastingBonus: {
              name: "Drow Magic (level 3)",
              spells: ["faerie fire"],
              addon_text: "Once per long rest",
            },
          },
          darkness: {
            name: "Drow Magic (level 5)",
            limfeaname: "Darkness",
            minlevel: 5,
            usages: 1,
            recovery: "long rest",
            spellcastingBonus: {
              name: "Drow Magic (level 5)",
              spells: ["darkness"],
              addon_text: "Once per long rest",
            },
          },
        },
      },
      {
        regExpSearch:
          /^(?!.*half)((?=.*(grugach|kagonesti|silhana))|((?=.*\b(elfs?|elves|elvish|elven)\b)(?=.*\b(woodlands?|woods?|forests?|wilds?|green)\b))).*$/i,
        name: "Wood elf",
        sortname: "Elf, Wood",
        source: [[SourceKeys.P, 24]],
        plural: "Wood elves",
        scorestxt: "+2 Dexterity, +1 Wisdom",
        weaponProfs: [
          false,
          false,
          ["longsword", "shortsword", "longbow", "shortbow"],
        ],
        scores: [0, 2, 0, 0, 1, 0],
        traits: {
          "Mask of the Wild":
            "I can attempt to hide even when I am only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.",
        },
      },
    ],
  },
  gnome: {
    regExpSearch: /^((?=.*\bgnomes?\b)(?=.*\b(rocks?|tinker|tinkering)\b)).*$/i,
    name: "Gnome",
    sortname: "Gnome, Rock",
    source: [
      [SourceKeys.SRD, 6],
      [SourceKeys.P, 37],
    ],
    plural: "Gnomes",
    size: 4,
    speed: {
      walk: { spd: 25, enc: 15 },
    },
    languageProfs: [Languages.Common, Languages.Gnomish, 0],
    toolProfs: ["Tinker's tools"],
    vision: [["Darkvision", 60]],
    savetxt: { text: ["Adv. on Int/Wis/Cha saves vs. magic"] },
    age: " start adult life around age 40 and can live 350 to almost 500 years",
    height: ' are 3 to 4 feet tall (2\'11" + 2d4")',
    weight: " weigh around 40 lb (35 + 2d4 lb)",
    heightMetric: " are 90 to 120 cm tall (2'11\" + 5d4)",
    weightMetric: " weigh around 18 kg (16 + 5d4 / 10 kg)",
    scorestxt: "+2 Intelligence",
    scores: [0, 0, 0, 2, 0, 0],
    traits: {
      "Gnome Cunning":
        "You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic",
      Languages:
        "You can speak, read, and write Common and Gnomish. The Gnomish language, which uses the Dwarvish script, is renowned for its technical treatises and its catalogs of knowledge about the natural world.",
    },
    variants: [
      {
        name: "Rock gnome",
        sortname: "Gnome, Rock",
        plural: "Rock gnomes",
        scores: [0, 0, 1, 2, 0, 0],
        scorestxt: "+2 Intelligence, +1 Constitution",
        traits: {
          "Artificer’s Lore":
            "Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply",
          Tinker: `Construct a Tiny clockwork device (AC 5, 1 HP) using tinker's tools, 1 hour, and 10 gp of material components, that functions for 24 hours. I can have up to 3 active.
Clockwork Toy: This toy is a clockwork animal, monster, or person, such as a frog, mouse, bird, dragon, or soldier. When placed on the ground, the toy moves 5 feet across the ground on each of your turns in a random direction. It makes noises as appropriate to the creature it represents.
Fire Starter: The device produces a miniature flame, which you can use to light a candle, torch, or campfire. Using the device requires your action.
Music Box: When opened, this music box plays a single song at a moderate volume. The box stops playing when it reaches the song’s end or when it is closed.`,
        },
      },
      {
        regExpSearch:
          /^((?=.*\bgnomes?\b)(?=.*\b(woods?|forests?|wilds?|green)\b)).*$/i,
        name: "Forest gnome",
        sortname: "Gnome, Forest",
        source: [[SourceKeys.P, 37]],
        plural: "Forest gnomes",
        scores: [0, 1, 0, 2, 0, 0],
        scorestxt: "+2 Intelligence, +1 Dexterity",
        traits: {
          "Natural Illusionist":
            "I know the Minor Illusion cantrip. Intelligence is my spellcasting ability for it",
          "Speak with Small Beasts":
            "Through sounds and gestures, I can communicate simple ideas with Small or smaller beasts",
        },
        spellcastingAbility: Abilities.INT,
        spellcastingBonus: {
          name: "Natural Illusionist",
          spells: ["minor illusion"],
          addon_text: "At will",
        },
      },
      {
        regExpSearch:
          /^((?=.*svirfneblin)|((?=.*\bgnomes?\b)(?=.*\b(underdarks?|deep|depths?)\b))).*$/i,
        name: "Svirfneblin",
        sortname: "Gnome, Deep (Svirfneblin)",
        source: [
          [SourceKeys.E, 7],
          [SourceKeys.S, 115],
          [SourceKeys.MToF, 113],
        ],
        plural: "Svirfneblin",
        languageProfs: [
          Languages.Common,
          Languages.Gnomish,
          Languages.Undercommon,
          0,
        ],
        vision: [["Darkvision", 120]],
        savetxt: { text: ["Adv. on Int/Wis/Cha saves vs. magic"] },
        scores: [0, 1, 0, 2, 0, 0],
        scorestxt: "+2 Intelligence, +1 Dexterity",
        traits: {
          "Stone Camouflage":
            "I have advantage on Dexterity (stealth) checks to hide in rocky terrain.",
        },
      },
    ],
  },
  halfling: {
    regExpSearch:
      /^((?=.*(hairfoot|tallfellow))|((?=.*\b(halflings?|hobbits?)\b)(?=.*lightfoot))).*$/i,
    name: "Halfling",
    sortname: "Halfling",
    source: [
      [SourceKeys.SRD, 4],
      [SourceKeys.P, 28],
    ],
    plural: "Halflings",
    size: 4,
    speed: {
      walk: { spd: 25, enc: 15 },
    },
    languageProfs: [Languages.Common, Languages.Halfling, 0],
    savetxt: { adv_vs: ["frightened"] },
    age: " reach adulthood at age 20 and live around 150 years",
    height: ' average about 3 feet tall (2\'7" + 2d4")',
    weight: " weigh around 40 lb (35 + 2d4 lb)",
    heightMetric: " average about 90 cm tall (80 + 5d4)",
    weightMetric: " weigh around 18 kg (16 + 5d4 / 10 kg)",
    scores: [0, 2, 0, 0, 0, 0],
    scorestxt: "+2 Dexterity",
    traits: {
      Lucky:
        "When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll",
      Brave: "You have advantage on saving throws against being frightened",
      "Halfling Nimbleness":
        "You can move through the space of any creature that is of a size larger than yours",
      Languages:
        "You can speak, read, and write Common and Halfling. The Halfling language isn’t secret, but halflings are loath to share it with others. They write very little, so they don’t have a rich body of literature. Their oral tradition, however, is very strong. Almost all halflings speak Common to converse with the people in whose lands they dwell or through which they are traveling",
    },
    variants: [
      {
        regExpSearch:
          /^((?=.*(hairfoot|tallfellow))|((?=.*\b(halflings?|hobbits?)\b)(?=.*lightfoot))).*$/i,
        name: "Lightfoot halfling",
        sortname: "Halfling, Lightfoot",
        source: [
          [SourceKeys.SRD, 4],
          [SourceKeys.P, 28],
        ],
        plural: "Lightfoot halflings",
        scores: [0, 2, 0, 0, 0, 1],
        scorestxt: "+2 Dexterity, +1 Charisma",
        traits: {
          "Naturally Stealthy":
            "I can attempt to hide even when I am obscured only by a creature that is at least one size larger than me.",
        },
      },
      {
        regExpSearch: /^(?=.*\b(halflings?|hobbits?)\b)(?=.*stout).*$/i,
        name: "Stout halfling",
        sortname: "Halfling, Stout",
        source: [[SourceKeys.P, 28]],
        plural: "Stout halflings",
        size: 4,
        speed: {
          walk: { spd: 25, enc: 15 },
        },
        savetxt: { adv_vs: ["frightened", "poison"] },
        dmgres: ["Poison"],
        age: " reach adulthood at age 20 and live around 150 years",
        height: ' average about 3 feet tall (2\'7" + 2d4")',
        weight: " weigh around 40 lb (35 + 2d4 lb)",
        heightMetric: " average about 90 cm tall (80 + 5d4)",
        weightMetric: " weigh around 18 kg (16 + 5d4 / 10 kg)",
        scores: [0, 2, 1, 0, 0, 0],
        scorestxt: "+2 Dexterity, +1 Constitution",
      },
      {
        regExpSearch: /^(?=.*\b(halflings?|hobbits?)\b)(?=.*ghostwise).*$/i,
        name: "Ghostwise halfling",
        sortname: "Halfling, Ghostwise",
        plural: "Ghostwise halflings",
        source: [[SourceKeys.S, 110]],
        size: 4,
        speed: {
          walk: { spd: 25, enc: 15 },
        },
        scores: [0, 2, 0, 0, 1, 0],
        scorestxt: "+2 Dexterity, +1 Wisdom",
        traits: {
          "Silent Speech":
            "I can speak telepathically to any one creature within 30 feet of me. It only understands me if we share a language",
        },
      },
      {
        regExpSearch: /^(?=.*\b(halflings?|hobbits?)\b)(?=.*lotusden).*$/i,
        name: "Lotusden Halfling",
        sortname: "Halfling, Lotusden",
        source: [[SourceKeys.W, 164]],
        plural: "Lotusden Halflings",
        size: 4,
        speed: {
          walk: { spd: 25, enc: 15 },
        },
        scores: [0, 2, 0, 0, 1, 0],
        scorestxt: "+2 Dexterity, +1 Wisdom",
        traits: {
          "Child of the Wood":
            "I know the Druidcraft cantrip. At 3rd level, I can cast Entangle once per long rest. At 5th level, I can cast Spike Growth once per long rest without a material component. Wisdom is my spellcasting ability for these.",
          Timberwalk:
            "Checks to track me have disadv. I need not expend extra movement to move over difficult terrain of nonmagical plants.",
        },

        spellcastingAbility: Abilities.WIS,
        spellcastingBonus: {
          name: "Child of the Wood (level 1)",
          spells: ["druidcraft"],
          addon_text: "At will",
        },
        features: {
          entangle: {
            name: "Child of the Wood (level 3)",
            limfeaname: "Entangle",
            minlevel: 3,
            usages: 1,
            recovery: "long rest",
            spellcastingBonus: {
              name: "Child of the Wood (level 3)",
              spells: ["entangle"],
              addon_text: "once per long rest",
            },
          },
          "spike growth": {
            name: "Child of the Wood (level 5)",
            limfeaname: "Spike Growth",
            minlevel: 5,
            usages: 1,
            recovery: "long rest",
            spellcastingBonus: {
              name: "Child of the Wood (level 5)",
              spells: ["spike growth"],
              addon_text: "once per long rest",
            },
            spellChanges: {
              "spike growth": {
                components: "V,S",
                compMaterial: "",
                changes:
                  "Using Child of the Wood, I can cast Spike Growth once per long rest without requiring a material component.",
              },
            },
          },
        },
      },
    ],
  },
};
