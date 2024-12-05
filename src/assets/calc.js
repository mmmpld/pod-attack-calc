import { localeStringsEn as d2InternalStrings, weapons as d2InternalWeapons } from 'pod-data'

export function findInternalWeaponByName (weaponName) {
  const weaponValues = Object.values(d2InternalWeapons)
  const namestrs = findInternalStringKeys(weaponName) // the shown name is not always the internal name (Ballista = Balista) so look up the keys
  if (namestrs) {
    // string language matched
    const namestr = namestrs[0] // assume the first match is the correct one
    return weaponValues.find(w => w.namestr === namestr)
  }
  // there was no string language match so use the name
  return weaponValues.find(w => w.name === weaponName)
}

export function findInternalStringKeys (stringToFind) {
  const nameKeys = []
  for (const [key, value] of Object.entries(d2InternalStrings)) {
    const string = value
    if (string === stringToFind) {
      nameKeys.push(key)
    }
  }
  return nameKeys
}

// Animation lengths
// first level is weapon "type" from lookupweapon
// second level is char class value, or [11] for the description
// third level: [swing frames, alternate swing frames]. Notes: first value is used as "FramesPerDirection" (shape shifted frames? Zeal rollback3), second value is "frames". 
// Note that the animation contains matching start and end frames, which the game will combine into a single frame when chaining animations. The fpa formula removes one frame to account for this.
export const weaponClassFrames = [
  [
    [13, 13], // Amazon
    [11, 11], // Assassin
    [12, 12], // Barbarian
    [16, 16], // Druid
    [15, 15], // Necromancer
    [14, 14], // Paladin
    [16, 16], // Sorceress
    [15, 15], // Act 1 Merc - Rogue
    [16, 16], // Act 2 Merc - Town Guard
    [16, 16], // Act 5 Merc - Barbarian
    [15, 15], // Act 3 Merc - Iron Wolves
    'unarmed' // description text
  ],
  [
    [0, 0], // Amazon
    [11, 12], // Assassin [attack one - swipe, attack 2 - stab] https://www.spriters-resource.com/pc_computer/diablo2diablo2lordofdestruction/sheet/54288/
    [0, 0], // Barbarian
    [0, 0], // Druid
    [0, 0], // Necromancer
    [0, 0], // Paladin
    [0, 0], // Sorceress
    0, // Act 1 Merc - Rogue
    0, // Act 2 Merc - Town Guard
    0, // Act 5 Merc - Barbarian
    0, // Act 3 Merc - Iron Wolves
    'claw' // description text
  ],
  [
    [16, 16], // Amazon
    [15, 15], // Assassin
    [16, 16], // Barbarian
    [19, 19], // Druid
    [19, 19], // Necromancer
    [15, 15], // Paladin
    [20, 20], // Sorceress
    0, // Act 1 Merc - Rogue
    0, // Act 2 Merc - Town Guard
    [16, 16], // Act 5 Merc - Barbarian
    [15, 15], // Act 3 Merc - Iron Wolves
    'one-handed swinging weapon' // description text
  ],
  [
    [20, 20], // Amazon
    [23, 23], // Assassin
    [18, 18], // Barbarian
    [21, 21], // Druid
    [23, 23], // Necromancer
    [18, 19], // Paladin [attack one - swipe, attack 2 - overhead slash]
    [24, 24], // Sorceress
    0, // Act 1 Merc - Rogue
    0, // Act 2 Merc - Town Guard
    [16, 16], // Act 5 Merc - Barbarian
    0, // Act 3 Merc - Iron Wolves
    'two-handed sword' // description text
  ],
  [
    [15, 15], // Amazon
    [15, 15], // Assassin
    [16, 16], // Barbarian
    [19, 19], // Druid
    [19, 19], // Necromancer
    [17, 17], // Paladin
    [19, 19], // Sorceress
    0, // Act 1 Merc - Rogue
    [16, 16], // Act 2 Merc - Town Guard
    0, // Act 5 Merc - Barbarian
    0, // Act 3 Merc - Iron Wolves
    'one-handed thrusting weapon' // description text
  ],
  [
    [18, 18], // Amazon
    [23, 23], // Assassin
    [19, 19], // Barbarian
    [23, 23], // Druid
    [24, 24], // Necromancer
    [20, 20], // Paladin
    [23, 23], // Sorceress
    0, // Act 1 Merc - Rogue
    [16, 16], // Act 2 Merc - Town Guard
    0, // Act 5 Merc - Barbarian
    0, // Act 3 Merc - Iron Wolves
    'spear' // description text
  ],
  [
    [20, 20], // Amazon
    [19, 19], // Assassin
    [19, 19], // Barbarian
    [17, 17], // Druid
    [20, 20], // Necromancer
    [18, 18], // Paladin
    [18, 18], // Sorceress
    0, // Act 1 Merc - Rogue
    [16, 16], // Act 2 Merc - Town Guard
    0, // Act 5 Merc - Barbarian
    0, // Act 3 Merc - Iron Wolves
    'two-handed weapon' // description text
  ],
  [
    [14, 14], // Amazon
    [16, 16], // Assassin
    [15, 15], // Barbarian
    [16, 16], // Druid
    [18, 18], // Necromancer
    [16, 16], // Paladin
    [17, 17], // Sorceress
    [15, 15], // Act 1 Merc - Rogue
    0, // Act 2 Merc - Town Guard
    0, // Act 5 Merc - Barbarian
    0, // Act 3 Merc - Iron Wolves
    'bow' // description text
  ],
  [
    [20, 20], // Amazon
    [21, 21], // Assassin
    [20, 20], // Barbarian
    [20, 20], // Druid
    [20, 20], // Necromancer
    [20, 20], // Paladin
    [20, 20], // Sorceress
    [15, 15], // Act 1 Merc - Rogue
    0, // Act 2 Merc - Town Guard
    0, // Act 5 Merc - Barbarian
    0, // Act 3 Merc - Iron Wolves
    'crossbow' // description text
  ],
  [16, 16, 16, 18, 20, 16, 20] // Throw
]

// used by zeal, strafe, and fend
// first level is the weapon type
// second level is the character class
export const aktionsframe = [
  [8, 6, 6, 8, 8, 7, 9],
  [0, 6, 0, 0, 0, 0, 0], // claws
  [10, 7, 7, 9, 9, 7, 12],
  [12, 11, 8, 10, 11, 8, 14],
  [9, 7, 7, 8, 9, 8, 11],
  [11, 10, 9, 9, 10, 8, 13],
  [12, 9, 9, 9, 11, 9, 11],
  [6, 7, 7, 8, 9, 8, 9],
  [9, 10, 10, 10, 11, 10, 11]
]

// first level attackSkill.sequence
// second level weaponType
export const sequences = [
  [0, 0, 0, 0, 21, 24, 0, 0, 0],
  [0, 0, 0, 0, 18, 21, 0, 0, 0],
  [12, 12, 16, 0, 0, 0, 0, 0, 0],
  [0, 0, 17, 17, 17, 0, 0, 0, 0],
  [0, 0, 12, 0, 12, 0, 0, 0, 0]
]

export const qualities = Object.freeze({
  normal: 0,
  magic: 1,
  rare: 2,
  set: 3,
  unique: 4,
  crafted: 5,
  runeword: 6
})

export const weaponTypes = Object.freeze({
  unarmed: 0,
  claw: 1,
  oneHandedSwingingWeapon: 2,
  twoHandedSword: 3,
  oneHandedThrustingWeapon: 4,
  spear: 5,
  twoHandedWeapon: 6,
  bow: 7,
  crossbow: 8
})

export const weaponCategories = Object.freeze({
  other: 0,
  bowOrXbow: 1,
  spearOrJavalin: 2,
  throwing: 3,
  polearm: 8,
  swords: 9
})

export const lookupWeapon = [
  { name: '[unarmed]', wsm: 0, type: 0, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Ancient Axe', wsm: 10, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'The Minotaur', quality: qualities.unique }] },
  { name: 'Ancient Sword', wsm: 0, type: 2, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [{ title: 'The Atlantean', quality: qualities.unique }] },
  { name: 'Arbalest', wsm: -10, type: 8, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Langer Briser', quality: qualities.unique }] },
  { name: 'Archon Staff', wsm: 10, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: "Mang Song's Lesson", quality: qualities.unique }] },
  { name: 'Ashwood Bow', wsm: 0, type: 7, classItem: 0, weaponCategory: 1, canZeal: false, commonItems: [] },
  { name: 'Ataghan', wsm: -20, type: 2, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [{ title: 'Djinn Slayer', quality: qualities.unique }] },
  { name: 'Axe', wsm: 10, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Deathspade', quality: qualities.unique }] },
  { name: 'Balanced Axe', wsm: -10, type: 2, classItem: -1, weaponCategory: 3, canZeal: false, commonItems: [] },
  { name: 'Balanced Knife', wsm: -20, type: 4, classItem: -1, weaponCategory: 3, canZeal: false, commonItems: [] },
  { name: 'Ballista', wsm: 10, type: 8, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Buriza-Do Kyanon', quality: qualities.unique }] },
  { name: 'Balrog Blade', wsm: 0, type: 3, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: 'Flamebellow', quality: qualities.unique }] },
  { name: 'Balrog Spear', wsm: 10, type: 4, classItem: -1, weaponCategory: 2, canZeal: false, commonItems: [{ title: "Demon's Arch", quality: qualities.unique }] },
  { name: 'Barbed Club', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Fleshrender', quality: qualities.unique }] },
  { name: 'Bardiche', wsm: 10, type: 6, classItem: -1, weaponCategory: 8, canZeal: false, commonItems: [{ title: "Dimoak's Hew", quality: qualities.unique }] },
  { name: 'Bastard Sword', wsm: 10, type: 3, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: 'Blacktongue', quality: qualities.unique }] },
  { name: 'Battle Axe', wsm: 10, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'The Chieftain', quality: qualities.unique }] },
  { name: 'Battle Cestus', wsm: -10, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Shadow Killer', quality: qualities.unique }] },
  { name: 'Battle Dart', wsm: 0, type: 4, classItem: -1, weaponCategory: 3, canZeal: false, commonItems: [{ title: 'Deathbit', quality: qualities.unique }] },
  { name: 'Battle Hammer', wsm: 20, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Earthshaker', quality: qualities.unique }] },
  { name: 'Battle Scythe', wsm: -10, type: 6, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: "Athena's Wrath", quality: qualities.unique }] },
  { name: 'Battle Staff', wsm: 0, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'The Salamander', quality: qualities.unique }, { title: "Cathan's Rule", quality: qualities.set }] },
  { name: 'Battle Sword', wsm: 0, type: 2, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: 'Headstriker', quality: qualities.unique }] },
  { name: 'Bearded Axe', wsm: 0, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Spellsteel', quality: qualities.unique }] },
  { name: 'Bec-de-Corbin', wsm: 0, type: 6, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'Husoldal Evo', quality: qualities.unique }] },
  { name: 'Berserker Axe', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Death Cleaver', quality: qualities.unique }] },
  { name: 'Bill', wsm: 0, type: 6, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'Blackleach Blade', quality: qualities.unique }, { title: "Hwanin's Justice", quality: qualities.set }] },
  { name: 'Blade Bow', wsm: -10, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [] },
  { name: 'Blade Talons', wsm: -20, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Blade', wsm: -10, type: 4, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Spectral Shard', quality: qualities.unique }] },
  { name: 'Bone Knife', wsm: -20, type: 4, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Wizardspike', quality: qualities.unique }] },
  { name: 'Bone Wand', wsm: -20, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Gravenspine', quality: qualities.unique }, { title: "Sander's Superstition", quality: qualities.set }] },
  { name: 'Brandistock', wsm: -20, type: 5, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'Bloodthief', quality: qualities.unique }] },
  { name: 'Broad Axe', wsm: 0, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Goreshovel', quality: qualities.unique }] },
  { name: 'Broad Sword', wsm: 0, type: 2, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: "Griswold's Edge", quality: qualities.unique }, { title: "Isenhart's Lightbrand", quality: qualities.set }] },
  { name: 'Burnt Wand', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Suicide Branch', quality: qualities.unique }] },
  { name: 'Caduceus', wsm: -10, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: '', quality: qualities.unique }, { title: "Griswold's Redemption", quality: qualities.set }] },
  { name: 'Cedar Bow', wsm: 0, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Kuko Shakaku', quality: qualities.unique }] },
  { name: 'Cedar Staff', wsm: 10, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Chromatic Ire', quality: qualities.unique }] },
  { name: 'Ceremonial Bow', wsm: 10, type: 7, classItem: 0, weaponCategory: 1, canZeal: false, commonItems: [{ title: "Lycander's Aim", quality: qualities.unique }] },
  { name: 'Ceremonial Javelin', wsm: -10, type: 4, classItem: 0, weaponCategory: 2, canZeal: false, commonItems: [{ title: "Titan's Revenge", quality: qualities.unique }] },
  { name: 'Ceremonial Pike', wsm: 20, type: 5, classItem: 0, weaponCategory: 8, canZeal: true, commonItems: [{ title: "Lycander's Flank", quality: qualities.unique }] },
  { name: 'Ceremonial Spear', wsm: 0, type: 5, classItem: 0, weaponCategory: 8, canZeal: true, commonItems: [] },
  { name: 'Cestus', wsm: 0, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Champion Axe', wsm: -10, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: "Messerschmidt's Reaver", quality: qualities.unique }] },
  { name: 'Champion Sword', wsm: -10, type: 3, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: 'Doombringer', quality: qualities.unique }] },
  { name: 'Chu-Ko-Nu', wsm: -60, type: 8, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Demon Machine', quality: qualities.unique }] },
  { name: 'Cinquedeas', wsm: -20, type: 4, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: "Blackbog's Sharp", quality: qualities.unique }] },
  { name: 'Clasped Orb', wsm: 0, type: 2, classItem: 6, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Claws', wsm: -10, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Claymore', wsm: 10, type: 3, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: 'Soulflay', quality: qualities.unique }] },
  { name: 'Cleaver', wsm: 10, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: "Butcher's Pupil", quality: qualities.unique }] },
  { name: 'Cloudy Sphere', wsm: 0, type: 2, classItem: 6, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Club', wsm: -10, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Felloak', quality: qualities.unique }] },
  { name: 'Colossus Blade', wsm: 5, type: 3, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: 'The Grandfather', quality: qualities.unique }, { title: "Bul-Kathos' Sacred Charge", quality: qualities.set }] },
  { name: 'Colossus Crossbow', wsm: 10, type: 8, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Hellrack', quality: qualities.unique }] },
  { name: 'Colossus Sword', wsm: 10, type: 3, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [] },
  { name: 'Colossus Voulge', wsm: 10, type: 6, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [] },
  { name: 'Composite Bow', wsm: -10, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: "Rogue's Bow", quality: qualities.unique }] },
  { name: 'Conquest Sword', wsm: 0, type: 2, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [] },
  { name: 'Crossbow', wsm: 0, type: 8, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Ichorstring', quality: qualities.unique }] },
  { name: 'Crowbill', wsm: -10, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: "Pompeii's Wrath", quality: qualities.unique }] },
  { name: 'Crusader Bow', wsm: 10, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Eaglehorn', quality: qualities.unique }] },
  { name: 'Cryptic Axe', wsm: 10, type: 6, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'Tomb Reaver', quality: qualities.unique }] },
  { name: 'Cryptic Sword', wsm: -10, type: 2, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: 'Frostwind', quality: qualities.unique }, { title: "Sazabi's Cobalt Redeemer", quality: qualities.set }] },
  { name: 'Crystal Sword', wsm: 0, type: 2, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [] },
  { name: 'Crystalline Globe', wsm: -10, type: 2, classItem: 6, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Cudgel', wsm: -10, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Dark Clan Crusher', quality: qualities.unique }] },
  { name: 'Cutlass', wsm: -30, type: 2, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [{ title: 'Coldsteel Eye', quality: qualities.unique }] },
  { name: 'Dacian Falx', wsm: 10, type: 3, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: 'Bing Sz Wang', quality: qualities.unique }] },
  { name: 'Dagger', wsm: -20, type: 4, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Gull', quality: qualities.unique }] },
  { name: 'Decapitator', wsm: 10, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Hellslayer', quality: qualities.unique }] },
  { name: 'Demon Crossbow', wsm: -60, type: 8, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Gut Siphon', quality: qualities.unique }] },
  { name: 'Demon Heart', wsm: 0, type: 2, classItem: 6, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Devil Star', wsm: 10, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: "Barana's Star", quality: qualities.unique }] },
  { name: 'Diamond Bow', wsm: 0, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [] },
  { name: 'Dimensional Blade', wsm: 0, type: 2, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: "Ginther's Rift", quality: qualities.unique }] },
  { name: 'Dimensional Shard', wsm: 10, type: 2, classItem: 6, weaponCategory: 0, canZeal: false, commonItems: [{ title: "Death's Fathom", quality: qualities.unique }] },
  { name: 'Dirk', wsm: 0, type: 4, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'The Diggler', quality: qualities.unique }] },
  { name: 'Divine Scepter', wsm: -10, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Hand of Blessed Light', quality: qualities.unique }] },
  { name: 'Double Axe', wsm: 10, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Bladebone', quality: qualities.unique }, { title: "Berserker's Hatchet", quality: qualities.set }] },
  { name: 'Double Bow', wsm: -10, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Endlesshail', quality: qualities.unique }] },
  { name: 'Eagle Orb', wsm: -10, type: 2, classItem: 6, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Edge Bow', wsm: 5, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Skystrike', quality: qualities.unique }] },
  { name: 'Elder Staff', wsm: 0, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: "Ondal's Wisdom", quality: qualities.unique }, { title: "Naj's Puzzler", quality: qualities.set }] },
  { name: 'Eldritch Orb', wsm: -10, type: 2, classItem: 6, weaponCategory: 0, canZeal: false, commonItems: [{ title: "Eschuta's Temper", quality: qualities.unique }] },
  { name: 'Elegant Blade', wsm: -10, type: 2, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [{ title: 'Bloodmoon', quality: qualities.unique }] },
  { name: 'Espandon', wsm: 0, type: 3, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [{ title: 'Crainte Vomir', quality: qualities.unique }] },
  { name: 'Ettin Axe', wsm: 10, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Rune Master', quality: qualities.unique }] },
  { name: 'Executioner Sword', wsm: 10, type: 3, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: 'Swordguard', quality: qualities.unique }] },
  { name: 'Falcata', wsm: 0, type: 2, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [] },
  { name: 'Falchion', wsm: 20, type: 2, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [{ title: 'Gleamscythe', quality: qualities.unique }] },
  { name: 'Fanged Knife', wsm: -20, type: 4, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Fleshripper', quality: qualities.unique }] },
  { name: 'Fascia', wsm: 10, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Feral Axe', wsm: -15, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [] },
  { name: 'Feral Claws', wsm: -20, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [{ title: "Firelizard's Talons", quality: qualities.unique }] },
  { name: 'Flail', wsm: -10, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: "The General's Tan Do Li Ga", quality: qualities.unique }] },
  { name: 'Flamberge', wsm: -10, type: 3, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: 'Ripsaw', quality: qualities.unique }] },
  { name: 'Flanged Mace', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Sureshrill Frost', quality: qualities.unique }] },
  { name: 'Flying Axe', wsm: 10, type: 2, classItem: -1, weaponCategory: 3, canZeal: false, commonItems: [{ title: 'Gimmershred', quality: qualities.unique }] },
  { name: 'Francisca', wsm: 10, type: 2, classItem: -1, weaponCategory: 3, canZeal: false, commonItems: [{ title: 'The Scalper', quality: qualities.unique }] },
  { name: 'Fuscina', wsm: 0, type: 5, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'Kelpie Snare', quality: qualities.unique }] },
  { name: 'Ghost Glaive', wsm: 20, type: 4, classItem: -1, weaponCategory: 2, canZeal: false, commonItems: [{ title: 'Wraith Flight', quality: qualities.unique }] },
  { name: 'Ghost Spear', wsm: 0, type: 5, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [] },
  { name: 'Ghost Wand', wsm: 10, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Giant Axe', wsm: 10, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Humongous', quality: qualities.unique }] },
  { name: 'Giant Sword', wsm: 0, type: 3, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: "Kinemil's Awl", quality: qualities.unique }] },
  { name: 'Giant Thresher', wsm: -10, type: 6, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'Stormspire', quality: qualities.unique }] },
  { name: 'Gladius', wsm: 0, type: 2, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [{ title: 'Bloodletter', quality: qualities.unique }] },
  { name: 'Glaive', wsm: 20, type: 4, classItem: -1, weaponCategory: 2, canZeal: false, commonItems: [] },
  { name: 'Glorious Axe', wsm: 10, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: "Executioner's Justice", quality: qualities.unique }] },
  { name: 'Glowing Orb', wsm: -10, type: 2, classItem: 6, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Gnarled Staff', wsm: 10, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Spire of Lazarus', quality: qualities.unique }] },
  { name: 'Gorgon Crossbow', wsm: 0, type: 8, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [] },
  { name: 'Gothic Axe', wsm: -10, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Boneslayer Blade', quality: qualities.unique }] },
  { name: 'Gothic Bow', wsm: 10, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Goldstrike Arch', quality: qualities.unique }] },
  { name: 'Gothic Staff', wsm: 0, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Warpspear', quality: qualities.unique }] },
  { name: 'Gothic Sword', wsm: 10, type: 3, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: 'Cloudcrack', quality: qualities.unique }] },
  { name: 'Grand Matron Bow', wsm: 10, type: 7, classItem: 0, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Faith', quality: qualities.runeword }, { title: "M'avina's Caster", quality: qualities.set }] },
  { name: 'Grand Scepter', wsm: 10, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Rusthandle', quality: qualities.unique }, { title: "Civerb's Cudgel", quality: qualities.set }] },
  { name: 'Grave Wand', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Blackhand Key', quality: qualities.unique }] },
  { name: 'Great Axe', wsm: -10, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Brainhew', quality: qualities.unique }] },
  { name: 'Great Bow', wsm: -10, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [] },
  { name: 'Great Maul', wsm: 20, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Steeldriver', quality: qualities.unique }] },
  { name: 'Great Pilum', wsm: 0, type: 4, classItem: -1, weaponCategory: 2, canZeal: false, commonItems: [] },
  { name: 'Great Poleaxe', wsm: 0, type: 6, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [] },
  { name: 'Great Sword', wsm: 10, type: 3, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: 'The Patriarch', quality: qualities.unique }] },
  { name: 'Greater Claws', wsm: -20, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Greater Talons', wsm: -30, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [{ title: "Bartuc's Cut-Throat", quality: qualities.unique }] },
  { name: 'Grim Scythe', wsm: -10, type: 6, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: "Grim's Burning Dead", quality: qualities.unique }] },
  { name: 'Grim Wand', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: "Ume's Lament", quality: qualities.unique }, { title: 'Infernal Torch', quality: qualities.set }] },
  { name: 'Halberd', wsm: 0, type: 6, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'Woestave', quality: qualities.unique }] },
  { name: 'Hand Axe', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'The Gnasher', quality: qualities.unique }] },
  { name: 'Hand Scythe', wsm: -10, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Harpoon', wsm: -10, type: 4, classItem: -1, weaponCategory: 2, canZeal: false, commonItems: [] },
  { name: 'Hatchet Hands', wsm: 10, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Hatchet', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Coldkill', quality: qualities.unique }] },
  { name: 'Heavenly Stone', wsm: -10, type: 2, classItem: 6, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Heavy Crossbow', wsm: 10, type: 8, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Hellcast', quality: qualities.unique }] },
  { name: 'Highland Blade', wsm: -5, type: 3, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [] },
  { name: 'Holy Water Sprinkler', wsm: 10, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'The Fetid Sprinkler', quality: qualities.unique }] },
  { name: "Hunter's Bow", wsm: -10, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Witherstring', quality: qualities.unique }] },
  { name: 'Hurlbat', wsm: -10, type: 2, classItem: -1, weaponCategory: 3, canZeal: false, commonItems: [] },
  { name: 'Hydra Bow', wsm: 10, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Windforce', quality: qualities.unique }] },
  { name: 'Hydra Edge', wsm: 10, type: 2, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [] },
  { name: 'Hyperion Javelin', wsm: -10, type: 4, classItem: -1, weaponCategory: 2, canZeal: false, commonItems: [] },
  { name: 'Hyperion Spear', wsm: -10, type: 5, classItem: -1, weaponCategory: 8, canZeal: false, commonItems: [{ title: "Arioc's Needle", quality: qualities.unique }] },
  { name: 'Jagged Star', wsm: 10, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Moonfall', quality: qualities.unique }, { title: "Aldur's Rhythm", quality: qualities.set }] },
  { name: "Jared's Stone", wsm: 10, type: 2, classItem: 6, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Javelin', wsm: -10, type: 4, classItem: -1, weaponCategory: 2, canZeal: false, commonItems: [] },
  { name: 'Jo Staff', wsm: -10, type: 6, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Razorswitch', quality: qualities.unique }] },
  { name: 'Katar', wsm: -10, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Knout', wsm: -10, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: "Beazil's Vortex", quality: qualities.unique }] },
  { name: 'Kris', wsm: -20, type: 4, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'The Jade Tan Do', quality: qualities.unique }] },
  { name: 'Lance', wsm: 20, type: 5, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'Spire of Honor', quality: qualities.unique }] },
  { name: 'Large Axe', wsm: -10, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Axe of Fechmar', quality: qualities.unique }] },
  { name: 'Large Siege Bow', wsm: 10, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Cliffkiller', quality: qualities.unique }] },
  { name: 'Legend Spike', wsm: -10, type: 4, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Ghostflame', quality: qualities.unique }] },
  { name: 'Legend Sword', wsm: -15, type: 3, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [] },
  { name: 'Legendary Mallet', wsm: 20, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: "Schaefer's Hammer", quality: qualities.unique }, { title: 'Stone Crusher', quality: qualities.unique }] },
  { name: 'Lich Wand', wsm: -20, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Boneshade', quality: qualities.unique }] },
  { name: 'Light Crossbow', wsm: -10, type: 8, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Leadcrow', quality: qualities.unique }] },
  { name: 'Lochaber Axe', wsm: 10, type: 6, classItem: -1, weaponCategory: 8, canZeal: false, commonItems: [{ title: 'The Meat Scraper', quality: qualities.unique }] },
  { name: 'Long Battle Bow', wsm: 10, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Wizendraw', quality: qualities.unique }, { title: "Vidala's Barb", quality: qualities.set }] },
  { name: 'Long Bow', wsm: 0, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Raven Claw', quality: qualities.unique }] },
  { name: 'Long Staff', wsm: 0, type: 6, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Serpent Lord', quality: qualities.unique }] },
  { name: 'Long Sword', wsm: -10, type: 2, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: 'Hellplague', quality: qualities.unique }, { title: "Cleglaw's tooth", quality: qualities.set }] },
  { name: 'Long War Bow', wsm: 10, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Blastbark', quality: qualities.unique }] },
  { name: 'Mace', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Crushflange', quality: qualities.unique }] },
  { name: 'Maiden Javelin', wsm: -10, type: 4, classItem: 0, weaponCategory: 2, canZeal: false, commonItems: [] },
  { name: 'Maiden Pike', wsm: 10, type: 5, classItem: 0, weaponCategory: 8, canZeal: true, commonItems: [] },
  { name: 'Maiden Spear', wsm: 0, type: 5, classItem: 0, weaponCategory: 8, canZeal: true, commonItems: [] },
  { name: 'Mancatcher', wsm: -20, type: 5, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'Viperfork', quality: qualities.unique }] },
  { name: 'Martel de Fer', wsm: 20, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'The Gavel of Pain', quality: qualities.unique }] },
  { name: 'Matriarchal Bow', wsm: -10, type: 7, classItem: 0, weaponCategory: 1, canZeal: false, commonItems: [{ title: "Blood Raven's Charge", quality: qualities.unique }] },
  { name: 'Matriarchal Javelin', wsm: -10, type: 4, classItem: 0, weaponCategory: 2, canZeal: false, commonItems: [{ title: 'Thunderstroke', quality: qualities.unique }] },
  { name: 'Matriarchal Pike', wsm: 20, type: 5, classItem: 0, weaponCategory: 8, canZeal: true, commonItems: [] },
  { name: 'Matriarchal Spear', wsm: 0, type: 5, classItem: 0, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'Stoneraven', quality: qualities.unique }] },
  { name: 'Maul', wsm: 10, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Bonesnap', quality: qualities.unique }] },
  { name: 'Mighty Scepter', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: "Heaven's Light", quality: qualities.unique }, { title: 'The Redeemer', quality: qualities.unique }] },
  { name: 'Military Axe', wsm: -10, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: "Warlord's Trust", quality: qualities.unique }] },
  { name: 'Military Pick', wsm: -10, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Skull Splitter', quality: qualities.unique }, { title: "Tancred's Crowbill", quality: qualities.set }] },
  { name: 'Mithril Point', wsm: 0, type: 4, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Morning Star', wsm: 10, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Bloodrise', quality: qualities.unique }] },
  { name: 'Mythical Sword', wsm: 0, type: 2, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [{ title: "Bul-Kathos' Tribal Guardian", quality: qualities.set }] },
  { name: 'Naga', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Guardian Naga', quality: qualities.unique }] },
  { name: 'Ogre Axe', wsm: 0, type: 6, classItem: -1, weaponCategory: 8, canZeal: false, commonItems: [{ title: 'Bonehew', quality: qualities.unique }] },
  { name: 'Ogre Maul', wsm: 10, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Windhammer', quality: qualities.unique }, { title: "Immortal King's Stone Crusher", quality: qualities.set }] },
  { name: 'Partizan', wsm: 10, type: 6, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'Pierre Tombale Couant', quality: qualities.unique }] },
  { name: 'Pellet Bow', wsm: -10, type: 8, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [] },
  { name: 'Petrified Wand', wsm: 10, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Carin Shard', quality: qualities.unique }] },
  { name: 'Phase Blade', wsm: -30, type: 2, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: 'Lightsabre', quality: qualities.unique }, { title: 'Azurewrath', quality: qualities.unique }, { title: 'Grief', quality: qualities.runeword }] },
  { name: 'Pike', wsm: 20, type: 5, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'The Tannr Gorerod', quality: qualities.unique }] },
  { name: 'Pilum', wsm: 0, type: 4, classItem: -1, weaponCategory: 2, canZeal: false, commonItems: [] },
  { name: 'Poignard', wsm: -20, type: 4, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Spineripper', quality: qualities.unique }] },
  { name: 'Poleaxe', wsm: 10, type: 6, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'The Battlebranch', quality: qualities.unique }] },
  { name: 'Polished Wand', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Quarterstaff', wsm: 0, type: 6, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Ribcracker', quality: qualities.unique }] },
  { name: 'Quhab', wsm: 0, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Razor Bow', wsm: -10, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Riphook', quality: qualities.unique }] },
  { name: 'Reflex Bow', wsm: 10, type: 7, classItem: 0, weaponCategory: 1, canZeal: false, commonItems: [] },
  { name: 'Reinforced Mace', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: '', quality: qualities.unique }, { title: "Dangoon's Teaching", quality: qualities.set }] },
  { name: 'Repeating Crossbow', wsm: -40, type: 8, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Doomslinger', quality: qualities.unique }] },
  { name: 'Rondel', wsm: 0, type: 4, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Heart Carver', quality: qualities.unique }] },
  { name: 'Rune Bow', wsm: 0, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Magewrath', quality: qualities.unique }] },
  { name: 'Rune Scepter', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: "Zakarum's Hand", quality: qualities.unique }] },
  { name: 'Rune Staff', wsm: 20, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Skull Collector', quality: qualities.unique }] },
  { name: 'Rune Sword', wsm: -10, type: 2, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: 'Plague Bearer', quality: qualities.unique }] },
  { name: 'Runic Talons', wsm: -30, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Sabre', wsm: -10, type: 2, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [{ title: 'Skewer of Krintiz', quality: qualities.unique }, { title: 'Angelic Sickle', quality: qualities.set }] },
  { name: 'Sacred Globe', wsm: -10, type: 2, classItem: 6, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Scepter', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Knell Striker', quality: qualities.unique }] },
  { name: 'Scimitar', wsm: -20, type: 2, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [{ title: 'Blood Crescent', quality: qualities.unique }] },
  { name: 'Scissors Katar', wsm: -10, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Scissors Quhab', wsm: 0, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Scissors Suwayyah', wsm: 0, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [{ title: "Natalya's Mark", quality: qualities.set }] },
  { name: 'Scourge', wsm: -10, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: "Horizon's Tornado", quality: qualities.unique }, { title: 'Stormlash', quality: qualities.unique }] },
  { name: 'Scythe', wsm: -10, type: 6, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'Soul Harvest', quality: qualities.unique }] },
  { name: 'Seraph Rod', wsm: 10, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Shadow Bow', wsm: 0, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [] },
  { name: 'Shamshir', wsm: -10, type: 2, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [{ title: 'Hexfire', quality: qualities.unique }] },
  { name: 'Shillelagh', wsm: 0, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [] },
  { name: 'Short Battle Bow', wsm: 0, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Stormstrike', quality: qualities.unique }] },
  { name: 'Short Bow', wsm: 5, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Pluckeye', quality: qualities.unique }] },
  { name: 'Short Siege Bow', wsm: 0, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Witchwild String', quality: qualities.unique }] },
  { name: 'Short Spear', wsm: 10, type: 4, classItem: -1, weaponCategory: 2, canZeal: false, commonItems: [] },
  { name: 'Short Staff', wsm: -10, type: 6, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Bane Ash', quality: qualities.unique }] },
  { name: 'Short Sword', wsm: 0, type: 2, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [{ title: "Rixot's Keen", quality: qualities.unique }] },
  { name: 'Short War Bow', wsm: 0, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Hellclap', quality: qualities.unique }, { title: 'Arctic Horn', quality: qualities.set }] },
  { name: 'Siege Crossbow', wsm: 0, type: 8, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Pus Spitter', quality: qualities.unique }] },
  { name: 'Silver-edged Axe', wsm: 0, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Ethereal Edge', quality: qualities.unique }] },
  { name: 'Simbilan', wsm: 10, type: 4, classItem: -1, weaponCategory: 2, canZeal: false, commonItems: [] },
  { name: 'Small Crescent', wsm: 10, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [] },
  { name: 'Smoked Sphere', wsm: 0, type: 2, classItem: 6, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Sparkling Ball', wsm: 0, type: 2, classItem: 6, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Spear', wsm: -10, type: 5, classItem: -1, weaponCategory: 8, canZeal: false, commonItems: [{ title: 'The Dragon Chang', quality: qualities.unique }] },
  { name: 'Spetum', wsm: 0, type: 5, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'Lance of Yaggai', quality: qualities.unique }] },
  { name: 'Spiculum', wsm: 20, type: 4, classItem: -1, weaponCategory: 2, canZeal: false, commonItems: [] },
  { name: 'Spider Bow', wsm: 5, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [] },
  { name: 'Spiked Club', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Stoutnail', quality: qualities.unique }] },
  { name: 'Stag Bow', wsm: 0, type: 7, classItem: 0, weaponCategory: 1, canZeal: false, commonItems: [] },
  { name: 'Stalagmite', wsm: 10, type: 6, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Stiletto', wsm: -10, type: 4, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Stormspike', quality: qualities.unique }] },
  { name: 'Stygian Pike', wsm: 0, type: 5, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [] },
  { name: 'Stygian Pilum', wsm: 0, type: 4, classItem: -1, weaponCategory: 2, canZeal: false, commonItems: [] },
  { name: 'Suwayyah', wsm: 0, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Swirling Crystal', wsm: 10, type: 2, classItem: 6, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'The Oculus', quality: qualities.unique }, { title: "Tal Rasha's Lidless Eye", quality: qualities.set }] },
  { name: 'Tabar', wsm: 10, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Stormrider', quality: qualities.unique }] },
  { name: 'Thresher', wsm: -10, type: 6, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: "The Reaper's Toll", quality: qualities.unique }, { title: 'Insight', quality: qualities.runeword }, { title: 'Infinity', quality: qualities.runeword }] },
  { name: 'Throwing Axe', wsm: 10, type: 2, classItem: -1, weaponCategory: 3, canZeal: false, commonItems: [] },
  { name: 'Throwing Knife', wsm: 0, type: 4, classItem: -1, weaponCategory: 3, canZeal: false, commonItems: [] },
  { name: 'Throwing Spear', wsm: -10, type: 4, classItem: -1, weaponCategory: 2, canZeal: false, commonItems: [] },
  { name: 'Thunder Maul', wsm: 20, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Earth Shifter', quality: qualities.unique }, { title: 'The Cranium Basher', quality: qualities.unique }] },
  { name: 'Tomahawk', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: "Razor's Edge", quality: qualities.unique }] },
  { name: 'Tomb Wand', wsm: -20, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Arm of King Leoric', quality: qualities.unique }] },
  { name: 'Trident', wsm: 0, type: 5, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'Razortine', quality: qualities.unique }] },
  { name: 'Truncheon', wsm: -10, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: "Nord's Tenderizer", quality: qualities.unique }] },
  { name: 'Tulwar', wsm: 20, type: 2, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [{ title: 'Blade of Ali Baba', quality: qualities.unique }] },
  { name: 'Tusk Sword', wsm: 0, type: 3, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: 'The Vile Husk', quality: qualities.unique }] },
  { name: 'Twin Axe', wsm: 10, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Islestrike', quality: qualities.unique }] },
  { name: 'Two-Handed Sword', wsm: 0, type: 3, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [{ title: 'Shadowfang', quality: qualities.unique }] },
  { name: 'Tyrant Club', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Demon Limb', quality: qualities.unique }] },
  { name: 'Unearthed Wand', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: "Death's Web", quality: qualities.unique }] },
  { name: 'Vortex Orb', wsm: 0, type: 2, classItem: 6, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Voulge', wsm: 0, type: 6, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'Steelgoad', quality: qualities.unique }] },
  { name: 'Walking Stick', wsm: -10, type: 6, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Wand', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Torch of Iro', quality: qualities.unique }] },
  { name: 'War Axe', wsm: 0, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Rakescar', quality: qualities.unique }] },
  { name: 'War Club', wsm: 10, type: 6, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Bloodtree Stump', quality: qualities.unique }] },
  { name: 'War Dart', wsm: -20, type: 4, classItem: -1, weaponCategory: 3, canZeal: false, commonItems: [] },
  { name: 'War Fist', wsm: 10, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'War Fork', wsm: -20, type: 5, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'Soulfeast Tine', quality: qualities.unique }] },
  { name: 'War Hammer', wsm: 20, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Ironstone', quality: qualities.unique }] },
  { name: 'War Javelin', wsm: -10, type: 4, classItem: -1, weaponCategory: 2, canZeal: false, commonItems: [] },
  { name: 'War Pike', wsm: 20, type: 5, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'Steel Pillar', quality: qualities.unique }, { title: 'Breath of the Dying', quality: qualities.runeword }] },
  { name: 'War Scepter', wsm: -10, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Stormeye', quality: qualities.unique }, { title: "Milabrega's Rod", quality: qualities.set }] },
  { name: 'War Scythe', wsm: -10, type: 6, classItem: -1, weaponCategory: 8, canZeal: true, commonItems: [{ title: 'The Grim Reaper', quality: qualities.unique }] },
  { name: 'War Spear', wsm: -10, type: 5, classItem: -1, weaponCategory: 8, canZeal: false, commonItems: [{ title: 'The Impaler', quality: qualities.unique }] },
  { name: 'War Spike', wsm: -10, type: 2, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'Cranebeak', quality: qualities.unique }] },
  { name: 'War Staff', wsm: 20, type: 6, classItem: -1, weaponCategory: 0, canZeal: true, commonItems: [{ title: 'The Iron Jang Bong', quality: qualities.unique }, { title: "Arcanna's Deathwand", quality: qualities.set }] },
  { name: 'War Sword', wsm: 0, type: 2, classItem: -1, weaponCategory: 9, canZeal: false, commonItems: [{ title: "Culwen's Point", quality: qualities.unique }, { title: "Death's Touch", quality: qualities.set }] },
  { name: 'Ward Bow', wsm: 0, type: 7, classItem: -1, weaponCategory: 1, canZeal: false, commonItems: [{ title: 'Widowmaker', quality: qualities.unique }] },
  { name: 'Winged Axe', wsm: -10, type: 2, classItem: -1, weaponCategory: 3, canZeal: false, commonItems: [{ title: 'Lacerator', quality: qualities.unique }] },
  { name: 'Winged Harpoon', wsm: -10, type: 4, classItem: -1, weaponCategory: 2, canZeal: false, commonItems: [{ title: "Gargoyle's Bite", quality: qualities.unique }] },
  { name: 'Winged Knife', wsm: -20, type: 4, classItem: -1, weaponCategory: 3, canZeal: false, commonItems: [{ title: 'Warshrike', quality: qualities.unique }] },
  { name: 'Wrist Blade', wsm: 0, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Wrist Spike', wsm: -10, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [] },
  { name: 'Wrist Sword', wsm: -10, type: 1, classItem: 1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Jade Talon', quality: qualities.unique }] },
  { name: 'Yari', wsm: 0, type: 5, classItem: -1, weaponCategory: 8, canZeal: false, commonItems: [{ title: 'Hone Sundan', quality: qualities.unique }] },
  { name: 'Yew Wand', wsm: 10, type: 2, classItem: -1, weaponCategory: 0, canZeal: false, commonItems: [{ title: 'Maelstrom', quality: qualities.unique }] },
  { name: 'Zweihander', wsm: -10, type: 3, classItem: -1, weaponCategory: 9, canZeal: true, commonItems: [{ title: 'Todesfaelle Flamme', quality: qualities.unique }] }
]

export function isDagger (weaponId) {
  const weap = lookupWeapon[weaponId]
  if (weap.type === weaponTypes.oneHandedThrustingWeapon && weap.weaponCategory === weaponCategories.other) {
    return true
  }
  return false
}

const animations = Object.freeze({
  single: {
    index: 0,
    description: 'Concentrate, Berserk, Bash, Stun, Zeal, Feral Rage, Fury, Sacrifice, Vengence, Conversion, Strafe, Fend, Tiger Strike, Cobra Strike, Pheonix Strike'
  },
  standard: {
    index: 1,
    description: 'Standard'
  },
  throw: {
    index: 2,
    description: 'Throw'
  },
  kick: {
    index: 3,
    description: 'Dragon Tail, Dragon Talon'
  },
  shield: {
    index: 4,
    description: 'Smite'
  },
  trap: {
    index: 5,
    description: 'Laying Traps'
  },
  bite: {
    index: 6,
    description: 'Hunger, Rabies'
  },
  multi: {
    index: 7,
    description: 'Impale, Jab, Double Claw, Double String, Frenzy, Double Throw, Whirlwind'
  }
})

export const data = {
  attack: [
    {
      title: 'Standard',
      index: 0,
      animation: animations.standard.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Throw',
      index: 1,
      animation: animations.throw.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Impale',
      index: 2,
      animation: animations.multi.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Jab',
      index: 3,
      animation: animations.multi.index,
      sequence: 1,
      rollback: 100
    },
    {
      title: 'Strafe',
      index: 4,
      animation: animations.single.index,
      sequence: 0,
      rollback: 50,
      note: 'Stafe\'s attack speed per level should be added as off-weapon ias.'
    },
    {
      title: 'Fend',
      index: 5,
      animation: animations.single.index,
      sequence: 0,
      rollback: 40
    },
    {
      title: 'Tiger Strike',
      index: 6,
      animation: animations.single.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Cobra Strike',
      index: 7,
      animation: animations.single.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Phoenix Strike',
      index: 8,
      animation: animations.single.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Fists of Fire',
      index: 9,
      animation: animations.standard.index,
      sequence: 2,
      rollback: 100
    },
    {
      title: 'Claws of Thunder',
      index: 10,
      animation: animations.standard.index,
      sequence: 2,
      rollback: 100
    },
    {
      title: 'Blades of Ice',
      index: 11,
      animation: animations.standard.index,
      sequence: 2,
      rollback: 100
    },
    {
      title: 'Dragon Claw',
      index: 12,
      animation: animations.multi.index,
      sequence: 2,
      rollback: 100
    },
    {
      title: 'Dragon Tail',
      index: 13,
      animation: animations.kick.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Dragon Talon',
      index: 14,
      animation: animations.kick.index,
      sequence: 0,
      rollback: 0
    },
    {
      title: 'Laying Traps',
      index: 15,
      animation: animations.trap.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Double Swing',
      index: 16,
      animation: animations.multi.index,
      sequence: 3,
      rollback: 100
    },
    {
      title: 'Frenzy (first swing misses)',
      index: 17,
      animation: animations.multi.index,
      sequence: 3,
      rollback: 100
    },
    {
      title: 'Double Throw',
      index: 18,
      animation: animations.multi.index,
      sequence: 4,
      rollback: 100
    },
    {
      title: 'Whirlwind (Classic)',
      index: 19,
      animation: animations.multi.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Concentrate',
      index: 20,
      animation: animations.single.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Berserk',
      index: 21,
      animation: animations.single.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Bash',
      index: 22,
      animation: animations.single.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Stun',
      index: 23,
      animation: animations.single.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Zeal',
      index: 24,
      animation: animations.single.index,
      sequence: 0,
      rollback: 0
    },
    {
      title: 'Smite',
      index: 25,
      animation: animations.shield.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Feral Rage',
      index: 26,
      animation: animations.single.index,
      sequence: 0,
      rollback: 100,
      note: 'Attacks that miss use normal attack speed.'
    },
    {
      title: 'Hunger',
      index: 27,
      animation: animations.bite.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Rabies',
      index: 28,
      animation: animations.bite.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Fury',
      index: 29,
      animation: animations.single.index,
      sequence: 0,
      rollback: 0
    },
    {
      title: 'Sacrifice',
      index: 30,
      animation: animations.single.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Vengeance',
      index: 31,
      animation: animations.single.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Conversion',
      index: 32,
      animation: animations.single.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Cleave',
      index: 33,
      animation: animations.standard.index,
      sequence: 0,
      rollback: 100
    },
    {
      title: 'Fists of Ice',
      index: 34,
      animation: animations.standard.index,
      sequence: 2,
      rollback: 100
    },
    {
      title: 'Static Strike',
      index: 35,
      animation: 1,
      sequence: 2,
      rollback: 100
    },
    {
      title: 'Emberstorm',
      index: 36,
      animation: 1,
      sequence: 2,
      rollback: 100
    },
    {
      title: 'Frenzy (first swing hits)',
      index: 37,
      animation: animations.multi.index,
      sequence: 3,
      rollback: 100,
      note: 'Your current off-weapon attack speed is included in the calculation.'
    },
    {
      title: 'Whirlwind (LoD)',
      index: 38,
      animation: animations.multi.index,
      sequence: 0,
      rollback: 100
    }
  ]
}
