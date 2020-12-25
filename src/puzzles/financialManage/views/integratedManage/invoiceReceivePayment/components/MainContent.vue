<template>
  <div class="main-content">
    <div class="middle_tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="开票收款" name="collect">
          <keep-alive>
            <template>
              <invoice-collection ref="processParam" :process-list="processList" />
            </template>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="售票付款" name="pay">
          <keep-alive>
            <template>
              <receipt-payment ref="processFrom" :process-list="processList" />
            </template>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import InvoiceCollection from './InvoiceCollection'
import ReceiptPayment from './ReceiptPayment'
export default {
  name: 'WarrantyDepositStatistics',
  components: {
    InvoiceCollection,
    ReceiptPayment
  },
  data() {
    return {
      activeName: 'collect'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
