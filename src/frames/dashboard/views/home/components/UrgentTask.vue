<template>
  <div class="urgent-task">
    <CrumbBox>
      <div>
        <div class="image" />
        紧急任务
      </div>
      <div class="more" @click="moreClick">
        更多
        <div class="image" />
      </div>
    </CrumbBox>
    <div v-loading="loading" class="task-content">
      <ul>
        <li
          v-for="(item, index) in tableData"
          :key="index"
          class="task"
        >
          <div class="left-content">
            <p class="reminder" @click="updateDetails(item)">{{ item.title }}<img v-if="item.top === true" src="../../../assets/home/top.png"></p>
            <p class="type"><span>{{ item.time }}</span><span class="type-text">类型:{{ item.emergencyworkTypeDTO.taskType }}</span></p>
            <p class="circle" />

          </div>

          <div class="right-content">
            <p class="day">{{ item.day }}</p>
            <p class="month">{{ item.month }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CrumbBox from '../../../components/CrumbBox'
import { getList, dealByServiceId } from '@core/api/emergencyWork'
import { getSessionStorage, setSessionStorage } from '@core/utils/auth'
import { getOperaInfo } from '@core/api/processManage/workflowmanager'
// 处理流程退回
import abstract from '@puzzlesDash/processManage/mixins/abstract'
export default {
  components: {
    CrumbBox
  },
  mixins: [abstract],
  data() {
    return {
      time: '',
      day: '',
      month: '',
      tableData: [],
      loading: true,
      organizationId: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      const params = {
        size: 5,
        type: 0,
        userId: '1',
        deal: false
      }
      getList(params).then(({ data: { content }}) => {
        this.loading = false
        this.tableData = content || []
        this.tableData.map(item => {
          const time = item.createDate
          const timearr = time.replace(' ', ':').replace(/\:/g, '-').split('-')
          const timestr = '' + timearr[1].split('')[1] + '月' + timearr[2] + '日\t' + timearr[3] + ':' + timearr[4] + ''

          item.day = timestr.substring(2, 4)
          item.month = (timearr[1] < 10 ? timearr[1].replace(/\b(0+)/gi, '') : timearr[1]) + '月'
          item.time = timestr.substring(6, 12)
          return item
        })
      })
    },
    moreClick() {
      this.$router.push({ path: 'urgentMore' })
      setSessionStorage('urgenTask', 'first')
    },
    updateDetails(item) {
      const { autoFinish, route, code, routeParams, taskParams, taskType } = item.emergencyworkTypeDTO
      const taskTypeId = item.emergencyworkTypeDTO.id
      const { id, type, serviceId } = item
      this.organizationId = getSessionStorage('orgId')
      if (autoFinish === true) {
        dealByServiceId(serviceId, taskTypeId).then(res => {
          // this.$message.success('标记为已处理')
        })
      }
      if (route.includes('platformEquipmentManage')) {
        this.$router.push({ path: route, query: { orderId: serviceId, type: 'details', isUrgent: true }})
      } else if (route.includes('orgStructure')) {
        if (routeParams === 'principal') { // 缺少负责人
          this.$router.push({ path: route, query: { organizationId: serviceId, type: 'edit' }})
        } else {
          this.$router.push({ path: route, query: { qualificationId: serviceId, type: 'edit' }})
        }
      } else if (route === '/processManage/myApprove/approve') {
        // 流程退回
        this.handlerProcessGoBack(item)
      } else if (route === '/projectManage/setProjectDept/projectDept') {
        const { contractId, projectId } = JSON.parse(item.serviceId)
        const query = {
          type: 'details',
          projectId,
          contactId: contractId
        }
        this.$router.push({ path: route, query })
      } else if (route === '/teamManagement') { // 工人实名制-施工队管理
        const query = {
          taskParams: JSON.parse(taskParams)
        }
        this.$router.push({ path: route, query })
      } else {
        this.$router.push({ path: route, query: { serviceId: serviceId, projectId: serviceId, id: id, code: code,
          type: type, organizationId: this.organizationId, taskTypeId: taskTypeId, taskType: taskType }})
      }
    },
    // 处理流程退回
    handlerProcessGoBack(item) {
      const { serviceId } = item
      const taskId = serviceId.split('_')
      const taskIdLast = taskId[taskId.length - 1]
      getOperaInfo({ taskId: taskIdLast }).then(({ data }) => {
        const type = taskId.length > 1 ? 'add' : 'details'
        this.abstractClick(type, { taskId: taskIdLast, ...data })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.urgent-task {
  width: 49.5%;
  height: 330px;
  .image {
    background: url('../../../assets/home/task.png') no-repeat center;
    background-size: 100% 100%;
  }
  .more {
    color: @primary;
    cursor: pointer;
    .image {
      width: 14px;
      height: 7px;
      background: url('../../../assets/home/more.png') no-repeat center;
      background-size: 100% 100%;
    }
  }
  .task-content {
    padding: 0 10px;
    height: 280px;
    overflow: hidden;
    ul {
      li {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        .left-content {
          position: relative;
          .reminder {
            line-height: 14px;
            font-size: 14px;
            color: #333;
            font-weight: 400;
            font-family: Microsoft YaHei;
            cursor: pointer;
          }

          .reminder:hover {
            color: #0a4c8a;
          }
          .type {
            padding-top: 8px;
            line-height: 12px;
            font-size: 12px;
            color: #a1a1a1;
            font-family: Microsoft YaHei;
            .type-text {
              padding-left: 46px;
            }
          }
          .circle {
            position: absolute;
            left: -10px;
            top: 3px;
            width: 6px;
            height: 6px;
            background: #000;
            border-radius: 100%;
          }
        }
        .right-content {
          text-align: center;
          width: 35px;
          .day {
            line-height: 20px;
            font-size: 20px;
            color: #333;
            font-weight: 400;
            font-family: Microsoft YaHei;
          }
          .month {
            line-height: 12px;
            font-size: 14px;
            color: #a1a1a1;
            padding-top:5px;
            font-family: Microsoft YaHei;
          }
        }
      }

    }
  }
}
</style>
