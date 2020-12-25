<template>
  <div class="purchase-order">
    <div class="search">
      <div class="btn">
        <el-button-group>
          <el-button class="back-btn" @click="backGo()"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
        </el-button-group>
        <div class="head-title">1清测试合同显示字段长度的合同哈哈还哈哈1清测试合同显示字段长度的合同哈哈还哈哈1清测试合同显示字段长度的合同哈哈还哈哈1清测试合同显示字段长度的合同哈哈还哈哈1清测试合同显示字段长度的合同哈哈还哈哈</div>
      </div>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <base-information />
      </el-tab-pane>
      <el-tab-pane label="材料采购清单" name="second">
        <template v-if="deliveryState==='default'">
          <out-going-list @changeTabConent="changeTabConent" />
        </template>
        <template v-if="deliveryState==='details'">
          <app-material-name :supply-list="title" @changeTabConent="changeTabConent" />
        </template>
      </el-tab-pane>
      <el-tab-pane label="现场验收" name="third">
        <site-acceptance />
      </el-tab-pane>
      <el-tab-pane label="材料用款" name="fourth">
        <material-consumption />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BaseInformation from '../components/PurchaseBaseInformation'
import OutGoingList from '../components/OutGoingList'
import SiteAcceptance from './components/SiteAcceptance'
import MaterialConsumption from './components/MaterialConsumption'
import AppMaterialName from '../components/AppMaterialName'
export default {
  components: { BaseInformation, OutGoingList, SiteAcceptance, MaterialConsumption, AppMaterialName },
  data() {
    return {
      activeName: 'first',
      deliveryState: 'default',
      title: 'deliveryState'
    }
  },
  methods: {
    backGo() {
      this.$router.push('/purchasingManagement/procurementApplication')
    },
    changeTabConent(type, status) {
      switch (type) {
        case 'delivery':
          this.deliveryState = status
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .purchase-order {
    .btn {
      display: flex;
      .head-title {
        text-align: center;
        flex: 1;
        margin-left: 10px;
        font: 600 18px/30px '微软雅黑';
      }
    }

  }
</style>
