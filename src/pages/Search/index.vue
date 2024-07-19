<template>
  <div>
    <type-nav></type-nav>
    <div>搜索关键字: {{ $route.params.keyword }}</div>
    <div>搜索关键字: {{ $route.query.keyword2 }}</div>
    <div>搜索关键字: {{ keyword3 }}</div>
    <div>搜索关键字: {{ keyword4 }}</div>
  </div>
</template>
  
  <script>
export default {
  name: "SearcH",
  props: ['keyword3', 'keyword4'],
  data() {
    return {
      
    };
  },
};
</script>
  
  <style lang="less" scoped>
</style>