import { describe, it } from 'vitest'
import breakpoints from './breakpoints.js'
const characterId = 9

describe('Merc Act5 default values', () => {
  it('bash attack', async () => {
    await breakpoints('15', '1.47', { charactersSelected: characterId })
  })
})
