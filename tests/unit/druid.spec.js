import { describe, it } from 'vitest'
import breakpoints from './breakpoints.js'
const characterId = 3

describe('Druid default values', () => {
  it('standard attack', async () => {
    await breakpoints('15', '1.66', { charactersSelected: characterId })
  })

  it('feral with 31ias grief', async () => {
    await breakpoints('7', '3.57', { charactersSelected: characterId, shapeShiftFormsSelected: 2, skillsSelected: 26, weaponsPrimarySelected: 191, iasWeaponPrimary: 31, werewolfSkillIas: 88 })
  })
})
