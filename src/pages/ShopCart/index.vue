<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(shopCart, index) in shopCartList"
          :key="shopCart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="shopCart.isChecked"
              @click="updateOne(shopCart)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="shopCart.imgUrl" />
            <div class="item-msg">
              {{ shopCart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ shopCart.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeCartNum(shopCart, -1, true)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="shopCart.skuNum"
              minnum="1"
              class="itxt"
              @click="changeCartNum(shopCart, $event.target.value * 1, false)"
            />
            <!-- 因为他返回的是一个字符串，所以乘以1，转换成数字，根据true或者false来判断是加减还是直接改为填写的数字 -->
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeCartNum(shopCart, 1, true)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ shopCart.cartPrice * shopCart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- input选中与否和后面v-model绑定的值的真假相关， -->
        <input class="chooseAll" type="checkbox" v-model="isAllChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkedNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allMoney }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
           <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ShopCart",

  data() {
    return {
      // aaa: 0
    }
  },

  mounted() {
    this.getCartList();
  },

  methods: {
    getCartList() {
      this.$store.dispatch("getCartList");
    },

    // 修改购物车的商品数量
    async changeCartNum(shopCart, disNum, flag) {
      if (!flag) {
        // 针对输入的数据，
        if (disNum > 0) {
          disNum -= shopCart.skuNum;
        } else {
          disNum = 1 - shopCart.skuNum;
        }
      } else {
        // 针对+-的数据，传递过来的变化量
        if (disNum + shopCart.skuNum <= 0) {
          disNum = 1 - shopCart.skuNum;
        }
      }

      try {
        // 把传递过来的数据全部转换成正确的变化的量之后发请求
        await this.$store.dispatch("addCart", {
          skuId: shopCart.skuId,
          skuNum: disNum,
        });
        // 如果他请求成功了，则重新发请求，上面那个是更新数据库的
        this.getCartList();
      } catch (error) {
        alert(error.message);
      }
    },

    // 修改购物车的选中状态单个
    async updateOne(shopCart) {
      try {
        await this.$store.dispatch("updateCartChecked", {
          skuId: shopCart.skuId,
          isChecked: shopCart.isChecked ? 0 : 1,
        });
        this.getCartList()
      } catch (error) {
        alert(error.message)
      }
    },
  },

  computed: {
    // mapState使用数组，必须名字相同，且不能使用模块化
    ...mapState({
      shopCartList: (state) => state.shopcart.shopCartList[0]?.cartInfoList,
    }),

    // 计算属性中return返回的值，就是函数的名字的
    checkedNum() {
      return this.shopCartList.reduce((prev, item) => {
        if (item.isChecked) {
          prev += item.cartPrice * item.skuNum;
        }
        return prev;
      }, 0);
    },

    allMoney() {
      return this.shopCartList.reduce((prev, item) => {
        if (item.isChecked) {
          prev += item.skuNum;
        }
        return prev;
      }, 0);
    },

    isAllChecked: {
      get() {
        // 这里返回的是0或1
        return this.shopCartList.every((item) => {
          return item.isChecked;
        });
      },

      // val拿的是true或者false，所以将其转换成1或者0，因为数据库后面的参数是0或1，val就是计算属性的新值
      // 这个set调用的时机就是当isAllChecked的值变化的时候调用，
      async set(val) {
        console.log('val', val)
        // 这个是在拿updateCartCheckedAll的Promise的成功的结果

        // this.$store.dispatch('updateCartCheckedAll')是在调用updateCartCheckedAll异步函数，
        // 他的结果拿的是异步函数的返回值固定的那个Promise，不是函数return后面Promise.all的返回值的Promise
        // 而是Promise.all成功的结果，
        try {
          const result = await this.$store.dispatch('updateCartCheckedAll', val ? 1 : 0)
          console.log('result', result)
          alert('修改所有的状态成功')
          this.getCartList()
        } catch (error) {
          alert(error.message)
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 13%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>