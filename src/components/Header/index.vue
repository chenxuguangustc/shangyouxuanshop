<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="$store.state.user.userInfo.name">
            <a href="jacascript:;">{{ $store.state.user.userInfo.name }}</a>
            <a href="javascript:;" class="register" @click="logout">退出登录</a>
          </p>
          <p v-else>
            <span>请</span>
            <router-link to="/login">登陆</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="javascript:">我的订单</a>
          <a href="javascript:">我的购物车</a>
          <a href="javascript:">我的尚品汇</a>
          <a href="javascript:">尚品汇会员</a>
          <a href="javascript:">企业采购</a>
          <a href="javascript:">关注尚品汇</a>
          <a href="javascript:">合作招商</a>
          <a href="javascript:">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/">
          <img src="./images/logo.png" alt="logo" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <!-- .prevent 阻止默认行为的发生，（比如表单提交，链接跳转）-->
          <button class="sui-btn btn-xlarge btn-danger" @click.prevent="search">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>
  
  <script>
export default {
  name: "HeadeR",
  data() {
    return {
      keyword: "",
    };
  },

  methods: {
    search() {
      const location = {
          name: 'search',
          query: this.$route.query,
          params: {keyword: this.keyword}
        }


      if (this.keyword) {     
        // location.params = {
        //   keyword: this.keyword
        // }

        // this.$router.push(
        //   `/search/${this.keyword}?keyword2=${this.keyword.toUpperCase()}`
        // ).catch(() => {})
        this.$router.push(location).catch(() => {})
      } else {
        this.$router.push('/search')
      }
      //   const {keyword} = this

      //   this.$router.push({
      //     name: "search",
      //     params: { keyword: this.keyword },
      //     query: {keyword2: this.keyword.toUpperCase()}
      //   });
    },

    logout() {
      this.$store.dispatch('logout')
    }
  },

  mounted() {
    // 2、在Header中: 通过事件总线对象绑定自定义事件监听, 在回调中删除输入数据
    // $bus本质上就是vm，vm的属性和方法都有一个$开头，静态属性和方法没有$开头
    // 使用箭头函数是想用mounted的this
    this.$bus.$on('removeKeyword', () => {
      this.keyword = ''
    })
  },

  beforeDestroy() {
    // 4、在哪个组件中绑定事件监听就在哪个组件销毁前解绑事件监听
    this.$bus.$off('removeKeyword')
  }
};
</script>
  
  <style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>