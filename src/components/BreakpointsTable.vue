<template>
  <div>
    <v-simple-table
      v-if="standardisedBreakpoints.rows[0].frames.length === 1"
      dense
      class="breakpoint-table"
    >
      <template #default>
        <thead>
          <tr>
            <th>{{ standardisedBreakpoints.meta.verticalLabel }}</th>
            <th :colspan="standardisedBreakpoints.rows[0].frames.length">
              {{ standardisedBreakpoints.meta.horizontalLabel }}
            </th>
            <th>attacks per second</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(breakpoint, index) in standardisedBreakpoints.rows"
            :key="index"
            :class="breakpoint.current ? 'highlight-current-row' : ''"
          >
            <th>{{ breakpoint.ias }}</th>
            <td
              v-for="(frame, frameIndex) in breakpoint.frames"
              :key="frameIndex"
            >
              {{ frame }}
            </td>
            <td>{{ breakpoint.aps }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-simple-table
      v-else
      dense
      class="breakpoint-table"
    >
      <template #default>
        <colgroup>
          <col span="2">
          <col
            v-for="columnHeader in standardisedBreakpoints.meta.columnHeaders"
            :key="columnHeader"
            :class="columnHeader == standardisedBreakpoints.meta.columnCurrent ? 'highlight-current-col' : ''"
          >
        </colgroup>
        <thead>
          <tr>
            <th
              :colspan="standardisedBreakpoints.rows[0].frames.length + 2"
              class="horizontal-label"
            >
              {{ standardisedBreakpoints.meta.horizontalLabel }}
            </th>
          </tr>
          <tr>
            <th class="border-off" />
            <th />
            <th
              v-for="columnHeader in standardisedBreakpoints.meta.columnHeaders"
              :key="columnHeader"
            >
              {{ columnHeader }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(breakpoint, index) in standardisedBreakpoints.rows"
            :key="index"
            :class="breakpoint.current ? 'highlight-current-row' : ''"
          >
            <th
              v-if="standardisedBreakpoints.rows[0].frames.length > 1 && index === 0"
              :rowspan="standardisedBreakpoints.rows.length + 1"
              class="vertical-label border-off"
            >
              <div class="vertical-label-spacer" />
              <div class="vertical-label-text">
                {{ standardisedBreakpoints.meta.verticalLabel }}
              </div>
            </th>
            <th>{{ breakpoint.ias }}</th>
            <td
              v-for="(frame, frameIndex) in breakpoint.frames"
              :key="frameIndex"
              scope="col"
            >
              {{ frame }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: 'BreakpointsTable',
  props: {
    characters: { default: () => [], type: Array },
    charactersSelected: { default: 0, type: Number },
    shapeShiftForms: { default: () => [], type: Array },
    shapeShiftFormsSelected: { default: 0, type: Number },
    weaponInfoPrimary: { default: () => {}, type: Object },
    weaponInfoSecondary: { default: () => {}, type: Object },
    skills: { default: () => [], type: Array },
    skillsSelected: { default: 0, type: Number },
    iasOffWeapon: { default: 0, type: Number },
    weaponsPrimarySelected: { default: 0, type: Number },
    weaponsSecondarySelected: { default: 0, type: Number },
    iasWeaponPrimary: { default: 0, type: Number },
    iasWeaponSecondary: { default: 0, type: Number },
    fanaticismSkillIas: { default: 0, type: Number },
    frenzySkillIas: { default: 0, type: Number },
    werewolfSkillIas: { default: 0, type: Number },
    burstOfSpeedSkillIas: { default: 0, type: Number },
    standardisedBreakpoints: { default: () => {}, type: Object },
    currentFpa: { default: '0', type: String },
    currentAps: { default: '0', type: String },
    attackSkill: { default: () => {}, type: Object }
  }
}
</script>

<style>
  .breakpoint-table.v-data-table > .v-data-table__wrapper > table {
      width: auto;
      text-align: right;
  }
  .breakpoint-table .vertical-label {
      vertical-align: top;
  }
  .breakpoint-table tr:hover .vertical-label, .breakpoint-table tr .vertical-label {
      background-color: #1E1E1E;
  }
  .breakpoint-table div.vertical-label-spacer {
      max-height: 150px;
      height: 20%;
  }
  .breakpoint-table div.vertical-label-text  {
      writing-mode: vertical-lr;
      transform: rotate(180deg);
      color: rgba(255, 255, 255, 0.7);
      font-size: .75rem;
      user-select: none;
      height: max-content;
  }
  .breakpoint-table.v-data-table > .v-data-table__wrapper > table > thead > tr > th.horizontal-label {
      text-align: center;
  }
  .border-off {
      border-bottom: 0 !important;
  }
  .breakpoint-table tr.highlight-current-row {
      background-color: rgba(76, 175, 79, 0.3);
  }
  .breakpoint-table col.highlight-current-col {
      background-color: rgba(76, 175, 79, 0.1);
  }
  .breakpoint-table.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: rgba(33, 149, 243, 0.6);
  }
</style>
