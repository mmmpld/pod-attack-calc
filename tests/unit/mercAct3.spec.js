const characterId = 10;
const standardFpa = '14 frames per attack';
const standardAps = '1.56 attacks per second';
const standardTableBody = `<tbody><tr class="highlight-current"><td>0</td><td>14</td><td>1.56</td></tr><tr class=""><td>9</td><td>13</td><td>1.66</td></tr><tr class=""><td>19</td><td>12</td><td>1.78</td></tr><tr class=""><td>32</td><td>11</td><td>1.92</td></tr><tr class=""><td>54</td><td>10</td><td>2.08</td></tr><tr class=""><td>86</td><td>9</td><td>2.27</td></tr><tr class=""><td>152</td><td>8</td><td>2.5</td></tr></tbody>`;

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

describe('Merc Act3 default values', () => {
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('vengeance attack', async () => {
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