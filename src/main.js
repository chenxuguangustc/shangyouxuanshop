import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'

import './plugins/element'  // 加载element相关的配置

// 只需要引入就行，因为没有向外面暴露什么东西，所以不需要用from
import './mock/mockServer'

// 将所有的API请求函数引入过来
import * as API from '@/api'


import VueLazyload  from 'vue-lazyload'
// 这张图片表示图片还没有引入的时候展示用的
// import loading from '@/assets/images/loading.gif'
import loading from '@/assets/images/loading.gif'

// 在图片界面进入可视化范围前不加载，在没有得到图片前先显示loading图片
Vue.use(VueLazyload, { // 内部自定义了一个指令lazy
  loading // 指定未加载得到图片之前的loading图片
})
// 之后对项目中动态获取的图片都使用v-lazy



Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

// 将vm对象作为全局事件保存到Vue原型对象上的$bus方法上面
// Vue.prototype.$bus = new Vue() 但是这种方法多创建了一个Vue对象

new Vue({
  beforeCreate() {
    // vue的原型就是组件对象原型的原型
    Vue.prototype.$bus = this

    // 接口请求函数全部装在对象中，挂在vue的原型身上
    Vue.prototype.$API = API
  },
  router,
  store,  // 注册vuex的store对象  ==> 所有组件对象都有一个$store属性
  render: h => h(App)
}).$mount('#app')
