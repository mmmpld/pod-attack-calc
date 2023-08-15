import { expect } from 'vitest'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import router from '@/plugins/router'
import App from '@/App.vue'
import Main from '@/components/Main.vue'
import { mount, createLocalVue } from '@vue/test-utils'
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(VueRouter)
const vuetify = new Vuetify()

const wrapper = mount(App, {
  localVue,
  vuetify,
  router
})

const defaultOptions = {
  charactersSelected: 0,
  shapeShiftFormsSelected: 0,
  skillsSelected: 0,
  iasOffWeapon: 0,
  weaponsPrimarySelected: 0,
  iasWeaponPrimary: 0,
  weaponsSecondarySelected: 0,
  iasWeaponSecondary: 0,
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
  // test
  const mainComponent = wrapper.findComponent(Main)
  await mainComponent.setData(setDataOptions)
  await mainComponent.vm.updateCurrent() // trigger the method to set the current fpa/aps values
  expect(wrapper.find('#currentFpa').text()).toBe(fpa + ' frames per attack')
  expect(wrapper.find('#currentAps').text()).toBe(aps + ' attacks per second')
  expect(wrapper.find('.breakpoint-table tbody').html()).toMatchSnapshot()
}

export default expectBreakpointsTableMatches
