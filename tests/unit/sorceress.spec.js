import { describe, it } from 'vitest';
import breakpoints from './breakpoints.js'
const characterId = 6;

describe('Sorceress default values', () => {
    it('standard attack', async () => {
        await breakpoints('14', '1.78', { charactersSelected: characterId });
    })

    it('multishot upped doomslinger', async () => {
        await breakpoints('11', '2.27', { charactersSelected: characterId, weaponsPrimarySelected: 46, iasOffWeapon: 10 });
    })
})