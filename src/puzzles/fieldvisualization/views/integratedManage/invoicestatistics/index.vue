<template>
  <div class="invoice-statistics.vue">
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="开票收款"
        name="first"
      >
        <invoice-collection />
      </el-tab-pane>
      <el-tab-pane
        label="收票付款"
        name="second"
      >
        <collect-payment />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CollectPayment from './components/collectpayment'
import InvoiceCollection from './components/invoicecollection'

export default {
  components: {
    InvoiceCollection,
    CollectPayment
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
  height: calc(100vh - 160px);
	overflow-y: auto;
  padding: 20px;

}

</style>
