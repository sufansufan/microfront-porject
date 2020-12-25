<template>
  <div class="login-form">
    <ul>
      <li>
        <span
          :class="[btnActive === false ? 'active' : '']"
          @click="change(true)"
        >
          扫码登录
        </span>
      </li>
      <b class="xian" />
      <li>
        <span :class="[btnActive === true ? 'active' : '']" @click="change(false)">账户登录</span>
      </li>
    </ul>
    <div class="tab">
      <qr-code :class="[btnActive === false ? 'show' : 'hidden']" />
      <from-sub :class="[btnActive === true ? 'show' : 'hidden']" />
    </div>
    <div class="tan-bottom">
      <div class="chrome">
        <div class="chrome-left">
          <i />
          <span>请使用Chrome浏览器登录平台</span>
        </div>
        <img
          class="text"
          src="../../../assets/login/chrome_icon.png"
          alt=""
        >
      </div>
      <div class="tan-admin">欢迎使用{{ titleName }}</div>
    </div>
  </div>
</template>
<script>
import QrCode from './QrCode.vue'
import FromSub from './FromSub.vue'
import { judgeTitle } from '@core/utils'
export default {
  components: { QrCode, FromSub },
  props: {
    companyInfo: {
      type: Object,
      default: () => {}
    }
  },
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
  computed: {
    titleName() {
      return judgeTitle(this.companyInfo)
    }
  },
  watch: {
    verifyCode() {

    }
  },
  methods: {
    change(active) {
      this.btnActive = !active
    },
    changeRember(active) {
      this.form.rememberMe = !active
    }
  }
}
</script>
<style lang="less" scoped>
.login-form {
  width: 400px;
  height: 485px;
  background: rgba(239, 250, 255, 1);
  border-radius: 10px;
  position: relative;
  position: absolute;
  top: 10vh;
  right: 10%;
  .show {
    display: block;
  }
  .hidden {
    display: none;
  }
  ul, li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  ul {
    display: flex;
    border-bottom: 1px solid rgba(178, 178, 178, 1);
    position: relative;
    .xian {
      width: 1px;
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 22px;
      background-color: rgba(178, 178, 178, 1);
    }
    li:first-child {
      border-radius: 10px 0px 0px 0px;
    }
    li:last-child {
      border-radius: 0px 10px 0px 0px;
    }
    li {
      width: 200px;
      height: 54px;
      line-height: 54px;
      background: rgba(255, 255, 255, 1);
      span {
        width: 100%;
        color: rgba(102, 102, 102, 1);
        font-size: 20px;
        text-align: center;
        display: inline-block;
        cursor: pointer;
        &:hover {
          color: rgba(10, 76, 138, 1);
        }
      }
      .active {
        color: rgba(10, 76, 138, 1);
      }
    }
  }
  .tab {
    padding: 0 40px;
  }
  .tan-bottom {
    position: absolute;
    width: 400px;
    bottom: 0;
    left: 0;
    .chrome {
      margin-top: 20px;
      padding: 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        i {
          display: inline-block;
          width: 20px;
          height: 18px;
          margin-right: 5px;
          background: url("../../../assets/login/login_notice_icon.png")
            no-repeat;
          background-size: 100% 100%;
        }
        span {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          white-space: nowrap;
        }
      }
      .text {
        width: 20px;
        height: 20px;
      }
    }
    .tan-admin {
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      background: rgba(215, 238, 255, 1);
      border-radius: 0px 0px 10px 10px;
      font-size: 18px;
      color: #333;
    }
  }
}
</style>
