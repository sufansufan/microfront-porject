<template>
  <div class="procurement-statistics">
    <!-- 采购统计 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="项目材料库存" name="first">
        <project-material-inventory />
      </el-tab-pane>
      <el-tab-pane label="材料采购明细汇总" name="second">
        <material-purchase-details />
      </el-tab-pane>
      <el-tab-pane label="材料出库明细汇总" name="third">
        <issue-detail-summary />
      </el-tab-pane>
      <el-tab-pane label="材料采购费用统计" name="fourth">
        <purchase-cost-statistics />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProjectMaterialInventory from './components/ProjectMaterialInventory'
import MaterialPurchaseDetails from './components/MaterialPurchaseDetails'
import IssueDetailSummary from './components/IssueDetailSummary'
import PurchaseCostStatistics from './components/PurchaseCostStatistics'
export default {
  components: { ProjectMaterialInventory, MaterialPurchaseDetails, IssueDetailSummary, PurchaseCostStatistics },
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
  .procurement-statistics {

  }
</style>
