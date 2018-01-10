import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import society from '@/components/society/society'
import sport from '@/components/sport/sport'
import fun from '@/components/fun/fun'
import history from 'components/history/history'
import test from 'components/test/test'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/news'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/society',
      component: society,
    },
    {
      path: '/sport',
      component: sport
    },
    {
      path: '/history',
      component: history
    },
    {
      path: '/fun',
      component: fun
    },
  ]
})
