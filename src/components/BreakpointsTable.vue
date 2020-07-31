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
    <v-simple-table v-if="shapeShiftFormsSelected" dense class="breakpoint-table">
      <template v-slot:default>
        <thead>
          <tr>
            <th
              colspan="17 + (breakpoints.oIas > 70 ? 1 : 0)"
              class="horizontal-label"
            >Off-Weapon IAS</th>
          </tr>
          <tr>
            <th class="border-off"></th>
            <th></th>
            <th v-for="i in 15" :key="i">{{5 * (i-1)}}</th>
            <th v-if="breakpoints.oIas > 70">{{breakpoints.oIas}}</th>
          </tr>
        </thead>
        <tbody>
          <th :rowspan="iasRows + 2 + (iasWeaponPrimary % 5 != 0 ? 1 : 0)">
            <span class="vertical-label">Primary Weapon IAS</span>
          </th>
          <tr
            v-for="j in iasRows + 1"
            :class="5 * (j-1) == iasWeaponPrimary ? 'highlight-current' : ''"
            :key="j"
          >
            <th>{{5 * (j-1)}}</th>
            <template
              v-for="(breakpoint, index) in breakpoints.breakpoints.slice((j-1)*15,((j-1)*15)+15)"
            >
              <td :key="index">{{breakpoint}}</td>
            </template>
            <td v-if="breakpoints.oIas > 70">{{breakpoints.nonStandardOffWeapon[j-1]}}</td>
          </tr>
          <tr v-if="iasWeaponPrimary % 5 != 0" class="highlight-current">
            <th>{{iasWeaponPrimary}}</th>
            <td v-for="(breakpoint, index) in breakpoints.nonStandardWeapon" :key="index">{{breakpoint}}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-simple-table v-else dense class="breakpoint-table">
      <template v-slot:default>
        <thead>
          <tr>
            <th>IAS</th>
            <th>attack speed [frames]</th>
            <th>attacks per second</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="attackSkill.rollback == 100 && attackSkill.title !== 'Frenzy (first swing hits)'">
            <tr
              v-for="(breakpoint, index) in breakpoints.breakpoints"
              :class="breakpoint[1] + ' frames per attack' == currentFpa ? 'highlight-current' : ''"
              :key="index"
            >
              <td>{{ breakpoint[0] }}</td>
              <td>{{ breakpoint[1] }}</td>
              <td>{{ parseInt(2500 / (aidel + breakpoint[1])) / 100 }}</td>
            </tr>
          </template>
          <template v-else>
            <tr
              v-for="(breakpoint, index) in breakpoints.breakpoints"
              :class="breakpoint[1] + ' frames per attack' == currentFpa ? 'highlight-current' : ''"
              :key="index"
            >
              <td>{{ breakpoint[0] }}</td>
              <td>{{ breakpoint[1] }}</td>
              <td>{{ breakpoints.breakpointsAPS[index] }}</td>
            </tr>
          </template>
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
    "breakpoints",
    "currentFpa",
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
