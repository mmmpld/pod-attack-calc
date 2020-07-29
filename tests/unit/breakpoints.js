import Vue from 'vue';
import Vuetify from 'vuetify';
import App from '@/App';
import { mount, createLocalVue } from '@vue/test-utils';
Vue.use(Vuetify);
const localVue = createLocalVue();

async function expectBreakpointsTableMatches(fpa, aps, setDataOptions, ) {
    let vuetify = new Vuetify();
    const wrapper = mount(App, {
        localVue,
        vuetify,
    });

    await wrapper.setData(setDataOptions);
    await wrapper.vm.updateCurrent();
    expect(wrapper.find('#currentFpa').text()).toBe(fpa + ' frames per attack');
    expect(wrapper.find('#currentAps').text()).toBe(aps + ' attacks per second');
    expect(wrapper.find('.breakpoint-table tbody')).toMatchSnapshot();
}

export default expectBreakpointsTableMatches;
