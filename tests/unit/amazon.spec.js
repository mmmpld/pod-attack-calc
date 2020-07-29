import breakpoints from './breakpoints.js'
const characterId = 0;

describe('Amazon default values', () => {
    it('standard attack', async () => {
        await breakpoints('11', '2.27', { charactersSelected: characterId });
    })

    it('strafe', async () => {
        await breakpoints('7/4/4/4/12', '4.9', { charactersSelected: characterId, skillsSelected: 4, weaponsPrimarySelected: 118 });
    })

    it('multishot', async () => {
        await breakpoints('11', '2.27', { charactersSelected: characterId, skillsSelected: 0, weaponsPrimarySelected: 118, fanaticismSkillIAS: 32 });
    })
})