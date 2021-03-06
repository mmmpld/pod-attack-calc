import breakpoints from './breakpoints.js'
const characterId = 2;

describe('Barbarian default values', () => {
    it('standard attack', async () => {
        await breakpoints('11', '2.27', { charactersSelected: characterId });
    })

    it('cleave', async () => {
        await breakpoints('10', '2.5', { charactersSelected: characterId, skillsSelected: 33, weaponsPrimarySelected: 25, iasWeaponPrimary: 105 });
    })

    it('cleave wolf', async () => {
        await breakpoints('5', '5', { charactersSelected: characterId, shapeShiftFormsSelected: 2, skillsSelected: 33, weaponsPrimarySelected: 25, iasWeaponPrimary: 105, werewolfSkillIas: 66 });
    })

    it('frenzy (first swing misses) 2x phaseblade', async () => {
        await breakpoints('8.5', '2.94', { charactersSelected: characterId, skillsSelected: 17, weaponsPrimarySelected: 191, weaponsSecondarySelected: 191 });
    })

    // http://localhost:8080/pod-attack-calc/?c=2&s=37&w1=191&w2=56&frenz=30
    it('frenzy (first swing hits) phaseblade/colossus sword', async () => {
        await breakpoints('8/12', '2.5', { charactersSelected: characterId, skillsSelected: 37, weaponsPrimarySelected: 191, weaponsSecondarySelected: 56, frenzySkillIas: 30 });
    })
})