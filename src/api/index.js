/* 
包含所有接口请求函数的模块
*/
import ajax from './ajax'

//获取商品的三级分类列表
export const reqBaseCategoryList = ()=>ajax.get('/product/getBaseCategoryList')

// 获取首页广告轮播效果，
export const reqBannerList = () => ajax('/cms/banner')