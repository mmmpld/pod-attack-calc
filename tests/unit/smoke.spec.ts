import { describe, it, expect } from 'vitest'
import vuetify from '@/plugins/vuetify'
import router from '@/plugins/router'
import App from '@/App.vue'
import { mount } from '@vue/test-utils'

const wrapper = mount(App, {
  global: {
    plugins: [
      vuetify,
      router
    ]
  }
})

describe('should set v-application class on wrapper div', () => {
  it('has v-application class set', async () => {
    expect(wrapper.classes()).contains('v-application')
  })

  it('main should have character and breakpoints header text', async () => {
    const h2 = wrapper.findAll('h2')
    expect(h2.at(0).text()).toStrictEqual('Character')
    expect(h2.at(1).text()).toStrictEqual('Breakpoints')
  })
})
