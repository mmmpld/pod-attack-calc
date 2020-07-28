import '@testing-library/jest-dom'
import Vue from 'vue'
import { render, fireEvent } from '@testing-library/vue'
import Vuetify from 'vuetify'
import App from '@/App.vue'
Vue.use(Vuetify)
const renderWithVuetify = (component, options, callback) => {
    const root = document.createElement('div')
    root.setAttribute('data-app', 'true')

    return render(
        component,
        {
            container: document.body.appendChild(root),
            // for Vuetify components that use the $vuetify instance property
            vuetify: new Vuetify(),
            ...options,
        },
        callback,
    )
}

test('should set [data-app] attribute on outer most div', () => {
    const { container } = renderWithVuetify(App)
    expect(container.getAttribute('data-app')).toEqual('true')
})