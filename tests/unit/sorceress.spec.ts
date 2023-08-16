import { describe, it } from 'vitest'
import breakpoints from './breakpoints.js'
const characterId = 6

describe('Sorceress default values', () => {
  it('standard attack', async () => {
    await breakpoints('14', '1.78', { charactersSelected: characterId })
  })

  it('standard attack with giant thresher', async () => {
    await breakpoints('14', '1.78', { charactersSelected: characterId, weaponsPrimarySelectedRaw: 107 })
  })

  it('multishot no-upped doomslinger', async () => {
    await breakpoints('14', '1.78', { charactersSelected: characterId, weaponsPrimarySelectedRaw: 202 })
  })

  it('multishot upped doomslinger no ias', async () => {
    await breakpoints('12', '2.08', { charactersSelected: characterId, weaponsPrimarySelectedRaw: 46 })
  })

  it('multishot upped doomslinger', async () => {
    await breakpoints('11', '2.27', { charactersSelected: characterId, weaponsPrimarySelectedRaw: 46, iasOffWeaponRaw: 10 })
  })
})
