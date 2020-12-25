<template>
  <div class="contract-flow-dialog">
    <drag-dialog
      ref="dialog"
      :title="title"
      width="50%"
      :is-show.sync="isShow"
    >
      <div v-loading="loading" class="process-box">
        <approval-record
          class="process-chart"
          :process-data="data"
        />
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import ApprovalRecord from '@frames/dashboard/components/ApprovalRecord'
import { getProcessRecord } from '@core/api/processManage/workflowmanager'
export default {
  components: {
    DragDialog,
    ApprovalRecord
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: '流程信息'
    }
  },
  data() {
    return {
      loading: false,
      data: []
    }
  },
  computed: {
    isShow: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  created() {
    this.initFlowCharts()
  },
  methods: {
    async initFlowCharts() {
      this.loading = true
      const params = { processId: this.id }
      const {
        data: { allFlowsRecords }
      } = await getProcessRecord(params)
      this.data = allFlowsRecords
      this.loading = false
    }
  }
}
</script>

<style lang='less'>
.contract-flow-dialog {
  .process-box {
    overflow-y: auto;
    min-height: 300px;
  }
}
</style>
