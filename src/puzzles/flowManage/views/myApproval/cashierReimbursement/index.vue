<template>
  <div class="cost-accounting">
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="报销发票"
        name="first"
      >
        <reimbursement-information />
      </el-tab-pane>
      <el-tab-pane
        label="发票信息"
        name="second"
      >
        <accInvoice-information />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ReimbursementInformation from './components/reimbursementInformation'
import AccInvoiceInformation from './components/accInvoiceInformation'

export default {
  name: 'Index',
  components: {
    ReimbursementInformation,
    AccInvoiceInformation
  },
  data() {
    return {
      activeName: 'first'

    }
  },
  methods: {
    handleClick(tab, event) {

    }
  }
}
</script>
<style lang="less" scoped>
.cost-accounting{
  padding:20px;
  height: 100%;
  overflow-y: scroll;
}
</style>
