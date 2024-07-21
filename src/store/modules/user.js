/*
管理用户模块相关数据的vuex子模块
*/
import { getUserTempId, getToken, saveToken, removeToken } from '@/utils'
import {
  reqRegister,
  reqLogin,
  reqUserLogout,
  reqUserInfo,
  reqUserAddressList
} from '@/api'

const state = {
  // 先从localstorage中获取token，
  token: getToken(),
  userInfo: {},
  // userTempId: getUserTempId(), // 获取临时标识ID
  userAddressList: [], // 用户地址
}

const mutations = {
  RECEIVE_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },

  RECEIVE_TOKEN(state, token) {
    state.token = token
  },

  RESET_USER_INFO(state) {
    state.userInfo = {}
  },

  RESET_USER_TOKEN(state) {
    state.token = ''
  },

  RESET_USER_ADDRESS_LIST(state, userAddressList) {
    state.userAddressList = userAddressList
  }
}

const actions = {
  /*
  注册的异步action，这个 commit必须加，不加的话会造成语法错误
  */
  async register({ commit }, userInfo) {
    const result = await reqRegister(userInfo)
    if (result.code !== 200) {
      throw new Error(result.data || '注册失败了')
    }
  },

  /*
  登陆的异步action
  */
  async reqLogin({ commit }, userInfo) {
    console.log('111111')
    const result = await reqLogin(userInfo)
    if (result.code === 200) {
      const userInfo = result.data
      const token = userInfo.token
      delete userInfo.token
      // 保存到state
      commit('RECEIVE_USER_INFO', userInfo)
      commit('RECEIVE_TOKEN', token)
      // 将token保存到local中
      saveToken(token)

      // 这里要写返回值，之前没写return是因为之前的操作没有后续的操作，这个需要写是因为登陆之后不但要存token
      // 还要根据登陆成功或者是失败来判断下一步是往哪里跳
      return 'ok'
    } else {
      throw new Error(result.message || '登陆失败了')
    }
  },

  /*
    退出登陆
    logout(): 请求登出的接口成功后, 清除前台用户的信息数据
      state中的userInfo
      localStorage中的userInfo
    */
  async logout({ commit }) {
    const result = await reqUserLogout()
    if (result.code == 200) {
      // 通过commit触发mutation调用 ==> 清除state中的userInfo和token
      commit('RESET_USER_INFO')
      commit('RESET_USER_TOKEN')
      // 删除local中保存的token
      removeToken()
    } else {
      throw new Error(result.message || '退出登陆失败')
    }
  },

  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      const userInfo = result.data
      // 保存到state
      commit('RECEIVE_USER_INFO', userInfo)
    } else {
      // throw new Error(result.message || '获取用户信息失败')
      return Promise.reject(new Error('failed'))
    }
  },

  /*@todo 新增获取用户地址信息  */
  async getUserAddressList({ commit }) {
    const result = await reqUserAddressList();
    if (result.code === 200) {
      const userAddressList = result.data
      commit('RESET_USER_ADDRESS_LIST', userAddressList)
    } else {
      throw new Error(result.message || '获取用户地址失败')
    }
  },

}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
