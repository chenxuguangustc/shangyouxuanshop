/* 
vuex管理的home模块
*/
import {reqBaseCategoryList, reqBannerList} from '@/api'

const state = {
  baseCategoryList: [], // 所有分类的数组

  // 因为操作的是首页的，所以bannerList放在home里面
  bannerList: []
}

const mutations = {
  /* 
  接收保存分类列表
  */
  RECEIVE_BASE_CATEGORY_LIST(state, list) {
    state.baseCategoryList = list.splice(0,15)
  },

  // 获取广告轮播效果
  RECEIVE_BANNER_LIST(state, bannerList) {
    state.bannerList = bannerList
  }
}

const actions = {
  /* 
  异步获取商品三级分类列表
  */
  async getBaseCategoryList({ commit }) {
    const result = await reqBaseCategoryList();
    if (result.code === 200) {
      commit('RECEIVE_BASE_CATEGORY_LIST', result.data)
    }
  },

  /* 广告轮播效果 */
  async getBannerList({ commit }) {
    const result = await reqBannerList();
    if (result.code === 200) {
      commit('RECEIVE_BANNER_LIST', result.data)
    }
  },
}

const getters = {

}

export default {
  state,
  actions,
  mutations,
  getters
}