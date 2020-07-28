const characterId = 0;
const standardFpa = '11 frames per attack';
const standardAps = '2.27 attacks per second';
const standardTableBody = `<tbody><tr class="highlight-current"><td>0</td><td>11</td><td>2.27</td></tr><tr class=""><td>11</td><td>10</td><td>2.5</td></tr><tr class=""><td>26</td><td>9</td><td>2.77</td></tr><tr class=""><td>48</td><td>8</td><td>3.12</td></tr><tr class=""><td>86</td><td>7</td><td>3.57</td></tr><tr class=""><td>180</td><td>6</td><td>4.16</td></tr></tbody>`;

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

describe('Amazon default values', () => {
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

    it('strafe', async () => {
        const wrapper = mount(App, {
            localVue,
            vuetify,
        })

        await wrapper.setData({ charactersSelected: characterId, skillsSelected: 4, weaponsPrimarySelected: 118});
        await wrapper.vm.updateCurrent();
        expect(wrapper.find('#currentFpa').text()).toBe('7/4/4/4/12 frames per attack');
        expect(wrapper.find('#currentAps').text()).toBe('4.9 attacks per second');
        expect(singleLinehtml(wrapper.find('.breakpoint-table tbody').html())).toBe('<tbody><tr class="highlight-current"><td>0</td><td>7/4/4/4/12</td><td>4.9</td></tr><tr class=""><td>3</td><td>7/4/4/4/11</td><td>5</td></tr><tr class=""><td>11</td><td>6/3/3/3/10</td><td>6.25</td></tr><tr class=""><td>26</td><td>6/3/3/3/9</td><td>6.41</td></tr><tr class=""><td>42</td><td>5/3/3/3/9</td><td>6.57</td></tr><tr class=""><td>46</td><td>5/3/3/3/8</td><td>6.75</td></tr><tr class=""><td>80</td><td>5/3/3/3/7</td><td>6.94</td></tr></tbody>');
    })

    it('multishot', async () => {
        const wrapper = mount(App, {
            localVue,
            vuetify,
        })

        await wrapper.setData({ charactersSelected: characterId, skillsSelected: 0, weaponsPrimarySelected: 118, fanaticismSkillIAS: 32 });
        await wrapper.vm.updateCurrent();
        expect(wrapper.find('#currentFpa').text()).toBe('11 frames per attack');
        expect(wrapper.find('#currentAps').text()).toBe('2.27 attacks per second');
        expect(singleLinehtml(wrapper.find('.breakpoint-table tbody').html())).toBe('<tbody><tr class="highlight-current"><td>0</td><td>11</td><td>2.27</td></tr><tr class=""><td>7</td><td>10</td><td>2.5</td></tr><tr class=""><td>23</td><td>9</td><td>2.77</td></tr><tr class=""><td>48</td><td>8</td><td>3.12</td></tr><tr class=""><td>95</td><td>7</td><td>3.57</td></tr></tbody>');
    })
})