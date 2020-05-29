<template>
  <div class="home-box">
    <div class="left">
      <user-info />
      <message-notify />
    </div>
    <div class="right">
      <div class="right-top-box">
        <urgent-task />
        <application />
      </div>
      <set-up />
    </div>
  </div>
</template>

<script>
import UserInfo from './components/UserInfo'
import MessageNotify from './components/MessageNotify'
import UrgentTask from './components/UrgentTask'
import Application from './components/Application'
import SetUp from './components/SetUp'
export default {
  components: {
    UserInfo,
    MessageNotify,
    UrgentTask,
    Application,
    SetUp
  }
}
</script>

<style lang="less" scoped>
.home-box {
  display: flex;
  padding-top: 20px;
  & > .left {
    width: 320px;
  }
  .right {
    width: calc(100vw - 320px);
    height: calc(100vh - 160px);
    overflow-y: auto;
    padding: 0 10px 20px 10px;
    .right-top-box {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
