import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: require('@/components/Home').default
    },
    {
      path: '/list',
      name: 'List',
      component: require('@/components/List').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
