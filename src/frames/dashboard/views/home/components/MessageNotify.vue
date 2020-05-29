<template>
  <div class="message-notify">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label" class="tab-box">
          <el-badge :value="userNotitySize" :hidden="userNotitySize === 0"><i class="sys-msg-icon" /></el-badge>
          <div class="message-img" />
          系统消息
        </span>
        <div
          v-for="(item, index) in dataList"
          :key="index"
          class="content"
        >{{ item.text }}</div>
        <div class="more" @click="viewmore()">
          <div>
            查看更多
          </div>
          <div />
        </div>
      </el-tab-pane>
      <el-tab-pane label="配置管理">
        <span slot="label">
          <el-badge :value="userNotitySize" :hidden="userNotitySize === 0"><i class="sys-msg-icon" /></el-badge>
          <div class="task-img" />
          日常任务
        </span>
        <div class="task">
          <div class="task-time">
            <span
              class="icon"
              @click="beforeTime()"
            ><img src="../../../assets/messagenotify/left.png"></span>
            <el-date-picker
              v-model="value"
              type="date"
              placeholder="选择日期"
            />
            <span
              class="icon"
              @click="afterTime()"
            ><img src="../../../assets/messagenotify/right.png"></span>
          </div>
          <div v-for="(item,index) in taskList" :key="index" class="task-content">
            <p class="task-text"><a class="task-o">{{ item.title }}（{{ item.complete }}/{{ item.all }}）</a><a class="task-status" @click="gonotify()"><img src="../../../assets/messagenotify/go.png"></a></p>
            <!-- <p class="task-text"><a class="task-t">日志填写（0/10）</a><a class="task-status" @click="finishnotify()">已完成</a></p> -->
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getDailytasksDate } from '@core/api/dailyTasksConfig'
export default {
  data() {
    return {
      userNotitySize: 10,
      value: '',
      dataList: [
        { text: '还有10分钟就要上班了, ..(12.21)' },
        { text: '还有10分钟就要上班了, ..(12.21)' },
        { text: '还有10分钟就要上班了, ..(12.21)' }
      ],
      taskList: []
    }
  },
  created() {
    this.value = new Date()
    this.fetchData(this.value)
  },
  mounted() {},
  methods: {
    beforeTime() {
      this.value = new Date(this.value.setDate(this.value.getDate() - 1))
      this.fetchData(this.value)
    },
    afterTime() {
      this.value = new Date(this.value.setDate(this.value.getDate() + 1))
      this.fetchData(this.value)
    },
    viewmore() {
      this.$router.push({ path: 'MoreNotify' })
    },
    gonotify() {
      this.$router.push({ path: 'GoNotify' })
    },
    finishnotify() {
      this.$router.push({ path: 'finishnotify' })
    },
    fetchData(value) {
      const params = {
        // date: '2020-02-06'
        date: value
      }
      getDailytasksDate(params).then(({ data }) => {
        this.taskList = data
      })
    }

  }
}
</script>

<style lang="less" scoped>
.message-notify {
  width: 100%;
  height: 100%;
  margin-top: 10px;
  background: #003c74;
  .content {
    cursor: pointer;
    line-height: 14px;
    padding: 10px 0;
    font-size: 14px;
    color: #fff;
  }
  .more {
    padding: 10px 0;
    cursor: pointer;
    line-height: 14px;
    font-size: 14px;
    color: #fff;
    display: flex;
    justify-content: flex-end;
    & > div {
      &:last-child {
        width: 14px;
        height: 14px;
        margin-left: 5px;
        background: url('../../../assets/home/more-white.png') no-repeat center;
        background-size: 100% 100%;
      }
    }
  }
  .task {
    .task-time {
      text-align: center;
      .icon {
        cursor: pointer;
      }
    }
    .task-content {
      .task-text {
        line-height: 14px;
        padding: 10px 0;
        font-size: 14px;
        color: #fff;
      }
      .task-status {
        float: right;
        cursor: pointer;
      }
    }
  }
  .message-img {
    width: 22px;
    height: 20px;
    position: absolute;
    top: 11px;
    left: 29px;
    background: url('../../../assets/home/message-default.png');
    background-size: 100% 100%;
  }
  .task-img {
    width: 18px;
    height: 22px;
    position: absolute;
    top: 9px;
    left: 29px;
    background: url('../../../assets/home/task-default.png');
    background-size: 100% 100%;
  }
  .is-active {
    .message-img {
      width: 22px;
      height: 20px;
      position: absolute;
      top: 11px;
      left: 29px;
      background-size: 100% 100%;
      background: url('../../../assets/home/message-act.png');
    }
    .task-img {
      width: 18px;
      height: 22px;
      position: absolute;
      top: 9px;
      left: 29px;
      background: url('../../../assets/home/task-act.png');
      background-size: 100% 100%;
    }
  }
}
</style>
<style lang="less">
.message-notify {
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    text-align: center;
    width: 161px;
    background: #DCDFE6;
    color: #0A4C8A;
    border: 0;
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    width: 161px;
    text-align: center;
    background: #DCDFE6;
    border: 0;
    color: #999;
    text-decoration: none;
    height: 40px;
    line-height: 40px;
    &:hover {
      color: #0A4C8A;
      .message-img {
        width: 22px;
        height: 20px;
        position: absolute;
        top: 11px;
        left: 29px;
        background-size: 100% 100%;
        background: url('../../../assets/home/message-act.png');
      }
      .task-img {
        width: 18px;
        height: 22px;
        position: absolute;
        top: 9px;
        left: 29px;
        background: url('../../../assets/home/task-act.png');
        background-size: 100% 100%;
      }
    }
  }
  .el-tabs--border-card {
    border: 0;
    box-shadow: none;
  }
  .el-tabs--border-card > .el-tabs__content {
    background: #003c74;
    color: #fff;
    height: 100%;
  }

  .el-date-editor.el-input {
    width: 142px;
    margin: 0 20px;
  }
  .el-input__inner {
    background-color: rgba(74, 116, 155, 1);
    height: 30px;
    border-radius: 0;
    color: #fff;
  }
  .el-input__inner:focus {
    outline: none;
    border-color: #fff;
  }
  .el-input__icon {
    line-height: 30px;
  }
  .el-badge__content.is-fixed {
    top: -8px;
    right: -55px;
  }
  .el-badge__content {
    border: none;
  }
}
</style>
