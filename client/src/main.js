import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import Vuetify from 'vuetify'

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
