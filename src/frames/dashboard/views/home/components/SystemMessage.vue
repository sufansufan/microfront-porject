<template>
  <div class="system-message">
    <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" />  返回</el-button>
    <div class="system-message-bg">
      <div class="box">
        <div class="type">{{ systemData.messageType }}</div>
        <div class="content">{{ systemData.content }}</div>
        <div class="time">{{ systemData.date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    systemData: {
      type: Object,
      default: () => {
        return {
          messageType: '',
          date: '',
          content: ''
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.system-message {
  padding: 10px;
  &-bg {
    width: 793px;
    height: 360px;
    position: absolute;
    top: 60px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: auto;
    background: url("../../../assets/home/publicSystemMessage.png");
    background-size: 100% 100%;
    .box {
      width: 400px;
      height: 200px;
      position: absolute;
      top: 0px;
      left: 200px;
      right: 0px;
      bottom: 0px;
      margin: auto;
      .type {
        color: #333;
        font-size: 18px;
      }
      .content {
        margin: 20px 0px;
        color: #666;
        font-size: 16px;
      }
      .time {
        position: absolute;
        right: 0px;
        bottom: 0px;
        color: #666;
        font-size: 12px;
      }
    }
  }
}
</style>
