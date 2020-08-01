import Vue from 'vue'
import App from './App.vue'
import Main from './components/Main.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import router from "@/router"
import VueMeta from 'vue-meta'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueMeta)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
