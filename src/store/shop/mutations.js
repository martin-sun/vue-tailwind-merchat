export default {
  setPager (state, pager) {
    state.pager = pager
  },
  initPager (state) {
    state.pager = {
      page: 1,
      size: 20,
      total: 0
    }
  },
  setShopId (state, shopId) {
    state.shopId = shopId
  },
  setGoodsList (state, goodsList) {
    state.goodsList = goodsList
  },
  setGoods (state, goods) {
    state.goodsList.unshift(goods)
  },
  removeGoods (state, goodsId) {
    state.splice(state.goodsList.findIndex((item) => {
      return item.id === goodsId
    }), 1)
  },
  updateGoods (state, goodsId, goodsInfo) {
    let index = state.goodsList.findIndex((item) => {
      return item.id === goodsId
    })
    state.goodsList[index] = goodsInfo
  },
  setTags (state, tags) {
    state.tags = tags
  },
  delTag (state, tagId) {
    let index = state.tags.findIndex((item) => {
      return item.id === tagId
    })
    state.tags.splice(index, 1)
  },
  addTag (state, tag) {
    state.tags.unshift(tag)
  },
  updateTag (state, {tagId, tagName}) {
    let index = state.tags.findIndex((item) => {
      return item.id === tagId
    })
    state.tags[index].name = tagName
  },
  switchTag (state, {indexA, indexB}) {
    let temp = state.tags.splice(indexA, 1, state.tags[indexB])
    state.tags.splice(indexB, 1, temp[0])
  },
  setGrouponDetail (state, detail) {
    state.grouponDetail = detail
  },
  setGrouponList (state, list) {
    state.grouponList = list
  },
  addGroupon (state, item) {
    state.grouponList.unshift(item)
  },
  setOrderList (state, orderList) {
    state.orderList = orderList
  }
}
