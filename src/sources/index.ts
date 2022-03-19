export type Source = {
    name: string,
    abbreviation: string,
    abbreviationSpellsheet?: string,
    group: string,
    url: string,
    date: string,
    defaultExcluded?: boolean,
}

export type SourceList = {
    [key: string]: Source;
};

export const sources: SourceList = {
    "LMoP": {
        name: "Lost Mines of Phandelver [items]",
        abbreviation: "LMoP",
        group: "Adventure Books",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/rpg_starterset",
        date: "2014/07/15"
    },
    P: {
        name: "Player's Handbook",
        abbreviation: "PHB",
        abbreviationSpellsheet: "P",
        group: "Primary Sources",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/rpg_playershandbook",
        date: "2014/08/19"
    },
    HotDQ: {
        name: "Hoard of the Dragon Queen [background features, items]",
        abbreviation: "HotDQ",
        group: "Adventure Books",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/hoard-dragon-queen",
        date: "2014/08/19"
    },
    RoT: {
        name: "Rise of Tiamat [items]",
        abbreviation: "RoT",
        group: "Adventure Books",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/rise-tiamat",
        date: "2014/11/04"
    },
    M: {
        name: "Monster Manual",
        abbreviation: "MM",
        group: "Primary Sources",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/monster-manual",
        date: "2014/09/30"
    },
    D: {
        name: "Dungeon Master's Guide",
        abbreviation: "DMG",
        group: "Primary Sources",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/dungeon-masters-guide",
        date: "2014/12/09"
    },
    "PotA": {
        name: "Princes of the Apocalypse [items]",
        abbreviation: "PotA",
        group: "Adventure Books",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/princes-apocalypse",
        date: "2015/04/07"
    },
    "AL:EE": {
        name: "Elemental Evil Backgrounds [Mulmaster]",
        abbreviation: "AL:EE",
        group: "Adventurers League",
        url: "https://dndadventurersleague.org/wp-content/uploads/2015/04/Mulmaster-Bonds-and-Backgrounds.pdf",
        date: "2015/04/15"
    },
    E: {
        name: "Elemental Evil Player's Companion", // November 2017 version
        abbreviation: "EE",
        abbreviationSpellsheet: "EE",
        group: "Primary Sources",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/player%E2%80%99s-companion",
        date: "2015/04/16"
    },
    "AL:RoD": {
        name: "Rage of Demons Backgrounds [Hillsfar]",
        abbreviation: "AL:RoD",
        group: "Adventurers League",
        url: "https://dndadventurersleague.org/wp-content/uploads/2015/07/Hillsfar-Regional-Character-Options.pdf",
        date: "2015/07/14"
    },
    OotA: {
        name: "Out of the Abyss [beasts, background features, items]",
        abbreviation: "OotA",
        group: "Adventure Books",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/outoftheabyss",
        date: "2015/09/15"
    },
    S: {
        name: "Sword Coast Adventure Guide",
        abbreviation: "SCAG",
        group: "Primary Sources",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/sc-adventurers-guide",
        date: "2015/11/03"
    },
    CoS: {
        name: "Curse of Strahd [background, items, pack]",
        abbreviation: "CoS",
        group: "Adventure Books",
        url: "https://media.wizards.com/2016/downloads/DND/CoS_Character_Options.pdf",
        date: "2016/03/15"
    },
    "AL:CoS": {
        name: "Curse of Strahd Backgrounds", // v1.1
        abbreviation: "AL:CoS",
        group: "Adventurers League",
        url: "https://dndadventurersleague.org/wp-content/uploads/2016/06/Curse-of-Strahd-Backgrounds-v1.1.pdf",
        date: "2016/04/07"
    },
    SKT: {
        name: "Storm King's Thunder [beasts, items]",
        abbreviation: "SKT",
        group: "Adventure Books",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/storm-kings-thunder",
        date: "2016/09/06"
    },
    V: {
        name: "Volo's Guide to Monsters",
        abbreviation: "VGtM",
        group: "Primary Sources",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/volos-guide-to-monsters",
        date: "2016/11/15"
    },
    TftYP: {
        name: "Tales from the Yawning Portal [beasts, items]",
        abbreviation: "TftYP",
        group: "Adventure Books",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/tales-yawning-portal",
        date: "2017/04/04"
    },
    TP: {
        name: "Tortle Package",
        abbreviation: "TP",
        group: "Extra Life",
        url: "https://dnd.wizards.com/products/tabletop-games/digital-only-rpg-products/tortle-package",
        date: "2017/09/15",
        defaultExcluded: true
    },
    ToA: {
        name: "Tomb of Annihilation [backgrounds, beasts, items]",
        abbreviation: "ToA",
        group: "Adventure Books",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/tomb-annihilation",
        date: "2017/09/19"
    },
    "OGA": {
        name: "One Grung Above",
        abbreviation: "OGA",
        group: "Extra Life",
        url: "https://www.dmsguild.com/product/223738/",
        date: "2017/10/11",
        defaultExcluded: true
    },
    X: {
        name: "Xanathar's Guide to Everything",
        abbreviation: "XGtE",
        abbreviationSpellsheet: "X",
        group: "Primary Sources",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/xanathars-guide-everything",
        date: "2017/11/21"
    },
    MToF: {
        name: "Mordenkainen's Tome of Foes",
        abbreviation: "MToF",
        group: "Primary Sources",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/mordenkainens-tome-foes",
        date: "2018/05/29"
    },
    "WDH": {
        name: "Waterdeep: Dragon Heist [items]",
        abbreviation: "WDH",
        group: "Adventure Books",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/dragonheist",
        date: "2018/09/18"
    },
    "LLoK": {
        name: "Lost Laboratory of Kwalish [items, spells]",
        abbreviation: "LLoK",
        group: "Extra Life",
        url: "https://www.dmsguild.com/product/258047",
        date: "2018/11/07",
        defaultExcluded: true
    },
    G: {
        name: "Guildmasters' Guide to Ravnica",
        abbreviation: "GGtR",
        group: "Primary Sources",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/guildmasters-guide-ravnica",
        date: "2018/11/20"
    },
    "WDotMM": {
        name: "Waterdeep: Dungeon of the Mad Mage [items]",
        abbreviation: "WDotMM",
        group: "Adventure Books",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/waterdeep-dungeon-mad-mage",
        date: "2018/11/20"
    },
    "GoS": {
        name: "Ghosts of Saltmarsh [backgrounds, beasts, items]",
        abbreviation: "GoS",
        group: "Adventure Books",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/ghosts-saltmarsh",
        date: "2019/05/21"
    },
    "AcqInc": {
        name: "Acquisitions Incorporated",
        abbreviation: "AcqInc",
        abbreviationSpellsheet: "AI",
        group: "Primary Sources",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/acqinc",
        date: "2019/06/18"
    },
    "DnDEK": {
        name: "Dungeons & Dragons Essentials Kit [sidekick classes]",
        abbreviation: "DnDEK",
        group: "Adventure Books",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/essentials-kit",
        date: "2019/09/03",
        defaultExcluded: true
    },
    "DiA": {
        name: "Baldur's Gate: Descent into Avernus [background, items]",
        abbreviation: "DiA",
        group: "Adventure Books",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/baldursgate_descent",
        date: "2019/09/17"
    },
    LR: {
        name: "Locathah Rising",
        abbreviation: "LR",
        group: "Extra Life",
        url: "https://dnd.wizards.com/products/tabletop-games/digital-only-rpg-products/locathah-rising",
        date: "2019/09/19",
        defaultExcluded: true
    },
    "AwM": {
        name: "Adventure with Muk",
        abbreviation: "AwM",
        group: "Extra Life",
        url: "https://dnd.wizards.com/products/tabletop-games/digital-only-rpg-products/adventure-muk",
        date: "2019/11/12",
        defaultExcluded: true
    },
    "E:RLW": {
        name: "Eberron: Rising from the Last War",
        abbreviation: "E:RLW",
        group: "Primary Sources",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/eberron",
        date: "2019/11/19"
    },
    W: {
        name: "Explorer's Guide to Wildemount",
        abbreviation: "EGtW",
        abbreviationSpellsheet: "W",
        group: "Primary Sources",
        url: "https://dnd.wizards.com/products/wildemount",
        date: "2020/03/17"
    },
    MOT: {
        name: "Mythic Odysseys of Theros",
        abbreviation: "MOT",
        group: "Primary Sources",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/mythic-odysseys-theros",
        date: "2020/07/21"
    },
    "RotF": {
        name: "Icewind Dale: Rime of the Frostmaiden [creatures, items, spells]",
        abbreviation: "RotF",
        abbreviationSpellsheet: "RF",
        group: "Adventure Books",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/icewind-dale-rime-frostmaiden",
        date: "2020/09/15"
    },
    T: {
        name: "Tasha's Cauldron of Everything",
        abbreviation: "TCoE",
        abbreviationSpellsheet: "T",
        group: "Primary Sources",
        url: "https://dnd.wizards.com/products/tabletop-games/rpg-products/tashas-cauldron-everything",
        date: "2020/11/17"
    },
    CM: {
        name: "Candlekeep Mysteries",
        abbreviation: "CM",
        group: "Adventure Books",
        url: "https://dnd.wizards.com/products/candlekeep-mysteries",
        date: "2021/03/16"
    },
    VRGtR: {
        name: "Van Richten's Guide to Ravenloft",
        abbreviation: "VRGtR",
        group: "Primary Sources",
        url: "https://dnd.wizards.com/products/van-richtens-guide-ravenloft",
        date: "2021/05/18"
    },
    WBtW: {
        name: "The Wild Beyond the Witchlight",
        abbreviation: "WBtW",
        group: "Adventure Books",
        url: "https://dnd.wizards.com/products/wild-beyond-witchlight",
        date: "2021/09/21"
    },
    FToD: {
        name: "Fizban's Treasury of Dragons",
        abbreviation: "FToD",
        abbreviationSpellsheet: "FD",
        group: "Primary Sources",
        url: "https://dnd.wizards.com/products/treasury-dragons",
        date: "2021/10/19"
    },
    SCC: {
        name: "Strixhaven: A Curriculum of Chaos",
        abbreviation: "SCC",
        abbreviationSpellsheet: "SC",
        group: "Primary Sources",
        url: "https://dnd.wizards.com/products/strixhaven-curriculum-chaos",
        date: "2021/12/07"
    },
    "ALPGs9": {
        name: "AL Player's Guide v9.1: Inglorious Redemption",
        abbreviation: "ALPGs9",
        group: "Adventurers League",
        url: "https://www.dmsguild.com/product/208178",
        date: "2019/09/17"
    }
};

export type SourceKeys = keyof typeof sources;
