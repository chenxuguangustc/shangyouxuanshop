<template>
  <div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <!-- <img :src="imgList?.[defaultIndex].imgUrl" /> -->
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img :src="defaultImg.imgUrl" ref="bigImg" />
    </div>

    <!-- 这个代表了那个阴影的盒子 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
export default {
  name: "Zoom",

  props: ["imgList"],

  computed: {
    defaultImg() {
      return this.imgList[this.defaultIndex] || {};
    },
  },

  mounted() {
    this.$bus.$on("syncDefaultIndex", this.syncDefaultIndex);
  },

  data() {
    return {
      defaultIndex: 0,
    };
  },

  methods: {
    syncDefaultIndex(index) {
      this.defaultIndex = index;
    },

    // 添加移动事件，代表鼠标移动了
    move: throttle(function (event) {
      let left, top;
      const maskDiv = this.$refs.mask;
      const bigImg = this.$refs.bigImg;

      // 取出相关的数据: 事件的offsetX/offsetY, mask <div>的宽度maskWidth
      const { offsetX, offsetY } = event;
      const maskWidth = maskDiv.clientWidth;
      // const maskWidth = this.maskWidth

      // 计算left, top
      left = offsetX - maskWidth / 2;
      top = offsetY - maskWidth / 2;
      // left和top必须在[0, maskWidth]区间内
      if (left < 0) {
        left = 0;
      } else if (left > maskWidth) {
        left = maskWidth;
      }
      if (top < 0) {
        top = 0;
      } else if (top > maskWidth) {
        top = maskWidth;
      }

      // 指定mask <div>的坐标值(left, top)
      maskDiv.style.left = left + "px";
      maskDiv.style.top = top + "px";

      // 指定大图 <img>的坐标值(left, top)
      bigImg.style.left = -2 * left + "px";
      bigImg.style.top = -2 * top + "px";
    }, 50),
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>