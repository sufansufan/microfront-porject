<template>
  <div class="more-notify">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="未读消息" name="first" />
      <el-tab-pane label="已读消息" name="second" />
      <notify-center ref="list" :message-type="messageType">
        <div slot="button">
          <el-button v-if="activeName==='first'" @click="$refs.list.Handled()">标记为已读</el-button>
          <el-button v-if="activeName==='second'" @click="$refs.list.deleteTask()">删除</el-button>
        </div>
      </notify-center>
    </el-tabs>
  </div>
</template>

<script>
import NotifyCenter from './components/NotifyCenter'
export default {
  name: 'MoreNotify',
  components: {
    NotifyCenter
  },
  data() {
    return {
      activeName: 'first',
      messageType: false
    }
  },
  methods: {
    handleClick(e) {
      if (e.label === '已读消息') {
        this.messageType = true
      } else if (e.label === '未读消息') {
        this.messageType = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.more-notify {
  padding: 10px;
}
</style>
