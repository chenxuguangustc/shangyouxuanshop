import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'

// 只需要引入就行，因为没有向外面暴露什么东西，所以不需要用from
import './mock/mockServer'

// 将所有的API请求函数引入过来
import * as API from '@/api'

Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

// 将全局事件总线对象(vm)保存到Vue原型对象上
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
