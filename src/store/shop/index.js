import mutations from './mutations.js'
import actions from './actions.js'

export default {
  namespaced: true,
  state: {
    shopId: null,
    tags: [],
    goodsList: [],
    grouponList: [],
    grouponDetail: null,
    orderList: [],
    pager: {
      page: 1,
      size: 20,
      total: 0
    }
  },
  mutations: {
    ...mutations
  },
  actions: {
    ...actions
  },
  getters: {
    shopInfo (state, getters, rootState, rootGetters) {
      return rootState.shopInfo.find(item => {
        return item.id === state.shopId
      }) || {}
    }
  }
}
