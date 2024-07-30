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

// 请求搜索匹配的商品相关数据
export const reqProductList = (searchParams) => ajax.post('/list', searchParams)

// mock接口函数
export const reqRecommends = () => mockAjax('/recommends')
export const reqFloors = () => mockAjax('/floors')

/*
16.注册用户
/api/user/passport/register POST
phone/nickName/password/code
userInfo是包含上面3个属性的对象

{
  "code": "001141",
  "nickName": "atguigu",
  "password": "123123",
  "phone": "13754545454"
}
*/
export const reqRegister = (userInfo) => ajax.post('/user/passport/register', userInfo)


/*
登陆
/api/user/passport/login POST  phone/password
*/
export function reqLogin ({phone, password}) {
  return ajax.post('/user/passport/login', {phone, password})
}

/* 
根据token获取用户信息，请求方式get，参数token，请求头里面有，
*/
export const reqUserInfo = () => {
  return ajax({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
  })
}

// 退出登录，其实是带了参数，在请求头中的token
export const reqUserLogout = () => {
  return ajax({
    url: '/user/passport/logout',
    method: 'get'
  })
}

// 获取商品详情信息
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`)


// 添加购物车（还可以修改购物车的商品数量）
export const reqAddCart = (skuId, skuNum) => {
  return ajax({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
}



// 快速测试一下
reqRecommends().then(res => {
    console.log('ews--', res)
})