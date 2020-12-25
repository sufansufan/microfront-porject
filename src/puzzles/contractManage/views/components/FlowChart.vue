<template>
  <div v-if="processData.length > 0" class="contract-flow-chart">
    <div v-if="!isCurrent" class="title" @click="handleExtend">
      <span class="title-content">展开</span>
      <i
        class="el-icon-d-arrow-right icon"
        :class="extend ? 'icon-down' : 'icon-top'"
      />
    </div>
    <div v-if="extend" class="approval-box">
      <approval-record :process-data="processData" :is-number="true" />
    </div>
  </div>

</template>

<script>
import ApprovalRecord from '@frames/dashboard/components/ApprovalRecord'
import { getProcessRecord, previewProcess } from '@core/api/processManage/workflowmanager'

export default {
  name: 'ContractFlowChart',
  components: {
    ApprovalRecord
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    // 是否是新增
    isNew: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      parentNode: '',
      extend: false,
      processData: []
    }
  },
  watch: {
    id: {
      handler(n) {
        if (!n) return
        this.fetchFlowData()
      },
      immediate: true
    }
  },
  methods: {
    handleExtend() {
      this.extend = !this.extend
    },
    // 版本查看请求流程图
    async fetchVersionFlowDetail() {
      const params = { processId: this.id }
      const { data: { allFlowsRecords }} = await getProcessRecord(params)
      this.processData = allFlowsRecords
      this.processData && this.processData.length > 0 && this.initLabel('审批记录')
    },
    // 新增查看预览
    async perviewFlowDetail() {
      const { data } = await previewProcess(
        {
          organizationId: this.id,
          registerCode: 'P_ContractEntry'
        }
      )
      this.processData = data
      this.processData && this.processData.length > 0 && this.initLabel('流程预览')
    },
    initLabel(msg) {
      this.$emit('update:label', msg)
      // const parentNode = this.$parent
      // this.parentNode = this.$parent
      // parentNode.label = msg
      // this.$set(parentNode, 'label', msg)
    },
    fetchFlowData() {
      // 首先隐藏 this.$parent.$options.name
      // 等待请求成功 如果返回数据长度存在切长度大于1 显示
      if (this.isNew) {
        this.perviewFlowDetail()
      } else {
        this.fetchVersionFlowDetail()
      }
    }
  }
}
</script>

<style lang='less'>
.contract-flow-chart{
  color: #666;
  .title{
    cursor: pointer;
    .title-content{
    color:#0a4c8a
    }
  }
  .icon {
    transition: all 0.2s ease-in-out;
  }
  .icon-top {
    transform: rotate(-90deg);
  }
  .icon-down {
    transform: rotate(90deg);
  }
  .bolder {
    display: inline-block;
    width: 60px;
    color: #333;
    font-weight: 600;
  }
  .on-down {
    cursor: pointer;
    color: #0a4c8a;
  }
  .approval-box {
    margin-left: -5%;
  }
}
</style>
