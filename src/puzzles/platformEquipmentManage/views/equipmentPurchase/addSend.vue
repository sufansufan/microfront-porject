<template>
  <div class="add-send">
    <div v-if="type!=='edit' && sendInfo" class="title">{{ orderTitlename }}</div>
    <el-tabs v-model="activeName" type="card" class="one-card-tabs" @tab-click="handleClick">
      <el-tab-pane label="订单信息" name="orderInfo">
        <order-info />
      </el-tab-pane>
      <el-tab-pane v-if="sendInfo && !$route.query.isUrgent" label="发货信息" name="shipInfo">
        <shipping-info ref="goods" :disabled="type==='details'">
          <div v-if="type==='edit'" slot="order">
            <el-button type="primary" @click="$refs.goods.changeDialog()">配货</el-button>
          </div>
        </shipping-info>
      </el-tab-pane>
      <el-tab-pane v-if="type==='details'" name="last">
        <span slot="label"><i class="iconfont icon-fanhui-copy" /> 返回</span>
      </el-tab-pane>
    </el-tabs>
    <div v-if="type==='edit'" class="base-info-footer">
      <template v-if="activeName === 'shipInfo'">
        <el-button type="primary" :disabled="consignorState === '03'" @click="saveSubmit('save')">保存</el-button>
        <el-button type="primary" @click="saveSubmit('config')">确认发货</el-button>
      </template>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>
<script>
import tabs from '@core/mixins/tabs'
import OrderInfo from '../components/OrderInfo'
import ShippingInfo from '../components/ShippingInfo'
import { mapGetters } from 'vuex'
export default {
  components: {
    OrderInfo,
    ShippingInfo
  },
  mixins: [tabs],
  data() {
    return {
      activeName: 'orderInfo',
      type: this.$route.query.type,
      consignorState: this.$route.query.consignorState,
      sendInfo: true
    }
  },
  computed: {
    ...mapGetters(['orderTitlename'])
  },
  created() {
    const { type } = this.$route.query
    if (type === 'edit') this.activeName = 'shipInfo'
  },
  mounted() {
    const { orderState } = this.$route.query
    if (orderState === '01' || orderState === '02' || orderState === '04') {
      this.sendInfo = false
    } else {
      this.sendInfo = true
    }
  },
  methods: {
    saveSubmit(type) {
      this.$refs.goods.saveSubmit(type)
    }
  }
}
</script>

<style lang="less" scoped>
.add-send {
  padding: 10px;
  height: calc(100vh - 130px);
  overflow-y: auto;
  .base-info-footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  .title {
    text-align: center;
    line-height: 40px;
    font-size: 26px;
  }
}
</style>
