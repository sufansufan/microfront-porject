<template>
  <div class="top-nav">
    <div class="company">
      <div>
        <img src="../../../assets/home/logo.png" alt="">
      </div>
      西安呼哈建筑装饰工程有限公司
    </div>
    <div class="title">
      金斗云智能管理平台
    </div>
    <ul class="top-list">
      <li>
        <div>
          <img src="../../../assets/home/home.png" alt="">
        </div>
        首页
      </li>
      <li>
        <div>
          <img src="../../../assets/home/application.png" alt="">
        </div>
        应用
      </li>
      <li>
        <div>
          <img src="../../../assets/home/message.png" alt="">
        </div>
        消息
      </li>
      <li>
        <div>
          <img src="../../../assets/home/appLoad.png" alt="">
        </div>
        APP下载
      </li>
      <li>
        <div>
          <img src="../../../assets/home/setting.png" alt="">
        </div>
        设置
      </li>
      <li>
        <div>
          <img src="../../../assets/home/help.png" alt="">
        </div>
        帮助
      </li>
      <li @click="signOut">
        <div>
          <img src="../../../assets/home/signOut.png" alt="">
        </div>
        退出
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut').then(res => {
        this.$router.replace({
          path: '/login'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.top-nav {
  width: calc(100% - 40px);
  height: 80px;
  text-align: center;
  background: url('../../../assets/home/bg.png') no-repeat center;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  line-height: 80px;
  color: #fff;
  padding: 0 20px;
  .company {
    display: flex;
    align-items: center;
    margin-left: 60px;
    font-size: 24px;
    & > div {
      min-width: 44px;
      height: 44px;
      margin-right: 10px;
      margin-top: -10px;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .title {
    font-size: 32px;
  }
  .top-list {
    min-width: 400px;
    height: 80px;
    display: flex;
    justify-content: flex-end;
    & > li {
      width: 60px;
      height: 74px;
      line-height: 20px;
      padding-top: 6px;
      cursor: pointer;
      & > div {
        font-size: 30px;
        width: 26px;
        height: 26px;
        margin: 0 auto;
        margin-top: 10px;
        margin-bottom: 5px;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
      &:hover {
        background: rgba(0, 60, 116, 0.7);
      }
    }
  }
}
</style>
