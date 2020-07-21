var frames;
var start = 1; // starting frame
var statischFana = true;
var statischFrost = true;
var statischIAS = true;
var mIAS = 1; // IAS drop down interval
var statischWaffe = true;
var statischZweitwaffe = true;
var fenster = true; // window
var WSMprimaer;
var WSMsekundaer;
var IASprimaer;
var IASsekundaer;
var EIASprimaer;
var EIASsekundaer;
var SIAS;
var rollback1;
var rollback2;
var rollback3;
var rollback4;
var rollback5;
var rollbackframe;
var tempSkill; // store selected skill when rebuilding skill options
var tempWaffe;
var tempZweitwaffe;
var tempForm;
var tempBarbschwert;
var isMaxIas = true; // true if further ias is useless
var cap = 1;
var breakpoints = new Array();
var breakpoints1 = new Array();
var breakpoints2 = new Array();
var breakpointsAPS = new Array();

var startframe = [1, 0, 2, 2, 2, 2, 2, 0, 0];
// first level is weapon type number
// second level is char value, or [11] for the description
// third level: first value is "FramesPerDirection" (shape shifted frames? Zeal rollback3), second value is "frames" (full animation frames?)
var waffengattung = [
    [
        [13, 13],
        [11, 12],
        [12, 12],
        [16, 16],
        [15, 15],
        [14, 14],
        [16, 16], 
        [15, 15], 
        [16, 16], 
        [16, 16], 
        [15, 15], 
        "unarmed"
    ],
    [
        [0, 0],
        [11, 12],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0], 0, 0, 0, 0, "claw"
    ],
    [
        [16, 16],
        [15, 15],
        [16, 16],
        [19, 19],
        [19, 19],
        [15, 15],
        [20, 20], 0, 0, [16, 16], [15, 15], "one-handed swinging weapon"
    ],
    [
        [20, 20],
        [23, 23],
        [18, 18],
        [21, 21],
        [23, 23],
        [18, 19],
        [24, 24], 0, 0, [16, 16], 0, "two-handed sword"
    ],
    [
        [15, 15],
        [15, 15],
        [16, 16],
        [19, 19],
        [19, 19],
        [17, 17],
        [19, 19], 0, [16, 16], 0, 0, "one-handed thrusting weapon"
    ],
    [
        [18, 18],
        [23, 23],
        [19, 19],
        [23, 23],
        [24, 24],
        [20, 20],
        [23, 23], 0, [16, 16], 0, 0, "spear"
    ],
    [
        [20, 20],
        [19, 19],
        [19, 19],
        [17, 17],
        [20, 20],
        [18, 18],
        [18, 18], 0, [16, 16], 0, 0, "two-handed weapon"
    ],
    [
        [14, 14],
        [16, 16],
        [15, 15],
        [16, 16],
        [18, 18],
        [16, 16],
        [17, 17],
        [15, 15], 0, 0, 0, "bow"
    ],
    [
        [20, 20],
        [21, 21],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20], [15, 15], 0, 0, 0, "crossbow"
    ],
    [16, 16, 16, 18, 20, 16, 20] // Throw
];

// used by zeal, strafe, and fend
// first level is the weapon type
// second level is the character class
var aktionsframe = [
    [ 8,  6,  6,  8,  8,  7,  9],
    [ 0,  6,  0,  0,  0,  0,  0], // claws
    [10,  7,  7,  9,  9,  7, 12],
    [12, 11,  8, 10, 11,  8, 14],
    [ 9,  7,  7,  8,  9,  8, 11],
    [11, 10,  9,  9, 10,  8, 13],
    [12,  9,  9,  9, 11,  9, 11],
    [ 6,  7,  7,  8,  9,  8,  9],
    [ 9, 10, 10, 10, 11, 10, 11]
];

var sequences = [
    [0, 0, 0, 0, 21, 24, 0, 0, 0],
    [0, 0, 0, 0, 18, 21, 0, 0, 0],
    [12, 12, 16, 0, 0, 0, 0, 0, 0],
    [0, 0, 17, 17, 17, 0, 0, 0, 0],
    [0, 0, 12, 0, 12, 0, 0, 0, 0]
];

const weaponTypes = Object.freeze({
    unarmed: 0,
    claw: 1,
    oneHandedSwingingWeapon: 2,
    twoHandedSword: 3,
    oneHandedThrustingWeapon: 4,
    spear: 5,
    twoHandedWeapon: 6,
    bow: 7,
    crossbow: 8,
});

const weaponCategories = Object.freeze({
    other: 0,
    bowOrXbow: 1,
    spearOrJavalin: 2,
    throwing: 3,
    polearm: 8,
    swords: 9,
});

// name, speed (wsm), weapon type, class item (-1 for all, or class number), weapon class, passion zeal
var lookupWeapon = [
    ["[unarmed]",            0, 0, -1, 0, 0],
    ["Ancient Axe",         10, 6, -1, 0, 1],
    ["Ancient Sword",        0, 2, -1, 9, 0],
    ["Arbalest",           -10, 8, -1, 1, 0],
    ["Archon Staff",        10, 6, -1, 0, 1],
    ["Ashwood Bow",          0, 7,  0, 1, 0],
    ["Ataghan",            -20, 2, -1, 9, 0],
    ["Axe",                 10, 2, -1, 0, 1],
    ["Balanced Axe",       -10, 2, -1, 3, 0],
    ["Balanced Knife",     -20, 4, -1, 3, 0],
    ["Ballista",            10, 8, -1, 1, 0],
    ["Balrog Blade",         0, 3, -1, 9, 1],
    ["Balrog Spear",        10, 4, -1, 2, 0],
    ["Barbed Club",          0, 2, -1, 0, 0],
    ["Bardiche",            10, 6, -1, 8, 0],
    ["Bastard Sword",       10, 3, -1, 9, 1],
    ["Battle Axe",          10, 6, -1, 0, 1],
    ["Battle Cestus",      -10, 1,  1, 0, 0],
    ["Battle Dart",          0, 4, -1, 3, 0],
    ["Battle Hammer",       20, 2, -1, 0, 1],
    ["Battle Scythe",      -10, 6, -1, 8, 1],
    ["Battle Staff",         0, 6, -1, 0, 1],
    ["Battle Sword",         0, 2, -1, 9, 1],
    ["Bearded Axe",          0, 6, -1, 0, 1],
    ["Bec-de-Corbin",        0, 6, -1, 8, 1],
    ["Berserker Axe",        0, 2, -1, 0, 1],
    ["Bill",                 0, 6, -1, 8, 1],
    ["Blade Bow",          -10, 7, -1, 1, 0],
    ["Blade Talons",       -20, 1,  1, 0, 0],
    ["Blade",              -10, 4, -1, 0, 0],
    ["Bone Knife",         -20, 4, -1, 0, 0],
    ["Bone Wand",          -20, 2, -1, 0, 0],
    ["Brandistock",        -20, 5, -1, 8, 1],
    ["Broad Axe",            0, 6, -1, 0, 1],
    ["Broad Sword",          0, 2, -1, 9, 1],
    ["Burnt Wand",           0, 2, -1, 0, 0],
    ["Caduceus",           -10, 2, -1, 0, 1],
    ["Cedar Bow",            0, 7, -1, 1, 0],
    ["Cedar Staff",         10, 6, -1, 0, 1],
    ["Ceremonial Bow",      10, 7,  0, 1, 0],
    ["Ceremonial Javelin", -10, 4,  0, 2, 0],
    ["Ceremonial Pike",     20, 5,  0, 8, 1],
    ["Ceremonial Spear",     0, 5,  0, 8, 1],
    ["Cestus",               0, 1,  1, 0, 0],
    ["Champion Axe",       -10, 6, -1, 0, 1],
    ["Champion Sword",     -10, 3, -1, 9, 1],
    ["Chu-Ko-Nu",          -60, 8, -1, 1, 0],
    ["Cinquedeas",         -20, 4, -1, 0, 0],
    ["Clasped Orb",          0, 2,  6, 0, 0],
    ["Claws",              -10, 1,  1, 0, 0],
    ["Claymore",            10, 3, -1, 9, 1],
    ["Cleaver",             10, 2, -1, 0, 1],
    ["Cloudy Sphere",        0, 2,  6, 0, 0],
    ["Club",               -10, 2, -1, 0, 0],
    ["Colossus Blade",       5, 3, -1, 9, 1],
    ["Colossus Crossbow",   10, 8, -1, 1, 0],
    ["Colossus Sword",      10, 3, -1, 9, 1],
    ["Colossus Voulge",     10, 6, -1, 8, 1],
    ["Composite Bow",      -10, 7, -1, 1, 0],
    ["Conquest Sword",       0, 2, -1, 9, 1],
    ["Crossbow",             0, 8, -1, 1, 0],
    ["Crowbill",           -10, 2, -1, 0, 1],
    ["Crusader Bow",        10, 7, -1, 1, 0],
    ["Cryptic Axe",         10, 6, -1, 8, 1],
    ["Cryptic Sword",      -10, 2, -1, 9, 1],
    ["Crystal Sword",        0, 2, -1, 9, 1],
    ["Crystalline Globe",  -10, 2,  6, 0, 0],
    ["Cudgel",             -10, 2, -1, 0, 0],
    ["Cutlass",            -30, 2, -1, 9, 0],
    ["Dacian Falx",         10, 3, -1, 9, 1],
    ["Dagger",             -20, 4, -1, 0, 0],
    ["Decapitator",         10, 6, -1, 0, 1],
    ["Demon Crossbow",     -60, 8, -1, 1, 0],
    ["Demon Heart",          0, 2,  6, 0, 0],
    ["Devil Star",          10, 2, -1, 0, 0],
    ["Diamond Bow",          0, 7, -1, 1, 0],
    ["Dimensional Blade",    0, 2, -1, 9, 1],
    ["Dimensional Shard",   10, 2,  6, 0, 0],
    ["Dirk",                 0, 4, -1, 0, 0],
    ["Divine Scepter",     -10, 2, -1, 0, 1],
    ["Double Axe",          10, 2, -1, 0, 1],
    ["Double Bow",         -10, 7, -1, 1, 0],
    ["Eagle Orb",          -10, 2,  6, 0, 0],
    ["Edge Bow",             5, 7, -1, 1, 0],
    ["Elder Staff",          0, 6, -1, 0, 1],
    ["Eldritch Orb",       -10, 2,  6, 0, 0],
    ["Elegant Blade",      -10, 2, -1, 9, 0],
    ["Espandon",             0, 3, -1, 9, 0],
    ["Ettin Axe",           10, 2, -1, 0, 1],
    ["Executioner Sword",   10, 3, -1, 9, 1],
    ["Falcata",              0, 2, -1, 9, 0],
    ["Falchion",            20, 2, -1, 9, 0],
    ["Fanged Knife",       -20, 4, -1, 0, 0],
    ["Fascia",              10, 1,  1, 0, 0],
    ["Feral Axe",          -15, 6, -1, 0, 1],
    ["Feral Claws",        -20, 1,  1, 0, 0],
    ["Flail",              -10, 2, -1, 0, 1],
    ["Flamberge",          -10, 3, -1, 9, 1],
    ["Flanged Mace",         0, 2, -1, 0, 0],
    ["Flying Axe",          10, 2, -1, 3, 0],
    ["Francisca",           10, 2, -1, 3, 0],
    ["Fuscina",              0, 5, -1, 8, 1],
    ["Ghost Glaive",        20, 4, -1, 2, 0],
    ["Ghost Spear",          0, 5, -1, 8, 1],
    ["Ghost Wand",          10, 2, -1, 0, 0],
    ["Giant Axe",           10, 6, -1, 0, 1],
    ["Giant Sword",          0, 3, -1, 9, 1],
    ["Giant Thresher",     -10, 6, -1, 8, 1],
    ["Gladius",              0, 2, -1, 9, 0],
    ["Glaive",              20, 4, -1, 2, 0],
    ["Glorious Axe",        10, 6, -1, 0, 1],
    ["Glowing Orb",        -10, 2,  6, 0, 0],
    ["Gnarled Staff",       10, 6, -1, 0, 1],
    ["Gorgon Crossbow",      0, 8, -1, 1, 0],
    ["Gothic Axe",         -10, 6, -1, 0, 1],
    ["Gothic Bow",          10, 7, -1, 1, 0],
    ["Gothic Staff",         0, 6, -1, 0, 1],
    ["Gothic Sword",        10, 3, -1, 9, 1],
    ["Grand Matron Bow",    10, 7,  0, 1, 0],
    ["Grand Scepter",       10, 2, -1, 0, 0],
    ["Grave Wand",           0, 2, -1, 0, 0],
    ["Great Axe",          -10, 6, -1, 0, 1],
    ["Great Bow",          -10, 7, -1, 1, 0],
    ["Great Maul",          20, 6, -1, 0, 1],
    ["Great Pilum",          0, 4, -1, 2, 0],
    ["Great Poleaxe",        0, 6, -1, 8, 1],
    ["Great Sword",         10, 3, -1, 9, 1],
    ["Greater Claws",      -20, 1,  1, 0, 0],
    ["Greater Talons",     -30, 1,  1, 0, 0],
    ["Grim Scythe",        -10, 6, -1, 8, 1],
    ["Grim Wand",            0, 2, -1, 0, 0],
    ["Halberd",              0, 6, -1, 8, 1],
    ["Hand Axe",             0, 2, -1, 0, 0],
    ["Hand Scythe",        -10, 1,  1, 0, 0],
    ["Harpoon",            -10, 4, -1, 2, 0],
    ["Hatchet Hands",       10, 1,  1, 0, 0],
    ["Hatchet",              0, 2, -1, 0, 0],
    ["Heavenly Stone",     -10, 2,  6, 0, 0],
    ["Heavy Crossbow",      10, 8, -1, 1, 0],
    ["Highland Blade",      -5, 3, -1, 9, 1],
    ["Holy Water Sprinkler",10, 2, -1, 0, 0],
    ["Hunter's Bow",       -10, 7, -1, 1, 0],
    ["Hurlbat",            -10, 2, -1, 3, 0],
    ["Hydra Bow",           10, 7, -1, 1, 0],
    ["Hydra Edge",          10, 2, -1, 9, 0],
    ["Hyperion Javelin",   -10, 4, -1, 2, 0],
    ["Hyperion Spear",     -10, 5, -1, 8, 0],
    ["Jagged Star",         10, 2, -1, 0, 0],
    ["Jared's Stone",       10, 2,  6, 0, 0],
    ["Javelin",            -10, 4, -1, 2, 0],
    ["Jo Staff",           -10, 6, -1, 0, 0],
    ["Katar",              -10, 1,  1, 0, 0],
    ["Knout",              -10, 2, -1, 0, 1],
    ["Kris",               -20, 4, -1, 0, 0],
    ["Lance",               20, 5, -1, 8, 1],
    ["Large Axe",          -10, 6, -1, 0, 1],
    ["Large Siege Bow",     10, 7, -1, 1, 0],
    ["Legend Spike",       -10, 4, -1, 0, 0],
    ["Legend Sword",       -15, 3, -1, 9, 0],
    ["Legendary Mallet",    20, 2, -1, 0, 1],
    ["Lich Wand",          -20, 2, -1, 0, 0],
    ["Light Crossbow",     -10, 8, -1, 1, 0],
    ["Lochaber Axe",        10, 6, -1, 8, 0],
    ["Long Battle Bow",     10, 7, -1, 1, 0],
    ["Long Bow",             0, 7, -1, 1, 0],
    ["Long Staff",           0, 6, -1, 0, 0],
    ["Long Sword",         -10, 2, -1, 9, 1],
    ["Long War Bow",        10, 7, -1, 1, 0],
    ["Mace",                 0, 2, -1, 0, 0],
    ["Maiden Javelin",     -10, 4,  0, 2, 0],
    ["Maiden Pike",         10, 5,  0, 8, 1],
    ["Maiden Spear",         0, 5,  0, 8, 1],
    ["Mancatcher",         -20, 5, -1, 8, 1],
    ["Martel de Fer",       20, 6, -1, 0, 1],
    ["Matriarchal Bow",    -10, 7,  0, 1, 0],
    ["Matriarchal Javelin",-10, 4,  0, 2, 0],
    ["Matriarchal Pike",    20, 5,  0, 8, 1],
    ["Matriarchal Spear",    0, 5,  0, 8, 1],
    ["Maul",                10, 6, -1, 0, 1],
    ["Mighty Scepter",       0, 2, -1, 0, 0],
    ["Military Axe",       -10, 6, -1, 0, 1],
    ["Military Pick",      -10, 2, -1, 0, 1],
    ["Mithril Point",        0, 4, -1, 0, 0],
    ["Morning Star",        10, 2, -1, 0, 0],
    ["Mythical Sword",       0, 2, -1, 9, 0],
    ["Naga",                 0, 2, -1, 0, 1],
    ["Ogre Axe",             0, 6, -1, 8, 0],
    ["Ogre Maul",           10, 6, -1, 0, 1],
    ["Partizan",            10, 6, -1, 8, 1],
    ["Pellet Bow",         -10, 8, -1, 1, 0],
    ["Petrified Wand",      10, 2, -1, 0, 0],
    ["Phaseblade",         -30, 2, -1, 9, 1],
    ["Pike",                20, 5, -1, 8, 1],
    ["Pilum",                0, 4, -1, 2, 0],
    ["Poignard",           -20, 4, -1, 0, 0],
    ["Poleaxe",             10, 6, -1, 8, 1],
    ["Polished Wand",        0, 2, -1, 0, 0],
    ["Quarterstaff",         0, 6, -1, 0, 0],
    ["Quhab",                0, 1,  1, 0, 0],
    ["Razor Bow",          -10, 7, -1, 1, 0],
    ["Reflex Bow",          10, 7,  0, 1, 0],
    ["Reinforced Mace",      0, 2, -1, 0, 0],
    ["Repeating Crossbow", -40, 8, -1, 1, 0],
    ["Rondel",               0, 4, -1, 0, 0],
    ["Rune Bow",             0, 7, -1, 1, 0],
    ["Rune Scepter",         0, 2, -1, 0, 0],
    ["Rune Staff",          20, 6, -1, 0, 1],
    ["Rune Sword",         -10, 2, -1, 9, 1],
    ["Runic Talons",       -30, 1,  1, 0, 0],
    ["Sabre",              -10, 2, -1, 9, 0],
    ["Sacred Globe",       -10, 2,  6, 0, 0],
    ["Scepter",              0, 2, -1, 0, 0],
    ["Scimitar",           -20, 2, -1, 9, 0],
    ["Scissors Katar",     -10, 1,  1, 0, 0],
    ["Scissors Quhab",       0, 1,  1, 0, 0],
    ["Scissors Suwayyah",    0, 1,  1, 0, 0],
    ["Scourge",            -10, 2, -1, 0, 1],
    ["Scythe",             -10, 6, -1, 8, 1],
    ["Seraph Rod",          10, 2, -1, 0, 0],
    ["Shadow Bow",           0, 7, -1, 1, 0],
    ["Shamshir",           -10, 2, -1, 9, 0],
    ["Shillelagh",           0, 6, -1, 0, 1],
    ["Short Battle Bow",     0, 7, -1, 1, 0],
    ["Short Bow",            5, 7, -1, 1, 0],
    ["Short Siege Bow",      0, 7, -1, 1, 0],
    ["Short Spear",         10, 4, -1, 2, 0],
    ["Short Staff",        -10, 6, -1, 0, 0],
    ["Short Sword",          0, 2, -1, 9, 0],
    ["Short War Bow",        0, 7, -1, 1, 0],
    ["Siege Crossbow",       0, 8, -1, 1, 0],
    ["Silver-edged Axe",     0, 6, -1, 0, 1],
    ["Simbilan",            10, 4, -1, 2, 0],
    ["Small Crescent",      10, 2, -1, 0, 1],
    ["Smoked Sphere",        0, 2,  6, 0, 0],
    ["Sparkling Ball",       0, 2,  6, 0, 0],
    ["Spear",              -10, 5, -1, 8, 0],
    ["Spetum",               0, 5, -1, 8, 1],
    ["Spiculum",            20, 4, -1, 2, 0],
    ["Spider Bow",           5, 7, -1, 1, 0],
    ["Spiked Club",          0, 2, -1, 0, 0],
    ["Stag Bow",             0, 7,  0, 1, 0],
    ["Stalagmite",          10, 6, -1, 0, 0],
    ["Stiletto",           -10, 4, -1, 0, 0],
    ["Stygian Pike",         0, 5, -1, 8, 1],
    ["Stygian Pilum",        0, 4, -1, 2, 0],
    ["Suwayyah",             0, 1,  1, 0, 0],
    ["Swirling Crystal",    10, 2,  6, 0, 0],
    ["Tabar",               10, 6, -1, 0, 1],
    ["Thresher",           -10, 6, -1, 8, 1],
    ["Throwing Axe",        10, 2, -1, 3, 0],
    ["Throwing Knife",       0, 4, -1, 3, 0],
    ["Throwing Spear",     -10, 4, -1, 2, 0],
    ["Thunder Maul",        20, 6, -1, 0, 1],
    ["Tomahawk",             0, 2, -1, 0, 0],
    ["Tomb Wand",          -20, 2, -1, 0, 0],
    ["Trident",              0, 5, -1, 8, 1],
    ["Truncheon",          -10, 2, -1, 0, 0],
    ["Tulwar",              20, 2, -1, 9, 0],
    ["Tusk Sword",           0, 3, -1, 9, 1],
    ["Twin Axe",            10, 2, -1, 0, 1],
    ["Two-Handed Sword",     0, 3, -1, 9, 0],
    ["Tyrant Club",          0, 2, -1, 0, 0],
    ["Unearthed Wand",       0, 2, -1, 0, 0],
    ["Vortex Orb",           0, 2,  6, 0, 0],
    ["Voulge",               0, 6, -1, 8, 1],
    ["Walking Stick",      -10, 6, -1, 0, 0],
    ["Wand",                 0, 2, -1, 0, 0],
    ["War Axe",              0, 2, -1, 0, 1],
    ["War Club",            10, 6, -1, 0, 0],
    ["War Dart",           -20, 4, -1, 3, 0],
    ["War Fist",            10, 1,  1, 0, 0],
    ["War Fork",           -20, 5, -1, 8, 1],
    ["War Hammer",          20, 2, -1, 0, 1],
    ["War Javelin",        -10, 4, -1, 2, 0],
    ["War Pike",            20, 5, -1, 8, 1],
    ["War Scepter",        -10, 2, -1, 0, 1],
    ["War Scythe",         -10, 6, -1, 8, 1],
    ["War Spear",          -10, 5, -1, 8, 0],
    ["War Spike",          -10, 2, -1, 0, 1],
    ["War Staff",           20, 6, -1, 0, 1],
    ["War Sword",            0, 2, -1, 9, 0],
    ["Ward Bow",             0, 7, -1, 1, 0],
    ["Winged Axe",         -10, 2, -1, 3, 0],
    ["Winged Harpoon",     -10, 4, -1, 2, 0],
    ["Winged Knife",       -20, 4, -1, 3, 0],
    ["Wrist Blade",          0, 1,  1, 0, 0],
    ["Wrist Spike",        -10, 1,  1, 0, 0],
    ["Wrist Sword",        -10, 1,  1, 0, 0],
    ["Yari",                 0, 5, -1, 8, 1],
    ["Yew Wand",            10, 2, -1, 0, 0],
    ["Zweihander",         -10, 3, -1, 9, 1]
];
var lookupWeapon2 = [
    {name: "[unarmed]",           wsm:  0, type:0, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Ancient Axe",         wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Ancient Sword",       wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Arbalest",            wsm:-10, type:8, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Archon Staff",        wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Ashwood Bow",         wsm:  0, type:7, classItem: 0, weaponCategory:1, canZeal:0},
    {name: "Ataghan",             wsm:-20, type:2, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Axe",                 wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Balanced Axe",        wsm:-10, type:2, classItem:-1, weaponCategory:3, canZeal:0},
    {name: "Balanced Knife",      wsm:-20, type:4, classItem:-1, weaponCategory:3, canZeal:0},
    {name: "Ballista",            wsm: 10, type:8, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Balrog Blade",        wsm:  0, type:3, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Balrog Spear",        wsm: 10, type:4, classItem:-1, weaponCategory:2, canZeal:0},
    {name: "Barbed Club",         wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Bardiche",            wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:0},
    {name: "Bastard Sword",       wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Battle Axe",          wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Battle Cestus",       wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Battle Dart",         wsm:  0, type:4, classItem:-1, weaponCategory:3, canZeal:0},
    {name: "Battle Hammer",       wsm: 20, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Battle Scythe",       wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Battle Staff",        wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Battle Sword",        wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Bearded Axe",         wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Bec-de-Corbin",       wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Berserker Axe",       wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Bill",                wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Blade Bow",           wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Blade Talons",        wsm:-20, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Blade",               wsm:-10, type:4, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Bone Knife",          wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Bone Wand",           wsm:-20, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Brandistock",         wsm:-20, type:5, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Broad Axe",           wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Broad Sword",         wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Burnt Wand",          wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Caduceus",            wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Cedar Bow",           wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Cedar Staff",         wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Ceremonial Bow",      wsm: 10, type:7, classItem: 0, weaponCategory:1, canZeal:0},
    {name: "Ceremonial Javelin",  wsm:-10, type:4, classItem: 0, weaponCategory:2, canZeal:0},
    {name: "Ceremonial Pike",     wsm: 20, type:5, classItem: 0, weaponCategory:8, canZeal:1},
    {name: "Ceremonial Spear",    wsm:  0, type:5, classItem: 0, weaponCategory:8, canZeal:1},
    {name: "Cestus",              wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Champion Axe",        wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Champion Sword",      wsm:-10, type:3, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Chu-Ko-Nu",           wsm:-60, type:8, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Cinquedeas",          wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Clasped Orb",         wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:0},
    {name: "Claws",               wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Claymore",            wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Cleaver",             wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Cloudy Sphere",       wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:0},
    {name: "Club",                wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Colossus Blade",      wsm:  5, type:3, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Colossus Crossbow",   wsm: 10, type:8, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Colossus Sword",      wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Colossus Voulge",     wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Composite Bow",       wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Conquest Sword",      wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Crossbow",            wsm:  0, type:8, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Crowbill",            wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Crusader Bow",        wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Cryptic Axe",         wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Cryptic Sword",       wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Crystal Sword",       wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Crystalline Globe",   wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:0},
    {name: "Cudgel",              wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Cutlass",             wsm:-30, type:2, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Dacian Falx",         wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Dagger",              wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Decapitator",         wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Demon Crossbow",      wsm:-60, type:8, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Demon Heart",         wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:0},
    {name: "Devil Star",          wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Diamond Bow",         wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Dimensional Blade",   wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Dimensional Shard",   wsm: 10, type:2, classItem: 6, weaponCategory:0, canZeal:0},
    {name: "Dirk",                wsm:  0, type:4, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Divine Scepter",      wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Double Axe",          wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Double Bow",          wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Eagle Orb",           wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:0},
    {name: "Edge Bow",            wsm:  5, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Elder Staff",         wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Eldritch Orb",        wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:0},
    {name: "Elegant Blade",       wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Espandon",            wsm:  0, type:3, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Ettin Axe",           wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Executioner Sword",   wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Falcata",             wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Falchion",            wsm: 20, type:2, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Fanged Knife",        wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Fascia",              wsm: 10, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Feral Axe",           wsm:-15, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Feral Claws",         wsm:-20, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Flail",               wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Flamberge",           wsm:-10, type:3, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Flanged Mace",        wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Flying Axe",          wsm: 10, type:2, classItem:-1, weaponCategory:3, canZeal:0},
    {name: "Francisca",           wsm: 10, type:2, classItem:-1, weaponCategory:3, canZeal:0},
    {name: "Fuscina",             wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Ghost Glaive",        wsm: 20, type:4, classItem:-1, weaponCategory:2, canZeal:0},
    {name: "Ghost Spear",         wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Ghost Wand",          wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Giant Axe",           wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Giant Sword",         wsm:  0, type:3, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Giant Thresher",      wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Gladius",             wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Glaive",              wsm: 20, type:4, classItem:-1, weaponCategory:2, canZeal:0},
    {name: "Glorious Axe",        wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Glowing Orb",         wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:0},
    {name: "Gnarled Staff",       wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Gorgon Crossbow",     wsm:  0, type:8, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Gothic Axe",          wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Gothic Bow",          wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Gothic Staff",        wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Gothic Sword",        wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Grand Matron Bow",    wsm: 10, type:7, classItem: 0, weaponCategory:1, canZeal:0},
    {name: "Grand Scepter",       wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Grave Wand",          wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Great Axe",           wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Great Bow",           wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Great Maul",          wsm: 20, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Great Pilum",         wsm:  0, type:4, classItem:-1, weaponCategory:2, canZeal:0},
    {name: "Great Poleaxe",       wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Great Sword",         wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Greater Claws",       wsm:-20, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Greater Talons",      wsm:-30, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Grim Scythe",         wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Grim Wand",           wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Halberd",             wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Hand Axe",            wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Hand Scythe",         wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Harpoon",             wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:0},
    {name: "Hatchet Hands",       wsm: 10, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Hatchet",             wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Heavenly Stone",      wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:0},
    {name: "Heavy Crossbow",      wsm: 10, type:8, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Highland Blade",      wsm: -5, type:3, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Holy Water Sprinkler",wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Hunter's Bow",        wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Hurlbat",             wsm:-10, type:2, classItem:-1, weaponCategory:3, canZeal:0},
    {name: "Hydra Bow",           wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Hydra Edge",          wsm: 10, type:2, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Hyperion Javelin",    wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:0},
    {name: "Hyperion Spear",      wsm:-10, type:5, classItem:-1, weaponCategory:8, canZeal:0},
    {name: "Jagged Star",         wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Jared's Stone",       wsm: 10, type:2, classItem: 6, weaponCategory:0, canZeal:0},
    {name: "Javelin",             wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:0},
    {name: "Jo Staff",            wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Katar",               wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Knout",               wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Kris",                wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Lance",               wsm: 20, type:5, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Large Axe",           wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Large Siege Bow",     wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Legend Spike",        wsm:-10, type:4, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Legend Sword",        wsm:-15, type:3, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Legendary Mallet",    wsm: 20, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Lich Wand",           wsm:-20, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Light Crossbow",      wsm:-10, type:8, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Lochaber Axe",        wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:0},
    {name: "Long Battle Bow",     wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Long Bow",            wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Long Staff",          wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Long Sword",          wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Long War Bow",        wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Mace",                wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Maiden Javelin",      wsm:-10, type:4, classItem: 0, weaponCategory:2, canZeal:0},
    {name: "Maiden Pike",         wsm: 10, type:5, classItem: 0, weaponCategory:8, canZeal:1},
    {name: "Maiden Spear",        wsm:  0, type:5, classItem: 0, weaponCategory:8, canZeal:1},
    {name: "Mancatcher",          wsm:-20, type:5, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Martel de Fer",       wsm: 20, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Matriarchal Bow",     wsm:-10, type:7, classItem: 0, weaponCategory:1, canZeal:0},
    {name: "Matriarchal Javelin", wsm:-10, type:4, classItem: 0, weaponCategory:2, canZeal:0},
    {name: "Matriarchal Pike",    wsm: 20, type:5, classItem: 0, weaponCategory:8, canZeal:1},
    {name: "Matriarchal Spear",   wsm:  0, type:5, classItem: 0, weaponCategory:8, canZeal:1},
    {name: "Maul",                wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Mighty Scepter",      wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Military Axe",        wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Military Pick",       wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Mithril Point",       wsm:  0, type:4, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Morning Star",        wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Mythical Sword",      wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Naga",                wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Ogre Axe",            wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:0},
    {name: "Ogre Maul",           wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Partizan",            wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Pellet Bow",          wsm:-10, type:8, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Petrified Wand",      wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Phaseblade",          wsm:-30, type:2, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Pike",                wsm: 20, type:5, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Pilum",               wsm:  0, type:4, classItem:-1, weaponCategory:2, canZeal:0},
    {name: "Poignard",            wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Poleaxe",             wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Polished Wand",       wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Quarterstaff",        wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Quhab",               wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Razor Bow",           wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Reflex Bow",          wsm: 10, type:7, classItem: 0, weaponCategory:1, canZeal:0},
    {name: "Reinforced Mace",     wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Repeating Crossbow",  wsm:-40, type:8, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Rondel",              wsm:  0, type:4, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Rune Bow",            wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Rune Scepter",        wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Rune Staff",          wsm: 20, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Rune Sword",          wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Runic Talons",        wsm:-30, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Sabre",               wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Sacred Globe",        wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:0},
    {name: "Scepter",             wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Scimitar",            wsm:-20, type:2, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Scissors Katar",      wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Scissors Quhab",      wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Scissors Suwayyah",   wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Scourge",             wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Scythe",              wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Seraph Rod",          wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Shadow Bow",          wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Shamshir",            wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Shillelagh",          wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Short Battle Bow",    wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Short Bow",           wsm:  5, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Short Siege Bow",     wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Short Spear",         wsm: 10, type:4, classItem:-1, weaponCategory:2, canZeal:0},
    {name: "Short Staff",         wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Short Sword",         wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Short War Bow",       wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Siege Crossbow",      wsm:  0, type:8, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Silver-edged Axe",    wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Simbilan",            wsm: 10, type:4, classItem:-1, weaponCategory:2, canZeal:0},
    {name: "Small Crescent",      wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Smoked Sphere",       wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:0},
    {name: "Sparkling Ball",      wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:0},
    {name: "Spear",               wsm:-10, type:5, classItem:-1, weaponCategory:8, canZeal:0},
    {name: "Spetum",              wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Spiculum",            wsm: 20, type:4, classItem:-1, weaponCategory:2, canZeal:0},
    {name: "Spider Bow",          wsm:  5, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Spiked Club",         wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Stag Bow",            wsm:  0, type:7, classItem: 0, weaponCategory:1, canZeal:0},
    {name: "Stalagmite",          wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Stiletto",            wsm:-10, type:4, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Stygian Pike",        wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Stygian Pilum",       wsm:  0, type:4, classItem:-1, weaponCategory:2, canZeal:0},
    {name: "Suwayyah",            wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Swirling Crystal",    wsm: 10, type:2, classItem: 6, weaponCategory:0, canZeal:0},
    {name: "Tabar",               wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Thresher",            wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Throwing Axe",        wsm: 10, type:2, classItem:-1, weaponCategory:3, canZeal:0},
    {name: "Throwing Knife",      wsm:  0, type:4, classItem:-1, weaponCategory:3, canZeal:0},
    {name: "Throwing Spear",      wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:0},
    {name: "Thunder Maul",        wsm: 20, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Tomahawk",            wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Tomb Wand",           wsm:-20, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Trident",             wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Truncheon",           wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Tulwar",              wsm: 20, type:2, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Tusk Sword",          wsm:  0, type:3, classItem:-1, weaponCategory:9, canZeal:1},
    {name: "Twin Axe",            wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "Two-Handed Sword",    wsm:  0, type:3, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Tyrant Club",         wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Unearthed Wand",      wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Vortex Orb",          wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:0},
    {name: "Voulge",              wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Walking Stick",       wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Wand",                wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "War Axe",             wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "War Club",            wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "War Dart",            wsm:-20, type:4, classItem:-1, weaponCategory:3, canZeal:0},
    {name: "War Fist",            wsm: 10, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "War Fork",            wsm:-20, type:5, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "War Hammer",          wsm: 20, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "War Javelin",         wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:0},
    {name: "War Pike",            wsm: 20, type:5, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "War Scepter",         wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "War Scythe",          wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "War Spear",           wsm:-10, type:5, classItem:-1, weaponCategory:8, canZeal:0},
    {name: "War Spike",           wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "War Staff",           wsm: 20, type:6, classItem:-1, weaponCategory:0, canZeal:1},
    {name: "War Sword",           wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:0},
    {name: "Ward Bow",            wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:0},
    {name: "Winged Axe",          wsm:-10, type:2, classItem:-1, weaponCategory:3, canZeal:0},
    {name: "Winged Harpoon",      wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:0},
    {name: "Winged Knife",        wsm:-20, type:4, classItem:-1, weaponCategory:3, canZeal:0},
    {name: "Wrist Blade",         wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Wrist Spike",         wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Wrist Sword",         wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:0},
    {name: "Yari",                wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:1},
    {name: "Yew Wand",            wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:0},
    {name: "Zweihander",          wsm:-10, type:3, classItem:-1, weaponCategory:9, canZeal:1}
];

function isDagger(weaponId) {
    var weap = lookupWeapon2[weaponId];
    if (weap.type == weaponTypes.oneHandedThrustingWeapon && weap.weaponCategory == weaponCategories.other) {
        return true;
    }
    return false;
}

function isAssasinClaw(weaponId) {
    var weap = lookupWeapon2[weaponId];
    return weap.type == weaponTypes.claw;
}

function isBowOrXbow(weaponId) {
    var weap = lookupWeapon2[weaponId];
    return weap.weaponCategory == weaponCategories.bowOrXbow;
}

var data = {
    attack: [
        {
            title: "Standard",
            index: 0,
            animation: 1,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Throw",
            index: 1,
            animation: 2,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Impale",
            index: 2,
            animation: 7,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Jab",
            index: 3,
            animation: 7,
            sequence: 1,
            rollback: 100
        },
        {
            title: "Strafe",
            index: 4,
            animation: 0,
            sequence: 0,
            rollback: 50
        },
        {
            title: "Fend",
            index: 5,
            animation: 0,
            sequence: 0,
            rollback: 40
        },
        {
            title: "Tiger Strike",
            index: 6,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Cobra Strike",
            index: 7,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Phoenix Strike",
            index: 8,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Fists of Ember",
            index: 9,
            animation: 1,
            sequence: 2,
            rollback: 100
        },
        {
            title: "Fists of Thunder",
            index: 10,
            animation: 1,
            sequence: 2,
            rollback: 100
        },
        {
            title: "Blades of Ice",
            index: 11,
            animation: 1,
            sequence: 2,
            rollback: 100
        },
        {
            title: "Dragon Claw",
            index: 12,
            animation: 7,
            sequence: 2,
            rollback: 100
        },
        {
            title: "Dragon Tail",
            index: 13,
            animation: 3,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Dragon Talon",
            index: 14,
            animation: 3,
            sequence: 0,
            rollback: 0
        },
        {
            title: "Laying Traps",
            index: 15,
            animation: 5,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Double Swing",
            index: 16,
            animation: 7,
            sequence: 3,
            rollback: 100
        },
        {
            title: "Frenzy",
            index: 17,
            animation: 7,
            sequence: 3,
            rollback: 100
        },
        {
            title: "Double Throw",
            index: 18,
            animation: 7,
            sequence: 4,
            rollback: 100
        },
        {
            title: "Whirlwind",
            index: 19,
            animation: 7,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Concentrate",
            index: 20,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Berserk",
            index: 21,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Bash",
            index: 22,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Stun",
            index: 23,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Zeal",
            index: 24,
            animation: 0,
            sequence: 0,
            rollback: 0
        },
        {
            title: "Smite",
            index: 25,
            animation: 4,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Feral Rage",
            index: 26,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Hunger",
            index: 27,
            animation: 6,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Rabies",
            index: 28,
            animation: 6,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Fury",
            index: 29,
            animation: 0,
            sequence: 0,
            rollback: 0
        },
        {
            title: "Sacrifice",
            index: 30,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Vengeance",
            index: 31,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Conversion",
            index: 32,
            animation: 0,
            sequence: 0,
            rollback: 100
        },
        {
            title: "Cleave",
            index: 33,
            animation: 1,
            sequence: 0,
            rollback: 100
        }
    ]
};

Vue.component('breakpoints-table', {
    template: '#breakpoints-table',
    props: [
        'characters',
        'charactersSelected',
        'shapeShiftForms',
        'shapeShiftFormsSelected',
        'weaponInfoPrimary',
        'weaponInfoSecondary',
        'skills',
        'skillsSelected',
        'iasOffWeapon',
        'weaponsPrimarySelected',
        'weaponsSecondarySelected',
        'iasWeaponPrimary',
        'iasWeaponSecondary',
        'fanaticismSkillIas',
        'frenzySkillIas',
        'werewolfSkillIas',
        'burstOfSpeedSkillIas',
        'breakpoints',
        'currentFpa',
    ],
    data: function () {
        return { 
            iasRows: 50,
        };
    },
    computed: {
        aidel: function () {
            var aidel = 0;
            if (this.charactersSelected > 6) {
                aidel = 2;
            }
            if ((this.charactersSelected == 8 && this.skillsSelected == 3) || (this.charactersSelected == 9 && this.skillsSelected == 0)) {
                aidel = 1;
            }
            return aidel;
        },
        attackSkill: function () {
            return data.attack[this.skillsSelected];
        }
    }
});

var app = new Vue({
    el: '#app',
    vuetify: new Vuetify({
        theme: {
            dark: false,
        },
    }),
    data: {
        characters: [
            { value: 0, text: 'Amazon' },
            { value: 1, text: 'Assassin' },
            { value: 2, text: 'Barbarian' },
            { value: 3, text: 'Druid' },
            { value: 4, text: 'Necromancer' },
            { value: 5, text: 'Paladin' },
            { value: 6, text: 'Sorceress' },
            { value: 7, text: 'Act 1 Merc - Rogue' },
            { value: 8, text: 'Act 2 Merc - Town Guard' },
            { value: 9, text: 'Act 5 Merc - Barbarian' },
            { value: 10,text: 'Act 3 Merc - Iron Wolves' },
        ],
        charactersSelected: 0,
        shapeShiftFormsSelected: 0,
        fanaticismSkillIAS: 0,
        frenzySkillIAS: 0,
        werewolfSkillIAS: 0,
        burstOfSpeedSkillIAS: 0,
        holyFreezeSkillIAS: 0,
        isDecrepify: false,
        weaponsPrimarySelected: 0,
        weaponsSecondarySelected: 0,
        weaponsPrimaryBarbHandednessSelected: -1,
        skillsSelected: 0,
        iasOffWeapon: 0,
        iasWeaponPrimary: 0,
        iasWeaponSecondary: 0,
        isWsmBug: false,
        currentFpa: '',
        isCurrentFpaMaxed: false,
        currentAps: '',
    },
    methods: {
        updateCurrent: function () {
            this.berechneWerte();
        },
        getSkillOptionData: function (title) {
            var skill = data.attack.find(a => a.title === title);
            return { value: skill.index, text: skill.title };
        },
        berechneSIAS: function () {
            var fana = parseInt(this.fanaticismSkillIAS);
            var frenzy = parseInt(this.frenzySkillIAS);
            var wolf = parseInt(this.werewolfSkillIAS);
            var tempo = parseInt(this.burstOfSpeedSkillIAS);
            var holyfrost = parseInt(this.holyFreezeSkillIAS);
            var attackSkill = data.attack[this.skillsSelected];
            // != Wolf
            if (this.shapeShiftFormsSelected != 2) wolf = 0;
            SIAS = fana + frenzy + wolf + tempo - holyfrost;
            if (this.skillsSelected == 16) {
                SIAS = SIAS + 50;
            }
            if (this.skillsSelected == 13) {
                SIAS = SIAS - 40;
            }
            if (this.isDecrepify) {
                SIAS = SIAS - 50;
            }
            if ((attackSkill.animation == 7) && (this.charactersSelected < 7)) {
                SIAS = SIAS - 30;
            }
        },
        berechneWSM: function () {
            var weapPrimary =   lookupWeapon[this.weaponsPrimarySelected];
            var weapSecondary = lookupWeapon[this.weaponsSecondarySelected];
            // not assasin and not barbarian
            if ((this.charactersSelected != 1) && (this.charactersSelected != 2)) {
                WSMprimaer = weapPrimary[1];
            }
            // (assasin or barbarian) and no offhand weapon
            if (((this.charactersSelected == 1) || (this.charactersSelected == 2)) && (this.weaponsSecondarySelected == 0)) {
                WSMprimaer = weapPrimary[1];
            }
            // (assasin or barbarian) with offhand weapon
            if (((this.charactersSelected == 1) || (this.charactersSelected == 2)) && (this.weaponsSecondarySelected > 0)) {
                if (this.isWsmBug) {
                    console.log('applying wsm bug');
                    WSMprimaer = parseInt((weapPrimary[1] + weapSecondary[1]) / 2) + weapPrimary[1] - weapSecondary[1];
                    WSMsekundaer = parseInt((weapPrimary[1] + weapSecondary[1]) / 2);
                } else {
                    WSMprimaer = parseInt((weapPrimary[1] + weapSecondary[1]) / 2);
                    WSMsekundaer = parseInt((weapPrimary[1] + weapSecondary[1]) / 2) + weapSecondary[1] - lookupWeapon[app.weaponsPrimarySelected][1];
                }
                console.log('average primary wsm: ' + WSMprimaer);
                console.log('average secondary wsm: ' + WSMsekundaer);
            }
        },
        calcFPA: function (FramesPerDirection, Acceleration, StartingFrame) {
            var weapPrimary = lookupWeapon[this.weaponsPrimarySelected];
            console.debug('calc FPA');
            console.debug('FramesPerDirection ' + FramesPerDirection);
            console.debug('Acceleration ' + Acceleration);
            console.debug('Starting frame ' + StartingFrame);
            //var Acceleration; // dunno why this is declared again
            var AnimationSpeed = 256;
            var attackSkill = data.attack[this.skillsSelected];
            // Assassin && Battle Cestus, Blade Talons, Cestus, Claws, Fascia, Feral Claws, Greater Claws, Greater Talons, Hand Scythe, Hatchet Hands, Katar, Quhab, Runic Talons, Scissors Katar, Scissors Quhab, Scissors Suwayyah, Suwayyah, War Fist, Wrist Blade, Wrist Spike, Wrist Sword
            if ((this.charactersSelected == 1) && (weapPrimary[2] == 1)) {
                AnimationSpeed = 208;
            }
            // Dragon Tail, Dragon Talon || Impale, Jab, Fists of Fire, Claws of Thunder, Blades of Ice, Dragon Claw, Double Swing, Frenzy, Double Throw, Whirlwind && not Whirlwind
            console.debug("attack skill");
            console.debug(attackSkill);
            if (((attackSkill.animation == 3) || (attackSkill.animation == 7)) && (attackSkill.title !== "Whirlwind")) {
                AnimationSpeed = 256;
            }
            // Laying Traps
            if (attackSkill.animation == 5) {
                AnimationSpeed = 128;
            }
            // Bear
            if (this.shapeShiftFormsSelected == 1) {
                if (weapPrimary[2] == 3) { // 2-hand swords
                    FramesPerDirection = waffengattung[2][this.charactersSelected][0]; //1-hand swinging weapon
                }
                AnimationSpeed = Math.floor(256 * 10 / Math.floor(256 * FramesPerDirection / Math.floor((100 + IASprimaer - parseInt(this.iasOffWeapon) - weapPrimary[1]) * AnimationSpeed / 100)));
                FramesPerDirection = 12;
                if (attackSkill.animation == 6) {
                    FramesPerDirection = 10;
                }
                StartingFrame = 0;
            }
            // Wolf
            if (this.shapeShiftFormsSelected == 2) {
                if (weapPrimary[2] == 3) { // 2-hand swords
                    FramesPerDirection = waffengattung[2][this.charactersSelected][0]; //1-hand swinging weapon
                }
                AnimationSpeed = Math.floor(256 * 9 / Math.floor(256 * FramesPerDirection / Math.floor((100 + IASprimaer - parseInt(this.iasOffWeapon) - weapPrimary[1]) * AnimationSpeed / 100)));
                FramesPerDirection = 13;
                if ((this.skillsSelected == 29) && (StartingFrame == 0)) { // Fury
                    FramesPerDirection = 7;
                }
                if (attackSkill.animation == 6) {
                    FramesPerDirection = 10;
                }
                StartingFrame = 0;
            }
            var FPA = Math.ceil(256 * (FramesPerDirection - StartingFrame) / Math.floor(AnimationSpeed * Acceleration / 100)) - 1;
            FPAmax = Math.ceil(256 * (FramesPerDirection - StartingFrame) / Math.floor(AnimationSpeed * 175 / 100)) - 1;
            if (this.skillsSelected == 19) { // whirlwind
                FPA = Math.floor(256 * FramesPerDirection / Math.floor(AnimationSpeed * Acceleration / 100));
                FPAmax = 0;
            }
            if (this.skillsSelected == 26) { // Feral Rage
                FPA = Math.ceil(256 * 7 / Math.floor(AnimationSpeed * Acceleration / 100)) + Math.ceil((256 * 13 - Math.floor(AnimationSpeed * Acceleration / 100) * Math.ceil(256 * 7 / Math.floor(AnimationSpeed * Acceleration / 100))) / (2 * Math.floor(AnimationSpeed * Acceleration / 100))) - 1;
                FPAmax = Math.ceil(256 * 7 / Math.floor(AnimationSpeed * 175 / 100)) + Math.ceil((256 * 13 - Math.floor(AnimationSpeed * 175 / 100) * Math.ceil(256 * 7 / Math.floor(AnimationSpeed * 175 / 100))) / (2 * Math.floor(AnimationSpeed * 175 / 100))) - 1;
            }
            if (cap == 1) {
                this.isCurrentFpaMaxed = false;
                if ((attackSkill.rollback == 100) && (attackSkill.animation != 1) && (FPA <= FPAmax)) {
                    this.isCurrentFpaMaxed = true;
                }
            }
            console.debug('FPA ' + FPA);
            return FPA;
        },
        berechneWerte: function () {
            var weapPrimary = lookupWeapon[this.weaponsPrimarySelected];
            var ergebnis; // "result" FPA
            var temp;
            var attackSkill = data.attack[this.skillsSelected];
            console.debug('Calculating breakpoints for: ' + attackSkill.title);
            this.berechneSIAS();
            this.berechneEIAS();
            this.berechneWSM();
            var acceleration = Math.max(Math.min(100 + SIAS + EIASprimaer - WSMprimaer, 175), 15);
            var acceleration2 = Math.max(Math.min(100 + SIAS + EIASsekundaer - WSMsekundaer, 175), 15);
            start = 0;
            if (((this.charactersSelected == 0) || (this.charactersSelected == 6)) && (attackSkill.animation < 2)) {
                start = startframe[weapPrimary[2]];
            }
            if (((attackSkill.animation == 0) || (attackSkill.animation == 6)) && (attackSkill.rollback == 100)) {
                frames = waffengattung[weapPrimary[2]][this.charactersSelected][0];
                if ((weapPrimary[2] == 3) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                    frames = 16;
                }
                ergebnis = this.calcFPA(frames, acceleration, start);
            }
            // standard attack
            if ((attackSkill.animation == 1) && (attackSkill.rollback == 100)) {
                console.debug('standard attack');
                frames = waffengattung[weapPrimary[2]][this.charactersSelected][0];
                if ((weapPrimary[2] == 3) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                    frames = 16;
                }
                ergebnis = this.calcFPA(frames, acceleration, start);
                if (ergebnis > this.calcFPA(frames, 175, start)) {
                    isMaxIas = false;
                }
                // Unshifted
                if (this.shapeShiftFormsSelected == 0) {
                    console.debug('unshifted');
                    temp = ergebnis;
                    var weaponTypeNum = weapPrimary[2];
                    console.debug(weaponTypeNum);
                    frames = waffengattung[weaponTypeNum][this.charactersSelected][1];
                    console.debug(frames);
                    if ((weapPrimary[2] == 3) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                        frames = 16;
                    }
                    ergebnis = this.calcFPA(frames, acceleration, start);
                    if (ergebnis > this.calcFPA(frames, 175, start)) {
                        isMaxIas = false;
                    }
                    ergebnis = (ergebnis + temp) / 2;
                }
                // act 5 merc
                if (this.charactersSelected == 9) {
                    ergebnis = ergebnis / 2;
                }
                if (this.weaponsSecondarySelected > 0) {
                    temp = ergebnis;
                    ergebnis = this.calcFPA(12, acceleration2, 0);
                    if (ergebnis > this.calcFPA(12, 175, 0)) {
                        isMaxIas = false;
                    }
                    ergebnis = (ergebnis + temp) / 2;
                }
                if (isMaxIas) {
                    this.isCurrentFpaMaxed = true;
                }
                isMaxIas = true;
            }
            if ((attackSkill.animation >= 2)
                && (attackSkill.animation <= 5) 
                && (attackSkill.rollback == 100)) {
                if (attackSkill.animation == 2) { // Throw
                    frames = waffengattung[9][this.charactersSelected];
                }
                if (attackSkill.animation == 3) {
                    frames = 13;
                }
                if (attackSkill.animation == 4) {
                    frames = 12;
                }
                if (attackSkill.animation == 5) {
                    frames = 8;
                }
                ergebnis = this.calcFPA(frames, acceleration, start);
            }
            // Old BoI, Impale, Jab, old Fists of Ember, old Fists of Thunder, Dragon Claw, Double Swing, Frenzy, Double Throw, Whirlwind (potential 2 hand attacks?)
            // && not whirlwind && rollback normal
            if ((attackSkill.animation == 7) && (this.skillsSelected != 19) && (attackSkill.rollback == 100)) {
                frames = sequences[attackSkill.sequence][weapPrimary[2]];
                // 9 Fists of Ember, 10 Fists of Thunder, 11 Blades of Ice, 12 Dragon Claw && offhand weapon selected
                if ((this.skillsSelected > 8) && (this.skillsSelected < 13) && (this.weaponsSecondarySelected > 0)) {
                    frames = 16;
                }
                // merc act 2
                if (this.charactersSelected == 8) {
                    frames = 14;
                }
                start = 0;
                ergebnis = this.calcFPA(frames, acceleration, start);
                ergebnis++;
                // 3 Jab && player classes
                if ((this.skillsSelected == 3) && (this.charactersSelected < 7)) {
                    ergebnis = parseInt(100 * ergebnis / 3) / 100;
                }
                // merc act 2
                if (this.charactersSelected == 8) {
                    ergebnis = ergebnis / 2;
                }
                if (attackSkill.title === "Frenzy") {
                    console.debug("special case frenzy");
                    console.debug("WSM1: " + WSMprimaer);
                    console.debug("WSM2: " + WSMsekundaer);
        
                    
                    // var acceleration = Math.max(Math.min(100 + SIAS + EIASprimaer - WSMprimaer, 175), 15);
                    // var acceleration2 = Math.max(Math.min(100 + SIAS + EIASsekundaer - WSMsekundaer, 175), 15);
        
                    // If the primary weapon is equipped in the left weapon slot:
                    // WSM1 = WSM_primary + WSM_secondary - (WSM_primary + WSM_secondary)/2
                    // WSM2 = 2*WSM_secondary - (WSM_primary + WSM_secondary)/2
                    // If the primary weapon is equipped in the right weapon slot:
                    // WSM1 = (WSM_primary + WSM_secondary)/2 + WSM_primary - WSM_secondary
                    // WSM2 = (WSM_primary + WSM_secondary)/2
        
                    // if (document.myform.primaerwaffe[0].checked == true) {
                    //     WSMprimaer = parseInt((weapPrimary[1] + lookupWeapon[this.weaponsSecondarySelected][1]) / 2);
                    //     WSMsekundaer = parseInt((weapPrimary[1] + lookupWeapon[this.weaponsSecondarySelected][1]) / 2) + lookupWeapon[this.weaponsSecondarySelected][1] - weapPrimary[1];
                    // } else {
                    //     WSMprimaer = parseInt((weapPrimary[1] + lookupWeapon[this.weaponsSecondarySelected][1]) / 2) + weapPrimary[1] - lookupWeapon[this.weaponsSecondarySelected][1];
                    //     WSMsekundaer = parseInt((weapPrimary[1] + lookupWeapon[this.weaponsSecondarySelected][1]) / 2);
                    // }
        
                    // EIAS1 = [120*(OIAS + IASprimary)/(120 + OIAS + IASprimary)]
                    // EIAS2 = [120*(OIAS + IASsecondary)/(120 + OIAS + IASsecondary)]
                    // Acceleration1 = 70 + SIAS + EIAS1 - WSM1
                    // Acceleration2 = 70 + SIAS + EIAS2 - WSM2
                    // fpa_1 = {256*9/[256*Acceleration1/100]} - 1
                    // fpa_2 = {(256*17 - fpa_1*[256*Acceleration1/100])/[256*Acceleration2/100]}
                    // fpa = fpa_1 + fpa_2
        
                    ergebnis = ergebnis / 2;
                } else if ((this.skillsSelected > 15) && (this.skillsSelected < 19)) { // 16 Double Swing, 17 Frenzy, 18 Double Throw 
                    ergebnis = ergebnis / 2;
                }
                // 9 Fists of Ember, 10 Fists of Thunder, 11 Blades of Ice, 12 Dragon Claw && offhand weapon selected
                if ((this.skillsSelected > 8) && (this.skillsSelected < 13) && (this.weaponsSecondarySelected > 0)) {
                    ergebnis = ergebnis / 2;
                }
            }
            // Whirlwind
            if (this.skillsSelected == 19) {
                ergebnis = 4; // uses classic whirlwind locked at 4 frame attack for all weapons
                isMaxIas = true;
                if (isMaxIas) {
                    this.isCurrentFpaMaxed = true;
                }
            }
            // Dragon Talon, Zeal, Fury
            if (attackSkill.rollback == 0) {
                // Dragon Talon
                if (this.skillsSelected == 14) {
                    rollback1 = this.calcFPA(4, acceleration, 0);
                    rollback1++;
                    rollback3 = this.calcFPA(13, acceleration, 0);
                    if (rollback3 == 7) {
                        this.isCurrentFpaMaxed = true;
                    }
                    this.currentFpa = rollback1 + "/" + rollback1 + "/" + rollback1 + "/" + rollback1 + "/" + rollback3 + " frames per attack";
                    this.currentAps = parseInt(100 * 25 / ((rollback1 * 4 + rollback3) / 5)) / 100 + " attacks per second";
                }
                // Fury
                if (this.skillsSelected == 29) {
                    frames = waffengattung[weapPrimary[2]][this.charactersSelected][0];
                    rollback1 = this.calcFPA(frames, acceleration, 0);
                    if (rollback1 > this.calcFPA(frames, 175, 0)) {
                        isMaxIas = false;
                    }
                    rollback1++;
                    rollback3 = this.calcFPA(frames, acceleration, 1);
                    if (rollback3 > this.calcFPA(frames, 175, 1)) {
                        isMaxIas = false;
                    }
                    if (isMaxIas) {
                        this.isCurrentFpaMaxed = true;
                    }
                    isMaxIas = true;
                    this.currentFpa = rollback1 + "/" + rollback1 + "/" + rollback1 + "/" + rollback1 + "/" + rollback3 + " frames per attack";
                    this.currentAps = parseInt(100 * 25 / ((rollback1 * 4 + rollback3) / 5)) / 100 + " attacks per second";
                }
                // Zeal
                if (this.skillsSelected == 24) {
                    var weaponTypeNum = weapPrimary[2];
                    console.debug(weaponTypeNum);
                    frames = aktionsframe[weaponTypeNum][this.charactersSelected];
                    // 2-h sword && barb single handed
                    var isBarbTwoHandedSwordAsOneHanded = false;
                    if ((weaponTypeNum == 3) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                        isBarbTwoHandedSwordAsOneHanded = true;
                        frames = 7;
                    }
                    console.debug(frames);
                    rollback1 = this.calcFPA(frames, acceleration, start);
                    if (rollback1 > this.calcFPA(frames, 175, start)) {
                        isMaxIas = false;
                    }
                    rollback1++;
                    rollback2 = this.calcFPA(frames, acceleration, 0);
                    if (rollback2 > this.calcFPA(frames, 175, 0)) {
                        isMaxIas = false;
                    }
                    rollback2++;
                    frames = waffengattung[weaponTypeNum][this.charactersSelected][0];
                    console.debug(frames);
                    if (isBarbTwoHandedSwordAsOneHanded) {
                        frames = 16;
                    }
                    rollback3 = this.calcFPA(frames, acceleration, 0);
                    if (rollback3 > this.calcFPA(frames, 175, 0)) {
                        isMaxIas = false;
                    }
                    if (isMaxIas) {
                        this.isCurrentFpaMaxed = true;
                    }
                    isMaxIas = true;
                    this.currentFpa = rollback1 + "/" + rollback2 + "/" + rollback2 + "/" + rollback2 + "/" + rollback3 + " frames per attack";
                    // Zeal
                    if (this.skillsSelected == 24) {
                        this.currentAps = parseInt(100 * 25 / ((rollback1 + rollback2 * 3 + rollback3) / 5)) / 100 + " attacks per second";
                    }
                }
            }
            // Strafe
            if (attackSkill.rollback == 50) {
                frames = aktionsframe[weapPrimary[2]][this.charactersSelected];
                if (acceleration > 149) {
                    acceleration = 149;
                }
                rollback1 = this.calcFPA(frames, acceleration, start);
                if (rollback1 > this.calcFPA(frames, 149, start)) {
                    isMaxIas = false;
                }
                rollback1++;
                rollbackframe = Math.floor(Math.floor((256 * start + Math.floor(256 * acceleration / 100) * rollback1) / 256) * attackSkill.rollback / 100);
                rollback2 = this.calcFPA(frames, acceleration, rollbackframe);
                if (rollback2 > this.calcFPA(frames, 149, rollbackframe)) {
                    isMaxIas = false;
                }
                rollback2++;
                rollbackframe = Math.floor(Math.floor((256 * rollbackframe + Math.floor(256 * acceleration / 100) * rollback2) / 256) * attackSkill.rollback / 100);
                rollback3 = this.calcFPA(frames, acceleration, rollbackframe);
                if (rollback3 > this.calcFPA(frames, 149, rollbackframe)) {
                    isMaxIas = false;
                }
                rollback3++;
                rollbackframe = Math.floor(Math.floor((256 * rollbackframe + Math.floor(256 * acceleration / 100) * rollback3) / 256) * attackSkill.rollback / 100);
                rollback4 = this.calcFPA(frames, acceleration, rollbackframe);
                if (rollback4 > this.calcFPA(frames, 149, rollbackframe)) {
                    isMaxIas = false;
                }
                rollback4++;
                frames = waffengattung[weapPrimary[2]][this.charactersSelected][0];
                rollbackframe = Math.floor(Math.floor((256 * rollbackframe + Math.floor(256 * acceleration / 100) * rollback4) / 256) * attackSkill.rollback / 100);
                rollback5 = this.calcFPA(frames, acceleration, rollbackframe);
                if (rollback5 > this.calcFPA(frames, 149, rollbackframe)) {
                    isMaxIas = false;
                }
                if ((rollback2 == 5) && (rollback3 == 4)) {
                    rollback3 = 5;
                    rollback5 = 13;
                }
                if (isMaxIas) {
                    this.isCurrentFpaMaxed = true;
                }
                isMaxIas = true;
                this.currentFpa = rollback1 + "/" + rollback2 + "/" + rollback3 + "/" + rollback4 + "/" + rollback5 + " frames per attack";
                this.currentAps = parseInt(100 * 25 / ((rollback1 + rollback2 + rollback3 * 4 + rollback4 * 3 + rollback5) / 10)) / 100 + " attacks per second";
            }
            // Fend
            if (attackSkill.rollback == 40) {
                frames = aktionsframe[weapPrimary[2]][this.charactersSelected];
                rollback1 = this.calcFPA(frames, acceleration, start);
                if (rollback1 > this.calcFPA(frames, 175, start)) {
                    isMaxIas = false;
                }
                rollback1++;
                rollbackframe = Math.floor(Math.floor((256 * start + Math.floor(256 * acceleration / 100) * rollback1) / 256) * attackSkill.rollback / 100);
                rollback2 = this.calcFPA(frames, acceleration, rollbackframe);
                if (rollback2 > this.calcFPA(frames, 175, rollbackframe)) {
                    isMaxIas = false;
                }
                rollback2++;
                frames = waffengattung[weapPrimary[2]][this.charactersSelected][0];
                rollbackframe = Math.floor(Math.floor((256 * rollbackframe + Math.floor(256 * acceleration / 100) * rollback2) / 256) * attackSkill.rollback / 100);
                rollback3 = this.calcFPA(frames, acceleration, rollbackframe);
                if (rollback3 > this.calcFPA(frames, 175, rollbackframe)) {
                    isMaxIas = false;
                }
                if (isMaxIas) {
                    this.isCurrentFpaMaxed = true;
                }
                isMaxIas = true;
                this.currentFpa = rollback1 + "/" + rollback2 + "/" + rollback3 + " frames per attack";
                this.currentAps = parseInt(100 * 25 / ((rollback1 + rollback2 + rollback3) / 2)) / 100 + " attacks per second";
            }
            // Most attacks
            if (attackSkill.rollback == 100) {
                this.currentFpa = ergebnis + " frames per attack";
                this.currentAps = parseInt(100 * 25 / ergebnis) / 100 + " attacks per second";
                if (this.charactersSelected > 6) {
                    this.currentAps = parseInt(100 * 25 / (ergebnis + 2)) / 100 + " attacks per second";
                }
                if (((this.charactersSelected == 8) && (this.skillsSelected == 3)) || ((this.charactersSelected == 9) && (this.skillsSelected == 0))) {
                    this.currentAps = parseInt(100 * 25 / (ergebnis + 1)) / 100 + " attacks per second";
                }
                // Shape Shifted && off-hand weapon not unarmed && standard attack
                if ((this.shapeShiftFormsSelected > 0) && (this.weaponsSecondarySelected > 0) && (this.skillsSelected == 0)) {
                    this.currentFpa = "Calculation makes no sense";
                    this.currentAps = "";
                }
            }
        },
        berechneEIAS: function () {
            if (this.weaponsPrimarySelected == 0) {
                IASprimaer = parseInt(this.iasOffWeapon);
            }
            if ((this.weaponsPrimarySelected > 0) && (this.weaponsSecondarySelected == 0)) {
                IASprimaer = parseInt(this.iasOffWeapon) + parseInt(this.iasWeaponPrimary);
            }
            if (this.weaponsSecondarySelected > 0) {
                IASprimaer = parseInt(this.iasOffWeapon) + parseInt(this.iasWeaponPrimary);
                IASsekundaer = parseInt(this.iasOffWeapon) + parseInt(this.iasWeaponPrimary);
            }
            EIASprimaer = Math.floor(120 * IASprimaer / (120 + IASprimaer));
            EIASsekundaer = Math.floor(120 * IASsekundaer / (120 + IASsekundaer));
        },
        berechneSIAS: function () {
            var fana = parseInt(this.fanaticismSkillIAS);
            var frenzy = parseInt(this.frenzySkillIAS);
            var wolf = parseInt(this.werewolfSkillIAS);
            var tempo = parseInt(this.burstOfSpeedSkillIAS);
            var holyfrost = parseInt(this.holyFreezeSkillIAS);
            var attackSkill = data.attack[this.skillsSelected];
            // != Wolf
            if (this.shapeShiftFormsSelected != 2) wolf = 0;
            SIAS = fana + frenzy + wolf + tempo - holyfrost;
            if (this.skillsSelected == 16) {
                SIAS = SIAS + 50;
            }
            if (this.skillsSelected == 13) {
                SIAS = SIAS - 40;
            }
            if (this.isDecrepify) {
                SIAS = SIAS - 50;
            }
            if ((attackSkill.animation == 7) && (this.charactersSelected < 7)) {
                SIAS = SIAS - 30;
            }
        },
        sanitiseSelected: function (selected, values) {
            if (typeof(values.find(v => v.value == selected)) === "undefined") selected = values[0].value;
            return selected;
        }
    },
    computed: {
        isPlayableClass: function () {
            return this.charactersSelected <= 6;
        },
        canDualWield: function () {
            if (this.charactersSelected == 1 || this.charactersSelected == 2) return true;
            return false;
        },
        canShapeShiftWerewolf: function () {
            if (this.charactersSelected == 2 || this.charactersSelected == 3) return true;
            return false;
        },
        shapeShiftForms: function () {
            var values = [
                { value: 0, text: 'Unchanged' },
            ];
            if (this.isPlayableClass) values.push({ value: 1, text: 'Werebear' });
            if (this.canShapeShiftWerewolf) values.push({ value: 2, text: 'Werewolf' });
            this.shapeShiftFormsSelected = this.sanitiseSelected(this.shapeShiftFormsSelected, values);
            return values;
        },
        fanaticism: function () {
            var values = [];
            for (i = 0; i <= 50; i++) {
                var v = Math.floor(Math.floor((110 * i) / (6 + i)) * (40 - 10) / 100) + 10;
                if (i == 0) {
                    v = 0;
                }
                values.push({ value: v, text: i });
            }
            return values;
        },
        frenzy: function () {
            if (this.charactersSelected == 2) { // barb
                return [
                    { value: 0,  text: 0 },
                    { value: 9,  text: 1 },
                    { value: 13, text: 2 },
                    { value: 15, text: 3 },
                    { value: 18, text: 4 },
                    { value: 20, text: 5 },
                    { value: 21, text: 6 },
                    { value: 22, text: 7 },
                    { value: 23, text: 8 },
                    { value: 24, text: 9 },
                    { value: 25, text: 10 },
                    { value: 26, text: 11 },
                    { value: 26, text: 12 },
                    { value: 27, text: 13 },
                    { value: 28, text: 14 },
                    { value: 28, text: 15 },
                    { value: 29, text: 16 },
                    { value: 29, text: 17 },
                    { value: 29, text: 18 },
                    { value: 29, text: 19 },
                    { value: 30, text: 20 },
                ];
            } else {
                return [{ value: 0, text: '-' }];
            }
        },
        canFrenzy: function() {
            return this.charactersSelected == 2;
        },
        canWerewolf: function() {
            return this.shapeShiftFormsSelected == 2;
        },
        werewolf: function () {
            if (this.canShapeShiftWerewolf) {
                return [
                    { value: 0,  text: 0 },
                    { value: 36, text: 1 },
                    { value: 45, text: 2 },
                    { value: 52, text: 3 },
                    { value: 58, text: 4 },
                    { value: 62, text: 5 },
                    { value: 66, text: 6 },
                    { value: 69, text: 7 },
                    { value: 71, text: 8 },
                    { value: 74, text: 9 },
                    { value: 76, text: 10 },
                    { value: 78, text: 11 },
                    { value: 79, text: 12 },
                    { value: 81, text: 13 },
                    { value: 82, text: 14 },
                    { value: 83, text: 15 },
                    { value: 85, text: 16 },
                    { value: 85, text: 17 },
                    { value: 86, text: 18 },
                    { value: 87, text: 19 },
                    { value: 88, text: 20 },
                ];
            } else {
                return [{ value: 0, text: '-' }];
            }
        },
        burstOfSpeed: function () {
            if (this.charactersSelected == 1) { // sin
                var values = [];
                for (i = 0; i <= 50; i++) {
                    var v = Math.floor(Math.floor((110 * i) / (6 + i)) * (60 - 15) / 100) + 15;
                    if (i == 0) {
                        v = 0;
                    }
                    values.push({ value: v, text: i });
                }
                return values;
            } else {
                return [{ value: 0, text: '-' }];
            }
        },
        canBurstOfSpeed: function() {
            return this.charactersSelected == 1;
        },
        holyFreeze: function () {
            return [
                { value: 0,  text: 0 },
                { value: 14, text: 1 },
                { value: 18, text: 2 },
                { value: 20, text: 3 },
                { value: 23, text: 4 },
                { value: 25, text: 5 },
                { value: 26, text: 6 },
                { value: 27, text: 7 },
                { value: 28, text: 8 },
                { value: 29, text: 9 },
                { value: 30, text: 10 },
                { value: 31, text: 11 },
                { value: 31, text: 12 },
                { value: 32, text: 13 },
                { value: 33, text: 14 },
                { value: 33, text: 15 },
                { value: 34, text: 16 },
                { value: 34, text: 17 },
                { value: 34, text: 18 },
                { value: 34, text: 19 },
                { value: 35, text: 20 },
            ];
        },
        weaponsPrimary: function() {
            var values = [];
            for (i = 0; i < lookupWeapon.length; i++) {
                // -1 all classes || this class's item 
                if ((lookupWeapon[i][3] < 0) || (lookupWeapon[i][3] == this.charactersSelected)) {
                    if (this.isPlayableClass
                        || i == 0 // unarmed
                        || (this.charactersSelected == 7  && (lookupWeapon[i][2] == 7 || lookupWeapon[i][2] == 8))   // Act 1 Merc - bow or xbow
                        || (this.charactersSelected == 8  && (lookupWeapon[i][4] == 8 || lookupWeapon[i][4] == 2))   // Act 2 Merc - pole or spear
                        || (this.charactersSelected == 9  &&  lookupWeapon[i][4] == 9)                               // Act 5 Merc - swords
                        || (this.charactersSelected == 10 &&  lookupWeapon[i][4] == 9 && lookupWeapon[i][2] == 2)    // Act 3 Merc - swords and one handed swinging
                    ) {
                        values.push({ value: i, text: lookupWeapon[i][0] });
                    }
                }
            }
            this.weaponsPrimarySelected = this.sanitiseSelected(this.weaponsPrimarySelected, values);
            return values;
        },
        isWeaponsPrimaryBarbHandednessNeeded: function() {
            return this.charactersSelected == 2 && lookupWeapon[this.weaponsPrimarySelected][2] == 3;
        },
        weaponsPrimaryBarbHandedness: function () {
            var values = [];
            if (this.isWeaponsPrimaryBarbHandednessNeeded) {
                values.push({ value: 0, text: 'two-handed' });
                values.push({ value: 1, text: 'single-handed' });
            } else {
                values.push({ value: -1, text: '-' });
            }
            return values;
        },
        weaponsSecondary: function () {
            var values = [];
            if (this.weaponsPrimarySelected == null) return values;
            switch (this.charactersSelected) {
                case 1: // sin
                    if (lookupWeapon[this.weaponsPrimarySelected][2] == 1) {
                        for (i = 0; i < lookupWeapon.length; i++) {
                            if ((lookupWeapon[i][3] == 1) || (lookupWeapon[i][2] == 0)) {
                                values.push({ value: i, text: lookupWeapon[i][0] });
                            }
                        }
                    } else {
                        values.push({ value: 0, text: '-' });
                    }
                    break;
                case 2: // barb
                    if ((lookupWeapon[this.weaponsPrimarySelected][2] == 2 || lookupWeapon[this.weaponsPrimarySelected][2] == 4) || (lookupWeapon[this.weaponsPrimarySelected][2] == 3 && this.weaponsPrimaryBarbHandednessSelected == 1)) {
                        for (i = 0; i < lookupWeapon.length; i++) {
                            if ((lookupWeapon[i][2] == 0) || (lookupWeapon[i][2] == 3) || (((lookupWeapon[i][2] == 2) || (lookupWeapon[i][2] == 4)) && (lookupWeapon[i][3] == -1))) {
                                values.push({ value: i, text: lookupWeapon[i][0] });
                            }
                        }
                    } else {
                        values.push({ value: 0, text: '-' });
                    }
                    break;
                default:
                    values.push({ value: 0, text: '-' });
                    break;
            }
            return values;
        },
        weaponInfoPrimary: function () {
            var weapon = this.weaponsPrimary.find(w => w.value == this.weaponsPrimarySelected);
            if (weapon != null) {
                return {
                    description: waffengattung[lookupWeapon[this.weaponsPrimarySelected][2]][11],
                    wsm: lookupWeapon[this.weaponsPrimarySelected][1],
                    value: this.weaponsPrimarySelected,
                    text: weapon.text,
                }
            }
            return {
                description: '',
                wsm: 0,
                value: 0,
                text: '',
            };
        },
        weaponInfoSecondary: function () {
            if (this.weaponsSecondarySelected != null) {
                var weapon = this.weaponsSecondary.find(w => w.value == this.weaponsSecondarySelected);
                if (weapon != null) {
                    return {
                        description: waffengattung[lookupWeapon[this.weaponsSecondarySelected][2]][11],
                        wsm: lookupWeapon[this.weaponsSecondarySelected][1],
                        value: this.weaponsSecondarySelected,
                        text: weapon.text,
                    }
                }
            }
            return {
                description: '',
                wsm: 0,
                value: 0,
                text: '',
            };
        },
        skills: function () {
            var values = [];
            var valuesNonNative = [];
            // optgroup1.label = "native attacks";
            // optgroup2.label = "non-class skills";
            switch (this.charactersSelected) {
                case 0: // Amazon
                    values.push(this.getSkillOptionData("Standard"));
                    if (this.shapeShiftFormsSelected == 0) {
                        if ((lookupWeapon[this.weaponsPrimarySelected][4] == 2) || (lookupWeapon[this.weaponsPrimarySelected][4] == 3)) {
                            values.push(this.getSkillOptionData("Throw"));
                        }
                        if (lookupWeapon[this.weaponsPrimarySelected][4] == 1) {
                            values.push(this.getSkillOptionData("Strafe"));
                        }
                        if ((lookupWeapon[this.weaponsPrimarySelected][4] == 2) || (lookupWeapon[this.weaponsPrimarySelected][2] == 5)) {
                            values.push(this.getSkillOptionData("Impale"));
                            values.push(this.getSkillOptionData("Jab"));
                            values.push(this.getSkillOptionData("Fend"));
                        }
                        if (lookupWeapon[this.weaponsPrimarySelected][5] == 1) {
                            valuesNonNative.push(this.getSkillOptionData("Zeal"));
                        }
                    }
                    break;
                case 1: // Assassin
                    values.push(this.getSkillOptionData("Standard"));
                    // not shapeshifted
                    if (this.shapeShiftFormsSelected == 0) {
                        if ((lookupWeapon[this.weaponsPrimarySelected][4] == 2) || (lookupWeapon[this.weaponsPrimarySelected][4] == 3)) {
                            values.push(this.getSkillOptionData("Throw"));
                        }
                        values.push(this.getSkillOptionData("Laying Traps"));
                        if (isAssasinClaw(this.weaponsPrimarySelected) || isDagger(this.weaponsPrimarySelected)) {
                            values.push(this.getSkillOptionData("Fists of Ember"));
                            values.push(this.getSkillOptionData("Fists of Thunder"));
                            values.push(this.getSkillOptionData("Blades of Ice"));
                        }
                        if ((lookupWeapon[this.weaponsPrimarySelected][2] == 1) && (lookupWeapon[this.weaponsSecondarySelected][2] == 1)) {
                            values.push(this.getSkillOptionData("Dragon Claw"));
                        }
                        values.push(this.getSkillOptionData("Dragon Tail"));
                        values.push(this.getSkillOptionData("Dragon Talon"));
                        // should be weapons that can be passion runeword || POD chaos, any sin claw
                        if (lookupWeapon[this.weaponsPrimarySelected][5] == 1 || isAssasinClaw(this.weaponsPrimarySelected)) {
                            valuesNonNative.push(this.getSkillOptionData("Zeal"));
                        }
                    }
                    break;
                case 2: // Barbarian
                    values.push(this.getSkillOptionData("Standard"));
                    if (this.shapeShiftFormsSelected == 0) {
                        // primary throwing weapon
                        if ((lookupWeapon[this.weaponsPrimarySelected][4] == 2) || (lookupWeapon[this.weaponsPrimarySelected][4] == 3)) {
                            values.push(this.getSkillOptionData("Throw"));
                        }
                        // offhand weapon
                        if (this.weaponsSecondarySelected > 0) {
                            values.push(this.getSkillOptionData("Double Swing"));
                            values.push(this.getSkillOptionData("Frenzy"));
                        }
                        // primary throwing and offhand throwing
                        if (((lookupWeapon[this.weaponsPrimarySelected][4] == 2) || (lookupWeapon[this.weaponsPrimarySelected][4] == 3)) && ((lookupWeapon[this.weaponsSecondarySelected][4] == 2) || (lookupWeapon[this.weaponsSecondarySelected][4] == 3))) {
                            values.push(this.getSkillOptionData("Double Throw"));
                        }
                        // not bow or xbow
                        if (lookupWeapon[this.weaponsPrimarySelected][4] != 1) {
                            values.push(this.getSkillOptionData("Whirlwind"));
                            values.push(this.getSkillOptionData("Concentrate"));
                            values.push(this.getSkillOptionData("Berserk"));
                            values.push(this.getSkillOptionData("Bash"));
                            values.push(this.getSkillOptionData("Stun"));
                            values.push(this.getSkillOptionData("Cleave"));
                        }
                        // can zeal
                        if ((lookupWeapon[this.weaponsPrimarySelected][5] == 1) || (lookupWeapon[this.weaponsSecondarySelected][5] == 1)) {
                            valuesNonNative.push(this.getSkillOptionData("Zeal"));
                        }
                    }
                    // bear barb
                    if (this.shapeShiftFormsSelected == 1) {
                        // not bow or xbow
                        if (lookupWeapon[this.weaponsPrimarySelected][4] != 1) {
                            values.push(this.getSkillOptionData("Cleave"));
                        }
                    }
                    // wolf barb
                    if (this.shapeShiftFormsSelected == 2) {
                        valuesNonNative.push(this.getSkillOptionData("Feral Rage"));
                        // not bow or xbow
                        if (lookupWeapon[this.weaponsPrimarySelected][4] != 1) {
                            values.push(this.getSkillOptionData("Cleave"));
                        }
                    }
                    break;
                case 3: // Druid
                    values.push(this.getSkillOptionData("Standard"));
                    if (this.shapeShiftFormsSelected == 0) {
                        if ((lookupWeapon[this.weaponsPrimarySelected][4] == 2) || (lookupWeapon[this.weaponsPrimarySelected][4] == 3)) {
                            values.push(this.getSkillOptionData("Throw"));
                        }
                        if (lookupWeapon[this.weaponsPrimarySelected][5] == 1) {
                            valuesNonNative.push(this.getSkillOptionData("Zeal"));
                        }
                    }
                    if (this.shapeShiftFormsSelected == 1) {
                        values.push(this.getSkillOptionData("Hunger"));
                    }
                    if (this.shapeShiftFormsSelected == 2) {
                        values.push(this.getSkillOptionData("Feral Rage"));
                        values.push(this.getSkillOptionData("Hunger"));
                        values.push(this.getSkillOptionData("Rabies"));
                        values.push(this.getSkillOptionData("Fury"));
                    }
                    break;
                case 5: // Paladin
                    values.push(this.getSkillOptionData("Standard"));
                    if (this.shapeShiftFormsSelected == 0) {
                        if ((lookupWeapon[this.weaponsPrimarySelected][4] == 2) || (lookupWeapon[this.weaponsPrimarySelected][4] == 3)) {
                            values.push(this.getSkillOptionData("Throw"));
                        }
                        // not bow or xbow
                        if (lookupWeapon[this.weaponsPrimarySelected][4] != 1) {
                            values.push(this.getSkillOptionData("Zeal"));
                            values.push(this.getSkillOptionData("Sacrifice"));
                            values.push(this.getSkillOptionData("Vengeance"));
                            values.push(this.getSkillOptionData("Conversion"));
                        }
                        if ((lookupWeapon[this.weaponsPrimarySelected][2] == 0) || (lookupWeapon[this.weaponsPrimarySelected][2] == 2) || (lookupWeapon[this.weaponsPrimarySelected][2] == 4)) {
                            values.push(this.getSkillOptionData("Smite"));
                        }
                    }
                    break;
                case 7: // Merc - Rogue
                    values.push(this.getSkillOptionData("Standard"));
                    break;
                case 8: // Merc - Town Guard
                    values.push(this.getSkillOptionData("Jab"));
                    values.push(this.getSkillOptionData("Standard"));
                    break;
                case 9: // Merc - Barbarian
                    values.push(this.getSkillOptionData("Bash"));
                    break;
                case 10: // Merc - Iron Wolves
                    values.push(this.getSkillOptionData("Vengeance"));
                    break;
                default: // Necromancer & Sorceress
                    values.push(this.getSkillOptionData("Standard"));
                    if (this.shapeShiftFormsSelected == 0) {
                        if ((lookupWeapon[this.weaponsPrimarySelected][4] == 2) || (lookupWeapon[this.weaponsPrimarySelected][4] == 3)) {
                            values.push(this.getSkillOptionData("Throw"));
                        }
                        if (lookupWeapon[this.weaponsPrimarySelected][5] == 1) {
                            valuesNonNative.push(this.getSkillOptionData("Zeal"));
                        }
                    }
                    break;
            }
            values.concat(valuesNonNative);
            this.skillsSelected = this.sanitiseSelected(this.skillsSelected, values);
            return values;
        },
        breakpoints: function () {
            var ergebnis; // result FPA
            var RBframe;
            var temp;
            var temp1;
            var OIAS = this.iasOffWeapon;
            var WIAS = this.iasWeaponPrimary;
            var attackSkill = data.attack[this.skillsSelected];
            this.berechneSIAS();
            this.berechneWSM();
            // if (fenster == false) {
            //     if (typeof(TabFenster) !== "undefined") TabFenster.close();
            // }
            // fenster = false;
            // Shape Shifted && (|| &&)
            // if ((this.shapeShiftFormsSelected > 0) && ((this.weaponsPrimarySelected == 0) || ((this.weaponsSecondarySelected > 0) && (this.skillsSelected == 0)))) {
            //     fenster = true;
            // }
            cap = 0;
            var breakpoints = [];
            var breakpoints1 = [];
            var breakpoints2 = [];
            var breakpointsAPS = [];
            var nonStandardWeapon = [];
            // Unshifted
            if (this.shapeShiftFormsSelected == 0) {
                temp1 = 0;
                if (((attackSkill.animation == 0)
                    || (attackSkill.animation == 2)
                    || (attackSkill.animation == 3)
                    || (attackSkill.animation == 4)
                    || (attackSkill.animation == 5)
                ) && (attackSkill.rollback == 100)) {
                    console.info("calc ias for most");
                    for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 175; i++) {
                        ergebnis = this.calcFPA(frames, i, start);
                        if ((temp1 != ergebnis) && (i - 100 - SIAS + WSMprimaer < 120)) {
                            breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - SIAS + WSMprimaer) / (120 - (i - 100 - SIAS + WSMprimaer))), ergebnis];
                            temp1 = ergebnis;
                        }
                    }
                }
                // standard attack animation && no secondary weapon && standard rollback
                if ((attackSkill.animation == 1) && (this.weaponsSecondarySelected == 0) && (attackSkill.rollback == 100)) {
                    console.info("calc ias for standard attack single");
                    for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 175; i++) {
                        frames = waffengattung[lookupWeapon[this.weaponsPrimarySelected][2]][this.charactersSelected][0];
                        if ((lookupWeapon[this.weaponsPrimarySelected][2] == 3) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                            frames = 16;
                        }
                        ergebnis = this.calcFPA(frames, i, start);
                        frames = waffengattung[lookupWeapon[this.weaponsPrimarySelected][2]][this.charactersSelected][1];
                        if ((lookupWeapon[this.weaponsPrimarySelected][2] == 3) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                            frames = 16;
                        }
                        temp = this.calcFPA(frames, i, start);
                        ergebnis = (ergebnis + temp) / 2;
                        if (this.charactersSelected == 9) {
                            ergebnis = ergebnis / 2;
                        }
                        if ((temp1 != ergebnis) && (i - 100 - SIAS + WSMprimaer < 120)) {
                            breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - SIAS + WSMprimaer) / (120 - (i - 100 - SIAS + WSMprimaer))), ergebnis];
                            temp1 = ergebnis;
                        }
                    }
                }
                // standard attack animation && secondary weapon selected && standard rollback
                if ((attackSkill.animation == 1) && (this.weaponsSecondarySelected > 0) && (attackSkill.rollback == 100)) {
                    console.info("calc ias for standard attack dual");
                    for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 175; i++) {
                        frames = waffengattung[lookupWeapon[this.weaponsPrimarySelected][2]][this.charactersSelected][0];
                        if ((lookupWeapon[this.weaponsPrimarySelected][2] == 3) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                            frames = 16;
                        }
                        ergebnis = this.calcFPA(frames, i, 0);
                        frames = waffengattung[lookupWeapon[this.weaponsPrimarySelected][2]][this.charactersSelected][1];
                        if ((lookupWeapon[this.weaponsPrimarySelected][2] == 3) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                            frames = 16;
                        }
                        temp = this.calcFPA(frames, i, 0);
                        ergebnis = (ergebnis + temp) / 2;
                        if ((temp1 != ergebnis) && (i - 100 - SIAS + WSMprimaer < 120)) {
                            breakpoints1[breakpoints1.length] = [Math.ceil(120 * (i - 100 - SIAS + WSMprimaer) / (120 - (i - 100 - SIAS + WSMprimaer))) - IASprimaer, ergebnis];
                            temp1 = ergebnis;
                        }
                        if ((breakpoints1.length > 1) && (breakpoints1[1][0] < 0) && (breakpoints1[0][0] == 0)) {
                            breakpoints1.reverse();
                            breakpoints1.length = breakpoints1.length - 1;
                            breakpoints1.reverse();
                        }
                        if ((breakpoints1.length > 0) && (breakpoints1[0][0] < 0)) {
                            breakpoints1[0][0] = 0;
                        }
                    }
                    temp1 = 0;
                    for (i = Math.max(100 + SIAS - WSMsekundaer, 15); i <= 175; i++) {
                        ergebnis = this.calcFPA(12, i, 0);
                        if ((temp1 != ergebnis) && (i - 100 - SIAS + WSMsekundaer < 120)) {
                            breakpoints2[breakpoints2.length] = [Math.ceil(120 * (i - 100 - SIAS + WSMsekundaer) / (120 - (i - 100 - SIAS + WSMsekundaer))) - IASsekundaer, ergebnis];
                            temp1 = ergebnis;
                        }
                        if ((breakpoints2.length > 1) && (breakpoints2[1][0] < 0) && (breakpoints2[0][0] == 0)) {
                            breakpoints2.reverse();
                            breakpoints2.length = breakpoints2.length - 1;
                            breakpoints2.reverse();
                        }
                        if ((breakpoints2.length > 0) && (breakpoints2[0][0] < 0)) {
                            breakpoints2[0][0] = 0;
                        }
                    }
                    var IASmax1 = breakpoints1[breakpoints1.length - 1][0]
                    console.log(breakpoints2);
                    var IASmax2 = breakpoints2[breakpoints2.length - 1][0]
                    for (i = 0; i <= Math.max(IASmax1, IASmax2); i++) {
                        if ((breakpoints1.length > 1) && (breakpoints1[1][0] == i)) {
                            breakpoints1.reverse();
                            breakpoints1.length = breakpoints1.length - 1;
                            breakpoints1.reverse();
                        }
                        if ((breakpoints2.length > 1) && (breakpoints2[1][0] == i)) {
                            breakpoints2.reverse();
                            breakpoints2.length = breakpoints2.length - 1;
                            breakpoints2.reverse();
                        }
                        if ((breakpoints1[0][0] == i) || (breakpoints2[0][0] == i)) {
                            breakpoints[breakpoints.length] = [i, (breakpoints1[0][1] + breakpoints2[0][1]) / 2];
                        }
                    }
                }
                // Impale, Jab, Dragon Claw, Double Swing, Frenzy, Double Throw && not Whirlwind
                if ((attackSkill.animation == 7) && (this.skillsSelected != 19)) {
                    console.info("calc ias for animation 7");
                    for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 175; i++) {
                        ergebnis = this.calcFPA(frames, i, 0);
                        ergebnis++;
                        if ((this.skillsSelected == 3) && (this.charactersSelected < 7)) {
                            ergebnis = parseInt(100 * ergebnis / 3) / 100;
                        }
                        if (this.charactersSelected == 8) {
                            ergebnis = ergebnis / 2;
                        }
                        if ((this.skillsSelected > 15) && (this.skillsSelected < 19)) {
                            ergebnis = ergebnis / 2;
                        }
                        if ((this.skillsSelected > 8) && (this.skillsSelected < 13) && (this.weaponsSecondarySelected > 0)) {
                            ergebnis = ergebnis / 2;
                        }
                        if ((temp1 != ergebnis) && (i - 100 - SIAS + WSMprimaer < 120)) {
                            breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - SIAS + WSMprimaer) / (120 - (i - 100 - SIAS + WSMprimaer))), ergebnis];
                            temp1 = ergebnis;
                        }
                    }
                }
                if (attackSkill.title == 'Whirlwind') {
                    console.info("calc ias for whirlwind");
                    breakpoints[breakpoints.length] = [0, 4]; // classic whirlwind locked at 4fpa
                }
                // Dragon Talon, Zeal. Fury handled under wearform
                if (attackSkill.rollback == 0) {
                    console.info("calc ias for multiple attacks");
                    for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 175; i++) {
                        if (attackSkill.title == 'Dragon Talon') {
                            frames = 4;
                        }
                        if (attackSkill.title == 'Zeal') {
                            frames = aktionsframe[lookupWeapon[this.weaponsPrimarySelected][2]][this.charactersSelected];
                        }
                        if ((lookupWeapon[this.weaponsPrimarySelected][2] == 3) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                            frames = 7;
                        }
                        rollback1 = this.calcFPA(frames, i, start);
                        rollback1++;
                        rollback2 = this.calcFPA(frames, i, 0);
                        rollback2++;
                        if (attackSkill.title == 'Dragon Talon') {
                            frames = 13;
                        }
                        if (attackSkill.title == 'Zeal') {
                            frames = waffengattung[lookupWeapon[this.weaponsPrimarySelected][2]][this.charactersSelected][0];
                        }
                        if ((lookupWeapon[this.weaponsPrimarySelected][2] == 3) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                            frames = 16;
                        }
                        rollback3 = this.calcFPA(frames, i, 0);
                        ergebnis = rollback1 + rollback2 + rollback3;
                        if ((temp1 != ergebnis) && (i - 100 - SIAS + WSMprimaer < 120)) {
                            breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - SIAS + WSMprimaer) / (120 - (i - 100 - SIAS + WSMprimaer))), rollback1 + "/" + rollback2 + "/" + rollback2 + "/" + rollback2 + "/" + rollback3];
                            breakpointsAPS[breakpointsAPS.length] = parseInt(2500 / ((rollback1 + rollback2 * 3 + rollback3) / 5)) / 100;
                            temp1 = ergebnis;
                        }
                    }
                }
                if (attackSkill.title == 'Strafe') {
                    console.info("calc ias for strafe");
                    for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 149; i++) {
                        frames = aktionsframe[lookupWeapon[this.weaponsPrimarySelected][2]][this.charactersSelected];
                        rollback1 = this.calcFPA(frames, i, start);
                        rollback1++;
                        RBframe = Math.floor(Math.floor((256 * start + Math.floor(256 * i / 100) * rollback1) / 256) * attackSkill.rollback / 100);
                        rollback2 = this.calcFPA(frames, i, RBframe);
                        rollback2++;
                        RBframe = Math.floor(Math.floor((256 * RBframe + Math.floor(256 * i / 100) * rollback2) / 256) * attackSkill.rollback / 100);
                        rollback3 = this.calcFPA(frames, i, RBframe);
                        rollback3++;
                        RBframe = Math.floor(Math.floor((256 * RBframe + Math.floor(256 * i / 100) * rollback3) / 256) * attackSkill.rollback / 100);
                        rollback4 = this.calcFPA(frames, i, RBframe);
                        rollback4++;
                        frames = waffengattung[lookupWeapon[this.weaponsPrimarySelected][2]][this.charactersSelected][0];
                        RBframe = Math.floor(Math.floor((256 * RBframe + Math.floor(256 * i / 100) * rollback4) / 256) * attackSkill.rollback / 100);
                        rollback5 = this.calcFPA(frames, i, RBframe);
                        if ((rollback2 == rollback3) || (rollback3 == rollback4)) {
                            ergebnis = rollback1 + rollback2 + rollback3 + rollback4 + rollback5;
                        }
                        if (temp1 != ergebnis) {
                            breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - SIAS + WSMprimaer) / (120 - (i - 100 - SIAS + WSMprimaer))), rollback1 + "/" + rollback2 + "/" + rollback3 + "/" + rollback4 + "/" + rollback5];
                            breakpointsAPS[breakpointsAPS.length] = parseInt(2500 / ((rollback1 + rollback2 + rollback3 * 4 + rollback4 * 3 + rollback5) / 10)) / 100;
                            temp1 = ergebnis;
                        }
                    }
                }
                if (attackSkill.title == 'Fend') {
                    console.info("calc ias for fend");
                    for (i = Math.max(100 + SIAS - WSMprimaer, 15); i <= 175; i++) {
                        frames = aktionsframe[lookupWeapon[this.weaponsPrimarySelected][2]][this.charactersSelected];
                        rollback1 = this.calcFPA(frames, i, start);
                        rollback1++;
                        RBframe = Math.floor(Math.floor((256 * start + Math.floor(256 * i / 100) * rollback1) / 256) * attackSkill.rollback / 100);
                        rollback2 = this.calcFPA(frames, i, RBframe);
                        rollback2++;
                        frames = waffengattung[lookupWeapon[this.weaponsPrimarySelected][2]][this.charactersSelected][0];
                        RBframe = Math.floor(Math.floor((256 * RBframe + Math.floor(256 * i / 100) * rollback2) / 256) * attackSkill.rollback / 100);
                        rollback3 = this.calcFPA(frames, i, RBframe);
                        ergebnis = rollback1 + rollback2 + rollback3;
                        if (temp1 != ergebnis) {
                            breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - SIAS + WSMprimaer) / (120 - (i - 100 - SIAS + WSMprimaer))), rollback1 + "/" + rollback2 + "/" + rollback3];
                            breakpointsAPS[breakpointsAPS.length] = parseInt(2500 / ((rollback1 + rollback2 + rollback3) / 3)) / 100;
                            temp1 = ergebnis;
                        }
                    }
                }
            }
            // wereform table
            if (this.shapeShiftFormsSelected > 0) {
                while (parseInt(OIAS / 5) != parseFloat(OIAS / 5)) {
                    OIAS--;
                }
                // duel wield && standard attack animation)
                if ((this.weaponsSecondarySelected > 0) && (attackSkill.animation == 1)) {
                    alert("There's a problem regarding the standard attack while using two weapons in wereform, so that speed won't be calculated here.");
                } else {
                    frames = waffengattung[lookupWeapon[this.weaponsPrimarySelected][2]][this.charactersSelected][0];
                    if (lookupWeapon[this.weaponsPrimarySelected][2] == 3) {
                        frames = waffengattung[2][this.charactersSelected][0];
                    }
                    var AnimSpeed = 256;
                    if (lookupWeapon[this.weaponsPrimarySelected][2] == 1) { // assasin claws?
                        AnimSpeed = 208;
                    }
                    var iasRows = 50; // x + 1 rows shown. increased from 24 to show higher ias values
                    for (i = 0; i <= iasRows; i++) {
                        for (j = 0; j <= 14; j++) {
                            if (attackSkill.title == 'Feral Rage') {
                                breakpoints[breakpoints.length] = Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100)) + Math.ceil((256 * 13 - Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100) * Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100))) / (2 * Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100))) - 1;
                                if ((OIAS > 70) && (j == 0)) {
                                    breakpoints2[breakpoints2.length] = Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100)) + Math.ceil((256 * 13 - Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100) * Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100))) / (2 * Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100))) - 1;
                                }
                            }
                            if (attackSkill.title == 'Fury') {
                                temp = (Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100)) * 4 + Math.ceil(256 * 13 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100)) - 1) / 5;
                                if (parseInt(temp) == parseFloat(temp)) {
                                    temp = temp + ".0";
                                }
                                breakpoints[breakpoints.length] = temp;
                                if ((OIAS > 70) && (j == 0)) {
                                    temp = (Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100)) * 4 + Math.ceil(256 * 13 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100)) - 1) / 5;
                                    if (parseInt(temp) == parseFloat(temp)) {
                                        temp = temp + ".0";
                                    }
                                    breakpoints2[breakpoints2.length] = temp;
                                }
                            }
                            if ((attackSkill.title != 'Feral Rage') && (attackSkill.title != 'Fury')) {
                                var tempframe = 12;
                                var tempframe2 = 10;
                                // Bear
                                if (this.shapeShiftFormsSelected == 2) {
                                    tempframe = 13;
                                    tempframe2 = 9;
                                }
                                if (attackSkill.animation == 6) {
                                    tempframe = 10;
                                }
                                breakpoints[breakpoints.length] = Math.ceil(256 * tempframe / Math.floor(Math.floor(256 * tempframe2 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * AnimSpeed / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100)) - 1;
                                if ((OIAS > 70) && (j == 0)) {
                                    breakpoints2[breakpoints2.length] = Math.ceil(256 * tempframe / Math.floor(Math.floor(256 * tempframe2 / Math.floor(256 * frames / Math.floor((100 + 5 * i - WSMprimaer) * AnimSpeed / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100)) - 1;
                                }
                            }
                        }
                    }
                    // add current ias breakpoints if not a multiple of 5
                    for (k = 0; k <= 14; k++) {
                        if ((parseInt(WIAS / 5) != parseFloat(WIAS / 5)) && (this.skillsSelected == 26)) {
                            nonStandardWeapon.push(Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + parseInt(WIAS) - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 15), 175) / 100)) + Math.ceil((256 * 13 - Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + parseInt(WIAS) - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 15), 175) / 100) * Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + parseInt(WIAS) - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 15), 175) / 100))) / (2 * Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + parseInt(WIAS) - WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 15), 175) / 100))) - 1);
                        }
                        if ((parseInt(WIAS / 5) != parseFloat(WIAS / 5)) && (this.skillsSelected == 29)) {
                            temp = (Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + parseInt(WIAS) - WSMprimaer) * 256 / 100))) * Math.min(100 - WSMprimaer + SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 175) / 100)) * 4 + Math.ceil(256 * 13 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * frames / Math.floor((100 + parseInt(WIAS) - WSMprimaer) * 256 / 100))) * Math.min(100 - WSMprimaer + SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 175) / 100)) - 1) / 5;
                            if (parseInt(temp) == parseFloat(temp)) {
                                temp = temp + ".0";
                            }
                            nonStandardWeapon.push(temp);
                        }
                        if ((parseInt(WIAS / 5) != parseFloat(WIAS / 5)) && (this.skillsSelected != 26) && (this.skillsSelected != 29)) {
                            nonStandardWeapon.push(Math.ceil(256 * tempframe / Math.floor(Math.floor(256 * tempframe2 / Math.floor(256 * frames / Math.floor((100 + parseInt(WIAS) - WSMprimaer) * AnimSpeed / 100))) * Math.min(Math.max(100 - WSMprimaer + SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 15), 175) / 100)) - 1)
                        }
                    }
                }
            }
            cap = 1;
            return {
                breakpoints: breakpoints,
                breakpoints1: breakpoints1,
                nonStandardOffWeapon: breakpoints2,
                breakpointsAPS: breakpointsAPS,
                nonStandardWeapon: nonStandardWeapon,
                oIas: OIAS,
            }
        }
    }
});

app.updateCurrent();
