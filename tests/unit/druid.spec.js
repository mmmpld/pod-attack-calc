import breakpoints from './breakpoints.js'
const characterId = 3;

describe('Druid default values', () => {
    it('standard attack', async () => {
        await breakpoints('15', '1.66', { charactersSelected: characterId });
    })
})