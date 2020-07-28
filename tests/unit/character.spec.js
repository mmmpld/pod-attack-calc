// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Components
import App from '@/App'

// Utilities
import {
  mount,
  createLocalVue
} from '@vue/test-utils'
Vue.use(Vuetify)

const localVue = createLocalVue()

describe('Character default values', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('assassin default fpa', async () => {
    const wrapper = mount(App, {
      localVue,
      vuetify,
    })

    await wrapper.setData({ charactersSelected: 1 });
    expect(wrapper.vm.charactersSelected).toBe(1);
    await wrapper.vm.updateCurrent();
    expect(wrapper.find('#currentFpa').text()).toBe('10.5 frames per attack')
  })
})