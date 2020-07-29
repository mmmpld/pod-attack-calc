import breakpoints from './breakpoints.js'
const characterId = 7;

describe('Merc Act1 default values', () => {
    it('standard attack', async () => {
        await breakpoints('14', '1.56', { charactersSelected: characterId });
    })
})