<template>
  <div class="company-details">
    <div class="search">
      <div class="btn">
        <el-button-group>
          <el-button class="back-btn" @click="backGo()"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
        </el-button-group>
        <div class="head-title">西安速卖达科贸有限公司</div>
      </div>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="产品与报价" name="first">
        <template v-if="productsState==='default'">
          <products-quotations @changeTabConent="changeTabConent" />
        </template>
        <template v-if="productsState ==='details'">
          <commodity-details :supply="false" @changeTabConent="changeTabConent" />
        </template>
      </el-tab-pane>
      <el-tab-pane label="订单管理" name="second">
        <order-management />
      </el-tab-pane>
      <el-tab-pane label="关于供应商" name="third">
        <about-suppliers />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProductsQuotations from './components/ProductsQuotations'
import OrderManagement from './../merchandiseOrder'
import AboutSuppliers from './components/AboutSuppliers'
import CommodityDetails from './../components/CommodityDetails'
export default {
  components: { ProductsQuotations, OrderManagement, AboutSuppliers, CommodityDetails },
  data() {
    return {
      activeName: 'first',
      productsState: 'default'
    }
  },
  methods: {
    backGo() {
      this.$router.go(-1)
    },
    changeTabConent(type, status) {
      switch (type) {
        case 'products':
          this.productsState = status
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .company-details {
    padding: 20px;
    height: calc(100% - 60px);
    overflow-y: scroll;
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
<style lang="less">
  .el-tabs__header {
      margin: 0!important;
  }
</style>
