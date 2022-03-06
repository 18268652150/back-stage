import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}


const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/main.vue'),
    children:[{
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/mall',
      name: 'mall',
      component: () => import('../views/mall.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/user.vue')
    },
    {
      path: '/pageOne',
      name: 'pageOne',
      component: () => import('../views/pageOne.vue')
    },
    {
      path: '/pageTwo',
      name: 'pageTwo',
      component: () => import('../views/pageTwo.vue')
    } ,
    {
      path: '/pageThree',
      name: 'pageThree',
      component: () => import('../views/pageThree.vue')
    } ,
    {
      path: '/pageFour',
      name: 'pageFour',
      component: () => import('../views/pageFour.vue')
    } ,
    {
      path: '/pageFive',
      name: 'pageFive',
      component: () => import('../views/pageFive.vue')
    } 
  ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  } 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
