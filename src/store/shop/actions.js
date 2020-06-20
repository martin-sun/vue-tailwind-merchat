import {
  getGoodsListByShopId,
  getTagsByShopId,
  addTag,
  updateTag,
  delTag,
  switchTag,
  getGrouponList,
  addGroupon,
  updateGrouponInfo,
  getGrouponDetail,
  getGrouponEnrollInfo,
  addGoods,
  getGoods,
  updateGoods,
  deleteGoods,
  getOrdersListByShopId,
  confirmOrder,
  cancelOrder,
  sendOrderMail,
  viewOrderComments,
  replyOrderComment,
  deleteGoodsSpec
} from '../api.js'

/* eslint-disable eqeqeq */
export default {
  fetchGoodsList ({state, commit}, {goodsStatus, page = 1, size = 10}) {
    // goodsStatus 1为出售中，2为已下架
    if (state.shopId === null) return Promise.reject({message: '无店铺ID'})
    return getGoodsListByShopId(state.shopId, page, size, goodsStatus).then(resp => {
      commit('setGoodsList', resp.data)
      return resp
    })
  },
  fetchTags ({state, commit}, shopId) {
    if (!shopId && state.shopId === null) return Promise.reject({message: '无店铺ID'})
    return getTagsByShopId(state.shopId).then(resp => {
      commit('setTags', resp.tags)
      return resp
    })
  },
  addTag ({state, commit}, name) {
    if (state.shopId === null) return Promise.reject({message: '无店铺ID'})
    return addTag(state.shopId, name).then(resp => {
      commit('addTag', {
        name,
        priority: resp.priority,
        id: resp.tag_id,
        type: 1,
        product_count: 0
      })
      return resp
    })
  },
  updateTag ({state, commit}, {tagId, tagName}) {
    if (state.shopId === null) return Promise.reject({message: '无店铺ID'})
    return updateTag(state.shopId, tagId, tagName).then(resp => {
      commit('updateTag', {tagName, tagId})
      return resp
    })
  },
  delTag ({state, commit}, tagId) {
    if (state.shopId === null) return Promise.reject({message: '无店铺ID'})
    return delTag(state.shopId, tagId).then(resp => {
      commit('delTag', tagId)
    })
  },
  pushSwitchTag ({state, commit}, {indexA, indexB}) {
    return switchTag(state.tags[indexA].id, state.tags[indexB].id).then(resp => {
      commit('switchTag', {indexA, indexB})
      return resp
    })
  },
  fetchGrouponList ({state, commit}, {shopId, page = 1, size = 10}) {
    if (state.shopId === null) return Promise.reject({message: '无店铺ID'})
    return getGrouponList(shopId, page, size).then(resp => {
      commit('setGrouponList', resp.groupons || [])
      commit('setPager', {
        page: resp.current_page,
        total: resp.total_count,
        size: state.pager.size
      })
      return resp
    })
  },
  addGroupon ({state, commit}, params) {
    return addGroupon(params).then(resp => {
      return resp
    })
  },
  fetchGrouponDetail ({state, commit}, grouponId) {
    return getGrouponDetail(grouponId).then(resp => {
      if (resp.errcode && resp.errcode !== 0) {
        return null
      }
      commit('setGrouponDetail', resp)
      return resp
    })
  },
  updateGroupon ({state}, params) {
    return updateGrouponInfo(params).then(resp => {
      return resp
    })
  },
  fetchGrouponEnrollInfo ({state, commit}, {grouponId, page = 1, size = 10}) {
    return getGrouponEnrollInfo(grouponId, page, size)
  },
  addGoods ({state, commit}, params) {
    return addGoods(params).then(resp => {
      return resp
    })
  },
  fetchGoodsDetail ({state, commit}, productId) {
    return getGoods(productId).then(resp => {
      return resp
    })
  },
  updateGoods ({state, commit}, params) {
    return updateGoods(params)
  },
  deleteGoods ({state, commit}, productId) {
    return deleteGoods(state.shopId, productId)
  },
  deleteGoodsSpec ({state, commit}, {productId, specId}) {
    return deleteGoodsSpec(productId, specId)
  },
  fetchOrderList ({state, commit}, {status, page = 1, size = 10}) {
    if (state.shopId === null) return Promise.reject({message: '无店铺ID'})
    return getOrdersListByShopId(state.shopId, page, size, status).then(resp => {
      commit('setOrderList', resp.data)
      return resp
    })
  },
  confirmOrder ({state, commit}, orderId) {
    return confirmOrder(orderId)
  },
  cancelOrder ({state, commit}, orderId) {
    return cancelOrder(orderId)
  },
  sendOrderMail ({state, commit}, orderId) {
    return sendOrderMail(orderId)
  },
  viewOrderComments ({state, commit}, {orderId, productId}) {
    return viewOrderComments(orderId, productId)
  },
  replyOrderComment ({state, commit}, {rateId, reply}) {
    return replyOrderComment(rateId, reply)
  }
}
