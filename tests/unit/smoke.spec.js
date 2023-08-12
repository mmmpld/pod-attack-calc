import { describe, it, expect } from 'vitest';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import router from "@/router"
import App from '@/App.vue';
// import Main from '@/components/Main.vue'
import { mount, createLocalVue } from '@vue/test-utils';
Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(VueRouter);
let vuetify = new Vuetify();
const wrapper = mount(App, {
    localVue,
    vuetify,
    router
});

describe('should set [data-app] attribute on outer most div', () => {
    it('data-attribute set', async () => {
        expect(wrapper.attributes('data-app')).toStrictEqual("true");
    })

    it('main should have character and breakpoints header text', async () => {
        let h2 = wrapper.findAll("h2");
        expect(h2.at(0).text()).toStrictEqual("Character");
        expect(h2.at(1).text()).toStrictEqual("Breakpoints");
    })
})
