<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHideFooter" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
// import { reqBaseCategoryList } from "@/api";

export default {
  name: "App",

  async mounted() {
    // const result = await reqBaseCategoryList();
    // console.log("result", result)

    // 在APP组件中调用，切换/跳转路由时不会再次调用
    this.$store.dispatch('getBaseCategoryList')
  },
  
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="less" scoped>
</style>