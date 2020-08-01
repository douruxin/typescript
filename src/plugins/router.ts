import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home/Home.vue')
  },
  {
    path: '/goods',
    name: 'Goods',
    component: () => import('../pages/Goods/Goods.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../pages/Detail/Detail.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../pages/User/User.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/Register/Register.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../pages/NotFound/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 全局守卫
/* router.beforeEach((to, from, next) => {
  console.log('全局前置守卫')
  next()
})

router.afterEach((to, from) => {
  console.log('全局后置守卫')
}) */

export default router
