<template>
  <div class="supplyorder-details">
    <div class="btn">
      <el-button icon="el-icon-arrow-left" class="back-btn" @click="$emit('changeTabConent', 'siteacceptance', 'default')"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <div class="tab-content">
          <essential-information />
        </div>
      </el-tab-pane>
      <el-tab-pane label="供货清单" name="second">
        <div class="tab-content">
          <supply-list />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import EssentialInformation from '../supplyorderdetails/EssentialInformation'
import SupplyList from '../supplyorderdetails/SupplyList'

export default {
  components: {
    EssentialInformation,
    SupplyList
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
<style lang="less" scoped>
.supplyorder-details {
  padding: 10px;
  .btn {
    margin-bottom: 10px;
  }
}
</style>
