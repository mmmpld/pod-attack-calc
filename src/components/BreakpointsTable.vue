<style>
    .breakpoint-table.v-data-table > .v-data-table__wrapper > table {
        width: auto;
        text-align: right;
    }
    .breakpoint-table .vertical-label {
        vertical-align: top;
        padding-top: 150px;
    }
    .breakpoint-table .vertical-label span {
        writing-mode: vertical-lr;
        transform: rotate(180deg);
        color: rgba(0,0,0,.6);
        font-size: .75rem;
        user-select: none;
    }
    .breakpoint-table.v-data-table > .v-data-table__wrapper > table > thead > tr > th.horizontal-label {
        text-align: center;
    }
    .breakpoint-table.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th.border-off {
        border-bottom: 0;
    }
    .breakpoint-table tr.highlight-current-row {
        background-color: #F9FBE7;
        border-color: aqua !important;
        border-width: 10px !important;
    }
    .breakpoint-table col.highlight-current-col {
        background-color: #F9F9F9;
    }
</style>

<template>
    <div>
        <v-simple-table
            v-if="standardisedBreakpoints.rows[0].frames.length === 1"
            dense 
            class="breakpoint-table"
        >
            <template v-slot:default>
                <thead>
                    <tr>
                        <th>{{standardisedBreakpoints.meta.verticalLabel}}</th>
                        <th :colspan="standardisedBreakpoints.rows[0].frames.length">{{standardisedBreakpoints.meta.horizontalLabel}}</th>
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
                        <td v-for="(frame, index) in breakpoint.frames" :key="index">{{ frame }}</td>
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
            <template v-slot:default>
                <colgroup>
                    <col span="2" />
                    <col v-for="columnHeader in standardisedBreakpoints.meta.columnHeaders"
                        :key="columnHeader"
                        :class="columnHeader == standardisedBreakpoints.meta.columnCurrent ? 'highlight-current-col' : ''" 
                    />
                </colgroup>
                <thead>
                    <tr>
                        <th
                            :colspan="standardisedBreakpoints.rows[0].frames.length + 2"
                            class="horizontal-label"
                        >{{standardisedBreakpoints.meta.horizontalLabel}}</th>
                    </tr>
                    <tr>
                        <th class="border-off"></th>
                        <th></th>
                        <th v-for="columnHeader in standardisedBreakpoints.meta.columnHeaders" 
                            :key="columnHeader"
                        >
                            {{columnHeader}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <th
                        v-if="standardisedBreakpoints.rows[0].frames.length > 1"
                        :rowspan="standardisedBreakpoints.rows.length + 1"
                        class="vertical-label"
                    >
                        <span>{{standardisedBreakpoints.meta.verticalLabel}}</span>
                    </th>
                    <tr
                        v-for="(breakpoint, index) in standardisedBreakpoints.rows"
                        :key="index"
                        :class="breakpoint.current ? 'highlight-current-row' : ''"
                    >
                        <th>{{ breakpoint.ias }}</th>
                        <td v-for="(frame, index) in breakpoint.frames" :key="index" scope="col">{{ frame }}</td>
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
};
</script>
