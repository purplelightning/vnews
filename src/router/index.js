import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import homepage from '@/components/homepage/homepage'
import society from '@/components/society/society'
import sport from '@/components/sport/sport'
import fun from '@/components/fun/fun'
import history from 'components/history/history'
import test from 'components/test/test'
import picture from 'components/picture/picture'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    // {
    //   path: '/',
    //   redirect: '/app'
    // },
    // {
    //   path: '/home',
    //   component: home
    // },
    {
      path: '/',
      redirect: '/homepage'
    },
    {
      path: '/homepage',
      component: homepage
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
    {
      path: '/test',
      component: test
    },
    {
      path: '/picture',
      component: picture
    }
  ]
})
