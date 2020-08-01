<style scoped>
    .quality-magic {
        color: #8484f0 !important;
    }
    .quality-rare {
        color: #fce874 !important;
    }
    .quality-set {
        color: #18fc00 !important;
    }
    .quality-unique {
        color: #bb955e !important;
    }
    .quality-crafted {
        color: orange !important;
    }
    .quality-runeword {
        color: #c0a080 !important;
    }
</style>

<template>
    <v-container fluid class="pa-0">
        <v-row>
            <v-col cols="12" lg="2" md="4" class="px-8 grey lighten-5 d-none d-md-block"></v-col>
            <v-divider vertical></v-divider>
            <v-col class="px-8">
                <h1>Path of Diablo Attack Speed Calculator</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" lg="2" md="4" class="px-8 grey lighten-5">
                <v-row>
                    <v-col class="py-0 pl-3"><h2>Character</h2></v-col>
                    <v-col class="py-0" align="right">
                        <v-tooltip left color="green" transition="scroll-x-reverse-transition">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon color="green" 
                                       :href="shareLink"
                                       @click.prevent="toggleAddQueryString"
                                       v-bind="attrs"
                                       v-on="on">
                                    <v-icon v-if="doAddQueryString">mdi-bookmark</v-icon>
                                    <v-icon v-else>mdi-bookmark-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>toggle bookmarkable url</span>
                        </v-tooltip>
                        <v-snackbar v-model="isShowingQuerySnackbar"
                                    timeout="4000"
                                    color="success"
                                    outlined
                                    align="center">
                            {{doAddQueryString ? 'url updated for sharing or bookmarking.' : 'url simplified, very tidy.'}}
                        </v-snackbar>
                    </v-col>
                </v-row>
                <v-form name=myform>
                    <div>
                        <h3>Basics</h3>
                        <v-select name=char @input="updateCurrent" :items="characters" label="Class"
                            v-model="charactersSelected" dense class="my-3"></v-select>
                        <v-select name=charform @input="updateCurrent" :items="shapeShiftForms"
                            label="Shape Shift" v-model="shapeShiftFormsSelected" dense
                            :disabled="!isPlayableClass" class="my-3"></v-select>
                        <v-select name=skill @input="updateCurrent" :items="skills" label="Skill"
                            v-model="skillsSelected" dense class="my-3"></v-select>
                        <v-text-field name=IAS type="number" @input="updateCurrent" label="Off-Weapon IAS%"
                            v-model.number="iasOffWeapon" dense min="0" step="5" class="my-3"></v-text-field>
                    </div>
                    <div>
                        <h3>Primary Weapon</h3>
                        <v-autocomplete
                            name="waffe" 
                            @input="updateCurrent" 
                            :items="weaponsPrimary" 
                            :filter="weaponFilter"
                            label="Primary Weapon" 
                            v-model="weaponsPrimarySelected" 
                            dense 
                            persistent-hint 
                            :hint="`${weaponInfoPrimary.description} [${weaponInfoPrimary.wsm}]`" 
                            class="my-3"
                        >
                            <template v-slot:item="data">
                                <v-list-item-content>
                                    <v-list-item-title v-text="data.item.text"></v-list-item-title>
                                    <v-list-item-subtitle
                                        v-for="(commonItem, index) in data.item.commonItems"
                                        :key="index"
                                        :class="getQualityColorClass(commonItem.quality)">
                                        {{commonItem.title}}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                        </v-autocomplete>
                        <v-select v-if="isWeaponsPrimaryBarbHandednessNeeded" name=barbschwert @input="updateCurrent"
                            :items="weaponsPrimaryBarbHandedness" label="Handedness"
                            v-model="weaponsPrimaryBarbHandednessSelected" dense class="my-3"></v-select>
                        <v-text-field name=wIAS1 type="number" @input="updateCurrent"
                            label="Primary Weapon IAS%" v-model.number="iasWeaponPrimary" min="0" step="5" dense class="mt-6 mb-3">
                        </v-text-field>
                    </div>
                    <div v-if="canDualWield == true">
                        <h3>Secondary Weapon</h3>
                        <v-autocomplete
                            name="zweitwaffe" 
                            @input="updateCurrent" 
                            :items="weaponsSecondary" 
                            :filter="weaponFilter"
                            label="Secondary Weapon" 
                            v-model="weaponsSecondarySelected" 
                            dense 
                            persistent-hint 
                            :hint="`${weaponInfoSecondary.description} [${weaponInfoSecondary.wsm}]`" 
                            class="my-3"
                        >
                            <template v-slot:item="data">
                                <v-list-item-content>
                                    <v-list-item-title v-text="data.item.text"></v-list-item-title>
                                    <v-list-item-subtitle
                                        v-for="(commonItem, index) in data.item.commonItems"
                                        :key="index"
                                        :class="getQualityColorClass(commonItem.quality)">
                                        {{commonItem.title}}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                        </v-autocomplete>
                        <v-text-field name=wIAS2 type="number" @input="updateCurrent"
                            label="Secondary Weapon IAS%" v-model.number="iasWeaponSecondary" dense min="0" step="5" class="mt-6 mb-0">
                        </v-text-field>
                        <v-checkbox name="enableWsmBug" @input="updateCurrent" label="Apply WSM Bug"
                            v-model="isWsmBug" dense class="my-0"></v-checkbox>
                    </div>
                    <div>
                        <h3>Speed Increasing Skills</h3>
                        <v-select name=fana @input="updateCurrent" :items="fanaticism"
                            label="Fanaticism Level" v-model="fanaticismSkillIas" dense class="my-3"></v-select>
                        <v-select v-if="canFrenzy" name=frenzy @input="updateCurrent" :items="frenzy" label="Frenzy Level"
                            v-model="frenzySkillIas" dense class="my-3"></v-select>
                        <v-select v-if="canWerewolf" name=wolf size=1 @input="updateCurrent" :items="werewolf"
                            label="Werewolf Level" v-model="werewolfSkillIas" dense class="my-3"></v-select>
                        <v-select v-if="canBurstOfSpeed" name=tempo size=1 @input="updateCurrent" :items="burstOfSpeed"
                            label="Burst of Speed Level" v-model="burstOfSpeedSkillIas" dense class="my-3"></v-select>
                    </div>
                    <div>
                        <h3>Speed Slowdown</h3>
                        <v-select name=holyfrost @input="updateCurrent" :items="holyFreeze"
                            label="Holy Freeze Level" v-model="holyFreezeSkillIas" dense class="mt-3 mb-0"></v-select>
                        <v-checkbox name=altern @input="updateCurrent" label="Decrepify"
                            v-model="isDecrepify" dense class="my-0"></v-checkbox>
                    </div>
                </v-form>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="px-8">
                <h2>Breakpoints</h2>
                <h3>Current</h3>
                <p>
                    Speed: <span id="currentFpa">{{ currentFpa }}</span>{{ isCurrentFpaMaxed ? shapeShiftFormsSelected > 0 ? ', further off-weapon IAS useless' : ', further IAS useless' : '' }}<br>
                    Frequency: <span id="currentAps">{{ currentAps }}</span><br>
                    <template v-if="attackSkill.note">Note: <span id="currentNote">{{ attackSkill.note }}</span></template>
                </p>
                <h3>Table</h3>
                <breakpoints-table :characters="characters" :characters-selected="charactersSelected"
                    :shape-shift-forms="shapeShiftForms"
                    :shape-shift-forms-selected="shapeShiftFormsSelected"
                    :weapon-info-primary="weaponInfoPrimary" :weapon-info-secondary="weaponInfoSecondary"
                    :skills="skills" :skills-selected="skillsSelected" :ias-off-weapon="iasOffWeapon"
                    :weapons-primary-selected="weaponsPrimarySelected"
                    :weapons-secondary-selected="weaponsSecondarySelected"
                    :ias-weapon-primary="iasWeaponPrimary" :ias-weapon-secondary="iasWeaponSecondary"
                    :fanaticism-skill-ias="fanaticismSkillIas" :frenzy-skill-ias="frenzySkillIas"
                    :werewolf-skill-ias="werewolfSkillIas" :burst-of-speed-skill-ias="burstOfSpeedSkillIas"
                    :breakpoints="breakpoints"
                    :current-fpa="currentFpa"
                    :attack-skill="data.attack[this.skillsSelected]">
                </breakpoints-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import * as calc from '../assets/calc';
import BreakpointsTable from './BreakpointsTable';

export default {
  name: 'App',
  components: {
    BreakpointsTable,
  },
  created: function () {
      this.updateCurrent();
  },
  props: {
        w1: { default: '0' },
        w2: { default: '0' },
         c: { default: '0' },
        ss: { default: '0' },
         s: { default: '0' },
        io: { default: '0' },
        i1: { default: '0' },
        i2: { default: '0' },
        bh: { default: '0' },
       bug: { default: '0' },
      fana: { default: '0' },
     frenz: { default: '0' }, // frenzy was taken so we can only be frenz
      wolf: { default: '0' },
       bos: { default: '0' },
    freeze: { default: '0' },
    decrep: { default: '0' },
  },
    data: () => ({
        isShowingQuerySnackbar: false,
        doAddQueryString: localStorage.doAddQueryString || false,
        weaponClassFrames: calc.weaponClassFrames,
        aktionsframe: calc.aktionsframe,
        sequences: calc.sequences,
        qualities: calc.qualities,
        weaponTypes: calc.weaponTypes,
        weaponCategories: calc.weaponCategories,
        lookupWeapon: calc.lookupWeapon,
        isDagger: calc.isDagger,
        data: calc.data,
      animationFrames: 0,
      WSMprimaer: 0,
      WSMsekundaer: 0,
      IASprimaer: 0,
      IASsekundaer: 0,
      EIASprimaer: 0,
      EIASsekundaer: 0,
      SIAS: 0,
      rollback1: 0,
      rollback2: 0,
      rollback3: 0,
      rollback4: 0,
      rollback5: 0,
      isAtFpaCap: true,
      characters: [
          { value: 0, text: 'Amazon' },
          { value: 1, text: 'Assassin' },
          { value: 2, text: 'Barbarian' },
          { value: 3, text: 'Druid' },
          { value: 4, text: 'Necromancer' },
          { value: 5, text: 'Paladin' },
          { value: 6, text: 'Sorceress' },
          { value: 7, text: 'Act 1 Merc - Rogue' },
          { value: 8, text: 'Act 2 Merc - Town Guard' },
          { value: 9, text: 'Act 5 Merc - Barbarian' },
          { value: 10,text: 'Act 3 Merc - Iron Wolves' },
      ],
      charactersSelected:0,
      shapeShiftFormsSelected: 0,
      fanaticismSkillIas: 0,
      frenzySkillIas: 0,
      werewolfSkillIas: 0,
      burstOfSpeedSkillIas: 0,
      holyFreezeSkillIas: 0,
      isDecrepify: false,
      weaponsPrimarySelected: 0,
      weaponsSecondarySelected: 0,
      weaponsPrimaryBarbHandednessSelected: -1,
      skillsSelected: 0,
      iasOffWeaponRaw: 0,
      iasWeaponPrimaryRaw: 0,
      iasWeaponSecondaryRaw: 0,
      isWsmBug: false,
      currentFpa: '',
      isCurrentFpaMaxed: false,
      currentAps: '',
      useVanillaSkillIas: false,
    }),
    methods: {
        getQualityColorClass: function(quality) {
            console.log(quality);
            switch (quality) {
                case this.qualities.magic:
                    return 'quality-magic';
                case this.qualities.rare:
                    return 'quality-rare';
                case this.qualities.set:
                    return 'quality-set';
                case this.qualities.unique:
                    return 'quality-unique';
                case this.qualities.crafted:
                    return 'quality-crafted';
                case this.qualities.runeword:
                    return 'quality-runeword';
                default:
                    return 'quality-normal';
            }
        },
        updateUrl: function() {
            let query = this.doAddQueryString ? this.query : {} ;
            this.$router.push({ query }).catch(error => {}); // catch suppresses redundant navigation error in console
        },
        toggleAddQueryString: function() {
            this.doAddQueryString = !this.doAddQueryString;
            this.updateUrl();
            this.isShowingQuerySnackbar = true;
            localStorage.doAddQueryString = this.doAddQueryString;
        },
      weaponFilter: function (item, queryText, itemText) {
          if (item.text.toLowerCase().indexOf(queryText.toLowerCase()) > -1) return true; // search in option text
          if (item.commonItems) { // search in common items
              for (let i = 0; i < item.commonItems.length; i++) {
                  if (item.commonItems[i].title.toLowerCase().indexOf(queryText.toLowerCase()) > -1) return true;
                  if (item.commonItems[i].title.toLowerCase().replace(/\W/g, '').indexOf(queryText.toLowerCase()) > -1) return true; // with non-alphanumeric characters removed
              }
          }
          return false;
      },
      updateCurrent: function () {
          this.calculateValues();
      },
      getSkillOptionData: function (title) {
          var skill = this.data.attack.find(a => a.title === title);
          return { value: skill.index, text: skill.title };
      },
      calculateWsm: function () {
          var weapPrimary = this.lookupWeapon[this.weaponsPrimarySelected];
          var weapSecondary = this.lookupWeapon[this.weaponsSecondarySelected];
          if (weapPrimary === null) console.error('failed to lookup primary weapon: ' + this.weaponsPrimarySelected);
          if (weapSecondary === null) console.error('failed to lookup secondary weapon: ' + this.weaponsSecondarySelected);
          // not assasin and not barbarian
          if ((this.charactersSelected != 1) && (this.charactersSelected != 2)) {
              this.WSMprimaer = weapPrimary.wsm;
          }
          // (assasin or barbarian) and no offhand weapon
          if (((this.charactersSelected == 1) || (this.charactersSelected == 2)) && (this.weaponsSecondarySelected == 0)) {
              this.WSMprimaer = weapPrimary.wsm;
          }
          // (assasin or barbarian) with offhand weapon
          if (((this.charactersSelected == 1) || (this.charactersSelected == 2)) && (this.weaponsSecondarySelected > 0)) {
              if (this.isWsmBug) {
                  console.log('applying wsm bug');
                  this.WSMprimaer = parseInt((weapPrimary.wsm + weapSecondary.wsm) / 2) + weapPrimary.wsm - weapSecondary.wsm;
                  this.WSMsekundaer = parseInt((weapPrimary.wsm + weapSecondary.wsm) / 2);
              } else {
                  this.WSMprimaer = parseInt((weapPrimary.wsm + weapSecondary.wsm) / 2);
                  this.WSMsekundaer = parseInt((weapPrimary.wsm + weapSecondary.wsm) / 2) + weapSecondary.wsm - weapPrimary.wsm;
              }
              console.log('average primary wsm: ' + this.WSMprimaer);
              console.log('average secondary wsm: ' + this.WSMsekundaer);
          }
      },
      animationSpeed: function (FramesPerDirection) {
          // First, you must know that the game logic speed is hardcoded to 25 ticks per second. Now, this
          // number in the “AnimationSpeed” column is a relative speed. 256 means that the animation will
          // be displayed at 100% the rate of 25 fps, 128 will be at 50%, 64 will be at 25%, 512 will be at
          // 200%, and so on… If you wonder why we find 1/256th instead of %, that’s because it’s easier
          // for computers to count with numbers of power of 2, but also to have an extra precision.
          // -- http://paul.siramy.free.fr/_divers2/Extracting%20Diablo%20II%20Animations.pdf
          var animationSpeed = 256;
          var weapPrimary = this.lookupWeapon[this.weaponsPrimarySelected];
          var attackSkill = this.data.attack[this.skillsSelected];
          // Assassin && Battle Cestus, Blade Talons, Cestus, Claws, Fascia, Feral Claws, Greater Claws, Greater Talons, Hand Scythe, Hatchet Hands, Katar, Quhab, Runic Talons, Scissors Katar, Scissors Quhab, Scissors Suwayyah, Suwayyah, War Fist, Wrist Blade, Wrist Spike, Wrist Sword
          if ((this.charactersSelected == 1) && (weapPrimary.type == this.weaponTypes.claw)) {
              animationSpeed = 208;
          }
          // Dragon Tail, Dragon Talon || Impale, Jab, Fists of Fire, Claws of Thunder, Blades of Ice, Dragon Claw, Double Swing, Frenzy, Double Throw, Whirlwind && not Whirlwind
          if (((attackSkill.animation == 3) || (attackSkill.animation == 7)) && (attackSkill.title !== "Whirlwind")) {
              animationSpeed = 256;
          }
          // Laying Traps
          if (attackSkill.animation == 5) {
              animationSpeed = 128;
          }
          // Bear
          if (this.shapeShiftFormsSelected == 1) {
              if (weapPrimary.type == this.weaponTypes.twoHandedSword) { // 2-hand swords
                  FramesPerDirection = this.weaponClassFrames[2][this.charactersSelected][0]; //1-hand swinging weapon
              }
              animationSpeed = Math.floor(256 * 10 / Math.floor(256 * FramesPerDirection / Math.floor((100 + this.IASprimaer - parseInt(this.iasOffWeapon) - weapPrimary.wsm) * animationSpeed / 100)));
          }
          // Wolf
          if (this.shapeShiftFormsSelected == 2) {
              if (weapPrimary.type == this.weaponTypes.twoHandedSword) { // 2-hand swords
                  FramesPerDirection = this.weaponClassFrames[2][this.charactersSelected][0]; //1-hand swinging weapon
              }
              animationSpeed = Math.floor(256 * 9 / Math.floor(256 * FramesPerDirection / Math.floor((100 + this.IASprimaer - parseInt(this.iasOffWeapon) - weapPrimary.wsm) * animationSpeed / 100)));
          }
          return animationSpeed;
      },
      calcFPA: function (FramesPerDirection, Acceleration, StartingFrame) {
          var weapPrimary = this.lookupWeapon[this.weaponsPrimarySelected];
          var animationSpeed = this.animationSpeed(FramesPerDirection);
          var attackSkill = this.data.attack[this.skillsSelected];
          if (this.shapeShiftFormsSelected == 1) {
              if (weapPrimary.type == this.weaponTypes.twoHandedSword) { // 2-hand swords
                  FramesPerDirection = this.weaponClassFrames[2][this.charactersSelected][0]; //1-hand swinging weapon
              }
              //animationSpeed = Math.floor(256 * 10 / Math.floor(256 * FramesPerDirection / Math.floor((100 + this.IASprimaer - parseInt(this.iasOffWeapon) - weapPrimary.wsm) * animationSpeed / 100)));
              FramesPerDirection = 12;
              if (attackSkill.animation == 6) {
                  FramesPerDirection = 10;
              }
              StartingFrame = 0;
          }
          // Wolf
          if (this.shapeShiftFormsSelected == 2) {
              if (weapPrimary.type == this.weaponTypes.twoHandedSword) { // 2-hand swords
                  FramesPerDirection = this.weaponClassFrames[2][this.charactersSelected][0]; //1-hand swinging weapon
              }
              //animationSpeed = Math.floor(256 * 9 / Math.floor(256 * FramesPerDirection / Math.floor((100 + this.IASprimaer - parseInt(this.iasOffWeapon) - weapPrimary.wsm) * animationSpeed / 100)));
              FramesPerDirection = 13;
              if ((this.skillsSelected == 29) && (StartingFrame == 0)) { // Fury
                  FramesPerDirection = 7;
              }
              if (attackSkill.animation == 6) {
                  FramesPerDirection = 10;
              }
              StartingFrame = 0;
          }
          var FPA = Math.ceil(256 * (FramesPerDirection - StartingFrame) / Math.floor(animationSpeed * Acceleration / 100)) - 1;
          var FPAmax = Math.ceil(256 * (FramesPerDirection - StartingFrame) / Math.floor(animationSpeed * 175 / 100)) - 1;
          if (attackSkill.title === 'Frenzy (first swing hits)') {
                console.debug('special case fpa for frenzy first swing hits');
                FPA = this.frenzyFpa(this.iasOffWeapon).sum;
                FPAmax = 0; // TODO what should this be?
          }
          if (this.skillsSelected == 19) { // whirlwind
              FPA = Math.floor(256 * FramesPerDirection / Math.floor(animationSpeed * Acceleration / 100));
              FPAmax = 0;
          }
          if (this.skillsSelected == 26) { // Feral Rage
              FPA = Math.ceil(256 * 7 / Math.floor(animationSpeed * Acceleration / 100)) + Math.ceil((256 * 13 - Math.floor(animationSpeed * Acceleration / 100) * Math.ceil(256 * 7 / Math.floor(animationSpeed * Acceleration / 100))) / (2 * Math.floor(animationSpeed * Acceleration / 100))) - 1;
              FPAmax = Math.ceil(256 * 7 / Math.floor(animationSpeed * 175 / 100)) + Math.ceil((256 * 13 - Math.floor(animationSpeed * 175 / 100) * Math.ceil(256 * 7 / Math.floor(animationSpeed * 175 / 100))) / (2 * Math.floor(animationSpeed * 175 / 100))) - 1;
          }
          if (this.isAtFpaCap) {
              this.isCurrentFpaMaxed = false;
              if ((attackSkill.rollback == 100) && (attackSkill.animation != 1) && (FPA <= FPAmax)) {
                  this.isCurrentFpaMaxed = true;
              }
          }
          return FPA;
      },
        frenzyFpa: function (OIAS, iasWeaponPrimary = null, iasWeaponSecondary = null) {
            let weapPrimary = this.lookupWeapon[this.weaponsPrimarySelected];
            let weapSecondary = this.lookupWeapon[this.weaponsSecondarySelected];
            let WSM_primary = weapPrimary.wsm;
            let WSM_secondary = weapSecondary.wsm;
            let IASprimary = iasWeaponPrimary || 0; // only required to find the current fpa
            let IASsecondary = iasWeaponSecondary || 0;
            this.calculateSkillIas();
            let SIAS = this.SIAS;
            let WSM1 = 0;
            let WSM2 = 0;
            console.debug(`wsm primary: ${WSM_primary}`);
            console.debug(`wsm secondary: ${WSM_secondary}`);
            console.debug(`oias: ${OIAS}`);
            if (!this.isWsmBug) {
                //If the primary weapon is equipped in the left weapon slot:
                WSM1 = WSM_primary + WSM_secondary - (WSM_primary + WSM_secondary) / 2
                WSM2 = 2 * WSM_secondary - (WSM_primary + WSM_secondary) / 2
            } else {
                //If the primary weapon is equipped in the right weapon slot:
                WSM1 = (WSM_primary + WSM_secondary)/2 + WSM_primary - WSM_secondary
                WSM2 = (WSM_primary + WSM_secondary)/2
            }
            let EIAS1 = Math.floor(120 * (OIAS + IASprimary) / (120 + OIAS + IASprimary))
            let EIAS2 = Math.floor(120 * (OIAS + IASsecondary) / (120 + OIAS + IASsecondary))
            let Acceleration1 = 100 + SIAS + EIAS1 - WSM1 // 100 is normally 70 here because of the sequence, -30 penalty is applied to the skill ias
            let Acceleration2 = 100 + SIAS + EIAS2 - WSM2 // 100 is normally 70 here because of the sequence, -30 penalty is applied to the skill ias
            let fpa_1 = Math.ceil(256*9/Math.floor(256*Acceleration1/100)) - 1
            let fpa_2 = Math.ceil((256*17 - fpa_1*Math.floor(256*Acceleration1/100))/Math.floor(256*Acceleration2/100))
            let resultFpa = fpa_1 + fpa_2
            console.debug(OIAS + ' : ' + fpa_1 + '+' + fpa_2 + '=' + resultFpa)
            return {
                sum: resultFpa,
                parts: [
                    fpa_1,
                    fpa_2
                ]
            };
        },
      calculateValues: function () {
          var isMaxIas = true; // true if further ias is useless
          var weapPrimary = this.lookupWeapon[this.weaponsPrimarySelected];
          var resultFpa;
          var temp;
          var attackSkill = this.data.attack[this.skillsSelected];
          console.debug('Calculating initial values for: ' + attackSkill.title);
          this.calculateSkillIas();
          this.calculateEffectiveIas();
          this.calculateWsm();
          var acceleration = Math.max(Math.min(100 + this.SIAS + this.EIASprimaer - this.WSMprimaer, 175), 15);
          var acceleration2 = Math.max(Math.min(100 + this.SIAS + this.EIASsekundaer - this.WSMsekundaer, 175), 15);
          var start = this.startingFrame;  
          var rollbackframe;
          if (((attackSkill.animation == 0) || (attackSkill.animation == 6)) && (attackSkill.rollback == 100)) {
              this.animationFrames = this.weaponClassFrames[weapPrimary.type][this.charactersSelected][0];
              if ((weapPrimary.type == this.weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                  this.animationFrames = 16;
              }
              resultFpa = this.calcFPA(this.animationFrames, acceleration, start);
          }
          // standard attack
          if ((attackSkill.animation == 1) && (attackSkill.rollback == 100)) {
              console.debug('standard attack');
              this.animationFrames = this.weaponClassFrames[weapPrimary.type][this.charactersSelected][0];
              if ((weapPrimary.type == this.weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                  this.animationFrames = 16;
              }
              resultFpa = this.calcFPA(this.animationFrames, acceleration, start);
              if (resultFpa > this.calcFPA(this.animationFrames, 175, start)) {
                  isMaxIas = false;
              }
              // Unshifted
              if (this.shapeShiftFormsSelected == 0) {
                  console.debug('unshifted');
                  temp = resultFpa;
                  this.animationFrames = this.weaponClassFrames[weapPrimary.type][this.charactersSelected][1];
                  if ((weapPrimary.type == this.weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                      this.animationFrames = 16;
                  }
                  resultFpa = this.calcFPA(this.animationFrames, acceleration, start);
                  if (resultFpa > this.calcFPA(this.animationFrames, 175, start)) {
                      isMaxIas = false;
                  }
                  resultFpa = (resultFpa + temp) / 2;
              }
              // act 5 merc
              if (this.charactersSelected == 9) {
                  resultFpa = resultFpa / 2;
              }
              if (this.weaponsSecondarySelected > 0
                  && attackSkill.title !== "Static Strike"
                  && attackSkill.title !== "Blades of Ice"
                  && attackSkill.title !== "Emberstorm"
                  && attackSkill.title !== "Fists of Ice"
                  && attackSkill.title !== "Fists of Ember"
                  && attackSkill.title !== "Fists of Thunder"
              ) {
                  temp = resultFpa;
                  resultFpa = this.calcFPA(12, acceleration2, 0);
                  if (resultFpa > this.calcFPA(12, 175, 0)) {
                      isMaxIas = false;
                  }
                  resultFpa = (resultFpa + temp) / 2;
              }
              if (isMaxIas) {
                  this.isCurrentFpaMaxed = true;
              }
              isMaxIas = true;
          }
          if ((attackSkill.animation >= 2)
              && (attackSkill.animation <= 5) 
              && (attackSkill.rollback == 100)) {
              if (attackSkill.animation == 2) { // Throw
                  this.animationFrames = this.weaponClassFrames[9][this.charactersSelected];
              }
              if (attackSkill.animation == 3) {
                  this.animationFrames = 13;
              }
              if (attackSkill.animation == 4) {
                  this.animationFrames = 12;
              }
              if (attackSkill.animation == 5) {
                  this.animationFrames = 8;
              }
              resultFpa = this.calcFPA(this.animationFrames, acceleration, start);
          }
          // Old BoI, Impale, Jab, old Fists of Ember, old Fists of Thunder, Dragon Claw, Double Swing, Frenzy, Double Throw, Whirlwind (potential 2 hand attacks?)
          // && not whirlwind && rollback normal
          if (attackSkill.title === "Frenzy (first swing hits)") {
                console.debug("special case frenzy hits");
                let frenzyFpa = this.frenzyFpa(this.iasOffWeapon, this.iasWeaponPrimary, this.iasWeaponSecondary);
                this.rollback1 = frenzyFpa.parts[0];
                this.rollback3 = frenzyFpa.parts[1];
                // if (this.rollback3 == 7) { // TODO what should this value be?
                //     this.isCurrentFpaMaxed = true;
                // }
                this.currentFpa = this.rollback1 + "/" + this.rollback3 + " frames per attack";
                this.currentAps = parseInt(100 * 25 / ((this.rollback1 + this.rollback3) / 2)) / 100 + " attacks per second";
          } else if ((attackSkill.animation == 7) && (this.skillsSelected != 19) && (attackSkill.rollback == 100)) {
              this.animationFrames = this.sequences[attackSkill.sequence][weapPrimary.type];
              // 9 Fists of Ember, 10 Fists of Thunder, 11 Blades of Ice, 12 Dragon Claw && offhand weapon selected
              if ((this.skillsSelected > 8) && (this.skillsSelected < 13) && (this.weaponsSecondarySelected > 0)) {
                  this.animationFrames = 16;
              }
              // merc act 2
              if (this.charactersSelected == 8) {
                  this.animationFrames = 14;
              }
              resultFpa = this.calcFPA(this.animationFrames, acceleration, start);
              resultFpa++;
              // 3 Jab && player classes
              if ((this.skillsSelected == 3) && (this.isPlayableClass)) {
                  resultFpa = parseInt(100 * resultFpa / 3) / 100;
              }
              // merc act 2
              if (this.charactersSelected == 8) {
                  resultFpa = resultFpa / 2;
              }
              if ((this.skillsSelected > 15) && (this.skillsSelected < 19)) { // 16 Double Swing, 17 Frenzy, 18 Double Throw 
                  resultFpa = resultFpa / 2;
              }
              // 9 Fists of Ember, 10 Fists of Thunder, 11 Blades of Ice, 12 Dragon Claw && offhand weapon selected
              if ((this.skillsSelected > 8) && (this.skillsSelected < 13) && (this.weaponsSecondarySelected > 0)) {
                  resultFpa = resultFpa / 2;
              }
          }
          // Whirlwind
          if (this.skillsSelected == 19) {
              resultFpa = 4; // uses classic whirlwind locked at 4 frame attack for all weapons
              isMaxIas = true;
              if (isMaxIas) {
                  this.isCurrentFpaMaxed = true;
              }
          }
          // Dragon Talon, Zeal, Fury
          if (attackSkill.rollback == 0) {
              // Dragon Talon
              if (this.skillsSelected == 14) {
                  this.rollback1 = this.calcFPA(4, acceleration, 0);
                  this.rollback1++;
                  this.rollback3 = this.calcFPA(13, acceleration, 0);
                  if (this.rollback3 == 7) {
                      this.isCurrentFpaMaxed = true;
                  }
                  this.currentFpa = this.rollback1 + "/" + this.rollback1 + "/" + this.rollback1 + "/" + this.rollback1 + "/" + this.rollback3 + " frames per attack";
                  this.currentAps = parseInt(100 * 25 / ((this.rollback1 * 4 + this.rollback3) / 5)) / 100 + " attacks per second";
              }
              // Fury
              if (this.skillsSelected == 29) {
                  this.animationFrames = this.weaponClassFrames[weapPrimary.type][this.charactersSelected][0];
                  this.rollback1 = this.calcFPA(this.animationFrames, acceleration, 0);
                  if (this.rollback1 > this.calcFPA(this.animationFrames, 175, 0)) {
                      isMaxIas = false;
                  }
                  this.rollback1++;
                  this.rollback3 = this.calcFPA(this.animationFrames, acceleration, 1);
                  if (this.rollback3 > this.calcFPA(this.animationFrames, 175, 1)) {
                      isMaxIas = false;
                  }
                  if (isMaxIas) {
                      this.isCurrentFpaMaxed = true;
                  }
                  isMaxIas = true;
                  this.currentFpa = this.rollback1 + "/" + this.rollback1 + "/" + this.rollback1 + "/" + this.rollback1 + "/" + this.rollback3 + " frames per attack";
                  this.currentAps = parseInt(100 * 25 / ((this.rollback1 * 4 + this.rollback3) / 5)) / 100 + " attacks per second";
              }
              // Zeal
              if (this.skillsSelected == 24) {
                  this.animationFrames = this.aktionsframe[weapPrimary.type][this.charactersSelected];
                  // 2-h sword && barb single handed
                  var isBarbTwoHandedSwordAsOneHanded = false;
                  if ((weapPrimary.type == this.weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                      isBarbTwoHandedSwordAsOneHanded = true;
                      this.animationFrames = 7;
                  }
                  console.debug(this.animationFrames);
                  this.rollback1 = this.calcFPA(this.animationFrames, acceleration, start);
                  if (this.rollback1 > this.calcFPA(this.animationFrames, 175, start)) {
                      isMaxIas = false;
                  }
                  this.rollback1++;
                  this.rollback2 = this.calcFPA(this.animationFrames, acceleration, 0);
                  if (this.rollback2 > this.calcFPA(this.animationFrames, 175, 0)) {
                      isMaxIas = false;
                  }
                  this.rollback2++;
                  this.animationFrames = this.weaponClassFrames[weapPrimary.type][this.charactersSelected][0];
                  console.debug(this.animationFrames);
                  if (isBarbTwoHandedSwordAsOneHanded) {
                      this.animationFrames = 16;
                  }
                  this.rollback3 = this.calcFPA(this.animationFrames, acceleration, 0);
                  if (this.rollback3 > this.calcFPA(this.animationFrames, 175, 0)) {
                      isMaxIas = false;
                  }
                  if (isMaxIas) {
                      this.isCurrentFpaMaxed = true;
                  }
                  isMaxIas = true;
                  this.currentFpa = this.rollback1 + "/" + this.rollback2 + "/" + this.rollback2 + "/" + this.rollback2 + "/" + this.rollback3 + " frames per attack";
                  // Zeal
                  if (this.skillsSelected == 24) {
                      this.currentAps = parseInt(100 * 25 / ((this.rollback1 + this.rollback2 * 3 + this.rollback3) / 5)) / 100 + " attacks per second";
                  }
              }
          }
          // Strafe
          if (attackSkill.rollback == 50) {
              this.animationFrames = this.aktionsframe[weapPrimary.type][this.charactersSelected];
              if (acceleration > 149) {
                  acceleration = 149;
              }
              this.rollback1 = this.calcFPA(this.animationFrames, acceleration, start);
              if (this.rollback1 > this.calcFPA(this.animationFrames, 149, start)) {
                  isMaxIas = false;
              }
              this.rollback1++;
              rollbackframe = Math.floor(Math.floor((256 * start + Math.floor(256 * acceleration / 100) * this.rollback1) / 256) * attackSkill.rollback / 100);
              this.rollback2 = this.calcFPA(this.animationFrames, acceleration, rollbackframe);
              if (this.rollback2 > this.calcFPA(this.animationFrames, 149, rollbackframe)) {
                  isMaxIas = false;
              }
              this.rollback2++;
              rollbackframe = Math.floor(Math.floor((256 * rollbackframe + Math.floor(256 * acceleration / 100) * this.rollback2) / 256) * attackSkill.rollback / 100);
              this.rollback3 = this.calcFPA(this.animationFrames, acceleration, rollbackframe);
              if (this.rollback3 > this.calcFPA(this.animationFrames, 149, rollbackframe)) {
                  isMaxIas = false;
              }
              this.rollback3++;
              rollbackframe = Math.floor(Math.floor((256 * rollbackframe + Math.floor(256 * acceleration / 100) * this.rollback3) / 256) * attackSkill.rollback / 100);
              this.rollback4 = this.calcFPA(this.animationFrames, acceleration, rollbackframe);
              if (this.rollback4 > this.calcFPA(this.animationFrames, 149, rollbackframe)) {
                  isMaxIas = false;
              }
              this.rollback4++;
              this.animationFrames = this.weaponClassFrames[weapPrimary.type][this.charactersSelected][0];
              rollbackframe = Math.floor(Math.floor((256 * rollbackframe + Math.floor(256 * acceleration / 100) * this.rollback4) / 256) * attackSkill.rollback / 100);
              this.rollback5 = this.calcFPA(this.animationFrames, acceleration, rollbackframe);
              if (this.rollback5 > this.calcFPA(this.animationFrames, 149, rollbackframe)) {
                  isMaxIas = false;
              }
              if ((this.rollback2 == 5) && (this.rollback3 == 4)) {
                  this.rollback3 = 5;
                  this.rollback5 = 13;
              }
              if (isMaxIas) {
                  this.isCurrentFpaMaxed = true; // strafe
              }
              isMaxIas = true;
              this.currentFpa = this.rollback1 + "/" + this.rollback2 + "/" + this.rollback3 + "/" + this.rollback4 + "/" + this.rollback5 + " frames per attack";
              this.currentAps = parseInt(100 * 25 / ((this.rollback1 + this.rollback2 + this.rollback3 * 4 + this.rollback4 * 3 + this.rollback5) / 10)) / 100 + " attacks per second";
          }
          // Fend
          if (attackSkill.rollback == 40) {
              this.animationFrames = this.aktionsframe[weapPrimary.type][this.charactersSelected];
              this.rollback1 = this.calcFPA(this.animationFrames, acceleration, start);
              if (this.rollback1 > this.calcFPA(this.animationFrames, 175, start)) {
                  isMaxIas = false;
              }
              this.rollback1++;
              rollbackframe = Math.floor(Math.floor((256 * start + Math.floor(256 * acceleration / 100) * this.rollback1) / 256) * attackSkill.rollback / 100);
              this.rollback2 = this.calcFPA(this.animationFrames, acceleration, rollbackframe);
              if (this.rollback2 > this.calcFPA(this.animationFrames, 175, rollbackframe)) {
                  isMaxIas = false;
              }
              this.rollback2++;
              this.animationFrames = this.weaponClassFrames[weapPrimary.type][this.charactersSelected][0];
              rollbackframe = Math.floor(Math.floor((256 * rollbackframe + Math.floor(256 * acceleration / 100) * this.rollback2) / 256) * attackSkill.rollback / 100);
              this.rollback3 = this.calcFPA(this.animationFrames, acceleration, rollbackframe);
              if (this.rollback3 > this.calcFPA(this.animationFrames, 175, rollbackframe)) {
                  isMaxIas = false;
              }
              if (isMaxIas) {
                  this.isCurrentFpaMaxed = true;
              }
              isMaxIas = true;
              this.currentFpa = this.rollback1 + "/" + this.rollback2 + "/" + this.rollback3 + " frames per attack";
              this.currentAps = parseInt(100 * 25 / ((this.rollback1 + this.rollback2 + this.rollback3) / 2)) / 100 + " attacks per second";
          }
          // Most attacks
          if (attackSkill.rollback == 100 && attackSkill.title !== "Frenzy (first swing hits)") {
              this.currentFpa = resultFpa + " frames per attack";
              this.currentAps = parseInt(100 * 25 / resultFpa) / 100 + " attacks per second";
              if (this.charactersSelected > 6) {
                  this.currentAps = parseInt(100 * 25 / (resultFpa + 2)) / 100 + " attacks per second";
              }
              if (((this.charactersSelected == 8) && (this.skillsSelected == 3)) || ((this.charactersSelected == 9) && (this.skillsSelected == 0))) {
                  this.currentAps = parseInt(100 * 25 / (resultFpa + 1)) / 100 + " attacks per second";
              }
              // Shape Shifted && off-hand weapon not unarmed && standard attack
              if ((this.shapeShiftFormsSelected > 0) && (this.weaponsSecondarySelected > 0) && (this.skillsSelected == 0)) {
                  this.currentFpa = "Calculation makes no sense";
                  this.currentAps = "";
              }
          }
      },
      calculateEffectiveIas: function () {
          if (this.weaponsPrimarySelected == 0) {
              this.IASprimaer = parseInt(this.iasOffWeapon);
          }
          if ((this.weaponsPrimarySelected > 0) && (this.weaponsSecondarySelected == 0)) {
              this.IASprimaer = parseInt(this.iasOffWeapon) + parseInt(this.iasWeaponPrimary);
          }
          if (this.weaponsSecondarySelected > 0) {
              this.IASprimaer = parseInt(this.iasOffWeapon) + parseInt(this.iasWeaponPrimary);
              this.IASsekundaer = parseInt(this.iasOffWeapon) + parseInt(this.iasWeaponPrimary);
          }
          this.EIASprimaer = Math.floor(120 * this.IASprimaer / (120 + this.IASprimaer));
          this.EIASsekundaer = Math.floor(120 * this.IASsekundaer / (120 + this.IASsekundaer));
      },
      calculateSkillIas: function () {
          var fana = parseInt(this.fanaticismSkillIas);
          var frenzy = parseInt(this.frenzySkillIas);
          var wolf = parseInt(this.werewolfSkillIas);
          var tempo = parseInt(this.burstOfSpeedSkillIas);
          var holyfrost = parseInt(this.holyFreezeSkillIas);
          var attackSkill = this.data.attack[this.skillsSelected];
          // != Wolf
          if (this.shapeShiftFormsSelected != 2) wolf = 0;
          this.SIAS = fana + frenzy + wolf + tempo - holyfrost;
          // double swing
          if (this.skillsSelected == 16) {
              this.SIAS = this.SIAS + 50;
          }
          // dragon tail
          if (this.skillsSelected == 13) {
              this.SIAS = this.SIAS - 40;
          }
          if (this.isDecrepify) {
              this.SIAS = this.SIAS - 50;
          }
          // impale, jab, dragon claw, double swing, double throw, frenzy, whirlwind
          if (attackSkill.animation == 7 && this.isPlayableClass) {
              this.SIAS = this.SIAS - 30; // this penalty is applied to bring the normal starting value of 100 down to the skill specific 70
          }
      },
      sanitiseSelected: function (selected, values) {
          if (typeof(values.find(v => v.value == selected)) === "undefined") selected = values[0].value;
          return selected;
      }
  },
  computed: {
        query: function() {
            let query = {};
            query.c = this.charactersSelected;
            if (this.shapeShiftFormsSelected) query.ss = this.shapeShiftFormsSelected;
            if (this.skillsSelected) query.s = this.skillsSelected;
            if (this.iasOffWeapon) query.io = this.iasOffWeapon;
            if (this.weaponsPrimarySelected) query.w1 = this.weaponsPrimarySelected;
            if (this.iasWeaponPrimary) query.i1 = this.iasWeaponPrimary;
            if (this.weaponsSecondarySelected) query.w2 = this.weaponsSecondarySelected;
            if (this.iasWeaponSecondary) query.i2 = this.iasWeaponSecondary;
            if (this.weaponsPrimaryBarbHandednessSelected) query.bh = this.weaponsPrimaryBarbHandednessSelected;
            if (this.isWsmBug) query.bug = '1';
            if (this.fanaticismSkillIas) query.fana = this.fanaticismSkillIas;
            if (this.frenzySkillIas) query.frenz = this.frenzySkillIas;
            if (this.werewolfSkillIas) query.wolf = this.werewolfSkillIas;
            if (this.burstOfSpeedSkillIas) query.bos = this.burstOfSpeedSkillIas;
            if (this.holyFreezeSkillIas) query.freeze = this.holyFreezeSkillIas;
            if (this.isDecrepify) query.decrep = '1';
            return query;
        },
        queryString: function() {
            return Object.keys(this.query).map(key => key + '=' + this.query[key]).join('&');
        },
        shareLink: function() {
            if (this.queryString) return 'https://mmmpld.github.io/pod-attack-calc/?' + this.queryString;
            return 'https://mmmpld.github.io/pod-attack-calc/';
        },
      attackSkill: function() {
           return this.data.attack[this.skillsSelected];
      },
      iasOffWeapon: {
        get () {
            return this.iasOffWeaponRaw || 0;
        },
        set (value) {
            this.iasOffWeaponRaw = parseInt(value) || 0;
        }
      },
      iasWeaponPrimary: {
        get () {
            return this.iasWeaponPrimaryRaw || 0;
        },
        set (value) {
            this.iasWeaponPrimaryRaw = parseInt(value) || 0;
        }
      },
      iasWeaponSecondary: {
        get () {
            return this.iasWeaponSecondaryRaw || 0;
        },
        set (value) {
            this.iasWeaponSecondaryRaw = parseInt(value) || 0;
        }
      },
      isPlayableClass: function () {
          return this.charactersSelected <= 6;
      },
      canDualWield: function () {
          if (this.charactersSelected == 1 || this.charactersSelected == 2) return true;
          return false;
      },
      canShapeShiftWerewolf: function () {
          if (this.charactersSelected == 2 || this.charactersSelected == 3) return true;
          return false;
      },
      shapeShiftForms: function () {
          var values = [
              { value: 0, text: 'Unchanged' },
          ];
          if (this.isPlayableClass) values.push({ value: 1, text: 'Werebear' });
          if (this.canShapeShiftWerewolf) values.push({ value: 2, text: 'Werewolf' });
          return values;
      },
      fanaticism: function () {
          var values = [];
          for (let i = 0; i <= 50; i++) {
              var v = Math.floor(Math.floor((110 * i) / (6 + i)) * (40 - 10) / 100) + 10;
              if (i == 0) {
                  v = 0;
              }
              values.push({ value: v, text: i });
          }
          return values;
      },
      frenzy: function () {
          if (this.charactersSelected == 2) { // barb
            if (!this.useVanillaSkillIas) {
              return [
                  { value: 0,  text: 0 },
                  { value: 9,  text: 1 },
                  { value: 13, text: 2 },
                  { value: 15, text: 3 },
                  { value: 18, text: 4 },
                  { value: 20, text: 5 },
                  { value: 21, text: 6 },
                  { value: 22, text: 7 },
                  { value: 23, text: 8 },
                  { value: 24, text: 9 },
                  { value: 25, text: 10 },
                  { value: 26, text: 11 },
                  { value: 26, text: 12 },
                  { value: 27, text: 13 },
                  { value: 28, text: 14 },
                  { value: 28, text: 15 },
                  { value: 29, text: 16 },
                  { value: 29, text: 17 },
                  { value: 29, text: 18 },
                  { value: 29, text: 19 },
                  { value: 30, text: 20 },
              ];
            } else {
                let values = [];
                for (let i = 0; i <= 50; i++) {
                    if (i == 0) {
                        values.push({text: i, value: 0});
                    } else {
                        values.push({text: i, value: Math.floor(Math.floor((110 * i) / (6 + i)) * (50 - 0) / 100) + 0});
                    }
                }
                return values;
            }
          } else {
              return [{ value: 0, text: '-' }];
          }
      },
      canFrenzy: function() {
          return this.charactersSelected == 2;
      },
      canWerewolf: function() {
          return this.shapeShiftFormsSelected == 2;
      },
      werewolf: function () {
          if (this.canShapeShiftWerewolf) {
              return [
                  { value: 0,  text: 0 },
                  { value: 36, text: 1 },
                  { value: 45, text: 2 },
                  { value: 52, text: 3 },
                  { value: 58, text: 4 },
                  { value: 62, text: 5 },
                  { value: 66, text: 6 },
                  { value: 69, text: 7 },
                  { value: 71, text: 8 },
                  { value: 74, text: 9 },
                  { value: 76, text: 10 },
                  { value: 78, text: 11 },
                  { value: 79, text: 12 },
                  { value: 81, text: 13 },
                  { value: 82, text: 14 },
                  { value: 83, text: 15 },
                  { value: 85, text: 16 },
                  { value: 85, text: 17 },
                  { value: 86, text: 18 },
                  { value: 87, text: 19 },
                  { value: 88, text: 20 },
              ];
          } else {
              return [{ value: 0, text: '-' }];
          }
      },
      burstOfSpeed: function () {
          if (this.charactersSelected == 1) { // sin
              var values = [];
              for (let i = 0; i <= 50; i++) {
                  var v = Math.floor(Math.floor((110 * i) / (6 + i)) * (60 - 15) / 100) + 15;
                  if (i == 0) {
                      v = 0;
                  }
                  values.push({ value: v, text: i });
              }
              return values;
          } else {
              return [{ value: 0, text: '-' }];
          }
      },
      canBurstOfSpeed: function() {
          return this.charactersSelected == 1;
      },
      holyFreeze: function () {
          return [
              { value: 0,  text: 0 },
              { value: 14, text: 1 },
              { value: 18, text: 2 },
              { value: 20, text: 3 },
              { value: 23, text: 4 },
              { value: 25, text: 5 },
              { value: 26, text: 6 },
              { value: 27, text: 7 },
              { value: 28, text: 8 },
              { value: 29, text: 9 },
              { value: 30, text: 10 },
              { value: 31, text: 11 },
              { value: 31, text: 12 },
              { value: 32, text: 13 },
              { value: 33, text: 14 },
              { value: 33, text: 15 },
              { value: 34, text: 16 },
              { value: 34, text: 17 },
              { value: 34, text: 18 },
              { value: 34, text: 19 },
              { value: 35, text: 20 },
          ];
      },
      weaponsPrimary: function() {
          var values = [];
          for (let i = 0; i < this.lookupWeapon.length; i++) {
              var weapPrimary = this.lookupWeapon[i];
              // -1 all classes || this class's item 
              if ((weapPrimary.classItem < 0) || (weapPrimary.classItem == this.charactersSelected)) {
                  if (this.isPlayableClass
                      || i == 0 // unarmed
                      || (this.charactersSelected == 7  && (weapPrimary.type == this.weaponTypes.bow || weapPrimary.type == this.weaponTypes.crossbow))                                         // Act 1 Merc
                      || (this.charactersSelected == 8  && (weapPrimary.weaponCategory == this.weaponCategories.polearm || weapPrimary.weaponCategory == this.weaponCategories.spearOrJavalin)) // Act 2 Merc
                      || (this.charactersSelected == 9  &&  weapPrimary.weaponCategory == this.weaponCategories.swords)                                                                    // Act 5 Merc
                      || (this.charactersSelected == 10 &&  weapPrimary.weaponCategory == this.weaponCategories.swords && weapPrimary.type == this.weaponTypes.oneHandedSwingingWeapon)         // Act 3 Merc
                  ) {
                      values.push({ value: i, text: weapPrimary.name, commonItems: weapPrimary.commonItems });
                  }
              }
          }
          return values;
      },
      isWeaponsPrimaryBarbHandednessNeeded: function() {
          return this.charactersSelected == 2 && this.lookupWeapon[this.weaponsPrimarySelected].type == this.weaponTypes.twoHandedSword;
      },
      weaponsPrimaryBarbHandedness: function () {
          var values = [];
          if (this.isWeaponsPrimaryBarbHandednessNeeded) {
              values.push({ value: 0, text: 'two-handed' });
              values.push({ value: 1, text: 'single-handed' });
          } else {
              values.push({ value: -1, text: '-' });
          }
          return values;
      },
      weaponsSecondary: function () {
          var values = [];
          if (this.weaponsPrimarySelected == null) return values;
          var weapPrimary = this.lookupWeapon[this.weaponsPrimarySelected];
          switch (this.charactersSelected) {
              case 1: // sin
                  if (weapPrimary.type == this.weaponTypes.claw) {
                      for (let i = 0; i < this.lookupWeapon.length; i++) {
                          let weapLookup = this.lookupWeapon[i];
                          if (weapLookup.classItem == 1 || weapLookup.type == this.weaponTypes.unarmed) {
                              values.push({ value: i, text: weapLookup.name, commonItems: weapLookup.commonItems });
                          }
                      }
                  } else {
                      values.push({ value: 0, text: '-' });
                  }
                  break;
              case 2: // barb
                  if ((weapPrimary.type == this.weaponTypes.oneHandedSwingingWeapon || weapPrimary.type == this.weaponTypes.oneHandedThrustingWeapon) || (weapPrimary.type == this.weaponTypes.twoHandedSword && this.weaponsPrimaryBarbHandednessSelected == 1)) {
                      for (let i = 0; i < this.lookupWeapon.length; i++) {
                          let weapLookup = this.lookupWeapon[i];
                          if (weapLookup.type == this.weaponTypes.unarmed 
                              || weapLookup.type == this.weaponTypes.twoHandedSword 
                              || ((weapLookup.type == this.weaponTypes.oneHandedSwingingWeapon || weapLookup.type == this.weaponTypes.oneHandedThrustingWeapon) && weapLookup.classItem == -1)) {
                              values.push({ value: i, text: weapLookup.name, commonItems: weapLookup.commonItems });
                          }
                      }
                  } else {
                      values.push({ value: 0, text: '-' });
                  }
                  break;
              default:
                  values.push({ value: 0, text: '-' });
                  break;
          }
          return values;
      },
      weaponInfoPrimary: function () {
          var weapon = this.weaponsPrimary.find(w => w.value == this.weaponsPrimarySelected);
          if (weapon != null) {
              return {
                  description: this.weaponClassFrames[this.lookupWeapon[this.weaponsPrimarySelected].type][11],
                  wsm: this.lookupWeapon[this.weaponsPrimarySelected].wsm,
                  value: this.weaponsPrimarySelected,
                  text: weapon.text,
              }
          }
          return {
              description: '',
              wsm: 0,
              value: 0,
              text: '',
          };
      },
      weaponInfoSecondary: function () {
          if (this.weaponsSecondarySelected != null) {
              var weapon = this.weaponsSecondary.find(w => w.value == this.weaponsSecondarySelected);
              if (weapon != null) {
                  return {
                      description: this.weaponClassFrames[this.lookupWeapon[this.weaponsSecondarySelected].type][11],
                      wsm: this.lookupWeapon[this.weaponsSecondarySelected].wsm,
                      value: this.weaponsSecondarySelected,
                      text: weapon.text,
                  }
              }
          }
          return {
              description: '',
              wsm: 0,
              value: 0,
              text: '',
          };
      },
      skills: function () {
          var values = [];
          var valuesNonNative = [];
          var weapPrimary = this.lookupWeapon[this.weaponsPrimarySelected];
          var weapSecondary = this.lookupWeapon[this.weaponsSecondarySelected];
          switch (this.charactersSelected) {
              case 0: // Amazon
                  values.push(this.getSkillOptionData("Standard"));
                  if (this.shapeShiftFormsSelected == 0) {
                      if ((weapPrimary.weaponCategory == this.weaponCategories.spearOrJavalin) || (weapPrimary.weaponCategory == this.weaponCategories.throwing)) {
                          values.push(this.getSkillOptionData("Throw")); // spears shouldn't be included here as throwable
                      }
                      if (weapPrimary.weaponCategory == this.weaponCategories.bowOrXbow) {
                          values.push(this.getSkillOptionData("Strafe"));
                      }
                      if ((weapPrimary.weaponCategory == this.weaponCategories.spearOrJavalin) || (weapPrimary.type == this.weaponTypes.spear)) {
                          values.push(this.getSkillOptionData("Impale"));
                          values.push(this.getSkillOptionData("Jab"));
                          values.push(this.getSkillOptionData("Fend"));
                      }
                      if (weapPrimary.canZeal) {
                          valuesNonNative.push(this.getSkillOptionData("Zeal"));
                      }
                  }
                  break;
              case 1: // Assassin
                  values.push(this.getSkillOptionData("Standard"));
                  // not shapeshifted
                  if (this.shapeShiftFormsSelected == 0) {
                      if ((weapPrimary.weaponCategory == this.weaponCategories.spearOrJavalin) || (weapPrimary.weaponCategory == this.weaponCategories.throwing)) {
                          values.push(this.getSkillOptionData("Throw"));
                      }
                      values.push(this.getSkillOptionData("Laying Traps"));
                      if (weapPrimary.type === this.weaponTypes.claw || this.isDagger(this.weaponsPrimarySelected)) {
                          values.push(this.getSkillOptionData("Fists of Ember"));
                          values.push(this.getSkillOptionData("Fists of Thunder"));
                          values.push(this.getSkillOptionData("Fists of Ice"));
                          values.push(this.getSkillOptionData("Blades of Ice"));
                          values.push(this.getSkillOptionData("Static Strike"));
                          values.push(this.getSkillOptionData("Emberstorm"));
                      }
                      if ((weapPrimary.type == this.weaponTypes.claw) && (weapSecondary.type == this.weaponTypes.claw)) {
                          values.push(this.getSkillOptionData("Dragon Claw"));
                      }
                      values.push(this.getSkillOptionData("Dragon Tail"));
                      values.push(this.getSkillOptionData("Dragon Talon"));
                      // should be weapons that can be passion runeword || POD chaos, any 3os sin claw
                      if (weapPrimary.canZeal) {
                          valuesNonNative.push(this.getSkillOptionData("Zeal"));
                      }
                  }
                  break;
              case 2: // Barbarian
                  values.push(this.getSkillOptionData("Standard"));
                  if (this.shapeShiftFormsSelected == 0) {
                      // primary throwing weapon
                      if ((weapPrimary.weaponCategory == this.weaponCategories.spearOrJavalin) || (weapPrimary.weaponCategory == this.weaponCategories.throwing)) {
                          values.push(this.getSkillOptionData("Throw"));
                      }
                      // offhand weapon
                      if (this.weaponsSecondarySelected > 0) {
                          values.push(this.getSkillOptionData("Double Swing"));
                          values.push(this.getSkillOptionData("Frenzy (first swing hits)"));
                          values.push(this.getSkillOptionData("Frenzy (first swing misses)"));
                      }
                      // primary throwing and offhand throwing
                      if (((weapPrimary.weaponCategory == this.weaponCategories.spearOrJavalin) || (weapPrimary.weaponCategory == this.weaponCategories.throwing)) && ((weapSecondary.weaponCategory == this.weaponCategories.spearOrJavalin) || (weapSecondary.weaponCategory == this.weaponCategories.throwing))) {
                          values.push(this.getSkillOptionData("Double Throw"));
                      }
                      // not bow or xbow
                      if (weapPrimary.weaponCategory != this.weaponCategories.bowOrXbow) {
                          values.push(this.getSkillOptionData("Whirlwind"));
                          values.push(this.getSkillOptionData("Concentrate"));
                          values.push(this.getSkillOptionData("Berserk"));
                          values.push(this.getSkillOptionData("Bash"));
                          values.push(this.getSkillOptionData("Stun"));
                          values.push(this.getSkillOptionData("Cleave"));
                      }
                      // can zeal
                      if (weapPrimary.canZeal || weapSecondary.canZeal) {
                          valuesNonNative.push(this.getSkillOptionData("Zeal"));
                      }
                  }
                  // bear barb
                  if (this.shapeShiftFormsSelected == 1) {
                      // not bow or xbow
                      if (weapPrimary.weaponCategory != this.weaponCategories.bowOrXbow) {
                          values.push(this.getSkillOptionData("Cleave"));
                      }
                  }
                  // wolf barb
                  if (this.shapeShiftFormsSelected == 2) {
                      valuesNonNative.push(this.getSkillOptionData("Feral Rage"));
                      // not bow or xbow
                      if (weapPrimary.weaponCategory != this.weaponCategories.bowOrXbow) {
                          values.push(this.getSkillOptionData("Cleave"));
                      }
                  }
                  break;
              case 3: // Druid
                  values.push(this.getSkillOptionData("Standard"));
                  if (this.shapeShiftFormsSelected == 0) {
                      if ((weapPrimary.weaponCategory == this.weaponCategories.spearOrJavalin) || (weapPrimary.weaponCategory == this.weaponCategories.throwing)) {
                          values.push(this.getSkillOptionData("Throw"));
                      }
                      if (weapPrimary.canZeal) {
                          valuesNonNative.push(this.getSkillOptionData("Zeal"));
                      }
                  }
                  if (this.shapeShiftFormsSelected == 1) {
                      values.push(this.getSkillOptionData("Hunger"));
                  }
                  if (this.shapeShiftFormsSelected == 2) {
                      values.push(this.getSkillOptionData("Feral Rage"));
                      values.push(this.getSkillOptionData("Hunger"));
                      values.push(this.getSkillOptionData("Rabies"));
                      values.push(this.getSkillOptionData("Fury"));
                  }
                  break;
              case 5: // Paladin
                  values.push(this.getSkillOptionData("Standard"));
                  if (this.shapeShiftFormsSelected == 0) {
                      if ((weapPrimary.weaponCategory == this.weaponCategories.spearOrJavalin) || (weapPrimary.weaponCategory == this.weaponCategories.throwing)) {
                          values.push(this.getSkillOptionData("Throw"));
                      }
                      // not bow or xbow
                      if (weapPrimary.weaponCategory != this.weaponCategories.bowOrXbow) {
                          values.push(this.getSkillOptionData("Zeal"));
                          values.push(this.getSkillOptionData("Sacrifice"));
                          values.push(this.getSkillOptionData("Vengeance"));
                          values.push(this.getSkillOptionData("Conversion"));
                      }
                      if ((weapPrimary.type == this.weaponTypes.unarmed) || (weapPrimary.type == this.weaponTypes.oneHandedSwingingWeapon) || (weapPrimary.type == this.weaponTypes.oneHandedThrustingWeapon)) {
                          values.push(this.getSkillOptionData("Smite"));
                      }
                  }
                  break;
              case 7: // Merc - Rogue
                  values.push(this.getSkillOptionData("Standard"));
                  break;
              case 8: // Merc - Town Guard
                  values.push(this.getSkillOptionData("Jab"));
                  values.push(this.getSkillOptionData("Standard"));
                  break;
              case 9: // Merc - Barbarian
                  values.push(this.getSkillOptionData("Bash"));
                  break;
              case 10: // Merc - Iron Wolves
                  values.push(this.getSkillOptionData("Vengeance"));
                  break;
              default: // Necromancer & Sorceress
                  values.push(this.getSkillOptionData("Standard"));
                  if (this.shapeShiftFormsSelected == 0) {
                      if ((weapPrimary.weaponCategory == this.weaponCategories.spearOrJavalin) || (weapPrimary.weaponCategory == this.weaponCategories.throwing)) {
                          values.push(this.getSkillOptionData("Throw"));
                      }
                      if (weapPrimary.canZeal) {
                          valuesNonNative.push(this.getSkillOptionData("Zeal"));
                      }
                  }
                  break;
          }
          if (valuesNonNative.length > 0) {
              values.unshift({ header: "native attacks" });
              valuesNonNative.unshift({ header: "non-class skills" });
              values = values.concat(valuesNonNative);
          }
          return values;
      },
      startingFrame: function () {
          var startframe = [1, 0, 2, 2, 2, 2, 2, 0, 0];
          var start = 0;
          var attackSkill = this.data.attack[this.skillsSelected];
          var weapPrimary = this.lookupWeapon[this.weaponsPrimarySelected];
          // (ama || sorc) && animation < 2 == Standard, Throw, Strafe, Fend
          if (((this.charactersSelected == 0) || (this.charactersSelected == 6)) && (attackSkill.animation < 2)) {
              start = startframe[weapPrimary.type];
          }
          // Old BoI, Impale, Jab, old Fists of Ember, old Fists of Thunder, Dragon Claw, Double Swing, Frenzy, Double Throw, Whirlwind (potential 2 hand attacks?)
          // && not whirlwind && rollback normal
          if ((attackSkill.animation == 7) && (this.skillsSelected != 19) && (attackSkill.rollback == 100)) {
              start = 0;
          }
          return start;
      },
      breakpoints: function () {
          var resultFpa;
          var RBframe;
          var temp;
          var temp1;
          var OIAS = this.iasOffWeapon;
          var WIAS = this.iasWeaponPrimary;
          var attackSkill = this.data.attack[this.skillsSelected];
          this.calculateSkillIas();
          this.calculateEffectiveIas(); // usually set by calculateValues
          this.calculateWsm();
          this.isAtFpaCap = false;
          var breakpoints = [];
          var breakpoints1 = [];
          var breakpoints2 = [];
          var breakpointsAPS = [];
          var nonStandardWeapon = [];
          var weapPrimary = this.lookupWeapon[this.weaponsPrimarySelected];
          var start = this.startingFrame;

          // Unshifted
          if (this.shapeShiftFormsSelected == 0) {
              temp1 = 0;
              if (((attackSkill.animation == 0)
                  || (attackSkill.animation == 2)
                  || (attackSkill.animation == 3)
                  || (attackSkill.animation == 4)
                  || (attackSkill.animation == 5)
              ) && (attackSkill.rollback == 100)) {
                  console.info("calc ias for most");
                  for (let i = Math.max(100 + this.SIAS - this.WSMprimaer, 15); i <= 175; i++) {
                      //this.animationFrames = this.weaponClassFrames[weapPrimary.type][this.charactersSelected][0]; // intentionally not set here as calculateValues sets it as a side-effect
                      resultFpa = this.calcFPA(this.animationFrames, i, start);
                      if ((temp1 != resultFpa) && (i - 100 - this.SIAS + this.WSMprimaer < 120)) {
                          breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - this.SIAS + this.WSMprimaer) / (120 - (i - 100 - this.SIAS + this.WSMprimaer))), resultFpa];
                          temp1 = resultFpa;
                      }
                  }
              }
              // standard attack animation && no secondary weapon (or primary only attacks) && standard rollback
              if (attackSkill.animation == 1
                  && attackSkill.rollback == 100
                  && (this.weaponsSecondarySelected == 0
                      || attackSkill.title === "Static Strike"
                      || attackSkill.title === "Blades of Ice"
                      || attackSkill.title === "Emberstorm"
                      || attackSkill.title === "Fists of Ice"
                      || attackSkill.title === "Fists of Ember"
                      || attackSkill.title === "Fists of Thunder")) {
                  console.info("calc ias for standard attack single");
                  for (let i = Math.max(100 + this.SIAS - this.WSMprimaer, 15); i <= 175; i++) {
                      this.animationFrames = this.weaponClassFrames[weapPrimary.type][this.charactersSelected][0];
                      if ((weapPrimary.type == this.weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                          this.animationFrames = 16;
                      }
                      resultFpa = this.calcFPA(this.animationFrames, i, start);
                      this.animationFrames = this.weaponClassFrames[weapPrimary.type][this.charactersSelected][1];
                      if ((weapPrimary.type == this.weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                          this.animationFrames = 16;
                      }
                      temp = this.calcFPA(this.animationFrames, i, start);
                      resultFpa = (resultFpa + temp) / 2;
                      if (this.charactersSelected == 9) {
                          resultFpa = resultFpa / 2;
                      }
                      if ((temp1 != resultFpa) && (i - 100 - this.SIAS + this.WSMprimaer < 120)) {
                          breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - this.SIAS + this.WSMprimaer) / (120 - (i - 100 - this.SIAS + this.WSMprimaer))), resultFpa];
                          temp1 = resultFpa;
                      }
                  }
              } else if ((attackSkill.animation == 1) && (this.weaponsSecondarySelected > 0) && (attackSkill.rollback == 100)) {
                  // standard attack animation && secondary weapon selected && standard rollback
                  console.info("calc ias for standard attack dual");
                  for (let i = Math.max(100 + this.SIAS - this.WSMprimaer, 15); i <= 175; i++) {
                      this.animationFrames = this.weaponClassFrames[weapPrimary.type][this.charactersSelected][0];
                      if ((weapPrimary.type == this.weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                          this.animationFrames = 16;
                      }
                      resultFpa = this.calcFPA(this.animationFrames, i, 0);
                      this.animationFrames = this.weaponClassFrames[weapPrimary.type][this.charactersSelected][1];
                      if ((weapPrimary.type == this.weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                          this.animationFrames = 16;
                      }
                      temp = this.calcFPA(this.animationFrames, i, 0);
                      resultFpa = (resultFpa + temp) / 2;
                      if ((temp1 != resultFpa) && (i - 100 - this.SIAS + this.WSMprimaer < 120)) {
                          breakpoints1[breakpoints1.length] = [Math.ceil(120 * (i - 100 - this.SIAS + this.WSMprimaer) / (120 - (i - 100 - this.SIAS + this.WSMprimaer))) - this.IASprimaer, resultFpa];
                          temp1 = resultFpa;
                      }
                      if ((breakpoints1.length > 1) && (breakpoints1[1][0] < 0) && (breakpoints1[0][0] == 0)) {
                          breakpoints1.reverse();
                          breakpoints1.length = breakpoints1.length - 1;
                          breakpoints1.reverse();
                      }
                      if ((breakpoints1.length > 0) && (breakpoints1[0][0] < 0)) {
                          breakpoints1[0][0] = 0;
                      }
                  }
                  temp1 = 0;
                  for (let i = Math.max(100 + this.SIAS - this.WSMsekundaer, 15); i <= 175; i++) {
                      resultFpa = this.calcFPA(12, i, 0);
                      if ((temp1 != resultFpa) && (i - 100 - this.SIAS + this.WSMsekundaer < 120)) {
                          breakpoints2[breakpoints2.length] = [Math.ceil(120 * (i - 100 - this.SIAS + this.WSMsekundaer) / (120 - (i - 100 - this.SIAS + this.WSMsekundaer))) - this.IASsekundaer, resultFpa];
                          temp1 = resultFpa;
                      }
                      if ((breakpoints2.length > 1) && (breakpoints2[1][0] < 0) && (breakpoints2[0][0] == 0)) {
                          breakpoints2.reverse();
                          breakpoints2.length = breakpoints2.length - 1;
                          breakpoints2.reverse();
                      }
                      if ((breakpoints2.length > 0) && (breakpoints2[0][0] < 0)) {
                          breakpoints2[0][0] = 0;
                      }
                  }
                  var IASmax1 = breakpoints1[breakpoints1.length - 1][0]
                  var IASmax2 = breakpoints2[breakpoints2.length - 1][0]
                  for (let i = 0; i <= Math.max(IASmax1, IASmax2); i++) {
                      if ((breakpoints1.length > 1) && (breakpoints1[1][0] == i)) {
                          breakpoints1.reverse();
                          breakpoints1.length = breakpoints1.length - 1;
                          breakpoints1.reverse();
                      }
                      if ((breakpoints2.length > 1) && (breakpoints2[1][0] == i)) {
                          breakpoints2.reverse();
                          breakpoints2.length = breakpoints2.length - 1;
                          breakpoints2.reverse();
                      }
                      if ((breakpoints1[0][0] == i) || (breakpoints2[0][0] == i)) {
                          breakpoints[breakpoints.length] = [i, (breakpoints1[0][1] + breakpoints2[0][1]) / 2];
                      }
                  }
              }
              // Impale, Jab, Dragon Claw, Double Swing, Frenzy, Double Throw && not Whirlwind
              if (attackSkill.title === 'Frenzy (first swing hits)') {
                    console.debug('special case breakpoints for frenzy first swing hits');
                    let weapSecondary = this.lookupWeapon[this.weaponsSecondarySelected];
                    let frenzyTempParts = [0, 0];
                    for (let accel = 0; accel < 1000; accel++) {
                        let frenzyFpa = this.frenzyFpa(accel);
                        this.rollback1 = frenzyFpa.parts[0];
                        this.rollback3 = frenzyFpa.parts[1];
                        resultFpa = frenzyFpa.sum;
                        if ((frenzyTempParts[0] != frenzyFpa.parts[0] || frenzyTempParts[1] != frenzyFpa.parts[1]) && (accel - 100 - this.SIAS + this.WSMprimaer < 120)) {
                            let newBreakpoint = [
                                accel,
                                frenzyFpa.parts[0] + "/" + frenzyFpa.parts[1]//resultFpa
                            ];
                            breakpoints[breakpoints.length] = newBreakpoint;
                            breakpointsAPS[breakpointsAPS.length] = parseInt(2500 / ((this.rollback1 + this.rollback3) / 2)) / 100;
                            temp1 = resultFpa;
                            frenzyTempParts = frenzyFpa.parts;
                        }
                    }
              } else if ((attackSkill.animation == 7) && (this.skillsSelected != 19)) {
                  console.info("calc ias for animation 7");
                  for (let i = Math.max(100 + this.SIAS - this.WSMprimaer, 15); i <= 175; i++) {
                      resultFpa = this.calcFPA(this.animationFrames, i, 0);
                      resultFpa++;
                      if ((this.skillsSelected == 3) && (this.isPlayableClass)) {
                          resultFpa = parseInt(100 * resultFpa / 3) / 100;
                      }
                      if (this.charactersSelected == 8) {
                          resultFpa = resultFpa / 2;
                      }
                      if ((this.skillsSelected > 15) && (this.skillsSelected < 19)) {
                          resultFpa = resultFpa / 2;
                      }
                      if ((this.skillsSelected > 8) && (this.skillsSelected < 13) && (this.weaponsSecondarySelected > 0)) {
                          resultFpa = resultFpa / 2;
                      }
                      if ((temp1 != resultFpa) && (i - 100 - this.SIAS + this.WSMprimaer < 120)) {
                          breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - this.SIAS + this.WSMprimaer) / (120 - (i - 100 - this.SIAS + this.WSMprimaer))), resultFpa];
                          temp1 = resultFpa;
                      }
                  }
              }
              if (attackSkill.title == 'Whirlwind') {
                  console.info("calc ias for whirlwind");
                  breakpoints[breakpoints.length] = [0, 4]; // classic whirlwind locked at 4fpa
              }
              // Dragon Talon, Zeal. Fury handled under wearform
              if (attackSkill.rollback == 0) {
                  console.info("calc ias for multiple attacks");
                  for (let i = Math.max(100 + this.SIAS - this.WSMprimaer, 15); i <= 175; i++) {
                      if (attackSkill.title == 'Dragon Talon') {
                          this.animationFrames = 4;
                      }
                      if (attackSkill.title == 'Zeal') {
                          this.animationFrames = this.aktionsframe[weapPrimary.type][this.charactersSelected];
                      }
                      if ((weapPrimary.type == this.weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                          this.animationFrames = 7;
                      }
                      this.rollback1 = this.calcFPA(this.animationFrames, i, start);
                      this.rollback1++;
                      this.rollback2 = this.calcFPA(this.animationFrames, i, 0);
                      this.rollback2++;
                      if (attackSkill.title == 'Dragon Talon') {
                          this.animationFrames = 13;
                      }
                      if (attackSkill.title == 'Zeal') {
                          this.animationFrames = this.weaponClassFrames[weapPrimary.type][this.charactersSelected][0];
                      }
                      if ((weapPrimary.type == this.weaponTypes.twoHandedSword) && (this.weaponsPrimaryBarbHandednessSelected == 1)) {
                          this.animationFrames = 16;
                      }
                      this.rollback3 = this.calcFPA(this.animationFrames, i, 0);
                      resultFpa = this.rollback1 + this.rollback2 + this.rollback3;
                      if ((temp1 != resultFpa) && (i - 100 - this.SIAS + this.WSMprimaer < 120)) {
                          breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - this.SIAS + this.WSMprimaer) / (120 - (i - 100 - this.SIAS + this.WSMprimaer))), this.rollback1 + "/" + this.rollback2 + "/" + this.rollback2 + "/" + this.rollback2 + "/" + this.rollback3];
                          breakpointsAPS[breakpointsAPS.length] = parseInt(2500 / ((this.rollback1 + this.rollback2 * 3 + this.rollback3) / 5)) / 100;
                          temp1 = resultFpa;
                      }
                  }
              }
              if (attackSkill.title == 'Strafe') {
                  console.info("calc ias for strafe");
                  let strafeI = Math.max(100 + this.SIAS - this.WSMprimaer, 15);
                  for (let i = Math.max(100 + this.SIAS - this.WSMprimaer, 15); i <= 149; i++) {
                      this.animationFrames = this.aktionsframe[weapPrimary.type][this.charactersSelected];
                      this.rollback1 = this.calcFPA(this.animationFrames, i, start);
                      this.rollback1++;
                      RBframe = Math.floor(Math.floor((256 * start + Math.floor(256 * i / 100) * this.rollback1) / 256) * attackSkill.rollback / 100);
                      this.rollback2 = this.calcFPA(this.animationFrames, i, RBframe);
                      this.rollback2++;
                      RBframe = Math.floor(Math.floor((256 * RBframe + Math.floor(256 * i / 100) * this.rollback2) / 256) * attackSkill.rollback / 100);
                      this.rollback3 = this.calcFPA(this.animationFrames, i, RBframe);
                      this.rollback3++;
                      RBframe = Math.floor(Math.floor((256 * RBframe + Math.floor(256 * i / 100) * this.rollback3) / 256) * attackSkill.rollback / 100);
                      this.rollback4 = this.calcFPA(this.animationFrames, i, RBframe);
                      this.rollback4++;
                      this.animationFrames = this.weaponClassFrames[weapPrimary.type][this.charactersSelected][0];
                      RBframe = Math.floor(Math.floor((256 * RBframe + Math.floor(256 * i / 100) * this.rollback4) / 256) * attackSkill.rollback / 100);
                      this.rollback5 = this.calcFPA(this.animationFrames, i, RBframe);
                      if ((this.rollback2 == this.rollback3) || (this.rollback3 == this.rollback4)) {
                          resultFpa = this.rollback1 + this.rollback2 + this.rollback3 + this.rollback4 + this.rollback5;
                      }
                      if (temp1 != resultFpa) {
                          breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - this.SIAS + this.WSMprimaer) / (120 - (i - 100 - this.SIAS + this.WSMprimaer))), this.rollback1 + "/" + this.rollback2 + "/" + this.rollback3 + "/" + this.rollback4 + "/" + this.rollback5];
                          breakpointsAPS[breakpointsAPS.length] = parseInt(2500 / ((this.rollback1 + this.rollback2 + this.rollback3 * 4 + this.rollback4 * 3 + this.rollback5) / 10)) / 100;
                          temp1 = resultFpa;
                      }
                  }
              }
              if (attackSkill.title == 'Fend') {
                  console.info("calc ias for fend");
                  for (let i = Math.max(100 + this.SIAS - this.WSMprimaer, 15); i <= 175; i++) {
                      this.animationFrames = this.aktionsframe[weapPrimary.type][this.charactersSelected];
                      this.rollback1 = this.calcFPA(this.animationFrames, i, start);
                      this.rollback1++;
                      RBframe = Math.floor(Math.floor((256 * start + Math.floor(256 * i / 100) * this.rollback1) / 256) * attackSkill.rollback / 100);
                      this.rollback2 = this.calcFPA(this.animationFrames, i, RBframe);
                      this.rollback2++;
                      this.animationFrames = this.weaponClassFrames[weapPrimary.type][this.charactersSelected][0];
                      RBframe = Math.floor(Math.floor((256 * RBframe + Math.floor(256 * i / 100) * this.rollback2) / 256) * attackSkill.rollback / 100);
                      this.rollback3 = this.calcFPA(this.animationFrames, i, RBframe);
                      resultFpa = this.rollback1 + this.rollback2 + this.rollback3;
                      if (temp1 != resultFpa) {
                          breakpoints[breakpoints.length] = [Math.ceil(120 * (i - 100 - this.SIAS + this.WSMprimaer) / (120 - (i - 100 - this.SIAS + this.WSMprimaer))), this.rollback1 + "/" + this.rollback2 + "/" + this.rollback3];
                          breakpointsAPS[breakpointsAPS.length] = parseInt(2500 / ((this.rollback1 + this.rollback2 + this.rollback3) / 3)) / 100;
                          temp1 = resultFpa;
                      }
                  }
              }
          }
          // wereform table
          if (this.shapeShiftFormsSelected > 0) {
              while (parseInt(OIAS / 5) != parseFloat(OIAS / 5)) {
                  OIAS--;
              }
              // duel wield && standard attack animation)
              if ((this.weaponsSecondarySelected > 0) && (attackSkill.animation == 1)) {
                  alert("There's a problem regarding the standard attack while using two weapons in wereform, so that speed won't be calculated here.");
              } else {
                  this.animationFrames = this.weaponClassFrames[weapPrimary.type][this.charactersSelected][0];
                  if (weapPrimary.type == this.weaponTypes.twoHandedSword) {
                      this.animationFrames = this.weaponClassFrames[2][this.charactersSelected][0];
                  }
                  var AnimSpeed = 256;
                  if (weapPrimary.type == 1) { // assasin claws?
                      AnimSpeed = 208;
                  }
                  var iasRows = 50; // x + 1 rows shown. increased from 24 to show higher ias values
                  for (let i = 0; i <= iasRows; i++) {
                      for (let j = 0; j <= 14; j++) {
                          if (attackSkill.title == 'Feral Rage') {
                              breakpoints[breakpoints.length] = Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + 5 * i - this.WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100)) + Math.ceil((256 * 13 - Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + 5 * i - this.WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100) * Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + 5 * i - this.WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100))) / (2 * Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + 5 * i - this.WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100))) - 1;
                              if ((OIAS > 70) && (j == 0)) {
                                  breakpoints2[breakpoints2.length] = Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + 5 * i - this.WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100)) + Math.ceil((256 * 13 - Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + 5 * i - this.WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100) * Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + 5 * i - this.WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100))) / (2 * Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + 5 * i - this.WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100))) - 1;
                              }
                          }
                          if (attackSkill.title == 'Fury') {
                              temp = (Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + 5 * i - this.WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100)) * 4 + Math.ceil(256 * 13 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + 5 * i - this.WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100)) - 1) / 5;
                              if (parseInt(temp) == parseFloat(temp)) {
                                  temp = temp + ".0";
                              }
                              breakpoints[breakpoints.length] = temp;
                              if ((OIAS > 70) && (j == 0)) {
                                  temp = (Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + 5 * i - this.WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100)) * 4 + Math.ceil(256 * 13 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + 5 * i - this.WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100)) - 1) / 5;
                                  if (parseInt(temp) == parseFloat(temp)) {
                                      temp = temp + ".0";
                                  }
                                  breakpoints2[breakpoints2.length] = temp;
                              }
                          }
                          if ((attackSkill.title != 'Feral Rage') && (attackSkill.title != 'Fury')) {
                              var tempframe = 12;
                              var tempframe2 = 10;
                              // Bear
                              if (this.shapeShiftFormsSelected == 2) {
                                  tempframe = 13;
                                  tempframe2 = 9;
                              }
                              if (attackSkill.animation == 6) {
                                  tempframe = 10;
                              }
                              breakpoints[breakpoints.length] = Math.ceil(256 * tempframe / Math.floor(Math.floor(256 * tempframe2 / Math.floor(256 * this.animationFrames / Math.floor((100 + 5 * i - this.WSMprimaer) * AnimSpeed / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (5 * i + 5 * j) / (120 + (5 * i + 5 * j))), 15), 175) / 100)) - 1;
                              if ((OIAS > 70) && (j == 0)) {
                                  breakpoints2[breakpoints2.length] = Math.ceil(256 * tempframe / Math.floor(Math.floor(256 * tempframe2 / Math.floor(256 * this.animationFrames / Math.floor((100 + 5 * i - this.WSMprimaer) * AnimSpeed / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (5 * i + parseInt(OIAS)) / (120 + (5 * i + parseInt(OIAS)))), 15), 175) / 100)) - 1;
                              }
                          }
                      }
                  }
                  // add current ias breakpoints if not a multiple of 5
                  for (let k = 0; k <= 14; k++) {
                      if ((parseInt(WIAS / 5) != parseFloat(WIAS / 5)) && (this.skillsSelected == 26)) {
                          nonStandardWeapon.push(Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + parseInt(WIAS) - this.WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 15), 175) / 100)) + Math.ceil((256 * 13 - Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + parseInt(WIAS) - this.WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 15), 175) / 100) * Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + parseInt(WIAS) - this.WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 15), 175) / 100))) / (2 * Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + parseInt(WIAS) - this.WSMprimaer) * 256 / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 15), 175) / 100))) - 1);
                      }
                      if ((parseInt(WIAS / 5) != parseFloat(WIAS / 5)) && (this.skillsSelected == 29)) {
                          temp = (Math.ceil(256 * 7 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + parseInt(WIAS) - this.WSMprimaer) * 256 / 100))) * Math.min(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 175) / 100)) * 4 + Math.ceil(256 * 13 / Math.floor(Math.floor(256 * 9 / Math.floor(256 * this.animationFrames / Math.floor((100 + parseInt(WIAS) - this.WSMprimaer) * 256 / 100))) * Math.min(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 175) / 100)) - 1) / 5;
                          if (parseInt(temp) == parseFloat(temp)) {
                              temp = temp + ".0";
                          }
                          nonStandardWeapon.push(temp);
                      }
                      if ((parseInt(WIAS / 5) != parseFloat(WIAS / 5)) && (this.skillsSelected != 26) && (this.skillsSelected != 29)) {
                          nonStandardWeapon.push(Math.ceil(256 * tempframe / Math.floor(Math.floor(256 * tempframe2 / Math.floor(256 * this.animationFrames / Math.floor((100 + parseInt(WIAS) - this.WSMprimaer) * AnimSpeed / 100))) * Math.min(Math.max(100 - this.WSMprimaer + this.SIAS + Math.floor(120 * (parseInt(WIAS) + 5 * k) / (120 + (parseInt(WIAS) + 5 * k))), 15), 175) / 100)) - 1)
                      }
                  }
              }
          }
          this.isAtFpaCap = true;
          return {
              breakpoints: breakpoints,
              breakpoints1: breakpoints1,
              nonStandardOffWeapon: breakpoints2,     // ias above the default max 70 shown for shifted
              breakpointsAPS: breakpointsAPS,
              nonStandardWeapon: nonStandardWeapon,   // ias not a multiple of 5
              oIas: OIAS,
          }
      }
    },
    watch: {
        shapeShiftForms: function (newVal) {
            this.shapeShiftFormsSelected = this.sanitiseSelected(this.shapeShiftFormsSelected, newVal);
            this.updateCurrent();
        },
        weaponsPrimary: function (newVal) {
            this.weaponsPrimarySelected = this.sanitiseSelected(this.weaponsPrimarySelected, newVal);
            this.updateCurrent();
        },
        weaponsSecondary: function (newVal) {
            this.weaponsSecondarySelected = this.sanitiseSelected(this.weaponsSecondarySelected, newVal);
            this.updateCurrent();
        },
        skills: function (newVal) {
            this.skillsSelected = this.sanitiseSelected(this.skillsSelected, newVal);
            this.updateCurrent();
        },
    },
    created: function() {
        if (this.$route.query.c) this.doAddQueryString = true; // default to on when loading a url with query params
        // sets default selected values bassed on query or default props
        this.charactersSelected = parseInt(this.c, 10);
        this.shapeShiftFormsSelected = parseInt(this.ss, 10);
        this.skillsSelected = parseInt(this.s, 10);
        this.iasOffWeapon = parseInt(this.io, 10);
        this.weaponsPrimarySelected = parseInt(this.w1, 10);
        this.iasWeaponPrimary = parseInt(this.i1, 10);
        this.weaponsSecondarySelected = parseInt(this.w2, 10);
        this.iasWeaponSecondary = parseInt(this.i2, 10);
        this.weaponsPrimaryBarbHandednessSelected = parseInt(this.bh, 10);
        this.isWsmBug = this.bug == '1';
        this.fanaticismSkillIas = parseInt(this.fana, 10);
        this.frenzySkillIas = parseInt(this.frenz, 10);
        this.werewolfSkillIas = parseInt(this.wolf, 10);
        this.burstOfSpeedSkillIas = parseInt(this.bos, 10);
        this.holyFreezeSkillIas = parseInt(this.freeze, 10);
        this.isDecrepify = this.decrep == '1';
        this.updateCurrent();
    },
    updated: function() {
        if (this.doAddQueryString) this.$router.push({ query: this.query }).catch(error => {}); // catch suppresses redundant navigation error in console
    },
    metaInfo: {
        meta: [
            {
                property: 'og:site_name',
                content: 'Path of Diablo Attack Speed Calculator',
                vmid: 'og:site_name'
            },
            {
                property: 'og:title',
                content: 'Breakpoints Table',
                vmid: 'og:title'
            },
            {
                property: 'og:description',
                content: 'Calculate attack speeds for the Diablo 2 mod Path of Diablo',
                vmid: 'og:description'
            },
        ]
    }
};
</script>
