import Vue from 'vue'
import Router from 'vue-router'
import { getToken, removeToken } from '@/utils/auth.js'
import store from '@/store'
import { fetchUserInfo, fetchUserShopInfo } from '@/store/api.js'


Vue.use(Router)

import Layout from '@/views/layout/index.vue'
import Login from '@/views/login.vue'
import ShopInfo from '@/views/shop/info.vue'
import ShopOrderList from '@/views/shop/order-list.vue'



const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      component: Layout,
      children: [{
        path: '/shop/:sid/info/',
        component: ShopInfo
      }, {
        path: '/shop/:sid/orders/list',
        component: ShopOrderList
      }]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})



const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  console.log('router')
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!store.state.userInfo) {
        Promise.all([fetchUserInfo(), fetchUserShopInfo()]).then(result => {
          result[0].is_merchant = result[1].is_merchant
          result[0].is_applied = result[1].is_applied
          store.commit('setUserInfo', result[0])
          result[1].shops && store.commit('setShopInfoAll', result[1].shops)
          result[1].merchant && store.commit('setMerchantInfo', result[1].merchant)
        }).then(() => {
          next()
        }).catch(err => {
          console.error(err)
          removeToken()
          next({ path: '/login' })
        })
      } else {
        next()
      }
    }
  } else {
    // 未登录重定向
    if (~whiteList.indexOf(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
