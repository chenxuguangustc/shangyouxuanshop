import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'

Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name, TypeNav)

new Vue({
  router,
  store,  // 注册vuex的store对象  ==> 所有组件对象都有一个$store属性
  render: h => h(App)
}).$mount('#app')
