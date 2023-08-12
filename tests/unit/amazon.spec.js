import { describe, it } from 'vitest';
import breakpoints from './breakpoints.js'
const characterId = 0;

describe('Amazon default values', () => {
    it('standard attack', async () => {
        await breakpoints('11', '2.27', { charactersSelected: characterId });
    })

    it('strafe', async () => {
        await breakpoints('7/4/4/4/12', '4.9', { charactersSelected: characterId, skillsSelected: 4, weaponsPrimarySelected: 118 });
    })

    it('strafe cho-ko-nu', async () => {
        await breakpoints('7/3/4/4/10', '5.2', { charactersSelected: characterId, skillsSelected: 4, weaponsPrimarySelected: 46 });
    })

    it('multishot', async () => {
        await breakpoints('11', '2.27', { charactersSelected: characterId, skillsSelected: 0, weaponsPrimarySelected: 118, fanaticismSkillIas: 32 });
    })
})