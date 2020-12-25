<template>
  <div class="view-revoked">
    <div class="btn">
      <el-button
        class="back-btn"
        @click="$router.go(-1)"
      ><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <div class="text"> <strong>测试申请用款App</strong> </div>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="基本信息"
        name="first"
      >
        <div class="tab-content">
          <essential-information />
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="材料采购清单"
        name="second"
      >
        <div class="tab-content">
          <template v-if="materialname === 'default'">
            <material-purchase @changeTabConent="changeTabConent" />
          </template>
          <template v-if="materialname === 'details'">
            <material-name-details @changeTabConent="changeTabConent" />
          </template>

        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import EssentialInformation from './components/EssentialInformation'
import MaterialPurchase from './components/MaterialPurchase'
import MaterialNameDetails from './components/MaterialNameDetails'
export default {
  components: {
    EssentialInformation,
    MaterialPurchase,
    MaterialNameDetails
  },
  data() {
    return {
      activeName: 'first',
      materialname: 'default'
    }
  },
  methods: {
    handleClick(tab, event) {
      this.materialname = 'default'
    },

    changeTabConent(type, status) {
      switch (type) {
        case 'materialname':
          this.materialname = status
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.view-revoked {
  padding: 10px;
   overflow-y: auto;
    height: calc(100vh - 222px);
  .tab-content {
    overflow-y: auto;
    height: calc(100vh - 262px);
    padding-right: 10px;

  }
  .text {
    text-align: center;
    font-size: 20px;
    line-height: 40px;
    margin-bottom: 10px;
  }
}
</style>
