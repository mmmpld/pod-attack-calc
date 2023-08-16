import { expect } from 'vitest'
import vuetify from '@/plugins/vuetify'
import router from '@/plugins/router'
import App from '@/App.vue'
import Main from '@/components/Main.vue'
import { mount } from '@vue/test-utils'

const wrapper = mount(App, {
  global: {
    plugins: [
      vuetify,
      router
    ]
  }
})

const defaultOptions = {
  charactersSelected: 0,
  shapeShiftFormsSelected: 0,
  skillsSelected: 0,
  iasOffWeaponRaw: 0,
  weaponsPrimarySelectedRaw: 0,
  iasWeaponPrimaryRaw: 0,
  weaponsSecondarySelectedRaw: 0,
  iasWeaponSecondaryRaw: 0,
  weaponsPrimaryBarbHandednessSelected: 0,
  isWsmBug: false,
  fanaticismSkillIas: 0,
  frenzySkillIas: 0,
  werewolfSkillIas: 0,
  burstOfSpeedSkillIas: 0,
  holyFreezeSkillIas: 0,
  isDecrepify: false,
  isDebug: false
}

async function expectBreakpointsTableMatches (fpa, aps, setDataOptions) {
  // reset missing data options
  setDataOptions = Object.assign({}, defaultOptions, setDataOptions)
  // update component data
  const mainComponent = wrapper.findComponent(Main)
  await mainComponent.setData(setDataOptions)
  await mainComponent.vm.updateCurrent() // trigger the method to set the current fpa/aps values
  // test
  expect(wrapper.find('#currentFpa').text()).toBe(fpa + ' frames per attack')
  expect(wrapper.find('#currentAps').text()).toBe(aps + ' attacks per second')
  expect(wrapper.find('.breakpoint-table tbody').html()).toMatchSnapshot()
}

export default expectBreakpointsTableMatches
