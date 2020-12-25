<template>
  <div class="material-details">
    <div>
      <el-tabs v-model="activeName" type="card" class="one-card-tabs" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="baseInfo">
          <base-info ref="baseInfo" :disabled="true" />
        </el-tab-pane>
        <el-tab-pane label="展示图片" name="showPictures">
          <show-pictures :disabled="true" />
        </el-tab-pane>
        <el-tab-pane label="产品介绍" name="productDetails">
          <product-details :disabled="true" />
        </el-tab-pane>
        <el-tab-pane label="市场价调整记录" name="priceAdjust">
          <price-adjust :disabled="true" />
        </el-tab-pane>
        <el-tab-pane label="区块链账本历史" name="blockchain">
          <blockchain />
        </el-tab-pane>
        <el-tab-pane name="last">
          <span slot="label"><i class="iconfont icon-fanhui-copy" /> 返回</span>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import ShowPictures from './components/ShowPictures'
import ProductDetails from './components/ProductDetails'
import PriceAdjust from './components/PriceAdjust'
import Blockchain from './components/Blockchain'
import tabs from '@core/mixins/tabs'
export default {
  components: {
    BaseInfo,
    ShowPictures,
    ProductDetails,
    PriceAdjust,
    Blockchain
  },
  mixins: [tabs],
  data() {
    return {
      activeName: 'baseInfo'
    }
  },
  computed: {

  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.material-details {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  & > div {
    &:first-child {
      margin-bottom: 10px;
    }
  }
}
</style>
