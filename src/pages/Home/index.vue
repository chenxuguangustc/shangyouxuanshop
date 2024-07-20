<template>
  <div>
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor v-for="item in floors" :key="item.id" :floor="item"/>
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
  import Brand from './Brand/Brand'
  import Floor from './Floor/Floor'
  import Like from './Like/Like'
  import ListContainer from './ListContainer/ListContainer'
  import Rank from './Rank/Rank'
  import TodayRecommend from './TodayRecommend/TodayRecommend'
  import { mapState } from 'vuex'
  export default {
    name: 'Home',

    async mounted() {
      this.$store.dispatch('getRecommends')
      this.$store.dispatch('getFloors')
    },

    computed: {
      ...mapState({
        floors: state => state.home.floors
      })
    },

    components: {
      Brand,
      Floor,
      Like,
      ListContainer,
      Rank,
      TodayRecommend,
    }
  }
</script>

<style lang="less" scoped>

</style>