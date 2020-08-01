import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import router from "@/router"
import App from '@/App';
import Main from '@/components/Main.vue'
import { mount, createLocalVue } from '@vue/test-utils';
Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(VueRouter);
let vuetify = new Vuetify();

async function expectBreakpointsTableMatches(fpa, aps, setDataOptions, ) {
    const wrapper = mount(App, {
        localVue,
        vuetify,
        router
    });
    let mainComponent = wrapper.findComponent(Main);
    await mainComponent.setData(setDataOptions);
    await mainComponent.vm.updateCurrent(); // trigger the method to set the current fpa/aps values
    expect(wrapper.find('#currentFpa').text()).toBe(fpa + ' frames per attack');
    expect(wrapper.find('#currentAps').text()).toBe(aps + ' attacks per second');
    expect(wrapper.find('.breakpoint-table tbody')).toMatchSnapshot();
}

export default expectBreakpointsTableMatches;
