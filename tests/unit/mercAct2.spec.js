import breakpoints from './breakpoints.js'
const characterId = 8;

describe('Merc Act2 default values', () => {
    it('standard attack', async () => {
        await breakpoints('15', '1.47', { charactersSelected: characterId });
    })
})