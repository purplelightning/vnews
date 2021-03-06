import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import homepage from '@/components/news/homepage'
import society from '@/components/news/society'
import sport from '@/components/news/sport'
import fun from '@/components/news/fun'
import history from 'components/news/history'
import test2 from 'components/test/test2'
import picture from 'components/picture/picture'
import movie from 'components/movie/movie'
import movieDetail from 'components/movie/movieDetail'
import moviesearch from 'components/movie/moviesearch'
import intern from 'components/intern/intern'

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
      path: '/test2',
      component: test2
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
    },
    {
      path: '/moviesearch',
      component: moviesearch
    },
    {
      path: '/intern',
      component: intern
    }
  ]
})
