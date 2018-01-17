import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import homepage from '@/components/news/homepage'
import society from '@/components/news/society'
import sport from '@/components/news/sport'
import fun from '@/components/news/fun'
import history from 'components/news/history'
import test from 'components/test/test'
import picture from 'components/picture/picture'
import movie from 'components/movie/movie'
import movieDetail from 'components/movie/movieDetail'

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
    },
    {
      path: '/movie',
      component: movie,
      meta: {keepAlive: true}
    },
    {
      path: '/movieDetail',
      component: movieDetail
    }
  ]
})
