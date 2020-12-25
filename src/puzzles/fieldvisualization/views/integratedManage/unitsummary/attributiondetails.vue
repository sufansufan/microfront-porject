<template>
  <div class="attribution-details">
    <div class="go-back">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
      <p class="text">北京分公司王显</p>
    </div>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="收款明细"
        name="first"
      >
        <receipts-details />
      </el-tab-pane>
      <el-tab-pane
        label="付款明细"
        name="second"
      >
        <payment-details />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PaymentDetails from './components/paymentdetails'
import ReceiptsDetails from './components/receiptsdetails'

export default {
  components: {
    PaymentDetails,
    ReceiptsDetails
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

<style lang="less">
.attribution-details{
  .go-back{
    margin-bottom:20px;
    display:flex;
    align-items: center;
    .el-button{
      width:3%;
    }
    .text{
      flex:1;
      text-align: center;
    }
  }
}

</style>
