<template>
  <div class="purchase-order">
    <div class="title">{{ orderTitlename }}</div>
    <el-tabs v-model="activeName" type="card" class="one-card-tabs" @tab-click="handleClick">
      <el-tab-pane label="订单信息" name="orderInfo">
        <order-info :disabled="true" :order-number="numberId" />
      </el-tab-pane>
      <el-tab-pane label="发货信息" name="shipInfo">
        <shipping-info :order-number="numberId" :disabled="true" />
      </el-tab-pane>
      <el-tab-pane name="last">
        <span slot="label"><i class="iconfont icon-fanhui-copy" /> 返回</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import tabs from '@core/mixins/tabs'
import OrderInfo from '../../components/OrderInfo'
import ShippingInfo from '../../components/ShippingInfo'
import { mapGetters } from 'vuex'
export default {
  components: {
    OrderInfo,
    ShippingInfo
  },
  mixins: [tabs],
  props: {
    numberId: {
      default: '',
      type: String
    },
    isOrder: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      activeName: 'orderInfo'
    }
  },
  computed: {
    ...mapGetters(['orderTitlename'])
  },
  methods: {
    handleClick(tab) {
      if (tab.name === 'last') {
        if (this.isOrder) {
          this.$router.go(-1)
        } else {
          this.$emit('changeTabConent', 'equipment', 'addEquipment', 'details')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.purchase-order{
  .title {
    text-align: center;
    line-height: 40px;
    font-size: 26px;
  }
}
</style>
