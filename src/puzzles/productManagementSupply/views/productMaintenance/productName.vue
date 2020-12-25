<template>
  <div class="product-name">
    <div style="margin:10px 0;">
      <el-button class="back-btn" @click="backGo()"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <essential-information />
      </el-tab-pane>
      <el-tab-pane label="产品图片" name="second">
        <product-pictures />
      </el-tab-pane>
      <el-tab-pane label="产品描述" name="third">
        <product-description />
      </el-tab-pane>
      <el-tab-pane label="产品报价" name="fourth">
        <product-quotation />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import EssentialInformation from './components/EssentialInformation'
import ProductPictures from './components/ProductPictures'
import ProductDescription from './components/ProductDescription'
import ProductQuotation from './components/ProductQuotation'
export default {
  components: { EssentialInformation, ProductPictures, ProductDescription, ProductQuotation },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    backGo() {
      this.$router.push('/productManagementSupply/productMaintenance')
    }
  }
}
</script>

<style lang="less" scoped>
  .product-name {
    padding: 20px;
  }
</style>
