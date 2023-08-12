import { describe, it } from 'vitest'
import breakpoints from './breakpoints.js'
const characterId = 5

describe('Paladin default values', () => {
  it('standard attack', async () => {
    await breakpoints('13', '1.92', { charactersSelected: characterId })
  })
})
