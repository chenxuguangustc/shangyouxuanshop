// 下面这些引入都是同步进行加载的，这个页面一旦运行，从上到下会全部加载，只有把这下面的东西全部加载完毕之后，
// 下面的代码才会执行，如果全部引入进来，Webpack打包的时候，会进行全部打包，打包成一个大的文件，效率比较低
// 动态加载，需要的时候才进行引入

// import Home from '@/pages/Home'
const Home = () =>  import('../pages/Home')
// 这种写法写成import函数，一开始不会引入，只要在用的时候才会进行引入（当路由被访问的时候），然后对应的import函数才会执行
// 引入的时候单独进行打包成单独的文件
// 浏览器运行的过程  加载 解析  渲染

import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Center from '@/pages/Center'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import store from '@/store'

// import from 这样的写法是一个同步的写法，从上往下依次执行，

/*
静态import: import Home from '@/pages/Home'  ==> 打包形成一个文件
动态import: import('@/pages/Home')  ==> 被引入的模块单独打包(生成另一个打包文件)


路由懒加载:
1. 使用动态import, 对路由组件进行单独打包(code split: 代码分割)
2. 配置的组件是一个函数, 只有访问对应路由时才会执行, 去请求加载对应的路由组件的打包文件
*/

/* 
所有静态路由配置的数组
*/
export default [
  {
    path: '/',
    component: Home
  },

  {
    path: '/shopcart',
    component: ShopCart
  },

  {
    path: '/paysuccess',
    component: PaySuccess
  },

  {
    path: '/pay',
    component: Pay
  },

  {
    path: '/center',
    component: Center
  },

  {
    path: '/trade',
    component: Trade,

    beforeEnter (to, from, next) {
      // 只有购物车界面才能跳到交易界面
      if (from.path==='/shopcart') {
        next()
      } else {
        next('/shopcart')
      }
    }
  },

  {
    path: '/detail/:skuId?',
    component: Detail
  },

  {
    path: '/AddCartSuccess',
    component: AddCartSuccess,

    beforeEnter: (to, from, next) => {
      // 只有没登陆才能看到登陆的界面，from是指从哪里来，不是你带参数的那个对象
      let skuNum = to.query.skuNum
      let skuInfo = sessionStorage.getItem('SKUINFO_KEY')
      
      if (skuInfo && skuNum) {
        next()
      } else {
        next('/')
      }
    }
  },

  {
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    props: (route) => ({keyword3: route.params.keyword, keyword4: route.query.keyword2})
    // props: true
  },

  {
    path: '/register',
    component: Register,
    meta: { // 需要隐藏footer的路由添加此配置
      isHideFooter: true
    }
  },

  {
    path: '/login',
    component: Login,
    meta: {
      isHideFooter: true
    },

    // 路由独享守卫（是在登陆的时候进行的匹配，当匹配到是去登陆的，先检查一下有没有token，有token表示已经登录过了，所以直接放到首页去，没有的话直接放行，也就是去登录）
    beforeEnter: (to, from, next) => {
      // 只有没登陆才能看到登陆的界面，
      let token = store.state.user.token
      if (token) {
        next('/')
      } else {
        next()
      }
    }
  }
]