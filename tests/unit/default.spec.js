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

describe('App.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('should have normal breakpoints on load', () => {
    const wrapper = mount(App, {
      localVue,
      vuetify,
    })

    const title = wrapper.find('h1')
    expect(title.text()).toBe('Path of Diablo Attack Speed Calculator')

    const currentFpa = wrapper.find('#currentFpa')
    expect(currentFpa.text()).toBe('11 frames per attack')

    const breakpointsComponent = wrapper.findComponent({ name: 'BreakpointsTable' })
    expect(breakpointsComponent.exists()).toBe(true)

    const attackFrames = wrapper.find('.breakpoint-table tbody').findAll('td');
    console.log(attackFrames);
    const attackFrame0 = attackFrames.at(1);
    expect(attackFrame0.text()).toBe('11')

    const amazonTableBody = `<tbody>
  <tr class="highlight-current">
    <td>0</td>
    <td>11</td>
    <td>2.27</td>
  </tr>
  <tr class="">
    <td>11</td>
    <td>10</td>
    <td>2.5</td>
  </tr>
  <tr class="">
    <td>26</td>
    <td>9</td>
    <td>2.77</td>
  </tr>
  <tr class="">
    <td>48</td>
    <td>8</td>
    <td>3.12</td>
  </tr>
  <tr class="">
    <td>86</td>
    <td>7</td>
    <td>3.57</td>
  </tr>
  <tr class="">
    <td>180</td>
    <td>6</td>
    <td>4.16</td>
  </tr>
</tbody>`;
    expect(wrapper.find('.breakpoint-table tbody').html()).toBe(amazonTableBody);

    expect(wrapper.vm.currentFpa).toBe('11 frames per attack');
    expect(wrapper.vm.currentAps).toBe("2.27 attacks per second");
  })
})
