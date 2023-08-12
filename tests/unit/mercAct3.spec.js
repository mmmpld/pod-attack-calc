import { describe, it } from 'vitest';
import breakpoints from './breakpoints.js'
const characterId = 10;

describe('Merc Act3 default values', () => {
    it('vengeance attack', async () => {
        await breakpoints('14', '1.56', { charactersSelected: characterId });
    })
})