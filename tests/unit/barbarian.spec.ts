import { describe, it } from 'vitest'
import breakpoints from './breakpoints.js'
const characterId = 2

describe('Barbarian default values', () => {
  it('standard attack', async () => {
    await breakpoints('11', '2.27', { charactersSelected: characterId })
  })

  it('cleave', async () => {
    await breakpoints('10', '2.5', { charactersSelected: characterId, skillsSelected: 33, weaponsPrimarySelectedRaw: 25, iasWeaponPrimaryRaw: 105 })
  })

  it('cleave wolf', async () => {
    await breakpoints('5', '5', { charactersSelected: characterId, shapeShiftFormsSelected: 2, skillsSelected: 33, weaponsPrimarySelectedRaw: 25, iasWeaponPrimaryRaw: 105, werewolfSkillIas: 66 })
  })

  it('frenzy (first swing misses) 2x phaseblade', async () => {
    await breakpoints('8.5', '2.94', { charactersSelected: characterId, skillsSelected: 17, weaponsPrimarySelectedRaw: 191, weaponsSecondarySelectedRaw: 191 })
  })

  // http://http://localhost:3000//pod-attack-calc/?c=2&s=37&w1=191&w2=56&frenz=30
  it('frenzy (first swing hits) phaseblade/colossus sword', async () => {
    await breakpoints('8/12', '2.5', { charactersSelected: characterId, skillsSelected: 37, weaponsPrimarySelectedRaw: 191, weaponsSecondarySelectedRaw: 56, frenzySkillIas: 30 })
  })

  it('whirlwind dual berserker axe', async () => {
    await breakpoints('4', '6.25', { charactersSelected: characterId, skillsSelected: 19, weaponsPrimarySelectedRaw: 25, weaponsSecondarySelectedRaw: 25 })
  })
  it('whirlwind warpike', async () => {
    await breakpoints('4', '6.25', { charactersSelected: characterId, skillsSelected: 19, weaponsPrimarySelectedRaw: 274 })
  })
  it('whirlwind single phaseblade high ias', async () => {
    await breakpoints('4', '6.25', { charactersSelected: characterId, skillsSelected: 19, weaponsPrimarySelected: 191, iasWeaponPrimary: 105 })
  })
})
