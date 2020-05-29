<template>
  <div class="login-container">
    <div class="head">
      <div class="head-left">
        <div class="left-img">
          <img src="../../assets/login/chrome_icon.png" alt="">
        </div>
        <div>北京阡陌十方信息技术有限公司西安分公司</div>
      </div>
      <div class="head-right">
        <div class="right-left">
          <img
            src="../../assets/login/android.png"
            alt="安卓APP下载"
          >
          <div class="phone-text">安卓APP下载</div>
          <div class="tan-box tan-show">
            <div class="tan-erweima">
              <img
                src="../../assets/login/big-android.png"
                alt="安卓APP下载"
              >
              <div>扫码下载安卓APP</div>
            </div>
          </div>
        </div>
        <div class="right-right">
          <img
            src="../../assets/login/worker.png"
            alt="工人APP下载"
          >
          <div class="phone-text">工人APP下载</div>
          <div class="tan-box tan-show">
            <div class="tan-erweima">
              <img
                src="../../assets/login/big-worker.png"
                alt="安卓APP下载"
              >
              <div>扫码下载工人APP</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="body-bg">
      <div class="body-left">
        <img
          src="../../assets/login/body_ct.png"
        >
      </div>
      <div>
        <login-form />
      </div>
      <div class="foot-copy">
        Copyright © 2016-2018 北京金斗云辉科技有限公司 版权所有 ICP证：京ICP备18043900号-1
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm'
export default {
  name: 'Login',
  components: { LoginForm },
  data() {
    return {
      scrollHeight: 0,
      btnActive: true,
      count: 1,
      isActive: true
    }
  },
  methods: {
    change(active) {
      this.btnActive = !active
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .head {
    width: 100%;
    height: 100px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .head-left {
      display: flex;
      align-items: center;
      font-size: 30px;
      height: 100px;
      .left-img {
        min-width: 34px;
        min-height: 48px;
        margin-right: 27px;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .head-right {
      display: flex;
      align-items: center;
      img {
        width: 70px;
        height: 70px;
      }
      .right-left {
        margin-right: 100px;
        position: relative;
        .tan-box{
          display: none;
          position: absolute;
          width: 542px;
          height:485px;
          top:88px;
          left:50%;
          transform: translateX(-50%);
          background: url('../../assets/login/tan-box.png') no-repeat;
          background-size: 100% 100%;
          z-index: 100;
          .tan-erweima{
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            img{
              width:180px;
              height:180px;
            }
            div{
                text-align: center;
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(51,51,51,1);
            }
          }
        }
        &:hover .tan-show{
          display: block;
        }
        .phone-text {
          margin-top: -3px;
          text-align: center;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          white-space: nowrap;
        }

      }
      .right-right {
        position: relative;
        .tan-box{
          display: none;
          position: absolute;
          width: 542px;
          height:485px;
          top:88px;
          left:50%;
          transform: translateX(-50%);
          background: url('../../assets/login/tan-box.png') no-repeat;
          background-size: 100% 100%;
          z-index: 100;
          .tan-erweima{
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            img{
              width:180px;
              height:180px;
            }
            div{
                text-align: center;
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(51,51,51,1);
            }
          }
        }
        &:hover .tan-show{
          display: block;
        }
        .phone-text {
          margin-top: -3px;
          text-align: center;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          white-space: nowrap;
        }
      }
    }
  }
  .body-bg {
    width: 100%;
    height: calc(100vh - 100px);
    background: url("../../assets/login/body_bg.png") center no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .body-left {
      min-width: 660px;
      min-height: 473px;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    .foot-copy {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 779px;
      height: 48px;
      background: url("../../assets/login/body_foot.png") no-repeat;
      background-size: 100% 100%;
      padding-left: 48px;
      font-size: 14px;
      line-height: 48px;
    }
  }
}
</style>
