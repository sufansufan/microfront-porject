<template>
  <div class="view-order">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <div class="tab-content">
          <essential-information />
        </div>
      </el-tab-pane>
      <el-tab-pane label="材料采购清单" name="second">
        <div class="tab-content">
          <material-purchase />
        </div>
      </el-tab-pane>

      <el-tab-pane label="现场验收" name="third">
        <div class="tab-content">
          <template v-if="siteacceptance === 'default'">
            <site-acceptance @changeTabConent="changeTabConent" />
          </template>
          <template v-if="siteacceptance === 'details'">
            <verification-number-details @changeTabConent="changeTabConent" />
          </template>
          <template v-if="siteacceptance === 'supplyorder'">
            <supply-order-details @changeTabConent="changeTabConent" />
          </template>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import EssentialInformation from './EssentialInformation'
import MaterialPurchase from './MaterialPurchase'
import SiteAcceptance from './SiteAcceptance'
import VerificationNumberDetails from './VerificationNumberDetails'
import SupplyOrderDetails from './SupplyOrderDetails'
import DragDialog from '@frames/dashboard/components/Dialog'
import Process from '@frames/dashboard/components/Process'
export default {
  components: {
    EssentialInformation,
    MaterialPurchase,
    SiteAcceptance,
    VerificationNumberDetails,
    SupplyOrderDetails,
    Process,
    DragDialog
  },
  data() {
    return {
      siteacceptance: 'default',
      activeName: 'first'

    }
  },
  methods: {
    handleClick(tab, event) {
      this.siteacceptance = 'default'
    },

    changeTabConent(type, status) {
      switch (type) {
        case 'siteacceptance':
          this.siteacceptance = status
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.view-order {
  padding: 10px;
  .tab-content {
    overflow-y: auto;
    height: calc(100vh - 222px);
    padding-right: 10px;
  }
}
</style>
