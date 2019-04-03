import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import Vuetify from 'vuetify'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import store from './services/Store'
import Vuetour from 'vue-tour'
Vue.prototype.$http = axios
Vue.prototype.$store = store

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Vuetour)

Vue.use(new VueSocketIO({
  debug: false,
  connection: SocketIO('http://localhost:3000', {}),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationsPrefix: 'SOCKET_'
  }
  })
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
