const characterId = 1;
const standardFpa = '10.5 frames per attack';
const standardAps = '2.38 attacks per second';
const standardTableBody = `<tbody><tr class="highlight-current"><td>0</td><td>10.5</td><td>2.38</td></tr><tr class=""><td>11</td><td>10</td><td>2.5</td></tr><tr class=""><td>13</td><td>9.5</td><td>2.63</td></tr><tr class=""><td>26</td><td>9</td><td>2.77</td></tr><tr class=""><td>29</td><td>8.5</td><td>2.94</td></tr><tr class=""><td>48</td><td>8</td><td>3.12</td></tr><tr class=""><td>56</td><td>7.5</td><td>3.33</td></tr><tr class=""><td>86</td><td>7</td><td>3.57</td></tr><tr class=""><td>113</td><td>6.5</td><td>3.84</td></tr><tr class=""><td>180</td><td>6</td><td>4.16</td></tr></tbody>`;

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

describe('Assasin default values', () => {
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