<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="options.categoryName">
              {{ options.categoryName }}<i @click="removeCategory">×</i>
            </li>
            <li class="with-x" v-if="options.keyword">
              {{ options.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="options.trademark">
              {{ options.trademark }}<i @click="removeTrademark">×</i>
            </li>

            <!-- 这里的key不适合用index，因为这里的index可能被删除，而prop不会重复，所以这里可以用prop -->
            <!-- <li class="with-x" v-for="prop in options.props" :key="prop">
              {{ options.trademark }}<i @click="removeTrademark">×</i>
            </li> -->
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :setTrademark="setTrademark" @addProp="addProp" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 动态样式，判断当前类名是否显示，为true则显示，false不显示 -->
                <!-- <li :class="{ active: orderArr[0] === '1' }">
                  <a href="#"
                    >综合
                    <i
                      class="iconfont"                      
                      :class="orderArr[1] === 'desc' ? 'icondown' : 'iconup'" 
                      v-if="options.order.split(':')[0] === '1'"
                    ></i>
                    三元运算符不能用对象的形式，直接用一个表达式就可以了
                  </a>
                </li> -->
                <!-- 这里因为要导入阿里图标库，偷懒没做，所以注释了，思路是上面那样的，下面使用了计算属性得到orderArr -->
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="'/detail/' + item.id"
                      ><img v-lazy="item.defaultImg"
                    /></router-link>
                    <!-- v-lazy这个命令是那个插件提供的 -->
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="'/detail/' + item.id"
                      >{{ item.title }}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            :currentPage="options.pageNo"
            :total="total"
            :pageSize="options.pageSize"
            :showPageNo="3"
            @currentChange="currentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",

  data() {
    return {
      options: {
        category1Id: "", // 一级分类ID
        category2Id: "", // 二级分类ID
        category3Id: "", // 三级分类ID
        categoryName: "", // 分类名称
        keyword: "", // 搜索关键字

        trademark: "", // 品牌: "ID:品牌名称" "1:苹果"
        props: [], // 商品属性的数组: ["属性ID:属性值:属性名"] ["2:6.0～6.24英寸:屏幕尺寸"]
        order: "1:desc", // 排序方式  1: 综合,2: 价格 asc: 升序,desc: 降序  "1:desc"

        pageNo: 1, // 页码
        pageSize: 10, //	每页数量
      },
    };
  },

  // created在渲染模板之前调用
  created() {
    // this.updateParams();
    // this.getShopList();
  },

  mounted() {
    console.log("this.options2", this.options1);
  },

  computed: {
    // ...mapState({
    //   goodsList: (state) => state.search.productList.goodsList || []
    // }),

    // vuex返回的是getters，这里可以直接用，total是总页数
    ...mapGetters(["goodsList", "total"]),

    /* 
    当重复的信息太多的时候，可以利用计算属性得到
    得到包含当前分类项标识和排序方式的数组,并且计算属性有缓存，所以效率会更高
    */
    orderArr() {
      return this.options.order.split(":");
    },
  },

  watch: {
    // $route(to, from) {
    //   this.updateParams();
    //   this.getShopList();
    // },

    $route: {
      handler() {
        this.updateParams();
        this.getShopList();
      },
      immediate: true, // 初始化的时候立即执行一次
    },
  },

  methods: {
    // 删除分类的条件
    removeCategory() {
      // 更新分类相关的数据
      this.options.category1Id = "";
      this.options.category2Id = "";
      this.options.category3Id = "";
      this.options.categoryName = "";

      // 重新发请求
      // this.getShopList()

      // 应该重新跳路由，将不要的数据丢掉
      this.$router.push({
        name: "search",
        query: this.$route.params,
      });
    },

    // 删除关键字的条件
    removeKeyword() {
      // 更新分类相关的数据
      this.options.keyword = "";

      // 重新发请求
      // this.getShopList()

      // 应该重新跳路由，将不要的数据丢掉
      this.$router.push({
        name: "search",
        query: this.$route.query,
      });

      // 3、在search组件中分发事件
      this.$bus.$emit("removeKeyword");
    },

    /* 
    更新options中的参数属性
    */
    updateParams() {
      const { keyword } = this.$route.params;
      const { category1Id, category2Id, category3Id, categoryName } =
        this.$route.query;

      // es6的新语法，将options的值全都取出来，放到这个新的options中
      // 这段代码确实创建了一个新的对象，然后将this.options这个赋值给了新对象。这意味着原来的this.options对象不会被直接修改，
      this.options = {
        ...this.options,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword,
      };

      this.options1 = {
        ...this.options,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword,
      };

      console.log("options", this.options1);
      console.log("option", this.options);
    },

    getShopList() {
      this.$store.dispatch("getProductList", this.options);
    },

    /* 
    设置品牌条件
    */
    setTrademark(trademark) {
      // 如果当前的品牌已经在条件中了，直接结束
      if (this.options.trademark === trademark) return;

      // 更新options中的trademark为指定的值
      this.options.trademark = trademark;
      // 重新获取数据列表
      this.getShopList();
    },

    /* 
    删除品牌条件，重新进行发送
    */
    removeTrademark() {
      this.options.trademark = "";

      this.getShopList();
    },

    /* 
    添加属性条件，这个功能没有实现
    */
    addProp(prop) {
      const { props } = this.options;
      // 如果已经存在数组中了，不添加，
      if (props.includes(prop)) return;

      // 向props数组中添加一个条件字符串， 子向父通信 ==> Vue自定义事件
      props.push(prop);

      this.getShopList();
    },

    /* 
    当前页码发生改变的事件回调
    */
    currentChange(page) {
      this.options.pageNo = page;
      this.getShopList();
    },
  },

  components: {
    SearchSelector,
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>