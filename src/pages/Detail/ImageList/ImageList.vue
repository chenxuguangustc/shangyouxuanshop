<template>
  <div class="swiper-container">
    <!-- <swiper :options="{  
      slidesPreview: 5,
      slidesPerGroup: 5,    
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }">
    <swiper-slide v-for="(img, index) in imgList" :key="img.id" style="width: 100%; height: 100%;">
      <img class="swiper-wrapper" :class="{active: index === defaultIndex}" @click="changeDefaultIndex(index)" :src="img.imgUrl">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper> -->

    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, index) in imgList" :key="img.id">
        <img :class="{active: index === defaultIndex}" @click="changeDefaultIndex(index)" :src="img.imgUrl">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: "ImageList",

    props: ['imgList'],

    data() {
      return {
        defaultIndex: 0 // 默认有橙色框框的图片下标
      }
    },

    methods: {
      changeDefaultIndex(index) {
        this.defaultIndex = index

        this.$bus.$emit('syncDefaultIndex', index)
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        // &:hover {
        //   border: 2px solid #f60;
        //   padding: 1px;
        // }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>