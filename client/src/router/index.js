import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Hello 
    }
  ]
})
