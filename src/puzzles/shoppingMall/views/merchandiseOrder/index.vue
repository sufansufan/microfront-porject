<template>
  <div class="merchandise-order">
    <!-- 采购统计 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部采购单" name="first">
        <purchase-orders />
      </el-tab-pane>
      <el-tab-pane label="未下单" name="second">
        <purchase-orders />
      </el-tab-pane>
      <el-tab-pane label="待接单" name="third">
        <purchase-orders />
      </el-tab-pane>
      <el-tab-pane label="配货中" name="fourth">
        <purchase-orders />
      </el-tab-pane>
      <el-tab-pane label="供货中" name="fifth">
        <purchase-orders />
      </el-tab-pane>
      <el-tab-pane label="发货完成" name="sixth">
        <purchase-orders />
      </el-tab-pane>
      <el-tab-pane label="收货完成" name="seventh">
        <purchase-orders />
      </el-tab-pane>
      <el-tab-pane label="交易完成" name="eighth">
        <purchase-orders />
      </el-tab-pane>
      <el-tab-pane label="交易关闭" name="ninth">
        <purchase-orders />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PurchaseOrders from './components/AllPurchaseOrders'
export default {
  components: { PurchaseOrders },
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
  .merchandise-order {
    padding: 20px;
  }
</style>
