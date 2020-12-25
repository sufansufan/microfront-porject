<template>
  <div class="urgent-more">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="未处理" name="first" />
      <el-tab-pane label="已处理" name="second" />
      <task-center ref="list" :message-type="messageType">
        <div slot="button">
          <template v-if="activeName==='first'">
            <el-button @click="$refs.list.Handled()">标记为已处理</el-button>
            <el-button @click="$refs.list.HandleTop()">置顶</el-button>
            <el-button @click="$refs.list.CancelHandleTop()">取消置顶</el-button>
          </template>
          <el-button v-if="activeName==='second'" @click="$refs.list.deleteTask()">删除</el-button>
        </div>
      </task-center>
    </el-tabs>
  </div>
</template>

<script>
import table from '@core/mixins/table'
import TaskCenter from './components/TaskCenter'
import { setSessionStorage, getSessionStorage } from '@core/utils/auth'
export default {
  name: 'UrgentMore',
  components: {
    TaskCenter
  },
  mixins: [table],
  data() {
    return {
      activeName: getSessionStorage('urgenTask'),
      messageType: false
    }
  },
  created() {
    if (this.activeName === 'first') {
      this.messageType = false
    } else {
      this.messageType = true
    }
  },
  methods: {
    handleClick(e) {
      setSessionStorage('urgenTask', e.name)
      if (e.name === 'first') {
        this.messageType = false
      } else if (e.name === 'second') {
        this.messageType = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.urgent-more {
  padding: 10px;
}
</style>
