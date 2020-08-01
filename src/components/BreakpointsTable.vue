<template>
  <div>
    <!-- <table align="center" border="0" cellpadding="0" cellspacing="5">
            <tr><td class="title" colspan="2" align="center"><b>Data:</b></td></tr>
            <tr><td width="130">Character:</td><td>{{ characters[charactersSelected].text }}</td></tr>
            <tr v-if="shapeShiftFormsSelected > 0"><td>Wereform:</td><td>{{ shapeShiftForms[shapeShiftFormsSelected].text }}</td></tr>
            <tr><td>Primary Weapon:</td><td>{{ weaponInfoPrimary.text }}</td></tr>
            <tr v-if="weaponsSecondarySelected > 0"><td>Secondary Weapon:</td><td>{{ weaponInfoSecondary.text }}</td></tr>
            <tr><td>Skill:</td><td>{{ skills.find(s => s.value == skillsSelected).text }}</td></tr>
            <tr><td>Off-Weapon IAS:</td><td>{{ iasOffWeapon }}</td></tr>
            <tr v-if="weaponsPrimarySelected > 0 && weaponsSecondarySelected == 0"><td>Weapon-IAS:</td><td>{{ iasWeaponPrimary }}</td></tr>
            <tr v-if="weaponsPrimarySelected > 0 && weaponsSecondarySelected > 0"><td>Weapon-IAS:</td><td>{{ iasWeaponPrimary }} / {{ iasWeaponSecondary }}</td></tr>
            <tr v-if="fanaticismSkillIas > 0"><td>Fanaticism IAS:</td><td>{{ fanaticismSkillIas }}</td></tr>
            <tr v-if="frenzySkillIas > 0"><td>Frenzy IAS:</td><td>{{ frenzySkillIas }}</td></tr>
            <tr v-if="shapeShiftFormsSelected == 2 && werewolfSkillIas > 0"><td>Werewolf IAS:</td><td> {{ werewolfSkillIas }}</td></tr>
            <tr v-if="burstOfSpeedSkillIas > 0"><td>Burst of Speed IAS:</td><td>{{ burstOfSpeedSkillIas }}</td></tr>
    </table>-->
    <!-- <p align="center">Your primary weapon&rsquo;s WIAS is plotted vertically, your equipment&rsquo;s IAS is plotted horizontally.</p> -->
    <v-simple-table dense class="breakpoint-table">
      <template v-slot:default>
        <thead v-if="shapeShiftFormsSelected !== 0">
          <tr>
            <th
              :colspan="standardisedBreakpoints[0].frames.length + 2"
              class="horizontal-label"
            >Off-Weapon IAS</th>
          </tr>
          <tr>
            <th class="border-off"></th>
            <th></th>
            <th v-for="i in 15" :key="i">{{5 * (i-1)}}</th>
            <th v-if="iasOffWeapon > 70">{{iasOffWeapon}}</th>
          </tr>
        </thead>
        <thead v-else>
          <tr>
            <th>IAS</th>
            <th :colspan="standardisedBreakpoints[0].frames.length">attack speed [frames]</th>
            <th>attacks per second</th>
          </tr>
        </thead>
        <tbody v-if="shapeShiftFormsSelected !== 0">
          <th :rowspan="standardisedBreakpoints.length + 1">
            <span class="vertical-label">Primary Weapon IAS</span>
          </th>
          <tr
            v-for="(breakpoint, index) in standardisedBreakpoints"
            :key="index"
            :class="breakpoint.current ? 'highlight-current' : ''"
          >
            <th>{{ breakpoint.ias }}</th>
            <td v-for="(frame, index) in breakpoint.frames" :key="index">{{ frame }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr
            v-for="(breakpoint, index) in standardisedBreakpoints"
            :key="index"
            :class="breakpoint.current ? 'highlight-current' : ''"
          >
            <td>{{ breakpoint.ias }}</td>
            <td v-for="(frame, index) in breakpoint.frames" :key="index">{{ frame }}</td>
            <td>{{ breakpoint.aps }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: "BreakpointsTable",
  props: [
    "characters",
    "charactersSelected",
    "shapeShiftForms",
    "shapeShiftFormsSelected",
    "weaponInfoPrimary",
    "weaponInfoSecondary",
    "skills",
    "skillsSelected",
    "iasOffWeapon",
    "weaponsPrimarySelected",
    "weaponsSecondarySelected",
    "iasWeaponPrimary",
    "iasWeaponSecondary",
    "fanaticismSkillIas",
    "frenzySkillIas",
    "werewolfSkillIas",
    "burstOfSpeedSkillIas",
    "standardisedBreakpoints",
    "currentFpa",
    "currentAps",
    "attackSkill",
  ],
  data: function () {
    return {
      iasRows: 50,
    };
  },
  computed: {
    aidel: function () {
      var aidel = 0;
      if (this.charactersSelected > 6) {
        aidel = 2;
      }
      if (
        (this.charactersSelected == 8 && this.skillsSelected == 3) ||
        (this.charactersSelected == 9 && this.skillsSelected == 0)
      ) {
        aidel = 1;
      }
      return aidel;
    },
  },
};
</script>
