<template>
  <div class="statistical-analysis">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="用品库存" name="first">
        <div class="tabs-content">
          <supplies-inventory />
        </div>
      </el-tab-pane>
      <el-tab-pane label="组织领用统计" name="second">
        <div class="tabs-content">
          <organization-collection-statistics />
        </div>
      </el-tab-pane>
      <el-tab-pane label="人员领用统计" name="third">
        <div class="tabs-content">
          <personnel-collection-statistics />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SuppliesInventory from './components/suppliesinventory'
import OrganizationCollectionStatistics from './components/organizationcollectionstatistics'
import PersonnelCollectionStatistics from './components/personnelcollectionstatistics'

export default {
  components: {
    SuppliesInventory,
    OrganizationCollectionStatistics,
    PersonnelCollectionStatistics
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style lang="less">
.statistical-analysis{
   height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 20px;
}

</style>
