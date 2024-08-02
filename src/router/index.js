import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
// 声明使用插件
Vue.use(VueRouter)

// 向外默认暴露路由器对象
const router = new VueRouter({
  mode: 'history', // 没有#的模式
  routes, // 注册所有路由

  // 控制滚动行为，router的特性
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// token校验逻辑
router.beforeEach(async (to, from, next) => {
  // 全局前置导航守卫
  // to准备去的地方的路由对象
  // from从哪个地方来的路由对象
  // next是一个函数，next（）表示无条件放行

  // token校验
  let token = store.state.user.token

  // 如果有token，代表之前登录过
  if (token) {
    if (to.path === '/login') {
      // 登陆过了又想去登陆页，直接跳转到首页
      next('/')
    } else {
      // 检验vuex里面是否有了用户信息，!!转换成布尔值，得在后面加上一个属性，因为userInfo是一个对象
      // 对象任何时候都是true
      let hasUserInfo = !!store.state.user.userInfo.nickName

      if (hasUserInfo) {
        // 用户信息存在
        next()
      } else {
        try {
          // 代表了登录了，去的不是登录页,根据token发请求获取用户的真正信息
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          alert('未知错误')

          // 清理之前的过期的token，用户信息等信息
          store.dispatch('logout')

          // 应该想去之前想去但是没有去的地方，此时将之前想去的地址路径保存下来，需要和登陆逻辑配合使用
          next('/login?redirect=' + to.path)
        }
      }

    }
  } else {
    // 代表之前没登录过

    // 这里使用全局导航守卫
    // 后期我们需要判断用户是不是去订单相关的页面，如果是那就先进行登录
    // 交易相关的，   订单相关的，   支付相关的   用户中心相关的
    if (to.path.indexOf('/trade') === 0 || to.path.startsWith('/pay') || to.path.startsWith('/center') || to.path.startsWith('/shopcart')) {
      next('/login?redirect=' + to.path)
    } else {
      next()
    }
  }
})

export default router