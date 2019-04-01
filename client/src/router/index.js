import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/setting',
      name: 'Setting',
      component: require('@/components/Setting').default
    },
    {
      path: '/detail',
      name: 'Detail',
      component: require('@/components/Detail').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
