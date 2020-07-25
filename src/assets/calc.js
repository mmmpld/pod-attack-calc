export var animationFrames;
export var WSMprimaer;
export var WSMsekundaer;
export var IASprimaer;
export var IASsekundaer; // few references
export var EIASprimaer; // few references
export var EIASsekundaer; // few references
export let SIAS = 0;
export var rollback1;
export var rollback2;
export var rollback3;
export var rollback4;
export var rollback5;
export var isAtFpaCap = true; // the same as isMaxIas but referenced from different places

// "weapon type"
// first level is weapon "type" from lookupweapon
// second level is char class value, or [11] for the description
// third level: first value is "FramesPerDirection" (shape shifted frames? Zeal rollback3), second value is "frames" (full animation frames?)
export var weaponClassFrames = [
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
export var aktionsframe = [
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
export var sequences = [
    [ 0,  0,  0,  0, 21, 24, 0, 0, 0],
    [ 0,  0,  0,  0, 18, 21, 0, 0, 0],
    [12, 12, 16,  0,  0,  0, 0, 0, 0],
    [ 0,  0, 17, 17, 17,  0, 0, 0, 0],
    [ 0,  0, 12,  0, 12,  0, 0, 0, 0]
];

export const qualities = Object.freeze({
    normal: 0,
    magic: 1,
    rare: 2,
    set: 3,
    unique: 4,
});

export const weaponTypes = Object.freeze({
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

export const weaponCategories = Object.freeze({
    other: 0,
    bowOrXbow: 1,
    spearOrJavalin: 2,
    throwing: 3,
    polearm: 8,
    swords: 9,
});

export var lookupWeapon = [
    {name: "[unarmed]",           wsm:  0, type:0, classItem:-1, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Ancient Axe",         wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "The Minotaur", qualtity: qualities.unique}]},
    {name: "Ancient Sword",       wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:false, commonItems: [{title: "The Atlantean", qualtity: qualities.unique}]},
    {name: "Arbalest",            wsm:-10, type:8, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Langer Briser", qualtity: qualities.unique}]},
    {name: "Archon Staff",        wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Mang Song's Lesson", qualtity: qualities.unique}]},
    {name: "Ashwood Bow",         wsm:  0, type:7, classItem: 0, weaponCategory:1, canZeal:false, commonItems: []},
    {name: "Ataghan",             wsm:-20, type:2, classItem:-1, weaponCategory:9, canZeal:false, commonItems: [{title: "Djinn Slayer", qualtity: qualities.unique}]},
    {name: "Axe",                 wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Deathspade", qualtity: qualities.unique}]},
    {name: "Balanced Axe",        wsm:-10, type:2, classItem:-1, weaponCategory:3, canZeal:false, commonItems: []},
    {name: "Balanced Knife",      wsm:-20, type:4, classItem:-1, weaponCategory:3, canZeal:false, commonItems: []},
    {name: "Ballista",            wsm: 10, type:8, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Buriza-Do Kyanon", qualtity: qualities.unique}]},
    {name: "Balrog Blade",        wsm:  0, type:3, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "Flamebellow", qualtity: qualities.unique}]},
    {name: "Balrog Spear",        wsm: 10, type:4, classItem:-1, weaponCategory:2, canZeal:false, commonItems: [{title: "Demon's Arch", qualtity: qualities.unique}]},
    {name: "Barbed Club",         wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Fleshrender", qualtity: qualities.unique}]},
    {name: "Bardiche",            wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:false, commonItems: [{title: "Dimoak's Hew", qualtity: qualities.unique}]},
    {name: "Bastard Sword",       wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "Blacktongue", qualtity: qualities.unique}]},
    {name: "Battle Axe",          wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "The Chieftain", qualtity: qualities.unique}]},
    {name: "Battle Cestus",       wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:false, commonItems: [{title: "Shadow Killer", qualtity: qualities.unique}]},
    {name: "Battle Dart",         wsm:  0, type:4, classItem:-1, weaponCategory:3, canZeal:false, commonItems: [{title: "Deathbit", qualtity: qualities.unique}]},
    {name: "Battle Hammer",       wsm: 20, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Earthshaker", qualtity: qualities.unique}]},
    {name: "Battle Scythe",       wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Athena's Wrath", qualtity: qualities.unique}]},
    {name: "Battle Staff",        wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "The Salamander", qualtity: qualities.unique}, {title: "Cathan's Rule", qualtity: qualities.set}]},
    {name: "Battle Sword",        wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "Headstriker", qualtity: qualities.unique}]},
    {name: "Bearded Axe",         wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Spellsteel", qualtity: qualities.unique}]},
    {name: "Bec-de-Corbin",       wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Husoldal Evo", qualtity: qualities.unique}]},
    {name: "Berserker Axe",       wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Death Cleaver", qualtity: qualities.unique}]},
    {name: "Bill",                wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Blackleach Blade", qualtity: qualities.unique}, {title: "Hwanin's Justice", qualtity: qualities.set}]},
    {name: "Blade Bow",           wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: []},
    {name: "Blade Talons",        wsm:-20, type:1, classItem: 1, weaponCategory:0, canZeal:true,  commonItems: []},
    {name: "Blade",               wsm:-10, type:4, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Spectral Shard", qualtity: qualities.unique}]},
    {name: "Bone Knife",          wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Wizardspike", qualtity: qualities.unique}]},
    {name: "Bone Wand",           wsm:-20, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Gravenspine", qualtity: qualities.unique}, {title: "Sander's Superstition", qualtity: qualities.set}]},
    {name: "Brandistock",         wsm:-20, type:5, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Bloodthief", qualtity: qualities.unique}]},
    {name: "Broad Axe",           wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Goreshovel", qualtity: qualities.unique}]},
    {name: "Broad Sword",         wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "Griswold's Edge", qualtity: qualities.unique}, {title: "Isenhart's Lightbrand", qualtity: qualities.set}]},
    {name: "Burnt Wand",          wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Suicide Branch", qualtity: qualities.unique}]},
    {name: "Caduceus",            wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "", qualtity: qualities.unique}, {title: "Griswold's Redemption", qualtity: qualities.set}]},
    {name: "Cedar Bow",           wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Kuko Shakaku", qualtity: qualities.unique}]},
    {name: "Cedar Staff",         wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Chromatic Ire", qualtity: qualities.unique}]},
    {name: "Ceremonial Bow",      wsm: 10, type:7, classItem: 0, weaponCategory:1, canZeal:false, commonItems: [{title: "Lycander's Aim", qualtity: qualities.unique}]},
    {name: "Ceremonial Javelin",  wsm:-10, type:4, classItem: 0, weaponCategory:2, canZeal:false, commonItems: [{title: "Titan's Revenge", qualtity: qualities.unique}]},
    {name: "Ceremonial Pike",     wsm: 20, type:5, classItem: 0, weaponCategory:8, canZeal:true,  commonItems: [{title: "Lycander's Flank", qualtity: qualities.unique}]},
    {name: "Ceremonial Spear",    wsm:  0, type:5, classItem: 0, weaponCategory:8, canZeal:true,  commonItems: []},
    {name: "Cestus",              wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Champion Axe",        wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Messerschmidt's Reaver", qualtity: qualities.unique}]},
    {name: "Champion Sword",      wsm:-10, type:3, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "Doombringer", qualtity: qualities.unique}]},
    {name: "Chu-Ko-Nu",           wsm:-60, type:8, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Demon Machine", qualtity: qualities.unique}]},
    {name: "Cinquedeas",          wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Blackbog's Sharp", qualtity: qualities.unique}]},
    {name: "Clasped Orb",         wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Claws",               wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:true,  commonItems: []},
    {name: "Claymore",            wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "Soulflay", qualtity: qualities.unique}]},
    {name: "Cleaver",             wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Butcher's Pupil", qualtity: qualities.unique}]},
    {name: "Cloudy Sphere",       wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Club",                wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Felloak", qualtity: qualities.unique}]},
    {name: "Colossus Blade",      wsm:  5, type:3, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "The Grandfather", qualtity: qualities.unique}, {title: "Bul-Kathos' Sacred Charge", qualtity: qualities.set}]},
    {name: "Colossus Crossbow",   wsm: 10, type:8, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Hellrack", qualtity: qualities.unique}]},
    {name: "Colossus Sword",      wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: []},
    {name: "Colossus Voulge",     wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: []},
    {name: "Composite Bow",       wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Rogue's Bow", qualtity: qualities.unique}]},
    {name: "Conquest Sword",      wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: []},
    {name: "Crossbow",            wsm:  0, type:8, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Ichorstring", qualtity: qualities.unique}]},
    {name: "Crowbill",            wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Pompeii's Wrath", qualtity: qualities.unique}]},
    {name: "Crusader Bow",        wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Eaglehorn", qualtity: qualities.unique}]},
    {name: "Cryptic Axe",         wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Tomb Reaver", qualtity: qualities.unique}]},
    {name: "Cryptic Sword",       wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "Frostwind", qualtity: qualities.unique}, {title: "Sazabi's Cobalt Redeemer", qualtity: qualities.set}]},
    {name: "Crystal Sword",       wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: []},
    {name: "Crystalline Globe",   wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Cudgel",              wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Dark Clan Crusher", qualtity: qualities.unique}]},
    {name: "Cutlass",             wsm:-30, type:2, classItem:-1, weaponCategory:9, canZeal:false, commonItems: [{title: "Coldsteel Eye", qualtity: qualities.unique}]},
    {name: "Dacian Falx",         wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "Bing Sz Wang", qualtity: qualities.unique}]},
    {name: "Dagger",              wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Gull", qualtity: qualities.unique}]},
    {name: "Decapitator",         wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Hellslayer", qualtity: qualities.unique}]},
    {name: "Demon Crossbow",      wsm:-60, type:8, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Gut Siphon", qualtity: qualities.unique}]},
    {name: "Demon Heart",         wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Devil Star",          wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Barana's Star", qualtity: qualities.unique}]},
    {name: "Diamond Bow",         wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: []},
    {name: "Dimensional Blade",   wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "Ginther's Rift", qualtity: qualities.unique}]},
    {name: "Dimensional Shard",   wsm: 10, type:2, classItem: 6, weaponCategory:0, canZeal:false, commonItems: [{title: "Death's Fathom", qualtity: qualities.unique}]},
    {name: "Dirk",                wsm:  0, type:4, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "The Diggler", qualtity: qualities.unique}]},
    {name: "Divine Scepter",      wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Hand of Blessed Light", qualtity: qualities.unique}]},
    {name: "Double Axe",          wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Bladebone", qualtity: qualities.unique}, {title: "Berserker's Hatchet", qualtity: qualities.set}]},
    {name: "Double Bow",          wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Endlesshail", qualtity: qualities.unique}]},
    {name: "Eagle Orb",           wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Edge Bow",            wsm:  5, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Skystrike", qualtity: qualities.unique}]},
    {name: "Elder Staff",         wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Ondal's Wisdom", qualtity: qualities.unique}, {title: "Naj's Puzzler", qualtity: qualities.set}]},
    {name: "Eldritch Orb",        wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:false, commonItems: [{title: "Eschuta's Temper", qualtity: qualities.unique}]},
    {name: "Elegant Blade",       wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:false, commonItems: [{title: "Bloodmoon", qualtity: qualities.unique}]},
    {name: "Espandon",            wsm:  0, type:3, classItem:-1, weaponCategory:9, canZeal:false, commonItems: [{title: "Crainte Vomir", qualtity: qualities.unique}]},
    {name: "Ettin Axe",           wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Rune Master", qualtity: qualities.unique}]},
    {name: "Executioner Sword",   wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "Swordguard", qualtity: qualities.unique}]},
    {name: "Falcata",             wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:false, commonItems: []},
    {name: "Falchion",            wsm: 20, type:2, classItem:-1, weaponCategory:9, canZeal:false, commonItems: [{title: "Gleamscythe", qualtity: qualities.unique}]},
    {name: "Fanged Knife",        wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Fleshripper", qualtity: qualities.unique}]},
    {name: "Fascia",              wsm: 10, type:1, classItem: 1, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Feral Axe",           wsm:-15, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: []},
    {name: "Feral Claws",         wsm:-20, type:1, classItem: 1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Firelizard's Talons", qualtity: qualities.unique}]},
    {name: "Flail",               wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "The General's Tan Do Li Ga", qualtity: qualities.unique}]},
    {name: "Flamberge",           wsm:-10, type:3, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "Ripsaw", qualtity: qualities.unique}]},
    {name: "Flanged Mace",        wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Sureshrill Frost", qualtity: qualities.unique}]},
    {name: "Flying Axe",          wsm: 10, type:2, classItem:-1, weaponCategory:3, canZeal:false, commonItems: [{title: "Gimmershred", qualtity: qualities.unique}]},
    {name: "Francisca",           wsm: 10, type:2, classItem:-1, weaponCategory:3, canZeal:false, commonItems: [{title: "The Scalper", qualtity: qualities.unique}]},
    {name: "Fuscina",             wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Kelpie Snare", qualtity: qualities.unique}]},
    {name: "Ghost Glaive",        wsm: 20, type:4, classItem:-1, weaponCategory:2, canZeal:false, commonItems: [{title: "Wraith Flight", qualtity: qualities.unique}]},
    {name: "Ghost Spear",         wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: []},
    {name: "Ghost Wand",          wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Giant Axe",           wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Humongous", qualtity: qualities.unique}]},
    {name: "Giant Sword",         wsm:  0, type:3, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "Kinemil's Awl", qualtity: qualities.unique}]},
    {name: "Giant Thresher",      wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Stormspire", qualtity: qualities.unique}]},
    {name: "Gladius",             wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:false, commonItems: [{title: "Bloodletter", qualtity: qualities.unique}]},
    {name: "Glaive",              wsm: 20, type:4, classItem:-1, weaponCategory:2, canZeal:false, commonItems: []},
    {name: "Glorious Axe",        wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Executioner's Justice", qualtity: qualities.unique}]},
    {name: "Glowing Orb",         wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Gnarled Staff",       wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Spire of Lazarus", qualtity: qualities.unique}]},
    {name: "Gorgon Crossbow",     wsm:  0, type:8, classItem:-1, weaponCategory:1, canZeal:false, commonItems: []},
    {name: "Gothic Axe",          wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Boneslayer Blade", qualtity: qualities.unique}]},
    {name: "Gothic Bow",          wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Goldstrike Arch", qualtity: qualities.unique}]},
    {name: "Gothic Staff",        wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Warpspear", qualtity: qualities.unique}]},
    {name: "Gothic Sword",        wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "Cloudcrack", qualtity: qualities.unique}]},
    {name: "Grand Matron Bow",    wsm: 10, type:7, classItem: 0, weaponCategory:1, canZeal:false, commonItems: [{title: "Faith", qualtity: qualities.normal}, {title: "M'avina's Caster", qualtity: qualities.set}]},
    {name: "Grand Scepter",       wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Rusthandle", qualtity: qualities.unique}, {title: "Civerb's Cudgel", qualtity: qualities.set}]},
    {name: "Grave Wand",          wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Blackhand Key", qualtity: qualities.unique}]},
    {name: "Great Axe",           wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Brainhew", qualtity: qualities.unique}]},
    {name: "Great Bow",           wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: []},
    {name: "Great Maul",          wsm: 20, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Steeldriver", qualtity: qualities.unique}]},
    {name: "Great Pilum",         wsm:  0, type:4, classItem:-1, weaponCategory:2, canZeal:false, commonItems: []},
    {name: "Great Poleaxe",       wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: []},
    {name: "Great Sword",         wsm: 10, type:3, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "The Patriarch", qualtity: qualities.unique}]},
    {name: "Greater Claws",       wsm:-20, type:1, classItem: 1, weaponCategory:0, canZeal:true,  commonItems: []},
    {name: "Greater Talons",      wsm:-30, type:1, classItem: 1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Bartuc's Cut-Throat", qualtity: qualities.unique}]},
    {name: "Grim Scythe",         wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Grim's Burning Dead", qualtity: qualities.unique}]},
    {name: "Grim Wand",           wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Ume's Lament", qualtity: qualities.unique}, {title: "Infernal Torch", qualtity: qualities.set}]},
    {name: "Halberd",             wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Woestave", qualtity: qualities.unique}]},
    {name: "Hand Axe",            wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "The Gnasher", qualtity: qualities.unique}]},
    {name: "Hand Scythe",         wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Harpoon",             wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:false, commonItems: []},
    {name: "Hatchet Hands",       wsm: 10, type:1, classItem: 1, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Hatchet",             wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Coldkill", qualtity: qualities.unique}]},
    {name: "Heavenly Stone",      wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Heavy Crossbow",      wsm: 10, type:8, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Hellcast", qualtity: qualities.unique}]},
    {name: "Highland Blade",      wsm: -5, type:3, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: []},
    {name: "Holy Water Sprinkler",wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "The Fetid Sprinkler", qualtity: qualities.unique}]},
    {name: "Hunter's Bow",        wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Witherstring", qualtity: qualities.unique}]},
    {name: "Hurlbat",             wsm:-10, type:2, classItem:-1, weaponCategory:3, canZeal:false, commonItems: []},
    {name: "Hydra Bow",           wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Windforce", qualtity: qualities.unique}]},
    {name: "Hydra Edge",          wsm: 10, type:2, classItem:-1, weaponCategory:9, canZeal:false, commonItems: []},
    {name: "Hyperion Javelin",    wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:false, commonItems: []},
    {name: "Hyperion Spear",      wsm:-10, type:5, classItem:-1, weaponCategory:8, canZeal:false, commonItems: [{title: "Arioc's Needle", qualtity: qualities.unique}]},
    {name: "Jagged Star",         wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Moonfall", qualtity: qualities.unique}, {title: "Aldur's Rhythm", qualtity: qualities.set}]},
    {name: "Jared's Stone",       wsm: 10, type:2, classItem: 6, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Javelin",             wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:false, commonItems: []},
    {name: "Jo Staff",            wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Razorswitch", qualtity: qualities.unique}]},
    {name: "Katar",               wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Knout",               wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Beazil's Vortex", qualtity: qualities.unique}]},
    {name: "Kris",                wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "The Jade Tan Do", qualtity: qualities.unique}]},
    {name: "Lance",               wsm: 20, type:5, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Spire of Honor", qualtity: qualities.unique}]},
    {name: "Large Axe",           wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Axe of Fechmar", qualtity: qualities.unique}]},
    {name: "Large Siege Bow",     wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Cliffkiller", qualtity: qualities.unique}]},
    {name: "Legend Spike",        wsm:-10, type:4, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Ghostflame", qualtity: qualities.unique}]},
    {name: "Legend Sword",        wsm:-15, type:3, classItem:-1, weaponCategory:9, canZeal:false, commonItems: []},
    {name: "Legendary Mallet",    wsm: 20, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Schaefer's Hammer", qualtity: qualities.unique}, {title: "Stone Crusher", qualtity: qualities.unique}]},
    {name: "Lich Wand",           wsm:-20, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Boneshade", qualtity: qualities.unique}]},
    {name: "Light Crossbow",      wsm:-10, type:8, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Leadcrow", qualtity: qualities.unique}]},
    {name: "Lochaber Axe",        wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:false, commonItems: [{title: "The Meat Scraper", qualtity: qualities.unique}]},
    {name: "Long Battle Bow",     wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Wizendraw", qualtity: qualities.unique}, {title: "Vidala's Barb", qualtity: qualities.set}]},
    {name: "Long Bow",            wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Raven Claw", qualtity: qualities.unique}]},
    {name: "Long Staff",          wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Serpent Lord", qualtity: qualities.unique}]},
    {name: "Long Sword",          wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "Hellplague", qualtity: qualities.unique}, {title: "Cleglaw's tooth", qualtity: qualities.set}]},
    {name: "Long War Bow",        wsm: 10, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Blastbark", qualtity: qualities.unique}]},
    {name: "Mace",                wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Crushflange", qualtity: qualities.unique}]},
    {name: "Maiden Javelin",      wsm:-10, type:4, classItem: 0, weaponCategory:2, canZeal:false, commonItems: []},
    {name: "Maiden Pike",         wsm: 10, type:5, classItem: 0, weaponCategory:8, canZeal:true,  commonItems: []},
    {name: "Maiden Spear",        wsm:  0, type:5, classItem: 0, weaponCategory:8, canZeal:true,  commonItems: []},
    {name: "Mancatcher",          wsm:-20, type:5, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Viperfork", qualtity: qualities.unique}]},
    {name: "Martel de Fer",       wsm: 20, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "The Gavel of Pain", qualtity: qualities.unique}]},
    {name: "Matriarchal Bow",     wsm:-10, type:7, classItem: 0, weaponCategory:1, canZeal:false, commonItems: [{title: "Blood Raven's Charge", qualtity: qualities.unique}]},
    {name: "Matriarchal Javelin", wsm:-10, type:4, classItem: 0, weaponCategory:2, canZeal:false, commonItems: [{title: "Thunderstroke", qualtity: qualities.unique}]},
    {name: "Matriarchal Pike",    wsm: 20, type:5, classItem: 0, weaponCategory:8, canZeal:true,  commonItems: []},
    {name: "Matriarchal Spear",   wsm:  0, type:5, classItem: 0, weaponCategory:8, canZeal:true,  commonItems: [{title: "Stoneraven", qualtity: qualities.unique}]},
    {name: "Maul",                wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Bonesnap", qualtity: qualities.unique}]},
    {name: "Mighty Scepter",      wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Heaven's Light", qualtity: qualities.unique}, {title: "The Redeemer", qualtity: qualities.unique}]},
    {name: "Military Axe",        wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Warlord's Trust", qualtity: qualities.unique}]},
    {name: "Military Pick",       wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Skull Splitter", qualtity: qualities.unique}, {title: "Tancred's Crowbill", qualtity: qualities.set}]},
    {name: "Mithril Point",       wsm:  0, type:4, classItem:-1, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Morning Star",        wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Bloodrise", qualtity: qualities.unique}]},
    {name: "Mythical Sword",      wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:false, commonItems: [{title: "Bul-Kathos' Tribal Guardian", qualtity: qualities.set}]},
    {name: "Naga",                wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Guardian Naga", qualtity: qualities.unique}]},
    {name: "Ogre Axe",            wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:false, commonItems: [{title: "Bonehew", qualtity: qualities.unique}]},
    {name: "Ogre Maul",           wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Windhammer", qualtity: qualities.unique}, {title: "Immortal King's Stone Crusher", qualtity: qualities.set}]},
    {name: "Partizan",            wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Pierre Tombale Couant", qualtity: qualities.unique}]},
    {name: "Pellet Bow",          wsm:-10, type:8, classItem:-1, weaponCategory:1, canZeal:false, commonItems: []},
    {name: "Petrified Wand",      wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Carin Shard", qualtity: qualities.unique}]},
    {name: "Phaseblade",          wsm:-30, type:2, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "Lightsabre", quality: qualities.unique}, {title: "Azurewrath", quality: qualities.unique}, {title: "Grief", qualtity: qualities.normal}]},
    {name: "Pike",                wsm: 20, type:5, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "The Tannr Gorerod", qualtity: qualities.unique}]},
    {name: "Pilum",               wsm:  0, type:4, classItem:-1, weaponCategory:2, canZeal:false, commonItems: []},
    {name: "Poignard",            wsm:-20, type:4, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Spineripper", qualtity: qualities.unique}]},
    {name: "Poleaxe",             wsm: 10, type:6, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "The Battlebranch", qualtity: qualities.unique}]},
    {name: "Polished Wand",       wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Quarterstaff",        wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Ribcracker", qualtity: qualities.unique}]},
    {name: "Quhab",               wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:true,  commonItems: []},
    {name: "Razor Bow",           wsm:-10, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Riphook", qualtity: qualities.unique}]},
    {name: "Reflex Bow",          wsm: 10, type:7, classItem: 0, weaponCategory:1, canZeal:false, commonItems: []},
    {name: "Reinforced Mace",     wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "", qualtity: qualities.unique}, {title: "Dangoon's Teaching", qualtity: qualities.set}]},
    {name: "Repeating Crossbow",  wsm:-40, type:8, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Doomslinger", qualtity: qualities.unique}]},
    {name: "Rondel",              wsm:  0, type:4, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Heart Carver", qualtity: qualities.unique}]},
    {name: "Rune Bow",            wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Magewrath", qualtity: qualities.unique}]},
    {name: "Rune Scepter",        wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Zakarum's Hand", qualtity: qualities.unique}]},
    {name: "Rune Staff",          wsm: 20, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Skull Collector", qualtity: qualities.unique}]},
    {name: "Rune Sword",          wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "Plague Bearer", qualtity: qualities.unique}]},
    {name: "Runic Talons",        wsm:-30, type:1, classItem: 1, weaponCategory:0, canZeal:true,  commonItems: []},
    {name: "Sabre",               wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:false, commonItems: [{title: "Skewer of Krintiz", qualtity: qualities.unique}, {title: "Angelic Sickle", qualtity: qualities.set}]},
    {name: "Sacred Globe",        wsm:-10, type:2, classItem: 6, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Scepter",             wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Knell Striker", qualtity: qualities.unique}]},
    {name: "Scimitar",            wsm:-20, type:2, classItem:-1, weaponCategory:9, canZeal:false, commonItems: [{title: "Blood Crescent", qualtity: qualities.unique}]},
    {name: "Scissors Katar",      wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:true,  commonItems: []},
    {name: "Scissors Quhab",      wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:true,  commonItems: []},
    {name: "Scissors Suwayyah",   wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Natalya's Mark", qualtity: qualities.set}]},
    {name: "Scourge",             wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Horizon's Tornado", qualtity: qualities.unique}, {title: "Stormlash", qualtity: qualities.unique}]},
    {name: "Scythe",              wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Soul Harvest", qualtity: qualities.unique}]},
    {name: "Seraph Rod",          wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Shadow Bow",          wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: []},
    {name: "Shamshir",            wsm:-10, type:2, classItem:-1, weaponCategory:9, canZeal:false, commonItems: [{title: "Hexfire", qualtity: qualities.unique}]},
    {name: "Shillelagh",          wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: []},
    {name: "Short Battle Bow",    wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Stormstrike", qualtity: qualities.unique}]},
    {name: "Short Bow",           wsm:  5, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Pluckeye", qualtity: qualities.unique}]},
    {name: "Short Siege Bow",     wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Witchwild String", qualtity: qualities.unique}]},
    {name: "Short Spear",         wsm: 10, type:4, classItem:-1, weaponCategory:2, canZeal:false, commonItems: []},
    {name: "Short Staff",         wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Bane Ash", qualtity: qualities.unique}]},
    {name: "Short Sword",         wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:false, commonItems: [{title: "Rixot's Keen", qualtity: qualities.unique}]},
    {name: "Short War Bow",       wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Hellclap", qualtity: qualities.unique}, {title: "Arctic Horn", qualtity: qualities.set}]},
    {name: "Siege Crossbow",      wsm:  0, type:8, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Pus Spitter", qualtity: qualities.unique}]},
    {name: "Silver-edged Axe",    wsm:  0, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Ethereal Edge", qualtity: qualities.unique}]},
    {name: "Simbilan",            wsm: 10, type:4, classItem:-1, weaponCategory:2, canZeal:false, commonItems: []},
    {name: "Small Crescent",      wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: []},
    {name: "Smoked Sphere",       wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Sparkling Ball",      wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Spear",               wsm:-10, type:5, classItem:-1, weaponCategory:8, canZeal:false, commonItems: [{title: "The Dragon Chang", qualtity: qualities.unique}]},
    {name: "Spetum",              wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Lance of Yaggai", qualtity: qualities.unique}]},
    {name: "Spiculum",            wsm: 20, type:4, classItem:-1, weaponCategory:2, canZeal:false, commonItems: []},
    {name: "Spider Bow",          wsm:  5, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: []},
    {name: "Spiked Club",         wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Stoutnail", qualtity: qualities.unique}]},
    {name: "Stag Bow",            wsm:  0, type:7, classItem: 0, weaponCategory:1, canZeal:false, commonItems: []},
    {name: "Stalagmite",          wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Stiletto",            wsm:-10, type:4, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Stormspike", qualtity: qualities.unique}]},
    {name: "Stygian Pike",        wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: []},
    {name: "Stygian Pilum",       wsm:  0, type:4, classItem:-1, weaponCategory:2, canZeal:false, commonItems: []},
    {name: "Suwayyah",            wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:true,  commonItems: []},
    {name: "Swirling Crystal",    wsm: 10, type:2, classItem: 6, weaponCategory:0, canZeal:false, commonItems: [{title: "The Oculus", qualtity: qualities.unique}, {title: "Tal Rasha's Lidless Eye", qualtity: qualities.set}]},
    {name: "Tabar",               wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Stormrider", qualtity: qualities.unique}]},
    {name: "Thresher",            wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "The Reaper's Toll", qualtity: qualities.unique}, {title: "Insight", qualtity: qualities.normal}, {title: "Infinity", qualtity: qualities.normal}]},
    {name: "Throwing Axe",        wsm: 10, type:2, classItem:-1, weaponCategory:3, canZeal:false, commonItems: []},
    {name: "Throwing Knife",      wsm:  0, type:4, classItem:-1, weaponCategory:3, canZeal:false, commonItems: []},
    {name: "Throwing Spear",      wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:false, commonItems: []},
    {name: "Thunder Maul",        wsm: 20, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Earth Shifter", qualtity: qualities.unique}, {title: "The Cranium Basher", qualtity: qualities.unique}]},
    {name: "Tomahawk",            wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Razor's Edge", qualtity: qualities.unique}]},
    {name: "Tomb Wand",           wsm:-20, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Arm of King Leoric", qualtity: qualities.unique}]},
    {name: "Trident",             wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Razortine", qualtity: qualities.unique}]},
    {name: "Truncheon",           wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Nord's Tenderizer", qualtity: qualities.unique}]},
    {name: "Tulwar",              wsm: 20, type:2, classItem:-1, weaponCategory:9, canZeal:false, commonItems: [{title: "Blade of Ali Baba", qualtity: qualities.unique}]},
    {name: "Tusk Sword",          wsm:  0, type:3, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "The Vile Husk", qualtity: qualities.unique}]},
    {name: "Twin Axe",            wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Islestrike", qualtity: qualities.unique}]},
    {name: "Two-Handed Sword",    wsm:  0, type:3, classItem:-1, weaponCategory:9, canZeal:false, commonItems: [{title: "Shadowfang", qualtity: qualities.unique}]},
    {name: "Tyrant Club",         wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Demon Limb", qualtity: qualities.unique}]},
    {name: "Unearthed Wand",      wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Death's Web", qualtity: qualities.unique}]},
    {name: "Vortex Orb",          wsm:  0, type:2, classItem: 6, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Voulge",              wsm:  0, type:6, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Steelgoad", qualtity: qualities.unique}]},
    {name: "Walking Stick",       wsm:-10, type:6, classItem:-1, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Wand",                wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Torch of Iro", qualtity: qualities.unique}]},
    {name: "War Axe",             wsm:  0, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Rakescar", qualtity: qualities.unique}]},
    {name: "War Club",            wsm: 10, type:6, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Bloodtree Stump", qualtity: qualities.unique}]},
    {name: "War Dart",            wsm:-20, type:4, classItem:-1, weaponCategory:3, canZeal:false, commonItems: []},
    {name: "War Fist",            wsm: 10, type:1, classItem: 1, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "War Fork",            wsm:-20, type:5, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Soulfeast Tine", qualtity: qualities.unique}]},
    {name: "War Hammer",          wsm: 20, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Ironstone", qualtity: qualities.unique}]},
    {name: "War Javelin",         wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:false, commonItems: []},
    {name: "War Pike",            wsm: 20, type:5, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Steel Pillar", qualtity: qualities.unique}, {title: "Breath of the Dying", qualtity: qualities.normal}]},
    {name: "War Scepter",         wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Stormeye", qualtity: qualities.unique}, {title: "Milabrega's Rod", qualtity: qualities.set}]},
    {name: "War Scythe",          wsm:-10, type:6, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "The Grim Reaper", qualtity: qualities.unique}]},
    {name: "War Spear",           wsm:-10, type:5, classItem:-1, weaponCategory:8, canZeal:false, commonItems: [{title: "The Impaler", qualtity: qualities.unique}]},
    {name: "War Spike",           wsm:-10, type:2, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Cranebeak", qualtity: qualities.unique}]},
    {name: "War Staff",           wsm: 20, type:6, classItem:-1, weaponCategory:0, canZeal:true,  commonItems: [{title: "The Iron Jang Bong", qualtity: qualities.unique}, {title: "Arcanna's Deathwand", qualtity: qualities.set}]},
    {name: "War Sword",           wsm:  0, type:2, classItem:-1, weaponCategory:9, canZeal:false, commonItems: [{title: "Culwen's Point", qualtity: qualities.unique}, {title: "Death's Touch", qualtity: qualities.set}]},
    {name: "Ward Bow",            wsm:  0, type:7, classItem:-1, weaponCategory:1, canZeal:false, commonItems: [{title: "Widowmaker", qualtity: qualities.unique}]},
    {name: "Winged Axe",          wsm:-10, type:2, classItem:-1, weaponCategory:3, canZeal:false, commonItems: [{title: "Lacerator", qualtity: qualities.unique}]},
    {name: "Winged Harpoon",      wsm:-10, type:4, classItem:-1, weaponCategory:2, canZeal:false, commonItems: [{title: "Gargoyle's Bite", qualtity: qualities.unique}]},
    {name: "Winged Knife",        wsm:-20, type:4, classItem:-1, weaponCategory:3, canZeal:false, commonItems: [{title: "Warshrike", qualtity: qualities.unique}]},
    {name: "Wrist Blade",         wsm:  0, type:1, classItem: 1, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Wrist Spike",         wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:false, commonItems: []},
    {name: "Wrist Sword",         wsm:-10, type:1, classItem: 1, weaponCategory:0, canZeal:true,  commonItems: [{title: "Jade Talon", qualtity: qualities.unique}]},
    {name: "Yari",                wsm:  0, type:5, classItem:-1, weaponCategory:8, canZeal:true,  commonItems: [{title: "Hone Sundan", qualtity: qualities.unique}]},
    {name: "Yew Wand",            wsm: 10, type:2, classItem:-1, weaponCategory:0, canZeal:false, commonItems: [{title: "Maelstrom", qualtity: qualities.unique}]},
    {name: "Zweihander",          wsm:-10, type:3, classItem:-1, weaponCategory:9, canZeal:true,  commonItems: [{title: "Todesfaelle Flamme", qualtity: qualities.unique}]},
];

export function isDagger(weaponId) {
    var weap = lookupWeapon[weaponId];
    if (weap.type == weaponTypes.oneHandedThrustingWeapon && weap.weaponCategory == weaponCategories.other) {
        return true;
    }
    return false;
}

export var data = {
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
        },
        {
            title: "Fists of Ice",
            index: 34,
            animation: 1,
            sequence: 2,
            rollback: 100
        },
        {
            title: "Static Strike",
            index: 35,
            animation: 1,
            sequence: 2,
            rollback: 100
        },
        {
            title: "Emberstorm",
            index: 36,
            animation: 1,
            sequence: 2,
            rollback: 100
        }
    ]
};

//app.updateCurrent();
