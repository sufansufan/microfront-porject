<template>
  <div class="approval-after">
    <div class="go-back">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="报销信息"
        name="first"
      >
        <reimbursement-information :disable="true" />
      </el-tab-pane>
      <el-tab-pane
        label="发票信息"
        name="second"
      >
        <invoice-information />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ReimbursementInformation from './components/reimbursementinformation'
import InvoiceInformation from './components/invoiceinformation'
export default {
  components: {
    ReimbursementInformation,
    InvoiceInformation
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {}
  }
}
</script>

<style lang="less" >
.approval-after{
  overflow-y: auto;
  height: calc(100vh - 160px);
  padding:20px;
 .go-back{
   margin-bottom:20px;
 }
}

</style>
