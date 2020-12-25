<template>
  <div class="mail-box">
    <div class="header">
      <div>
        <el-checkbox v-model="allCheck" />
        类型
      </div>
      <div>任务</div>
      <div>下派人</div>
      <div>下派时间</div>
    </div>
    <div class="body">
      <div v-for="(item,index) in mailData" :key="index">
        <div v-if="item.children.length" class="time-type">
          {{ item.title }} （{{ item.children.length }}条）
        </div>
        <div v-for="v in item.children" :key="v.id" class="content">
          <div>
            <el-checkbox v-model="v.checkType" @change="mailDataChange(v.id, $event)" />
            {{ v.emergencyworkTypeDTO.taskType }}
          </div>
          <div class="table-click-color one-ellipsis" @click="updateDetails(v)"> {{ v.title }}</div>
          <div>{{ v.sendUserName }}</div>
          <div>{{ v.createDate }}</div>
        </div>
      </div>
      <div v-if="NoData" class="nodata"> 暂无数据 </div>
    </div>
  </div>
</template>

<script>
import { dealByServiceId } from '@core/api/emergencyWork'
import { getOrganization } from '@core/api/organization'
import { getSessionStorage } from '@core/utils/auth'
export default {
  props: {
    mailData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      allCheck: false,
      childrenList: [],
      userList: '',
      NoData: true,
      organizationId: ''
    }
  },
  watch: {
    allCheck(n) {
      this.$emit('allCheck', n)
    },
    mailData: {
      handler(v) {
        v.forEach((item) => {
          if (!item.children.length) {
            this.NoData = false
          }
        })
      },
      immediate: true,
      deep: true

    }
  },
  created() {
    this.getOrganization()
  },
  methods: {
    getOrganization() {
      getOrganization().then(({ data }) => {
        this.userList = data.id
      })
    },
    mailDataChange(id, e) {
      this.$emit('changeCheck', id, e)
    },
    updateDetails(v) {
      const { route, id: taskTypeId, autoFinish, routeParams, code, taskParams, taskType } = v.emergencyworkTypeDTO
      const { serviceId, id, type, deal } = v
      this.organizationId = getSessionStorage('orgId')
      if (autoFinish) {
        this.handlerSysTemComplete(serviceId, taskTypeId)
      }
      if (route.includes('cooperativeEnterprise')) {
        this.$router.push({ path: route, query: { serviceId: serviceId, id: id,
          type: type, myInformationCode: this.userList.creditCode, organizationId: this.userList, deal: deal, taskTypeId: taskTypeId }})
      } else if (route.includes('platformEquipmentManage')) {
        this.$router.push({ path: route, query: { orderId: serviceId, type: 'details', isUrgent: true }})
      } else if (route.includes('orgStructure')) {
        if (route.includes('employeeInfo')) {
          this.$router.push({ path: route, query: { type: 'edit', id: serviceId, contractInfo: 'contractInfo' }})
        } else {
          if (routeParams === 'principal') { // 缺少负责人
            this.$router.push({ path: route, query: { organizationId: serviceId, type: 'edit' }})
          } else {
            this.$router.push({ path: route, query: { qualificationId: serviceId, type: 'edit' }})
          }
        }
      } else if (route === '/publicSystemMessage') {
        const { createDate, title } = v
        const { taskType } = v.emergencyworkTypeDTO
        const query = {
          messageType: taskType,
          date: createDate,
          content: title
        }
        this.$router.push({ path: route, query })
        this.handlerSysTemComplete(serviceId, taskTypeId)
      } else if (route === '/projectManage/setProjectDept/projectDept') {
        const { contractId, projectId } = JSON.parse(v.serviceId)
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
        this.$router.push({ path: route, query: { serviceId: serviceId, projectId: serviceId, id: id, code: code, type: type, organizationId: this.organizationId, taskTypeId: taskTypeId, taskType: taskType }})
      }
    },
    handlerSysTemComplete(serviceId, taskTypeId) {
      dealByServiceId(serviceId, taskTypeId).then(res => {
      })
    }
  }
}
</script>

<style lang="less" scoped>
.mail-box {
  .common-mail() {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    padding: 0px 10px;
    text-align: left;
    & > div {
      color: #666;
      &:first-child {
        width: 300px;
        & > .el-checkbox {
         margin-right: 20px;
        }
      }
      &:nth-of-type(2) {
        width: calc(100% - 800px);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &:nth-of-type(3) {
        width: 200px;
      }
      &:last-child{
        width: 200px;
      }
    }
  }
  .header {
    background: #f2f2f2;
    font-weight: bold;
    .common-mail
  }
  .body {
    .nodata{
      font-size:16px;
      color:#666666;
      text-align:center;
      line-height: 80px;
    }
    .time-type {
      width: 100%;
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid @primary;
      color: @primary;
    }
    .content {
      &:hover {
        background: #f2f2f2;
      }
      .common-mail
    }
  }
}
</style>
