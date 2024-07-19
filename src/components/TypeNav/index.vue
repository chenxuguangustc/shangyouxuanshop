<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideFirst" @mouseenter="showFirst">
        <h2 class="all">全部商品分类</h2>
        <transition name="slide">
          <div class="sort" v-show="isShowFirst">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ active: currentIndex === index }"
                @mouseenter="showSubList(index)"
              >
                <h3>
                  <a
                    href="javascript:"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <a
                href="javascript:"
                @click="
                  $router.push(
                    `/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`
                  )
                "
                >{{ c1.categoryName }}</a
              > -->
                  <!-- <router-link
                :to="`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`"
                >{{ c1.categoryName }}</router-link
              > -->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          href="javascript:"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <a
                      href="javascript:"
                      @click="
                        $router.push(
                          `/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`
                        )
                      "
                      >{{ c2.categoryName }}</a
                    > -->
                        <!-- <router-link
                      :to="`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`"
                      >{{ c2.categoryName }}</router-link
                    > -->
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <a
                        href="javascript:"
                        @click="
                          $router.push(
                            `/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`
                          )
                        "
                        >{{ c3.categoryName }}</a
                      > -->
                          <!-- <router-link
                        :to="`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`"
                        >{{ c3.categoryName }}</router-link
                      > -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// import { reqBaseCategoryList } from "@/api";
import { mapState } from "vuex";
// import { _throttle } from 'lodash'
import _ from "lodash";

export default {
  name: "TypeNav",

  data() {
    return {
      currentIndex: -2,
      isShowFirst: this.$route.path === "/",
    };
  },

  computed: {
    //  ...mapState(['home.categoryList'])  // 不可以
    ...mapState({
      // categoryList: 'home.categoryList' // 不可以
      // 用来指定计算属性值的回调函数, state是总状态
      categoryList: (state) => state.home.baseCategoryList,
    }),

    // async mounted() {
    //   this.result = (await reqBaseCategoryList()).data.splice(0, 15);
    //   console.log("result", this.result);
    // },
  },

  methods: {
    /* 
    显示一级分类菜单
    */
    showFirst() {
      this.isShowFirst = true;
      this.currentIndex = -1;
    },

    /* 
    隐藏一级分类菜单
    */
    hideFirst() {
      // this.isShowFirst = false
      this.currentIndex = -2;

      if (this.$route.path !== "/") {
        this.isShowFirst = false;
      }
    },

    /* 
    显示指定下标的二级/三级菜单, _.throttle这个函数的结果赋值给showSubList
    mouseenter产生了多少次事件throttle函数就调用了多少次，但是里面的function函数调用的次数不是一直在调用
    */
    //  showSubList的this是当前组件对象，这个函数内部会调用function函数，并且指定他的this是外部函数的this
    // 而外部函数的this是当前组件对象
    showSubList: _.throttle(function (index) {
      if (this.currentIndex !== -2) {
        this.currentIndex = index;
      }
    }, 500),

    /* 
    跳转到搜索页面
     */
    toSearch(event) {
      const target = event.target;
      console.dir(target);
      const query = {};

      const { categoryname, category1id, category2id, category3id } =
        target.dataset;
      if (categoryname) {
        query.categoryName = categoryname;

        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
      }

      // 准备一个location对象，将params和query参数合并，一起进行传递
      const location = {
        name: "search",
        query,
        params: this.$route.params
      }

      this.$router.push(location)
    },
  },
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      // 因为上面定义的name是slide，所以指定过渡样式的时候以slide开头,因为transition放在sort上面
      // 所以应该给sort加过渡样式
      &.slide-enter-active, &.slide-leave-active {
        transition: all 1.5s;
      }

      &.slide-enter, &.slide-leave-to {
        opacity: 0;
        height: 0;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // 现在不想通过css来实现，想通过JS来实现，所以通过active类，有这个类的时候才显示
          // 因为通过hover实现的时候，更新的太快了
          &.active {
            background-color: #ccc;
            .item-list {
              display: block;
            }
          }

          // 利用hover来切换显示隐藏，&表示父级引用
          // &:hover {
          //   background-color: #ccc;

          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
  }
}
</style>
