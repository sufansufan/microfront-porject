<template>
  <div class="message-notify">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label" class="tab-box">
          <el-badge :value="mesNotitySize" :hidden="mesNotitySize === 0 ||tableData.length===0"><i class="sys-msg-icon" /></el-badge>
          <div class="message-img" />系统消息
        </span>
        <div
          v-for="(item, index) in tableData"
          :key="index"
          v-loading="loading"
          class="content"
        >
          <span class="message" @click="updateDetails(item)">{{ item.title }}</span>
          <span class="mes-time">{{ fnTime(item.createDate) }}</span>
        </div>
        <div class="see-more" @click="$router.push({ path: 'MoreNotify' })">查看更多</div>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label">
          <el-badge :value="userNotitySize" :hidden="userNotitySize === 0"><i class="sys-msg-icon" /></el-badge>
          <div class="task-img" />日常任务
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
              @change="changeTime"
            />
            <span
              class="icon"
              :disabled="disabled"
              @click="afterTime()"
            ><img src="../../../assets/messagenotify/right.png"></span>
          </div>
          <div v-for="(item,index) in taskList" :key="index" class="task-content">
            <p class="task-text"><a class="task-o">{{ item.title }}（{{ item.complete }}/{{ item.all }}）</a><a class="task-status" @click="gonotify(item)"><img src="../../../assets/messagenotify/go.png"></a></p>
            <!-- <p class="task-text"><a class="task-t">日志填写（0/10）</a><a class="task-status" @click="finishnotify()">已完成</a></p> -->
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getDailytasksDate } from '@core/api/dailyTasksConfig'
import { getList } from '@core/api/emergencyWork'
import { parseTime } from '@core/utils'
import { dealByServiceId } from '@core/api/emergencyWork'
import { setSessionStorage, getSessionStorage } from '@core/utils/auth'
export default {
  data() {
    return {
      mesNotitySize: '',
      userNotitySize: '',
      value: '',
      taskList: [],
      tableData: [],
      activeName: getSessionStorage('systemInfo') || 'second',
      createDate: '',
      disabled: false,
      loading: true
    }
  },
  created() {
    this.value = new Date()
    this.fetchData(this.value)
    this.MesfetchData()
  },
  mounted() {},
  methods: {
    handleClick(tab) {
      setSessionStorage('systemInfo', tab.name)
    },
    updateDetails(item) {
      console.log(item)
      const { route, code } = item.emergencyworkTypeDTO
      const taskTypeId = item.emergencyworkTypeDTO.id
      const { serviceId, id, type } = item
      // 通用系统消息
      if (route === '/publicSystemMessage') {
        const { createDate, title } = item
        const { taskType } = item.emergencyworkTypeDTO
        const query = {
          messageType: taskType,
          date: createDate,
          content: title
        }
        this.$router.push({ path: route, query })
        this.handlerSysTemComplete(serviceId, taskTypeId)
        return
      }
      // 合作企业
      if (route === '/cooperativeEnterprise/materialSupply/enterpriseView') {
        this.handlerSysTemComplete(serviceId, taskTypeId)
        return
      }

      // 组织管理
      setTimeout(() => {
        if (route.includes('employeeInfo')) {
          this.$router.push({ path: route, query: { type: 'edit', id: serviceId, contractInfo: 'contractInfo' }})
        } else {
          this.$router.push({ path: route, query: { serviceId: serviceId, id: id, code: code, type: type }})
        }
      }, 0)
    },
    MesfetchData() {
      this.loading = true
      const params = {
        type: 1,
        userId: '1',
        deal: false
      }
      getList(params).then(({ data: { content }}) => {
        this.loading = false
        this.tableData = content || []
        if (this.tableData.length > 0 && this.tableData.length <= 999) {
          this.mesNotitySize = this.tableData.length
        } else {
          this.mesNotitySize = '····'
        }
      })
    },
    fnTime(time) {
      const now = new Date().getTime()
      const ptime = new Date(time).getTime()
      const twentyFourHours = 24 * 60 * 60 * 1000
      const fortyEightHours = 24 * 60 * 60 * 1000 * 2
      const yaerHours = 24 * 60 * 60 * 1000 * 365
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const today = `${year}-${month}-${day}`
      const todayTime = new Date(today).getTime()
      const yesterdayTime = new Date(todayTime - twentyFourHours).getTime()
      const lastYesterdayTime = new Date(todayTime - fortyEightHours).getTime()
      const lastYear = new Date(todayTime - yaerHours).getTime()
      const tenTimes = new Date(10 * 60 * 1000).getTime()
      const timeDifference = now - ptime
      if (timeDifference < tenTimes) {
        return '刚刚'
      } else if (ptime >= todayTime) {
        return time.split(' ')[1].substr(0, 5)
      } else if (ptime < todayTime && yesterdayTime <= ptime) {
        return '昨天 ' + time.split(' ')[1].substr(0, 5)
      } else if (ptime < yesterdayTime && lastYesterdayTime <= ptime) {
        return '前天 ' + time.split(' ')[1].substr(0, 5)
      } else if (ptime < lastYesterdayTime && lastYear <= ptime) {
        const timearr = time.replace(' ', ':').replace(/\:/g, '-').split('-')
        return '' + timearr[1].split('')[1] + '月' + timearr[2] + '日\t' + timearr[3] + ':' + timearr[4] + ''
      } else {
        const timearr = time.replace(' ', ':').replace(/\:/g, '-').split('-')
        return '' + timearr[0] + '年' + timearr[1].split('')[1] + '月' + timearr[2] + '日\t' + timearr[3] + ':' + timearr[4] + ''
      }
    },

    beforeTime() {
      this.value = new Date(this.value.setDate(this.value.getDate() - 1))
      this.fetchData(this.value)
    },
    afterTime() {
      this.value = new Date(this.value.setDate(this.value.getDate() + 1))
      this.fetchData(this.value)
    },
    gonotify(data) {
      this.$router.push({ path: data.route, query: { type: data.complete === data.all ? 'second' : 'first' }})
    },

    finishnotify() {
      this.$router.push({ path: 'finishnotify' })
    },
    changeTime(val) {
      this.fetchData(this.value)
    },
    fetchData(value) {
      const params = {
        date: parseTime(value, 'y-m-d') ? '' : ''
      }
      getDailytasksDate(params).then(({ data }) => {
        this.taskList = data
      })
    },
    handlerSysTemComplete(serviceId, taskTypeId) {
      dealByServiceId(serviceId, taskTypeId).then(res => {
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
    display: flex;
    justify-content: space-between;
     cursor: pointer;
      line-height: 16px;
      padding: 10px 0;
      font-size: 12px;
    .message{
      display:block;
      width: 170px;
      color: #fff;
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
    }
  }
  .see-more{
    cursor: pointer;
    font-size:14px;
    color:#fff;
    padding-right: 15px;
     float:right;
    background: url('../../../assets/home/more-white.png') no-repeat center right;

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
    height:400px;
    overflow-y: auto;
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
