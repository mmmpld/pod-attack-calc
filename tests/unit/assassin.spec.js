import breakpoints from './breakpoints.js'
const characterId = 1;

describe('Assasin default values', () => {
    it('standard attack', async () => {
        await breakpoints('10.5', '2.38', { charactersSelected: characterId });
    })

    it('trap laying', async () => {
        await breakpoints('15', '1.66', { charactersSelected: characterId, skillsSelected: 15  });
    })
})