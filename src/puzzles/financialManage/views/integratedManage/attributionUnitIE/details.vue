<template>
  <div class="details-view">
    <div class="title">北京分公司王显</div>
    <div class="middle_tab">
      <el-tabs v-model="activeName" type="card" class="one-card-tabs" @tab-click="handleClick">
        <el-tab-pane label="收款明细" name="bank">
          <keep-alive>
            <template>
              <income-details ref="processFrom" :process-list="processList" />
            </template>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="付款明细" name="cash">
          <keep-alive>
            <template>
              <payment-details ref="processParam" :process-list="processList" />
            </template>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane name="last">
          <span slot="label"><i class="iconfont icon-fanhui-copy" /> 返回</span>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import IncomeDetails from './components/IncomeDetails'
import PaymentDetails from './components/PaymentDetails'
import tabs from '@core/mixins/tabs'
export default {
  name: 'DetailsView',
  components: {
    IncomeDetails,
    PaymentDetails
  },
  mixins: [tabs],
  data() {
    return {
      activeName: 'bank'
    }
  },
  created() {
    console.log('11111111111111111111')
  },
  methods: {
    // handleClick(tab) {
    //   console.log(tab.name)
    //   if (tab.name === 'last') {
    //     this.activeName = 'bank'
    //     this.$router.go(-1)
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
.details-view {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  .tab-pane-btn {
    background: #fff !important;
  }
  .title {
    height: 40px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
