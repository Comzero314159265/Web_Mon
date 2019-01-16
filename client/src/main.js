import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import VueFriendlyIframe from 'vue-friendly-iframe'
import routes from './router'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'bootstrap/dist/bootstrap.min.css'

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.component('vue-friendly-iframe', VueFriendlyIframe)

new Vue({
  router: routes,
  render: h => h(App)
}).$mount('#app')
