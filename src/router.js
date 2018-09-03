import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // component: Home
      redirect: '/shop/goods'
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Shop.vue'),
      children:[
        { path: '/shop/goods', component: () => import('./components/goods/goods.vue')},
        { path: '/shop/ratings', component: () => import('./components/ratings/ratings.vue')},
        { path: '/shop/seller', component: () => import('./components/seller/seller.vue')}
      ]
    }
  ]
})
