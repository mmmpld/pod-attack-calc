const characterId = 5;
const standardFpa = '13 frames per attack';
const standardAps = '1.92 attacks per second';
const standardTableBody = `<tbody><tr class="highlight-current"><td>0</td><td>13</td><td>1.92</td></tr><tr class=""><td>9</td><td>12</td><td>2.08</td></tr><tr class=""><td>20</td><td>11</td><td>2.27</td></tr><tr class=""><td>37</td><td>10</td><td>2.5</td></tr><tr class=""><td>63</td><td>9</td><td>2.77</td></tr><tr class=""><td>105</td><td>8</td><td>3.12</td></tr><tr class=""><td>200</td><td>7</td><td>3.57</td></tr></tbody>`;

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
function singleLinehtml(htmlString) {
    // remove newline / carriage return
    let compactHtmlString = htmlString.replace(/\n/g, "");
    // remove whitespace (space and tabs) before tags
    compactHtmlString = compactHtmlString.replace(/[\t ]+\</g, "<");
    // remove whitespace between tags
    compactHtmlString = compactHtmlString.replace(/\>[\t ]+\</g, "><");
    // remove whitespace after tags
    compactHtmlString = compactHtmlString.replace(/\>[\t ]+$/g, ">");
    return compactHtmlString;
}

describe('Paladin default values', () => {
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('standard attack', async () => {
        const wrapper = mount(App, {
            localVue,
            vuetify,
        })

        await wrapper.setData({ charactersSelected: characterId });
        await wrapper.vm.updateCurrent();
        expect(wrapper.find('#currentFpa').text()).toBe(standardFpa);
        expect(wrapper.find('#currentAps').text()).toBe(standardAps);
        expect(singleLinehtml(wrapper.find('.breakpoint-table tbody').html())).toBe(standardTableBody);
    })
})