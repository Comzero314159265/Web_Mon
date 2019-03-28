import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import Vuetify from 'vuetify'
import io from 'socket.io-client'

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Vuetify)

const socket = io('http://localhost:3000')
socket.on('websites', (data) => {
  console.log(data)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
