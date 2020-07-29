import breakpoints from './breakpoints.js'
const characterId = 4;

describe('Necromancer default values', () => {
    it('standard attack', async () => {
        await breakpoints('14', '1.78', { charactersSelected: characterId });
    })
})