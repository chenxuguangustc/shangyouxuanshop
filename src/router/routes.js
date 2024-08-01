import Home from '@/pages/Home'
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
    component: Trade
  },

  {
    path: '/detail/:skuId?',
    component: Detail
  },

  {
    path: '/AddCartSuccess',
    component: AddCartSuccess
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
    }
  }
]