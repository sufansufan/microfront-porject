<template>
  <div class="site-purchase-order">
    <div class="search">
      <div class="btn">
        <el-button-group>
          <el-button class="back-btn" @click="backGo()"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
        </el-button-group>
        <div class="head-title">清合同归属项目部 西安速卖达科贸有限公司</div>
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
    </el-tabs>
  </div>
</template>

<script>
import BaseInformation from './../components/PurchaseBaseInformation'
import OutGoingList from './../components/OutGoingList'
import AppMaterialName from './../components/AppMaterialName'
export default {
  components: { BaseInformation, OutGoingList, AppMaterialName },
  data() {
    return {
      activeName: 'first',
      deliveryState: 'default',
      title: 'deliveryState'
    }
  },
  methods: {
    backGo() {
      this.$router.push('/purchasingManagement/siteAcceptance')
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
  .site-purchase-order {
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
