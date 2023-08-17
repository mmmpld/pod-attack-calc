<template>
  <v-autocomplete
    v-model="weaponSelected"
    :name="name"
    :items="items"
    item-title="text"
    :custom-filter="weaponFilter"
    :label="label"
    density="compact"
    persistent-hint
    :hint="hint"
    class="my-3"
    @update:model-value="updateCurrent"
  >
    <template #item="{ props, item }">
      <v-list-item
        v-bind="props"
        :title="item?.raw?.text"
      >
        <v-list-item-subtitle
          v-for="(commonItem, index) in item?.raw?.commonItems"
          :key="index"
          :class="getQualityColorClass(commonItem.quality)"
        >
          {{ commonItem.title }}
        </v-list-item-subtitle>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script>
import { qualities, lookupWeapon, weaponClassFrames, findInternalWeaponByName } from '@/assets/calc'

export default {
  props: {
    modelValue: { default: 0, type: Number },
    name: { default: 'weapon-select', type: String },
    items: { default: () => {}, type: Object },
    label: { default: 'Weapon', type: String }
  },
  emits: ['update:model-value'],
  data: () => ({
    qualities: qualities
  }),
  computed: {
    weaponSelected: {
      get () {
        return this.modelValue
      },
      set (newValue) {
        this.$emit('update:model-value', newValue)
      }
    },
    hint () {
      const weaponInfo = this.weaponInfo(this.weaponSelected)
      const socketOrSockets = weaponInfo.sockets === 1 ? 'socket' : 'sockets'
      return `${weaponInfo.wsm} wsm ${weaponInfo.description}, ${weaponInfo.sockets} ${socketOrSockets}`
    }
  },
  methods: {
    getQualityColorClass: function (quality) {
      switch (quality) {
        case this.qualities.magic:
          return 'quality-magic'
        case this.qualities.rare:
          return 'quality-rare'
        case this.qualities.set:
          return 'quality-set'
        case this.qualities.unique:
          return 'quality-unique'
        case this.qualities.crafted:
          return 'quality-crafted'
        case this.qualities.runeword:
          return 'quality-runeword'
        default:
          return 'quality-normal'
      }
    },
    updateCurrent (newValue) {
      this.$emit('update:model-value', newValue)
    },
    weaponFilter: function (item, queryText, itemText) {
      if (item.toLowerCase().indexOf(queryText.toLowerCase()) > -1) return true // search in option text
      if (item.commonItems) { // search in common items
        for (let i = 0; i < item.commonItems.length; i++) {
          if (item.commonItems[i].title.toLowerCase().indexOf(queryText.toLowerCase()) > -1) return true
          if (item.commonItems[i].title.toLowerCase().replace(/\W/g, '').indexOf(queryText.toLowerCase()) > -1) return true // with non-alphanumeric characters removed
        }
      }
      return false
    },
    weaponInfo: function (weaponSelected) {
      const weapon = lookupWeapon[weaponSelected]
      const internalWeaponData = findInternalWeaponByName(weapon.name)
      const wsm = internalWeaponData?.speed ?? 0
      const sockets = internalWeaponData?.gemsockets ?? 0
      if (weapon != null) {
        return {
          description: weaponClassFrames[weapon.type][11],
          wsm,
          value: weaponSelected,
          text: weapon.text,
          sockets
        }
      }
      return {
        description: '',
        wsm: 0,
        value: 0,
        text: ''
      }
    }
  }
}
</script>
