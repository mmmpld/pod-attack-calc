import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from '@/plugins/router'

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')
