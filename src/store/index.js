import Vue from 'vue'
import Vuex from 'vuex'
import { setToken } from '@/utils/auth.js'
import { updateShopInfo, login, sendTokenToEmail, rePwd, sendGrouponSms } from './api'
import shop from './shop/index.js'
import robot from './robot/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    shopInfo: [],
    merchantInfo: null
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setShopInfoAll (state, shopInfo) {
      state.shopInfo = shopInfo
    },
    updateShopInfo (state, shopInfo) {
      let index = state.shopInfo.findIndex(shop => {
        return shop.id === shopInfo.id
      })
      state.shopInfo[index] = {
        ...state.shopInfo[index],
        ...shopInfo
      }
    },
    setMerchantInfo (state, merchantInfo) {
      state.merchantInfo = merchantInfo
    }
  },
  actions: {
    login ({ commit }, {email, password}) {
      return login(email, password).then(resp => {
        if (!resp.errcode || resp.errcode === 0) {
          setToken(resp.login_session)
        }
        return resp
      })
    },
    sendTokenToEmail ({ commit }, email) {
      return sendTokenToEmail(email)
    },
    rePassword ({ commit }, {email, password, code}) {
      return rePwd(email, password, code)
    },
    updateShopInfo ({ commit }, shopInfo) {
      return updateShopInfo(shopInfo).then(resp => {
        commit('updateShopInfo', shopInfo)
        return resp
      })
    },
    sendGrouponSms ({ commit }, {grouponId, content}) {
      return sendGrouponSms(grouponId, content)
    }
  },
  modules: {
    shop,
    robot
  }
})
