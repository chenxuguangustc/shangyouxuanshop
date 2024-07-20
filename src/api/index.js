/* 
包含所有接口请求函数的模块
*/
// import { result } from 'lodash'
import ajax from './ajax'
import mockAjax from './mockAjax'

//获取商品的三级分类列表
export const reqBaseCategoryList = ()=>ajax.get('/product/getBaseCategoryList')

// 获取首页广告轮播效果，
export const reqBannerList = () => ajax('/cms/banner')

// mock接口函数
export const reqRecommends = () => mockAjax('/recommends')
export const reqFloors = () => mockAjax('/floors')


// 快速测试一下
reqRecommends().then(res => {
    console.log('ews--', res)
})