import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import VueMaterial from 'vue-material'

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueMaterial)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
