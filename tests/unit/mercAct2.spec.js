import breakpoints from './breakpoints.js'
const characterId = 8;

describe('Merc Act2 default values', () => {
    it('jab attack no weapon', async () => {
        await breakpoints('7', '3.12', { charactersSelected: characterId });
    })

    it('jab attack thresher', async () => {
        await breakpoints('6.5', '3.33', { charactersSelected: characterId, weaponsPrimarySelected: 248 });
    })

    it('jab attack mancatcher', async () => {
        await breakpoints('6', '3.57', { charactersSelected: characterId, weaponsPrimarySelected: 172 });
    })
})