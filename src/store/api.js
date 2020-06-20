import axios from 'axios'
import qs from 'qs'

import eventBus from '@/utils/eventBus.js'
import { getToken, removeToken } from '@/utils/auth.js'

window.eventBus = eventBus
axios.interceptors.request.use(function (config) {
  if (config.url.startsWith('https://tj.file.myqcloud.com/')) { // 上传图片时不添加login_session
    return config
  }
  config.headers.common['Login-Session'] = getToken()
  return config
}, function (error) {
  eventBus.$notify.error({
    title: '错误',
    message: '请求错误，请检查网络'
  })
  return Promise.reject(error)
})
axios.interceptors.response.use(function (rawResp) {
  let data = rawResp.data
  if (data.errcode && data.errcode !== 0) {
    if (data.errcode !== 404 || rawResp.config.url !== '/api/applet/robot/check') {
      eventBus.$notify.error({
        title: '错误',
        message: data.errmsg || '服务器错误，请稍后再试'
      })
      return Promise.reject(data.errmsg)
    }
  }
  return data
}, function (error) {
  if (error && error.response) {
    switch (error.response.status) {
      case 403:
        removeToken()
        window.location = '/login'
        break
      default:
        eventBus.$notify.error({
          title: '错误',
          message: '服务器错误，请稍后再试'
        })
    }
  }
  return Promise.reject(error)
})

export function login (email, password) {
  return axios({
    method: 'post',
    url: '/api/applet/merchant/account/login',
    data: qs.stringify({
      email,
      pwd: password
    })
  })
}
export function sendTokenToEmail (email) {
  return axios({
    method: 'post',
    url: '/api/applet/merchant/account/send_reset_token',
    data: qs.stringify({
      email
    })
  })
}
export function rePwd (email, pwd, token) {
  return axios({
    method: 'post',
    url: '/api/applet/merchant/account/reset_pwd',
    data: qs.stringify({
      email, pwd, token
    })
  })
}
export function fetchUserInfo () {
  return axios({
    method: 'get',
    url: '/api/applet/user/info/get'
  })
}

export function fetchUserShopInfo () {
  return axios({
    method: 'get',
    url: '/api/applet/merchant/shop/info/get'
  })
}

export function updateShopInfo (shopInfo) {
  return axios({
    method: 'post',
    url: '/api/applet/merchant/shop/info/update',
    data: qs.stringify(shopInfo)
  })
}

export function getGoodsListByShopId (shopId, page, size, status) {
  return axios({
    method: 'get',
    url: '/api/applet/merchant/products',
    params: {
      shop_id: shopId,
      page: page,
      size: size,
      status
    }
  })
}

export function getTagsByShopId (shopId) {
  return axios({
    method: 'get',
    url: '/api/applet/merchant/product/tags',
    params: {
      shop_id: shopId
    }
  })
}

export function addTag (shopId, name) {
  return axios({
    method: 'post',
    url: '/api/applet/merchant/product/tag/add',
    data: qs.stringify({
      shop_id: shopId,
      name
    })
  })
}

export function updateTag (shopId, tagId, name) {
  return axios({
    method: 'post',
    url: '/api/applet/merchant/product/tag/update',
    data: qs.stringify({
      shop_id: shopId,
      tag_id: tagId,
      name
    })
  })
}

export function delTag (shopId, tagId) {
  return axios({
    method: 'post',
    url: '/api/applet/merchant/product/tag/del',
    data: qs.stringify({
      shop_id: shopId,
      tag_id: tagId
    })
  })
}

export function switchTag (tagIdA, tagIdB) {
  return axios({
    method: 'post',
    url: '/api/applet/merchant/product/tag/switch',
    data: qs.stringify({
      a_tag_id: tagIdA,
      b_tag_id: tagIdB
    })
  })
}

export function getGrouponList (shopId, page, size) {
  return axios({
    url: '/api/applet/groupons/released/get',
    params: {
      shop_id: shopId,
      page,
      size
    }
  })
}

export function addGroupon (params) {
  return axios({
    method: 'post',
    url: '/api/applet/groupon/release',
    data: qs.stringify(params)
  })
}

export function getGrouponDetail (grouponId) {
  return axios({
    url: '/api/applet/groupon/info/get',
    params: {
      groupon_id: grouponId
    }
  })
}
export function updateGrouponInfo (params) {
  return axios({
    method: 'post',
    url: '/api/applet/groupon/update',
    data: qs.stringify(params)
  })
}
export function getGrouponEnrollInfo (grouponId, page, size) {
  return axios({
    method: 'get',
    url: '/api/applet/groupon/enroll_info/get',
    params: {
      groupon_id: grouponId,
      page,
      size
    }
  })
}

export function getImgUploadSign (name, type) {
  // 文件类型，1：图片，2：语音，3、视频，4、文档
  return axios({
    method: 'get',
    url: '/api/applet/cos/sign/get',
    params: {
      file_name: name,
      file_type: type
    }
  })
}
export function getRandomImg (keywords = 'activity', width = 750, length = 356) {
  return axios.get('/api/applet/random/img/get', {
    params: { width, length, keywords }
  })
}

export function sendGrouponSms (grouponId, content) {
  return axios({
    method: 'post',
    url: '/api/applet/groupon/enrolled/send_sms',
    data: qs.stringify({
      groupon_id: grouponId,
      content: content
    })
  })
}
export function addGoods (params) {
  return axios({
    method: 'post',
    url: '/api/applet/merchant/product/add',
    data: qs.stringify(params)
  })
}

export function getGoods (productId) {
  return axios({
    method: 'get',
    url: '/api/applet/shop/product/info/get',
    params: { product_id: productId }
  })
}
export function updateGoods (params) {
  return axios({
    method: 'post',
    url: '/api/applet/merchant/product/update',
    data: qs.stringify(params)
  })
}
export function deleteGoods (shopId, productId) {
  return axios({
    method: 'post',
    url: '/api/applet/merchant/product/del',
    data: qs.stringify({
      shop_id: shopId,
      product_id: productId
    })
  })
}

export function deleteGoodsSpec (productId, specId) {
  return axios({
    method: 'post',
    url: '/api/applet/merchant/product/spec/del',
    data: qs.stringify({
      product_id: productId,
      spec_id: specId
    })
  })
}

export function getOrdersListByShopId (shopId, page, size, status) {
  return axios({
    method: 'get',
    url: '/api/applet/merchant/orders/get',
    params: {
      shop_id: shopId,
      page,
      size,
      status
    }
  })
}

export function confirmOrder (orderId) {
  return axios({
    method: 'post',
    url: '/api/applet/merchant/order/confirm',
    data: qs.stringify({
      order_id: orderId
    })
  })
}

export function cancelOrder (orderId) {
  return axios({
    method: 'post',
    url: '/api/applet/merchant/order/cancel',
    data: qs.stringify({
      order_id: orderId
    })
  })
}

export function sendOrderMail (orderId) {
  return axios({
    method: 'post',
    url: '/api/applet/merchant/order/email/send',
    data: qs.stringify({
      order_id: orderId
    })
  })
}

export function viewOrderComments (orderId, productId) {
  return axios({
    method: 'get',
    url: '/api/applet/merchant/order/rate/get',
    params: {
      order_id: orderId,
      product_id: productId
    }
  })
}

export function replyOrderComment (rateId, reply) {
  return axios({
    method: 'post',
    url: '/api/applet/merchant/order/rate/reply',
    data: qs.stringify({
      rate_id: rateId,
      reply
    })
  })
}

export function getRobotInfo (shopId) {
  return axios({
    method: 'get',
    url: '/api/applet/robot/get',
    params: {
      shop_id: shopId
    }
  })
}

export function getRobots () {
  return axios({
    method: 'get',
    url: '/api/applet/robot/list'
  })
}

export function robotLogin (shopId, timeout = null) {
  return axios({
    method: 'get',
    url: '/api/applet/robot/login',
    params: {
      shop_id: shopId,
      timeout: timeout
    }
  })
}

export function deleteRobot (shopId) {
  return axios({
    method: 'get',
    url: '/api/applet/robot/del',
    params: {
      shop_id: shopId
    }
  })
}

export function updateRobot (shopId, autoVerify, welcomeMsg) {
  return axios({
    method: 'post',
    url: '/api/applet/robot/update',
    data: qs.stringify({
      shop_id: shopId,
      auto_verify: autoVerify,
      welcome_msg: welcomeMsg
    })
  })
}

export function getRobotLoginQrcode (shopId) {
  return axios({
    method: 'get',
    url: '/api/applet/robot/qrcode/get',
    params: {
      shop_id: shopId,
      encode: 'base64'
    }
  })
}

export function checkRobotLoginStatus (shopId) {
  return axios({
    method: 'get',
    url: '/api/applet/robot/check',
    params: {
      shop_id: shopId
    }
  })
}

export function robotLogout (shopId) {
  return axios({
    method: 'get',
    url: '/api/applet/robot/logout',
    params: {
      shop_id: shopId
    }
  })
}

export function loadWechatGroup (shopId) {
  return axios({
    method: 'get',
    url: '/api/applet/robot/group/load',
    params: {
      shop_id: shopId
    }
  })
}

export function updateWechatGroup (groupId, name, desc, notice, visible, active) {
  return axios({
    method: 'post',
    url: '/api/applet/robot/group/update',
    data: qs.stringify({
      id: groupId,
      name,
      desc,
      notice,
      visible,
      active
    })
  })
}

export function deleteWechatGroup (groupId) {
  return axios({
    method: 'get',
    url: '/api/applet/robot/group/del',
    params: {
      id: groupId
    }
  })
}

export function getWechatGroupList (shopId, name, visible, active, page, size = 100) {
  return axios({
    method: 'get',
    url: '/api/applet/robot/group/search',
    params: {
      shop_id: shopId,
      name,
      visible,
      active,
      page,
      size
    }
  })
}

export function getWechatGroupById (groupId) {
  return axios({
    method: 'get',
    url: '/api/applet/robot/group/get',
    params: {
      id: groupId
    }
  })
}

export function addAutoReply (params) {
  return axios({
    method: 'post',
    url: '/api/applet/robot/autoreply/add',
    data: qs.stringify(params)
  })
}

export function getAutpReplyInfo (autoReplyId) {
  return axios({
    method: 'get',
    url: '/api/applet/robot/autoreply/get',
    params: {
      id: autoReplyId
    }
  })
}

export function getAutpReplys (shopId) {
  return axios({
    method: 'get',
    url: '/api/applet/robot/autoreply/list',
    params: {
      shop_id: shopId
    }
  })
}

export function updateAutoReply (params) {
  return axios({
    method: 'post',
    url: '/api/applet/robot/autoreply/update',
    data: qs.stringify(params)
  })
}

export function deleteAutoReply (autoReplyId) {
  return axios({
    method: 'get',
    url: '/api/applet/robot/autoreply/del',
    params: {
      id: autoReplyId
    }
  })
}
