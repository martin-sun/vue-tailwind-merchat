import {
  getRobotInfo,
  getRobots,
  robotLogin,
  deleteRobot,
  updateRobot,
  getRobotLoginQrcode,
  checkRobotLoginStatus,
  robotLogout,
  loadWechatGroup,
  updateWechatGroup,
  deleteWechatGroup,
  getWechatGroupList,
  addAutoReply,
  getAutpReplys,
  updateAutoReply,
  deleteAutoReply
} from '../api.js'

export default {
  getRobotInfo ({state, commit}, shopId) {
    return getRobotInfo(shopId)
  },
  getRobots ({state, commit}) {
    return getRobots()
  },
  robotLogin ({state, commit}, shopId, timeout = null) {
    return robotLogin(shopId, timeout)
  },
  deleteRobot ({statae, commit}, shopId) {
    return deleteRobot(shopId)
  },
  updateRobot ({statae, commit}, shopId, autoVerify, welcomeMsg) {
    return updateRobot(shopId, autoVerify, welcomeMsg)
  },
  getRobotLoginQrcode ({state, commit}, shopId) {
    return getRobotLoginQrcode(shopId)
  },
  checkRobotLoginStatus ({state, commit}, shopId) {
    return checkRobotLoginStatus(shopId)
  },
  robotLogout ({state, commit}, shopId) {
    return robotLogout(shopId)
  },
  loadWechatGroup ({state, commit}, shopId) {
    return loadWechatGroup(shopId)
  },
  updateWechatGroup ({state, commit}, {groupId, name, desc, notice, visible, active}) {
    return updateWechatGroup(groupId, name, desc, notice, visible, active)
  },
  deleteWechatGroup  ({state, commit}, groupId) {
    return deleteWechatGroup(groupId)
  },
  getWechatGroupList ({state, commit}, {shopId, name, visible, active, page, size}) {
    return getWechatGroupList(shopId, name, visible, active, page, size)
  },
  addAutoReply ({state, commit}, params) {
    return addAutoReply(params)
  },
  getAutpReplys ({state, commit}, shopId) {
    return getAutpReplys(shopId)
  },
  updateAutoReply ({state, commit}, params) {
    return updateAutoReply(params)
  },
  deleteAutoReply ({state, commit}, autoReplyId) {
    return deleteAutoReply(autoReplyId)
  }
}
