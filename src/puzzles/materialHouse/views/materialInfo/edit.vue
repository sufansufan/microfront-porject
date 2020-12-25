<template>
  <div class="material-edit">
    <el-tabs v-model="activeName" type="card" class="one-card-tabs" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="baseInfo">
        <base-info ref="baseInfo" :disabled="false" />
      </el-tab-pane>
      <el-tab-pane label="展示图片" name="showPictures">
        <show-pictures ref="showPictures" :disabled="false" />
      </el-tab-pane>
      <el-tab-pane label="产品介绍" name="productDetails">
        <product-details ref="productDetails" :disabled="false" />
      </el-tab-pane>
    </el-tabs>
    <div class="btn">
      <el-button type="primary" @click="saveInfo">保存</el-button>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import ShowPictures from './components/ShowPictures'
import ProductDetails from './components/ProductDetails'
import tabs from '@core/mixins/tabs'
export default {
  components: {
    BaseInfo,
    ShowPictures,
    ProductDetails
  },
  mixins: [tabs],
  data() {
    return {
      activeName: 'baseInfo'
    }
  },
  computed: {

  },
  methods: {
    saveInfo() {
      if (this.activeName === 'baseInfo') {
        this.$refs.baseInfo.addOrEdit().then(res => {
          this.$router.go(-1)
        })
      } else if (this.activeName === 'showPictures') {
        this.$refs.showPictures.saveSubmit()
      } else if (this.activeName === 'productDetails') {
        this.$refs.productDetails.saveTinymce()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.material-edit {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  .btn {
    display: flex;
    justify-content: center;
    margin: 30px 0px;
  }
}
</style>
