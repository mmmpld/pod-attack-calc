import { describe, it } from 'vitest'
import breakpoints from './breakpoints'
const characterId = 1

describe('Assassin default values', () => {
  it('standard attack', async () => {
    await breakpoints('10.5', '2.38', { charactersSelected: characterId })
  })

  it('trap laying', async () => {
    await breakpoints('15', '1.66', { charactersSelected: characterId, skillsSelected: 15 })
  })

  it('boi dual cestus', async () => {
    await breakpoints('13.5', '1.85', { charactersSelected: characterId, skillsSelected: 11, weaponsPrimarySelectedRaw: 43, weaponsSecondarySelectedRaw: 43 })
  })

  it('whirlwind feral/scissors suwayyah', async () => {
    await breakpoints('2.5', '10', { charactersSelected: characterId, skillsSelected: 38, weaponsPrimarySelectedRaw: 95, weaponsSecondarySelectedRaw: 215 })
  })
})
