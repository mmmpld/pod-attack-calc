import { describe, it } from 'vitest';
import breakpoints from './breakpoints.js'
const characterId = 1;

describe('Assassin default values', () => {
    it('standard attack', async () => {
        await breakpoints('10.5', '2.38', { charactersSelected: characterId });
    })

    it('trap laying', async () => {
        await breakpoints('15', '1.66', { charactersSelected: characterId, skillsSelected: 15  });
    })

    it('boi dual cestus', async () => {
        await breakpoints('13.5', '1.85', { charactersSelected: characterId, skillsSelected: 11, weaponsPrimarySelected: 43, weaponsSecondarySelected: 43 });
    })

    it('whirlwind feral/scissors suwayyah', async () => {
        await breakpoints('2.5', '10', { charactersSelected: characterId, skillsSelected: 38, weaponsPrimarySelected: 95, weaponsSecondarySelected: 215 });
    })
})