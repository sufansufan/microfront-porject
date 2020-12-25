<template>
  <div id="QrCode">
    <div class="erweima">
      <img
        class="erweima-img"
        src="../../../assets/login/enterprise_landing.png"
        alt=""
      >
      <div class="erweima-text">打开手机金斗云&nbsp;&nbsp;扫描二维码</div>
      <div class="weweima-book">
        <div>
          <img src="../../../assets/login/login_no_input_icon.png" alt="">
          <span>免输入</span>
        </div>
        <div>
          <img src="../../../assets/login/login_faster_icon.png" alt="">
          <span>更快</span>
        </div>
        <div>
          <img src="../../../assets/login/login_security_icon.png" alt="">
          <span>更安全</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnActive: true,
      form: {
        username: '',
        password: '',
        verifyCodeInp: '',
        rememberMe: false,
        isFromPC: ''
      },
      identifyCode: '',
      verifyCode: '',
      error: '',
      loginVerifyCode: false // 验证码发送后台
    }
  },
  watch: {
    verifyCode() {
      // const aa = this.verifyCode
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="less">
.size(@width; @height) {
  width: @width;
  height: @height;
}
.font(@fontSize, @fontFamily, @fontWeight) {
  font-size: @fontSize;
  font-family: @fontFamily;
  font-weight: @fontWeight;
}
#QrCode {
  width: 100%;
  .erweima-img {
    width: 180px;
    height: 180px;
    display: block;
    margin: 0 auto;
    margin-top: 47px;
  }
  .erweima-text {
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .weweima-book {
    padding: 0 30px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
        margin-right: 6px;
      }
      span {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        white-space: nowrap;
      }
    }
  }
}
</style>
