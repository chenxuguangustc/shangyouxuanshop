// vue.config.js
module.exports = {
  lintOnSave: false, // 关闭ESLint的规则检查

  devServer: {
    // proxy选项用于将特定的请求代理到另一个服务器，
    proxy: {
      '/api':{ // 只对请求路由以/api开头的请求进行代理转发
        target:'http://gmall-h5-api.atguigu.cn', // 转发的目标url
        changeOrigin:true, // 支出跨域
        // pathRewrite:{
        //   '^/api':''
        // }
      },
    }
  },
} 