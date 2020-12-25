<template>
  <div class="see-directory">
    <div class="title">{{ directoryTitlename }}</div>
    <el-tabs v-model="activeName" type="card" class="one-card-tabs is-padding" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="baseInfo">
        <base-info :disabled="true" />
      </el-tab-pane>
      <el-tab-pane label="历史价格" name="price">
        <historical-price :disabled="true" />
      </el-tab-pane>
      <el-tab-pane label="设备清单" name="list">
        <template v-if="equipmentStatus === 'default'">
          <equipment-list @changeTabConent="changeTabConent" />
        </template>
        <template v-if="equipmentStatus === 'addEquipment'">
          <add-equipment :dialog-type="dialogType" :disabled="disabled" @changeTabConent="changeTabConent" />
        </template>
        <template v-if="equipmentStatus === 'receiptNo'">
          <receipt-no :disabled="true" :number-id="dialogType" @changeTabConent="changeTabConent" />
        </template>
        <template v-if="equipmentStatus === 'pOrderNo'">
          <purchase-order-no :number-id="dialogType" @changeTabConent="changeTabConent" />
        </template>
      </el-tab-pane>
      <el-tab-pane name="last">
        <span slot="label"><i class="iconfont icon-fanhui-copy" /> 返回</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabs from '@core/mixins/tabs'
import BaseInfo from './components/BaseInfo'
import HistoricalPrice from './components/HistoricalPrice'
import EquipmentList from './components/EquipmentList'
import AddEquipment from './addEquipment'
import ReceiptNo from './components/ReceiptNo'
import PurchaseOrderNo from './components/PurchaseOrderNo'
import { mapGetters } from 'vuex'
export default {
  components: {
    BaseInfo,
    HistoricalPrice,
    EquipmentList,
    AddEquipment,
    ReceiptNo,
    PurchaseOrderNo
  },
  mixins: [tabs],
  data() {
    return {
      activeName: 'baseInfo',
      equipmentStatus: 'default',
      dialogType: '',
      disabled: false
    }
  },
  computed: {
    ...mapGetters(['directoryTitlename'])
  },
  methods: {
    changeTabConent(type, status, handleType) {
      switch (type) {
        case 'equipment':
          this.equipmentStatus = status
          if (handleType === 'details') {
            this.disabled = true
          } else {
            this.disabled = false
          }
          this.dialogType = handleType
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.see-directory {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  .title {
    text-align: center;
    line-height: 40px;
    font-size: 26px;
  }
}
</style>
