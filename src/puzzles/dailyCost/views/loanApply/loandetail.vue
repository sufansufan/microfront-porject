<template>
  <div class="loan-detail">
    <div class="go-back">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="借款信息" name="first">
        <loan-information :disable="true" />
      </el-tab-pane>
      <el-tab-pane label="还款明细" name="two">
        <details-ofrepayment :disable="true" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DetailsOfrepayment from './components/Detailsofrepayment'
import LoanInformation from './components/Loaninformation'

export default {
  components: {
    DetailsOfrepayment,
    LoanInformation

  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {

    }
  }
}
</script>

<style lang="less" scoped>
.loan-detail {
  padding: 20px;
  height: calc(100vh - 160px);
  overflow-y: auto;
  .go-back {
    margin-bottom: 20px;
  }
}
</style>
