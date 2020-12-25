<template>
  <div class="browse-list">
    <div class="go-back">
      <el-button @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="申请信息"
        name="first"
      >
        <add-applications />
      </el-tab-pane>
      <el-tab-pane
        label="收票信息"
        name="second"
      >
        <invoice-list />
      </el-tab-pane>
      <el-tab-pane
        label="批准信息"
        name="third"
      >
        <approval-information />
      </el-tab-pane>
      <el-tab-pane
        label="付款信息"
        name="fourth"
      >
        <payment-information />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AddApplications from '../addapplications'
import ApprovalInformation from './components/approvalinformation'
import PaymentInformation from './components/paymentinformation'
import InvoiceList from '../components/invoicelist'

export default {
  name: 'Index',
  components: {
    AddApplications,
    ApprovalInformation,
    PaymentInformation,
    InvoiceList
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
<style lang="less" >
.browse-list{
   overflow-y: auto;
  height: calc(100vh - 160px);
  padding:20px;
 .go-back{
   margin-bottom:20px;
 }
}

</style>
