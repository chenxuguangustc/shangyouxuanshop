<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              orderNo
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥{{ payinfo.totalFee }}</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
          <a href="javascript:;" class="btn" @click="pay">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 支付流程，购物车上面是有一个结算的，点击去到交易页面，里面是用户创建订单的交易信息，交易信息里面有一个比较重要的东西，
 交易编号，点击提交订单后不会直接跳到支付页面去，会发一个请求，去真正的创建订单，创建好 之后会把订单 标号返回到交易页面来。有了之后再从交易页面跳到支付页面，跳转的过程中，是通过路由把订单编号带过来的，到支付页面，支付的过程中，是需要订单编号的，支付的时候需要一些支付信息的， -->

<script>
import QRCode from "qrcode";
export default {
  name: "Pay",

  data() {
    return {
      orderNo: "",
      payinfo: {},
      payStatus: 0
    };
  },

  beforeMount() {
    this.orderNo = this.$route.query.orderNo;
  },

  mounted() {
    this.reqOrder();
  },

  methods: {
    async reqOrder() {
      const result = await this.$API.reqPayInfo(this.orderNo);
      if (result.code === 200) {
        this.payinfo = result.data;
      }
    },

    // 1、点击按钮弹出消息盒子
    // 2、生成二维码图片（请求回来的支付信息当中包含了一个生成二维码的所需要的数据（微信给我们的一个链接））
    // 订单数据中包含了一个codeUrl，是用来让我们生成二维码用的
    async pay() {      
        try {
          const imgUrl = await QRCode.toDataURL(this.payinfo.codeUrl);

          // 生成二维码图片的URL成功之后，再去弹出消息盒子
          this.$alert(`<img src="${imgUrl}"/>`, "请使用微信扫码支付", {
            dangerouslyUseHTMLString: true, // 将内容字符串作为html解析
            showClose: false, // 不显示右上角的关闭按钮
            showCancelButton: true, // 显示取消按钮
            cancelButtonText: "支付中遇到了问题",
            confirmButtonText: "已支付",
            center: true, // 水平居中显示 

            beforeClose:(action, instance, done) => {
              if (action === 'confirm') {
                // if (this.payStatus !== 200) {
                //   this.$message.success('请确保支付成功，支付成功会自动进行跳转')
                // }
                clearInterval(this.timer)
                this.timer = null
                done()
                // 跳转路由
                this.$router.push('/paysuccess')

              } else if (action === 'cancel') {
                this.$message.error('请联系客服')
                clearInterval(this.timer)
                this.timer = null
                done()
              }
            }
          });


          // 这一步重要，创建定时器，检查订单的状态，
          
          // 3、二维码产生之后，设置循环定时器，发送请求，看用户对这个订单是否支付成功
          // 轮询的定时器一般都要有个编号,不然后面没办法清除，定时器只能一个，所以先判断有没有定时器
          if (!this.timer) {
            this.timer = setInterval(async () => {
              const result = await this.$API.reqOrderStatus(this.orderNo)
              // 4、支付成功，
              if (result.code === 200) {
                // 要做四件事，1、跳转支付成功页面 2、清除定时器 3、关闭消息盒子 4、存储支付状态
                // 数字中除了0和NAN都是真
                this.payStatus = 200

                // 箭头函数中的this代表外表的this，如果上面没有用箭头函数而是用的function，则表示window
                clearInterval(this.timer)
                this.timer = null

                // 关闭messageBox
                this.$msgbox.close()

                // 跳转路由
                this.$router.push('/paysuccess')
              }
            }, 2000)
          }

        } catch (error){
          console.log(error)
        }
    },
  },
};
</script>
 
<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>
