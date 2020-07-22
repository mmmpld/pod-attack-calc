var frames;
var start = 1; // starting frame
var statischFana = true;
var statischFrost = true;
var statischIAS = true;
var mIAS = 1; // IAS drop down interval
var statischWaffe = true;
var statischZweitwaffe = true;
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

// "weapon type"
// first level is weapon "type" from lookupweapon
// second level is char class value, or [11] for the description
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

// first level attackSkill.sequence
// second level weaponType
var sequences = [
    [ 0,  0,  0,  0, 21, 24, 0, 0, 0],
    [ 0,  0,  0,  0, 18, 21, 0, 0, 0],
    [12, 12, 16,  0,  0,  0, 0, 0, 0],
    [ 0,  0, 17, 17, 17,  0, 0, 0, 0],
    [ 0,  0, 12,  0, 12,  0, 0, 0, 0]
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

var lookupWeapon = [
    {name: "[unarmed]",           wsm:  0, type:0, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Ancient Axe",         wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Ancient Sword",       wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Arbalest",            wsm:-10, type:8, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Archon Staff",        wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Ashwood Bow",         wsm:  0, type:7, classItem: 0, weaponCategory:1, canZeal:false},
    {name: "Ataghan",             wsm:-20, type:2, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Axe",                 wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Balanced Axe",        wsm:-10, type:2, classItem:-1, weaponCategory:3, canZeal:false},
    {name: "Balanced Knife",      wsm:-20, type:4, classItem:-1, weaponCategory:3, canZeal:false},
    {name: "Ballista",            wsm: 10, type:8, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Balrog Blade",        wsm:  0, type:3, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Balrog Spear",        wsm: 10, type:4, classItem:-1, weaponCategory:2, canZeal:false},
    {name: "Barbed Club",         wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Bardiche",            wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:false},
    {name: "Bastard Sword",       wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Battle Axe",          wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Battle Cestus",       wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Battle Dart",         wsm:  0, type:4, classItem:-1, weaponCategory:3, canZeal:false},
    {name: "Battle Hammer",       wsm: 20, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Battle Scythe",       wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Battle Staff",        wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Battle Sword",        wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Bearded Axe",         wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Bec-de-Corbin",       wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Berserker Axe",       wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Bill",                wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Blade Bow",           wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Blade Talons",        wsm:-20, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Blade",               wsm:-10, type:4, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Bone Knife",          wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Bone Wand",           wsm:-20, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Brandistock",         wsm:-20, type:5, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Broad Axe",           wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Broad Sword",         wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Burnt Wand",          wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Caduceus",            wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Cedar Bow",           wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Cedar Staff",         wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Ceremonial Bow",      wsm: 10, type:7, classItem: 0, weaponCategory:1, canZeal:false},
    {name: "Ceremonial Javelin",  wsm:-10, type:4, classItem: 0, weaponCategory:2, canZeal:false},
    {name: "Ceremonial Pike",     wsm: 20, type:5, classItem: 0, weaponCategory:8, canZeal:true},
    {name: "Ceremonial Spear",    wsm:  0, type:5, classItem: 0, weaponCategory:8, canZeal:true},
    {name: "Cestus",              wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Champion Axe",        wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Champion Sword",      wsm:-10, type:3, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Chu-Ko-Nu",           wsm:-60, type:8, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Cinquedeas",          wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Clasped Orb",         wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:false},
    {name: "Claws",               wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Claymore",            wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Cleaver",             wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Cloudy Sphere",       wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:false},
    {name: "Club",                wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Colossus Blade",      wsm:  5, type:3, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Colossus Crossbow",   wsm: 10, type:8, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Colossus Sword",      wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Colossus Voulge",     wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Composite Bow",       wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Conquest Sword",      wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Crossbow",            wsm:  0, type:8, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Crowbill",            wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Crusader Bow",        wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Cryptic Axe",         wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Cryptic Sword",       wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Crystal Sword",       wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Crystalline Globe",   wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:false},
    {name: "Cudgel",              wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Cutlass",             wsm:-30, type:2, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Dacian Falx",         wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Dagger",              wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Decapitator",         wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Demon Crossbow",      wsm:-60, type:8, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Demon Heart",         wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:false},
    {name: "Devil Star",          wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Diamond Bow",         wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Dimensional Blade",   wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Dimensional Shard",   wsm: 10, type:2, classItem: 6, weaponCategory:0, canZeal:false},
    {name: "Dirk",                wsm:  0, type:4, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Divine Scepter",      wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Double Axe",          wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Double Bow",          wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Eagle Orb",           wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:false},
    {name: "Edge Bow",            wsm:  5, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Elder Staff",         wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Eldritch Orb",        wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:false},
    {name: "Elegant Blade",       wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Espandon",            wsm:  0, type:3, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Ettin Axe",           wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Executioner Sword",   wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Falcata",             wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Falchion",            wsm: 20, type:2, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Fanged Knife",        wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Fascia",              wsm: 10, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Feral Axe",           wsm:-15, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Feral Claws",         wsm:-20, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Flail",               wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Flamberge",           wsm:-10, type:3, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Flanged Mace",        wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Flying Axe",          wsm: 10, type:2, classItem:-1, weaponCategory:3, canZeal:false},
    {name: "Francisca",           wsm: 10, type:2, classItem:-1, weaponCategory:3, canZeal:false},
    {name: "Fuscina",             wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Ghost Glaive",        wsm: 20, type:4, classItem:-1, weaponCategory:2, canZeal:false},
    {name: "Ghost Spear",         wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Ghost Wand",          wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Giant Axe",           wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Giant Sword",         wsm:  0, type:3, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Giant Thresher",      wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Gladius",             wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Glaive",              wsm: 20, type:4, classItem:-1, weaponCategory:2, canZeal:false},
    {name: "Glorious Axe",        wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Glowing Orb",         wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:false},
    {name: "Gnarled Staff",       wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Gorgon Crossbow",     wsm:  0, type:8, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Gothic Axe",          wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Gothic Bow",          wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Gothic Staff",        wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Gothic Sword",        wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Grand Matron Bow",    wsm: 10, type:7, classItem: 0, weaponCategory:1, canZeal:false},
    {name: "Grand Scepter",       wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Grave Wand",          wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Great Axe",           wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Great Bow",           wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Great Maul",          wsm: 20, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Great Pilum",         wsm:  0, type:4, classItem:-1, weaponCategory:2, canZeal:false},
    {name: "Great Poleaxe",       wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Great Sword",         wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Greater Claws",       wsm:-20, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Greater Talons",      wsm:-30, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Grim Scythe",         wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Grim Wand",           wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Halberd",             wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Hand Axe",            wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Hand Scythe",         wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Harpoon",             wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:false},
    {name: "Hatchet Hands",       wsm: 10, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Hatchet",             wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Heavenly Stone",      wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:false},
    {name: "Heavy Crossbow",      wsm: 10, type:8, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Highland Blade",      wsm: -5, type:3, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Holy Water Sprinkler",wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Hunter's Bow",        wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Hurlbat",             wsm:-10, type:2, classItem:-1, weaponCategory:3, canZeal:false},
    {name: "Hydra Bow",           wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Hydra Edge",          wsm: 10, type:2, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Hyperion Javelin",    wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:false},
    {name: "Hyperion Spear",      wsm:-10, type:5, classItem:-1, weaponCategory:8, canZeal:false},
    {name: "Jagged Star",         wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Jared's Stone",       wsm: 10, type:2, classItem: 6, weaponCategory:0, canZeal:false},
    {name: "Javelin",             wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:false},
    {name: "Jo Staff",            wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Katar",               wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Knout",               wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Kris",                wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Lance",               wsm: 20, type:5, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Large Axe",           wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Large Siege Bow",     wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Legend Spike",        wsm:-10, type:4, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Legend Sword",        wsm:-15, type:3, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Legendary Mallet",    wsm: 20, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Lich Wand",           wsm:-20, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Light Crossbow",      wsm:-10, type:8, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Lochaber Axe",        wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:false},
    {name: "Long Battle Bow",     wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Long Bow",            wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Long Staff",          wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Long Sword",          wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Long War Bow",        wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Mace",                wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Maiden Javelin",      wsm:-10, type:4, classItem: 0, weaponCategory:2, canZeal:false},
    {name: "Maiden Pike",         wsm: 10, type:5, classItem: 0, weaponCategory:8, canZeal:true},
    {name: "Maiden Spear",        wsm:  0, type:5, classItem: 0, weaponCategory:8, canZeal:true},
    {name: "Mancatcher",          wsm:-20, type:5, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Martel de Fer",       wsm: 20, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Matriarchal Bow",     wsm:-10, type:7, classItem: 0, weaponCategory:1, canZeal:false},
    {name: "Matriarchal Javelin", wsm:-10, type:4, classItem: 0, weaponCategory:2, canZeal:false},
    {name: "Matriarchal Pike",    wsm: 20, type:5, classItem: 0, weaponCategory:8, canZeal:true},
    {name: "Matriarchal Spear",   wsm:  0, type:5, classItem: 0, weaponCategory:8, canZeal:true},
    {name: "Maul",                wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Mighty Scepter",      wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Military Axe",        wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Military Pick",       wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Mithril Point",       wsm:  0, type:4, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Morning Star",        wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Mythical Sword",      wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Naga",                wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Ogre Axe",            wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:false},
    {name: "Ogre Maul",           wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Partizan",            wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Pellet Bow",          wsm:-10, type:8, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Petrified Wand",      wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Phaseblade",          wsm:-30, type:2, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Pike",                wsm: 20, type:5, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Pilum",               wsm:  0, type:4, classItem:-1, weaponCategory:2, canZeal:false},
    {name: "Poignard",            wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Poleaxe",             wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Polished Wand",       wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Quarterstaff",        wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Quhab",               wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Razor Bow",           wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Reflex Bow",          wsm: 10, type:7, classItem: 0, weaponCategory:1, canZeal:false},
    {name: "Reinforced Mace",     wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Repeating Crossbow",  wsm:-40, type:8, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Rondel",              wsm:  0, type:4, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Rune Bow",            wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Rune Scepter",        wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Rune Staff",          wsm: 20, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Rune Sword",          wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Runic Talons",        wsm:-30, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Sabre",               wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Sacred Globe",        wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:false},
    {name: "Scepter",             wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Scimitar",            wsm:-20, type:2, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Scissors Katar",      wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Scissors Quhab",      wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Scissors Suwayyah",   wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Scourge",             wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Scythe",              wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Seraph Rod",          wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Shadow Bow",          wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Shamshir",            wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Shillelagh",          wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Short Battle Bow",    wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Short Bow",           wsm:  5, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Short Siege Bow",     wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Short Spear",         wsm: 10, type:4, classItem:-1, weaponCategory:2, canZeal:false},
    {name: "Short Staff",         wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Short Sword",         wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Short War Bow",       wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Siege Crossbow",      wsm:  0, type:8, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Silver-edged Axe",    wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Simbilan",            wsm: 10, type:4, classItem:-1, weaponCategory:2, canZeal:false},
    {name: "Small Crescent",      wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Smoked Sphere",       wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:false},
    {name: "Sparkling Ball",      wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:false},
    {name: "Spear",               wsm:-10, type:5, classItem:-1, weaponCategory:8, canZeal:false},
    {name: "Spetum",              wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Spiculum",            wsm: 20, type:4, classItem:-1, weaponCategory:2, canZeal:false},
    {name: "Spider Bow",          wsm:  5, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Spiked Club",         wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Stag Bow",            wsm:  0, type:7, classItem: 0, weaponCategory:1, canZeal:false},
    {name: "Stalagmite",          wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Stiletto",            wsm:-10, type:4, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Stygian Pike",        wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Stygian Pilum",       wsm:  0, type:4, classItem:-1, weaponCategory:2, canZeal:false},
    {name: "Suwayyah",            wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Swirling Crystal",    wsm: 10, type:2, classItem: 6, weaponCategory:0, canZeal:false},
    {name: "Tabar",               wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Thresher",            wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Throwing Axe",        wsm: 10, type:2, classItem:-1, weaponCategory:3, canZeal:false},
    {name: "Throwing Knife",      wsm:  0, type:4, classItem:-1, weaponCategory:3, canZeal:false},
    {name: "Throwing Spear",      wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:false},
    {name: "Thunder Maul",        wsm: 20, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Tomahawk",            wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Tomb Wand",           wsm:-20, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Trident",             wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Truncheon",           wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Tulwar",              wsm: 20, type:2, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Tusk Sword",          wsm:  0, type:3, classItem:-1, weaponCategory:9, canZeal:true},
    {name: "Twin Axe",            wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "Two-Handed Sword",    wsm:  0, type:3, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Tyrant Club",         wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Unearthed Wand",      wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Vortex Orb",          wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:false},
    {name: "Voulge",              wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Walking Stick",       wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Wand",                wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "War Axe",             wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "War Club",            wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "War Dart",            wsm:-20, type:4, classItem:-1, weaponCategory:3, canZeal:false},
    {name: "War Fist",            wsm: 10, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "War Fork",            wsm:-20, type:5, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "War Hammer",          wsm: 20, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "War Javelin",         wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:false},
    {name: "War Pike",            wsm: 20, type:5, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "War Scepter",         wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "War Scythe",          wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "War Spear",           wsm:-10, type:5, classItem:-1, weaponCategory:8, canZeal:false},
    {name: "War Spike",           wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "War Staff",           wsm: 20, type:6, classItem:-1, weaponCategory:0, canZeal:true},
    {name: "War Sword",           wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:false},
    {name: "Ward Bow",            wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false},
    {name: "Winged Axe",          wsm:-10, type:2, classItem:-1, weaponCategory:3, canZeal:false},
    {name: "Winged Harpoon",      wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:false},
    {name: "Winged Knife",        wsm:-20, type:4, classItem:-1, weaponCategory:3, canZeal:false},
    {name: "Wrist Blade",         wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Wrist Spike",         wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Wrist Sword",         wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:false},
    {name: "Yari",                wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:true},
    {name: "Yew Wand",            wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false},
    {name: "Zweihander",          wsm:-10, type:3, classItem:-1, weaponCategory:9, canZeal:true}
];

function isDagger(weaponId) {
    var weap = lookupWeapon[weaponId];
    if (weap.type == weaponTypes.oneHandedThrustingWeapon && weap.weaponCategory == weaponCategories.other) {
        return true;
    }
    return false;
}

function isAssasinClaw(weaponId) {
    var weap = lookupWeapon[weaponId];
    return weap.type == weaponTypes.claw;
}

function isBowOrXbow(weaponId) {
    var weap = lookupWeapon[weaponId];
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
            this.calculateValues();
        },
        getSkillOptionData: function (title) {
            var skill = data.attack.find(a => a.title === title);
            return { value: skill.index, text: skill.title };
        },
        calculateSkillIas: function () {
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
        calculateWsm: function () {
            var weapPrimary = lookupWeapon[this.weaponsPrimarySelected];
            var weapSecondary = lookupWeapon[this.weaponsSecondarySelected];
            // not assasin and not barbarian
            if ((this.charactersSelected != 1) && (this.charactersSelected != 2)) {
                WSMprimaer = weapPrimary.wsm;
            }
            // (assasin or barbarian) and no offhand weapon
            if (((this.charactersSelected == 1) || (this.charactersSelected == 2)) && (this.weaponsSecondarySelected == 0)) {
                WSMprimaer = weapPrimary.wsm;
            }
            // (assasin or barbarian) with offhand weapon
            if (((this.charactersSelected == 1) || (this.charactersSelected == 2)) && (this.weaponsSecondarySelected > 0)) {
                if (this.isWsmBug) {
                    console.log('applying wsm bug');
                    WSMprimaer = parseInt((weapPrimary.wsm + weapSecondary.wsm) / 2) + weapPrimary.wsm - weapSecondary.wsm;
                    WSMsekundaer = parseInt((weapPrimary.wsm + weapSecondary.wsm) / 2);
                } else {
                    WSMprimaer = parseInt((weapPrimary.wsm + weapSecondary.wsm) / 2);
                    WSMsekundaer = parseInt((weapPrimary.wsm + weapSecondary.wsm) / 2) + weapSecondary.wsm - weapPrimary.wsm;
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
            if ((this.charactersSelected == 1) && (weapPrimary.type == weaponTypes.claw)) {
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
                if (weapPrimary.type == weaponTypes.twoHandedSword) { // 2-hand swords
                    FramesPerDirection = waffengattung[2][this.charactersSelected][0]; //1-hand swinging weapon
                }
                AnimationSpeed = Math.floor(256 * 10 / Math.floor(256 * FramesPerDirection / Math.floor((100 + IASprimaer - parseInt(this.iasOffWeapon) - weapPrimary.wsm) * AnimationSpeed / 100)));
                FramesPerDirection = 12;
                if (attackSkill.animation == 6) {
                    FramesPerDirection = 10;
                }
                StartingFrame = 0;
            }
            // Wolf
            if (this.shapeShiftFormsSelected == 2) {
                if (weapPrimary.type == weaponTypes.twoHandedSword) { // 2-hand swords
                    FramesPerDirection = waffengattung[2][this.charactersSelected][0]; //1-hand swinging weapon
                }
                AnimationSpeed = Math.floor(256 * 9 / Math.floor(256 * FramesPerDirection / Math.floor((100 + IASprimaer - parseInt(this.iasOffWeapon) - weapPrimary.wsm) * AnimationSpeed / 100)));
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
        calculateValues: function () {
            var weapPrimary = lookupWeapon[this.weaponsPrimarySelected];
            var ergebnis; // "result" FPA
            var temp;
            var attackSkill = data.attack[this.skillsSelected];
            console.debug('Calculating breakpoints for: ' + attackSkill.title);
            this.calculateSkillIas();
            this.calculateEffectiveIas();
            this.calculateWsm();
            var acceleration = Math.max(Math.min(100 + SIAS + EIASprimaer - WSMprimaer, 175), 15);
            var acceleration2 = Math.max(Math.min(100 + SIAS + EIASsekundaer - WSMsekundaer, 175), 15);
            start = 0;
            if (((this.charactersSelected == 0) || (this.charactersSelected == 6)) && (attackSkill.animation < 2)) {
                start = startframe[weapPrimary.type];
            }
            if (((attackSkill.animation == 0) || (attackSkill.animation == 6)) && (attackSkill.rollback == 100)) {
                frames = waffengattung[weapPrimary.type][this.charactersSelected][0];
                if ((weapPrimary.type == weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                    frames = 16;
                }
                ergebnis = this.calcFPA(frames, acceleration, start);
            }
            // standard attack
            if ((attackSkill.animation == 1) && (attackSkill.rollback == 100)) {
                console.debug('standard attack');
                frames = waffengattung[weapPrimary.type][this.charactersSelected][0];
                if ((weapPrimary.type == weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
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
                    frames = waffengattung[weapPrimary.type][this.charactersSelected][1];
                    console.debug(frames);
                    if ((weapPrimary.type == weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
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
                frames = sequences[attackSkill.sequence][weapPrimary.type];
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
                    //     WSMprimaer = parseInt((weapPrimary.wsm + lookupWeapon[this.weaponsSecondarySelected].wsm) / 2);
                    //     WSMsekundaer = parseInt((weapPrimary.wsm + lookupWeapon[this.weaponsSecondarySelected].wsm) / 2) + lookupWeapon[this.weaponsSecondarySelected].wsm - weapPrimary.wsm;
                    // } else {
                    //     WSMprimaer = parseInt((weapPrimary.wsm + lookupWeapon[this.weaponsSecondarySelected].wsm) / 2) + weapPrimary.wsm - lookupWeapon[this.weaponsSecondarySelected].wsm;
                    //     WSMsekundaer = parseInt((weapPrimary.wsm + lookupWeapon[this.weaponsSecondarySelected].wsm) / 2);
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
                    frames = waffengattung[weapPrimary.type][this.charactersSelected][0];
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
                    frames = aktionsframe[weapPrimary.type][this.charactersSelected];
                    // 2-h sword && barb single handed
                    var isBarbTwoHandedSwordAsOneHanded = false;
                    if ((weapPrimary.type == weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
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
                    frames = waffengattung[weapPrimary.type][this.charactersSelected][0];
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
                frames = aktionsframe[weapPrimary.type][this.charactersSelected];
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
                frames = waffengattung[weapPrimary.type][this.charactersSelected][0];
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
                frames = aktionsframe[weapPrimary.type][this.charactersSelected];
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
                frames = waffengattung[weapPrimary.type][this.charactersSelected][0];
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
        calculateEffectiveIas: function () {
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
        calculateSkillIas: function () {
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
                var weapPrimary = lookupWeapon[i];
                // -1 all classes || this class's item 
                if ((weapPrimary.classItem < 0) || (weapPrimary.classItem == this.charactersSelected)) {
                    if (this.isPlayableClass
                        || i == 0 // unarmed
                        || (this.charactersSelected == 7  && (weapPrimary.type == weaponTypes.bow || weapPrimary.type == weaponTypes.crossbow))                                         // Act 1 Merc
                        || (this.charactersSelected == 8  && (weapPrimary.weaponCategory == weaponCategories.polearm || weapPrimary.weaponCategory == weaponCategories.spearOrJavalin)) // Act 2 Merc
                        || (this.charactersSelected == 9  &&  weapPrimary.weaponCategory == weaponCategories.swords)                                                                    // Act 5 Merc
                        || (this.charactersSelected == 10 &&  weapPrimary.weaponCategory == weaponCategories.swords && weapPrimary.type == weaponTypes.oneHandedSwingingWeapon)         // Act 3 Merc
                    ) {
                        values.push({ value: i, text: weapPrimary.name });
                    }
                }
            }
            this.weaponsPrimarySelected = this.sanitiseSelected(this.weaponsPrimarySelected, values);
            return values;
        },
        isWeaponsPrimaryBarbHandednessNeeded: function() {
            return this.charactersSelected == 2 && lookupWeapon[this.weaponsPrimarySelected].type == weaponTypes.twoHandedSword;
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
            var weapPrimary = lookupWeapon[this.weaponsPrimarySelected];
            switch (this.charactersSelected) {
                case 1: // sin
                    if (weapPrimary.type == weaponTypes.claw) {
                        for (i = 0; i < lookupWeapon.length; i++) {
                            var weapLookup = lookupWeapon[i];
                            if (weapLookup.classItem == 1 || weapLookup.type == weaponTypes.unarmed) {
                                values.push({ value: i, text: weapLookup.name });
                            }
                        }
                    } else {
                        values.push({ value: 0, text: '-' });
                    }
                    break;
                case 2: // barb
                    if ((weapPrimary.type == weaponTypes.oneHandedSwingingWeapon || weapPrimary.type == weaponTypes.oneHandedThrustingWeapon) || (weapPrimary.type == weaponTypes.twoHandedSword && this.weaponsPrimaryBarbHandednessSelected == 1)) {
                        for (i = 0; i < lookupWeapon.length; i++) {
                            var weapLookup = lookupWeapon[i];
                            if (weapLookup.type == weaponTypes.unarmed 
                                || weapLookup.type == weaponTypes.twoHandedSword 
                                || ((weapLookup.type == weaponTypes.oneHandedSwingingWeapon || weapLookup.type == weaponTypes.oneHandedThrustingWeapon) && weapLookup.classItem == -1)) {
                                values.push({ value: i, text: weapLookup.name });
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
                    description: waffengattung[lookupWeapon[this.weaponsPrimarySelected].type][11],
                    wsm: lookupWeapon[this.weaponsPrimarySelected].wsm,
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
                        description: waffengattung[lookupWeapon[this.weaponsSecondarySelected].type][11],
                        wsm: lookupWeapon[this.weaponsSecondarySelected].wsm,
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
            var weapPrimary = lookupWeapon[this.weaponsPrimarySelected];
            var weapSecondary = lookupWeapon[this.weaponsSecondarySelected];
            switch (this.charactersSelected) {
                case 0: // Amazon
                    values.push(this.getSkillOptionData("Standard"));
                    if (this.shapeShiftFormsSelected == 0) {
                        if ((weapPrimary.weaponCategory == weaponCategories.spearOrJavalin) || (weapPrimary.weaponCategory == weaponCategories.throwing)) {
                            values.push(this.getSkillOptionData("Throw")); // spears shouldn't be included here as throwable
                        }
                        if (weapPrimary.weaponCategory == weaponCategories.bowOrXbow) {
                            values.push(this.getSkillOptionData("Strafe"));
                        }
                        if ((weapPrimary.weaponCategory == weaponCategories.spearOrJavalin) || (weapPrimary.type == weaponTypes.spear)) {
                            values.push(this.getSkillOptionData("Impale"));
                            values.push(this.getSkillOptionData("Jab"));
                            values.push(this.getSkillOptionData("Fend"));
                        }
                        if (weapPrimary.canZeal) {
                            valuesNonNative.push(this.getSkillOptionData("Zeal"));
                        }
                    }
                    break;
                case 1: // Assassin
                    values.push(this.getSkillOptionData("Standard"));
                    // not shapeshifted
                    if (this.shapeShiftFormsSelected == 0) {
                        if ((weapPrimary.weaponCategory == weaponCategories.spearOrJavalin) || (weapPrimary.weaponCategory == weaponCategories.throwing)) {
                            values.push(this.getSkillOptionData("Throw"));
                        }
                        values.push(this.getSkillOptionData("Laying Traps"));
                        if (isAssasinClaw(this.weaponsPrimarySelected) || isDagger(this.weaponsPrimarySelected)) {
                            values.push(this.getSkillOptionData("Fists of Ember"));
                            values.push(this.getSkillOptionData("Fists of Thunder"));
                            values.push(this.getSkillOptionData("Blades of Ice"));
                        }
                        if ((weapPrimary.type == weaponTypes.claw) && (weapSecondary.type == weaponTypes.claw)) {
                            values.push(this.getSkillOptionData("Dragon Claw"));
                        }
                        values.push(this.getSkillOptionData("Dragon Tail"));
                        values.push(this.getSkillOptionData("Dragon Talon"));
                        // should be weapons that can be passion runeword || POD chaos, any sin claw
                        if (weapPrimary.canZeal || isAssasinClaw(this.weaponsPrimarySelected)) {
                            valuesNonNative.push(this.getSkillOptionData("Zeal"));
                        }
                    }
                    break;
                case 2: // Barbarian
                    values.push(this.getSkillOptionData("Standard"));
                    if (this.shapeShiftFormsSelected == 0) {
                        // primary throwing weapon
                        if ((weapPrimary.weaponCategory == weaponCategories.spearOrJavalin) || (weapPrimary.weaponCategory == weaponCategories.throwing)) {
                            values.push(this.getSkillOptionData("Throw"));
                        }
                        // offhand weapon
                        if (this.weaponsSecondarySelected > 0) {
                            values.push(this.getSkillOptionData("Double Swing"));
                            values.push(this.getSkillOptionData("Frenzy"));
                        }
                        // primary throwing and offhand throwing
                        if (((weapPrimary.weaponCategory == weaponCategories.spearOrJavalin) || (weapPrimary.weaponCategory == weaponCategories.throwing)) && ((weapSecondary.weaponCategory == weaponCategories.spearOrJavalin) || (weapSecondary.weaponCategory == weaponCategories.throwing))) {
                            values.push(this.getSkillOptionData("Double Throw"));
                        }
                        // not bow or xbow
                        if (weapPrimary.weaponCategory != weaponCategories.bowOrXbow) {
                            values.push(this.getSkillOptionData("Whirlwind"));
                            values.push(this.getSkillOptionData("Concentrate"));
                            values.push(this.getSkillOptionData("Berserk"));
                            values.push(this.getSkillOptionData("Bash"));
                            values.push(this.getSkillOptionData("Stun"));
                            values.push(this.getSkillOptionData("Cleave"));
                        }
                        // can zeal
                        if (weapPrimary.canZeal || weapSecondary.canZeal) {
                            valuesNonNative.push(this.getSkillOptionData("Zeal"));
                        }
                    }
                    // bear barb
                    if (this.shapeShiftFormsSelected == 1) {
                        // not bow or xbow
                        if (weapPrimary.weaponCategory != weaponCategories.bowOrXbow) {
                            values.push(this.getSkillOptionData("Cleave"));
                        }
                    }
                    // wolf barb
                    if (this.shapeShiftFormsSelected == 2) {
                        valuesNonNative.push(this.getSkillOptionData("Feral Rage"));
                        // not bow or xbow
                        if (weapPrimary.weaponCategory != weaponCategories.bowOrXbow) {
                            values.push(this.getSkillOptionData("Cleave"));
                        }
                    }
                    break;
                case 3: // Druid
                    values.push(this.getSkillOptionData("Standard"));
                    if (this.shapeShiftFormsSelected == 0) {
                        if ((weapPrimary.weaponCategory == weaponCategories.spearOrJavalin) || (weapPrimary.weaponCategory == weaponCategories.throwing)) {
                            values.push(this.getSkillOptionData("Throw"));
                        }
                        if (weapPrimary.canZeal) {
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
                        if ((weapPrimary.weaponCategory == weaponCategories.spearOrJavalin) || (weapPrimary.weaponCategory == weaponCategories.throwing)) {
                            values.push(this.getSkillOptionData("Throw"));
                        }
                        // not bow or xbow
                        if (weapPrimary.weaponCategory != weaponCategories.bowOrXbow) {
                            values.push(this.getSkillOptionData("Zeal"));
                            values.push(this.getSkillOptionData("Sacrifice"));
                            values.push(this.getSkillOptionData("Vengeance"));
                            values.push(this.getSkillOptionData("Conversion"));
                        }
                        if ((weapPrimary.type == weaponTypes.unarmed) || (weapPrimary.type == weaponTypes.oneHandedSwingingWeapon) || (weapPrimary.type == weaponTypes.oneHandedThrustingWeapon)) {
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
                        if ((weapPrimary.weaponCategory == weaponCategories.spearOrJavalin) || (weapPrimary.weaponCategory == weaponCategories.throwing)) {
                            values.push(this.getSkillOptionData("Throw"));
                        }
                        if (weapPrimary.canZeal) {
                            valuesNonNative.push(this.getSkillOptionData("Zeal"));
                        }
                    }
                    break;
            }
            values = values.concat(valuesNonNative);
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
            this.calculateSkillIas();
            this.calculateWsm();
            cap = 0;
            var breakpoints = [];
            var breakpoints1 = [];
            var breakpoints2 = [];
            var breakpointsAPS = [];
            var nonStandardWeapon = [];
            var weapPrimary = lookupWeapon[this.weaponsPrimarySelected];
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
                        frames = waffengattung[weapPrimary.type][this.charactersSelected][0];
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
                        frames = waffengattung[weapPrimary.type][this.charactersSelected][0];
                        if ((weapPrimary.type == weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                            frames = 16;
                        }
                        ergebnis = this.calcFPA(frames, i, start);
                        frames = waffengattung[weapPrimary.type][this.charactersSelected][1];
                        if ((weapPrimary.type == weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
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
                        frames = waffengattung[weapPrimary.type][this.charactersSelected][0];
                        if ((weapPrimary.type == weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                            frames = 16;
                        }
                        ergebnis = this.calcFPA(frames, i, 0);
                        frames = waffengattung[weapPrimary.type][this.charactersSelected][1];
                        if ((weapPrimary.type == weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
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
                            frames = aktionsframe[weapPrimary.type][this.charactersSelected];
                        }
                        if ((weapPrimary.type == weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
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
                            frames = waffengattung[weapPrimary.type][this.charactersSelected][0];
                        }
                        if ((weapPrimary.type == weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
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
                        frames = aktionsframe[weapPrimary.type][this.charactersSelected];
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
                        frames = waffengattung[weapPrimary.type][this.charactersSelected][0];
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
                        frames = aktionsframe[weapPrimary.type][this.charactersSelected];
                        rollback1 = this.calcFPA(frames, i, start);
                        rollback1++;
                        RBframe = Math.floor(Math.floor((256 * start + Math.floor(256 * i / 100) * rollback1) / 256) * attackSkill.rollback / 100);
                        rollback2 = this.calcFPA(frames, i, RBframe);
                        rollback2++;
                        frames = waffengattung[weapPrimary.type][this.charactersSelected][0];
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
                    frames = waffengattung[weapPrimary.type][this.charactersSelected][0];
                    if (weapPrimary.type == weaponTypes.twoHandedSword) {
                        frames = waffengattung[2][this.charactersSelected][0];
                    }
                    var AnimSpeed = 256;
                    if (weapPrimary.type == 1) { // assasin claws?
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
